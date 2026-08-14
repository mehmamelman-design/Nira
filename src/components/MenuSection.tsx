import React, { useState, useEffect, useMemo } from 'react';
import { Search, Star, Clock, ShieldCheck, Sparkles, ShoppingBag, ArrowLeft, Flame, FlameKindling, Pencil, Plus, Trash2 } from 'lucide-react';
import { MenuItem, CategoryId, CategoryCard } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { ItemCustomizerModal } from './ItemCustomizerModal';
import { FaqSection } from './FaqSection';
import { CATEGORY_GROUPS } from './CategoriesAndGallerySection';

interface MenuSectionProps {
  menuItems?: MenuItem[];
  categoryCards?: CategoryCard[];
  onAddToCart: (item: MenuItem, option?: string, notes?: string, quantity?: number) => void;
  selectedCategory?: CategoryId;
  onCategoryChange?: (category: CategoryId) => void;
  onBackToHome?: () => void;
  isAdmin?: boolean;
  onEditMenuItem?: (item: MenuItem) => void;
  onDeleteMenuItem?: (itemId: string) => void;
  onAddNewMenuItem?: () => void;
  isSetView?: boolean;
  setTitle?: string;
  initialSearchQuery?: string;
  onSearchQueryChange?: (query: string) => void;
  highlightedItemId?: string | null;
  onEditCategoryBanner?: (category: CategoryId, slideIndex: number) => void;
}

const DEFAULT_CATEGORY_IMAGES: Record<string, { image: string; desc: string }> = {
  // DEFAULT_CATEGORY_IMAGES with Pide
  pide: {
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786703193/ChatGPT_Image_14_A%C4%9Fu_2026_14_26_12_ed5ae0.png',
    desc: 'İsti daş fırında bişmiş bol kaşar pendirli, qiyməli və kuşbaşılı pidelər',
  },
  fastfood: {
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786550635/1_burger_f0ywic.png',
    desc: 'Xırçıltılı smash burgerlər, dadlı naggetslər və kartof fri',
  },
  pizza: {
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786550631/1_pizza_rpifyv.png',
    desc: 'İsti daş fırında bişən bol xammallı pizzalar',
  },
  kabablar: {
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786550631/isti_yemekler_1_oqleld.png',
    desc: 'Közdə bişən ləzzətli ət, tikə və lülə kabablar',
  },
  isti_yemekler: {
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786550626/isti_yemkelr_2_ra3zpa.png',
    desc: 'Təzə bişmiş ləzzətli isti ana yeməklər və fırın yeməkləri',
  },
  icikil: {
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786701542/ChatGPT_Image_14_A%C4%9Fu_2026_13_50_07_yvegnm.png',
    desc: 'Buz kimi sərinləşdirici təbii içkilər və limonadlar',
  },
  sorbalar: {
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786530069/sorbalar_ww79co.png',
    desc: 'Xüsusi reseptlə hazırlanan isti ev şorbaları',
  },
  salat: {
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786599164/ChatGPT_Image_13_A%C4%9Fu_2026_09_32_13_iwghdq.png',
    desc: 'Təravətli tərəvəzlərdən hazırlanan xüsusi salatlar',
  },
  cig_kofte: {
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786550623/cig_kofte_1_stkjib.png',
    desc: 'Xüsusi ədviyyatlı və acılı təzə çiy köftələr',
  },
  qelyanaltilar: {
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786550625/Asortmen_qelyuanatli_mbjfyb.png',
    desc: 'Çıtır toyuq kanatları, fri, soğan halqaları və souslar',
  },
  desertler: {
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786706141/ChatGPT_Image_14_A%C4%9Fu_2026_15_15_19_olyytt.png',
    desc: 'Xüsusi paxlavalar, San Sebastian, cheesecake, sütlaç, künefe və leziz tortlar',
  },
  kofe: {
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1200',
    desc: 'Espresso, Americano, Latte, Cappucino, Raf, Mokka və ətirli kofelər',
  },
  kokteyl: {
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=1200',
    desc: 'Sərinləşdirici Mojito, Mix Shake və xüsusi Nira kokteyli',
  },
  all: {
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200',
    desc: 'Bütün ləzzətli yemək və içkilərimiz',
  },
};

export const DEFAULT_CATEGORY_SLIDES: Record<string, string[]> = {
  fastfood: [
    'https://res.cloudinary.com/dq8xegykm/image/upload/v1786550635/1_burger_f0ywic.png',
    'https://res.cloudinary.com/dq8xegykm/image/upload/v1786550635/2_burger_cryiuu.png',
    'https://res.cloudinary.com/dq8xegykm/image/upload/v1786550630/3_burger_mqveno.png',
  ],
  pizza: [
    'https://res.cloudinary.com/dq8xegykm/image/upload/v1786550631/1_pizza_rpifyv.png',
    'https://res.cloudinary.com/dq8xegykm/image/upload/v1786550631/2_pizza_ekpewb.png',
  ],
  kabablar: [
    'https://res.cloudinary.com/dq8xegykm/image/upload/v1786550631/isti_yemekler_1_oqleld.png',
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&q=80&w=1200',
  ],
  isti_yemekler: [
    'https://res.cloudinary.com/dq8xegykm/image/upload/v1786550626/isti_yemkelr_2_ra3zpa.png',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=1200',
  ],
  icikil: [
    'https://res.cloudinary.com/dq8xegykm/image/upload/v1786701542/ChatGPT_Image_14_A%C4%9Fu_2026_13_50_07_yvegnm.png',
    'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=1200',
  ],
  sorbalar: [
    'https://res.cloudinary.com/dq8xegykm/image/upload/v1786530069/sorbalar_ww79co.png',
    'https://images.unsplash.com/photo-1588566565463-180a5b2090d2?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&q=80&w=1200',
  ],
  salat: [
    'https://res.cloudinary.com/dq8xegykm/image/upload/v1786599164/ChatGPT_Image_13_A%C4%9Fu_2026_09_32_13_iwghdq.png',
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&q=80&w=1200',
  ],
  cig_kofte: [
    'https://res.cloudinary.com/dq8xegykm/image/upload/v1786550623/cig_kofte_1_stkjib.png',
    'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=1200',
  ],
  qelyanaltilar: [
    'https://res.cloudinary.com/dq8xegykm/image/upload/v1786550625/Asortmen_qelyuanatli_mbjfyb.png',
    'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=1200',
  ],
  pide: [
    'https://res.cloudinary.com/dq8xegykm/image/upload/v1786703193/ChatGPT_Image_14_A%C4%9Fu_2026_14_26_12_ed5ae0.png',
  ],
  desertler: [
    'https://res.cloudinary.com/dq8xegykm/image/upload/v1786706141/ChatGPT_Image_14_A%C4%9Fu_2026_15_15_19_olyytt.png',
  ],
  kofe: [
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200',
  ],
  kokteyl: [
    'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=1200',
  ],
  all: [
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1200',
  ],
};

export const MenuSection: React.FC<MenuSectionProps> = ({
  menuItems,
  categoryCards,
  onAddToCart,
  selectedCategory,
  onCategoryChange,
  onBackToHome,
  isAdmin,
  onEditMenuItem,
  onDeleteMenuItem,
  onAddNewMenuItem,
  isSetView = false,
  setTitle,
  initialSearchQuery = '',
  onSearchQueryChange,
  highlightedItemId,
  onEditCategoryBanner,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>(selectedCategory || 'all');
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCustomizerItem, setSelectedCustomizerItem] = useState<MenuItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    const handlePop = () => {
      if (selectedCustomizerItem) {
        setSelectedCustomizerItem(null);
      }
      if (deletingItem) {
        setDeletingItem(null);
      }
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, [selectedCustomizerItem, deletingItem]);

  useEffect(() => {
    if (highlightedItemId) {
      setTimeout(() => {
        const el = document.getElementById(`food-card-${highlightedItemId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 200);
    }
  }, [highlightedItemId, activeCategory]);

  useEffect(() => {
    if (selectedCategory) {
      setActiveCategory(selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (initialSearchQuery !== undefined) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  const handleCategoryChange = (catId: CategoryId) => {
    setActiveCategory(catId);
    setSearchQuery('');
    if (onSearchQueryChange) {
      onSearchQueryChange('');
    }
    if (onCategoryChange) {
      onCategoryChange(catId);
    }
  };

  const itemsToDisplay = useMemo(() => {
    const list = menuItems && menuItems.length > 0 ? menuItems : MENU_ITEMS;
    const itemMap = new Map<string, MenuItem>(list.map((i) => [i.id, i]));
    MENU_ITEMS.forEach((defaultItem) => {
      if (!itemMap.has(defaultItem.id)) {
        itemMap.set(defaultItem.id, defaultItem);
      }
    });
    return Array.from(itemMap.values());
  }, [menuItems]);

  // All Requested Categories + "Hamsı"
  const categories: { id: CategoryId; name: string; icon: string }[] = [
    { id: 'all', name: 'Hamsı', icon: '' },
    { id: 'fastfood', name: 'Burger və Nugget', icon: '' },
    { id: 'pizza', name: 'Pizza', icon: '' },
    { id: 'pide', name: 'Pidə', icon: '' },
    { id: 'kabablar', name: 'Kabablar', icon: '' },
    { id: 'isti_yemekler', name: 'İsti yeməklər', icon: '' },
    { id: 'icikil', name: 'Soyuq içkilər', icon: '' },
    { id: 'sorbalar', name: 'Şorbalar', icon: '' },
    { id: 'salat', name: 'Salat', icon: '' },
    { id: 'cig_kofte', name: 'Çiy köftə', icon: '' },
    { id: 'qelyanaltilar', name: 'Qəlyanaltılar', icon: '' },
    { id: 'desertler', name: 'Desertlər', icon: '' },
    { id: 'kofe', name: 'Kofe', icon: '' },
    { id: 'kokteyl', name: 'Kokteyl', icon: '' },
  ];

  // Resolve Category Image & Description
  const currentCard = categoryCards?.find((c) => c.id === activeCategory);
  const activeCatImage =
    currentCard?.image ||
    DEFAULT_CATEGORY_IMAGES[activeCategory]?.image ||
    DEFAULT_CATEGORY_IMAGES.all.image;
  const activeCatDesc = isSetView
    ? 'Xüsusi endirimli kombinasiyalar və doyurucu ailə setlərimiz'
    : currentCard?.description ||
      DEFAULT_CATEGORY_IMAGES[activeCategory]?.desc ||
      DEFAULT_CATEGORY_IMAGES.all.desc;

  const currentCatObj = categories.find((c) => c.id === activeCategory);
  const titleText = isSetView && setTitle
    ? setTitle
    : currentCatObj
    ? currentCatObj.id === 'all'
      ? 'Bütün Menyular'
      : currentCatObj.name
    : 'Menyu';

  const [currentBannerSlide, setCurrentBannerSlide] = useState(0);

  const activeCatSlides = useMemo(() => {
    if (currentCard?.images && currentCard.images.length > 0) {
      return currentCard.images;
    }
    if (DEFAULT_CATEGORY_SLIDES[activeCategory] && DEFAULT_CATEGORY_SLIDES[activeCategory].length > 0) {
      return DEFAULT_CATEGORY_SLIDES[activeCategory];
    }
    return [activeCatImage];
  }, [currentCard, activeCategory, activeCatImage]);

  useEffect(() => {
    setCurrentBannerSlide(0);
  }, [activeCategory]);

  useEffect(() => {
    if (activeCatSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentBannerSlide((prev) => (prev + 1) % activeCatSlides.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [activeCatSlides]);

  // Filtering Logic
  const filteredItems = useMemo(() => {
    return itemsToDisplay.filter((item) => {
      // Category matching
      let matchesCategory = false;
      const cat = activeCategory || 'all';

      if (cat === 'all') {
        matchesCategory = true;
      } else if (cat === 'esas_yemekler') {
        matchesCategory = ['kabablar', 'kabab', 'sorbalar', 'isti_yemekler', 'qelyanaltilar', 'qelyanalti', 'cig_kofte', 'salat'].includes(item.category);
      } else if (cat === 'festfood') {
        matchesCategory = ['fastfood', 'pizza', 'pide', 'calzone', 'doner'].includes(item.category);
      } else if (cat === 'icikil' || cat === 'ickiler') {
        matchesCategory = item.category === 'icikil';
      } else if (cat === 'kofe') {
        matchesCategory = item.category === 'kofe';
      } else if (cat === 'kokteyl') {
        matchesCategory = item.category === 'kokteyl';
      } else if (cat === 'desertler_group' || cat === 'desertler') {
        matchesCategory = item.category === 'desertler';
      } else if (cat === 'qelyanaltilar' || cat === 'qelyanalti') {
        matchesCategory = item.category === 'qelyanaltilar' || item.category === 'qelyanalti';
      } else if (cat === 'kabablar' || cat === 'kabab') {
        matchesCategory = item.category === 'kabablar' || item.category === 'kabab';
      } else {
        matchesCategory = item.category === cat;
      }

      // Search matching
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (item.ingredients && item.ingredients.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [itemsToDisplay, activeCategory, searchQuery]);

  // Extract or derive ingredients array
  const getIngredients = (item: MenuItem): string[] => {
    if (item.ingredients) {
      return item.ingredients.split(',').map((s) => s.trim());
    }
    const words = item.description
      .replace(/[.,]/g, '')
      .split(' ')
      .filter((w) => w.length > 3);
    const unique = Array.from(new Set(words)).slice(0, 4);
    return unique.length > 0 ? unique : ['Təzə ərzaqlar', 'Mozzarella', 'Xüsusi sos'];
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 pb-8 sm:pb-12 animate-fadeIn">
      {/* Full-width Category Hero Banner (100% original uncropped image view preserved) */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] sm:max-h-[520px] overflow-hidden bg-zinc-950 flex flex-col justify-between p-4 sm:p-6 lg:p-8 transition-all duration-300">
        {/* Background Slides of Selected Category with smooth fade transition */}
        {activeCatSlides.map((imgUrl, idx) => (
          <div
            key={imgUrl + idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center ${
              idx === currentBannerSlide ? 'opacity-100 z-0' : 'opacity-0 z-0'
            }`}
          >
            {/* Ambient Blurred Backdrop */}
            <img
              src={imgUrl}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-105 pointer-events-none"
            />

            {/* Main Sharp Image - Cleanly covers banner without dark gaps */}
            <img
              src={imgUrl}
              alt={titleText}
              className="relative z-10 w-full h-full object-cover object-center transition-transform duration-500 hover:scale-102"
            />
          </div>
        ))}

        {/* Floating Top Controls Bar (Back Button & Admin Edit Slide Button) */}
        <div className="relative z-20 flex items-center justify-between gap-2">
          {onBackToHome && (
            <button
              type="button"
              onClick={onBackToHome}
              className="px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-xl bg-black/80 hover:bg-black text-white border border-white/20 font-bold text-[10px] sm:text-xs flex items-center gap-1 transition-all cursor-pointer shadow-xl backdrop-blur-md active:scale-95 whitespace-nowrap"
            >
              <ArrowLeft className="w-3 h-3 text-white shrink-0" />
              <span>Ana Səhifəyə Qayıt</span>
            </button>
          )}

          {isAdmin && onEditCategoryBanner && (
            <button
              type="button"
              onClick={() => onEditCategoryBanner(activeCategory, currentBannerSlide)}
              className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-black font-extrabold text-[10px] sm:text-xs flex items-center gap-1.5 shadow-xl transition-all cursor-pointer backdrop-blur-md border border-amber-300 ml-auto"
            >
              <Pencil className="w-3.5 h-3.5 text-black" />
              <span>Slaydı Redaktə Et ({currentBannerSlide + 1}/{activeCatSlides.length})</span>
            </button>
          )}
        </div>

        {/* Category Title cleanly centered at bottom without dark frame box */}
        <div className="relative z-20 mt-auto flex justify-center text-center pb-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            {titleText.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu, '').trim()}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-8">
        
        {/* Top Header & Category Navigation */}
        <div className="space-y-4">
          
          {/* KATEQORİYALARIMIZ (Group Navigation Bar inside Menu view) */}
          <div className="py-2 px-1 space-y-2.5 text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="h-0.5 w-6 sm:w-10 bg-emerald-600 rounded-full" />
              <h3 className="text-xs sm:text-sm font-black uppercase text-emerald-950 tracking-wider">
                Kateqoriyalarımız
              </h3>
              <span className="h-0.5 w-6 sm:w-10 bg-emerald-600 rounded-full" />
            </div>

            <div className="flex items-center justify-center flex-wrap gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => handleCategoryChange('all')}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl font-black text-[11px] sm:text-xs md:text-sm transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-2xs ${
                  activeCategory === 'all'
                    ? 'bg-emerald-800 text-white shadow-md ring-1 ring-emerald-900 scale-102'
                    : 'bg-white hover:bg-emerald-50 text-zinc-800 border border-zinc-200'
                }`}
              >
                <span>Hamsı</span>
              </button>

              {CATEGORY_GROUPS.map((group) => {
                const IconComp = group.icon;
                const isGroupActive = activeCategory === group.id || group.subCategories.some(sc => sc.id === activeCategory);

                return (
                  <button
                    type="button"
                    key={group.id}
                    onClick={() => {
                      if (group.subCategories && group.subCategories.length > 0) {
                        handleCategoryChange(group.subCategories[0].id);
                      } else {
                        handleCategoryChange(group.id as CategoryId);
                      }
                    }}
                    className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl font-black text-[11px] sm:text-xs md:text-sm transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-2xs ${
                      isGroupActive
                        ? 'bg-emerald-800 text-white shadow-md ring-1 ring-emerald-900 scale-102'
                        : 'bg-white hover:bg-emerald-50 text-zinc-800 border border-zinc-200'
                    }`}
                  >
                    <IconComp className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isGroupActive ? 'text-amber-300' : 'text-emerald-700'}`} />
                    <span>{group.name}</span>
                  </button>
                );
              })}
            </div>


          </div>

          {/* Search Box below the Banner Header */}
          <div className="relative w-full max-w-xl">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-700" />
            <input
              type="text"
              placeholder={`${titleText.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu, '').trim()} daxilində axtar...`}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (onSearchQueryChange) onSearchQueryChange(e.target.value);
              }}
              className="w-full pl-10 pr-10 py-2.5 sm:py-3 rounded-xl bg-white border-2 border-emerald-300 text-zinc-900 placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-600 transition-all shadow-sm font-bold"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  if (onSearchQueryChange) onSearchQueryChange('');
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-700 hover:text-emerald-900 cursor-pointer"
              >
                Təmizlə
              </button>
            )}
          </div>

        </div>

        {/* Admin Action Bar for Adding / Editing Food Cards */}
        {isAdmin && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-amber-500/15 border-2 border-amber-400/60 backdrop-blur-md text-white shadow-xl animate-in fade-in">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-400 text-black flex items-center justify-center font-black shrink-0 shadow-lg">
                <Sparkles className="w-5 h-5 fill-black" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-black text-amber-400 uppercase tracking-wider">
                  Admin Yemək Məhsulları İdarəetməsi
                </h3>
                <p className="text-[11px] text-zinc-300 font-medium leading-tight">
                  Yeni yemək kartı yarada, şəkil linki, ad, tərkib, qiymət, Populyar və Halal nişanlarını tənzimləyə bilərsiniz.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onAddNewMenuItem && onAddNewMenuItem()}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-black font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shrink-0 uppercase tracking-wider"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>+ Kart</span>
            </button>
          </div>
        )}

        {/* Setimizə Daxildir Section Header for Set View */}
        {isSetView && (
          <div className="flex items-center gap-2.5 pt-2 pb-1 border-b border-emerald-900/60">
            <Sparkles className="w-5 h-5 text-amber-400 fill-amber-400/20 shrink-0" />
            <h2 className="text-base sm:text-2xl font-black text-amber-400 uppercase tracking-wider drop-shadow-md">
              Setimizə Daxildir
            </h2>
          </div>
        )}

        {/* Search Box & Controls Header End */}

        {/* 2. YEMƏK KARTLARI (Horizontal Food Cards - Image on left, details on right, 1 per row / list layout) */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-zinc-950/80 rounded-3xl border border-zinc-800 space-y-3">
            <p className="text-zinc-400 text-sm font-medium">
              Bu kateqoriyada və ya axtarışa uyğun heç bir yemək tapılmadı.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-400 text-black font-extrabold text-xs hover:bg-amber-500 transition-colors cursor-pointer"
            >
              Bütün Menyunu Göstər
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {filteredItems.map((item) => {
              const ingredients = getIngredients(item);
              const hasVariants = item.variants && item.variants.length > 0;

              const handleItemClick = () => {
                if (item.isOutOfStock) return;
                if (hasVariants) {
                  window.history.pushState({ modal: 'customizer' }, '');
                  setSelectedCustomizerItem(item);
                } else {
                  onAddToCart(item);
                }
              };

              return (
                <div
                  key={item.id}
                  id={`food-card-${item.id}`}
                  onClick={handleItemClick}
                  className={`rounded-2xl lg:rounded-3xl p-3.5 sm:p-5 lg:p-6 transition-all duration-300 group flex items-center gap-3.5 sm:gap-4 lg:gap-6 cursor-pointer relative ${
                    item.id === highlightedItemId
                      ? 'bg-amber-50/40 border-2 border-zinc-950 ring-2 ring-zinc-950 shadow-2xl scale-[1.01]'
                      : 'bg-white border border-zinc-200 hover:border-emerald-600 shadow-xs hover:shadow-xl'
                  }`}
                >
                  {/* Left Side: Photo Box - Enlarged Food Photo */}
                  <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-900 shrink-0 border border-zinc-200 shadow-xs flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Admin Edit & Delete Buttons over image */}
                    {isAdmin && (
                      <div className="absolute bottom-1.5 left-1.5 z-20 flex items-center gap-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onEditMenuItem) onEditMenuItem(item);
                          }}
                          className="p-1.5 rounded-lg bg-amber-400 text-black hover:bg-amber-300 shadow font-black cursor-pointer flex items-center justify-center"
                          title={`"${item.name}" məhsulunu redaktə et`}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeletingItem(item);
                          }}
                          className="p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-500 shadow font-black cursor-pointer flex items-center justify-center"
                          title={`"${item.name}" məhsulunu sil`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {/* Out of Stock Badge if applicable */}
                    {item.isOutOfStock && (
                      <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center z-20">
                        <span className="px-2 py-1 rounded-lg bg-red-600 text-white font-black text-xs uppercase tracking-wider">
                          Tükənib
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Right Side Details Column */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between space-y-1.5 sm:space-y-2.5 py-0.5 h-full">
                    {/* Top Header: Title on Left, Price on Right */}
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm sm:text-base lg:text-xl font-black text-emerald-950 uppercase group-hover:text-emerald-700 transition-colors line-clamp-2 leading-tight">
                        {item.name}
                      </h3>

                      {!isSetView && (
                        <div className="text-right shrink-0">
                          <span className="text-sm sm:text-lg lg:text-2xl font-black text-emerald-950 tracking-tight whitespace-nowrap block">
                            {hasVariants ? `от ${item.price.toFixed(2)}` : `${item.price.toFixed(2)}`} ₼
                          </span>
                          {hasVariants && (
                            <span className="text-[9px] sm:text-xs font-bold text-amber-600 block">
                              (Ölçülər var)
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Rating & Ingredient Tags Row */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="flex items-center gap-1 text-amber-500 font-black text-xs sm:text-sm shrink-0">
                        <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-500" />
                        <span>{item.rating || 4.9}</span>
                      </span>

                      {ingredients.slice(0, 3).map((ing, idx) => (
                        <span
                          key={idx}
                          className="px-1 py-0.2 rounded-md bg-emerald-50 border border-emerald-200 text-[7px] sm:text-[9px] text-emerald-900 font-extrabold line-clamp-1"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>

                    {/* Description Text & "Əlavə Et" Button side-by-side */}
                    <div className="flex items-end justify-between gap-2 pt-1">
                      <p className="text-[11px] sm:text-xs lg:text-sm text-zinc-600 font-medium line-clamp-2 sm:line-clamp-3 leading-snug flex-1 min-w-0">
                        {item.description}
                      </p>

                      {!isSetView && (
                        <button
                          type="button"
                          disabled={item.isOutOfStock}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleItemClick();
                          }}
                          className="px-3 py-1.5 sm:px-4 sm:py-2 lg:px-6 lg:py-3 rounded-xl lg:rounded-2xl bg-emerald-800 hover:bg-emerald-900 active:scale-95 text-white font-black text-xs sm:text-sm lg:text-base flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:bg-zinc-300 disabled:text-zinc-500 disabled:cursor-not-allowed whitespace-nowrap shrink-0"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white/20 shrink-0" />
                          <span>{hasVariants ? 'Ölçü Seç' : 'Əlavə Et'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* FAQ Section */}
      <FaqSection />

      {/* Item Customizer Modal */}
      <ItemCustomizerModal
        item={selectedCustomizerItem}
        onClose={() => setSelectedCustomizerItem(null)}
        onAddToCart={onAddToCart}
        hidePrice={isSetView}
      />

      {/* Custom Delete Confirmation Modal */}
      {deletingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0b1c15] border border-rose-500/40 rounded-2xl p-6 max-w-sm w-full space-y-4 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-black text-white">Məhsul Silinsin?</h3>
              <p className="text-xs text-zinc-300">
                "<span className="text-amber-300 font-bold">{deletingItem.name}</span>" məhsulunu bazadan silmək istədiyinizdən əminsiniz?
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingItem(null)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold cursor-pointer transition-colors"
              >
                Ləğv Et
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onDeleteMenuItem) onDeleteMenuItem(deletingItem.id);
                  setDeletingItem(null);
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black cursor-pointer transition-colors shadow-lg"
              >
                Bəli, Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
