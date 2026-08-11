import React, { useState, useEffect } from 'react';
import { CategoryCard, GalleryPhoto, CategoryId, HeroConfig } from '../types';
import { ChevronRight, Utensils, Coffee, Pizza, Flame, Package } from 'lucide-react';
import { Hero } from './Hero';
import { DEFAULT_CATEGORIES } from '../lib/cmsStore';

interface CategoriesAndGallerySectionProps {
  categories: CategoryCard[];
  galleryPhotos?: GalleryPhoto[];
  onSelectCategory?: (categoryId: CategoryId) => void;
  onSelectSet?: (setObj: { id: string; title: string; categoryId: CategoryId; description: string; imageUrl: string }) => void;
  onSearch?: (query: string) => void;
  searchQuery?: string;
  middleHeroConfig?: HeroConfig;
  isAdmin?: boolean;
  onOrderNow?: () => void;
  onOpenReviews?: () => void;
  onOpenAiAssistant?: () => void;
  onEditMiddleHero?: (slideIndex?: number) => void;
}

export const CATEGORY_GROUPS = [
  {
    id: 'esas_yemekler',
    name: 'Əsas Yeməklər',
    icon: Flame,
    subCategories: [
      { id: 'kabablar' as CategoryId, label: 'Kabablar' },
      { id: 'isti_yemekler' as CategoryId, label: 'İsti Yeməklər' },
      { id: 'sorbalar' as CategoryId, label: 'Şorbalar' },
      { id: 'qelyanaltilar' as CategoryId, label: 'Qəlyanaltı' },
      { id: 'cig_kofte' as CategoryId, label: 'Çiy Köftə' },
      { id: 'salat' as CategoryId, label: 'Salat' },
    ]
  },
  {
    id: 'festfood',
    name: 'Fest & Food',
    icon: Pizza,
    subCategories: [
      { id: 'fastfood' as CategoryId, label: 'Burger & Fast Food' },
      { id: 'pizza' as CategoryId, label: 'Pizza' },
      { id: 'pide' as CategoryId, label: 'Pide' },
    ]
  },
  {
    id: 'ickiler',
    name: 'İçkilər',
    icon: Coffee,
    subCategories: [
      { id: 'icikil' as CategoryId, label: 'Soyuq İçkilər (Cola, Fanta, Sprite)' },
      { id: 'kofe' as CategoryId, label: 'Kofe' },
      { id: 'kokteyl' as CategoryId, label: 'Kokteyl' },
    ]
  },
  {
    id: 'desertler_group',
    name: 'Desertlər',
    icon: Utensils,
    subCategories: [
      { id: 'desertler' as CategoryId, label: 'Desertlər' },
    ]
  },
  {
    id: 'setler_group',
    name: 'Setlər',
    icon: Package,
    subCategories: [
      { id: 'all' as CategoryId, label: 'Ailə və Endirimli Setlər' },
    ]
  }
];

export const CategoriesAndGallerySection: React.FC<CategoriesAndGallerySectionProps> = ({
  categories,
  onSelectCategory,
  onSelectSet,
  onSearch,
  searchQuery,
  middleHeroConfig,
  isAdmin,
  onOrderNow = () => {},
  onOpenReviews = () => {},
  onOpenAiAssistant = () => {},
  onEditMiddleHero,
}) => {
  const [selectedGroupId, setSelectedGroupId] = useState<string>('esas_yemekler');

  const activeGroup = CATEGORY_GROUPS.find(g => g.id === selectedGroupId) || CATEGORY_GROUPS[0];

  // Filter categories based on selected group
  const displayedCategories = React.useMemo(() => {
    if (!activeGroup || activeGroup.subCategories.length === 0) return categories;
    const activeSubCatIds = activeGroup.subCategories.map(sc => sc.id);
    return categories.filter(c => activeSubCatIds.includes(c.id as CategoryId));
  }, [categories, activeGroup]);

  const renderCategoryCard = (cat: CategoryCard) => {
    const descriptionText = cat.description || DEFAULT_CATEGORIES.find(dc => dc.id === cat.id)?.description;

    return (
      <div
        key={cat.id}
        onClick={() => onSelectCategory && onSelectCategory(cat.id as CategoryId)}
        className="group flex flex-col bg-white border border-zinc-200 hover:border-emerald-600 rounded-2xl sm:rounded-3xl p-3 sm:p-5 lg:p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
      >
        {/* Photo Frame Box - Square Aspect Ratio 1:1 Full Size Image */}
        <div className="relative aspect-square w-full overflow-hidden rounded-xl sm:rounded-2xl border border-zinc-200 bg-zinc-100 shadow-xs">
          <img
            src={cat.image}
            alt={cat.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

          {/* Badge & Action Indicator */}
          <div className="absolute bottom-2.5 right-2.5 sm:bottom-4 sm:right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white text-black font-black text-xs sm:text-base shadow-lg group-hover:bg-amber-400 transition-colors">
            <span className="text-black font-black">Baxın</span>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3] text-black" />
          </div>
        </div>

        {/* Text directly under photo frame - Title Name and Feature Sentences */}
        <div className="mt-2.5 sm:mt-4 px-0.5 text-left space-y-1">
          <h3 className="text-sm sm:text-2xl lg:text-3xl font-black text-black group-hover:text-emerald-800 transition-colors flex items-center gap-1 line-clamp-1">
            <span className="text-black font-black tracking-tight">
              {cat.name.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu, '').trim()}
            </span>
          </h3>
          {descriptionText && (
            <p className="text-[11px] sm:text-sm lg:text-base font-medium text-zinc-600 line-clamp-2 leading-snug">
              {descriptionText}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <section id="categories" className="py-8 sm:py-16 bg-white border-b border-zinc-200">
      {/* All Categories Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
        
        {/* Section Title & Heading */}
        <div className="space-y-1.5 text-center sm:text-left">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-zinc-900 tracking-tight">
            Menyu <span className="text-emerald-800">Bölmələrinə Daxil Olun</span>
          </h2>
          <p className="text-zinc-800 text-xs sm:text-base font-bold">
            Sifarişinizi Seçin
          </p>
        </div>

        {/* KATEQORİYALARIMIZ (Category Navigation Bar - Centered) */}
        <div className="py-2 px-1 space-y-2.5 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="h-0.5 w-6 sm:w-10 bg-emerald-600 rounded-full" />
            <h3 className="text-xs sm:text-sm font-black uppercase text-emerald-900 tracking-wider">
              Kateqoriyalarımız
            </h3>
            <span className="h-0.5 w-6 sm:w-10 bg-emerald-600 rounded-full" />
          </div>

          {/* 5 Main Group Buttons without numbers (Centered & Tight Spacing) */}
          <div className="flex items-center justify-center flex-wrap gap-1.5 sm:gap-2">
            {CATEGORY_GROUPS.map((group) => {
              const isActive = selectedGroupId === group.id;
              const IconComp = group.icon;

              return (
                <button
                  type="button"
                  key={group.id}
                  onClick={() => {
                    setSelectedGroupId(group.id);
                  }}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl font-black text-[11px] sm:text-xs md:text-sm transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-2xs active:scale-95 ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-md ring-1 ring-emerald-900 scale-102'
                      : 'bg-white hover:bg-emerald-50 text-zinc-800 border border-zinc-200'
                  }`}
                >
                  <IconComp className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-amber-300' : 'text-emerald-700'}`} />
                  <span>{group.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* All categories grid together (Enlarged cards on Desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-8 lg:gap-10">
          {displayedCategories.map(renderCategoryCard)}
        </div>
      </div>

      {/* Middle Hero Slider Banner - FULL SCREEN WIDTH EDGE-TO-EDGE */}
      <div className="mt-10 sm:mt-16 w-full overflow-hidden">
        <Hero
          heroConfig={middleHeroConfig}
          onOrderNow={onOrderNow}
          onOpenReviews={onOpenReviews}
          onOpenAiAssistant={onOpenAiAssistant}
          isAdmin={isAdmin}
          onEditHero={onEditMiddleHero}
        />
      </div>
    </section>
  );
};

