import React, { useState, useRef, useEffect } from 'react';
import { CategoryCard, GalleryPhoto, CategoryId, HeroConfig } from '../types';
import { ChevronRight, ChevronLeft, Coffee, Pizza, Flame, Pencil } from 'lucide-react';
import { DessertLayerIcon } from './DessertLayerIcon';
import { Hero } from './Hero';
import { DEFAULT_CATEGORIES, formatAzTitle } from '../lib/cmsStore';
import { DEFAULT_CATEGORY_SLIDES } from './MenuSection';
import { formatImageUrl } from '../lib/imageUtils';
import { isCategoryTemporarilyHidden } from '../lib/hiddenCategories';

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

export interface SpecialSetItem {
  id: string;
  name: string;
  categoryId: CategoryId;
  description: string;
  image: string;
  price?: string;
  oldPrice?: string;
}

export const SPECIAL_SETS_LIST: SpecialSetItem[] = [
  {
    id: 'set-1',
    name: 'Dost Məclisi Seti',
    categoryId: 'pizza',
    description: '',
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786351502/ChatGPT_Image_9_A%C4%9Fu_2026_22_36_26_stqwzb.png',
  },
  {
    id: 'set-2',
    name: 'Xüsusi Endirimlər - Çay və Cheesecake',
    categoryId: 'desertler',
    description: '',
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786351531/ChatGPT_Image_9_A%C4%9Fu_2026_22_38_57_eqlnia.png',
  },
  {
    id: 'set-3',
    name: 'Ailəvi Şaurma Seti',
    categoryId: 'isti_yemekler',
    description: '',
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786351544/ChatGPT_Image_9_A%C4%9Fu_2026_22_25_23_zcqmky.png',
  },
  {
    id: 'set-4',
    name: 'Nira Set',
    categoryId: 'fastfood',
    description: '',
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786351562/ChatGPT_Image_9_A%C4%9Fu_2026_22_31_14_gv7uqw.png',
  },
  {
    id: 'set-5',
    name: 'Nira Delight Set',
    categoryId: 'fastfood',
    description: '',
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786351549/ChatGPT_Image_9_A%C4%9Fu_2026_22_43_18_uhon89.png',
  },
  {
    id: 'set-6',
    name: 'Ailə Süfrəsi Premium Set',
    categoryId: 'isti_yemekler',
    description: '',
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786351517/ChatGPT_Image_9_A%C4%9Fu_2026_22_34_33_rltry0.png',
  },
  {
    id: 'set-7',
    name: 'Nagets Kampaniyası',
    categoryId: 'fastfood',
    description: '',
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786351551/ChatGPT_Image_9_A%C4%9Fu_2026_22_41_31_shl1sk.png',
  }
];

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
    ].filter(sub => !isCategoryTemporarilyHidden(sub.id))
  },
  {
    id: 'festfood',
    name: 'Fest & Food',
    icon: Pizza,
    subCategories: [
      { id: 'fastfood' as CategoryId, label: 'Burger və Nugget' },
      { id: 'pizza' as CategoryId, label: 'Pizza' },
      { id: 'pide' as CategoryId, label: 'Pide' },
    ].filter(sub => !isCategoryTemporarilyHidden(sub.id))
  },
  {
    id: 'ickiler',
    name: 'İçkilər',
    icon: Coffee,
    subCategories: [
      { id: 'icikil' as CategoryId, label: 'Soyuq İçkilər' },
      { id: 'kofe' as CategoryId, label: 'Kofe' },
      { id: 'kokteyl' as CategoryId, label: 'Kokteyl' },
    ].filter(sub => !isCategoryTemporarilyHidden(sub.id))
  },
  {
    id: 'desertler_group',
    name: 'Desertlər',
    icon: DessertLayerIcon,
    subCategories: [
      { id: 'desertler' as CategoryId, label: 'Desertlər' },
    ].filter(sub => !isCategoryTemporarilyHidden(sub.id))
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
      const allowedIds = ['kabablar', 'sorbalar', 'isti_yemekler', 'qelyanaltilar', 'cig_kofte', 'salat']
        .filter(id => !isCategoryTemporarilyHidden(id));
      const result: CategoryCard[] = [];
      allowedIds.forEach(id => {
        const found = sourceList.find(c => c.id === id) || DEFAULT_CATEGORIES.find(dc => dc.id === id);
        if (found) result.push(found);
      });
      return result;
    }

    if (activeGroup.id === 'festfood') {
      const allowedIds = ['fastfood', 'pizza', 'pide'].filter(id => !isCategoryTemporarilyHidden(id));
      const result: CategoryCard[] = [];
      allowedIds.forEach(id => {
        const found = sourceList.find(c => c.id === id) || DEFAULT_CATEGORIES.find(dc => dc.id === id);
        if (found) result.push(found);
      });
      return result;
    }

    if (activeGroup.id === 'ickiler') {
      const allowedIds = ['icikil', 'kofe', 'kokteyl'].filter(id => !isCategoryTemporarilyHidden(id));
      const result: CategoryCard[] = [];
      allowedIds.forEach(id => {
        const found = sourceList.find(c => c.id === id) || DEFAULT_CATEGORIES.find(dc => dc.id === id);
        if (found) result.push(found);
      });
      return result;
    }

    if (activeGroup.id === 'desertler_group') {
      if (isCategoryTemporarilyHidden('desertler')) return [];
      const found = sourceList.find(c => c.id === 'desertler') || DEFAULT_CATEGORIES.find(dc => dc.id === 'desertler');
      return found ? [found] : [];
    }

    const activeSubCatIds = activeGroup.subCategories.map(sc => sc.id);
    return sourceList.filter(c => activeSubCatIds.includes(c.id as CategoryId) && !isCategoryTemporarilyHidden(c.id));
  }, [categories, activeGroup]);

  // Interactive Smooth Continuous Slider for 7 Special Sets
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const isMouseDownRef = useRef(false);
  const isTouchDraggingRef = useRef(false);
  const touchDirectionRef = useRef<'horizontal' | 'vertical' | null>(null);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const touchStartScrollLeftRef = useRef(0);
  const isSwipingRef = useRef(false);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    // Center the initial scroll position so scrolling left or right works seamlessly
    const singleLoopWidth = el.scrollWidth / 3;
    if (el.scrollLeft === 0 && singleLoopWidth > 0) {
      el.scrollLeft = singleLoopWidth;
    }

    let reqId: number;
    const step = () => {
      if (el && !isMouseDownRef.current && !isTouchDraggingRef.current) {
        // Soldan sağa fasiləsiz axış: scrollLeft azalır
        el.scrollLeft -= 0.65;

        const loopWidth = el.scrollWidth / 3;
        if (loopWidth > 0) {
          if (el.scrollLeft <= 5) {
            el.scrollLeft += loopWidth;
          } else if (el.scrollLeft >= loopWidth * 2) {
            el.scrollLeft -= loopWidth;
          }
        }
      }
      reqId = requestAnimationFrame(step);
    };

    reqId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(reqId);
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
      if (sliderRef.current) {
        touchStartScrollLeftRef.current = sliderRef.current.scrollLeft;
      }
      isTouchDraggingRef.current = false;
      touchDirectionRef.current = null;
      isSwipingRef.current = false;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0 && sliderRef.current) {
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const deltaX = currentX - touchStartXRef.current;
      const deltaY = currentY - touchStartYRef.current;
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      if (!touchDirectionRef.current) {
        if (absDeltaX > 5 && absDeltaX > absDeltaY) {
          touchDirectionRef.current = 'horizontal';
          isTouchDraggingRef.current = true;
          isSwipingRef.current = true;
        } else if (absDeltaY > 5) {
          touchDirectionRef.current = 'vertical';
          isTouchDraggingRef.current = false;
          isSwipingRef.current = true;
        }
      }

      if (touchDirectionRef.current === 'horizontal') {
        isTouchDraggingRef.current = true;
        isSwipingRef.current = true;
        const newScrollLeft = touchStartScrollLeftRef.current - deltaX * 1.25;
        sliderRef.current.scrollLeft = newScrollLeft;

        // Loop bounds safety during finger dragging
        const loopWidth = sliderRef.current.scrollWidth / 3;
        if (loopWidth > 0) {
          if (sliderRef.current.scrollLeft <= 5) {
            sliderRef.current.scrollLeft += loopWidth;
            touchStartScrollLeftRef.current += loopWidth;
          } else if (sliderRef.current.scrollLeft >= loopWidth * 2) {
            sliderRef.current.scrollLeft -= loopWidth;
            touchStartScrollLeftRef.current -= loopWidth;
          }
        }
      }
    }
  };

  const handleTouchEnd = () => {
    isTouchDraggingRef.current = false;
    touchDirectionRef.current = null;
    setTimeout(() => {
      isSwipingRef.current = false;
    }, 150);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = sliderRef.current;
    if (!el) return;
    setIsMouseDown(true);
    isMouseDownRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    startScrollLeftRef.current = el.scrollLeft;
    isSwipingRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDownRef.current) return;
    const el = sliderRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 5) {
      isSwipingRef.current = true;
    }
    el.scrollLeft = startScrollLeftRef.current - walk;

    const loopWidth = el.scrollWidth / 3;
    if (loopWidth > 0) {
      if (el.scrollLeft <= 5) {
        el.scrollLeft += loopWidth;
        startScrollLeftRef.current += loopWidth;
      } else if (el.scrollLeft >= loopWidth * 2) {
        el.scrollLeft -= loopWidth;
        startScrollLeftRef.current -= loopWidth;
      }
    }
  };

  const handleMouseUpOrLeave = () => {
    if (isMouseDownRef.current) {
      setIsMouseDown(false);
      isMouseDownRef.current = false;
      setTimeout(() => {
        isSwipingRef.current = false;
      }, 150);
    }
  };

  const scrollByAmount = (amount: number) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

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
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-zinc-100 via-amber-50/50 to-zinc-200 shadow-md flex items-center justify-center">
          <img
            src={formatImageUrl(cat.image || (DEFAULT_CATEGORY_SLIDES[cat.id]?.[0])) || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600'}
            alt={cat.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="eager"
            decoding="async"
            // @ts-ignore
            fetchPriority="high"
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

  const renderSpecialSetCard = (set: SpecialSetItem, index: number) => {
    return (
      <div
        key={`${set.id}-${index}`}
        onClick={() => {
          if (isSwipingRef.current) return;
          if (onSelectSet) {
            onSelectSet({
              id: set.id,
              title: set.name,
              categoryId: set.categoryId,
              description: set.description,
              imageUrl: set.image
            });
          } else if (onSelectCategory) {
            onSelectCategory(set.categoryId);
          }
        }}
        className="group relative flex flex-col bg-white rounded-xl sm:rounded-2xl p-1 sm:p-1.5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 shrink-0 w-[180px] sm:w-[210px] md:w-[230px] cursor-pointer"
      >
        {/* Photo Frame Box - Shrunk 1.5x with 16:9 banner aspect ratio */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg sm:rounded-xl bg-gradient-to-br from-zinc-100 via-amber-50/50 to-zinc-200 shadow-xs flex items-center justify-center">
          <img
            src={formatImageUrl(set.image)}
            alt={set.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-30 group-hover:opacity-0 transition-opacity pointer-events-none" />

          {/* Badge & Action Indicator */}
          <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 z-20 flex items-center gap-0.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg bg-white text-black font-black text-[10px] sm:text-[11px] shadow-sm group-hover:bg-amber-400 transition-colors pointer-events-none">
            <span className="text-black font-black">Baxın</span>
            <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3] text-black" />
          </div>
        </div>

        {/* Text directly under photo frame (Only title, no subtitle text or price) */}
        <div className="mt-1.5 sm:mt-2 px-1 pb-0.5 text-left pointer-events-none">
          <h3 className="text-xs sm:text-sm font-black text-black group-hover:text-emerald-800 transition-colors line-clamp-1">
            <span className="text-black font-black tracking-tight">{set.name}</span>
          </h3>
        </div>
      </div>
    );
  };

  return (
    <section id="categories" className="py-8 sm:py-16 bg-white border-b border-zinc-200">
      {/* All Categories Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
        
        {/* Section Title & Heading */}
        <div className="space-y-1.5 text-center">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-zinc-900 tracking-tight">
            Menyu <span className="text-emerald-800">Bölmələrinə Daxil Olun</span>
          </h2>
          <p className="text-zinc-950 font-black text-xs sm:text-base md:text-lg tracking-wider uppercase">
            -SETLERİMİZ VƏ XÜSUSİ ENDİRİMLƏR-
          </p>
        </div>

        {/* 7 Special Sets Single-Row Continuous Left-to-Right Scrolling Slider with Touch & Drag */}
        <div className="relative w-full group/slider py-1">
          {/* Left Arrow button (visible on hover / desktop) */}
          <button
            type="button"
            onClick={() => scrollByAmount(-240)}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-white/95 shadow-md border border-zinc-200 text-zinc-800 flex items-center justify-center hover:bg-emerald-800 hover:text-white transition-all opacity-80 hover:opacity-100 cursor-pointer hidden sm:flex active:scale-95"
            aria-label="Əvvəlki"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Right Arrow button (visible on hover / desktop) */}
          <button
            type="button"
            onClick={() => scrollByAmount(240)}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-white/95 shadow-md border border-zinc-200 text-zinc-800 flex items-center justify-center hover:bg-emerald-800 hover:text-white transition-all opacity-80 hover:opacity-100 cursor-pointer hidden sm:flex active:scale-95"
            aria-label="Növbəti"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Interactive Touch and Drag Scroll Container - touch-pan-y enables native smooth vertical page scrolling */}
          <div
            ref={sliderRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className={`flex items-center gap-3 sm:gap-4 overflow-x-auto select-none py-2 px-1 scrollbar-none touch-pan-y ${
              isMouseDown ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{
              touchAction: 'pan-y',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {SPECIAL_SETS_LIST.concat(SPECIAL_SETS_LIST).concat(SPECIAL_SETS_LIST).map((set, idx) =>
              renderSpecialSetCard(set, idx)
            )}
          </div>
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

          {/* 4 Main Group Buttons without numbers (Centered & Tight Spacing) */}
          <div className="flex items-center justify-center flex-wrap gap-1.5 sm:gap-2">
            {CATEGORY_GROUPS.map((group) => {
              const isActive = selectedGroupId === group.id;
              const IconComp = group.icon;

              return (
                <button
                  type="button"
                  key={group.id}
                  onClick={() => setSelectedGroupId(group.id)}
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
        {displayedCategories.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8">
            {displayedCategories.map(renderCategoryCard)}
          </div>
        )}
      </div>

      {/* Middle Hero Slider Banner - FULL SCREEN WIDTH EDGE-TO-EDGE */}
      <div id="middle-hero-section" className="mt-10 sm:mt-16 w-full overflow-hidden">
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

