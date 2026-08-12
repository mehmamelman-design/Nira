import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  imageUrlsToPreload?: string[];
  onFinish?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  imageUrlsToPreload = [],
  onFinish,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Lock background page scroll while Preloader is active
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Fast-preload key image URLs in the browser cache
    if (imageUrlsToPreload && imageUrlsToPreload.length > 0) {
      imageUrlsToPreload.forEach((url) => {
        if (url) {
          const img = new Image();
          img.src = url;
        }
      });
    }

    // Trigger smooth fade out at 4.3s (so total splash display is exactly 5 seconds)
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 4300);

    // Remove from DOM completely at 5.0s and unlock body scroll
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (onFinish) onFinish();
    }, 5000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
      // Restore scrolling on cleanup
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [imageUrlsToPreload, onFinish]);

  if (!isVisible) return null;

  return (
    <div
      onTouchMove={(e) => e.preventDefault()}
      onWheel={(e) => e.preventDefault()}
      className={`fixed inset-0 z-[99999] bg-white flex flex-col items-center justify-center p-6 text-center select-none touch-none overscroll-none transition-opacity duration-700 ease-in-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center justify-center space-y-4 max-w-md mx-auto my-auto text-center transform transition-all duration-500 scale-100">
        {/* Main Title: Nira */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-[#005e33] tracking-tight uppercase font-serif drop-shadow-sm leading-none">
          Nira
        </h1>

        {/* Subtitle: Fest&Food Restoranı */}
        <p className="text-xl sm:text-2xl md:text-3xl font-black text-amber-500 uppercase tracking-[0.2em] sm:tracking-[0.25em]">
          Fest&Food Restoranı
        </p>

        {/* Smooth Loader Bar */}
        <div className="w-48 sm:w-64 h-1.5 bg-zinc-100 rounded-full overflow-hidden mt-6 border border-zinc-200/80 shadow-inner">
          <div className="h-full bg-gradient-to-r from-emerald-600 via-amber-400 to-emerald-600 rounded-full w-full animate-pulse" />
        </div>

        <p className="text-xs font-bold text-zinc-400 tracking-wider mt-1">
          Ləzzətli menyu yüklənir...
        </p>
      </div>
    </div>
  );
};
