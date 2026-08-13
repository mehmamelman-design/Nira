import React, { useState } from 'react';
import { ArrowLeft, Star, Clock, Flame, ShieldCheck, Plus, Minus, ShoppingBag, Sparkles } from 'lucide-react';
import { MenuItem } from '../types';

interface FoodDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, option?: string, notes?: string, quantity?: number) => void;
}

export const FoodDetailModal: React.FC<FoodDetailModalProps> = ({
  item,
  onClose,
  onAddToCart
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string>(
    item.options && item.options.length > 0 ? item.options[0] : ''
  );
  const [notes, setNotes] = useState('');

  const categoryNameMap: { [key: string]: string } = {
    pizza: 'Pizza seçimi',
    fastfood: 'Fast food',
    kabablar: 'Kabab seçimi',
    isti_yemekler: 'İsti yemək',
    salat: 'Təzə salat',
    cig_kofte: 'Çiy köftə',
    sorbalar: 'İsti şorba',
    qelyanaltilar: 'Qəlyanaltı',
    desertler: 'Ləzzətli desert',
    kofe: 'Kofe',
    kokteyl: 'Sərinləşdirici kokteyl',
    ickiler: 'Sərinləşdirici içki'
  };

  // Derive ingredients if not explicitly supplied
  const getIngredientsList = (): string[] => {
    if (item.ingredients) {
      return item.ingredients.split(',').map((s) => s.trim());
    }
    // Extract logical ingredients from description or defaults
    const words = item.description.split(/[,.ve\s]+/).filter((w) => w.length > 3);
    const unique: string[] = Array.from(new Set<string>(words)).slice(0, 5);
    return unique.length > 0 ? unique : ['Təzə ərzaqlar', 'Alov xüsusi sousu', 'Halal ət'];
  };

  const ingredients = getIngredientsList();
  const totalPrice = (item.price * quantity).toFixed(2);

  const handleAdd = () => {
    onAddToCart(item, selectedOption || undefined, notes, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex flex-col justify-between animate-fadeIn">
      {/* Main Content Area */}
      <div className="relative w-full max-w-6xl mx-auto pb-32">
        
        {/* Top Hero Image Banner */}
        <div className="relative h-64 sm:h-80 lg:h-96 w-full overflow-hidden bg-zinc-950">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover object-center"
          />
          {/* Dark Gradients for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1410] via-[#0b1410]/70 to-black/50" />
          
          {/* Top Return Button */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 text-xs sm:text-sm font-bold backdrop-blur-md transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-400" />
              <span>Menuyu Qayıt</span>
            </button>
          </div>

          {/* Hero Content Overlay */}
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-10 space-y-2">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-amber-500 text-black text-[11px] font-black uppercase tracking-wider shadow">
                {categoryNameMap[item.category] || 'NİRA LƏZZƏTİ'}
              </span>
              
              {item.isPopular && (
                <span className="px-3 py-1 rounded-lg bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-[11px] font-black uppercase tracking-wider flex items-center gap-1 shadow">
                  <Sparkles className="w-3 h-3 text-emerald-400" /> POPULYAR TƏAM
                </span>
              )}

              {item.isHalal !== false && (
                <span className="px-3 py-1 rounded-lg bg-emerald-800/80 text-emerald-200 text-[11px] font-bold tracking-wider flex items-center gap-1 shadow">
                  <ShieldCheck className="w-3 h-3 text-emerald-300" /> Halal Sertifikatlı
                </span>
              )}

              {item.isSpicy && (
                <span className="px-3 py-1 rounded-lg bg-red-600/90 text-white text-[11px] font-bold tracking-wider shadow">
                  Acılı
                </span>
              )}
            </div>

            {/* Food Title */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-none drop-shadow-md">
              {item.name}
            </h1>

            {/* Sub Meta Info */}
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold text-emerald-200/90 pt-1">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>4.9 (240 rəy)</span>
              </div>
              <span className="text-zinc-600">•</span>
              <div className="flex items-center gap-1 text-zinc-300">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Hazırlanma: {item.prepTime || '15-20 dəq'}</span>
              </div>
              <span className="text-zinc-600">•</span>
              <div className="flex items-center gap-1 text-zinc-300">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>{item.calories || '680 kcal'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Food Information Section */}
        <div className="p-4 sm:p-6 lg:p-8 bg-[#0b1410] min-h-[50vh]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Description & Ingredients */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Card 1: Description */}
              <div className="bg-[#13201a] border border-emerald-900/60 rounded-2xl p-5 shadow-lg space-y-2">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                  TƏAM HAQQINDA MƏLUMAT
                </h3>
                <p className="text-sm sm:text-base text-zinc-200 font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Card 2: Ingredients */}
              <div className="bg-[#13201a] border border-emerald-900/60 rounded-2xl p-5 shadow-lg space-y-3">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
                  ƏSAS TƏRKİB HISSƏLƏRİ
                </h3>
                <div className="flex flex-wrap gap-2">
                  {ingredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-[#1b2b23] border border-emerald-800/50 text-xs sm:text-sm font-medium text-emerald-100"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 3: Quality Guarantee */}
              <div className="bg-[#13201a] border border-emerald-900/60 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-white">
                    Barbecu & Alov Standart Zəmanəti
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-0.5">
                    Təbii Halal kəsim dana və toyuq ətlərindən, xüsusi daş ocaqda təzə xəmir və orijinal reseptlə anında təzə bişirilir.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Custom Notes & Quantity Selector */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Optional Choosers (if options exist) */}
              {item.options && item.options.length > 0 && (
                <div className="bg-[#13201a] border border-emerald-900/60 rounded-2xl p-5 shadow-lg space-y-3">
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
                    XÜSUSİ TƏAM SEÇİMİ
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {item.options.map((opt) => {
                      const isSelected = selectedOption === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setSelectedOption(opt)}
                          className={`p-2.5 rounded-xl text-xs font-bold transition-all text-left border cursor-pointer ${
                            isSelected
                              ? 'bg-amber-400 text-black border-amber-400 shadow'
                              : 'bg-[#1b2b23] text-zinc-300 border-emerald-900/60 hover:border-emerald-700'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Custom Request Textarea */}
              <div className="bg-[#13201a] border border-emerald-900/60 rounded-2xl p-5 shadow-lg space-y-2">
                <label className="block text-xs font-extrabold uppercase tracking-widest text-amber-300 flex items-center gap-1.5">
                  <span>XÜSUSİ QEYDİNİZ VƏ YA AŞPAZA İSTƏK</span>
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Məsələn: Acısız olsun, soğansız bişirilsin, sousu bol verilsin..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b1410] border border-emerald-900 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
                />
              </div>

              {/* Portion Quantity Selector */}
              <div className="bg-[#13201a] border border-emerald-900/60 rounded-2xl p-5 shadow-lg flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
                    PORSİYON SAYI
                  </h3>
                  <p className="text-[11px] text-zinc-400">Sifariş miqdarını təyin edin</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 bg-[#0b1410] border border-emerald-900 p-1.5 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 rounded-xl bg-[#1f2d25] hover:bg-[#283b30] text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-base font-black text-white px-2 min-w-[20px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 h-9 rounded-xl bg-[#1f2d25] hover:bg-[#283b30] text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Fixed Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0b1410]/95 backdrop-blur-md border-t border-emerald-900 px-4 py-3 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          
          {/* Price Tag */}
          <div>
            <span className="text-[10px] sm:text-xs text-zinc-400 font-bold uppercase tracking-wider block">
              Yekun Qiymət
            </span>
            <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {totalPrice} ₼
            </span>
          </div>

          {/* Big Add to Cart Button */}
          <button
            onClick={handleAdd}
            className="flex-1 sm:flex-initial px-6 sm:px-10 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-500 active:scale-98 text-black font-extrabold text-sm sm:text-base uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 text-black" />
            <span>{quantity} x Səbətə Əlavə Et</span>
          </button>

        </div>
      </div>
    </div>
  );
};
