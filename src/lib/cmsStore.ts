import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { HeroConfig, CategoryCard, MenuItem, Review, GalleryPhoto, SiteConfig } from '../types';

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  logoUrl: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786184761/Ba%C5%9Fl%C4%B1qs%C4%B1z_dizayn-Photoroom_t4omj6.png',
  siteName: 'NIRA-Fest&Food Restorani'
};
import { MENU_ITEMS } from '../data/menuData';
import { INITIAL_REVIEWS } from '../data/initialData';

// Fallback Defaults
export const DEFAULT_HERO: HeroConfig = {
  title: "Qaynar İsti Ocaqdan Qapınıza Çatdırılan Ən Ləzzətli Fast Food",
  subtitle: "Təzə kəsilmiş halal ət, isti ocağın əvəzolunmaz qoxusu və xüsusi reseptlə hazırlanan çıtır qızarmış toyuqlar. Sifarişiniz xüsusi termo-qutularda 30 dəqiqəyə qaynar halda çatdırılır!",
  videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-chef-cooking-food-in-a-pan-40292-large.mp4",
  imageUrl: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&q=80&w=1600",
  isVideoEnabled: false
};

export const DEFAULT_CATEGORIES: CategoryCard[] = [
  {
    id: "fastfood",
    name: "FAST FOOD",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800",
    description: "Xırçıltılı smash burgerlər, dadlı naggetslər və kartof fri",
    order: 1,
    icon: ""
  },
  {
    id: "pizza",
    name: "PİZZA",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800",
    description: "İsti daş fırında bişən bol xammallı pizzalar",
    order: 2,
    icon: ""
  },
  {
    id: "kabablar",
    name: "KABABLAR",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800",
    description: "Közdə bişən ləzzətli ət, tikə və lülə kabablar",
    order: 3,
    icon: ""
  },
  {
    id: "isti_yemekler",
    name: "İSTİ YEMƏKLƏR",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
    description: "Təzə bişmiş ləzzətli isti ana yeməklər və fırın yeməkləri",
    order: 4,
    icon: ""
  },
  {
    id: "icikil",
    name: "SOYUQ İÇKİLƏR",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800",
    description: "Buz kimi sərinləşdirici təbii içkilər və limonadlar",
    order: 5,
    icon: ""
  },
  {
    id: "sorbalar",
    name: "ŞORBALAR",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800",
    description: "Xüsusi reseptlə hazırlanan isti ev şorbaları",
    order: 6,
    icon: ""
  },
  {
    id: "salat",
    name: "SALAT",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    description: "Təravətli tərəvəzlərdən hazırlanan xüsusi salatlar",
    order: 7,
    icon: ""
  },
  {
    id: "cig_kofte",
    name: "ÇİY KÖFTƏ",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800",
    description: "Xüsusi ədviyyatlı və acılı təzə çiy köftələr",
    order: 8,
    icon: ""
  },
  {
    id: "qelyanaltilar",
    name: "QƏLYANALTILAR",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800",
    description: "Çıtır toyuq kanatları, fri, soğan halqaları və souslar",
    order: 9,
    icon: ""
  }
];

export const DEFAULT_GALLERY: GalleryPhoto[] = [
  {
    id: "gal-1",
    title: "KOFE",
    description: "Espresso, Americano, Latte, Cappucino, Raf, Mokka və zəngin kofe çeşidləri",
    imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800",
    order: 1
  },
  {
    id: "gal-2",
    title: "KOKTEYL",
    description: "Sərinləşdirici Mojito, Mix Shake və xüsusi Nira kokteyli",
    imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800",
    order: 2
  },
  {
    id: "gal-3",
    title: "DESERTLƏR",
    description: "Xüsusi paxlavalar, San Sebastian, cheesecake, sütlaç, künefe, dondurma və tortlar",
    imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800",
    order: 3
  }
];

export const DEFAULT_REVIEWS: Review[] = INITIAL_REVIEWS.map((r) => ({
  ...r,
  status: r.status || 'approved'
}));

// Helpers for localStorage sync as fallback & immediate cache
function getStoredLocal<T>(key: string, fallback: T): T {
  try {
    const item = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    if (item) {
      const parsed = JSON.parse(item);
      if (Array.isArray(fallback)) {
        if (Array.isArray(parsed) && parsed.length > 0) return parsed as T;
      } else if (parsed && typeof parsed === 'object') {
        return parsed as T;
      } else if (typeof parsed === 'string' && parsed) {
        return parsed as T;
      }
    }
  } catch (e) {
    console.warn(`Error reading ${key} from localStorage:`, e);
  }
  return fallback;
}

function setStoredLocal<T>(key: string, value: T): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (e) {
    console.warn(`Error writing ${key} to localStorage:`, e);
  }
}

// Real-Time Listeners for Firestore 'config' collection
export function subscribeToHero(callback: (hero: HeroConfig) => void) {
  const docRef = doc(db, 'config', 'hero');
  return onSnapshot(docRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.data() as HeroConfig;
      setStoredLocal('alov_hero_config', data);
      callback(data);
    } else {
      const stored = getStoredLocal('alov_hero_config', DEFAULT_HERO);
      setDoc(docRef, stored).catch(console.error);
      callback(stored);
    }
  }, (err) => {
    console.warn('Hero snapshot error:', err);
    callback(getStoredLocal('alov_hero_config', DEFAULT_HERO));
  });
}

export function subscribeToCategories(callback: (cats: CategoryCard[]) => void) {
  const docRef = doc(db, 'config', 'categories');
  return onSnapshot(docRef, (snapshot) => {
    let items: CategoryCard[] = [];
    if (snapshot.exists() && snapshot.data().items && Array.isArray(snapshot.data().items)) {
      items = snapshot.data().items as CategoryCard[];
    } else {
      items = getStoredLocal('alov_categories_config', DEFAULT_CATEGORIES);
    }

    // Always ensure all 9 DEFAULT_CATEGORIES are present and synced with updated names/images
    const syncedItems: CategoryCard[] = DEFAULT_CATEGORIES.map(defaultCat => {
      const existing = items.find(c => c.id === defaultCat.id);
      if (existing) {
        return {
          ...defaultCat,
          ...existing,
          name: defaultCat.name, // Force user requested new names
          image: existing.image || defaultCat.image,
          description: defaultCat.description
        };
      }
      return defaultCat;
    });

    setStoredLocal('alov_categories_config', syncedItems);
    setDoc(docRef, { items: syncedItems }).catch(console.error);
    callback(syncedItems);
  }, (err) => {
    console.warn('Categories snapshot error:', err);
    callback(DEFAULT_CATEGORIES);
  });
}

export function subscribeToMenu(callback: (items: MenuItem[]) => void) {
  const docRef = doc(db, 'config', 'menu');
  return onSnapshot(docRef, (snapshot) => {
    let items: MenuItem[] = [];
    if (snapshot.exists() && snapshot.data().items && Array.isArray(snapshot.data().items)) {
      items = snapshot.data().items as MenuItem[];
    } else {
      items = getStoredLocal('alov_menu_items', MENU_ITEMS);
    }

    // Check if stored items have the new items. If items length is significantly different or missing category, reset/sync to new MENU_ITEMS
    const hasNewCategories = items.some(i => i.category === 'desertler' || i.category === 'kofe' || i.category === 'kokteyl');
    if (!hasNewCategories || items.length < MENU_ITEMS.length) {
      items = MENU_ITEMS;
      setDoc(docRef, { items: MENU_ITEMS }).catch(console.error);
    }

    setStoredLocal('alov_menu_items', items);
    callback(items);
  }, (err) => {
    console.warn('Menu snapshot error:', err);
    let stored = getStoredLocal('alov_menu_items', MENU_ITEMS);
    if (stored.length < MENU_ITEMS.length) {
      stored = MENU_ITEMS;
    }
    callback(stored);
  });
}

export function subscribeToReviews(callback: (reviews: Review[]) => void) {
  const docRef = doc(db, 'config', 'reviews');
  return onSnapshot(docRef, (snapshot) => {
    if (snapshot.exists() && snapshot.data().items) {
      const items = snapshot.data().items as Review[];
      setStoredLocal('alov_reviews_list', items);
      callback(items);
    } else {
      const stored = getStoredLocal('alov_reviews_list', DEFAULT_REVIEWS);
      setDoc(docRef, { items: stored }).catch(console.error);
      callback(stored);
    }
  }, (err) => {
    console.warn('Reviews snapshot error:', err);
    callback(getStoredLocal('alov_reviews_list', DEFAULT_REVIEWS));
  });
}

export function subscribeToGallery(callback: (photos: GalleryPhoto[]) => void) {
  const docRef = doc(db, 'config', 'gallery');
  return onSnapshot(docRef, (snapshot) => {
    let items: GalleryPhoto[] = [];
    if (snapshot.exists() && snapshot.data().items && Array.isArray(snapshot.data().items)) {
      items = snapshot.data().items as GalleryPhoto[];
    } else {
      items = getStoredLocal('alov_gallery_photos', DEFAULT_GALLERY);
    }

    const isOldGallery = items.length !== 3 || !items.some(i => i.title.toUpperCase() === 'KOFE');
    if (isOldGallery || items.length === 0) {
      items = DEFAULT_GALLERY;
      setDoc(docRef, { items: DEFAULT_GALLERY }).catch(console.error);
    }

    setStoredLocal('alov_gallery_photos', items);
    callback(items);
  }, (err) => {
    console.warn('Gallery snapshot error:', err);
    callback(getStoredLocal('alov_gallery_photos', DEFAULT_GALLERY));
  });
}

// React Custom Hooks
export function useHeroConfig() {
  const [config, setConfig] = useState<HeroConfig>(() =>
    getStoredLocal('alov_hero_config', DEFAULT_HERO)
  );
  useEffect(() => {
    const unsub = subscribeToHero(setConfig);
    return () => unsub();
  }, []);
  return { config };
}

export function useCategoryCards() {
  const [categories, setCategories] = useState<CategoryCard[]>(() =>
    getStoredLocal('alov_categories_config', DEFAULT_CATEGORIES)
  );
  useEffect(() => {
    const unsub = subscribeToCategories(setCategories);
    return () => unsub();
  }, []);
  return { categories };
}

export function useMenuItems() {
  const [items, setItems] = useState<MenuItem[]>(() =>
    getStoredLocal('alov_menu_items', MENU_ITEMS)
  );
  useEffect(() => {
    const unsub = subscribeToMenu(setItems);
    return () => unsub();
  }, []);
  return { items };
}

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>(() =>
    getStoredLocal('alov_reviews_list', DEFAULT_REVIEWS)
  );
  useEffect(() => {
    const unsub = subscribeToReviews(setReviews);
    return () => unsub();
  }, []);
  return { reviews };
}

export function useGalleryPhotos() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(() =>
    getStoredLocal('alov_gallery_photos', DEFAULT_GALLERY)
  );
  useEffect(() => {
    const unsub = subscribeToGallery(setPhotos);
    return () => unsub();
  }, []);
  return { photos };
}

// Writers / Modifiers
export function subscribeToSiteConfig(callback: (config: SiteConfig) => void) {
  const docRef = doc(db, 'config', 'site');
  return onSnapshot(docRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.data() as SiteConfig;
      const merged: SiteConfig = {
        ...DEFAULT_SITE_CONFIG,
        ...data,
        logoUrl: data.logoUrl || DEFAULT_SITE_CONFIG.logoUrl
      };
      setStoredLocal('alov_site_config', merged);
      callback(merged);
    } else {
      const stored = getStoredLocal('alov_site_config', DEFAULT_SITE_CONFIG);
      const merged: SiteConfig = {
        ...DEFAULT_SITE_CONFIG,
        ...stored,
        logoUrl: stored?.logoUrl || DEFAULT_SITE_CONFIG.logoUrl
      };
      setDoc(docRef, merged).catch(console.error);
      callback(merged);
    }
  }, (err) => {
    console.warn('Site config snapshot error:', err);
    const stored = getStoredLocal('alov_site_config', DEFAULT_SITE_CONFIG);
    callback({
      ...DEFAULT_SITE_CONFIG,
      ...stored,
      logoUrl: stored?.logoUrl || DEFAULT_SITE_CONFIG.logoUrl
    });
  });
}

export function useSiteConfig() {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() =>
    getStoredLocal('alov_site_config', DEFAULT_SITE_CONFIG)
  );
  useEffect(() => {
    const unsub = subscribeToSiteConfig(setSiteConfig);
    return () => unsub();
  }, []);
  return { siteConfig };
}

export async function saveSiteConfig(config: SiteConfig) {
  setStoredLocal('alov_site_config', config);
  const docRef = doc(db, 'config', 'site');
  await setDoc(docRef, config);
}

export async function saveHeroConfig(hero: HeroConfig) {
  setStoredLocal('alov_hero_config', hero);
  const docRef = doc(db, 'config', 'hero');
  await setDoc(docRef, hero);
}

export async function saveCategoriesConfig(categories: CategoryCard[]) {
  setStoredLocal('alov_categories_config', categories);
  const docRef = doc(db, 'config', 'categories');
  await setDoc(docRef, { items: categories });
}

export async function saveMenuConfig(menuItems: MenuItem[]) {
  setStoredLocal('alov_menu_items', menuItems);
  const docRef = doc(db, 'config', 'menu');
  await setDoc(docRef, { items: menuItems });
}

export async function saveMenuItem(updatedItem: MenuItem) {
  const docRef = doc(db, 'config', 'menu');
  try {
    const snap = await getDoc(docRef);
    let currentItems: MenuItem[] = getStoredLocal('alov_menu_items', MENU_ITEMS);
    if (snap.exists() && Array.isArray(snap.data()?.items) && snap.data().items.length > 0) {
      currentItems = snap.data().items;
    }
    const index = currentItems.findIndex((i) => i.id === updatedItem.id);
    let newItems: MenuItem[];
    if (index >= 0) {
      newItems = [...currentItems];
      newItems[index] = updatedItem;
    } else {
      newItems = [updatedItem, ...currentItems];
    }
    setStoredLocal('alov_menu_items', newItems);
    await setDoc(docRef, { items: newItems });
  } catch (err) {
    console.error('Error in saveMenuItem:', err);
    throw err;
  }
}

export async function saveCategory(updatedCat: CategoryCard) {
  const docRef = doc(db, 'config', 'categories');
  try {
    const snap = await getDoc(docRef);
    let currentCats: CategoryCard[] = getStoredLocal('alov_categories_config', DEFAULT_CATEGORIES);
    if (snap.exists() && Array.isArray(snap.data()?.items) && snap.data().items.length > 0) {
      currentCats = snap.data().items;
    }
    const index = currentCats.findIndex((c) => c.id === updatedCat.id);
    let newCats: CategoryCard[];
    if (index >= 0) {
      newCats = [...currentCats];
      newCats[index] = updatedCat;
    } else {
      newCats = [...currentCats, updatedCat];
    }
    setStoredLocal('alov_categories_config', newCats);
    await setDoc(docRef, { items: newCats });
  } catch (err) {
    console.error('Error in saveCategory:', err);
    throw err;
  }
}

export async function deleteCategory(catId: string) {
  const docRef = doc(db, 'config', 'categories');
  try {
    const snap = await getDoc(docRef);
    let currentCats: CategoryCard[] = getStoredLocal('alov_categories_config', DEFAULT_CATEGORIES);
    if (snap.exists() && Array.isArray(snap.data()?.items) && snap.data().items.length > 0) {
      currentCats = snap.data().items;
    }
    const newCats = currentCats.filter((c) => c.id !== catId);
    setStoredLocal('alov_categories_config', newCats);
    await setDoc(docRef, { items: newCats });
  } catch (err) {
    console.error('Error in deleteCategory:', err);
    throw err;
  }
}

export async function deleteMenuItem(itemId: string) {
  const docRef = doc(db, 'config', 'menu');
  try {
    const snap = await getDoc(docRef);
    let currentItems: MenuItem[] = getStoredLocal('alov_menu_items', MENU_ITEMS);
    if (snap.exists() && Array.isArray(snap.data()?.items) && snap.data().items.length > 0) {
      currentItems = snap.data().items;
    }
    const newItems = currentItems.filter((i) => i.id !== itemId);
    setStoredLocal('alov_menu_items', newItems);
    await setDoc(docRef, { items: newItems });
  } catch (err) {
    console.error('Error in deleteMenuItem:', err);
    throw err;
  }
}

export async function saveReviewsConfig(reviews: Review[]) {
  setStoredLocal('alov_reviews_list', reviews);
  const docRef = doc(db, 'config', 'reviews');
  await setDoc(docRef, { items: reviews });
}

export async function saveGalleryConfig(photos: GalleryPhoto[]) {
  setStoredLocal('alov_gallery_photos', photos);
  const docRef = doc(db, 'config', 'gallery');
  await setDoc(docRef, { items: photos });
}

