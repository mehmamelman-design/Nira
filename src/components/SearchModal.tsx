import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ShieldCheck, Sparkles, ChevronRight } from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { isItemInHiddenCategory } from '../lib/hiddenCategories';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems?: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  menuItems = MENU_ITEMS,
  onSelectItem,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const items = menuItems && menuItems.length > 0 ? menuItems : MENU_ITEMS;

  const results = query.trim() === '' 
    ? [] 
    : items.filter((item) => {
        if (isItemInHiddenCategory(item)) return false;
        const q = query.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          (item.description && item.description.toLowerCase().includes(q))
        );
      }).slice(0, 8);

  const getCategoryName = (cat: string) => {
    switch (cat) {
      case 'fastfood': return 'Burger və Nugget';
      case 'pizza': return 'Pizzalar';
      case 'pide': return 'Pidelər';
      case 'kabablar': return 'Kabablar';
      case 'isti_yemekler': return 'İsti Yeməklər';
      case 'icikil':
      case 'ickiler': return 'Soyuq İçkilər';
      case 'sorbalar': return 'Şorbalar';
      case 'salat': return 'Salatlar';
      case 'cig_kofte': return 'Çiy Köftə';
      case 'qelyanaltilar': return 'Qəlyanaltılar';
      case 'desertler': return 'Desertlər';
      case 'kofe': return 'Kofe';
      case 'kokteyl': return 'Kokteyllər';
      default: return cat.toUpperCase();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start sm:items-start justify-center p-0 sm:p-3 sm:pt-24 animate-fadeIn">
      <div 
        className="w-full h-full sm:h-auto sm:max-h-[80vh] max-w-none sm:max-w-xl bg-white sm:rounded-2xl shadow-2xl border-0 sm:border border-zinc-200 overflow-hidden flex flex-col text-zinc-900 animate-in slide-in-from-top-4 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="p-3 sm:p-4 border-b border-zinc-200 flex items-center gap-3 bg-zinc-50 sticky top-0 z-10 shadow-xs">
          <Search className="w-5 h-5 text-emerald-700 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Axtarış edin: Burger, Paxlava, Cola..."
            className="w-full bg-transparent text-sm sm:text-base font-bold text-zinc-900 placeholder-zinc-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200 text-xs font-bold shrink-0"
            >
              Təmizlə
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-zinc-200 text-zinc-800 hover:bg-zinc-300 transition-colors cursor-pointer shrink-0"
            aria-label="Bağla"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Search Results Body */}
        <div className="overflow-y-auto p-2 sm:p-3 divide-y divide-zinc-100 flex-1">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-zinc-400 text-xs sm:text-sm font-medium">
              <p>Yemək və ya içki adını daxil edin...</p>
              <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                {['Burger', 'Paxlava', 'Cola', 'Pizza', 'Kabab', 'Şorba', 'Kofe'].map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => setQuery(sample)}
                    className="px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-emerald-50 text-zinc-700 hover:text-emerald-800 text-xs font-semibold border border-zinc-200 transition-colors cursor-pointer"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-10 text-center text-zinc-500 text-xs sm:text-sm font-medium">
              <p className="font-bold text-zinc-800">"{query}" üzrə heç nə tapılmadı</p>
              <p className="text-zinc-400 text-xs mt-1">Düzgün yazılışı yoxlayın və ya başqa sözlə axtarın.</p>
            </div>
          ) : (
            results.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelectItem(item);
                  onClose();
                }}
                className="w-full p-2.5 rounded-xl hover:bg-emerald-50/80 transition-colors flex items-center justify-between gap-3 text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover bg-zinc-100 shrink-0 border border-zinc-200"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs sm:text-sm font-black text-zinc-900 group-hover:text-emerald-800 truncate">
                        {item.name}
                      </h4>
                      {item.isHalal !== false && (
                        <span className="px-1 py-0.2 rounded text-[9px] font-extrabold bg-emerald-100 text-emerald-800 shrink-0">
                          Halal
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider block">
                      {getCategoryName(item.category)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs sm:text-sm font-black text-emerald-800">
                    {item.price.toFixed(2)} ₼
                  </span>
                  <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all" />
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
