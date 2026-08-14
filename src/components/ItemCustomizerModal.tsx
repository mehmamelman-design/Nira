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
  const hasVariants = Boolean(item.variants && item.variants.length > 0);
  const [selectedVariant, setSelectedVariant] = useState<{ id?: string; name: string; price: number } | null>(null);

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

  const activeVariant = useMemo(() => {
    if (!hasVariants) return null;
    return selectedVariant || (item.variants && item.variants.length > 0 ? item.variants[0] : null);
  }, [hasVariants, selectedVariant, item.variants]);

  const unitCalculatedPrice = useMemo(() => {
    if (hasVariants) {
      return selectedVariant ? selectedVariant.price : item.price;
    }
    return item.price + selectedSize.extraPrice + saucesTotalPrice;
  }, [item.price, hasVariants, selectedVariant, selectedSize.extraPrice, saucesTotalPrice]);

  const finalTotalPrice = useMemo(() => {
    return unitCalculatedPrice * quantity;
  }, [unitCalculatedPrice, quantity]);

  const handleAdd = () => {
    let optionSummary = '';

    if (hasVariants) {
      const chosen = selectedVariant || (item.variants && item.variants.length > 0 ? item.variants[0] : null);
      if (chosen) {
        optionSummary = `Növ: ${chosen.name}`;
      }
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

    const customizedItem: MenuItem = {
      ...item,
      price: hasVariants && selectedVariant ? selectedVariant.price : unitCalculatedPrice,
    };

    onAddToCart(customizedItem, optionSummary, notes, quantity);
    onClose();
  };

  const ingredientsList = item.ingredients
    ? item.ingredients.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      
      {/* White Full Modal Container */}
      <div className="relative w-full max-w-xl bg-white text-zinc-900 border border-zinc-200 rounded-3xl overflow-hidden shadow-2xl my-auto flex flex-col max-h-[92vh]">
        
        {/* Modal Top Banner with Image */}
        <div className="relative h-40 sm:h-48 md:h-52 w-full bg-zinc-100 shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            type="button"
            className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 hover:bg-white text-zinc-800 border border-zinc-200 shadow-md transition-all cursor-pointer z-20"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Title & Base Price Overlay */}
          <div className="absolute bottom-2 left-3 right-3 z-10 space-y-0.5">
            <h2 className="text-lg sm:text-xl font-black text-zinc-900 tracking-tight leading-snug">
              {item.name}
            </h2>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-zinc-600">
              <span className="flex items-center gap-0.5 text-zinc-800">
                <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                <span>{item.rating || 4.9}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-0.5 text-zinc-700">
                <Clock className="w-3 h-3 text-emerald-600" />
                <span>{item.prepTime || '12 dəq'}</span>
              </span>
              <span>•</span>
              <span className="text-emerald-700 font-extrabold">
                {item.price.toFixed(2)} ₼
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-3 sm:p-4 overflow-y-auto space-y-4 flex-1">
          
          {/* Description & Ingredients */}
          {item.description && (
            <div className="space-y-1.5 bg-zinc-50 p-3 rounded-xl border border-zinc-200">
              <p className="text-[11px] sm:text-xs text-zinc-700 leading-relaxed font-normal">
                {item.description}
              </p>

              {/* Ingredients Pills */}
              {ingredientsList.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {ingredientsList.map((ing, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-white border border-zinc-200 text-[10px] font-semibold text-zinc-800"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 1. İÇKİ QRAMAJI / NÖVÜ SEÇİN (Single column stacked vertically) */}
          {hasVariants ? (
            <div className="space-y-1.5">
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-zinc-900 flex items-center justify-between">
                <span>İçki Qramajı / Növünü Seçin</span>
                <span className="text-[10px] text-zinc-500 font-normal">Məcburi seçim</span>
              </label>

              {/* Stacked vertically: flex flex-col gap-2 */}
              <div className="flex flex-col gap-2">
                {item.variants!.map((variant) => {
                  const isSelected = Boolean(
                    selectedVariant &&
                    (variant.id ? selectedVariant.id === variant.id : selectedVariant.name === variant.name)
                  );
                  return (
                    <button
                      key={variant.id || variant.name}
                      type="button"
                      onClick={() => setSelectedVariant(variant)}
                      className={`p-2.5 rounded-xl border text-left transition-all duration-150 cursor-pointer flex items-center justify-between relative ${
                        isSelected
                          ? 'bg-emerald-50 border-emerald-600 text-zinc-900 shadow-sm ring-1 ring-emerald-600'
                          : 'bg-white border-zinc-200 text-zinc-800 hover:border-zinc-300 hover:bg-zinc-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'border-zinc-400 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-extrabold text-zinc-900">
                          {variant.name}
                        </span>
                      </div>

                      <span className="text-xs font-black text-emerald-700">
                        {variant.price.toFixed(2)} ₼
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
              {/* ÖLÇÜ SEÇİMİ */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-zinc-900 flex items-center justify-between">
                  <span>Ölçü Seçimi</span>
                  <span className="text-[10px] text-zinc-500 font-normal">Məcburi seçim</span>
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {SIZE_OPTIONS.map((size) => {
                    const isSelected = selectedSize.id === size.id;
                    return (
                      <button
                        key={size.id}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`p-2 rounded-xl border text-left transition-all duration-150 cursor-pointer flex flex-col justify-between relative ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-600 text-zinc-900 shadow-sm ring-1 ring-emerald-600'
                            : 'bg-white border-zinc-200 text-zinc-800 hover:border-zinc-300'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-zinc-900">
                              {size.name}
                            </span>
                            {isSelected && (
                              <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                            )}
                          </div>
                          <span className="text-[10px] text-zinc-500 block">
                            {size.detail}
                          </span>
                        </div>

                        <span className="text-[11px] font-black text-emerald-700 mt-1 block">
                          {size.extraPrice === 0 ? 'Baza' : `+${size.extraPrice.toFixed(2)} ₼`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ƏLAVƏ SOUSLAR */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-zinc-900 flex items-center justify-between">
                  <span>Əlavə Souslar</span>
                  <span className="text-[10px] text-zinc-500 font-normal">İstəyə bağlı</span>
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {EXTRA_SAUCES.map((sauce) => {
                    const isChecked = selectedSauceIds.includes(sauce.id);
                    return (
                      <button
                        key={sauce.id}
                        type="button"
                        onClick={() => toggleSauce(sauce.id)}
                        className={`p-2 rounded-xl border flex items-center justify-between transition-all duration-150 cursor-pointer text-left ${
                          isChecked
                            ? 'bg-emerald-50 border-emerald-600 text-zinc-900'
                            : 'bg-white border-zinc-200 text-zinc-800 hover:border-zinc-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
                              isChecked
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'border-zinc-400 bg-white'
                            }`}
                          >
                            {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                          <span className="text-[11px] font-bold text-zinc-900">{sauce.name}</span>
                        </div>

                        <span className="text-[10px] font-black text-emerald-700">
                          +{sauce.price.toFixed(2)} ₼
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* XÜSUSİ QEYD BÖLMƏSİ */}
          <div className="space-y-1">
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-zinc-900">
              Xüsusi Qeyd
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Mətbəx üçün xüsusi istək (məs: Soğansız olsun)"
              className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 placeholder-zinc-400 text-xs focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
            />
          </div>

        </div>

        {/* Modal Footer - Submit Button with integrated Quantity Selector & 'Sayını artır' */}
        <div className="p-3 sm:p-4 bg-zinc-50 border-t border-zinc-200 shrink-0 flex flex-col sm:flex-row items-center gap-3">
          
          {/* Quantity selector labeled 'Sayını artır' */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start bg-white border border-zinc-300 px-3 py-1.5 rounded-xl shadow-sm">
            <span className="text-xs font-extrabold text-zinc-800 whitespace-nowrap">
              Sayını artır:
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-7 h-7 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 flex items-center justify-center transition-colors cursor-pointer border border-zinc-200"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-xs font-black text-zinc-900 px-1.5 min-w-[20px] text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-7 h-7 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 flex items-center justify-center transition-colors cursor-pointer border border-zinc-200"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Add to Cart Action Button */}
          <button
            type="button"
            onClick={handleAdd}
            className="w-full flex-1 py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 fill-white/20" />
            <span>
              {hidePrice ? '+ Səbətə Əlavə Et' : `+ Səbətə Əlavə Et • ${finalTotalPrice.toFixed(2)} ₼`}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};
