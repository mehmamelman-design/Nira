import React from 'react';
import { Flame, Phone, MapPin, Instagram, MessageCircle, Clock, Heart } from 'lucide-react';
import { useSiteConfig } from '../lib/cmsStore';
import { CategoryId } from '../types';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onSelectCategory?: (categoryId: CategoryId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectCategory }) => {
  const { siteConfig } = useSiteConfig();
  const logoUrl = siteConfig?.logoUrl || 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786350661/Ba%C5%9Fl%C4%B1qs%C4%B1z_dizayn-Photoroom_1_l3cpaz.png';

  const menuCategories: { id: CategoryId; name: string }[] = [
    { id: 'fastfood', name: 'Burger və Nugget' },
    { id: 'pizza', name: 'Pizza' },
    { id: 'kabablar', name: 'Kabablar' },
    { id: 'isti_yemekler', name: 'İsti yeməklər' },
    { id: 'icikil', name: 'Soyuq içkilər' },
    { id: 'sorbalar', name: 'Şorbalar' },
    { id: 'salat', name: 'Salat' },
    { id: 'cig_kofte', name: 'Çiy köftə' },
    { id: 'qelyanaltilar', name: 'Qəlyanaltılar' },
  ];

  const handleCategoryClick = (catId: CategoryId) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    } else {
      onNavigate('menu');
    }
  };

  return (
    <footer className="bg-white border-t border-zinc-200 text-zinc-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Logo & About Slogan */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => onNavigate('hero')}
                className="flex items-center focus:outline-none cursor-pointer group"
                aria-label="Ana Səhifə"
              >
                <img
                  src={logoUrl}
                  alt={siteConfig?.siteName || "NIRA Logo"}
                  className="h-16 w-auto object-contain max-w-[220px] group-hover:scale-105 transition-transform duration-300"
                />
              </button>
            </div>

            <p className="text-xs text-zinc-700 font-medium leading-relaxed max-w-sm">
              Təzə fast food, ləzzətli pizzalar, kabablar, isti yemeklər, şorbalar və sərin içkilər. Əsl keyfiyyət və sürətli çatdırılma!
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-950 font-bold">
              <Clock className="w-4 h-4 text-emerald-700" />
              <span>İş Saatları: Hər gün 10:00 - 02:00</span>
            </div>
          </div>

          {/* Quick Links to Menu Sections */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-950">
              Menyu Bölmələri
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              {menuCategories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryClick(cat.id)}
                    className="hover:text-emerald-700 transition-colors cursor-pointer text-left uppercase text-zinc-700 hover:text-emerald-900"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Navigation Sections */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-950">
              Sürətli Səhifələr
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-zinc-700">
              <li>
                <button onClick={() => onNavigate('hero')} className="hover:text-emerald-900 transition-colors">
                  Ana Səhifə
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('menu')} className="hover:text-emerald-900 transition-colors">
                  Tam Menyu
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reviews')} className="hover:text-emerald-900 transition-colors">
                  Rəylər Və Reyting
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-emerald-900 transition-colors">
                  Ünvan Və Əlaqə
                </button>
              </li>
            </ul>
          </div>

          {/* Social Media & Direct Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-950">
              Bizimlə Əlaqədə Olun
            </h4>

            <p className="text-xs text-zinc-700 font-medium">
              Sosial şəbəkələrdə bizi izləyin və xüsusi endirimlərdən xəbərdar olun:
            </p>

            <div className="flex items-center gap-3 pt-1">
              
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white border border-emerald-300 flex items-center justify-center text-emerald-900 hover:bg-emerald-100 transition-all shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-emerald-800" />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/994516359474"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white border border-emerald-300 flex items-center justify-center text-emerald-900 hover:bg-emerald-100 transition-all shadow-sm"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5 text-emerald-800" />
              </a>

              {/* TikTok Icon */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white border border-emerald-300 flex items-center justify-center text-emerald-900 hover:bg-emerald-100 transition-all font-bold text-xs shadow-sm"
                aria-label="TikTok"
              >
                TikTok
              </a>

            </div>

            <div className="pt-2 text-xs text-zinc-700 font-semibold space-y-1">
              <p>Heydər Əliyev prospekti 48a (Neptun Supermarket-1 qarşısı)</p>
              <p className="font-extrabold text-emerald-950 text-sm">(051) 635 94 74</p>
            </div>

          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-emerald-200 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-600 font-semibold gap-4">
          <p>© {new Date().getFullYear()} Bütün hüquqlar qorunur.</p>
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-900">
            <span>Sevgi və ləzzətlə hazırlandı</span>
            <Flame className="w-3.5 h-3.5 text-emerald-700 fill-emerald-600 inline" />
          </div>
        </div>

      </div>
    </footer>
  );
};
