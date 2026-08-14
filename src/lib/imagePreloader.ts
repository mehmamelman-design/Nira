import { formatImageUrl } from './imageUtils';
import { DEFAULT_CATEGORIES } from './cmsStore';
import { DEFAULT_SLIDES, DEFAULT_MIDDLE_SLIDES } from '../components/Hero';
import { DEFAULT_CATEGORY_SLIDES } from '../components/MenuSection';

const preloadedUrls = new Set<string>();

/**
 * Preloads a single image into browser memory cache.
 */
export function preloadImage(url: string | undefined | null, isHighPriority = false): Promise<void> {
  return new Promise((resolve) => {
    if (!url) {
      resolve();
      return;
    }

    const formatted = formatImageUrl(url);
    if (!formatted || preloadedUrls.has(formatted)) {
      resolve();
      return;
    }

    preloadedUrls.add(formatted);

    const img = new Image();
    // @ts-ignore
    if (isHighPriority && 'fetchPriority' in img) {
      // @ts-ignore
      img.fetchPriority = 'high';
    }
    img.decoding = 'async';
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = formatted;
  });
}

/**
 * Preloads an array of image URLs sequentially or in parallel batches.
 */
export function preloadImages(urls: (string | undefined | null)[], isHighPriority = false): void {
  const cleanList = urls.filter((u): u is string => Boolean(u && typeof u === 'string' && u.trim()));
  
  if (isHighPriority) {
    cleanList.forEach((u) => preloadImage(u, true));
  } else {
    // Idle/background preloading
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        cleanList.forEach((u) => preloadImage(u, false));
      });
    } else {
      setTimeout(() => {
        cleanList.forEach((u) => preloadImage(u, false));
      }, 50);
    }
  }
}

/**
 * Instantly preloads all critical app visuals:
 * 1. Main Hero Carousel Slides
 * 2. Middle Hero Carousel Slides
 * 3. All Category Cards and Banners
 */
export function preloadAppCriticalImages(): void {
  if (typeof window === 'undefined') return;

  // 1. High priority: Hero slides & initial visible categories
  const highPriorityUrls: string[] = [
    ...DEFAULT_SLIDES,
    ...DEFAULT_MIDDLE_SLIDES,
    ...DEFAULT_CATEGORIES.slice(0, 8).map((c) => c.image),
  ];

  preloadImages(highPriorityUrls, true);

  // 2. Medium priority: Remaining categories and category banner slides
  const mediumPriorityUrls: string[] = [
    ...DEFAULT_CATEGORIES.slice(8).map((c) => c.image),
    ...Object.values(DEFAULT_CATEGORY_SLIDES).flat(),
  ];

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      preloadImages(mediumPriorityUrls, false);
    });
  } else {
    setTimeout(() => {
      preloadImages(mediumPriorityUrls, false);
    }, 100);
  }
}
