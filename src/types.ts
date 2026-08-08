export type CategoryId = 
  | 'all' 
  | 'pizza' 
  | 'fastfood' 
  | 'pide' 
  | 'calzone' 
  | 'doner' 
  | 'icikil'
  | 'kabablar' 
  | 'isti_yemekler' 
  | 'salat' 
  | 'cig_kofte' 
  | 'sorbalar' 
  | 'qelyanaltilar' 
  | 'desertler' 
  | 'ickiler';

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  description: string;
  ingredients?: string;
  price: number;
  image: string;
  isPopular?: boolean;
  isSpicy?: boolean;
  isHalal?: boolean;
  isOutOfStock?: boolean;
  prepTime?: string;
  rating?: number;
  calories?: string;
  options?: string[];
}

export interface Review {
  id: string;
  name: string;
  rating: number; // 1 to 5
  date: string;
  comment: string;
  orderedItem?: string;
  helpfulCount: number;
  isVerified?: boolean;
  avatarUrl?: string;
  status?: 'approved' | 'pending' | 'hidden';
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedOption?: string;
  notes?: string;
}

export interface HeroConfig {
  title: string;
  subtitle: string;
  videoUrl: string;
  imageUrl: string;
  isVideoEnabled: boolean;
}

export interface CategoryCard {
  id: string;
  name: string;
  image: string;
  description?: string;
  order?: number;
  icon?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  order: number;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  workingHours: string;
  phone: string;
  whatsapp: string;
  mapEmbedUrl: string;
  googleMapsUrl: string;
  isMain?: boolean;
}

export interface FeatureBadge {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface SiteConfig {
  logoUrl?: string;
  siteName?: string;
}

export interface CounterStat {
  value: string;
  label: string;
  subtext: string;
  iconName: string;
}

