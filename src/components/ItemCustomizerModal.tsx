import React, { useState, useMemo } from 'react';
import { X, Star, Clock, ShieldCheck, Plus, Minus, ShoppingBag, Sparkles, Check } from 'lucide-react';
import { MenuItem } from '../types';

interface ItemCustomizerModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, option?: string, notes?: string, quantity?: number) => void;
  hidePrice?: boolean;
}

interface SizeOption {
  id: string;
  name: string;
  detail: string;
  extraPrice: number;
}

interface ExtraSauce {
  id: string;
  name: string;
  price: number;
}

const SIZE_OPTIONS: SizeOption[] = [
  { id: 'small', name: 'Kiçik', detail: '20 sm', extraPrice: 0.00 },
  { id: 'medium', name: 'Orta', detail: '30 sm', extraPrice: 2.00 },
  { id: 'large', name: 'Böyük', detail: '40 sm', extraPrice: 5.00 },
];

const EXTRA_SAUCES: ExtraSauce[] = [
  { id: 'garlic', name: 'Sarımsaqlı sous', price: 0.50 },
  { id: 'spicy_ketchup', name: 'Acılı Ketchup', price: 0.50 },
  { id: 'cheese_sauce', name: 'Pendir sousu', price: 1.00 },
  { id: 'bbq_sauce', name: 'Barbekü sousu', price: 0.80 },
];

export const ItemCustomizerModal: React.FC<ItemCustomizerModalProps> = ({
  item,
  onClose,
  onAddToCart,
  hidePrice = false,
}) => {
  if (!item) return null;

  // Drink Variants State
  const hasVariants = item.variants && item.variants.length > 0;
  const [selectedVariant, setSelectedVariant] = useState(hasVariants ? item.variants![0] : null);

  const [selectedSize, setSelectedSize] = useState<SizeOption>(SIZE_OPTIONS[0]);
  const [selectedSauceIds, setSelectedSauceIds] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  const toggleSauce = (sauceId: string) => {
    setSelectedSauceIds((prev) =>
      prev.includes(sauceId) ? prev.filter((id) => id !== sauceId) : [...prev, sauceId]
    );
  };

  // Calculation Logic:
  const saucesTotalPrice = useMemo(() => {
    if (hasVariants) return 0;
    return EXTRA_SAUCES.filter((s) => selectedSauceIds.includes(s.id)).reduce(
      (sum, s) => sum + s.price,
      0
    );
  }, [selectedSauceIds, hasVariants]);

  const unitCalculatedPrice = useMemo(() => {
    if (hasVariants && selectedVariant) {
      return selectedVariant.price;
    }
    return item.price + selectedSize.extraPrice + saucesTotalPrice;
  }, [item.price, hasVariants, selectedVariant, selectedSize.extraPrice, saucesTotalPrice]);

  const finalTotalPrice = useMemo(() => {
    return unitCalculatedPrice * quantity;
  }, [unitCalculatedPrice, quantity]);

  const handleAdd = () => {
    let optionSummary = '';

    if (hasVariants && selectedVariant) {
      optionSummary = `Növ: ${selectedVariant.name}`;
    } else {
      const selectedSauceNames = EXTRA_SAUCES.filter((s) =>
        selectedSauceIds.includes(s.id)
      ).map((s) => s.name);

      const optionParts = [`Ölçü: ${selectedSize.name} (${selectedSize.detail})`];
      if (selectedSauceNames.length > 0) {
        optionParts.push(`Souslar: ${selectedSauceNames.join(', ')}`);
      }
      optionSummary = optionParts.join(' | ');
    }

    // Pass custom unit price to cart item
    const customizedItem: MenuItem = {
      ...item,
      price: unitCalculatedPrice,
    };

    onAddToCart(customizedItem, optionSummary, notes, quantity);
    onClose();
  };

  const ingredientsList = item.ingredients
    ? item.ingredients.split(',').map((s) => s.trim())
    : ['Mozzarella', 'Pomidor sousu', 'Xüsusi ədviyyatlar'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl text-white my-auto flex flex-col max-h-[92vh]">
        
        {/* Modal Top Banner with Image */}
        <div className="relative h-48 sm:h-56 md:h-64 w-full bg-zinc-900 shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            type="button"
            className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges on Image */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
            {item.isHalal !== false && (
              <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[10px] sm:text-xs font-black uppercase tracking-wider shadow flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Halal
              </span>
            )}
            {item.isPopular && (
              <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-black text-[10px] sm:text-xs font-black uppercase tracking-wider shadow flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 fill-black" /> Populyar
              </span>
            )}
          </div>

          {/* Title & Base Price Overlay */}
          <div className="absolute bottom-3 left-4 right-4 z-10 space-y-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-amber-400 tracking-tight leading-snug drop-shadow-md">
              {item.name}
            </h2>
            <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-zinc-300">
              <span className="flex items-center gap-1 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{item.rating || 4.9}</span>
              </span>
              <span className="text-zinc-600">•</span>
              <span className="flex items-center gap-1 text-zinc-300">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>{item.prepTime || '12 dəq'}</span>
              </span>
              {item.calories && (
                <>
                  <span className="text-zinc-600">•</span>
                  <span className="text-amber-300 font-bold">{item.calories}</span>
                </>
              )}
              <span className="text-zinc-600">•</span>
              <span className="text-emerald-400 font-extrabold text-sm sm:text-base">
                Baza: {item.price.toFixed(2)} ₼
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* Description & Ingredients */}
          <div className="space-y-2.5 bg-zinc-900/80 p-3.5 sm:p-4 rounded-2xl border border-zinc-800">
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
              {item.description}
            </p>

            {/* Ingredients Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {ingredientsList.map((ing, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-zinc-800 text-[11px] sm:text-xs font-medium text-amber-300/90"
                >
                  {ing}
                </span>
              ))}
            </div>


          </div>

          {/* 1. ÖLÇÜ VƏ YA İÇKİ QRAMA/NÖV SEÇİMİ */}
          {hasVariants ? (
            <div className="space-y-2.5">
              <label className="block text-xs font-black uppercase tracking-wider text-amber-400 flex items-center justify-between">
                <span>1. İÇKİ QRAMAJI / NÖVÜ SEÇİN (Variants)</span>
                <span className="text-[10px] text-zinc-400 font-normal">Məcburi seçim</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5">
                {item.variants!.map((variant) => {
                  const isSelected = selectedVariant?.id === variant.id || selectedVariant?.name === variant.name;
                  return (
                    <button
                      key={variant.id || variant.name}
                      type="button"
                      onClick={() => setSelectedVariant(variant)}
                      className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between relative ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-400 text-white shadow-lg ring-2 ring-amber-400/80 scale-[1.02]'
                          : 'bg-zinc-900/90 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center text-black shrink-0">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                        <span className="text-xs sm:text-sm font-extrabold block">
                          {variant.name}
                        </span>
                      </div>

                      <span className="text-sm font-black text-amber-400">
                        {variant.price.toFixed(2)} ₼
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
              {/* 1. ÖLÇÜ SEÇİMİ (Size Options) */}
              <div className="space-y-2.5">
                <label className="block text-xs font-black uppercase tracking-wider text-amber-400 flex items-center justify-between">
                  <span>1. ÖLÇÜ SEÇİMİ (Size Options)</span>
                  <span className="text-[10px] text-zinc-400 font-normal">Məcburi seçim</span>
                </label>

                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {SIZE_OPTIONS.map((size) => {
                    const isSelected = selectedSize.id === size.id;
                    return (
                      <button
                        key={size.id}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between relative ${
                          isSelected
                            ? 'bg-amber-500/15 border-amber-400 text-white shadow-lg ring-1 ring-amber-400'
                            : 'bg-zinc-900/90 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm font-extrabold block">
                              {size.name}
                            </span>
                            {isSelected && (
                              <div className="w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center text-black">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </div>
                            )}
                          </div>
                          <span className="text-[11px] text-zinc-400 block mt-0.5">
                            {size.detail}
                          </span>
                        </div>

                        <span className="text-xs font-black text-amber-400 mt-2 block">
                          {size.extraPrice === 0 ? 'Baza' : `+${size.extraPrice.toFixed(2)} ₼`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. ƏLAVƏ SOUSLAR / TƏRKİB SEÇİMİ (Sauces & Extras) */}
              <div className="space-y-2.5">
                <label className="block text-xs font-black uppercase tracking-wider text-amber-400 flex items-center justify-between">
                  <span>2. ƏLAVƏ SOUSLAR / TƏRKİB SEÇİMİ</span>
                  <span className="text-[10px] text-zinc-400 font-normal">İstəyə bağlı (çoxlu seçim)</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {EXTRA_SAUCES.map((sauce) => {
                    const isChecked = selectedSauceIds.includes(sauce.id);
                    return (
                      <button
                        key={sauce.id}
                        type="button"
                        onClick={() => toggleSauce(sauce.id)}
                        className={`p-3 rounded-2xl border flex items-center justify-between transition-all duration-200 cursor-pointer text-left ${
                          isChecked
                            ? 'bg-emerald-950/40 border-emerald-500 text-white shadow ring-1 ring-emerald-500/50'
                            : 'bg-zinc-900/90 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                              isChecked
                                ? 'bg-emerald-500 border-emerald-500 text-black'
                                : 'border-zinc-600 bg-zinc-800'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="text-xs font-bold">{sauce.name}</span>
                        </div>

                        <span className="text-xs font-black text-emerald-400">
                          +{sauce.price.toFixed(2)} ₼
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* 3. XÜSUSİ QEYD BÖLMƏSİ (Notes) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-black uppercase tracking-wider text-amber-400">
              3. XÜSUSİ QEYD BÖLMƏSİ
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Mətbəx üçün xüsusi istək (məs: Soğansız olsun)"
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          {/* 4. SAYĞAC VƏ YEKUN QİYMƏT HESABLANMASI */}
          <div className="pt-2 border-t border-zinc-800 flex items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                Miqdar:
              </span>
              <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 p-1 rounded-xl mt-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-sm font-black text-white px-2.5 min-w-[24px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Price breakdown summary */}
            {!hidePrice && (
              <div className="text-right">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Cəmi Summa:
                </span>
                <span className="text-lg sm:text-2xl font-black text-amber-400 block tracking-tight">
                  {finalTotalPrice.toFixed(2)} ₼
                </span>
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer - Submit Button */}
        <div className="p-4 sm:p-5 bg-zinc-900/90 border-t border-zinc-800 shrink-0">
          <button
            type="button"
            onClick={handleAdd}
            className="w-full py-3.5 px-6 rounded-2xl bg-amber-400 hover:bg-amber-500 active:scale-[0.99] text-black font-black text-sm sm:text-base uppercase tracking-wider shadow-xl flex items-center justify-center gap-2.5 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 fill-black/20" />
            <span>
              {hidePrice ? '+ Səbətə Əlavə Et' : `+ Səbətə Əlavə Et • ${finalTotalPrice.toFixed(2)} ₼`}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};
