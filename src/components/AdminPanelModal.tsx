import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  LogOut,
  Save,
  Trash2,
  Check,
  EyeOff,
  Plus,
  Star,
  Image as ImageIcon,
  Film,
  DollarSign,
  Tag,
  Utensils,
  MessageSquare,
  Layout,
  Upload,
  CheckCircle2,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  Flame,
  Search,
  ShieldAlert,
  ShieldCheck,
  Clock,
  BarChart3,
  Users,
  MousePointerClick,
  TrendingUp,
  Activity
} from 'lucide-react';
import { auth } from '../lib/firebase';
import { useRealtimeAnalytics } from '../lib/analytics';
import { HeroConfig, CategoryCard, MenuItem, Review, GalleryPhoto } from '../types';
import { compressImageFile } from '../lib/imageCompressor';
import {
  saveHeroConfig,
  saveCategoriesConfig,
  saveMenuConfig,
  saveReviewsConfig,
  saveGalleryConfig,
  DEFAULT_HERO
} from '../lib/cmsStore';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  heroConfig: HeroConfig;
  categories: CategoryCard[];
  menuItems: MenuItem[];
  reviews: Review[];
  galleryPhotos: GalleryPhoto[];
  onShowToast: (msg: string) => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  heroConfig,
  categories,
  menuItems,
  reviews,
  galleryPhotos,
  onShowToast
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [activeTab, setActiveTab] = useState<'analytics' | 'reviews' | 'gallery' | 'menu' | 'prices' | 'hero'>('analytics');

  // Real-time analytics hook
  const analytics = useRealtimeAnalytics();

  // Editable local states for form modifications
  const [localHero, setLocalHero] = useState<HeroConfig>(heroConfig);
  const [localCategories, setLocalCategories] = useState<CategoryCard[]>(categories);
  const [localMenu, setLocalMenu] = useState<MenuItem[]>(menuItems);
  const [localReviews, setLocalReviews] = useState<Review[]>(reviews);
  const [localGallery, setLocalGallery] = useState<GalleryPhoto[]>(galleryPhotos);

  // Search & Filters in Admin
  const [menuSearch, setMenuSearch] = useState('');
  const [priceSearch, setPriceSearch] = useState('');
  const [reviewFilter, setReviewFilter] = useState<'all' | 'approved' | 'pending' | 'hidden'>('all');

  // Modal for Admin adding a new review
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [newRevName, setNewRevName] = useState('');
  const [newRevRating, setNewRevRating] = useState(5);
  const [newRevComment, setNewRevComment] = useState('');
  const [newRevOrderedItem, setNewRevOrderedItem] = useState('');

  // Modal for adding a new Gallery photo
  const [showAddGalleryModal, setShowAddGalleryModal] = useState(false);
  const [newGalTitle, setNewGalTitle] = useState('');
  const [newGalDesc, setNewGalDesc] = useState('');
  const [newGalUrl, setNewGalUrl] = useState('');

  // Modal for adding a new Category Card / Set Card
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newCatImage, setNewCatImage] = useState('');

  // Modal for adding a new Menu Item directly in Admin Panel
  const [showAddMenuItemModal, setShowAddMenuItemModal] = useState(false);
  const [newMenuName, setNewMenuName] = useState('');
  const [newMenuPrice, setNewMenuPrice] = useState<number | string>('');
  const [newMenuCategory, setNewMenuCategory] = useState<string>('pizza');
  const [newMenuDesc, setNewMenuDesc] = useState('');
  const [newMenuIngredients, setNewMenuIngredients] = useState('');
  const [newMenuImage, setNewMenuImage] = useState('');
  const [newMenuIsPopular, setNewMenuIsPopular] = useState(false);
  const [newMenuIsHalal, setNewMenuIsHalal] = useState(true);

  useEffect(() => {
    setLocalHero(heroConfig);
  }, [heroConfig]);

  useEffect(() => {
    setLocalCategories(categories);
  }, [categories]);

  useEffect(() => {
    setLocalMenu(menuItems);
  }, [menuItems]);

  useEffect(() => {
    setLocalReviews(reviews);
  }, [reviews]);

  useEffect(() => {
    setLocalGallery(galleryPhotos);
  }, [galleryPhotos]);

  useEffect(() => {
    if (isOpen) {
      const stored = localStorage.getItem('alov_user');
      let email = auth.currentUser?.email?.toLowerCase() || '';
      if (!email && stored) {
        try {
          email = JSON.parse(stored)?.email?.toLowerCase() || '';
        } catch (e) {}
      }
      if (email === 'mehmamelman@gmail.com' || email === 'admin@alov.az' || email === 'admin') {
        setIsAuthenticated(true);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleQuickAdminLogin = () => {
    const adminUser = {
      fullName: 'Admin (mehmamelman)',
      email: 'mehmamelman@gmail.com',
      phone: '(051) 635 94 74'
    };
    localStorage.setItem('alov_user', JSON.stringify(adminUser));
    setIsAuthenticated(true);
    setPasswordError(false);
    if (onShowToast) onShowToast('Admin Panelə uğurla daxil oldunuz!');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '12345' || password === 'admin' || password === 'alov2026') {
      setIsAuthenticated(true);
      setPasswordError(false);
      onShowToast('Admin Panelə uğurla daxil oldunuz!');
    } else {
      setPasswordError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  // Helper for image file to compressed base64 Data URL
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImageFile(file);
        callback(compressed);
        onShowToast('Şəkil uğurla yükləndi!');
      } catch (err: any) {
        alert(err.message || 'Şəkil yüklənərkən xəta baş verdi');
      }
    }
  };

  // --- SAVE HANDLERS ---
  const handleSaveHero = async () => {
    try {
      await saveHeroConfig(localHero);
      onShowToast('Hero bölməsi Firestore-da uğurla saxlanıldı!');
    } catch (err) {
      console.error(err);
      onShowToast('Xəta baş verdi: Saxlanıla bilmədi.');
    }
  };

  const handleSaveCategories = async (updatedCategoriesList?: CategoryCard[]) => {
    try {
      const listToSave = updatedCategoriesList || localCategories;
      await saveCategoriesConfig(listToSave);
      onShowToast('Kateqoriya və Qalereya kartları Firestore-da uğurla saxlanıldı!');
    } catch (err) {
      console.error(err);
      onShowToast('Xəta baş verdi!');
    }
  };

  const handleSaveMenu = async (updatedMenuList?: MenuItem[]) => {
    try {
      const listToSave = updatedMenuList || localMenu;
      await saveMenuConfig(listToSave);
      onShowToast('Yemək menyusu və təfərrüatları Firestore-da uğurla saxlanıldı!');
    } catch (err) {
      console.error(err);
      onShowToast('Xəta baş verdi!');
    }
  };

  const handleDeleteCategory = (catId: string) => {
    const updated = localCategories.filter((c) => c.id !== catId);
    setLocalCategories(updated);
    handleSaveCategories(updated);
  };

  const handleDeleteMenuItem = (itemId: string) => {
    const updated = localMenu.filter((m) => m.id !== itemId);
    setLocalMenu(updated);
    handleSaveMenu(updated);
  };

  const handleAdminAddCategory = () => {
    if (!newCatName) {
      alert('Zəhmət olmasa kateqoriya adını daxil edin.');
      return;
    }
    const catId = newCatName.toLowerCase().replace(/[^a-z0-9]/g, '_') || `cat_${Date.now()}`;
    const created: CategoryCard = {
      id: catId,
      name: newCatName,
      description: newCatDesc || 'Xüsusi dadlar və ləzzətli menyular',
      image: newCatImage || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200',
      icon: ''
    };
    const updated = [...localCategories, created];
    setLocalCategories(updated);
    handleSaveCategories(updated);
    setShowAddCategoryModal(false);
    setNewCatName('');
    setNewCatDesc('');
    setNewCatImage('');
  };

  const handleAdminAddMenuItem = () => {
    if (!newMenuName) {
      alert('Zəhmət olmasa yeməyin adını daxil edin.');
      return;
    }
    const created: MenuItem = {
      id: `item_${Date.now()}`,
      name: newMenuName.trim(),
      price: typeof newMenuPrice === 'number' ? newMenuPrice : parseFloat(newMenuPrice as string) || 0,
      description: newMenuDesc.trim() || 'Təzə və ləzzətli xammallarla hazırlanan xüsusi təam.',
      category: (newMenuCategory as any) || 'pizza',
      ingredients: newMenuIngredients.trim() || 'Təzə ərzaqlar, Mozzarella',
      image: newMenuImage.trim() || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
      isPopular: newMenuIsPopular,
      isHalal: newMenuIsHalal,
      prepTime: '12 dəq',
      rating: 4.9,
      isOutOfStock: false
    };
    const updated = [created, ...localMenu];
    setLocalMenu(updated);
    handleSaveMenu(updated);
    setShowAddMenuItemModal(false);
    setNewMenuName('');
    setNewMenuPrice('');
    setNewMenuDesc('');
    setNewMenuIngredients('');
    setNewMenuImage('');
    setNewMenuIsPopular(false);
    setNewMenuIsHalal(true);
  };

  const handleSaveReviews = async (updatedReviewsList?: Review[]) => {
    try {
      const listToSave = updatedReviewsList || localReviews;
      await saveReviewsConfig(listToSave);
      onShowToast('Şərhlər Firestore-da uğurla saxlanıldı!');
    } catch (err) {
      console.error(err);
      onShowToast('Xəta baş verdi!');
    }
  };

  const handleSaveGallery = async (updatedGalleryList?: GalleryPhoto[]) => {
    try {
      const listToSave = updatedGalleryList || localGallery;
      await saveGalleryConfig(listToSave);
      onShowToast('Qalereya fotoları Firestore-da uğurla saxlanıldı!');
    } catch (err) {
      console.error(err);
      onShowToast('Xəta baş verdi!');
    }
  };

  // --- REVIEWS ACTIONS ---
  const handleUpdateReviewStatus = (id: string, status: 'approved' | 'pending' | 'hidden') => {
    const updated = localReviews.map((r) => (r.id === id ? { ...r, status } : r));
    setLocalReviews(updated);
    handleSaveReviews(updated);
  };

  const handleDeleteReview = (id: string) => {
    const updated = localReviews.filter((r) => r.id !== id);
    setLocalReviews(updated);
    handleSaveReviews(updated);
  };

  const handleAdminAddReview = () => {
    if (!newRevName || !newRevComment) {
      alert('Zəhmət olmasa adı və şərhi daxil edin.');
      return;
    }
    const created: Review = {
      id: `rev-admin-${Date.now()}`,
      name: newRevName,
      rating: newRevRating,
      date: 'İndi (Admin)',
      comment: newRevComment,
      orderedItem: newRevOrderedItem || 'Restoran Qonağı',
      helpfulCount: 0,
      isVerified: true,
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(newRevName)}`,
      status: 'approved'
    };
    const updated = [created, ...localReviews];
    setLocalReviews(updated);
    handleSaveReviews(updated);
    setShowAddReviewModal(false);
    setNewRevName('');
    setNewRevComment('');
    setNewRevOrderedItem('');
  };

  // --- GALLERY ACTIONS ---
  const handleAdminAddGalleryPhoto = () => {
    if (!newGalTitle || !newGalUrl) {
      alert('Zəhmət olmasa başlıq və foto URL daxil edin.');
      return;
    }
    const created: GalleryPhoto = {
      id: `gal-${Date.now()}`,
      title: newGalTitle,
      description: newGalDesc || 'Alov Fast Food qalereya fotosu',
      imageUrl: newGalUrl,
      order: localGallery.length + 1
    };
    const updated = [...localGallery, created];
    setLocalGallery(updated);
    handleSaveGallery(updated);
    setShowAddGalleryModal(false);
    setNewGalTitle('');
    setNewGalDesc('');
    setNewGalUrl('');
  };

  const handleDeleteGalleryPhoto = (id: string) => {
    const updated = localGallery.filter((g) => g.id !== id);
    setLocalGallery(updated);
    handleSaveGallery(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#0f172a] border border-zinc-800 rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl text-white overflow-hidden my-auto">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-6 bg-[#1e293b] border-b border-zinc-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-black font-black shadow-md">
              <Flame className="w-6 h-6 fill-black" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <span>Alov Admin Paneli</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  Firestore Real-Time Sync
                </span>
              </h2>
              <p className="text-xs text-zinc-400 hidden sm:block">
                Saytın 5 əsas bölməsini idarə edin. Bütün dəyişikliklər canlı yenilənir.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Çıxış</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* LOGIN FORM IF NOT AUTHENTICATED */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto space-y-6 my-auto">
            <div className="w-16 h-16 rounded-3xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mx-auto text-amber-400 shadow-xl">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">İdarəetmə Panelinə Giriş</h3>
              <p className="text-xs text-zinc-400">
                Lütfən inzibatçı şifrəsini daxil edin. (Default Şifrə: <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-amber-300 font-mono">12345</code> və ya <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-amber-300 font-mono">alov2026</code>)
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5">Admin Şifrəsi</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Şifrəni daxil edin..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 text-sm font-medium"
                  autoFocus
                />
              </div>

              {passwordError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Daxil etdiyiniz şifrə yanlışdır! Təkrar cəhd edin.</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-amber-400 hover:bg-amber-500 text-black font-extrabold text-sm transition-all shadow-lg cursor-pointer"
              >
                Daxil Ol
              </button>

              <button
                type="button"
                onClick={handleQuickAdminLogin}
                className="w-full py-3 px-6 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 font-bold text-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 border border-emerald-600/50"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Birbaşa Admin Girişi (mehmamelman@gmail.com)</span>
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED DASHBOARD BODY */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Navigation Tabs */}
            <div className="w-full md:w-64 bg-[#090d16] p-3 border-b md:border-b-0 md:border-r border-zinc-800 flex md:flex-col gap-1.5 overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full text-left px-3.5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2.5 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'analytics'
                    ? 'bg-amber-400 text-black shadow-md font-black'
                    : 'text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 hover:bg-emerald-900/50'
                }`}
              >
                <BarChart3 className="w-4 h-4 shrink-0" />
                <span>📊 Canlı Analitika (360°)</span>
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`w-full text-left px-3.5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2.5 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'reviews'
                    ? 'bg-amber-400 text-black shadow-md'
                    : 'text-zinc-400 hover:bg-zinc-800/80 hover:text-white'
                }`}
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>1. Şərhlərin İdarəsi</span>
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className={`w-full text-left px-3.5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2.5 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'gallery'
                    ? 'bg-amber-400 text-black shadow-md'
                    : 'text-zinc-400 hover:bg-zinc-800/80 hover:text-white'
                }`}
              >
                <ImageIcon className="w-4 h-4 shrink-0" />
                <span>2. Qalereya & Kateqoriyalar</span>
              </button>

              <button
                onClick={() => setActiveTab('menu')}
                className={`w-full text-left px-3.5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2.5 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'menu'
                    ? 'bg-amber-400 text-black shadow-md'
                    : 'text-zinc-400 hover:bg-zinc-800/80 hover:text-white'
                }`}
              >
                <Utensils className="w-4 h-4 shrink-0" />
                <span>3. Yemək Kartları & Təsvir</span>
              </button>

              <button
                onClick={() => setActiveTab('prices')}
                className={`w-full text-left px-3.5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2.5 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'prices'
                    ? 'bg-amber-400 text-black shadow-md'
                    : 'text-zinc-400 hover:bg-zinc-800/80 hover:text-white'
                }`}
              >
                <DollarSign className="w-4 h-4 shrink-0" />
                <span>4. Qiymətlər & Stok (Tükəndi)</span>
              </button>

              <button
                onClick={() => setActiveTab('hero')}
                className={`w-full text-left px-3.5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2.5 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'hero'
                    ? 'bg-amber-400 text-black shadow-md'
                    : 'text-zinc-400 hover:bg-zinc-800/80 hover:text-white'
                }`}
              >
                <Layout className="w-4 h-4 shrink-0" />
                <span>5. Başlıq & Hero Zonası</span>
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-[#0b1329] space-y-6">
              
              {/* TAB 0: REAL-TIME ANALYTICS (NİRA 360°) */}
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  {/* Visual Structure as Requested */}
                  <div className="bg-[#f9f9f9] text-zinc-900 p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-zinc-200 shadow-xl space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-zinc-300 pb-4">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-black text-[#1a1a1a] flex items-center gap-2.5">
                          <span>📊 NİRA 360° - Real Canlı Analitika</span>
                        </h2>
                        <p className="text-xs sm:text-sm text-zinc-600 font-medium mt-1">
                          100% real istifadəçi hərəkətləri və Firestore real-time sinxronizasiyası ilə işləyir.
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-black shrink-0">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
                        <span>Canlı Rejim Aktivdir</span>
                      </div>
                    </div>

                    {/* 3 Main Highlight Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                      {/* Card 1: Total Views */}
                      <div className="bg-white p-5 sm:p-6 rounded-xl shadow-xs border-l-5 border-[#27ae60] border-y border-r border-zinc-200">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-bold text-[#7f8c8d]">Ümumi Baxış / Ziyarət</p>
                          <Users className="w-5 h-5 text-[#27ae60]" />
                        </div>
                        <h3 className="text-3xl sm:text-4xl font-black text-[#2c3e50] mt-3 tracking-tight">
                          {analytics.totalViews.toLocaleString()}
                        </h3>
                        <p className="text-[11px] text-zinc-500 font-medium mt-2">
                          Sayta edilən ümumi səhifə baxışları və ziyarətlər
                        </p>
                      </div>

                      {/* Card 2: Daily Visitors */}
                      <div className="bg-white p-5 sm:p-6 rounded-xl shadow-xs border-l-5 border-[#2980b9] border-y border-r border-zinc-200">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-bold text-[#7f8c8d]">Bugünkü Ziyarətçi ({analytics.todayDate})</p>
                          <Activity className="w-5 h-5 text-[#2980b9]" />
                        </div>
                        <h3 className="text-3xl sm:text-4xl font-black text-[#2c3e50] mt-3 tracking-tight">
                          {analytics.todayVisitors.toLocaleString()}
                        </h3>
                        <p className="text-[11px] text-zinc-500 font-medium mt-2">
                          Bugün sayta daxil olan canlı unikal şəxslər
                        </p>
                      </div>

                      {/* Card 3: Cart Interactions */}
                      <div className="bg-white p-5 sm:p-6 rounded-xl shadow-xs border-l-5 border-[#e67e22] border-y border-r border-zinc-200">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-bold text-[#7f8c8d]">Səbətə Basanlar (Cəmi / Günlük)</p>
                          <MousePointerClick className="w-5 h-5 text-[#e67e22]" />
                        </div>
                        <h3 className="text-3xl sm:text-4xl font-black text-[#2c3e50] mt-3 tracking-tight flex items-baseline gap-2">
                          <span>{analytics.totalCartClicks.toLocaleString()}</span>
                          <span className="text-xl sm:text-2xl font-bold text-[#e67e22]">
                            / {analytics.todayCartClicks.toLocaleString()}
                          </span>
                        </h3>
                        <p className="text-[11px] text-zinc-500 font-medium mt-2">
                          Məhsulu səbətə əlavə edən və ya səbəti açan kliklər
                        </p>
                      </div>
                    </div>

                    {/* Detailed History Table by Days */}
                    <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-xs space-y-3">
                      <h4 className="text-sm font-black text-zinc-900 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-700" />
                        <span>Son Günlər Üzrə Dəqiq İstifadəçi Statistikası</span>
                      </h4>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="border-b border-zinc-200 text-zinc-500 font-black uppercase">
                              <th className="py-2.5 px-3">Tarix</th>
                              <th className="py-2.5 px-3">Unikal Ziyarətçi</th>
                              <th className="py-2.5 px-3">Səbət Klikləri</th>
                              <th className="py-2.5 px-3 text-right">Aktivlik Səviyyəsi</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-100 font-semibold text-zinc-800">
                            {Object.keys({ ...analytics.dailyVisitors, ...analytics.dailyCartClicks })
                              .sort((a, b) => b.localeCompare(a))
                              .slice(0, 10)
                              .map((dateKey) => {
                                const visitors = analytics.dailyVisitors[dateKey] || 0;
                                const cartClicks = analytics.dailyCartClicks[dateKey] || 0;
                                const isToday = dateKey === analytics.todayDate;
                                return (
                                  <tr key={dateKey} className={isToday ? 'bg-amber-50/60 font-black' : 'hover:bg-zinc-50'}>
                                    <td className="py-2.5 px-3 flex items-center gap-2">
                                      <span>{dateKey}</span>
                                      {isToday && (
                                        <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black">
                                          Bugün
                                        </span>
                                      )}
                                    </td>
                                    <td className="py-2.5 px-3 text-emerald-700 font-bold">
                                      {visitors} nəfər
                                    </td>
                                    <td className="py-2.5 px-3 text-amber-700 font-bold">
                                      {cartClicks} klik
                                    </td>
                                    <td className="py-2.5 px-3 text-right text-zinc-500 font-mono">
                                      {visitors > 0 ? `${((cartClicks / visitors) * 100).toFixed(0)}% səbət nisbəti` : '-'}
                                    </td>
                                  </tr>
                                );
                              })}
                            {Object.keys(analytics.dailyVisitors).length === 0 && (
                              <tr>
                                <td colSpan={4} className="py-6 text-center text-zinc-400">
                                  Hələlik heç bir tarix qeydə alınmayıb. İlk ziyarətçilər saytı açdıqca burada canlı əks olunacaq.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 1: REVIEWS MANAGEMENT */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800">
                    <div>
                      <h3 className="text-base font-black text-white">Müştəri Şərhlərinin İdarə Edilməsi</h3>
                      <p className="text-xs text-zinc-400">
                        Şərhləri təsdiqləyin, gizlədin və ya yenisini əlavə edin.
                      </p>
                    </div>

                    <button
                      onClick={() => setShowAddReviewModal(true)}
                      className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow"
                    >
                      <Plus className="w-4 h-4 stroke-[3]" />
                      <span>Yeni Şərh Əlavə Et</span>
                    </button>
                  </div>

                  {/* Filter Sub-Tabs */}
                  <div className="flex flex-wrap gap-2">
                    {(['all', 'approved', 'pending', 'hidden'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => setReviewFilter(st)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                          reviewFilter === st
                            ? 'bg-white text-black shadow'
                            : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
                        }`}
                      >
                        {st === 'all' && `Bütün Şərhlər (${localReviews.length})`}
                        {st === 'approved' && `Təsdiqlənənlər (${localReviews.filter(r => (r.status || 'approved') === 'approved').length})`}
                        {st === 'pending' && `Gözləmədə Olanlar (${localReviews.filter(r => r.status === 'pending').length})`}
                        {st === 'hidden' && `Gizlədilənlər (${localReviews.filter(r => r.status === 'hidden').length})`}
                      </button>
                    ))}
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-3">
                    {localReviews
                      .filter((r) => reviewFilter === 'all' || (r.status || 'approved') === reviewFilter)
                      .map((rev) => (
                        <div
                          key={rev.id}
                          className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                        >
                          <div className="space-y-1.5 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-white">{rev.name}</span>
                              <div className="flex text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3.5 h-3.5 ${
                                      i < rev.rating ? 'fill-amber-400 stroke-amber-400' : 'text-zinc-700'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span
                                className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                                  (rev.status || 'approved') === 'approved'
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : rev.status === 'pending'
                                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                }`}
                              >
                                {rev.status || 'approved'}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-300 italic">"{rev.comment}"</p>
                            <span className="text-[10px] text-zinc-500">
                              Sifariş: {rev.orderedItem || 'Restoran Qonağı'} • Tarix: {rev.date}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {(rev.status || 'approved') !== 'approved' && (
                              <button
                                onClick={() => handleUpdateReviewStatus(rev.id, 'approved')}
                                className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>Təsdiqlə</span>
                              </button>
                            )}

                            {(rev.status || 'approved') !== 'hidden' && (
                              <button
                                onClick={() => handleUpdateReviewStatus(rev.id, 'hidden')}
                                className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                              >
                                <EyeOff className="w-3.5 h-3.5" />
                                <span>Gizlət</span>
                              </button>
                            )}

                            <button
                              onClick={() => handleDeleteReview(rev.id)}
                              className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Sil</span>
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* TAB 2: GALLERY & CATEGORY PHOTOS */}
              {activeTab === 'gallery' && (
                <div className="space-y-8">
                  
                  {/* Category Cards Section */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800">
                      <div>
                        <h3 className="text-base font-black text-white">1. Kateqoriya & Set Kartları</h3>
                        <p className="text-xs text-zinc-400">
                          Ana səhifədəki kateqoriya və set kartlarını idarə edin, şəkillərini və adlarını dəyişin, yenisini əlavə edin.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setShowAddCategoryModal(true)}
                          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow"
                        >
                          <Plus className="w-4 h-4 stroke-[3]" />
                          <span>Yeni Kateqoriya / Set</span>
                        </button>

                        <button
                          onClick={() => handleSaveCategories()}
                          className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-black font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow"
                        >
                          <Save className="w-4 h-4 stroke-[3]" />
                          <span>Yadda Saxla</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {localCategories.map((cat, idx) => (
                        <div key={cat.id} className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 space-y-3 relative group">
                          <div className="relative h-28 rounded-xl overflow-hidden bg-black border border-zinc-700">
                            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => handleDeleteCategory(cat.id)}
                              className="absolute top-2 right-2 p-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-lg cursor-pointer transition-all"
                              title="Kateqoriyanı Sil"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="space-y-2">
                            <div>
                              <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Kateqoriya Adı</label>
                              <input
                                type="text"
                                value={cat.name}
                                onChange={(e) => {
                                  const updated = [...localCategories];
                                  updated[idx].name = e.target.value;
                                  setLocalCategories(updated);
                                }}
                                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white font-bold"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Şəkil URL-i</label>
                              <input
                                type="text"
                                value={cat.image}
                                onChange={(e) => {
                                  const updated = [...localCategories];
                                  updated[idx].image = e.target.value;
                                  setLocalCategories(updated);
                                }}
                                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-300"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Şəkil Faylı Yüklə</label>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileUpload(e, (url) => {
                                  const updated = [...localCategories];
                                  updated[idx].image = url;
                                  setLocalCategories(updated);
                                })}
                                className="w-full text-[10px] text-zinc-400 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Gallery Photos Section */}
                  <div className="space-y-4 pt-4 border-t border-zinc-800">
                    <div className="flex items-center justify-between bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800">
                      <div>
                        <h3 className="text-base font-black text-white">2. Restoran Qalereya Fotoları</h3>
                        <p className="text-xs text-zinc-400">
                          Qalereyaya yeni fotolar əlavə edin, təsvirini və sırasını yeniləyin.
                        </p>
                      </div>

                      <button
                        onClick={() => setShowAddGalleryModal(true)}
                        className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow"
                      >
                        <Plus className="w-4 h-4 stroke-[3]" />
                        <span>Yeni Foto Əlavə Et</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {localGallery.map((photo, idx) => (
                        <div key={photo.id} className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 space-y-3">
                          <div className="relative h-32 rounded-xl overflow-hidden bg-black border border-zinc-700">
                            <img src={photo.imageUrl} alt={photo.title} className="w-full h-full object-cover" />
                            <button
                              onClick={() => handleDeleteGalleryPhoto(photo.id)}
                              className="absolute top-2 right-2 p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 shadow cursor-pointer"
                              title="Sil"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="space-y-2">
                            <div>
                              <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Foto Başlığı</label>
                              <input
                                type="text"
                                value={photo.title}
                                onChange={(e) => {
                                  const updated = [...localGallery];
                                  updated[idx].title = e.target.value;
                                  setLocalGallery(updated);
                                }}
                                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white font-bold"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Təsviri</label>
                              <input
                                type="text"
                                value={photo.description}
                                onChange={(e) => {
                                  const updated = [...localGallery];
                                  updated[idx].description = e.target.value;
                                  setLocalGallery(updated);
                                }}
                                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Foto Linki (URL)</label>
                              <input
                                type="text"
                                value={photo.imageUrl}
                                onChange={(e) => {
                                  const updated = [...localGallery];
                                  updated[idx].imageUrl = e.target.value;
                                  setLocalGallery(updated);
                                }}
                                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-300"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => handleSaveGallery()}
                        className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-black font-extrabold text-sm transition-all shadow cursor-pointer"
                      >
                        Qalereyanı Yadda Saxla
                      </button>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 3: MENU ITEMS DETAILS */}
              {activeTab === 'menu' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800">
                    <div>
                      <h3 className="text-base font-black text-white">Yemək Kartlarının Şəkilləri və Təfərrüatları</h3>
                      <p className="text-xs text-zinc-400">
                        Hər bir yeməyin fotosunu, adını, təsvirini, tərkib hissələrini redaktə edin, silin və ya yenisini əlavə edin.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowAddMenuItemModal(true)}
                        className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow"
                      >
                        <Plus className="w-4 h-4 stroke-[3]" />
                        <span>Yeni Yemək Əlavə Et</span>
                      </button>

                      <button
                        onClick={() => handleSaveMenu()}
                        className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-black font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow"
                      >
                        <Save className="w-4 h-4 stroke-[3]" />
                        <span>Bütün Yeməkləri Yadda Saxla</span>
                      </button>
                    </div>
                  </div>

                  {/* Search filter */}
                  <div className="relative max-w-sm">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="Yemək adında axtar..."
                      value={menuSearch}
                      onChange={(e) => setMenuSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500"
                    />
                  </div>

                  {/* Menu Items Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {localMenu
                      .filter((item) => item.name.toLowerCase().includes(menuSearch.toLowerCase()))
                      .map((item, idx) => (
                        <div key={item.id} className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 space-y-3 relative">
                          <div className="flex gap-4">
                            <div className="w-24 h-24 rounded-xl overflow-hidden bg-black shrink-0 border border-zinc-700 relative">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => handleDeleteMenuItem(item.id)}
                                className="absolute top-1 left-1 p-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow cursor-pointer transition-all"
                                title="Yemək kartını sil"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="flex-1 space-y-2">
                              <div>
                                <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-0.5">Yeməyin Adı</label>
                                <input
                                  type="text"
                                  value={item.name}
                                  onChange={(e) => {
                                    const updated = [...localMenu];
                                    const realIdx = updated.findIndex((m) => m.id === item.id);
                                    if (realIdx > -1) updated[realIdx].name = e.target.value;
                                    setLocalMenu(updated);
                                  }}
                                  className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-bold text-white"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-0.5">Şəkil URL-i</label>
                                <input
                                  type="text"
                                  value={item.image}
                                  onChange={(e) => {
                                    const updated = [...localMenu];
                                    const realIdx = updated.findIndex((m) => m.id === item.id);
                                    if (realIdx > -1) updated[realIdx].image = e.target.value;
                                    setLocalMenu(updated);
                                  }}
                                  className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-300"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2 pt-1">
                            <div>
                              <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-0.5">Təsviri (Description)</label>
                              <textarea
                                rows={2}
                                value={item.description}
                                onChange={(e) => {
                                  const updated = [...localMenu];
                                  const realIdx = updated.findIndex((m) => m.id === item.id);
                                  if (realIdx > -1) updated[realIdx].description = e.target.value;
                                  setLocalMenu(updated);
                                }}
                                className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-300"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-0.5">Tərkib Hissələri (Ingredients)</label>
                              <input
                                type="text"
                                value={item.ingredients || ''}
                                placeholder="Məs: Dana əti, Mozzarella, Göbələk, Xüsusi sous..."
                                onChange={(e) => {
                                  const updated = [...localMenu];
                                  const realIdx = updated.findIndex((m) => m.id === item.id);
                                  if (realIdx > -1) updated[realIdx].ingredients = e.target.value;
                                  setLocalMenu(updated);
                                }}
                                className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-300"
                              />
                            </div>

                            {/* Badges Toggles */}
                            <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-zinc-800/80 text-xs">
                              <label className="flex items-center gap-1.5 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={!!item.isPopular}
                                  onChange={(e) => {
                                    const updated = [...localMenu];
                                    const realIdx = updated.findIndex((m) => m.id === item.id);
                                    if (realIdx > -1) updated[realIdx].isPopular = e.target.checked;
                                    setLocalMenu(updated);
                                  }}
                                  className="rounded bg-zinc-950 border-zinc-700 text-amber-400 focus:ring-0"
                                />
                                <span className="text-zinc-300 font-bold">Populyar Badge</span>
                              </label>

                              <label className="flex items-center gap-1.5 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={!!item.isHalal}
                                  onChange={(e) => {
                                    const updated = [...localMenu];
                                    const realIdx = updated.findIndex((m) => m.id === item.id);
                                    if (realIdx > -1) updated[realIdx].isHalal = e.target.checked;
                                    setLocalMenu(updated);
                                  }}
                                  className="rounded bg-zinc-950 border-zinc-700 text-emerald-400 focus:ring-0"
                                />
                                <span className="text-zinc-300 font-bold">Halal Badge</span>
                              </label>

                              <label className="flex items-center gap-1.5 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={!!item.isSpicy}
                                  onChange={(e) => {
                                    const updated = [...localMenu];
                                    const realIdx = updated.findIndex((m) => m.id === item.id);
                                    if (realIdx > -1) updated[realIdx].isSpicy = e.target.checked;
                                    setLocalMenu(updated);
                                  }}
                                  className="rounded bg-zinc-950 border-zinc-700 text-rose-400 focus:ring-0"
                                />
                                <span className="text-zinc-300 font-bold">Acılı Badge</span>
                              </label>
                            </div>

                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* TAB 4: PRICES & STOCK AVAILABILITY */}
              {activeTab === 'prices' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800">
                    <div>
                      <h3 className="text-base font-black text-white">Yemək Qiymətləri və Stok Vəziyyəti</h3>
                      <p className="text-xs text-zinc-400">
                        Qiymətləri anında dəyişin və ya yeməyi "Tükəndi" (Out of stock) olaraq sifarişə bağlayın.
                      </p>
                    </div>

                    <button
                      onClick={handleSaveMenu}
                      className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-black font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow"
                    >
                      <Save className="w-4 h-4 stroke-[3]" />
                      <span>Qiymət & Stok Yeniliklərini Yadda Saxla</span>
                    </button>
                  </div>

                  {/* Search */}
                  <div className="relative max-w-sm">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="Axtar..."
                      value={priceSearch}
                      onChange={(e) => setPriceSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500"
                    />
                  </div>

                  {/* Table of items */}
                  <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-zinc-950 text-zinc-400 font-bold border-b border-zinc-800">
                          <tr>
                            <th className="p-3">Yemək</th>
                            <th className="p-3">Qiymət (AZN)</th>
                            <th className="p-3">Porsiya / Seçim variantları</th>
                            <th className="p-3">Stok Vəziyyəti</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/80 text-zinc-200">
                          {localMenu
                            .filter((i) => i.name.toLowerCase().includes(priceSearch.toLowerCase()))
                            .map((item) => (
                              <tr key={item.id} className="hover:bg-zinc-800/40 transition-colors">
                                <td className="p-3">
                                  <div className="flex items-center gap-3">
                                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                                    <div>
                                      <span className="font-bold text-white block">{item.name}</span>
                                      <span className="text-[10px] text-zinc-400 capitalize">{item.category}</span>
                                    </div>
                                  </div>
                                </td>

                                <td className="p-3">
                                  <div className="flex items-center gap-1">
                                    <input
                                      type="number"
                                      step="0.10"
                                      value={item.price}
                                      onChange={(e) => {
                                        const updated = [...localMenu];
                                        const realIdx = updated.findIndex((m) => m.id === item.id);
                                        if (realIdx > -1) updated[realIdx].price = parseFloat(e.target.value) || 0;
                                        setLocalMenu(updated);
                                      }}
                                      className="w-24 px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-700 text-xs font-black text-amber-400"
                                    />
                                    <span className="font-bold text-zinc-400">₼</span>
                                  </div>
                                </td>

                                <td className="p-3">
                                  <input
                                    type="text"
                                    value={(item.options || []).join(', ')}
                                    placeholder="Məs: Balıq, Orta, Böyük..."
                                    onChange={(e) => {
                                      const updated = [...localMenu];
                                      const realIdx = updated.findIndex((m) => m.id === item.id);
                                      if (realIdx > -1) {
                                        updated[realIdx].options = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                                      }
                                      setLocalMenu(updated);
                                    }}
                                    className="w-full min-w-[160px] px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-300"
                                  />
                                </td>

                                <td className="p-3">
                                  <button
                                    onClick={() => {
                                      const updated = [...localMenu];
                                      const realIdx = updated.findIndex((m) => m.id === item.id);
                                      if (realIdx > -1) {
                                        updated[realIdx].isOutOfStock = !updated[realIdx].isOutOfStock;
                                      }
                                      setLocalMenu(updated);
                                    }}
                                    className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                                      item.isOutOfStock
                                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                    }`}
                                  >
                                    {item.isOutOfStock ? (
                                      <>
                                        <AlertCircle className="w-3.5 h-3.5" />
                                        <span>Tükəndi (Out of stock)</span>
                                      </>
                                    ) : (
                                      <>
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        <span>Mövcuddur</span>
                                      </>
                                    )}
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: HERO SECTION & TEXTS */}
              {activeTab === 'hero' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800">
                    <div>
                      <h3 className="text-base font-black text-white">Başlıq və Hero Zonasının İdarə Edilməsi</h3>
                      <p className="text-xs text-zinc-400">
                        Saytın ən yuxarı banner hissəsindəki başlıqları, fon şəklini və videosunu yeniləyin.
                      </p>
                    </div>

                    <button
                      onClick={handleSaveHero}
                      className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-black font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow"
                    >
                      <Save className="w-4 h-4 stroke-[3]" />
                      <span>Hero Zonasını Yadda Saxla</span>
                    </button>
                  </div>

                  <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 space-y-5">
                    <div>
                      <label className="block text-xs font-extrabold text-zinc-300 mb-1">Əsas Başlıq (Hero Title)</label>
                      <input
                        type="text"
                        value={localHero.title}
                        onChange={(e) => setLocalHero({ ...localHero, title: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-sm font-bold text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-zinc-300 mb-1">Alt Yazı (Sub-Title)</label>
                      <textarea
                        rows={3}
                        value={localHero.subtitle}
                        onChange={(e) => setLocalHero({ ...localHero, subtitle: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300"
                      />
                    </div>

                    {/* Slider Images Grid */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-extrabold text-amber-400">Slider Arxa Fon Şəkilləri (4 Fotoşəkil)</label>
                        <button
                          type="button"
                          onClick={() => {
                            setLocalHero({
                              ...localHero,
                              imageUrl: DEFAULT_HERO.images[0],
                              images: [...DEFAULT_HERO.images]
                            });
                          }}
                          className="text-[11px] text-red-400 hover:text-red-300 font-bold underline cursor-pointer"
                        >
                          Yüklənən Şəkilləri Sil / Sıfırla
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[0, 1, 2, 3].map((idx) => {
                          const userImgs = Array.isArray(localHero.images) ? localHero.images : [];
                          const defaultList = DEFAULT_HERO.images;
                          const currentVal = userImgs[idx] !== undefined && userImgs[idx] !== null
                            ? userImgs[idx]
                            : (idx === 0 ? (localHero.imageUrl || defaultList[0]) : defaultList[idx]);

                          const updateSlideAtIndex = (val: string) => {
                            const newImgs = [...userImgs];
                            while (newImgs.length < 4) {
                              const i = newImgs.length;
                              newImgs.push(i === 0 ? (localHero.imageUrl || defaultList[0]) : defaultList[i]);
                            }
                            newImgs[idx] = val;
                            setLocalHero({
                              ...localHero,
                              imageUrl: newImgs[0],
                              images: newImgs
                            });
                          };

                          return (
                            <div key={idx} className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800 space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] text-zinc-400 font-bold">Slider Şəkli {idx + 1}</span>
                                {currentVal && (
                                  <button
                                    type="button"
                                    onClick={() => updateSlideAtIndex('')}
                                    className="text-[10px] text-red-400 hover:text-red-300 font-semibold cursor-pointer"
                                  >
                                    Sil
                                  </button>
                                )}
                              </div>
                              <input
                                type="text"
                                value={currentVal}
                                onChange={(e) => updateSlideAtIndex(e.target.value)}
                                placeholder="https://..."
                                className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-mono"
                              />
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileUpload(e, (url) => updateSlideAtIndex(url))}
                                className="w-full text-[10px] text-zinc-400 file:mr-2 file:py-0.5 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-bold file:bg-amber-400 file:text-black hover:file:bg-amber-300 cursor-pointer"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-zinc-300 mb-1">Fon Video URL-i (MP4 Video)</label>
                      <input
                        type="text"
                        value={localHero.videoUrl}
                        onChange={(e) => setLocalHero({ ...localHero, videoUrl: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 font-mono"
                      />
                    </div>

                    {/* Toggle Video Background */}
                    <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Film className="w-5 h-5 text-amber-400" />
                        <div>
                          <span className="text-sm font-bold text-white block">Fon Videosu Aktiv Formada Olsun?</span>
                          <span className="text-xs text-zinc-400">Yandırdıqda arxa fonda MP4 aşpaz/metbəx videosu oynayacaq.</span>
                        </div>
                      </div>

                      <button
                        onClick={() => setLocalHero({ ...localHero, isVideoEnabled: !localHero.isVideoEnabled })}
                        className={`p-1.5 rounded-2xl transition-all cursor-pointer ${
                          localHero.isVideoEnabled ? 'text-emerald-400' : 'text-zinc-600'
                        }`}
                      >
                        {localHero.isVideoEnabled ? (
                          <ToggleRight className="w-10 h-10" />
                        ) : (
                          <ToggleLeft className="w-10 h-10" />
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>

      {/* MODAL FOR ADMIN ADDING REVIEW DIRECTLY */}
      {showAddReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1e293b] border border-zinc-700 rounded-3xl p-6 w-full max-w-md space-y-4 text-white">
            <div className="flex items-center justify-between border-b border-zinc-700 pb-3">
              <h3 className="text-base font-black">Admin Tərəfindən Şərh Əlavə Et</h3>
              <button onClick={() => setShowAddReviewModal(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-zinc-300 mb-1">Müştərinin Adı</label>
                <input
                  type="text"
                  value={newRevName}
                  onChange={(e) => setNewRevName(e.target.value)}
                  placeholder="Məs: Əli Vəliyev"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-300 mb-1">Ulduz Dərəcəsi (1 - 5)</label>
                <select
                  value={newRevRating}
                  onChange={(e) => setNewRevRating(parseInt(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-bold"
                >
                  <option value={5}>5 Ulduz (Əla)</option>
                  <option value={4}>4 Ulduz (Yaxşı)</option>
                  <option value={3}>3 Ulduz (Orta)</option>
                  <option value={2}>2 Ulduz (Zəif)</option>
                  <option value={1}>1 Ulduz (Pis)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-zinc-300 mb-1">Sifariş Edilən Yemək</label>
                <input
                  type="text"
                  value={newRevOrderedItem}
                  onChange={(e) => setNewRevOrderedItem(e.target.value)}
                  placeholder="Məs: Alov Special Qarışıq Pitsa"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-300 mb-1">Şərh Mətni</label>
                <textarea
                  rows={3}
                  value={newRevComment}
                  onChange={(e) => setNewRevComment(e.target.value)}
                  placeholder="Şərhi bura yazın..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowAddReviewModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 font-bold text-xs"
              >
                Ləğv Et
              </button>
              <button
                onClick={handleAdminAddReview}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-black font-extrabold text-xs"
              >
                Əlavə Et Və Yada Saxla
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL FOR ADDING A NEW GALLERY PHOTO */}
      {showAddGalleryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1e293b] border border-zinc-700 rounded-3xl p-6 w-full max-w-md space-y-4 text-white">
            <div className="flex items-center justify-between border-b border-zinc-700 pb-3">
              <h3 className="text-base font-black">Yeni Qalereya Fotosu Əlavə Et</h3>
              <button onClick={() => setShowAddGalleryModal(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-zinc-300 mb-1">Foto Başlığı</label>
                <input
                  type="text"
                  value={newGalTitle}
                  onChange={(e) => setNewGalTitle(e.target.value)}
                  placeholder="Məs: Alov Ocağında Xüsusi Kabab"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-300 mb-1">Təsviri</label>
                <input
                  type="text"
                  value={newGalDesc}
                  onChange={(e) => setNewGalDesc(e.target.value)}
                  placeholder="Məs: Təzə xammal və zəngin dad"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-300 mb-1">Foto Linki (URL)</label>
                <input
                  type="text"
                  value={newGalUrl}
                  onChange={(e) => setNewGalUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-300 mb-1">Və ya Fayldan Şəkil Yüklə</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, (url) => setNewGalUrl(url))}
                  className="w-full text-zinc-400 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowAddGalleryModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 font-bold text-xs"
              >
                Ləğv Et
              </button>
              <button
                onClick={handleAdminAddGalleryPhoto}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-black font-extrabold text-xs"
              >
                Əlavə Et
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL FOR ADDING A NEW CATEGORY / SET CARD */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1e293b] border border-zinc-700 rounded-3xl p-6 w-full max-w-md space-y-4 text-white">
            <div className="flex items-center justify-between border-b border-zinc-700 pb-3">
              <h3 className="text-base font-black">Yeni Kateqoriya / Set Card Əlavə Et</h3>
              <button onClick={() => setShowAddCategoryModal(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-zinc-300 mb-1">Kateqoriya / Set Adı</label>
                <input
                  type="text"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="Məs: Ailə Setləri və ya Pidelər"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-300 mb-1">Təsviri</label>
                <input
                  type="text"
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  placeholder="Məs: Ən ləzzətli və doyurucu menyular"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-300 mb-1">Şəkil Linki (URL)</label>
                <input
                  type="text"
                  value={newCatImage}
                  onChange={(e) => setNewCatImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-300 mb-1">Və ya Fayldan Yüklə</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, (url) => setNewCatImage(url))}
                  className="w-full text-zinc-400 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowAddCategoryModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 font-bold text-xs"
              >
                Ləğv Et
              </button>
              <button
                onClick={handleAdminAddCategory}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-black font-extrabold text-xs"
              >
                Kateqoriya Əlavə Et
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL FOR ADDING A NEW MENU ITEM */}
      {showAddMenuItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1e293b] border border-zinc-700 rounded-3xl p-6 w-full max-w-lg space-y-4 text-white max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-700 pb-3">
              <h3 className="text-base font-black">Yeni Yemək Kartı Əlavə Et</h3>
              <button onClick={() => setShowAddMenuItemModal(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-zinc-300 mb-1">Yeməyin Adı</label>
                <input
                  type="text"
                  value={newMenuName}
                  onChange={(e) => setNewMenuName(e.target.value)}
                  placeholder="Məs: Quşbaşı Pide"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-bold text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-300 mb-1">Qiyməti (₼)</label>
                  <input
                    type="number"
                    step="0.10"
                    value={newMenuPrice}
                    onChange={(e) => setNewMenuPrice(e.target.value)}
                    placeholder="12.50"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-300 mb-1">Kateqoriya</label>
                  <select
                    value={newMenuCategory}
                    onChange={(e) => setNewMenuCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-bold"
                  >
                    <option value="fastfood">Burger və Nugget</option>
                    <option value="pizza">Pizza</option>
                    <option value="kabablar">Kabablar</option>
                    <option value="isti_yemekler">İsti yeməklər</option>
                    <option value="icikil">Soyuq içkilər</option>
                    <option value="sorbalar">Şorbalar</option>
                    <option value="salat">Salat</option>
                    <option value="cig_kofte">Çiy köftə</option>
                    <option value="qelyanaltilar">Qəlyanaltılar</option>
                    <option value="desertler">Desertlər</option>
                    <option value="kofe">Kofe</option>
                    <option value="kokteyl">Kokteyl</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-zinc-300 mb-1">Təsviri</label>
                <textarea
                  rows={2}
                  value={newMenuDesc}
                  onChange={(e) => setNewMenuDesc(e.target.value)}
                  placeholder="Məs: Təzə kəsilmiş ət, bol mozzarella və xüsusi sos..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-300 mb-1">Tərkibi</label>
                <input
                  type="text"
                  value={newMenuIngredients}
                  onChange={(e) => setNewMenuIngredients(e.target.value)}
                  placeholder="Məs: Dana əti, Mozzarella, Göbələk"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-300 mb-1">Şəkil URL-i</label>
                <input
                  type="text"
                  value={newMenuImage}
                  onChange={(e) => setNewMenuImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-300 mb-1">Və ya Fayldan Yüklə</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, (url) => setNewMenuImage(url))}
                  className="w-full text-zinc-400 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-emerald-400">
                  <input
                    type="checkbox"
                    checked={newMenuIsHalal}
                    onChange={(e) => setNewMenuIsHalal(e.target.checked)}
                    className="accent-emerald-500 rounded"
                  />
                  <span>Halal Sertifikatı</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-amber-400">
                  <input
                    type="checkbox"
                    checked={newMenuIsPopular}
                    onChange={(e) => setNewMenuIsPopular(e.target.checked)}
                    className="accent-amber-400 rounded"
                  />
                  <span>Populyar Məhsul</span>
                </label>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowAddMenuItemModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 font-bold text-xs"
              >
                Ləğv Et
              </button>
              <button
                onClick={handleAdminAddMenuItem}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-black font-extrabold text-xs"
              >
                Yeməyi Əlavə Et
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
