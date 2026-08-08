import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, MessageCircle, MapPin, Phone, User, CheckCircle2, Truck } from 'lucide-react';
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
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.menuItem.price * item.quantity,
    0
  );
  const deliveryFee = deliveryType === 'delivery' ? (subtotal >= 15 ? 0 : 2.5) : 0;
  const totalPrice = subtotal + deliveryFee;

  const handleSendWhatsAppOrder = () => {
    if (cartItems.length === 0) return;

    let text = `*ALOV QRILL & PİDE - YENİ SİFARİŞ*\n\n`;
    text += `*Müştəri:* ${customerName || 'Təyin edilməyib'}\n`;
    text += `*Telefon:* ${phone || 'Təyin edilməyib'}\n`;
    text += `*Təslim Növü:* ${deliveryType === 'delivery' ? 'Ünvana Çatdırılma' : 'Restorandan Götürmə'}\n`;
    
    if (deliveryType === 'delivery') {
      text += `*Ünvan:* ${address || 'Təyin edilməyib'}\n`;
    }
    
    if (orderNotes) {
      text += `*Xüsusi Qeyd:* ${orderNotes}\n`;
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
    if (deliveryType === 'delivery') {
      text += `*Çatdırılma:* ${deliveryFee === 0 ? 'PULSUZ (15₼ üstü)' : deliveryFee.toFixed(2) + ' ₼'}\n`;
    }
    text += `*ÜMUMİ MƏBLƏĞ:* *${totalPrice.toFixed(2)} ₼*\n\n`;
    text += `Zəhmət olmasa sifarişi təsdiqləyin!`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/994501234567?text=${encoded}`, '_blank');
    setOrderPlaced(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-950 border-l border-zinc-800 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400">
                <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-zinc-100">Səbətiniz</h3>
                <p className="text-xs text-zinc-400">{cartItems.length} fərqli məhsul</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {orderPlaced ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40 animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-black text-zinc-100">Sifariş WhatsApp-a Yönləndirildi!</h4>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-xs mx-auto">
                  Operatorlarımız saniyələr içində mesajınızı cavablandıracaq və sifarişinizi ocağa təhvil verəcək.
                </p>
                <button
                  onClick={() => {
                    onClearCart();
                    setOrderPlaced(false);
                    onClose();
                  }}
                  className="px-6 py-3 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs hover:bg-amber-400"
                >
                  Yenidən Menyuya Qayıt
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-zinc-300">Səbətiniz Hal-hazırda Boşdur</h4>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                  Menyudan ləzzətli pidelər, burgerlər və dönərlər seçərək səbətə əlavə edin.
                </p>
              </div>
            ) : (
              <>
                {/* List of Cart Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.menuItem.id}
                      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center gap-3.5"
                    >
                      <img
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        className="w-16 h-16 rounded-xl object-cover border border-zinc-800"
                      />

                      <div className="flex-1 space-y-1">
                        <h4 className="text-xs font-bold text-zinc-100">{item.menuItem.name}</h4>
                        {item.selectedOption && (
                          <span className="inline-block text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                            {item.selectedOption}
                          </span>
                        )}
                        <span className="block text-xs font-black text-amber-400">
                          {(item.menuItem.price * item.quantity).toFixed(2)} ₼
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-zinc-950 p-1.5 rounded-xl border border-zinc-800">
                        <button
                          onClick={() => onUpdateQuantity(item.menuItem.id, -1)}
                          className="p-1 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-extrabold text-zinc-100 px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.menuItem.id, 1)}
                          className="p-1 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => onRemoveItem(item.menuItem.id)}
                        className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Delivery Type Selector */}
                <div className="pt-4 border-t border-zinc-800/80 space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
                    Çatdırılma / Götürmə Seçimi
                  </label>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-900 rounded-2xl border border-zinc-800">
                    <button
                      type="button"
                      onClick={() => setDeliveryType('delivery')}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                        deliveryType === 'delivery'
                          ? 'bg-amber-500 text-zinc-950 shadow-md'
                          : 'text-zinc-400 hover:text-zinc-100'
                      }`}
                    >
                      Ünvana Çatdırılma
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryType('pickup')}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                        deliveryType === 'pickup'
                          ? 'bg-amber-500 text-zinc-950 shadow-md'
                          : 'text-zinc-400 hover:text-zinc-100'
                      }`}
                    >
                      Restorandan Götürmə
                    </button>
                  </div>
                </div>

                {/* Customer Details Form */}
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                      Adınız və Soyadınız
                    </label>
                    <input
                      type="text"
                      placeholder="məs. Əli Əliyev"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-100 text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                      Telefon Nömrəniz *
                    </label>
                    <input
                      type="tel"
                      placeholder="+994 50 000 00 00"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-100 text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {deliveryType === 'delivery' && (
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Çatdırılma Ünvanı *
                      </label>
                      <input
                        type="text"
                        placeholder="məs. Nizami r., Bəşir Səfəroğlu küç. ev 12, mənzil 4"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-100 text-xs focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                      Sifariş üçün xüsusi qeyd
                    </label>
                    <input
                      type="text"
                      placeholder="məs. Soğan olmasın, acı sos bol olsun..."
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-100 text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </>
            )}

          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && !orderPlaced && (
            <div className="p-6 bg-zinc-900 border-t border-zinc-800 space-y-4">
              <div className="space-y-1.5 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Məhsullar cəmi:</span>
                  <span className="font-bold text-zinc-200">{subtotal.toFixed(2)} ₼</span>
                </div>
                {deliveryType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Çatdırılma:</span>
                    <span className="font-bold text-zinc-200">
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-400 font-bold">PULSUZ (15₼ üstü)</span>
                      ) : (
                        `${deliveryFee.toFixed(2)} ₼`
                      )}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black text-amber-400 pt-2 border-t border-zinc-800">
                  <span>YEKUN MƏBLƏĞ:</span>
                  <span className="text-lg">{totalPrice.toFixed(2)} ₼</span>
                </div>
              </div>

              <button
                onClick={handleSendWhatsAppOrder}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 text-white font-black text-xs uppercase tracking-wider hover:from-emerald-500 hover:to-emerald-400 transition-all shadow-xl shadow-emerald-950/40 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>WhatsApp İlə Sifarişi Tamamla</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
