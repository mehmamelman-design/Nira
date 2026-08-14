import React, { useState, useEffect } from 'react';
import { Flame, ShoppingBag, Phone, Menu, X, MessageCircle, User, ShieldCheck, Lock, Pencil, Search } from 'lucide-react';
import { CartItem } from '../types';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { useSiteConfig } from '../lib/cmsStore';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenAdminPanel?: () => void;
  onOpenAuthModal?: () => void;
  onOpenEditLogo?: () => void;
  onOpenSearch?: () => void;
  isAdmin?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  onOpenCart,
  activeSection,
  onNavigate,
  onOpenAdminPanel,
  onOpenAuthModal,
  onOpenEditLogo,
  onOpenSearch,
  isAdmin: propIsAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);
  const { siteConfig } = useSiteConfig();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setAuthUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Check if current user is admin (mehmamelman@gmail.com or prop or local storage)
  const storedUser = localStorage.getItem('alov_user');
  let localEmail = '';
  if (storedUser) {
    try {
      localEmail = JSON.parse(storedUser)?.email?.toLowerCase() || '';
    } catch (e) {}
  }
  const currentEmail = authUser?.email?.toLowerCase() || localEmail;
  const isAdmin = propIsAdmin || currentEmail === 'mehmamelman@gmail.com' || currentEmail === 'admin@alov.az' || currentEmail === 'admin';

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const navLinks = [
    { id: 'menu', label: 'Menyu' },
    { id: 'reviews', label: 'Rəylər' },
    { id: 'contact', label: 'Ünvan və Əlaqə' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Notice Bar */}
      <div className="bg-amber-400 text-black font-extrabold text-[11px] sm:text-xs py-1.5 overflow-hidden shadow-sm border-b border-amber-500">
        <div className="animate-marquee items-center gap-8">
          <div className="flex items-center gap-2">
            <Flame className="w-3.5 h-3.5 fill-black text-black shrink-0" />
            <span className="whitespace-nowrap tracking-wide">Sifariş edin və ləzzətli yeməklərimizin dadına baxın</span>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="w-3.5 h-3.5 fill-black text-black shrink-0" />
            <span className="whitespace-nowrap tracking-wide">Sifariş edin və ləzzətli yeməklərimizin dadına baxın</span>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="w-3.5 h-3.5 fill-black text-black shrink-0" />
            <span className="whitespace-nowrap tracking-wide">Sifariş edin və ləzzətli yeməklərimizin dadına baxın</span>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="w-3.5 h-3.5 fill-black text-black shrink-0" />
            <span className="whitespace-nowrap tracking-wide">Sifariş edin və ləzzətli yeməklərimizin dadına baxın</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-200/80 transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between min-h-[48px] py-1">
            
            {/* Logo */}
            <div className="relative flex items-center gap-2 group -ml-2 sm:-ml-3">
              <button 
                onClick={() => handleNavClick('hero')}
                className="flex items-center group focus:outline-none cursor-pointer"
                aria-label="Ana Səhifə"
              >
                <img
                  src={siteConfig?.logoUrl || 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786350661/Ba%C5%9Fl%C4%B1qs%C4%B1z_dizayn-Photoroom_1_l3cpaz.png'}
                  alt={siteConfig?.siteName || "NIRA-Fest&Food Restorani Logo"}
                  className="h-[52px] sm:h-[64px] w-auto object-contain max-w-[260px] sm:max-w-[340px] scale-[2.0] sm:scale-[2.2] origin-left group-hover:scale-[2.3] transition-transform duration-300"
                />
              </button>

              {isAdmin && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onOpenEditLogo) onOpenEditLogo();
                  }}
                  className="p-1.5 rounded-lg bg-amber-400 text-black hover:bg-amber-300 font-extrabold shadow-md transition-all cursor-pointer flex items-center gap-1 text-[10px] sm:text-xs shrink-0"
                  title="Yuxarı Logonu Dəyiş"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logo Edit</span>
                </button>
              )}
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-sm font-bold transition-all duration-200 hover:text-emerald-700 relative py-1 ${
                    activeSection === link.id ? 'text-emerald-800 font-black' : 'text-zinc-700'
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 rounded-full" />
                  )}
                </button>
              ))}
            </nav>

            {/* Right Action Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Phone call quick button */}
              <a
                href="tel:+994516359474"
                className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold hover:bg-emerald-100 transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-700" />
                <span>(051) 635 94 74</span>
              </a>

              {/* Search Button (Clean icon) */}
              <button
                onClick={() => {
                  if (onOpenSearch) onOpenSearch();
                  else handleNavClick('menu');
                }}
                className="flex items-center justify-center p-2 rounded-xl text-zinc-700 hover:text-emerald-800 hover:bg-zinc-100 transition-all duration-200 cursor-pointer"
                title="Axtarış"
                aria-label="Axtarış"
              >
                <Search className="w-5 h-5 stroke-[2]" />
              </button>

              {/* Profile / Registration Button (Clean icon) */}
              <button
                onClick={onOpenAuthModal}
                className="flex items-center justify-center p-2 rounded-xl text-zinc-700 hover:text-emerald-800 hover:bg-zinc-100 transition-all duration-200 cursor-pointer overflow-hidden"
                title={authUser ? (authUser.displayName || authUser.email || "Şəxsi Kabinet") : "Qeydiyyat və Giriş"}
                aria-label="Qeydiyyat və Giriş"
              >
                {authUser?.photoURL ? (
                  <img src={authUser.photoURL} alt="Profile" className="w-5 h-5 rounded-full object-cover" />
                ) : authUser?.displayName ? (
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-black text-[10px] flex items-center justify-center">
                    {authUser.displayName.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <User className="w-5 h-5 stroke-[2]" />
                )}
              </button>

              {/* Cart Button with Dynamic Total AZN Price */}
              <button
                onClick={onOpenCart}
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 border border-emerald-700 text-white hover:bg-emerald-700 transition-all duration-200 cursor-pointer shadow-sm"
                aria-label="Səbət"
              >
                <ShoppingBag className="w-4 h-4 text-white stroke-[2]" />
                <span className="px-2 py-0.5 rounded-full bg-white text-black border border-zinc-200 flex items-center justify-center text-[11px] font-black shadow-xs min-w-[28px]">
                  {totalCartPrice > 0 ? `${totalCartPrice.toFixed(2)} ₼` : '0 ₼'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-emerald-50 border-b border-emerald-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                    activeSection === link.id
                      ? 'bg-emerald-200/80 text-emerald-950 border border-emerald-300'
                      : 'text-zinc-800 hover:bg-emerald-100'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="pt-2 border-t border-emerald-200 flex flex-col gap-2">
              <a
                href="tel:+994516359474"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white border border-emerald-300 text-emerald-900 text-sm font-bold"
              >
                <Phone className="w-4 h-4 text-emerald-700" />
                <span>Zəng Et: (051) 635 94 74</span>
              </a>
              <a
                href="https://wa.me/994516359474?text=Salam!%20Sifaris%20vermek%20isteyirem"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 text-white text-sm font-bold shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>WhatsApp İlə Birbaşa Sifariş</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

