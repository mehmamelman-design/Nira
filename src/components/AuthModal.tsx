import React, { useState, useEffect } from 'react';
import { X, User, Phone, Mail, Lock, LogOut, ShoppingBag, MapPin, ShieldCheck, Instagram, ArrowRight, CheckCircle2 } from 'lucide-react';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdminPanel?: () => void;
  onShowToast?: (msg: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onOpenAdminPanel,
  onShowToast
}) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [localUser, setLocalUser] = useState<{
    fullName: string;
    phone: string;
    email: string;
    photoURL?: string;
  } | null>(null);

  const [emailInput, setEmailInput] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');
  const [fullNameInput, setFullNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      if (user) {
        const uData = {
          fullName: user.displayName || user.email?.split('@')[0] || 'İstifadəçi',
          phone: user.phoneNumber || '',
          email: user.email || '',
          photoURL: user.photoURL || undefined
        };
        setLocalUser(uData);
        localStorage.setItem('alov_user', JSON.stringify(uData));
      }
    });

    // Also check localStorage fallback
    const savedUser = localStorage.getItem('alov_user');
    if (savedUser && !auth.currentUser) {
      try {
        setLocalUser(JSON.parse(savedUser));
      } catch (e) {
        console.error(e);
      }
    }

    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  const currentUser = firebaseUser
    ? {
        fullName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'İstifadəçi',
        phone: firebaseUser.phoneNumber || localUser?.phone || '',
        email: firebaseUser.email || '',
        photoURL: firebaseUser.photoURL || undefined
      }
    : localUser;

  // Google Sign In via Firebase Popup
  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      if (onShowToast) {
        onShowToast(`Xoş gəldiniz, ${user.displayName || 'İstifadəçi'}!`);
      }
      onClose();
    } catch (error: any) {
      console.error("Google sign in error:", error);
      if (error.code !== 'auth/popup-closed-by-user') {
        alert(`Google ilə giriş xətası: ${error.message || 'Yenidən cəhd edin.'}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Email Quick Login / Continue
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    if (emailInput.trim().toLowerCase() === 'admin' && passwordInput === '1234') {
      onClose();
      if (onOpenAdminPanel) onOpenAdminPanel();
      return;
    }

    const userData = {
      fullName: fullNameInput.trim() || emailInput.split('@')[0],
      phone: phoneInput.trim() || '',
      email: emailInput.trim(),
    };

    localStorage.setItem('alov_user', JSON.stringify(userData));
    setLocalUser(userData);
    if (onShowToast) {
      onShowToast(`Xoş gəldiniz, ${userData.fullName}!`);
    }
    onClose();
  };

  // Sign out
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
    }
    localStorage.removeItem('alov_user');
    setLocalUser(null);
    setFirebaseUser(null);
    if (onShowToast) {
      onShowToast('Hesabdan çıxış edildi.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#121417] border border-white/10 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl text-white relative">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#17191e]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-black flex items-center justify-center font-black shadow-md">
              <User className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight text-white">
                {currentUser ? 'Şəxsi Kabinet' : 'Giriş və Qeydiyyat'}
              </h3>
              {currentUser && (
                <p className="text-xs text-emerald-200/80">
                  Sifarişləriniz və profil məlumatlarınız
                </p>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-black/40 border border-white/10 hover:border-white text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          
          {/* LOGGED IN USER PROFILE */}
          {currentUser ? (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-[#1c2026] border border-white/10 text-center space-y-3">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.fullName}
                    className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-amber-400 shadow-xl"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-amber-400 text-black font-black text-2xl flex items-center justify-center mx-auto shadow-lg">
                    {currentUser.fullName.charAt(0).toUpperCase()}
                  </div>
                )}

                <div>
                  <h4 className="text-xl font-black text-white">{currentUser.fullName}</h4>
                  {currentUser.email && <p className="text-xs text-emerald-300/80 font-medium">{currentUser.email}</p>}
                  {currentUser.phone && <p className="text-xs text-emerald-200/60 mt-0.5">{currentUser.phone}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-emerald-200">
                    <ShoppingBag className="w-4 h-4 text-amber-400" /> Tamamlanmış Sifarişlər:
                  </span>
                  <span className="font-extrabold text-white">0 sifariş</span>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-emerald-200">
                    <MapPin className="w-4 h-4 text-amber-400" /> Çatdırılma Ünvanı:
                  </span>
                  <span className="font-bold text-emerald-300">Bakı şəhəri</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                {onOpenAdminPanel && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenAdminPanel();
                    }}
                    className="flex-1 py-3 px-4 rounded-2xl bg-amber-400 hover:bg-amber-500 text-black font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
                  >
                    <ShieldCheck className="w-4 h-4" /> Admin Paneli
                  </button>
                )}

                <button
                  onClick={handleLogout}
                  className="flex-1 py-3 px-4 rounded-2xl bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-200 font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" /> Çıxış Et
                </button>
              </div>
            </div>
          ) : (
            /* AUTH OPTIONS LIST */
            <div className="space-y-3.5">
              
              {/* 1. Google ilə davam et */}
              <button
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#1e2229] hover:bg-[#282d37] border border-white/10 text-white font-bold text-sm flex items-center justify-center gap-3 shadow-md transition-all cursor-pointer group disabled:opacity-50"
              >
                {/* Official Google Icon SVG */}
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Google ilə davam et</span>
              </button>

              {/* 2. Bizi izləməyə başla (Instagram) */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl bg-[#1e2229] hover:bg-[#282d37] border border-white/10 text-white font-bold text-sm flex items-center justify-center gap-3 shadow-md transition-all cursor-pointer"
              >
                <Instagram className="w-5 h-5 text-pink-500" />
                <span>Bizi izləməyə başla</span>
              </a>

              {/* 3. Telefon ilə davam et */}
              <button
                onClick={() => {
                  setShowPhoneForm(!showPhoneForm);
                  setShowEmailForm(false);
                }}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#1e2229] hover:bg-[#282d37] border border-white/10 text-white font-bold text-sm flex items-center justify-center gap-3 shadow-md transition-all cursor-pointer"
              >
                <Phone className="w-5 h-5 text-emerald-400" />
                <span>Telefon ilə davam et</span>
              </button>

              {/* Phone Form Expansion */}
              {showPhoneForm && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!phoneInput.trim()) return;
                    const uData = {
                      fullName: fullNameInput.trim() || 'Müştəri',
                      phone: phoneInput.trim(),
                      email: ''
                    };
                    localStorage.setItem('alov_user', JSON.stringify(uData));
                    setLocalUser(uData);
                    if (onShowToast) onShowToast(`Uğurla giriş edildi!`);
                    onClose();
                  }}
                  className="p-4 rounded-2xl bg-black/60 border border-emerald-900 space-y-3 animate-in fade-in"
                >
                  <input
                    type="tel"
                    required
                    placeholder="+994 (50) 000-00-00"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-amber-400 text-black font-black text-xs shadow-md"
                  >
                    Təsdiqlə və Daxil Ol
                  </button>
                </form>
              )}

              {/* VƏ YA Divider */}
              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <span className="relative px-3 bg-[#121417] text-[11px] font-extrabold text-emerald-300/60 uppercase tracking-widest">
                  VƏ YA
                </span>
              </div>

              {/* 4. E-poçt ünvanı / Davam et */}
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="E-poçt ünvanı"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#1b1e24] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                {showEmailForm && (
                  <div className="space-y-3 pt-1 animate-in fade-in">
                    <input
                      type="password"
                      placeholder="Şifrə (İstəyə bağlı)"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-2xl bg-[#1b1e24] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  onClick={() => {
                    if (!showEmailForm && emailInput.trim()) {
                      setShowEmailForm(true);
                    }
                  }}
                  className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-gray-200 text-black font-black text-sm shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Davam et</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
