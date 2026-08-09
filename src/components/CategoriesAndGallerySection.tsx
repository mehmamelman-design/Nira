import React from 'react';
import { CategoryCard, GalleryPhoto, CategoryId } from '../types';
import { ChevronRight, Search } from 'lucide-react';

interface CategoriesAndGallerySectionProps {
  categories: CategoryCard[];
  galleryPhotos: GalleryPhoto[];
  onSelectCategory?: (categoryId: CategoryId) => void;
  onSelectSet?: (setObj: { id: string; title: string; categoryId: CategoryId; description: string; imageUrl: string }) => void;
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

export const CategoriesAndGallerySection: React.FC<CategoriesAndGallerySectionProps> = ({
  categories,
  galleryPhotos,
  onSelectCategory,
  onSelectSet,
  onSearch,
  searchQuery,
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
    <section id="categories" className="py-10 sm:py-14 bg-[#082017] border-b border-emerald-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">

        {/* Search Bar - Positioned directly above Setlərimiz with Yellow Border & Search Logo */}
        <div className="w-full max-w-xl">
          <div className="relative w-full">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 stroke-[2.5]" />
            <input
              type="text"
              placeholder="Menyuda istədiyiniz təamı axtarın (məsələn: Burger, Pitsa, Dönər)..."
              value={searchQuery || ''}
              onChange={(e) => onSearch && onSearch(e.target.value)}
              className="w-full pl-11 pr-20 py-3 sm:py-3.5 rounded-2xl bg-black/90 border-2 border-amber-400 focus:border-amber-300 hover:border-yellow-300 text-white placeholder-zinc-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/40 transition-all shadow-xl font-medium"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => onSearch && onSearch('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-amber-400/20 text-amber-400 hover:text-white hover:bg-amber-400/40 text-xs font-bold transition-all"
              >
                Təmizlə
              </button>
            ) : (
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/30 pointer-events-none">
                Axtar
              </span>
            )}
          </div>
        </div>

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
                  <div className="absolute bottom-2 right-2 z-10 flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-black text-white border border-amber-400 font-extrabold text-[10px] sm:text-[11px] shadow-md group-hover:bg-amber-400 group-hover:text-black transition-colors">
                    <span>Baxın</span>
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
        
        {/* 1. 9 MAIN FOOD CATEGORY CARDS */}
        <div className="space-y-6">
          <div className="space-y-1 text-left">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-white tracking-tight whitespace-nowrap">
              Populyar <span className="text-amber-400">Yemək Kateqoriyalarımız</span>
            </h2>
            <p className="text-emerald-200/80 text-xs sm:text-sm">
              Kateqoriyaya klikləyərək fərdi menyumuza keçid edin Və sifariş verin.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => onSelectCategory && onSelectCategory(cat.id as CategoryId)}
                className="group flex flex-col transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
              >
                {/* Photo Frame Box - Height reduced by ~2x */}
                <div className="relative h-36 sm:h-44 md:h-48 overflow-hidden rounded-2xl border border-emerald-800/80 group-hover:border-amber-400 bg-black shadow-xl transition-colors duration-300">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />

                  {/* Badge & Action Indicator */}
                  <div className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-black text-white border border-amber-400 font-extrabold text-[10px] sm:text-xs shadow-md group-hover:bg-amber-400 group-hover:text-black transition-colors">
                    <span>Baxın</span>
                    <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
                  </div>
                </div>

                {/* Text directly under the photo frame */}
                <div className="mt-2.5 px-1 space-y-0.5 text-left">
                  <h3 className="text-sm sm:text-base font-black text-white group-hover:text-amber-400 transition-colors flex items-center gap-1.5 line-clamp-1">
                    <span>
                      {cat.name.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu, '').trim()}
                    </span>
                  </h3>
                  {cat.description && (
                    <p className="text-xs font-medium text-emerald-200/80 line-clamp-1">
                      {cat.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. ŞİRİN TƏAMLARIMIZ / GALLERY */}
        <div className="space-y-6 pt-6 border-t border-emerald-900/80">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Şirin <span className="text-emerald-300">təamlarımız</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {galleryPhotos.slice(0, 3).map((photo) => {
              const titleLower = photo.title.toLowerCase();
              const targetCategory: CategoryId = titleLower.includes('kofe')
                ? 'kofe'
                : titleLower.includes('kokteyl')
                ? 'kokteyl'
                : titleLower.includes('desert')
                ? 'desertler'
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
                    <div className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black text-white border border-amber-400 font-extrabold text-[11px] shadow-md group-hover:bg-amber-400 group-hover:text-black transition-colors">
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

