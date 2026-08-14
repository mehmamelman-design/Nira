import React, { useState, useEffect } from 'react';
import { CategoryCard, GalleryPhoto, CategoryId, HeroConfig } from '../types';
import { ChevronRight, Utensils, Coffee, Pizza, Flame, Package, Pencil } from 'lucide-react';
import { Hero } from './Hero';
import { DEFAULT_CATEGORIES, formatAzTitle } from '../lib/cmsStore';
import { DEFAULT_CATEGORY_SLIDES } from './MenuSection';

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
  onEditCategory?: (category: CategoryCard) => void;
}

export const CATEGORY_GROUPS = [
  {
    id: 'esas_yemekler',
    name: 'Əsas Yeməklər',
    icon: Flame,
    subCategories: [
      { id: 'kabablar' as CategoryId, label: 'Kabablar' },
      { id: 'sorbalar' as CategoryId, label: 'Şorbalar' },
      { id: 'isti_yemekler' as CategoryId, label: 'İsti Yeməklər' },
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
      { id: 'fastfood' as CategoryId, label: 'Burger və Nugget' },
      { id: 'pizza' as CategoryId, label: 'Pizza' },
      { id: 'pide' as CategoryId, label: 'Pide' },
    ]
  },
  {
    id: 'ickiler',
    name: 'İçkilər',
    icon: Coffee,
    subCategories: [
      { id: 'icikil' as CategoryId, label: 'Soyuq İçkilər' },
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
  onEditCategory,
}) => {
  const [selectedGroupId, setSelectedGroupId] = useState<string>('esas_yemekler');

  const activeGroup = CATEGORY_GROUPS.find(g => g.id === selectedGroupId) || CATEGORY_GROUPS[0];

  // Filter categories based on selected group with strict matching
  const displayedCategories = React.useMemo(() => {
    const sourceList = (categories && categories.length > 0) ? categories : DEFAULT_CATEGORIES;

    if (activeGroup.id === 'esas_yemekler') {
      const allowedIds = ['kabablar', 'sorbalar', 'isti_yemekler', 'qelyanaltilar', 'cig_kofte', 'salat'];
      const result: CategoryCard[] = [];
      allowedIds.forEach(id => {
        const found = sourceList.find(c => c.id === id) || DEFAULT_CATEGORIES.find(dc => dc.id === id);
        if (found) result.push(found);
      });
      return result;
    }

    if (activeGroup.id === 'festfood') {
      const allowedIds = ['fastfood', 'pizza', 'pide'];
      const result: CategoryCard[] = [];
      allowedIds.forEach(id => {
        const found = sourceList.find(c => c.id === id) || DEFAULT_CATEGORIES.find(dc => dc.id === id);
        if (found) result.push(found);
      });
      return result;
    }

    if (activeGroup.id === 'ickiler') {
      const allowedIds = ['icikil', 'kofe', 'kokteyl'];
      const result: CategoryCard[] = [];
      allowedIds.forEach(id => {
        const found = sourceList.find(c => c.id === id) || DEFAULT_CATEGORIES.find(dc => dc.id === id);
        if (found) result.push(found);
      });
      return result;
    }

    if (activeGroup.id === 'desertler_group') {
      const found = sourceList.find(c => c.id === 'desertler') || DEFAULT_CATEGORIES.find(dc => dc.id === 'desertler');
      return found ? [found] : [];
    }

    const activeSubCatIds = activeGroup.subCategories.map(sc => sc.id);
    return sourceList.filter(c => activeSubCatIds.includes(c.id as CategoryId));
  }, [categories, activeGroup]);

  const renderCategoryCard = (cat: CategoryCard) => {
    const descriptionText = cat.description || DEFAULT_CATEGORIES.find(dc => dc.id === cat.id)?.description;

    return (
      <div
        key={cat.id}
        onClick={() => onSelectCategory && onSelectCategory(cat.id as CategoryId)}
        className="group relative flex flex-col bg-white rounded-2xl sm:rounded-3xl p-1.5 sm:p-2.5 lg:p-3 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
      >
        {/* Admin Edit Button on Category Card */}
        {isAdmin && onEditCategory && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEditCategory(cat);
            }}
            className="absolute top-3 left-3 z-30 px-2.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-xs shadow-xl flex items-center gap-1.5 active:scale-95 transition-all border border-black/20"
            title="Şəkli və Slayderi Dəyiş"
          >
            <Pencil className="w-3.5 h-3.5 text-black" />
            <span>Şəkli Dəyiş</span>
          </button>
        )}

        {/* Photo Frame Box - Matches 16:9 banner photo aspect ratio cleanly without any black borders */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-zinc-900 shadow-md flex items-center justify-center">
          <img
            src={cat.image || (DEFAULT_CATEGORY_SLIDES[cat.id]?.[0]) || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600'}
            alt={cat.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-20 group-hover:opacity-0 transition-opacity pointer-events-none" />

          {/* Badge & Action Indicator */}
          <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 z-20 flex items-center gap-1 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl bg-white text-black font-black text-[11px] sm:text-xs shadow-md group-hover:bg-amber-400 transition-colors">
            <span className="text-black font-black">Baxın</span>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3] text-black" />
          </div>
        </div>

        {/* Text directly under photo frame - Title Name and Feature Sentences */}
        <div className="mt-2 sm:mt-3 px-1 pb-1 text-left space-y-0.5 sm:space-y-1">
          <h3 className="text-sm sm:text-lg lg:text-xl font-black text-black group-hover:text-emerald-800 transition-colors flex items-center gap-1 line-clamp-1">
            <span className="text-black font-black tracking-tight">
              {formatAzTitle(cat.name.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu, '').trim(), cat.id)}
            </span>
          </h3>
          {descriptionText && (
            <p className="text-[11px] sm:text-xs lg:text-sm font-medium text-zinc-600 line-clamp-2 leading-tight">
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

        {/* All categories grid together (Compact 2-3 col layout) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8">
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
          isMiddleHero={true}
        />
      </div>
    </section>
  );
};

