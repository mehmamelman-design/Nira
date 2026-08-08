import React, { useState, useEffect } from 'react';
import { Flame, ShoppingBag, Phone, Menu, X, MessageCircle, User, ShieldCheck, Lock, Pencil } from 'lucide-react';
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
      <header className="sticky top-0 z-40 bg-[#0b291d]/95 backdrop-blur-md border-b border-emerald-900/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between min-h-[48px] py-1">
            
            {/* Logo */}
            <div className="relative flex items-center gap-2 group">
              <button 
                onClick={() => handleNavClick('hero')}
                className="flex items-center group focus:outline-none cursor-pointer"
                aria-label="Ana Səhifə"
              >
                {siteConfig?.logoUrl ? (
                  <img
                    src={siteConfig.logoUrl}
                    alt={siteConfig.siteName || "Alov Fast Food Logo"}
                    className="h-[60px] sm:h-[72px] w-auto object-contain max-w-[240px] group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-[60px] h-[60px] sm:w-[72px] sm:h-[72px] rounded-2xl bg-white flex items-center justify-center text-emerald-950 shadow-lg group-hover:scale-105 transition-transform duration-300 shrink-0">
                    <Flame className="w-10 h-10 fill-emerald-950 text-emerald-950" />
                  </div>
                )}
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
                  className={`text-sm font-bold transition-all duration-200 hover:text-white relative py-1 ${
                    activeSection === link.id ? 'text-white font-black' : 'text-emerald-100/80'
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full" />
                  )}
                </button>
              ))}
            </nav>

            {/* Right Action Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Phone call quick button */}
              <a
                href="tel:+994501234567"
                className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-950 border border-emerald-800 text-white text-xs font-semibold hover:border-white transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-white" />
                <span>+994 50 123 45 67</span>
              </a>

              {/* Profile / Registration Button */}
              <button
                onClick={onOpenAuthModal}
                className="flex items-center justify-center p-1.5 rounded-xl bg-emerald-950 border border-emerald-800 text-white hover:border-white transition-all duration-200 cursor-pointer overflow-hidden"
                title={authUser ? (authUser.displayName || authUser.email || "Şəxsi Kabinet") : "Qeydiyyat və Giriş"}
                aria-label="Qeydiyyat və Giriş"
              >
                {authUser?.photoURL ? (
                  <img src={authUser.photoURL} alt="Profile" className="w-5 h-5 rounded-full object-cover" />
                ) : authUser?.displayName ? (
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-black font-black text-[10px] flex items-center justify-center">
                    {authUser.displayName.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <User className="w-4 h-4 text-white stroke-[2]" />
                )}
              </button>

              {/* Cart Button with Circle Count */}
              <button
                onClick={onOpenCart}
                className="flex items-center justify-center gap-2 px-2.5 py-1.5 rounded-xl bg-emerald-950 border border-emerald-800 text-white hover:border-white transition-all duration-200 cursor-pointer"
                aria-label="Səbət"
              >
                <ShoppingBag className="w-4 h-4 text-white stroke-[2]" />
                <span className="w-5 h-5 rounded-full bg-black border border-white/40 flex items-center justify-center text-[11px] font-extrabold text-white">
                  {totalCartCount}
                </span>
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex items-center justify-center p-2 rounded-xl bg-emerald-950 border border-emerald-800 text-white lg:hidden cursor-pointer"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4 text-white stroke-[2]" /> : <Menu className="w-4 h-4 text-white stroke-[2]" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0b291d] border-b border-emerald-900 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    activeSection === link.id
                      ? 'bg-white/20 text-white border border-white/30'
                      : 'text-emerald-100 hover:bg-emerald-900'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="pt-2 border-t border-emerald-900 flex flex-col gap-2">
              <a
                href="tel:+994501234567"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-950 border border-emerald-800 text-white text-sm font-semibold"
              >
                <Phone className="w-4 h-4 text-white" />
                <span>Zəng Et: +994 50 123 45 67</span>
              </a>
              <a
                href="https://wa.me/994501234567?text=Salam!%20Sifaris%20vermek%20isteyirem"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-700 text-white text-sm font-semibold"
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

