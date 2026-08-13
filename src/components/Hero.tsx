import React, { useState, useEffect, useRef } from 'react';
import { Flame, ArrowRight, Sparkles, Pencil } from 'lucide-react';
import { HeroConfig } from '../types';
import { formatImageUrl } from '../lib/imageUtils';

interface HeroProps {
  heroConfig?: HeroConfig;
  onOrderNow: () => void;
  onOpenReviews: () => void;
  onOpenAiAssistant: () => void;
  isAdmin?: boolean;
  onEditHero?: (slideIndex?: number) => void;
  isMiddleHero?: boolean;
}

const DEFAULT_SLIDES = [
  "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=1600"
];

export const Hero: React.FC<HeroProps> = ({
  heroConfig,
  onOrderNow,
  onOpenReviews,
  onOpenAiAssistant,
  isAdmin,
  onEditHero,
  isMiddleHero = false,
}) => {
  const title = heroConfig?.title || "Qaynar İsti Ocaqdan Qapınıza Çatdırılan Ən Ləzzətli Fast Food";
  const subtitle = heroConfig?.subtitle || "Təzə kəsilmiş halal ət, isti ocağın əvəzolunmaz qoxusu və xüsusi reseptlə hazırlanan çıtır qızarmış toyuqlar. Sifarişiniz xüsusi termo-qutularda 30 dəqiqəyə qaynar halda çatdırılır!";
  const isVideoEnabled = heroConfig?.isVideoEnabled ?? false;
  const videoUrl = heroConfig?.videoUrl || "https://assets.mixkit.co/videos/preview/mixkit-chef-cooking-food-in-a-pan-40292-large.mp4";

  // Build desktop slide images array (dynamic slide count support)
  const desktopSlideImages: string[] = React.useMemo(() => {
    const userImgs = heroConfig?.images || [];
    if (userImgs.length > 0) {
      const formatted = userImgs
        .map((img, i) => {
          const raw = img ? img.trim() : '';
          if (raw) return formatImageUrl(raw);
          return DEFAULT_SLIDES[i % DEFAULT_SLIDES.length] || '';
        })
        .filter(Boolean);
      if (formatted.length > 0) return formatted;
    }
    if (heroConfig?.imageUrl && heroConfig.imageUrl.trim()) {
      return [formatImageUrl(heroConfig.imageUrl.trim())];
    }
    return DEFAULT_SLIDES;
  }, [heroConfig?.images, heroConfig?.imageUrl]);

  // Build mobile slide images array (if specified, otherwise fallback to desktop image)
  const mobileSlideImages: string[] = React.useMemo(() => {
    const userMobileImgs = heroConfig?.mobileImages || [];
    return desktopSlideImages.map((desktopImg, i) => {
      const rawUrl = userMobileImgs[i] !== undefined && userMobileImgs[i] !== null ? userMobileImgs[i].trim() : '';
      if (rawUrl) {
        return formatImageUrl(rawUrl) || desktopImg;
      }
      return desktopImg;
    });
  }, [heroConfig?.mobileImages, desktopSlideImages]);

  const slideImages = desktopSlideImages;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-play interval every 3.5 seconds
  useEffect(() => {
    if (isVideoEnabled || isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [slideImages.length, isPaused, isVideoEnabled]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swiped left -> next slide
        setCurrentSlide((prev) => (prev + 1) % slideImages.length);
      } else {
        // Swiped right -> prev slide
        setCurrentSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length);
      }
    }
    touchStartX.current = null;
  };

  return (
    <section 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative overflow-hidden w-full group select-none ${
        isMiddleHero
          ? 'bg-zinc-950 aspect-[16/9] sm:aspect-[21/9] sm:max-h-[520px] lg:max-h-[620px] flex items-center justify-center transition-all duration-300'
          : 'bg-zinc-950 aspect-[16/9] sm:aspect-[21/9] sm:min-h-[480px] md:min-h-[620px] lg:min-h-[720px] flex items-center justify-center'
      }`}
    >
      
      {/* Background Video or Slider Images (Original bright colors, high resolution, 100% full uncropped view) */}
      <div className="absolute inset-0 z-0">
        {isVideoEnabled && videoUrl ? (
          <video
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center opacity-100"
          />
        ) : (
          desktopSlideImages.map((desktopImg, index) => {
            const mobileImg = mobileSlideImages[index] || desktopImg;
            return (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                {/* Desktop Image */}
                <img
                  src={desktopImg}
                  alt={`Alov Fast Food Slide ${index + 1} Desktop`}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.includes('drive.google.com/thumbnail')) {
                      const matchId = target.src.match(/[?&]id=([a-zA-Z0-9_-]+)/);
                      if (matchId && matchId[1] && !target.getAttribute('data-tried-lh3')) {
                        target.setAttribute('data-tried-lh3', 'true');
                        target.src = `https://lh3.googleusercontent.com/d/${matchId[1]}=w4000`;
                        return;
                      }
                    }
                    if (target.src !== DEFAULT_SLIDES[index % DEFAULT_SLIDES.length]) {
                      target.src = DEFAULT_SLIDES[index % DEFAULT_SLIDES.length];
                    }
                  }}
                  className="hidden sm:block w-full h-full object-cover object-center"
                />

                {/* Mobile Image */}
                <img
                  src={mobileImg}
                  alt={`Alov Fast Food Slide ${index + 1} Mobile`}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.includes('drive.google.com/thumbnail')) {
                      const matchId = target.src.match(/[?&]id=([a-zA-Z0-9_-]+)/);
                      if (matchId && matchId[1] && !target.getAttribute('data-tried-lh3')) {
                        target.setAttribute('data-tried-lh3', 'true');
                        target.src = `https://lh3.googleusercontent.com/d/${matchId[1]}=w4000`;
                        return;
                      }
                    }
                    if (target.src !== DEFAULT_SLIDES[index % DEFAULT_SLIDES.length]) {
                      target.src = DEFAULT_SLIDES[index % DEFAULT_SLIDES.length];
                    }
                  }}
                  className="block sm:hidden w-full h-full object-cover object-center"
                />
              </div>
            );
          })
        )}
      </div>

      {/* Admin Quick Edit Hero Button (Positioned cleanly at top-right if logged in as Admin) */}
      {isAdmin && (
        <div className="absolute top-4 right-4 z-30">
          <button
            type="button"
            onClick={() => onEditHero?.(currentSlide)}
            className="px-3.5 py-2 rounded-xl bg-black/80 hover:bg-black text-amber-400 font-black text-xs flex items-center gap-2 cursor-pointer shadow-xl border border-amber-400/80 backdrop-blur-md"
          >
            <Pencil className="w-4 h-4 stroke-[2.5]" />
            <span>+ Hero Redaktə Et</span>
          </button>
        </div>
      )}

      {/* Slider Navigation Dots (4 dots) at the bottom center */}
      {!isVideoEnabled && slideImages.length > 1 && (
        <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 z-30 flex items-center justify-center gap-1 sm:gap-2">
          {slideImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-1 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlide
                  ? 'w-3.5 sm:w-7 bg-white shadow-lg'
                  : 'w-1 sm:w-2.5 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}

    </section>
  );
};
