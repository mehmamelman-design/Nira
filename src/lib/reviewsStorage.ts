import { Review } from '../types';
import { INITIAL_REVIEWS } from '../data/initialData';

const LOCAL_STORAGE_KEY = 'alov_fastfood_reviews_v1';

export function getStoredReviews(): Review[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_REVIEWS));
      return INITIAL_REVIEWS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_REVIEWS;
  } catch (e) {
    console.warn('LocalStorage error reading reviews, fallback to defaults:', e);
    return INITIAL_REVIEWS;
  }
}

export function saveReviewToLocal(newReview: Omit<Review, 'id' | 'date' | 'helpfulCount'>): Review {
  const currentReviews = getStoredReviews();
  const createdReview: Review = {
    ...newReview,
    id: `rev-${Date.now()}`,
    date: 'İndi yazıldı',
    helpfulCount: 0,
    isVerified: true,
    avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(newReview.name)}`
  };

  const updatedList = [createdReview, ...currentReviews];
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedList));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }

  // Attempt Firestore sync in background if Firebase is configured
  syncToFirestoreIfAvailable(createdReview);

  return createdReview;
}

export function toggleHelpfulLocal(reviewId: string): Review[] {
  const currentReviews = getStoredReviews();
  const updated = currentReviews.map((r) => {
    if (r.id === reviewId) {
      return { ...r, helpfulCount: r.helpfulCount + 1 };
    }
    return r;
  });

  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update helpful in localStorage', e);
  }

  return updated;
}

async function syncToFirestoreIfAvailable(review: Review) {
  try {
    // Dynamically attempt sync if window firebase or config exists
    const configStr = localStorage.getItem('firebaseConfig');
    if (configStr) {
      const { initializeApp, getApps } = await import('firebase/app');
      const { getFirestore, collection, addDoc } = await import('firebase/firestore');
      
      const config = JSON.parse(configStr);
      const app = getApps().length === 0 ? initializeApp(config) : getApps()[0];
      const db = getFirestore(app);
      
      await addDoc(collection(db, 'reviews'), {
        ...review,
        createdAt: new Date().toISOString()
      });
      console.log('Successfully synced review to Firebase Firestore');
    }
  } catch (err) {
    console.log('Firebase optional sync notice (local mode active):', err);
  }
}
