import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ChevronRight, Tag, CheckCircle2 } from 'lucide-react';
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
  const [deliveryType, setDeliveryType] = useState<'yerinde' | 'catdirilma'>('yerinde');
  const [selectedTable, setSelectedTable] = useState('');
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

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'ALOV10' || code === 'PROMO' || code === 'ENDIRIM') {
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

    if (deliveryType === 'yerinde' && !selectedTable) {
      setValidationError('Zəhmət olmasa masanı seçin!');
      return;
    }

    if (deliveryType === 'catdirilma' && !customerName.trim()) {
      setValidationError('Zəhmət olmasa adınızı daxil edin!');
      return;
    }

    setValidationError(null);

    let text = `*ALOV QRILL & PİDE - SİFARİŞ SƏBƏTİ*\n\n`;
    text += `*Xidmət Növü:* ${deliveryType === 'yerinde' ? 'Yerində (Restoranda)' : 'Ünvana Çatdırılma'}\n`;
    
    if (deliveryType === 'yerinde') {
      text += `*Masa:* ${selectedTable}\n`;
    } else {
      text += `*Müştəri Adı:* ${customerName}\n`;
    }

    text += `\n*SİFARİŞ EDİLƏN MƏHSULLAR:*\n`;
    cartItems.forEach((item, index) => {
      text += `${index + 1}. *${item.menuItem.name}* x${item.quantity}`;
      if (item.selectedOption) {
        text += ` (${item.selectedOption})`;
      }
      text += ` - ${(item.menuItem.price * item.quantity).toFixed(2)} ₼\n`;
    });

    text += `\n--------------------------------\n`;
    text += `*Məhsullar:* ${subtotal.toFixed(2)} ₼\n`;
    if (appliedDiscount > 0) {
      text += `*Endirim:* -${discountAmount.toFixed(2)} ₼\n`;
    }
    text += `*YEKUN MƏBLƏĞ:* *${totalPrice.toFixed(2)} ₼*\n\n`;
    text += `Zəhmət olmasa sifarişi təsdiqləyin!`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/994501234567?text=${encoded}`, '_blank');
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
      <div className={`cart-drawer ${isOpen ? 'open' : ''} text-white flex flex-col justify-between`}>
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#09110d] border-b border-zinc-800/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-zinc-800 text-white flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-white tracking-tight">Sifariş Səbəti</h3>
              <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 text-xs font-bold border border-zinc-700/60">
                {totalCount} məhsul
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCloseCart}
            className="p-1.5 sm:p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

          {/* Cart Content Body - Scrollable Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            
            {orderPlaced ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40 animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-lg font-black text-white">Sifariş WhatsApp-a Göndərildi!</h4>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-xs mx-auto">
                  Sifarişiniz restorana təhvil verildi. Çox tezliklə hazırlanacaq.
                </p>
                <button
                  onClick={() => {
                    onClearCart();
                    setOrderPlaced(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-amber-400 text-black font-extrabold text-xs hover:bg-amber-300 cursor-pointer"
                >
                  Səbəti Sıfırla & Menyuya Qayıt
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-zinc-300">Səbətiniz bomboşdur</h4>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                  Menyudan istədiyiniz təamı seçib "+ Əlavə et" düyməsinə klikləyin.
                </p>
              </div>
            ) : (
              /* List of Cart Items */
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.menuItem.id}
                    className="bg-[#121c17] border border-zinc-800/90 rounded-2xl p-3 sm:p-3.5 flex items-center gap-3 relative group"
                  >
                    <img
                      src={item.menuItem.image}
                      alt={item.menuItem.name}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-zinc-800 shrink-0"
                    />

                    <div className="flex-1 min-w-0 pr-6 space-y-1">
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate">{item.menuItem.name}</h4>
                      
                      {/* Quantity Controls Pill */}
                      <div className="flex items-center gap-2 bg-[#09100d] border border-zinc-800 px-2 py-1 rounded-lg w-fit">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.menuItem.id, -1)}
                          className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-black text-white px-1">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.menuItem.id, 1)}
                          className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs sm:text-sm font-black text-white block">
                        {(item.menuItem.price * item.quantity).toFixed(2)} ₼
                      </span>
                    </div>

                    {/* Trash Button */}
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.menuItem.id)}
                      className="absolute top-3 right-3 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                      title="Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Bottom Section: Delivery Selector + Table/Name + Promokod + Price Summary + Button */}
          {cartItems.length > 0 && !orderPlaced && (
            <div className="p-4 sm:p-5 bg-[#09100d] border-t border-zinc-800/90 space-y-3 shrink-0">
              
              {/* Delivery / In-House Toggle */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#121c17] rounded-xl border border-zinc-800">
                <button
                  type="button"
                  onClick={() => {
                    setDeliveryType('yerinde');
                    setValidationError(null);
                  }}
                  className={`py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                    deliveryType === 'yerinde'
                      ? 'bg-amber-400 text-black shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Yerində
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDeliveryType('catdirilma');
                    setValidationError(null);
                  }}
                  className={`py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                    deliveryType === 'catdirilma'
                      ? 'bg-amber-400 text-black shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Çatdırılma
                </button>
              </div>

              {/* If "Yerində" Selected -> Table Dropdown */}
              {deliveryType === 'yerinde' ? (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-amber-400">
                      Masanızı seçin:
                    </label>
                    <span className="text-[10px] text-zinc-500 font-medium">Düzgün seçin</span>
                  </div>
                  <select
                    value={selectedTable}
                    onChange={(e) => {
                      setSelectedTable(e.target.value);
                      if (e.target.value) setValidationError(null);
                    }}
                    className={`w-full px-3.5 py-2.5 bg-[#0a0a0a] border rounded-xl text-white text-xs font-bold focus:outline-none cursor-pointer transition-colors ${
                      validationError && !selectedTable ? 'border-red-500 ring-1 ring-red-500 bg-red-950/20' : 'border-zinc-800 focus:border-amber-400'
                    }`}
                  >
                    <option value="" className="bg-[#0a0a0a] text-zinc-400 font-semibold py-2">Masanı seçin...</option>
                    <option value="Masa 1" className="bg-[#0a0a0a] text-white font-bold py-2">Masa 1</option>
                    <option value="Masa 2" className="bg-[#0a0a0a] text-white font-bold py-2">Masa 2</option>
                    <option value="Masa 3" className="bg-[#0a0a0a] text-white font-bold py-2">Masa 3</option>
                    <option value="Masa 4" className="bg-[#0a0a0a] text-white font-bold py-2">Masa 4</option>
                    <option value="Masa 5" className="bg-[#0a0a0a] text-white font-bold py-2">Masa 5</option>
                    <option value="Masa 6" className="bg-[#0a0a0a] text-white font-bold py-2">Masa 6</option>
                    <option value="Masa 7" className="bg-[#0a0a0a] text-white font-bold py-2">Masa 7</option>
                    <option value="Masa 8" className="bg-[#0a0a0a] text-white font-bold py-2">Masa 8</option>
                    <option value="Masa 9" className="bg-[#0a0a0a] text-white font-bold py-2">Masa 9</option>
                    <option value="Masa 10" className="bg-[#0a0a0a] text-white font-bold py-2">Masa 10</option>
                  </select>
                </div>
              ) : (
                /* If "Çatdırılma" Selected -> Only Name Input */
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-amber-400">
                    Adınız:
                  </label>
                  <input
                    type="text"
                    placeholder="Adınızı daxil edin..."
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      if (e.target.value) setValidationError(null);
                    }}
                    className={`w-full px-3.5 py-2.5 bg-[#121c17] border rounded-xl text-white text-xs focus:outline-none transition-colors ${
                      validationError && !customerName ? 'border-red-500 ring-1 ring-red-500 bg-red-950/20' : 'border-zinc-800 focus:border-amber-400'
                    }`}
                  />
                </div>
              )}

              {/* Promokod Section */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="PROMOKOD"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#121c17] border border-zinc-800 rounded-xl text-white text-xs font-bold uppercase placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs transition-colors cursor-pointer border border-zinc-700/60"
                >
                  Tətbiq Et
                </button>
              </div>
              {promoSuccessMsg && (
                <p className={`text-[11px] font-semibold ${appliedDiscount > 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {promoSuccessMsg}
                </p>
              )}

              {/* Price Summary */}
              <div className="space-y-1 text-xs text-zinc-300 pt-1">
                <div className="flex justify-between">
                  <span>Məhsullar:</span>
                  <span className="font-bold text-white">{totalCount} ədəd</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Endirim:</span>
                    <span className="font-bold">-{discountAmount.toFixed(2)} ₼</span>
                  </div>
                )}
                <div className="flex justify-between text-xs font-extrabold text-white pt-1 border-t border-zinc-800">
                  <span>Yekun Məbləğ:</span>
                  <span className="text-sm font-black">{totalPrice.toFixed(2)} ₼</span>
                </div>
              </div>

              {/* Red Validation Warning */}
              {validationError && (
                <div className="p-2 rounded-lg bg-red-500/15 border border-red-500/50 text-red-400 font-extrabold text-[11px] text-center animate-pulse">
                  ⚠️ {validationError}
                </div>
              )}

              {/* Compact Solid Green Confirm Button */}
              <button
                type="button"
                onClick={handleSendWhatsAppOrder}
                className="w-full py-2 sm:py-2.5 rounded-lg bg-[#00aa63] hover:bg-[#009657] active:scale-[0.99] text-white font-extrabold text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Sifarişi Təsdiqlə</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>

              {/* Compact Yellow Continue Shopping Button */}
              <button
                type="button"
                onClick={handleCloseCart}
                className="w-full py-2 sm:py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 active:scale-[0.99] text-black font-extrabold text-xs sm:text-sm transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Seçməyə Davam Et</span>
              </button>

            </div>
          )}

      </div>
    </>
  );
};

