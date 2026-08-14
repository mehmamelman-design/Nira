import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { HeroConfig, CategoryCard, MenuItem, Review, GalleryPhoto, SiteConfig, CategoryId } from '../types';

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  logoUrl: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786350661/Ba%C5%9Fl%C4%B1qs%C4%B1z_dizayn-Photoroom_1_l3cpaz.png',
  siteName: 'NIRA-Fest&Food Restorani'
};
import { MENU_ITEMS } from '../data/menuData';
import { INITIAL_REVIEWS } from '../data/initialData';

// Fallback Defaults
export const DEFAULT_HERO: HeroConfig = {
  title: "Qaynar İsti Ocaqdan Qapınıza Çatdırılan Ən Ləzzətli Fast Food",
  subtitle: "Təzə kəsilmiş halal ət, isti ocağın əvəzolunmaz qoxusu və xüsusi reseptlə hazırlanan çıtır qızarmış toyuqlar. Sifarişiniz xüsusi termo-qutularda 30 dəqiqəyə qaynar halda çatdırılır!",
  videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-chef-cooking-food-in-a-pan-40292-large.mp4",
  imageUrl: "https://res.cloudinary.com/dq8xegykm/image/upload/v1786350674/ChatGPT_Image_10_A%C4%9Fu_2026_12_06_26_c6pwbt.png",
  images: [
    "https://res.cloudinary.com/dq8xegykm/image/upload/v1786350674/ChatGPT_Image_10_A%C4%9Fu_2026_12_06_26_c6pwbt.png",
    "https://res.cloudinary.com/dq8xegykm/image/upload/v1786350671/ChatGPT_Image_10_A%C4%9Fu_2026_11_57_20_yrph6f.png",
    "https://res.cloudinary.com/dq8xegykm/image/upload/v1786350673/ChatGPT_Image_10_A%C4%9Fu_2026_12_04_24_zwwfvx.png",
    "https://res.cloudinary.com/dq8xegykm/image/upload/v1786350672/ChatGPT_Image_10_A%C4%9Fu_2026_12_07_18_viesgt.png"
  ],
  mobileImages: [],
  isVideoEnabled: false
};

export const DEFAULT_MIDDLE_HERO: HeroConfig = {
  title: "Təzə Və Xüsusi Şirniyyatlar, İsti Və Soyuq İçkilər",
  subtitle: "Sizlər üçün xüsusi olaraq hazırlanan təbii içkilər və ləzzətli desertlər",
  videoUrl: "",
  imageUrl: "https://res.cloudinary.com/dq8xegykm/image/upload/v1786351544/ChatGPT_Image_9_A%C4%9Fu_2026_22_25_23_zcqmky.png",
  images: [
    "https://res.cloudinary.com/dq8xegykm/image/upload/v1786351544/ChatGPT_Image_9_A%C4%9Fu_2026_22_25_23_zcqmky.png",
    "https://res.cloudinary.com/dq8xegykm/image/upload/v1786351502/ChatGPT_Image_9_A%C4%9Fu_2026_22_36_26_stqwzb.png",
    "https://res.cloudinary.com/dq8xegykm/image/upload/v1786351567/ChatGPT_Image_9_A%C4%9Fu_2026_22_28_28_cfwplx.png",
    "https://res.cloudinary.com/dq8xegykm/image/upload/v1786351517/ChatGPT_Image_9_A%C4%9Fu_2026_22_34_33_rltry0.png"
  ],
  mobileImages: [],
  isVideoEnabled: false
};

export const DEFAULT_CATEGORIES: CategoryCard[] = [
  {
    id: "fastfood",
    name: "Burger və Nugget",
    image: "https://res.cloudinary.com/dq8xegykm/image/upload/v1786550635/1_burger_f0ywic.png",
    description: "Xırçıltılı smash burgerlər, dadlı naggetslər və kartof fri",
    order: 1,
    icon: ""
  },
  {
    id: "pizza",
    name: "Pizza",
    image: "https://res.cloudinary.com/dq8xegykm/image/upload/v1786550631/1_pizza_rpifyv.png",
    description: "İsti daş fırında bişən bol xammallı pizzalar",
    order: 2,
    icon: ""
  },
  {
    id: "kabablar",
    name: "Kabablar",
    image: "https://res.cloudinary.com/dq8xegykm/image/upload/v1786550631/isti_yemekler_1_oqleld.png",
    description: "Közdə bişən ləzzətli ət, tikə və lülə kabablar",
    order: 3,
    icon: ""
  },
  {
    id: "isti_yemekler",
    name: "İsti yeməklər",
    image: "https://res.cloudinary.com/dq8xegykm/image/upload/v1786550626/isti_yemkelr_2_ra3zpa.png",
    description: "Təzə bişmiş ləzzətli isti ana yeməklər və fırın yeməkləri",
    order: 4,
    icon: ""
  },
  {
    id: "icikil",
    name: "Soyuq içkilər",
    image: "https://res.cloudinary.com/dq8xegykm/image/upload/v1786701542/ChatGPT_Image_14_A%C4%9Fu_2026_13_50_07_yvegnm.png",
    description: "Buz kimi sərinləşdirici təbii içkilər və limonadlar",
    order: 5,
    icon: ""
  },
  {
    id: "sorbalar",
    name: "Şorbalar",
    image: "https://res.cloudinary.com/dq8xegykm/image/upload/v1786530069/sorbalar_ww79co.png",
    description: "Xüsusi reseptlə hazırlanan isti ev şorbaları",
    order: 6,
    icon: ""
  },
  {
    id: "salat",
    name: "Salat",
    image: "https://res.cloudinary.com/dq8xegykm/image/upload/v1786599164/ChatGPT_Image_13_A%C4%9Fu_2026_09_32_13_iwghdq.png",
    description: "Təravətli tərəvəzlərdən hazırlanan xüsusi salatlar",
    order: 7,
    icon: ""
  },
  {
    id: "cig_kofte",
    name: "Çiy köftə",
    image: "https://res.cloudinary.com/dq8xegykm/image/upload/v1786550623/cig_kofte_1_stkjib.png",
    description: "Xüsusi ədviyyatlı və acılı təzə çiy köftələr",
    order: 8,
    icon: ""
  },
  {
    id: "qelyanaltilar",
    name: "Qəlyanaltılar",
    image: "https://res.cloudinary.com/dq8xegykm/image/upload/v1786550625/Asortmen_qelyuanatli_mbjfyb.png",
    description: "Çıtır toyuq kanatları, fri, soğan halqaları və souslar",
    order: 9,
    icon: ""
  },
  {
    id: "pide",
    name: "Pidə",
    image: "https://res.cloudinary.com/dq8xegykm/image/upload/v1786703193/ChatGPT_Image_14_A%C4%9Fu_2026_14_26_12_ed5ae0.png",
    description: "İsti daş fırında bişmiş bol kaşar pendirli, qiyməli və kuşbaşılı pidelər",
    order: 10,
    icon: ""
  },
  {
    id: "desertler",
    name: "Desertlər",
    image: "https://res.cloudinary.com/dq8xegykm/image/upload/v1786706141/ChatGPT_Image_14_A%C4%9Fu_2026_15_15_19_olyytt.png",
    description: "Xüsusi paxlavalar, San Sebastian, cheesecake, künefe və tortlar",
    order: 11,
    icon: ""
  },
  {
    id: "kofe",
    name: "Kofe",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800",
    description: "Espresso, Americano, Latte, Cappucino, Raf, Mokka və zəngin kofe çeşidləri",
    order: 12,
    icon: ""
  },
  {
    id: "kokteyl",
    name: "Kokteyl",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800",
    description: "Sərinləşdirici Mojito, Mix Shake və xüsusi Nira kokteyli",
    order: 13,
    icon: ""
  }
];

export function formatAzTitle(text: string, id?: string): string {
  if (!text && !id) return '';
  const str = (text || id || '').replace(/_/g, ' ').trim();
  if (!str) return '';

  const lowerStr = str.toLowerCase();
  if (lowerStr === 'isti_yemekler' || lowerStr === 'isti yemekler' || lowerStr === 'isti yemek' || id === 'isti_yemekler') return 'İsti yeməklər';
  if (lowerStr === 'kabablar' || lowerStr === 'kabab' || id === 'kabablar') return 'Kabablar';
  if (lowerStr === 'sorbalar' || lowerStr === 'şorbalar' || id === 'sorbalar') return 'Şorbalar';
  if (lowerStr === 'qelyanaltilar' || lowerStr === 'qəlyanaltılar' || lowerStr === 'qelyanalti' || id === 'qelyanaltilar') return 'Qəlyanaltılar';
  if (lowerStr === 'fastfood' || lowerStr === 'fast food' || lowerStr === 'burger və nugget' || lowerStr === 'burger ve nugget' || lowerStr === 'burger & fast food' || id === 'fastfood') return 'Burger və Nugget';
  if (lowerStr === 'soyuq içkilər' || lowerStr === 'soyuq ickiler' || lowerStr === 'icikil' || id === 'icikil') return 'Soyuq içkilər';
  if (lowerStr === 'cig_kofte' || lowerStr === 'çiy köftə' || id === 'cig_kofte') return 'Çiy köftə';
  if (lowerStr === 'desertler' || lowerStr === 'desertlər' || id === 'desertler') return 'Desertlər';
  if (lowerStr === 'salat' || id === 'salat') return 'Salat';
  if (lowerStr === 'pizza' || id === 'pizza') return 'Pizza';
  if (lowerStr === 'pide' || id === 'pide') return 'Pidə';
  if (lowerStr === 'kofe' || id === 'kofe') return 'Kofe';
  if (lowerStr === 'kokteyl' || id === 'kokteyl') return 'Kokteyl';

  return str;
}

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
    description: "Xüsusi paxlavalar, San Sebastian, cheesecake, sütlaç, künefe və tortlar",
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
  const enrichHero = (data: HeroConfig): HeroConfig => {
    const hasCloudinary = data.images && data.images.some(img => img && img.startsWith('https://res.cloudinary.com'));
    if (!data.images || data.images.length === 0 || !hasCloudinary) {
      return {
        ...data,
        imageUrl: DEFAULT_HERO.imageUrl,
        images: DEFAULT_HERO.images
      };
    }
    return data;
  };

  return onSnapshot(docRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = enrichHero(snapshot.data() as HeroConfig);
      setStoredLocal('alov_hero_config', data);
      callback(data);
    } else {
      const stored = enrichHero(getStoredLocal('alov_hero_config', DEFAULT_HERO));
      setStoredLocal('alov_hero_config', stored);
      setDoc(docRef, stored).catch(console.error);
      callback(stored);
    }
  }, (err) => {
    console.warn('Hero snapshot error:', err);
    const stored = enrichHero(getStoredLocal('alov_hero_config', DEFAULT_HERO));
    callback(stored);
  });
}

export function subscribeToCategories(callback: (cats: CategoryCard[]) => void) {
  const docRef = doc(db, 'config', 'categories');
  const defaultCatMap = new Map<string, CategoryCard>(DEFAULT_CATEGORIES.map(c => [c.id, c]));

  return onSnapshot(docRef, (snapshot) => {
    let items: CategoryCard[] = [];
    if (snapshot.exists() && snapshot.data().items && Array.isArray(snapshot.data().items) && snapshot.data().items.length > 0) {
      const remoteItems = snapshot.data().items as CategoryCard[];
      items = remoteItems.map(c => {
        const def = defaultCatMap.get(c.id);
        const image = (def?.image && def.image.startsWith('https://res.cloudinary.com'))
          ? def.image
          : (c.image || def?.image || '');
        return {
          ...c,
          name: formatAzTitle(c.name, c.id),
          image
        };
      });
      setStoredLocal('alov_categories_config', items);
      callback(items);
    } else {
      const stored = getStoredLocal('alov_categories_config', DEFAULT_CATEGORIES);
      items = stored.map(c => {
        const def = defaultCatMap.get(c.id);
        const image = (def?.image && def.image.startsWith('https://res.cloudinary.com'))
          ? def.image
          : (c.image || def?.image || '');
        return {
          ...c,
          name: formatAzTitle(c.name, c.id),
          image
        };
      });
      setStoredLocal('alov_categories_config', items);
      setDoc(docRef, { items }).catch(console.error);
      callback(items);
    }
  }, (err) => {
    console.warn('Categories snapshot error:', err);
    const stored = getStoredLocal('alov_categories_config', DEFAULT_CATEGORIES);
    callback(stored.map(c => {
      const def = defaultCatMap.get(c.id);
      const image = (def?.image && def.image.startsWith('https://res.cloudinary.com'))
        ? def.image
        : (c.image || def?.image || '');
      return {
        ...c,
        name: formatAzTitle(c.name, c.id),
        image
      };
    }));
  });
}

export function subscribeToMenu(callback: (items: MenuItem[]) => void) {
  const docRef = doc(db, 'config', 'menu');
  const defaultMap = new Map<string, MenuItem>(MENU_ITEMS.map(m => [m.id, m]));
  const validPizzaIds = new Set(['pz-1', 'pz-2', 'pz-3', 'pz-4', 'pz-5', 'pz-6', 'pz-7']);
  const validFastfoodIds = new Set(['ff-1', 'ff-2', 'ff-3', 'ff-4', 'ff-5', 'ff-6', 'ff-8', 'ff-9', 'ff-10', 'ff-11', 'ff-12', 'ff-13']);
  const validPideIds = new Set(['pd-1', 'pd-2', 'pd-3', 'pd-4', 'pd-5', 'pd-6', 'pd-7']);
  const validCoffeeIds = new Set(['kof-1', 'kof-2', 'kof-3', 'kof-4', 'kof-5', 'kof-6', 'kof-7', 'kof-8']);
  const validDessertIds = new Set(['des-1', 'des-2', 'des-3', 'des-4', 'des-5', 'des-6', 'des-7', 'des-8', 'des-9', 'des-10', 'des-11', 'des-12', 'des-13']);

  const enrichWithDefaults = (list: MenuItem[]): MenuItem[] => {
    const coffeeKeywords = ['espresso', 'ekspreso', 'americano', 'amerikano', 'cappuccino', 'kappuçino', 'latte', 'qəhvə', 'türk qəhvəsi', 'nescafe', 'raf', 'mokka', 'isti şokolad', 'spanish cappucino'];
    const validColdDrinkIds = new Set(['ic-cola', 'ic-fanta', 'ic-sprite', 'ic-sirab', 'ic-ayran', 'ic-cesme', 'ic-qizilquyu', 'ic-meyvesiresi', 'ic-fresh', 'ic-kompotlar', 'ic-coplu']);

    const cleanList = list.filter(it => {
      if (it.id === 'ff-7') return false;
      // Filter dessert items to exactly the 13 valid items
      if (it.category === 'desertler' && !validDessertIds.has(it.id)) return false;
      // Remove any old/unauthorized pizza items
      if (it.category === 'pizza' && !validPizzaIds.has(it.id)) return false;
      // Remove old fastfood items not in valid list
      if (it.category === 'fastfood' && !validFastfoodIds.has(it.id)) return false;
      // Filter pide items to exactly the 7 valid items
      if (it.category === 'pide' && !validPideIds.has(it.id)) return false;
      // Filter coffee items to exactly the 8 valid items
      if (it.category === 'kofe' && !validCoffeeIds.has(it.id)) return false;
      // Filter out invalid/extra cold drinks so only the 11 official ones appear in icikil
      if (it.category === 'icikil' && !validColdDrinkIds.has(it.id)) return false;
      const lowerName = (it.name || '').toLowerCase();
      if (lowerName.includes('pitsa') && !validPizzaIds.has(it.id)) return false;
      if (
        lowerName.includes('alov special') ||
        lowerName.includes('klassik margarita') ||
        lowerName.includes('acılı pepperoni') ||
        lowerName.includes('toyuqlu barbeque') ||
        lowerName.includes('dörd pendirli') ||
        lowerName.includes('vetçinaylı') ||
        lowerName.includes('dəniz məhsulları') ||
        lowerName.includes('bol sucuqlu xırçıltılı') ||
        lowerName.includes('sezar toyuqlu') ||
        lowerName.includes('vegeterian tərəvəzli')
      ) {
        return false;
      }
      return true;
    }).map((it): MenuItem => {
      // Fix coffee and cocktail items that were mistakenly placed under cold drinks (icikil)
      const lowerName = (it.name || '').toLowerCase();
      const isCoffee = it.id.startsWith('kof-') || coffeeKeywords.some(kw => lowerName.includes(kw));
      if (isCoffee && (it.category === 'icikil' || it.category === 'ickiler')) {
        return { ...it, category: 'kofe' as CategoryId };
      }
      const isCocktail = it.id.startsWith('kok-') || ['moxito', 'miks şeyk', 'nira kokteyl', 'kokteyl'].some(kw => lowerName.includes(kw));
      if (isCocktail && (it.category === 'icikil' || it.category === 'ickiler')) {
        return { ...it, category: 'kokteyl' as CategoryId };
      }
      return it as MenuItem;
    });
    const existingIds = new Set(cleanList.map(it => it.id));

    const enriched = cleanList.map(it => {
      const def = defaultMap.get(it.id);
      if (def) {
        if (def.id.startsWith('pd-') || def.id.startsWith('kof-') || def.id.startsWith('des-')) {
          return {
            ...def,
            image: (def.image && def.image.startsWith('https://res.cloudinary.com')) ? def.image : (it.image || def.image)
          };
        }
        const image = (def.image && def.image.startsWith('https://res.cloudinary.com'))
          ? def.image
          : (it.image || def.image);
        return {
          ...def,
          ...it,
          name: def.name,
          image,
          price: it.price !== undefined ? it.price : def.price,
          variants: def.variants || it.variants,
          category: def.category || it.category
        };
      }
      return it;
    });

    MENU_ITEMS.forEach(def => {
      if (!existingIds.has(def.id)) {
        enriched.push(def);
      }
    });

    return enriched;
  };

  return onSnapshot(docRef, (snapshot) => {
    let items: MenuItem[] = [];
    if (snapshot.exists() && snapshot.data().items && Array.isArray(snapshot.data().items) && snapshot.data().items.length > 0) {
      const remoteItems = snapshot.data().items as MenuItem[];
      items = enrichWithDefaults(remoteItems);
      setStoredLocal('alov_menu_items', items);
      if (items.length !== remoteItems.length) {
        setDoc(docRef, { items }).catch(console.error);
      }
      callback(items);
    } else {
      const stored = getStoredLocal('alov_menu_items', MENU_ITEMS);
      items = enrichWithDefaults(stored);
      setStoredLocal('alov_menu_items', items);
      setDoc(docRef, { items }).catch(console.error);
      callback(items);
    }
  }, (err) => {
    console.warn('Menu snapshot error:', err);
    const stored = getStoredLocal('alov_menu_items', MENU_ITEMS);
    callback(enrichWithDefaults(stored));
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
    if (snapshot.exists() && snapshot.data().items && Array.isArray(snapshot.data().items) && snapshot.data().items.length > 0) {
      items = snapshot.data().items as GalleryPhoto[];
      setStoredLocal('alov_gallery_photos', items);
      callback(items);
    } else {
      items = getStoredLocal('alov_gallery_photos', DEFAULT_GALLERY);
      setStoredLocal('alov_gallery_photos', items);
      setDoc(docRef, { items }).catch(console.error);
      callback(items);
    }
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

export function subscribeToMiddleHero(callback: (hero: HeroConfig) => void) {
  const docRef = doc(db, 'config', 'middle_hero');
  const enrichMiddleHero = (data: HeroConfig): HeroConfig => {
    const hasCloudinary = data.images && data.images.some(img => img && img.startsWith('https://res.cloudinary.com'));
    if (!data.images || data.images.length === 0 || !hasCloudinary) {
      return {
        ...data,
        imageUrl: DEFAULT_MIDDLE_HERO.imageUrl,
        images: DEFAULT_MIDDLE_HERO.images
      };
    }
    return data;
  };

  return onSnapshot(docRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = enrichMiddleHero(snapshot.data() as HeroConfig);
      setStoredLocal('alov_middle_hero_config', data);
      callback(data);
    } else {
      const stored = enrichMiddleHero(getStoredLocal('alov_middle_hero_config', DEFAULT_MIDDLE_HERO));
      setStoredLocal('alov_middle_hero_config', stored);
      setDoc(docRef, stored).catch(console.error);
      callback(stored);
    }
  }, (err) => {
    console.warn('Middle Hero snapshot error:', err);
    const stored = enrichMiddleHero(getStoredLocal('alov_middle_hero_config', DEFAULT_MIDDLE_HERO));
    callback(stored);
  });
}

export function useMiddleHeroConfig() {
  const [middleHeroConfig, setMiddleHeroConfig] = useState<HeroConfig>(() =>
    getStoredLocal('alov_middle_hero_config', DEFAULT_MIDDLE_HERO)
  );
  useEffect(() => {
    const unsub = subscribeToMiddleHero(setMiddleHeroConfig);
    return () => unsub();
  }, []);
  return { middleHeroConfig };
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
  const isOldLogo = (url?: string) => !url || url.includes('Ba%C5%9Fl%C4%B1qs%C4%B1z_dizayn-Photoroom_t4omj6.png') || url.includes('Ba%C5%9Fl%C4%B1qs%C4%B1z_dizayn-Photoroom.png');

  return onSnapshot(docRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.data() as SiteConfig;
      const logoUrl = isOldLogo(data.logoUrl) ? DEFAULT_SITE_CONFIG.logoUrl : data.logoUrl;
      const merged: SiteConfig = {
        ...DEFAULT_SITE_CONFIG,
        ...data,
        logoUrl
      };
      setStoredLocal('alov_site_config', merged);
      if (isOldLogo(data.logoUrl)) {
        setDoc(docRef, merged).catch(console.error);
      }
      callback(merged);
    } else {
      const stored = getStoredLocal('alov_site_config', DEFAULT_SITE_CONFIG);
      const logoUrl = isOldLogo(stored?.logoUrl) ? DEFAULT_SITE_CONFIG.logoUrl : (stored?.logoUrl || DEFAULT_SITE_CONFIG.logoUrl);
      const merged: SiteConfig = {
        ...DEFAULT_SITE_CONFIG,
        ...stored,
        logoUrl
      };
      setStoredLocal('alov_site_config', merged);
      setDoc(docRef, merged).catch(console.error);
      callback(merged);
    }
  }, (err) => {
    console.warn('Site config snapshot error:', err);
    const stored = getStoredLocal('alov_site_config', DEFAULT_SITE_CONFIG);
    const logoUrl = isOldLogo(stored?.logoUrl) ? DEFAULT_SITE_CONFIG.logoUrl : (stored?.logoUrl || DEFAULT_SITE_CONFIG.logoUrl);
    callback({
      ...DEFAULT_SITE_CONFIG,
      ...stored,
      logoUrl
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

export async function saveMiddleHeroConfig(hero: HeroConfig) {
  setStoredLocal('alov_middle_hero_config', hero);
  const docRef = doc(db, 'config', 'middle_hero');
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

