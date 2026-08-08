import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { HeroConfig, CategoryCard, MenuItem, Review, GalleryPhoto, SiteConfig } from '../types';

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  logoUrl: '',
  siteName: 'Alov Qrill & Fast Food'
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
    id: "pizza",
    name: "Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800",
    description: "İsti daş fırında bişən bol xammallı pizzalar",
    order: 1,
    icon: ""
  },
  {
    id: "fastfood",
    name: "Fast Food & Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800",
    description: "Şirəli smash burgerlər və xırçıltılı naggetslər",
    order: 2,
    icon: ""
  },
  {
    id: "pide",
    name: "Pide",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=800",
    description: "Ənənəvi xırçıltılı ətli, pendirli və qıymalı pidələr",
    order: 3,
    icon: ""
  },
  {
    id: "calzone",
    name: "Calizone",
    image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80&w=800",
    description: "İçi bol ərimiş mozzarella və xüsusi qiyməli calzonelar",
    order: 4,
    icon: ""
  },
  {
    id: "doner",
    name: "Dönərlər",
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&q=80&w=800",
    description: "Közdə fırlanan təzə halal ət və toyuq dönərləri",
    order: 5,
    icon: ""
  },
  {
    id: "icikil",
    name: "Soyuq İçkilər",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800",
    description: "Buz kimi sərinləşdirici təbii içkilər və limanadlar",
    order: 6,
    icon: ""
  }
];

export const DEFAULT_GALLERY: GalleryPhoto[] = [
  {
    id: "gal-1",
    title: "Alov Ocağında Köz Qrill",
    description: "Halal xammalla hazırlanan ləzzətli yeməklərimiz",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800",
    order: 1
  },
  {
    id: "gal-2",
    title: "Təzə Fırın Pidesi",
    description: "Daş fırından çıxan xırçıltılı kənarlar",
    imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=800",
    order: 2
  },
  {
    id: "gal-3",
    title: "Mətbəximizin Təmizlik Standartları",
    description: "Yüksək gigiyenik tələblərə tam cavab verən mətbəx",
    imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800",
    order: 3
  },
  {
    id: "gal-4",
    title: "Xüsusi Şef Sac Təamları",
    description: "Köz üzərində zəngin ədviyyatlı xüsusi resept",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
    order: 4
  }
];

export const DEFAULT_REVIEWS: Review[] = INITIAL_REVIEWS.map((r) => ({
  ...r,
  status: r.status || 'approved'
}));

// Real-Time Listeners for Firestore 'config' collection
export function subscribeToHero(callback: (hero: HeroConfig) => void) {
  const docRef = doc(db, 'config', 'hero');
  return onSnapshot(docRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.data() as HeroConfig);
    } else {
      setDoc(docRef, DEFAULT_HERO).catch(console.error);
      callback(DEFAULT_HERO);
    }
  }, (err) => {
    console.warn('Hero snapshot error:', err);
    callback(DEFAULT_HERO);
  });
}

export function subscribeToCategories(callback: (cats: CategoryCard[]) => void) {
  const docRef = doc(db, 'config', 'categories');
  return onSnapshot(docRef, (snapshot) => {
    if (snapshot.exists() && snapshot.data().items) {
      const items = snapshot.data().items as CategoryCard[];
      const validCategoryIds = ['pizza', 'fastfood', 'pide', 'calzone', 'doner', 'icikil'];
      const isValid = items.length === 6 && items.every((c) => validCategoryIds.includes(c.id));
      if (isValid) {
        callback(items);
      } else {
        setDoc(docRef, { items: DEFAULT_CATEGORIES }).catch(console.error);
        callback(DEFAULT_CATEGORIES);
      }
    } else {
      setDoc(docRef, { items: DEFAULT_CATEGORIES }).catch(console.error);
      callback(DEFAULT_CATEGORIES);
    }
  }, (err) => {
    console.warn('Categories snapshot error:', err);
    callback(DEFAULT_CATEGORIES);
  });
}

export function subscribeToMenu(callback: (items: MenuItem[]) => void) {
  const docRef = doc(db, 'config', 'menu');
  return onSnapshot(docRef, (snapshot) => {
    if (snapshot.exists() && snapshot.data().items) {
      const items = snapshot.data().items as MenuItem[];
      const validCategories = ['pizza', 'fastfood', 'pide', 'calzone', 'doner', 'icikil'];
      const isValid = items.length >= 60 && items.every((i) => validCategories.includes(i.category));
      if (isValid) {
        callback(items);
      } else {
        setDoc(docRef, { items: MENU_ITEMS }).catch(console.error);
        callback(MENU_ITEMS);
      }
    } else {
      setDoc(docRef, { items: MENU_ITEMS }).catch(console.error);
      callback(MENU_ITEMS);
    }
  }, (err) => {
    console.warn('Menu snapshot error:', err);
    callback(MENU_ITEMS);
  });
}

export function subscribeToReviews(callback: (reviews: Review[]) => void) {
  const docRef = doc(db, 'config', 'reviews');
  return onSnapshot(docRef, (snapshot) => {
    if (snapshot.exists() && snapshot.data().items) {
      const items = snapshot.data().items as Review[];
      callback(items);
    } else {
      setDoc(docRef, { items: DEFAULT_REVIEWS }).catch(console.error);
      callback(DEFAULT_REVIEWS);
    }
  }, (err) => {
    console.warn('Reviews snapshot error:', err);
    callback(DEFAULT_REVIEWS);
  });
}

export function subscribeToGallery(callback: (photos: GalleryPhoto[]) => void) {
  const docRef = doc(db, 'config', 'gallery');
  return onSnapshot(docRef, (snapshot) => {
    if (snapshot.exists() && snapshot.data().items) {
      const items = snapshot.data().items as GalleryPhoto[];
      if (items.length < DEFAULT_GALLERY.length) {
        setDoc(docRef, { items: DEFAULT_GALLERY }).catch(console.error);
        callback(DEFAULT_GALLERY);
      } else {
        callback(items);
      }
    } else {
      setDoc(docRef, { items: DEFAULT_GALLERY }).catch(console.error);
      callback(DEFAULT_GALLERY);
    }
  }, (err) => {
    console.warn('Gallery snapshot error:', err);
    callback(DEFAULT_GALLERY);
  });
}

// React Custom Hooks
export function useHeroConfig() {
  const [config, setConfig] = useState<HeroConfig>(DEFAULT_HERO);
  useEffect(() => {
    const unsub = subscribeToHero(setConfig);
    return () => unsub();
  }, []);
  return { config };
}

export function useCategoryCards() {
  const [categories, setCategories] = useState<CategoryCard[]>(DEFAULT_CATEGORIES);
  useEffect(() => {
    const unsub = subscribeToCategories(setCategories);
    return () => unsub();
  }, []);
  return { categories };
}

export function useMenuItems() {
  const [items, setItems] = useState<MenuItem[]>(MENU_ITEMS);
  useEffect(() => {
    const unsub = subscribeToMenu(setItems);
    return () => unsub();
  }, []);
  return { items };
}

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>(DEFAULT_REVIEWS);
  useEffect(() => {
    const unsub = subscribeToReviews(setReviews);
    return () => unsub();
  }, []);
  return { reviews };
}

export function useGalleryPhotos() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(DEFAULT_GALLERY);
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
      callback(snapshot.data() as SiteConfig);
    } else {
      setDoc(docRef, DEFAULT_SITE_CONFIG).catch(console.error);
      callback(DEFAULT_SITE_CONFIG);
    }
  }, (err) => {
    console.warn('Site config snapshot error:', err);
    callback(DEFAULT_SITE_CONFIG);
  });
}

export function useSiteConfig() {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);
  useEffect(() => {
    const unsub = subscribeToSiteConfig(setSiteConfig);
    return () => unsub();
  }, []);
  return { siteConfig };
}

export async function saveSiteConfig(config: SiteConfig) {
  const docRef = doc(db, 'config', 'site');
  await setDoc(docRef, config);
}

export async function saveHeroConfig(hero: HeroConfig) {
  const docRef = doc(db, 'config', 'hero');
  await setDoc(docRef, hero);
}

export async function saveCategoriesConfig(categories: CategoryCard[]) {
  const docRef = doc(db, 'config', 'categories');
  await setDoc(docRef, { items: categories });
}

export async function saveMenuConfig(menuItems: MenuItem[]) {
  const docRef = doc(db, 'config', 'menu');
  await setDoc(docRef, { items: menuItems });
}

export async function saveMenuItem(updatedItem: MenuItem) {
  const docRef = doc(db, 'config', 'menu');
  try {
    const snap = await getDoc(docRef);
    let currentItems: MenuItem[] = MENU_ITEMS;
    if (snap.exists() && Array.isArray(snap.data()?.items)) {
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
    await setDoc(docRef, { items: newItems });
  } catch (err) {
    console.error('Error in saveMenuItem:', err);
    throw err;
  }
}

export async function saveReviewsConfig(reviews: Review[]) {
  const docRef = doc(db, 'config', 'reviews');
  await setDoc(docRef, { items: reviews });
}

export async function saveGalleryConfig(photos: GalleryPhoto[]) {
  const docRef = doc(db, 'config', 'gallery');
  await setDoc(docRef, { items: photos });
}

