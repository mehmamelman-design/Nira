import React, { useState, useEffect } from 'react';
import { X, Sparkles, Upload, Eye, Save, Image, Tag, DollarSign, FileText, Layers, CheckCircle, Trash2 } from 'lucide-react';
import { MenuItem, CategoryId, HeroConfig } from '../types';
import { formatImageUrl } from '../lib/imageUtils';
import { compressImageFile } from '../lib/imageCompressor';
import { DEFAULT_HERO, DEFAULT_MIDDLE_HERO } from '../lib/cmsStore';

interface AdminEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'logo' | 'menuItem' | 'hero' | 'middleHero';
  logoUrl?: string;
  menuItem?: MenuItem | null;
  heroConfig?: HeroConfig;
  initialSlideIndex?: number;
  onSaveLogo?: (newUrl: string) => Promise<void> | void;
  onSaveMenuItem?: (updatedItem: MenuItem) => Promise<void> | void;
  onDeleteMenuItem?: (itemId: string) => Promise<void> | void;
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
  initialSlideIndex = 0,
  onSaveLogo,
  onSaveMenuItem,
  onDeleteMenuItem,
  onSaveHero,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'cloud'>('info');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedSlideIndex, setSelectedSlideIndex] = useState<number>(0);
  
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
  const [heroSlide1, setHeroSlide1] = useState('');
  const [heroSlide2, setHeroSlide2] = useState('');
  const [heroSlide3, setHeroSlide3] = useState('');
  const [heroSlide4, setHeroSlide4] = useState('');
  // Mobile Hero Fields
  const [mobileHeroSlide1, setMobileHeroSlide1] = useState('');
  const [mobileHeroSlide2, setMobileHeroSlide2] = useState('');
  const [mobileHeroSlide3, setMobileHeroSlide3] = useState('');
  const [mobileHeroSlide4, setMobileHeroSlide4] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (type === 'logo') {
      setImageUrl(logoUrl || '');
    } else if (type === 'hero' || type === 'middleHero') {
      const defaultList = type === 'middleHero' ? DEFAULT_MIDDLE_HERO.images : DEFAULT_HERO.images;
      setHeroTitle(heroConfig?.title || (type === 'middleHero' ? 'Təzə Və Xüsusi Şirniyyatlar, İsti Və Soyuq İçkilər' : 'Qaynar İsti Ocaqdan Qapınıza Çatdırılan Ən Ləzzətli Fast Food'));
      setHeroSubtitle(heroConfig?.subtitle || 'Sizlər üçün xüsusi olaraq hazırlanan təbii içkilər və ləzzətli desertlər');
      
      const imgs = Array.isArray(heroConfig?.images) ? heroConfig.images : [];
      const s1 = imgs[0] !== undefined && imgs[0] !== null ? imgs[0] : (heroConfig?.imageUrl || defaultList[0]);
      const s2 = imgs[1] !== undefined && imgs[1] !== null ? imgs[1] : defaultList[1];
      const s3 = imgs[2] !== undefined && imgs[2] !== null ? imgs[2] : defaultList[2];
      const s4 = imgs[3] !== undefined && imgs[3] !== null ? imgs[3] : defaultList[3];

      setHeroSlide1(s1);
      setHeroSlide2(s2);
      setHeroSlide3(s3);
      setHeroSlide4(s4);

      const mImgs = Array.isArray(heroConfig?.mobileImages) ? heroConfig.mobileImages : [];
      setMobileHeroSlide1(mImgs[0] || '');
      setMobileHeroSlide2(mImgs[1] || '');
      setMobileHeroSlide3(mImgs[2] || '');
      setMobileHeroSlide4(mImgs[3] || '');

      const initIdx = initialSlideIndex ?? 0;
      setSelectedSlideIndex(initIdx);
      const slideVals = [s1, s2, s3, s4];
      setImageUrl(slideVals[initIdx] || '');

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
  }, [type, logoUrl, menuItem, heroConfig, isOpen, initialSlideIndex]);

  if (!isOpen) return null;

  const handleImageUrlChange = (val: string) => {
    setImageUrl(val);
    if (type === 'hero' || type === 'middleHero') {
      if (selectedSlideIndex === 0) setHeroSlide1(val);
      else if (selectedSlideIndex === 1) setHeroSlide2(val);
      else if (selectedSlideIndex === 2) setHeroSlide3(val);
      else if (selectedSlideIndex === 3) setHeroSlide4(val);
    }
  };

  const handlePasteSample = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) handleImageUrlChange(text);
    } catch (e) {
      // Fallback if clipboard permission denied
      const pasted = prompt('Cloudinary / CDN şəkil linkini yapışdırın:');
      if (pasted) handleImageUrlChange(pasted);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (type === 'logo') {
        if (onSaveLogo) {
          await onSaveLogo(formatImageUrl(imageUrl.trim()));
        }
        if (onShowToast) onShowToast('Yuxarı Logo uğurla yeniləndi!');
      } else if (type === 'hero' || type === 'middleHero') {
        if (onSaveHero) {
          const s1 = heroSlide1.trim() ? formatImageUrl(heroSlide1.trim()) : '';
          const s2 = heroSlide2.trim() ? formatImageUrl(heroSlide2.trim()) : '';
          const s3 = heroSlide3.trim() ? formatImageUrl(heroSlide3.trim()) : '';
          const s4 = heroSlide4.trim() ? formatImageUrl(heroSlide4.trim()) : '';
          const slideImgs = [s1, s2, s3, s4];

          const m1 = mobileHeroSlide1.trim() ? formatImageUrl(mobileHeroSlide1.trim()) : '';
          const m2 = mobileHeroSlide2.trim() ? formatImageUrl(mobileHeroSlide2.trim()) : '';
          const m3 = mobileHeroSlide3.trim() ? formatImageUrl(mobileHeroSlide3.trim()) : '';
          const m4 = mobileHeroSlide4.trim() ? formatImageUrl(mobileHeroSlide4.trim()) : '';
          const mobileSlideImgs = [m1, m2, m3, m4];

          await onSaveHero({
            title: heroTitle.trim() || (type === 'middleHero' ? 'Təzə Və Xüsusi Şirniyyatlar, İsti Və Soyuq İçkilər' : 'Qaynar İsti Ocaqdan Qapınıza Çatdırılan Ən Ləzzətli Fast Food'),
            subtitle: heroSubtitle.trim() || 'Sizlər üçün xüsusi olaraq hazırlanan təbii içkilər və ləzzətli desertlər',
            imageUrl: s1,
            images: slideImgs,
            mobileImages: mobileSlideImgs,
            videoUrl: heroVideoUrl.trim(),
            isVideoEnabled: heroIsVideoEnabled
          });
          if (onShowToast) onShowToast(type === 'middleHero' ? 'Orta Slayder Banneri uğurla yeniləndi!' : 'Giriş Slayderi uğurla yeniləndi!');
        }
        if (onShowToast) onShowToast('Hero Banner və 4 Slider Şəkli uğurla yeniləndi!');
      } else if (onSaveMenuItem) {
        const itemToSave: MenuItem = {
          id: menuItem?.id || `item_${Date.now()}`,
          name: name.trim() || 'Yeni Yemək Məhsulu',
          price: typeof price === 'number' ? price : parseFloat(price as string) || 0,
          description: description.trim() || 'Təzə və ləzzətli xammallarla hazırlanan xüsusi təam.',
          category: category,
          ingredients: ingredients.trim() || 'Təzə ərzaqlar, Mozzarella',
          image: formatImageUrl(imageUrl.trim()) || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
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
                        <option value="fastfood">FAST FOOD</option>
                        <option value="pizza">PİZZA</option>
                        <option value="kabablar">KABABLAR</option>
                        <option value="isti_yemekler">İSTİ YEMƏKLƏR</option>
                        <option value="icikil">SOYUQ İÇKİLƏR</option>
                        <option value="sorbalar">ŞORBALAR</option>
                        <option value="salat">SALAT</option>
                        <option value="cig_kofte">ÇİY KÖFTƏ</option>
                        <option value="qelyanaltilar">QƏLYANALTILAR</option>
                        <option value="desertler">DESERTLƏR</option>
                        <option value="kofe">KOFE</option>
                        <option value="kokteyl">KOKTEYL</option>
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

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-extrabold uppercase text-amber-400">
                        Slider Şəkilləri (Kompüter Və Mobil Xüsusi)
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setHeroSlide1(''); setHeroSlide2(''); setHeroSlide3(''); setHeroSlide4('');
                          setMobileHeroSlide1(''); setMobileHeroSlide2(''); setMobileHeroSlide3(''); setMobileHeroSlide4('');
                          setImageUrl('');
                        }}
                        className="text-[11px] text-red-400 hover:text-red-300 font-bold underline cursor-pointer"
                      >
                        Bütün Şəkilləri Sil / Sıfırla
                      </button>
                    </div>
                    <p className="text-[11px] text-zinc-400">
                      Hər slayd üçün Kompüter (Masaüstü) və Mobil (Telefon) şəkillərini ayrı-ayrı təyin edə bilərsiniz. Mobil şəkil daxil edildikdə telefonlarda yalnız mobil şəkil, kompüterdə isə masaüstü şəkil göstəriləcək.
                    </p>

                    <div className="space-y-2.5">
                      {[
                        { id: 1, deskVal: heroSlide1, setDesk: setHeroSlide1, mobVal: mobileHeroSlide1, setMob: setMobileHeroSlide1 },
                        { id: 2, deskVal: heroSlide2, setDesk: setHeroSlide2, mobVal: mobileHeroSlide2, setMob: setMobileHeroSlide2 },
                        { id: 3, deskVal: heroSlide3, setDesk: setHeroSlide3, mobVal: mobileHeroSlide3, setMob: setMobileHeroSlide3 },
                        { id: 4, deskVal: heroSlide4, setDesk: setHeroSlide4, mobVal: mobileHeroSlide4, setMob: setMobileHeroSlide4 },
                      ].map((slide) => (
                        <div key={slide.id} className="bg-black/50 p-2.5 rounded-2xl border border-zinc-800 space-y-2">
                          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-1">
                            <span className="text-xs text-amber-400 font-black">Slayd {slide.id}</span>
                            {(slide.deskVal || slide.mobVal) && (
                              <button
                                type="button"
                                onClick={() => { slide.setDesk(''); slide.setMob(''); }}
                                className="text-[10px] text-red-400 hover:text-red-300 font-bold cursor-pointer"
                              >
                                Sıfırla
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            {/* Desktop Input */}
                            <div className="space-y-1 bg-zinc-900/60 p-2 rounded-xl border border-zinc-800">
                              <span className="text-[10px] text-amber-300 font-extrabold flex items-center gap-1">
                                💻 Kompüter (Masaüstü)
                              </span>
                              <input
                                type="text"
                                value={slide.deskVal}
                                onChange={(e) => slide.setDesk(e.target.value)}
                                placeholder="Kompüter üçün şəkil URL..."
                                className="w-full px-2 py-1 rounded-lg bg-black/80 border border-zinc-700 text-white font-mono text-[11px] focus:border-amber-400 focus:outline-none"
                              />
                              <input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    try {
                                      const compressed = await compressImageFile(file);
                                      slide.setDesk(compressed);
                                      if (onShowToast) onShowToast(`Slayd ${slide.id} Kompüter şəkli yükləndi!`);
                                    } catch (err: any) {
                                      alert(err.message || 'Xəta baş verdi');
                                    }
                                  }
                                }}
                                className="w-full text-[10px] text-zinc-400 file:mr-1 file:py-0.5 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-bold file:bg-amber-400 file:text-black cursor-pointer"
                              />
                            </div>

                            {/* Mobile Input */}
                            <div className="space-y-1 bg-zinc-900/60 p-2 rounded-xl border border-zinc-800">
                              <span className="text-[10px] text-emerald-400 font-extrabold flex items-center gap-1">
                                📱 Telefon (Mobil)
                              </span>
                              <input
                                type="text"
                                value={slide.mobVal}
                                onChange={(e) => slide.setMob(e.target.value)}
                                placeholder="Telefon üçün xüsusi şəkil URL..."
                                className="w-full px-2 py-1 rounded-lg bg-black/80 border border-zinc-700 text-white font-mono text-[11px] focus:border-emerald-400 focus:outline-none"
                              />
                              <input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    try {
                                      const compressed = await compressImageFile(file);
                                      slide.setMob(compressed);
                                      if (onShowToast) onShowToast(`Slayd ${slide.id} Mobil şəkli yükləndi!`);
                                    } catch (err: any) {
                                      alert(err.message || 'Xəta baş verdi');
                                    }
                                  }
                                }}
                                className="w-full text-[10px] text-zinc-400 file:mr-1 file:py-0.5 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-bold file:bg-emerald-500 file:text-black cursor-pointer"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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
              {/* Slide Selector for Hero Sliders */}
              {(type === 'hero' || type === 'middleHero') && (
                <div className="p-2.5 bg-black/60 rounded-2xl border border-amber-500/30 space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[11px] font-black uppercase text-amber-400">
                      Redaktə Edilən Slaydı Seçin:
                    </span>
                    <span className="text-[11px] font-extrabold text-amber-300 bg-amber-900/40 px-2 py-0.5 rounded-md border border-amber-500/30">
                      Slayd {selectedSlideIndex + 1} / 4
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5">
                    {[0, 1, 2, 3].map((idx) => {
                      const slideVals = [heroSlide1, heroSlide2, heroSlide3, heroSlide4];
                      const isSelected = selectedSlideIndex === idx;
                      const hasVal = Boolean(slideVals[idx] && slideVals[idx].trim());

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSelectedSlideIndex(idx);
                            setImageUrl(slideVals[idx] || '');
                          }}
                          className={`py-2 px-1 rounded-xl text-xs font-black transition-all cursor-pointer border flex flex-col items-center justify-center gap-0.5 ${
                            isSelected
                              ? 'bg-amber-400 text-black border-amber-300 shadow-lg scale-[1.02]'
                              : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:text-white'
                          }`}
                        >
                          <span>Slayd {idx + 1}</span>
                          <span className={`text-[9px] font-bold ${isSelected ? 'text-black/80' : 'text-zinc-500'}`}>
                            {hasVal ? '✓ Şəkil var' : 'Standart'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-wider text-amber-400">
                  {(type === 'hero' || type === 'middleHero')
                    ? `SLAYD ${selectedSlideIndex + 1} FOTO LİNKİ VƏ YAZI (CLOUDINARY, DRIVE, FAYL)`
                    : 'ƏSAS FOTO LİNKİ VƏ YAZI (CLOUDINARY, GOOGLE DRIVE, VƏ YA FAYL YÜKLƏ)'}
                </label>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => handleImageUrlChange(e.target.value)}
                    placeholder="https://... və ya fayl yükləyin"
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/80 border border-zinc-700 text-white font-mono text-xs focus:border-amber-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handlePasteSample}
                    className="px-3.5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-400 font-extrabold text-xs flex items-center gap-1.5 border border-zinc-700 shrink-0 cursor-pointer transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Yapışdır</span>
                  </button>
                </div>

                <div className="pt-1">
                  <label className="block text-[11px] font-bold text-zinc-300 mb-1">
                    {(type === 'hero' || type === 'middleHero')
                      ? `Slayd ${selectedSlideIndex + 1} Üçün Kompüterdən / Telefondan Şəkil Yüklə:`
                      : 'Kompüterdən / Telefondan Şəkil Yüklə:'}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        try {
                          const compressed = await compressImageFile(file);
                          handleImageUrlChange(compressed);
                          if (onShowToast) onShowToast(`Slayd ${selectedSlideIndex + 1} şəkli uğurla yükləndi!`);
                        } catch (err: any) {
                          alert(err.message || 'Xəta baş verdi');
                        }
                      }
                    }}
                    className="w-full text-xs text-zinc-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-400 file:text-black hover:file:bg-amber-300 cursor-pointer bg-zinc-900 p-2 rounded-xl border border-zinc-800"
                  />
                </div>
              </div>

              {/* LIVE PREVIEW CONTAINER */}
              <div className="p-3.5 rounded-2xl bg-black/60 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-extrabold text-amber-400">
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-amber-400" />
                    <span>Canlı Önbaxış (Live Preview):</span>
                  </div>
                  {(type === 'hero' || type === 'middleHero') && (
                    <span className="text-[11px] text-zinc-300 font-bold bg-zinc-800 px-2 py-0.5 rounded-md">
                      Slayd {selectedSlideIndex + 1}
                    </span>
                  )}
                </div>

                <div className="w-full h-56 sm:h-64 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 flex items-center justify-center relative">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={`Slide ${selectedSlideIndex + 1} Preview`}
                      className="max-h-full max-w-full object-contain p-2"
                      onError={(e) => {
                        const defaultList = type === 'middleHero' ? DEFAULT_MIDDLE_HERO.images : DEFAULT_HERO.images;
                        (e.target as HTMLImageElement).src = defaultList[selectedSlideIndex] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600';
                      }}
                    />
                  ) : (
                    <div className="text-center p-4">
                      <Image className="w-10 h-10 text-zinc-600 mx-auto mb-2" />
                      <p className="text-xs text-zinc-400 font-bold">
                        {(type === 'hero' || type === 'middleHero')
                          ? `Slayd ${selectedSlideIndex + 1} üçün şəkil linki daxil edilməyib (Standart şəkil göstərilir)`
                          : 'Şəkil daxil edilməyib'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Modal Actions Footer */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="py-3 px-4 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs transition-all cursor-pointer"
              >
                Ləğv Et
              </button>

              {type === 'menuItem' && menuItem && onDeleteMenuItem && (
                <button
                  type="button"
                  onClick={async () => {
                    await onDeleteMenuItem(menuItem.id);
                    onClose();
                  }}
                  className="py-3 px-4 rounded-2xl bg-rose-600/90 hover:bg-rose-600 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-lg"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Məhsulu Sil</span>
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="py-3 px-5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>YADDA SAXLA & SİNXRONLAŞDIR</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
