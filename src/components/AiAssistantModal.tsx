import React, { useState } from 'react';
import { Sparkles, X, Flame, Check, RefreshCw, ShoppingBag } from 'lucide-react';
import { MENU_ITEMS } from '../data/menuData';
import { MenuItem } from '../types';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem, option?: string) => void;
  onGoToMenu: () => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  onGoToMenu,
}) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isSpicyOk, setIsSpicyOk] = useState<boolean | null>(null);
  const [recommendations, setRecommendations] = useState<MenuItem[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const moods = [
    { id: 'pide', label: 'Xırçıltılı İsti Pide', cat: 'pide' },
    { id: 'burger', label: 'Çıtır Və Ləzzətli Burger', cat: 'burger' },
    { id: 'doner', label: 'Təzə Və Qoxulu Dönər', cat: 'doner' },
    { id: 'grill', label: 'Közdə Bişmiş Qrill', cat: 'grill' },
    { id: 'drink', label: 'İçki Və Sərinlik', cat: 'icqi' },
  ];

  const handleGenerate = () => {
    let filtered = [...MENU_ITEMS];

    if (selectedMood) {
      filtered = filtered.filter((i) => i.category === selectedMood);
    }
    if (isSpicyOk === true) {
      filtered = filtered.filter((i) => i.isSpicy);
    } else if (isSpicyOk === false) {
      filtered = filtered.filter((i) => !i.isSpicy);
    }

    if (filtered.length === 0) {
      filtered = MENU_ITEMS.slice(0, 3);
    }

    // Shuffle and pick 2 items
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    setRecommendations(shuffled.slice(0, 2));
    setHasSearched(true);
  };

  const handleAdd = (item: MenuItem) => {
    onAddToCart(item);
    setAddedIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  const handleReset = () => {
    setSelectedMood(null);
    setIsSpicyOk(null);
    setHasSearched(false);
    setRecommendations([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative text-zinc-100 overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-zinc-950 font-black shadow-md">
            <Sparkles className="w-5 h-5 fill-zinc-950" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white">Nə Yeyim? (AI Asistent)</h3>
            <p className="text-xs text-zinc-400">Bu gün nə yemək istədiyinizi seçin, sizə ən uyğun təmı təklif edək!</p>
          </div>
        </div>

        {!hasSearched ? (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                1. Nəyə həvəsiniz var?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {moods.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMood(m.cat)}
                    className={`p-3 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                      selectedMood === m.cat
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                2. Acılı olsun?
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsSpicyOk(true)}
                  className={`flex-1 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    isSpicyOk === true
                      ? 'bg-red-600/20 border-red-500 text-red-400'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-300'
                  }`}
                >
                  Hə, acılı sevirəm!
                </button>
                <button
                  onClick={() => setIsSpicyOk(false)}
                  className={`flex-1 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    isSpicyOk === false
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-300'
                  }`}
                >
                  Yox, acısız olsun
                </button>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-950 font-black text-sm uppercase tracking-wider hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <Sparkles className="w-5 h-5 fill-zinc-950" />
              <span>Sərfəli Təklif Tap!</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                AI Asistentin Sizə Təklifi:
              </span>
              <button
                onClick={handleReset}
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Yenidən Seç
              </button>
            </div>

            <div className="space-y-3">
              {recommendations.map((item) => {
                const isAdded = addedIds[item.id];
                return (
                  <div
                    key={item.id}
                    className="bg-zinc-950 border border-zinc-800 rounded-2xl p-3 flex gap-3 items-center"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-extrabold text-white truncate">{item.name}</h4>
                      <p className="text-[11px] text-zinc-400 line-clamp-2 mt-0.5">{item.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-black text-amber-400">{item.price.toFixed(2)} ₼</span>
                        <button
                          onClick={() => handleAdd(item)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                            isAdded
                              ? 'bg-emerald-500 text-zinc-950'
                              : 'bg-amber-500 text-zinc-950 hover:bg-amber-400'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              <span>Əlavə Olundu</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Səbətə Əlavə Et</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  onClose();
                  onGoToMenu();
                }}
                className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer text-center"
              >
                Bütün Menyunu Gör
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
