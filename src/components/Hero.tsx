import React from 'react';
import { Flame, ArrowRight, Sparkles, Pencil } from 'lucide-react';
import { HeroConfig } from '../types';

interface HeroProps {
  heroConfig?: HeroConfig;
  onOrderNow: () => void;
  onOpenReviews: () => void;
  onOpenAiAssistant: () => void;
  isAdmin?: boolean;
  onEditHero?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  heroConfig,
  onOrderNow,
  onOpenReviews,
  onOpenAiAssistant,
  isAdmin,
  onEditHero,
}) => {
  const title = heroConfig?.title || "Qaynar İsti Ocaqdan Qapınıza Çatdırılan Ən Ləzzətli Fast Food";
  const subtitle = heroConfig?.subtitle || "Təzə kəsilmiş halal ət, isti ocağın əvəzolunmaz qoxusu və xüsusi reseptlə hazırlanan çıtır qızarmış toyuqlar. Sifarişiniz xüsusi termo-qutularda 30 dəqiqəyə qaynar halda çatdırılır!";
  const imageUrl = heroConfig?.imageUrl || "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=1600";
  const isVideoEnabled = heroConfig?.isVideoEnabled ?? false;
  const videoUrl = heroConfig?.videoUrl || "https://assets.mixkit.co/videos/preview/mixkit-chef-cooking-food-in-a-pan-40292-large.mp4";

  return (
    <section className="relative bg-zinc-950 overflow-hidden border-b border-zinc-800/80 min-h-[380px] flex items-center">
      
      {/* Background Video or Image with Natural Colors (No Green Overlay) */}
      <div className="absolute inset-0 z-0">
        {isVideoEnabled && videoUrl ? (
          <video
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center opacity-85 scale-105"
          />
        ) : (
          <img
            src={imageUrl || "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&q=80&w=1600"}
            alt="Alov Fast Food"
            className="w-full h-full object-cover object-center opacity-90 scale-105"
          />
        )}
        {/* Neutral Dark Gradient Overlays for optimal text contrast without green tint */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8 pb-8 sm:pt-12 sm:pb-12 w-full">
        <div className="max-w-2xl text-left space-y-6">
          
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.2] text-left">
            {title}
          </h1>

          {/* Description Text */}
          <p className="text-white text-sm sm:text-base lg:text-lg font-normal leading-relaxed text-left">
            {subtitle}
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 pt-1">
            
            {/* Primary Order & Menu Button */}
            <button
              onClick={onOrderNow}
              className="px-4 py-2.5 rounded-xl bg-black hover:bg-zinc-900 border border-emerald-800/80 hover:border-emerald-500/50 text-white font-bold text-xs sm:text-sm transition-all duration-200 shadow-md flex items-center justify-start gap-2 group cursor-pointer whitespace-nowrap"
            >
              <Flame className="w-3.5 h-3.5 fill-white text-white group-hover:scale-110 transition-transform shrink-0" />
              <span className="text-white">Sifariş Et və Menyu</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-300 group-hover:translate-x-1 transition-transform shrink-0" />
            </button>

            {/* AI Assistant Button */}
            <button
              onClick={onOpenAiAssistant}
              className="px-4 py-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/90 border border-emerald-700/80 text-white font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-start gap-2 cursor-pointer whitespace-nowrap shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-300 fill-emerald-300/30 shrink-0" />
              <span className="text-white">Nə Yeyim? (AI Asistent)</span>
            </button>

            {/* Admin Quick Edit Hero Button */}
            {isAdmin && (
              <button
                type="button"
                onClick={onEditHero}
                className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-black font-black text-xs sm:text-sm flex items-center justify-start gap-2 cursor-pointer whitespace-nowrap shadow-xl transition-all border-2 border-amber-300"
              >
                <Pencil className="w-4 h-4 stroke-[2.5]" />
                <span>+ Hero Redaktə Et (Şəkil & Mətn)</span>
              </button>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};


