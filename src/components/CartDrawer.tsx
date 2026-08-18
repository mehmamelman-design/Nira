import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ChevronRight, Tag, CheckCircle2, Package, Percent, Lock, Copy } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [customerName, setCustomerName] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0); // 0 to 1 percentage
  const [promoSuccessMsg, setPromoSuccessMsg] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('cart-open');
      // Push state for phone/browser Back button
      window.history.pushState({ cartOpen: true }, '', '');

      const handlePopState = () => {
        onClose();
      };

      window.addEventListener('popstate', handlePopState);

      return () => {
        document.body.classList.remove('cart-open');
        window.removeEventListener('popstate', handlePopState);
      };
    } else {
      document.body.classList.remove('cart-open');
    }
  }, [isOpen, onClose]);

  const handleCloseCart = () => {
    if (window.history.state && window.history.state.cartOpen) {
      window.history.back();
    }
    onClose();
  };

  if (!isOpen) return null;

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.menuItem.price * item.quantity,
    0
  );
  
  const discountAmount = subtotal * appliedDiscount;
  const totalPrice = Math.max(0, subtotal - discountAmount);

  const neededForFreeShipping = Math.max(0, 3 - subtotal);
  const neededForPromoCode = Math.max(0, 10 - subtotal);

  let progressPercent = 0;
  if (subtotal < 3) {
    progressPercent = (subtotal / 3) * 50;
  } else if (subtotal < 10) {
    progressPercent = 50 + ((subtotal - 3) / 7) * 50;
  } else {
    progressPercent = 100;
  }

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'NIRA18' || code === 'NIRA 18') {
      setAppliedDiscount(0.05);
      setPromoSuccessMsg('NİRA18 promo kodu tətbiq olundu!');
    } else if (code === 'ALOV10' || code === 'PROMO' || code === 'ENDIRIM') {
      setAppliedDiscount(0.10);
      setPromoSuccessMsg('%10 endirim tətbiq olundu!');
    } else if (code === 'ALOV20') {
      setAppliedDiscount(0.20);
      setPromoSuccessMsg('%20 endirim tətbiq olundu!');
    } else if (code) {
      setPromoSuccessMsg('Keçərsiz promokod!');
      setTimeout(() => setPromoSuccessMsg(null), 3000);
    }
  };

  const handleSendWhatsAppOrder = () => {
    if (cartItems.length === 0) return;

    setValidationError(null);

    let text = `Nira - Sifariş Səbəti\n\n`;
    if (customerName.trim()) {
      text += `Müştəri: ${customerName.trim()}\n`;
    }

    text += `\nSifariş Edilən Məhsullar:\n`;
    cartItems.forEach((item, index) => {
      text += `${index + 1}. ${item.menuItem.name} (${item.quantity} ədəd)`;
      if (item.selectedOption) {
        text += ` [${item.selectedOption}]`;
      }
      // Include set contents/ingredients when ordering a special set package
      const setContents = item.menuItem.description || item.menuItem.ingredients;
      if (
        setContents &&
        (item.menuItem.id.startsWith('pkg-set') ||
         item.menuItem.id.includes('set') ||
         item.menuItem.name.toLowerCase().includes('set'))
      ) {
        text += ` - ${setContents}`;
      }
      text += ` - ${(item.menuItem.price * item.quantity).toFixed(2)} ₼\n`;
    });

    text += `\n--------------------------------\n`;
    text += `Məhsullar: ${totalCount} ədəd\n`;
    if (appliedDiscount > 0) {
      text += `Endirim: ${(appliedDiscount * 100).toFixed(0)}%\n`;
    }
    text += `Ödəniləcək Məbləğ: ${totalPrice.toFixed(2)} ₼\n\n`;
    text += `Çatdırılma Ünvanını Demək İstəyirəm\nZəhmət olmasa Baxın`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/994516359474?text=${encoded}`, '_blank');
    setOrderPlaced(true);
  };

  return (
    <>
      {/* Arxanı qaraldan pərdə */}
      <div
        className={`cart-overlay ${isOpen ? 'active' : ''}`}
        onClick={handleCloseCart}
      />

      {/* Səbət menyusunun tam düzgün oturması */}
      <div className={`cart-drawer ${isOpen ? 'open' : ''} bg-white text-zinc-900 flex flex-col justify-between shadow-2xl`}>
        {/* Header */}
        <div className="p-4 sm:p-5 bg-zinc-50 border-b border-zinc-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-zinc-900 tracking-tight">Sifariş Səbəti</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-zinc-200 text-zinc-800 text-xs font-extrabold border border-zinc-300">
                {totalCount} məhsul
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCloseCart}
            className="p-1.5 sm:p-2 rounded-xl bg-zinc-200 border border-zinc-300 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-300 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

          {/* Cart Content Body - Scrollable Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-white">
            
            {orderPlaced ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-300 animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-lg font-black text-zinc-900">Sifariş WhatsApp-a Göndərildi!</h4>
                <p className="text-xs text-zinc-600 leading-relaxed max-w-xs mx-auto">
                  Sifarişiniz restorana təhvil verildi. Çox tezliklə hazırlanacaq.
                </p>
                <button
                  onClick={() => {
                    onClearCart();
                    setOrderPlaced(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-emerald-700 text-white font-extrabold text-xs hover:bg-emerald-800 cursor-pointer shadow-md"
                >
                  Səbəti Sıfırla & Menyuya Qayıt
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-zinc-100 border border-zinc-200 flex items-center justify-center mx-auto text-zinc-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-base font-extrabold text-zinc-800">Səbətiniz bomboşdur</h4>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                  Menyudan istədiyiniz təamı seçib "+ Əlavə et" düyməsinə klikləyin.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Dynamic Free Shipping & Promo Code Progress Bar Banner (Borderless) */}
                <div className="space-y-3 py-1 px-0.5">
                  {/* Dynamic Banner Header Text */}
                  <div className="text-center text-xs sm:text-sm font-bold text-zinc-900 leading-snug px-1">
                    {subtotal < 3 ? (
                      <>
                        Pulsuz çatdırılma üçün <span className="font-black text-emerald-700">({neededForFreeShipping.toFixed(2)} ₼)</span> dəyərində məhsullar əlavə edin!
                      </>
                    ) : subtotal < 10 ? (
                      <>
                        Pulsuz çatdırılma əldə etdiniz, Promo kod üçün <span className="font-black text-emerald-700">({neededForPromoCode.toFixed(2)} ₼)</span>-lik məhsul əlavə edin!
                      </>
                    ) : (
                      <span className="text-emerald-800 font-extrabold">
                        Təbriklər! Pulsuz çatdırılma və Promo kod qazandınız! 🎉
                      </span>
                    )}
                  </div>

                  {/* Visual Progress Bar Widget */}
                  <div className="relative pt-1 pb-1">
                    {/* Background & Active Progress Line */}
                    <div className="absolute top-[38px] left-9 right-9 h-2 bg-zinc-200 rounded-full z-0 overflow-hidden">
                      <div 
                        className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
                        style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
                      />
                    </div>

                    {/* Nodes Container */}
                    <div className="relative z-10 flex items-start justify-between px-0.5">
                      
                      {/* Left Node: 3 AZN / Pulsuz Çatdırılma */}
                      <div className="flex flex-col items-center gap-1 w-20">
                        <span className="text-xs sm:text-sm font-black text-zinc-900">{subtotal >= 3 ? '3 ₼ ✓' : '3 ₼'}</span>
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 shadow-xs ${
                          subtotal >= 3 
                            ? 'bg-black border-black text-white' 
                            : 'bg-white border-zinc-300 text-zinc-800'
                        }`}>
                          <Package className="w-6 h-6 stroke-[2.2]" />
                        </div>
                        <span className="text-[10px] font-black text-zinc-800 text-center leading-tight mt-0.5">
                          Pulsuz<br />çatdırılma
                        </span>
                      </div>

                      {/* Center Node: Promo Code Box in Middle */}
                      <div className="flex flex-col items-center justify-center pt-5 flex-1 max-w-[135px] px-1">
                        <div 
                          onClick={() => {
                            if (subtotal >= 10) {
                              setPromoCode('Nira18');
                              setAppliedDiscount(0.05);
                              setPromoSuccessMsg('NİRA18 promo kodu tətbiq olundu!');
                            }
                          }}
                          className={`px-3 py-1.5 rounded-xl border transition-all duration-300 flex items-center justify-center gap-1.5 w-full shadow-2xs ${
                            subtotal >= 10
                              ? 'bg-white border-emerald-600 text-emerald-900 font-black cursor-pointer hover:bg-emerald-50 active:scale-95 shadow-xs ring-2 ring-emerald-500/20'
                              : 'bg-zinc-200/90 border-zinc-300 text-zinc-500 font-bold select-none cursor-not-allowed'
                          }`}
                          title={subtotal >= 10 ? 'Nira18 promo kodunu tətbiq etmək üçün klikləyin' : '10 ₼ tamamlandıqda promo kod açılır'}
                        >
                          {subtotal < 10 ? (
                            <>
                              <Lock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                              <span className="text-xs font-bold tracking-wider text-zinc-500 blur-[3px] select-none">Nira18</span>
                            </>
                          ) : (
                            <>
                              <span className="text-xs font-black tracking-wider text-emerald-900">Nira18</span>
                              <Copy className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                            </>
                          )}
                        </div>
                        <span className="text-[9px] sm:text-[10px] font-semibold text-zinc-500 text-center mt-1 leading-tight">
                          Promo kodla al, qənaətin dadını çıxar!
                        </span>
                      </div>

                      {/* Right Node: 10 AZN / Promo Kod */}
                      <div className="flex flex-col items-center gap-1 w-20">
                        <span className="text-xs sm:text-sm font-black text-zinc-900">{subtotal >= 10 ? '10 ₼ ✓' : '10 ₼'}</span>
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 shadow-xs ${
                          subtotal >= 10 
                            ? 'bg-black border-black text-white' 
                            : 'bg-white border-zinc-300 text-zinc-800'
                        }`}>
                          <Percent className="w-6 h-6 stroke-[2.2]" />
                        </div>
                        <span className="text-[10px] font-black text-zinc-800 text-center leading-tight mt-0.5">
                          Promo<br />Kod
                        </span>
                      </div>

                    </div>
                  </div>
                </div>

                {/* List of Cart Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                  <div
                    key={item.menuItem.id}
                    className="bg-zinc-50 border border-zinc-200 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3.5 relative group shadow-xs hover:border-zinc-300 transition-all"
                  >
                    <img
                      src={item.menuItem.image}
                      alt={item.menuItem.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-zinc-200 shrink-0"
                    />

                    <div className="flex-1 min-w-0 pr-6 space-y-1.5">
                      <h4 className="text-sm sm:text-base font-extrabold text-zinc-900 truncate">{item.menuItem.name}</h4>
                      
                      {/* Short sentence description under item name */}
                      <p className="text-[11px] sm:text-xs text-zinc-600 line-clamp-1 leading-snug">
                        {item.selectedOption ? `Seçim: ${item.selectedOption}` : (item.menuItem.description || item.menuItem.ingredients || 'Təzə və ləzzətli xüsusi reseptli təam')}
                      </p>

                      {/* Quantity Controls Pill */}
                      <div className="flex items-center gap-2.5 bg-white border border-zinc-300 px-3 py-1.5 rounded-xl w-fit shadow-2xs">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.menuItem.id, -1)}
                          className="text-zinc-600 hover:text-black transition-colors cursor-pointer p-0.5 active:scale-95"
                          title="Azalt"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-sm sm:text-base font-black text-emerald-800 px-1 min-w-[22px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.menuItem.id, 1)}
                          className="text-zinc-600 hover:text-black transition-colors cursor-pointer p-0.5 active:scale-95"
                          title="Artır"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right shrink-0">
                      <span className="text-sm sm:text-lg font-black text-emerald-800 block tracking-tight">
                        {(item.menuItem.price * item.quantity).toFixed(2)} ₼
                      </span>
                    </div>

                    {/* Trash Button */}
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.menuItem.id)}
                      className="absolute top-3.5 right-3.5 text-zinc-400 hover:text-red-600 transition-colors cursor-pointer p-1"
                      title="Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                </div>
              </div>
            )}

          </div>

          {/* Bottom Section: Promokod + Price Summary + Button */}
          {cartItems.length > 0 && !orderPlaced && (
            <div className="p-4 sm:p-5 bg-zinc-50 border-t border-zinc-200 space-y-3 shrink-0 text-zinc-900">
              
              {/* Promokod Section */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="PROMOKOD"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-zinc-300 rounded-xl text-zinc-900 text-xs font-bold uppercase placeholder-zinc-400 focus:outline-none focus:border-emerald-600 shadow-2xs"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-3.5 py-2 rounded-xl bg-zinc-200 hover:bg-zinc-300 text-zinc-900 font-bold text-xs transition-colors cursor-pointer border border-zinc-300"
                >
                  Tətbiq Et
                </button>
              </div>
              {promoSuccessMsg && (
                <p className={`text-[11px] font-bold ${appliedDiscount > 0 ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {promoSuccessMsg}
                </p>
              )}

              {/* Price Summary */}
              <div className="space-y-1 text-xs text-zinc-700 pt-1">
                <div className="flex justify-between">
                  <span>Məhsullar:</span>
                  <span className="font-extrabold text-zinc-900">{totalCount} ədəd</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Endirim:</span>
                    <span className="font-bold">{(appliedDiscount * 100).toFixed(0)}%</span>
                  </div>
                )}
                <div className="flex justify-between text-xs font-black text-zinc-900 pt-1 border-t border-zinc-200">
                  <span>Ödəniləcək Məbləğ:</span>
                  <span className="text-base font-black text-emerald-800">{totalPrice.toFixed(2)} ₼</span>
                </div>
              </div>

              {/* Red Validation Warning */}
              {validationError && (
                <div className="p-2 rounded-lg bg-red-100 border border-red-300 text-red-700 font-extrabold text-[11px] text-center animate-pulse">
                  ⚠️ {validationError}
                </div>
              )}

              {/* Confirm Button */}
              <button
                type="button"
                onClick={handleSendWhatsAppOrder}
                className="w-full py-2.5 sm:py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-extrabold text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Sifarişi Təsdiqlə</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>

              {/* Continue Shopping Button */}
              <button
                type="button"
                onClick={handleCloseCart}
                className="w-full py-2.5 sm:py-3 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-[0.99] text-black font-extrabold text-xs sm:text-sm transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Seçməyə Davam Et</span>
              </button>

            </div>
          )}

      </div>
    </>
  );
};

