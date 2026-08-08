import React, { useState, useEffect, useMemo } from 'react';
import { Search, Star, Clock, ShieldCheck, Sparkles, ShoppingBag, ArrowLeft, Flame, FlameKindling, Pencil, Plus, Trash2 } from 'lucide-react';
import { MenuItem, CategoryId, CategoryCard } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { ItemCustomizerModal } from './ItemCustomizerModal';
import { FaqSection } from './FaqSection';

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
}

const DEFAULT_CATEGORY_IMAGES: Record<string, { image: string; desc: string }> = {
  pizza: {
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1200',
    desc: 'İsti daş fırında bişən bol xammallı pizzalar',
  },
  fastfood: {
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1200',
    desc: 'Şirəli smash burgerlər və xırçıltılı naggetslər',
  },
  pide: {
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=1200',
    desc: 'Ənənəvi xırçıltılı ətli, pendirli və qıymalı pidələr',
  },
  calzone: {
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80&w=1200',
    desc: 'İçi bol ərimiş mozzarella və xüsusi qiyməli calzonelar',
  },
  doner: {
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&q=80&w=1200',
    desc: 'Közdə fırlanan təzə halal ət və toyuq dönərləri',
  },
  icikil: {
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=1200',
    desc: 'Buz kimi sərinləşdirici təbii içkilər və limanadlar',
  },
  all: {
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200',
    desc: 'Bütün ləzzətli yemək və içkilərimiz',
  },
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
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>(selectedCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomizerItem, setSelectedCustomizerItem] = useState<MenuItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    if (selectedCategory) {
      setActiveCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const handleCategoryChange = (catId: CategoryId) => {
    setActiveCategory(catId);
    if (onCategoryChange) {
      onCategoryChange(catId);
    }
  };

  const itemsToDisplay = menuItems && menuItems.length > 0 ? menuItems : MENU_ITEMS;

  // The 6 Main Requested Categories + "Hamsı"
  const categories: { id: CategoryId; name: string; icon: string }[] = [
    { id: 'all', name: 'Hamsı', icon: '' },
    { id: 'pizza', name: 'Pizzalar', icon: '' },
    { id: 'fastfood', name: 'Fast Food & Burger', icon: '' },
    { id: 'pide', name: 'Pidelər', icon: '' },
    { id: 'calzone', name: 'Calizone', icon: '' },
    { id: 'doner', name: 'Dönərlər', icon: '' },
    { id: 'icikil', name: 'Soyuq İçkilər', icon: '' },
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

  // Filtering Logic
  const filteredItems = useMemo(() => {
    return itemsToDisplay.filter((item) => {
      // Category matching
      let matchesCategory = false;
      if (activeCategory === 'all') {
        matchesCategory = true;
      } else if (activeCategory === 'icikil') {
        matchesCategory =
          item.category === 'icikil' ||
          item.category === 'ickiler' ||
          item.name.toLowerCase().includes('kola') ||
          item.name.toLowerCase().includes('ayran') ||
          item.name.toLowerCase().includes('limonad') ||
          item.name.toLowerCase().includes('su') ||
          item.name.toLowerCase().includes('fanta') ||
          item.name.toLowerCase().includes('sprite');
      } else if (activeCategory === 'pide') {
        matchesCategory =
          item.category === 'pide' ||
          item.category === 'isti_yemekler' ||
          item.name.toLowerCase().includes('pide') ||
          item.name.toLowerCase().includes('lahmacun') ||
          item.description.toLowerCase().includes('pide');
      } else if (activeCategory === 'calzone') {
        matchesCategory =
          item.category === 'calzone' ||
          item.name.toLowerCase().includes('calzone') ||
          item.name.toLowerCase().includes('calizone') ||
          item.description.toLowerCase().includes('calzone');
      } else if (activeCategory === 'doner') {
        matchesCategory =
          item.category === 'doner' ||
          item.name.toLowerCase().includes('dönər') ||
          item.name.toLowerCase().includes('doner') ||
          item.name.toLowerCase().includes('şavurma') ||
          item.name.toLowerCase().includes('iskəndər');
      } else {
        matchesCategory = item.category === activeCategory;
      }

      // Search matching
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

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
    <div className="min-h-screen bg-[#071710] text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header & Category Hero Banner */}
        <div className="space-y-4">
          
          {/* Expanded Banner Image Section with Back Button directly inside on Top-Left */}
          <div className="relative w-full h-52 sm:h-64 md:h-72 overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl bg-zinc-950 flex flex-col justify-between p-4 sm:p-6 transition-all duration-300">
            {/* Background Image of Selected Category */}
            <img
              src={activeCatImage}
              alt={titleText}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Dark Gradients for Text & Button Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />

            {/* Back Button directly inside on Top-Left of the Photo */}
            {onBackToHome && (
              <div className="relative z-20 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onBackToHome}
                  className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-black/80 hover:bg-black backdrop-blur-md text-white border border-zinc-700/80 hover:border-zinc-500 font-bold text-[10px] sm:text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-lg active:scale-95 whitespace-nowrap"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Ana Səhifəyə Qayıt</span>
                </button>
              </div>
            )}

            {/* Banner Text Over Image at Bottom */}
            <div className="relative z-10 space-y-1.5 mt-auto pt-4">
              <div className="inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white text-black font-extrabold text-[9px] sm:text-[11px] tracking-wider uppercase shadow-md">
                XÜSUSİ BÖLMƏ TƏAMLARI
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase drop-shadow-lg">
                {titleText.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu, '').trim()}
              </h1>
              {activeCatDesc && (
                <p className="text-xs sm:text-sm font-medium text-zinc-200 max-w-2xl drop-shadow leading-snug">
                  {activeCatDesc}
                </p>
              )}
            </div>
          </div>

          {/* Search Box below the Banner Header */}
          <div className="relative w-full max-w-xl">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder={`${titleText.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu, '').trim()} daxilində axtar...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 sm:py-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white placeholder-zinc-400 text-xs sm:text-sm focus:outline-none focus:border-zinc-600 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-amber-400 hover:text-white cursor-pointer"
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

        {/* 2. YEMƏK KARTLARI (Food Cards Grid - 2 per row on mobile, scaled down 1.5x) */}
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-4">
            {filteredItems.map((item) => {
              const ingredients = getIngredients(item);

              return (
                <div
                  key={item.id}
                  onClick={() => !item.isOutOfStock && onAddToCart(item)}
                  className="bg-zinc-900/95 border border-zinc-800/90 hover:border-amber-500/60 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 group flex flex-col justify-between cursor-pointer"
                >
                  {/* Top Image Section */}
                  <div>
                    <div className="relative h-32 sm:h-40 overflow-hidden bg-zinc-950">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />

                      {/* Gradient Overlay for Readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/30" />

                      {/* Badges on Image */}
                      <div className="absolute top-1.5 left-1.5 flex flex-wrap gap-1 z-10 max-w-[70%]">
                        {item.isHalal !== false && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-600/95 text-white text-[9px] font-black tracking-wider shadow flex items-center gap-0.5">
                            <ShieldCheck className="w-2.5 h-2.5 text-white" /> Halal
                          </span>
                        )}

                        {item.isPopular && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-500 text-black text-[9px] font-black uppercase tracking-wider shadow flex items-center gap-0.5">
                            <Sparkles className="w-2.5 h-2.5 fill-black" /> Populyar
                          </span>
                        )}
                      </div>

                      {/* Admin Edit & Delete Buttons */}
                      {isAdmin && (
                        <div className="absolute top-1.5 right-1.5 z-20 flex items-center gap-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onEditMenuItem) onEditMenuItem(item);
                            }}
                            className="p-1.5 rounded-lg bg-amber-400 text-black hover:bg-amber-300 shadow-lg font-black transition-transform duration-200 hover:scale-110 cursor-pointer flex items-center justify-center"
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
                            className="p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-500 shadow-lg font-black transition-transform duration-200 hover:scale-110 cursor-pointer flex items-center justify-center"
                            title={`"${item.name}" məhsulunu sil`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}

                      {/* Out of Stock Badge if applicable */}
                      {item.isOutOfStock && (
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center z-20">
                          <span className="px-2 py-0.5 rounded-lg bg-red-600 text-white font-black text-[10px] uppercase tracking-wider">
                            Tükənib
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Content Body */}
                    <div className="p-2.5 sm:p-3 space-y-1.5">
                      
                      {/* Food Name (White color) */}
                      <h3 className="text-xs sm:text-sm font-black text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                        {item.name}
                      </h3>

                      {/* Rating, Prep Time & Calories */}
                      <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-zinc-400 flex-wrap">
                        <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{item.rating || 4.9}</span>
                        </span>
                        <span className="text-zinc-700">•</span>
                        <span className="flex items-center gap-0.5 text-zinc-300">
                          <Clock className="w-3 h-3 text-emerald-400" />
                          <span>{item.prepTime || '12 dəq'}</span>
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-[10px] sm:text-xs text-zinc-300 font-medium line-clamp-2 leading-tight">
                        {item.description}
                      </p>

                      {/* Ingredients List */}
                      <div className="flex flex-wrap gap-0.5 pt-0.5">
                        {ingredients.slice(0, 3).map((ing, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 rounded bg-zinc-950 text-[9px] text-zinc-400 font-medium"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>

                  {/* Card Footer: Price & "+ Səbətə əlavə et" Accent Button */}
                  {!isSetView && (
                    <div className="p-2.5 sm:p-3 pt-0 space-y-1.5">
                      <div className="flex items-center justify-between border-t border-zinc-800/80 pt-1.5">
                        <span className="text-[10px] text-zinc-400 font-medium">Qiymət:</span>
                        <span className="text-xs sm:text-sm font-black text-amber-400 tracking-tight">
                          {item.price.toFixed(2)} ₼
                        </span>
                      </div>

                      {/* "+ Əlavə Et" Yellow Button */}
                      <button
                        type="button"
                        disabled={item.isOutOfStock}
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(item);
                        }}
                        className="w-full py-1 px-2 rounded-lg bg-amber-400 hover:bg-amber-500 active:scale-[0.98] text-black font-extrabold text-[10px] sm:text-xs transition-all cursor-pointer flex items-center justify-center gap-1 shadow-xs disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed whitespace-nowrap"
                      >
                        <ShoppingBag className="w-3 h-3 fill-black/10 shrink-0" />
                        <span>Əlavə Et</span>
                      </button>
                    </div>
                  )}

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
