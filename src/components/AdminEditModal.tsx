import React, { useState, useEffect } from 'react';
import { X, Sparkles, Upload, Eye, Save, Image, Tag, DollarSign, FileText, Layers, CheckCircle } from 'lucide-react';
import { MenuItem, CategoryId, HeroConfig } from '../types';

interface AdminEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'logo' | 'menuItem' | 'hero';
  logoUrl?: string;
  menuItem?: MenuItem | null;
  heroConfig?: HeroConfig;
  onSaveLogo?: (newUrl: string) => Promise<void> | void;
  onSaveMenuItem?: (updatedItem: MenuItem) => Promise<void> | void;
  onSaveHero?: (hero: HeroConfig) => Promise<void> | void;
  onShowToast?: (msg: string) => void;
}

export const AdminEditModal: React.FC<AdminEditModalProps> = ({
  isOpen,
  onClose,
  type,
  logoUrl = '',
  menuItem,
  heroConfig,
  onSaveLogo,
  onSaveMenuItem,
  onSaveHero,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'cloud'>('info');
  const [imageUrl, setImageUrl] = useState('');
  
  // Menu Item Fields
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CategoryId>('pizza');
  const [ingredients, setIngredients] = useState('');
  const [isPopular, setIsPopular] = useState(false);
  const [isHalal, setIsHalal] = useState(true);
  const [prepTime, setPrepTime] = useState('12 dəq');
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  // Hero Fields
  const [heroTitle, setHeroTitle] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  const [heroVideoUrl, setHeroVideoUrl] = useState('');
  const [heroIsVideoEnabled, setHeroIsVideoEnabled] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (type === 'logo') {
      setImageUrl(logoUrl || '');
    } else if (type === 'hero') {
      setHeroTitle(heroConfig?.title || 'Qaynar İsti Ocaqdan Qapınıza Çatdırılan Ən Ləzzətli Fast Food');
      setHeroSubtitle(heroConfig?.subtitle || 'Təzə kəsilmiş halal ət, isti ocağın əvəzolunmaz qoxusu və xüsusi reseptlə hazırlanan çıtır qızarmış toyuqlar.');
      setImageUrl(heroConfig?.imageUrl || '');
      setHeroVideoUrl(heroConfig?.videoUrl || '');
      setHeroIsVideoEnabled(heroConfig?.isVideoEnabled ?? false);
    } else if (menuItem) {
      setName(menuItem.name || '');
      setPrice(menuItem.price || 0);
      setDescription(menuItem.description || '');
      setCategory(menuItem.category || 'pizza');
      setIngredients(menuItem.ingredients || '');
      setImageUrl(menuItem.image || '');
      setIsPopular(menuItem.isPopular ?? false);
      setIsHalal(menuItem.isHalal ?? true);
      setPrepTime(menuItem.prepTime || '12 dəq');
      setIsOutOfStock(menuItem.isOutOfStock ?? false);
    } else {
      // New Menu Item
      setName('');
      setPrice('');
      setDescription('');
      setCategory('pizza');
      setIngredients('Təzə ərzaqlar, Mozzarella, Xüsusi sos');
      setImageUrl('');
      setIsPopular(false);
      setIsHalal(true);
      setPrepTime('12 dəq');
      setIsOutOfStock(false);
    }
  }, [type, logoUrl, menuItem, heroConfig, isOpen]);

  if (!isOpen) return null;

  const handlePasteSample = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setImageUrl(text);
    } catch (e) {
      // Fallback if clipboard permission denied
      const pasted = prompt('Cloudinary / CDN şəkil linkini yapışdırın:');
      if (pasted) setImageUrl(pasted);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (type === 'logo') {
        if (onSaveLogo) {
          await onSaveLogo(imageUrl.trim());
        }
        if (onShowToast) onShowToast('Yuxarı Logo uğurla yeniləndi!');
      } else if (type === 'hero') {
        if (onSaveHero) {
          await onSaveHero({
            title: heroTitle.trim() || 'Qaynar İsti Ocaqdan Qapınıza Çatdırılan Ən Ləzzətli Fast Food',
            subtitle: heroSubtitle.trim() || 'Təzə kəsilmiş halal ət, isti ocağın əvəzolunmaz qoxusu...',
            imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=1600',
            videoUrl: heroVideoUrl.trim(),
            isVideoEnabled: heroIsVideoEnabled
          });
        }
        if (onShowToast) onShowToast('Hero Banner (Şəkil və Mətnlər) uğurla yeniləndi!');
      } else if (onSaveMenuItem) {
        const itemToSave: MenuItem = {
          id: menuItem?.id || `item_${Date.now()}`,
          name: name.trim() || 'Yeni Yemək Məhsulu',
          price: typeof price === 'number' ? price : parseFloat(price as string) || 0,
          description: description.trim() || 'Təzə və ləzzətli xammallarla hazırlanan xüsusi təam.',
          category: category,
          ingredients: ingredients.trim() || 'Təzə ərzaqlar, Mozzarella',
          image: imageUrl.trim() || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
          isPopular: isPopular,
          isHalal: isHalal,
          prepTime: prepTime.trim() || '12 dəq',
          rating: menuItem?.rating || 4.9,
          isOutOfStock: isOutOfStock
        };
        await onSaveMenuItem(itemToSave);
        if (onShowToast) onShowToast(`"${itemToSave.name}" uğurla yeniləndi və bazaya yazıldı!`);
      }
      onClose();
    } catch (error) {
      console.error('Admin edit error:', error);
      alert('Yadda saxlarkən xəta baş verdi. Yenidən cəhd edin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#111317] border border-amber-500/30 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl text-white relative flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-[#16181d]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-black flex items-center justify-center font-black shadow">
              <Sparkles className="w-4 h-4 fill-black" />
            </div>
            <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-white">
              {type === 'logo'
                ? 'Yuxarı Logo (Şəkil URL)'
                : type === 'hero'
                ? 'Hero Banneri Redaktə Et (Şəkil və Mətnlər)'
                : menuItem
                ? `"${menuItem.name}" Məhsulunu Redaktə Et`
                : '+ Yeni Yemək Kartı Əlavə Et'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-black/40 border border-white/10 hover:border-white text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-2 border-b border-white/10 bg-[#14161b]">
          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className={`py-3 px-3 text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer border-b-2 ${
              activeTab === 'info'
                ? 'border-amber-400 text-amber-400 bg-amber-400/10'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <span>ƏSAS MƏLUMATLAR</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('cloud')}
            className={`py-3 px-2 text-[11px] sm:text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer border-b-2 uppercase tracking-tight ${
              activeTab === 'cloud'
                ? 'border-amber-400 text-amber-400 bg-amber-400/10'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <span>BULUD (CLOUDINARY/CDN) LİNK LƏRİ & CANLI ÖNBAXIŞ</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
          
          {/* TAB 1: MAIN INFO */}
          {activeTab === 'info' && (
            <div className="space-y-3.5">
              {type === 'menuItem' ? (
                <>
                  <div>
                    <label className="block text-xs font-extrabold uppercase text-amber-400 mb-1">
                      Məhsulun Adı
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Məsələn: Quşbaşı Pide"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-zinc-700 text-white font-bold text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-amber-400 mb-1">
                        Qiyməti (₼)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        placeholder="12.50"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-zinc-700 text-white font-bold text-sm focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase text-amber-400 mb-1">
                        Kateqoriya
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as CategoryId)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-zinc-700 text-white font-bold text-sm focus:border-amber-400 focus:outline-none"
                      >
                        <option value="pizza">Pizza</option>
                        <option value="fastfood">Fast Food & Burger</option>
                        <option value="pide">Pide</option>
                        <option value="calzone">Calizone</option>
                        <option value="doner">Dönərlər</option>
                        <option value="icikil">Soyuq İçkilər</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase text-amber-400 mb-1">
                      Məhsul Təsviri
                    </label>
                    <textarea
                      rows={2}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Qısa məhsul təsviri..."
                      className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-zinc-700 text-white text-xs font-medium focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase text-amber-400 mb-1">
                      Tərkibi / Xüsusiyyətlər
                    </label>
                    <input
                      type="text"
                      value={ingredients}
                      onChange={(e) => setIngredients(e.target.value)}
                      placeholder="Pendir, Dana Əti, Bibər, Sos..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-zinc-700 text-white text-xs font-medium focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase text-amber-400 mb-1">
                      Hazırlanma Müddəti
                    </label>
                    <input
                      type="text"
                      value={prepTime}
                      onChange={(e) => setPrepTime(e.target.value)}
                      placeholder="Məsələn: 12 dəq, 15 dəq"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-zinc-700 text-white text-xs font-medium focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  {/* Badges Toggles */}
                  <div className="p-3.5 rounded-2xl bg-black/40 border border-zinc-800 space-y-2.5">
                    <span className="block text-xs font-extrabold uppercase text-amber-400">
                      Xüsusi Nişanlar və Status:
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <label className="flex items-center gap-2 p-2 rounded-xl bg-zinc-900 border border-zinc-800 cursor-pointer hover:border-amber-400 transition-colors">
                        <input
                          type="checkbox"
                          checked={isHalal}
                          onChange={(e) => setIsHalal(e.target.checked)}
                          className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                        />
                        <span className="font-bold text-emerald-400">Halal Sertifikatı</span>
                      </label>

                      <label className="flex items-center gap-2 p-2 rounded-xl bg-zinc-900 border border-zinc-800 cursor-pointer hover:border-amber-400 transition-colors">
                        <input
                          type="checkbox"
                          checked={isPopular}
                          onChange={(e) => setIsPopular(e.target.checked)}
                          className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
                        />
                        <span className="font-bold text-amber-400">Populyar Nişanı</span>
                      </label>

                      <label className="flex items-center gap-2 p-2 rounded-xl bg-zinc-900 border border-zinc-800 cursor-pointer hover:border-red-400 transition-colors">
                        <input
                          type="checkbox"
                          checked={isOutOfStock}
                          onChange={(e) => setIsOutOfStock(e.target.checked)}
                          className="w-4 h-4 accent-red-500 rounded cursor-pointer"
                        />
                        <span className="font-bold text-red-400">Tükənib (Stokda Yoxdur)</span>
                      </label>
                    </div>
                  </div>
                </>
              ) : type === 'hero' ? (
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-extrabold uppercase text-amber-400 mb-1">
                      Hero Əsas Başlıq Mətni
                    </label>
                    <textarea
                      rows={2}
                      value={heroTitle}
                      onChange={(e) => setHeroTitle(e.target.value)}
                      required
                      placeholder="Qaynar İsti Ocaqdan Qapınıza Çatdırılan Ən Ləzzətli Fast Food"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-zinc-700 text-white font-bold text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase text-amber-400 mb-1">
                      Açıqlama / Subtitle Mətni
                    </label>
                    <textarea
                      rows={3}
                      value={heroSubtitle}
                      onChange={(e) => setHeroSubtitle(e.target.value)}
                      required
                      placeholder="Təzə kəsilmiş halal ət, isti ocağın əvəzolunmaz qoxusu..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-zinc-700 text-white text-xs font-medium focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase text-amber-400 mb-1">
                      Arxa Fon Şəkil URL-i
                    </label>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-zinc-700 text-white font-mono text-xs focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/40 border border-zinc-800 space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={heroIsVideoEnabled}
                        onChange={(e) => setHeroIsVideoEnabled(e.target.checked)}
                        className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
                      />
                      <span className="font-bold text-xs text-amber-400">Şəkil Əvəzinə Video Fon İcra Olunsun</span>
                    </label>

                    {heroIsVideoEnabled && (
                      <input
                        type="url"
                        value={heroVideoUrl}
                        onChange={(e) => setHeroVideoUrl(e.target.value)}
                        placeholder="https://assets.mixkit.co/videos/..."
                        className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-zinc-700 text-white font-mono text-xs focus:border-amber-400 focus:outline-none"
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-black/40 border border-zinc-800 space-y-2">
                  <h4 className="text-sm font-extrabold text-amber-400">Yuxarı Logo Tənzimləməsi</h4>
                  <p className="text-xs text-zinc-300">
                    Restoranın yuxarı menyuda (Navbar) görünəcək logosunu redaktə edirsiniz. Şəkil linkini növbəti tab-da daxil edin. Logo heç bir çərçivəyə salınmadan sərbəst və şəffaf şəkildə göstəriləcək.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CLOUDINARY / CDN LINK & LIVE PREVIEW */}
          {activeTab === 'cloud' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-amber-400 mb-1.5">
                  ƏSAS FOTO URL-I (CLOUDINARY, S3, CDN)
                </label>
                
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://res.cloudinary.com/..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/80 border border-zinc-700 text-white font-mono text-xs focus:border-amber-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handlePasteSample}
                    className="px-3.5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-400 font-extrabold text-xs flex items-center gap-1.5 border border-zinc-700 shrink-0 cursor-pointer transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Yapıştır</span>
                  </button>
                </div>
              </div>

              {/* LIVE PREVIEW CONTAINER (Matching User Screenshot Layout) */}
              <div className="p-3.5 rounded-2xl bg-black/60 border border-zinc-800 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-400">
                  <Eye className="w-4 h-4 text-amber-400" />
                  <span>Canlı Önbaxış (Live Preview):</span>
                </div>

                <div className="w-full h-56 sm:h-64 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 flex items-center justify-center relative">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="max-h-full max-w-full object-contain p-2"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600';
                      }}
                    />
                  ) : (
                    <div className="text-center p-4 text-zinc-500 space-y-1">
                      <Image className="w-10 h-10 mx-auto opacity-30" />
                      <p className="text-xs">Şəkil linki daxil edin</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Modal Actions Footer */}
          <div className="pt-3 border-t border-white/10 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs transition-all cursor-pointer"
            >
              Ləğv Et
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 px-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>YADDA SAXLA & BAZA İLƏ SİNXRONLAŞDIR</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
