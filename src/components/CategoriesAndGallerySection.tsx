import React from 'react';
import { CategoryCard, GalleryPhoto, CategoryId, HeroConfig } from '../types';
import { ChevronRight } from 'lucide-react';
import { Hero } from './Hero';

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
  const renderCategoryCard = (cat: CategoryCard) => (
    <div
      key={cat.id}
      onClick={() => onSelectCategory && onSelectCategory(cat.id as CategoryId)}
      className="group flex flex-col bg-white border border-zinc-200 rounded-lg sm:rounded-xl p-2 sm:p-3.5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    >
      {/* Photo Frame Box - Equal width & height (Square aspect ratio 1:1) */}
      <div className="relative aspect-square w-full overflow-hidden rounded-md sm:rounded-lg border border-zinc-200 bg-zinc-100">
        <img
          src={cat.image}
          alt={cat.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Badge & Action Indicator */}
        <div className="absolute bottom-1.5 right-1.5 sm:bottom-3 sm:right-3 z-10 flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 rounded bg-white text-black font-black text-[10px] sm:text-sm shadow-md group-hover:bg-amber-400 transition-colors">
          <span className="text-black">Baxın</span>
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 stroke-[3] text-black" />
        </div>
      </div>

      {/* Text directly under photo frame */}
      <div className="mt-2 sm:mt-3.5 px-0.5 space-y-0.5 sm:space-y-1 text-left">
        <h3 className="text-xs sm:text-lg font-black text-black group-hover:text-emerald-800 transition-colors flex items-center gap-1 line-clamp-1">
          <span className="text-black">
            {cat.name.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu, '').trim()}
          </span>
        </h3>
        {cat.description && (
          <p className="text-[10px] sm:text-sm font-bold text-zinc-700 line-clamp-2">
            {cat.description}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <section id="categories" className="py-8 sm:py-14 bg-white border-b border-zinc-200">
      {/* All Categories Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <div className="space-y-1 text-left">
          <h2 className="text-lg sm:text-3xl md:text-4xl font-black text-zinc-900 tracking-tight whitespace-nowrap">
            Menyu <span className="text-emerald-800">Bölmələrinə Daxil Olun</span>
          </h2>
          <p className="text-zinc-800 text-[11px] sm:text-sm font-bold">
            Sifarişinizi Seçin
          </p>
        </div>

        {/* All categories grid together (2 columns on mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
          {categories.map(renderCategoryCard)}
        </div>
      </div>

      {/* Middle Hero Slider Banner - FULL SCREEN WIDTH EDGE-TO-EDGE */}
      <div className="mt-10 sm:mt-14 w-full overflow-hidden">
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

