import React from 'react';
import { CategoryCard, GalleryPhoto, CategoryId } from '../types';
import { ChevronRight } from 'lucide-react';

interface CategoriesAndGallerySectionProps {
  categories: CategoryCard[];
  galleryPhotos: GalleryPhoto[];
  onSelectCategory?: (categoryId: CategoryId) => void;
  onSelectSet?: (setObj: { id: string; title: string; categoryId: CategoryId; description: string; imageUrl: string }) => void;
}

export const CategoriesAndGallerySection: React.FC<CategoriesAndGallerySectionProps> = ({
  categories,
  galleryPhotos,
  onSelectCategory,
  onSelectSet,
}) => {
  const setsData = [
    {
      id: 'set-1',
      title: 'Alov Ailə Seti',
      description: '2 Böyük Pitsa + 2 Ədəd Pide + Kartof Fri + 1L Kola',
      imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
      categoryId: 'pide' as CategoryId,
    },
    {
      id: 'set-2',
      title: 'Alov Burger & Qrill Seti',
      description: '2 Xüsusi Qrill Burger + Çıtır Naggetslər + Fri + 2 İçecek',
      imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=800',
      categoryId: 'fastfood' as CategoryId,
    },
    {
      id: 'set-3',
      title: 'Çıtır Toyuq & Dürüm Seti',
      description: '12 Ədəd Çıtır Kanat + Toyuq Dürüm + Xüsusi Sos + Kola',
      imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800',
      categoryId: 'fastfood' as CategoryId,
    },
    {
      id: 'set-4',
      title: 'Közdə Sac & Pide Seti',
      description: 'Qarışıq Ətli Sac Qovurma + Xüsusi Quşbaşı Pide + Ayran',
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
      categoryId: 'pide' as CategoryId,
    },
  ];

  return (
    <section id="categories" className="py-12 sm:py-16 bg-[#082017] border-b border-emerald-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* 0. SETLƏRİMİZ (4 Combo Sets Side-By-Side) */}
        <div className="space-y-6">
          <div className="space-y-1 text-left">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-white tracking-tight">
              Setlərimiz
            </h2>
            <p className="text-emerald-200/80 text-xs sm:text-sm">
              Xüsusi endirimli kombinasiyalar və doyurucu ailə setlərimiz
            </p>
          </div>

          {/* Horizontal Single Row (4 cards side-by-side) */}
          <div className="flex overflow-x-auto pb-3 gap-3 sm:gap-5 scrollbar-none snap-x sm:grid sm:grid-cols-4 sm:overflow-visible">
            {setsData.map((set) => (
              <div
                key={set.id}
                onClick={() => {
                  if (onSelectSet) {
                    onSelectSet(set);
                  } else if (onSelectCategory) {
                    onSelectCategory(set.categoryId);
                  }
                }}
                className="group flex flex-col shrink-0 w-[220px] sm:w-auto snap-start transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
              >
                {/* Photo Frame */}
                <div className="relative h-36 sm:h-44 overflow-hidden rounded-2xl border border-emerald-800/80 group-hover:border-amber-400 bg-black shadow-xl transition-colors duration-300">
                  <img
                    src={set.imageUrl}
                    alt={set.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Action Indicator */}
                  <div className="absolute bottom-2 right-2 z-10 flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-amber-400 text-black font-extrabold text-[10px] sm:text-[11px] shadow-md group-hover:bg-amber-300 transition-colors">
                    <span>Menyunu Aç</span>
                    <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
                  </div>
                </div>

                {/* Text under frame (Title only, description removed) */}
                <div className="mt-2 px-1 text-left">
                  <h3 className="text-xs sm:text-sm font-black text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                    {set.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 1. 6 MAIN FOOD CATEGORY CARDS */}
        <div className="space-y-6">
          <div className="space-y-1 text-left">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-white tracking-tight whitespace-nowrap">
              Populyar <span className="text-amber-400">Yemək Kateqoriyalarımız</span>
            </h2>
            <p className="text-emerald-200/80 text-xs sm:text-sm">
              Kateqoriyaya klikləyərək fərdi menyumuza keçid edin Və sifariş verin.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => onSelectCategory && onSelectCategory(cat.id as CategoryId)}
                className="group flex flex-col transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                {/* Photo Frame Box */}
                <div className="relative h-64 sm:h-80 md:h-[320px] overflow-hidden rounded-3xl border-2 border-emerald-800/80 group-hover:border-amber-400 bg-black shadow-2xl transition-colors duration-300">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Badge & Action Indicator */}
                  <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 text-black font-extrabold text-xs shadow-lg group-hover:bg-amber-300 transition-colors">
                    <span>Menyunu Aç</span>
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </div>
                </div>

                {/* Text directly under the photo frame */}
                <div className="mt-4 px-2 space-y-1.5 text-left">
                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-amber-400 transition-colors flex items-center gap-2">
                    <span>{cat.name}</span>
                    {cat.icon && <span className="text-xl">{cat.icon}</span>}
                  </h3>
                  {cat.description && (
                    <p className="text-sm sm:text-base font-medium text-emerald-200/80">
                      {cat.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. SIRRIN TƏAMLARIMIZ / GALLERY */}
        <div className="space-y-6 pt-6 border-t border-emerald-900/80">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Sirrin <span className="text-emerald-300">təamlarımız</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {galleryPhotos.map((photo) => {
              const targetCategory: CategoryId = photo.title.toLowerCase().includes('pide')
                ? 'pide'
                : photo.title.toLowerCase().includes('qrill') || photo.title.toLowerCase().includes('sac')
                ? 'fastfood'
                : 'all';

              return (
                <div
                  key={photo.id}
                  onClick={() => onSelectCategory && onSelectCategory(targetCategory)}
                  className="group flex flex-col transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                >
                  {/* Photo Frame */}
                  <div className="relative h-40 sm:h-48 overflow-hidden rounded-2xl border border-emerald-800/80 group-hover:border-amber-400 bg-black shadow-xl transition-colors duration-300">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Action Indicator */}
                    <div className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400 text-black font-extrabold text-[11px] shadow-md group-hover:bg-amber-300 transition-colors">
                      <span>Menyunu Aç</span>
                      <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>

                  {/* Text under the frame */}
                  <div className="mt-2.5 px-1 space-y-0.5 text-left">
                    <h3 className="text-sm sm:text-base font-black text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                      {photo.title}
                    </h3>
                    {photo.description && (
                      <p className="text-xs text-emerald-200/70 line-clamp-2">
                        {photo.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

