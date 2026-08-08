import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoriesAndGallerySection } from './components/CategoriesAndGallerySection';
import { MenuSection } from './components/MenuSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { NotificationToast } from './components/NotificationToast';
import { AiAssistantModal } from './components/AiAssistantModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { AuthModal } from './components/AuthModal';
import { AdminEditModal } from './components/AdminEditModal';
import { CartItem, MenuItem, CategoryId } from './types';
import { auth } from './lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import {
  useHeroConfig,
  useCategoryCards,
  useMenuItems,
  useReviews,
  useGalleryPhotos,
  useSiteConfig,
  saveSiteConfig,
  saveMenuItem,
  saveHeroConfig,
  deleteMenuItem
} from './lib/cmsStore';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'menu'>('home');
  const [selectedMenuCategory, setSelectedMenuCategory] = useState<CategoryId>('all');
  const [isSetView, setIsSetView] = useState<boolean>(false);
  const [activeSetTitle, setActiveSetTitle] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Admin Quick Edit Modal State
  const [adminEditState, setAdminEditState] = useState<{
    isOpen: boolean;
    type: 'logo' | 'menuItem' | 'hero';
    menuItem?: MenuItem | null;
  }>({
    isOpen: false,
    type: 'logo',
    menuItem: null,
  });

  // Auth User state to check if mehmamelman@gmail.com is logged in
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
    });
    return () => unsub();
  }, []);

  const storedUser = localStorage.getItem('alov_user');
  let localEmail = '';
  if (storedUser) {
    try {
      localEmail = JSON.parse(storedUser)?.email?.toLowerCase() || '';
    } catch (e) {}
  }
  const currentEmail = authUser?.email?.toLowerCase() || localEmail;
  const isAdmin = currentEmail === 'mehmamelman@gmail.com' || currentEmail === 'admin@alov.az' || currentEmail === 'admin';

  // Firestore Real-time Subscriptions
  const { siteConfig } = useSiteConfig();
  const { config: heroConfig } = useHeroConfig();
  const { categories } = useCategoryCards();
  const { items: menuItems } = useMenuItems();
  const { reviews } = useReviews();
  const { photos: galleryPhotos } = useGalleryPhotos();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleOpenMenuWithCategory = (catId: CategoryId = 'all') => {
    setSelectedMenuCategory(catId);
    setIsSetView(false);
    setActiveSetTitle(null);
    setCurrentView('menu');
    setActiveSection('menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenMenuWithSet = (setObj: { id: string; title: string; categoryId: CategoryId; description: string; imageUrl: string }) => {
    setSelectedMenuCategory(setObj.categoryId);
    setIsSetView(true);
    setActiveSetTitle(setObj.title);
    setCurrentView('menu');
    setActiveSection('menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (item: MenuItem, option?: string, notes?: string, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (ci) => ci.menuItem.id === item.id && ci.selectedOption === option && ci.notes === notes
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { menuItem: item, quantity, selectedOption: option, notes }];
    });

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.menuItem.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.menuItem.id !== itemId));
    showToast('Məhsul səbətdən silindi.');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'menu') {
      handleOpenMenuWithCategory('all');
      return;
    }

    if (currentView === 'menu') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
      return;
    }

    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b291d] text-white flex flex-col font-sans selection:bg-emerald-300 selection:text-black">
      
      {/* Sticky Top Navbar */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenAdminPanel={() => setIsAdminModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenEditLogo={() => setAdminEditState({ isOpen: true, type: 'logo' })}
        isAdmin={isAdmin}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' ? (
          <>
            {/* 1. Hero Banner */}
            <Hero
              heroConfig={heroConfig}
              onOrderNow={() => handleOpenMenuWithCategory('all')}
              onOpenReviews={() => scrollToSection('reviews')}
              onOpenAiAssistant={() => setIsAiModalOpen(true)}
              isAdmin={isAdmin}
              onEditHero={() =>
                setAdminEditState({ isOpen: true, type: 'hero' })
              }
            />

            {/* 2. 6 Category Blocks & Gallery (No individual food cards on homepage!) */}
            <CategoriesAndGallerySection
              categories={categories}
              galleryPhotos={galleryPhotos}
              onSelectCategory={(catId) => handleOpenMenuWithCategory(catId)}
              onSelectSet={handleOpenMenuWithSet}
            />

            {/* 3. Customer Reviews Section */}
            <ReviewsSection reviews={reviews} />

            {/* 4. FAQ Section */}
            <FaqSection />

            {/* 5. Address, Contact & Map Section */}
            <ContactSection />
          </>
        ) : (
          /* Dedicated Standalone Menu View */
          <MenuSection
            menuItems={menuItems}
            categoryCards={categories}
            selectedCategory={selectedMenuCategory}
            onAddToCart={handleAddToCart}
            onCategoryChange={(cat) => {
              setSelectedMenuCategory(cat);
              setIsSetView(false);
              setActiveSetTitle(null);
            }}
            onBackToHome={() => {
              setIsSetView(false);
              setActiveSetTitle(null);
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            isAdmin={isAdmin}
            onEditMenuItem={(item) =>
              setAdminEditState({ isOpen: true, type: 'menuItem', menuItem: item })
            }
            onDeleteMenuItem={async (itemId) => {
              await deleteMenuItem(itemId);
              showToast('Məhsul bazadan silindi.');
            }}
            onAddNewMenuItem={() =>
              setAdminEditState({ isOpen: true, type: 'menuItem', menuItem: null })
            }
            isSetView={isSetView}
            setTitle={activeSetTitle || undefined}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Admin Quick Edit Modal (Logo, Food Items & Hero Cloudinary Upload Modal) */}
      <AdminEditModal
        isOpen={adminEditState.isOpen}
        onClose={() => setAdminEditState((prev) => ({ ...prev, isOpen: false }))}
        type={adminEditState.type}
        logoUrl={siteConfig.logoUrl}
        menuItem={adminEditState.menuItem}
        heroConfig={heroConfig}
        onSaveLogo={async (newUrl) => {
          await saveSiteConfig({ ...siteConfig, logoUrl: newUrl });
        }}
        onSaveMenuItem={async (updatedItem) => {
          await saveMenuItem(updatedItem);
        }}
        onDeleteMenuItem={async (itemId) => {
          await deleteMenuItem(itemId);
          showToast('Məhsul bazadan silindi.');
        }}
        onSaveHero={async (updatedHero) => {
          await saveHeroConfig(updatedHero);
        }}
        onShowToast={showToast}
      />

      {/* User Auth / Registration Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onOpenAdminPanel={() => setIsAdminModalOpen(true)}
        onShowToast={showToast}
      />

      {/* Admin Panel Modal */}
      <AdminPanelModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        heroConfig={heroConfig}
        categories={categories}
        menuItems={menuItems}
        reviews={reviews}
        galleryPhotos={galleryPhotos}
        onShowToast={showToast}
      />

      {/* AI Assistant Modal */}
      <AiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onAddToCart={handleAddToCart}
        onGoToMenu={() => handleOpenMenuWithCategory('all')}
      />

      {/* Shopping Cart Slide-over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Notification Toast */}
      <NotificationToast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

    </div>
  );
}
