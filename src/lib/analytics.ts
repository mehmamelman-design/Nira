import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc, updateDoc, increment, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface AnalyticsData {
  totalViews: number;
  todayVisitors: number;
  totalCartClicks: number;
  todayCartClicks: number;
  todayDate: string;
  dailyVisitors: Record<string, number>;
  dailyCartClicks: Record<string, number>;
  lastUpdated?: string;
}

const ANALYTICS_DOC_PATH = 'config';
const ANALYTICS_DOC_ID = 'analytics';

function getTodayString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Local storage helpers
function getLocalTotalViews(): number {
  if (typeof window === 'undefined') return 0;
  return parseInt(localStorage.getItem('nira_total_views') || '0', 10);
}

function getLocalDailyVisitors(): Record<string, number> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem('nira_daily_visitors') || '{}');
  } catch {
    return {};
  }
}

function getLocalTotalCartClicks(): number {
  if (typeof window === 'undefined') return 0;
  return parseInt(localStorage.getItem('nira_total_cart_clicks') || '0', 10);
}

function getLocalDailyCartClicks(): Record<string, number> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem('nira_daily_cart_clicks') || '{}');
  } catch {
    return {};
  }
}

/**
 * Track page view when user visits the site.
 * Accurately updates local storage and Firestore in real time without fake numbers.
 */
export async function trackPageView(): Promise<void> {
  if (typeof window === 'undefined') return;

  const today = getTodayString();

  // 1. Update localStorage
  const currentViews = getLocalTotalViews() + 1;
  localStorage.setItem('nira_total_views', String(currentViews));

  const dailyVisitors = getLocalDailyVisitors();
  let isNewDailySession = false;
  if (!sessionStorage.getItem('nira_counted')) {
    dailyVisitors[today] = (dailyVisitors[today] || 0) + 1;
    sessionStorage.setItem('nira_counted', 'true');
    isNewDailySession = true;
  }
  localStorage.setItem('nira_daily_visitors', JSON.stringify(dailyVisitors));

  // 2. Sync to Firestore
  try {
    const docRef = doc(db, ANALYTICS_DOC_PATH, ANALYTICS_DOC_ID);
    const snap = await getDoc(docRef);

    if (!snap.exists()) {
      await setDoc(docRef, {
        totalViews: currentViews,
        dailyVisitors: { [today]: dailyVisitors[today] || 1 },
        totalCartClicks: getLocalTotalCartClicks(),
        dailyCartClicks: getLocalDailyCartClicks(),
        lastUpdated: new Date().toISOString()
      }, { merge: true });
    } else {
      const updatePayload: any = {
        totalViews: increment(1),
        lastUpdated: new Date().toISOString()
      };
      if (isNewDailySession) {
        updatePayload[`dailyVisitors.${today}`] = increment(1);
      }
      await updateDoc(docRef, updatePayload);
    }
  } catch (err) {
    // Graceful offline fallback
    console.debug('Analytics firestore sync info:', err);
  }
}

/**
 * Track user interactions with the cart (Add to Cart / Open Cart).
 */
export async function trackAddToCartEvent(): Promise<void> {
  if (typeof window === 'undefined') return;

  const today = getTodayString();

  // 1. Update localStorage
  const totalCart = getLocalTotalCartClicks() + 1;
  localStorage.setItem('nira_total_cart_clicks', String(totalCart));

  const dailyCart = getLocalDailyCartClicks();
  dailyCart[today] = (dailyCart[today] || 0) + 1;
  localStorage.setItem('nira_daily_cart_clicks', JSON.stringify(dailyCart));

  // 2. Sync to Firestore
  try {
    const docRef = doc(db, ANALYTICS_DOC_PATH, ANALYTICS_DOC_ID);
    const snap = await getDoc(docRef);

    if (!snap.exists()) {
      await setDoc(docRef, {
        totalViews: getLocalTotalViews(),
        dailyVisitors: getLocalDailyVisitors(),
        totalCartClicks: totalCart,
        dailyCartClicks: { [today]: dailyCart[today] || 1 },
        lastUpdated: new Date().toISOString()
      }, { merge: true });
    } else {
      await updateDoc(docRef, {
        totalCartClicks: increment(1),
        [`dailyCartClicks.${today}`]: increment(1),
        lastUpdated: new Date().toISOString()
      });
    }
  } catch (err) {
    console.debug('Analytics cart click sync info:', err);
  }
}

/**
 * React hook for real-time analytics data subscription.
 * Real-time listener for the Admin Panel.
 */
export function useRealtimeAnalytics(): AnalyticsData {
  const today = getTodayString();
  const [data, setData] = useState<AnalyticsData>(() => {
    const localDailyVisitors = getLocalDailyVisitors();
    const localDailyCart = getLocalDailyCartClicks();
    return {
      totalViews: getLocalTotalViews(),
      todayVisitors: localDailyVisitors[today] || 0,
      totalCartClicks: getLocalTotalCartClicks(),
      todayCartClicks: localDailyCart[today] || 0,
      todayDate: today,
      dailyVisitors: localDailyVisitors,
      dailyCartClicks: localDailyCart
    };
  });

  useEffect(() => {
    const todayStr = getTodayString();
    const docRef = doc(db, ANALYTICS_DOC_PATH, ANALYTICS_DOC_ID);

    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const remote = snapshot.data();
          const remoteDailyVisitors: Record<string, number> = remote.dailyVisitors || {};
          const remoteDailyCart: Record<string, number> = remote.dailyCartClicks || {};

          const localViews = getLocalTotalViews();
          const localTotalCart = getLocalTotalCartClicks();

          const totalViews = Math.max(Number(remote.totalViews || 0), localViews);
          const totalCartClicks = Math.max(Number(remote.totalCartClicks || 0), localTotalCart);

          const todayVisitors = remoteDailyVisitors[todayStr] ?? (getLocalDailyVisitors()[todayStr] || 0);
          const todayCartClicks = remoteDailyCart[todayStr] ?? (getLocalDailyCartClicks()[todayStr] || 0);

          setData({
            totalViews,
            todayVisitors,
            totalCartClicks,
            todayCartClicks,
            todayDate: todayStr,
            dailyVisitors: remoteDailyVisitors,
            dailyCartClicks: remoteDailyCart,
            lastUpdated: remote.lastUpdated
          });
        }
      },
      (error) => {
        console.debug('Analytics onSnapshot note:', error);
      }
    );

    return () => unsubscribe();
  }, []);

  return data;
}
