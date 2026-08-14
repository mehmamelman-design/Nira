import React, { useState, useEffect, useMemo } from 'react';
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
import { SearchModal } from './components/SearchModal';
import { SplashScreen } from './components/SplashScreen';
import { CartItem, MenuItem, CategoryId, CategoryCard } from './types';
import { auth } from './lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import {
  useHeroConfig,
  useMiddleHeroConfig,
  useCategoryCards,
  useMenuItems,
  useReviews,
  useGalleryPhotos,
  useSiteConfig,
  saveSiteConfig,
  saveMenuItem,
  saveHeroConfig,
  saveMiddleHeroConfig,
  saveCategory,
  deleteMenuItem
} from './lib/cmsStore';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'menu'>('home');
  const [selectedMenuCategory, setSelectedMenuCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSetView, setIsSetView] = useState<boolean>(false);
  const [activeSetTitle, setActiveSetTitle] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Track open states with ref so popstate event listener always accesses latest values without stale closures
  const historyRef = React.useRef({
    isCartOpen,
    isAiModalOpen,
    isAdminModalOpen,
    isAuthModalOpen,
    isSearchModalOpen,
    isAdminEditOpen: false,
    currentView,
    selectedMenuCategory,
    isSetView,
    activeSetTitle,
  });

  // Admin Quick Edit Modal State
  const [adminEditState, setAdminEditState] = useState<{
    isOpen: boolean;
    type: 'logo' | 'menuItem' | 'hero' | 'middleHero' | 'categoryHero';
    menuItem?: MenuItem | null;
    categoryCard?: CategoryCard | null;
    slideIndex?: number;
  }>({
    isOpen: false,
    type: 'logo',
    menuItem: null,
    categoryCard: null,
    slideIndex: 0,
  });

  useEffect(() => {
    historyRef.current = {
      isCartOpen,
      isAiModalOpen,
      isAdminModalOpen,
      isAuthModalOpen,
      isSearchModalOpen,
      isAdminEditOpen: adminEditState.isOpen,
      currentView,
      selectedMenuCategory,
      isSetView,
      activeSetTitle,
    };
  });

  // Setup initial history state and popstate listener for back/forward buttons
  useEffect(() => {
    if (!window.history.state) {
      window.history.replaceState({ view: 'home' }, '');
    }

    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;
      const cur = historyRef.current;

      // 1. If any popup/modal was open, close it first without navigating away
      if (cur.isAdminEditOpen) {
        setAdminEditState((prev) => ({ ...prev, isOpen: false }));
        return;
      }
      if (cur.isAdminModalOpen) {
        setIsAdminModalOpen(false);
        return;
      }
      if (cur.isAuthModalOpen) {
        setIsAuthModalOpen(false);
        return;
      }
      if (cur.isAiModalOpen) {
        setIsAiModalOpen(false);
        return;
      }
      if (cur.isSearchModalOpen) {
        setIsSearchModalOpen(false);
        return;
      }
      if (cur.isCartOpen) {
        setIsCartOpen(false);
        return;
      }

      // 2. Navigate based on history state
      if (state && state.view === 'menu') {
        setCurrentView('menu');
        setSelectedMenuCategory(state.category || 'all');
        setIsSetView(!!state.isSetView);
        setActiveSetTitle(state.setTitle || null);
        setActiveSection('menu');
      } else {
        // Return to home view
        setCurrentView('home');
        setSelectedMenuCategory('all');
        setIsSetView(false);
        setActiveSetTitle(null);
        setActiveSection('hero');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleSelectSearchItem = (item: MenuItem) => {
    window.history.pushState({ view: 'menu', category: item.category, isSetView: false, setTitle: null }, '');
    setCurrentView('menu');
    setSelectedMenuCategory((item.category as any) || 'all');
    setHighlightedItemId(item.id);
    setSearchQuery('');
    setIsSetView(false);
    setActiveSetTitle(null);
    setTimeout(() => {
      const el = document.getElementById(`food-card-${item.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        window.scrollTo({ top: 300, behavior: 'smooth' });
      }
    }, 150);
  };

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
  const { middleHeroConfig } = useMiddleHeroConfig();
  const { categories } = useCategoryCards();
  const { items: menuItems } = useMenuItems();
  const { reviews } = useReviews();
  const { photos: galleryPhotos } = useGalleryPhotos();

  // Fast preloading array for instant image rendering after splash screen
  const preloadImages = useMemo(() => {
    const urls: string[] = [];
    if (siteConfig?.logoUrl) urls.push(siteConfig.logoUrl);
    if (heroConfig?.imageUrl) urls.push(heroConfig.imageUrl);
    if (heroConfig?.images) urls.push(...heroConfig.images);
    if (middleHeroConfig?.imageUrl) urls.push(middleHeroConfig.imageUrl);
    if (middleHeroConfig?.images) urls.push(...middleHeroConfig.images);
    
    if (categories) {
      categories.forEach((c) => {
        if (c.image) urls.push(c.image);
        if (c.images) urls.push(...c.images);
      });
    }
    if (menuItems) {
      menuItems.forEach((m) => {
        if (m.image) urls.push(m.image);
      });
    }
    return Array.from(new Set(urls.filter(Boolean)));
  }, [siteConfig, heroConfig, middleHeroConfig, categories, menuItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleOpenMenuWithCategory = (catId: CategoryId = 'all') => {
    window.history.pushState({ view: 'menu', category: catId, isSetView: false, setTitle: null }, '');
    setSelectedMenuCategory(catId);
    setSearchQuery('');
    setIsSetView(false);
    setActiveSetTitle(null);
    setCurrentView('menu');
    setActiveSection('menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() && currentView !== 'menu') {
      window.history.pushState({ view: 'menu', category: 'all', isSetView: false, setTitle: null }, '');
      setSelectedMenuCategory('all');
      setIsSetView(false);
      setActiveSetTitle(null);
      setCurrentView('menu');
      setActiveSection('menu');
    }
  };

  const handleOpenMenuWithSet = (setObj: { id: string; title: string; categoryId: CategoryId; description: string; imageUrl: string }) => {
    window.history.pushState({ view: 'menu', category: setObj.categoryId, isSetView: true, setTitle: setObj.title }, '');
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
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Initial 3-4s White Splash Loading Screen */}
      <SplashScreen
        imageUrlsToPreload={preloadImages}
      />

      {/* Sticky Top Navbar */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => {
          window.history.pushState({ modal: 'cart' }, '');
          setIsCartOpen(true);
        }}
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenAdminPanel={() => {
          window.history.pushState({ modal: 'admin' }, '');
          setIsAdminModalOpen(true);
        }}
        onOpenAuthModal={() => {
          window.history.pushState({ modal: 'auth' }, '');
          setIsAuthModalOpen(true);
        }}
        onOpenEditLogo={() => {
          window.history.pushState({ modal: 'adminEdit' }, '');
          setAdminEditState({ isOpen: true, type: 'logo' });
        }}
        onOpenSearch={() => {
          window.history.pushState({ modal: 'search' }, '');
          setIsSearchModalOpen(true);
        }}
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
              onOpenAiAssistant={() => {
                window.history.pushState({ modal: 'ai' }, '');
                setIsAiModalOpen(true);
              }}
              isAdmin={isAdmin}
              onEditHero={(idx) => {
                window.history.pushState({ modal: 'adminEdit' }, '');
                setAdminEditState({ isOpen: true, type: 'hero', slideIndex: idx ?? 0 });
              }}
            />

            {/* 2. Category Blocks with Hero Slider middle banner & Gallery */}
            <CategoriesAndGallerySection
              categories={categories}
              galleryPhotos={galleryPhotos}
              onSelectCategory={(catId) => handleOpenMenuWithCategory(catId)}
              onSelectSet={handleOpenMenuWithSet}
              onSearch={handleSearch}
              searchQuery={searchQuery}
              middleHeroConfig={middleHeroConfig}
              isAdmin={isAdmin}
              onOrderNow={() => handleOpenMenuWithCategory('all')}
              onOpenReviews={() => scrollToSection('reviews')}
              onOpenAiAssistant={() => {
                window.history.pushState({ modal: 'ai' }, '');
                setIsAiModalOpen(true);
              }}
              onEditMiddleHero={(idx) => {
                window.history.pushState({ modal: 'adminEdit' }, '');
                setAdminEditState({ isOpen: true, type: 'middleHero', slideIndex: idx ?? 0 });
              }}
              onEditCategory={(catCard) => {
                window.history.pushState({ modal: 'adminEdit' }, '');
                setAdminEditState({ isOpen: true, type: 'categoryHero', categoryCard: catCard, slideIndex: 0 });
              }}
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
            initialSearchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            onAddToCart={handleAddToCart}
            onCategoryChange={(cat) => {
              window.history.pushState({ view: 'menu', category: cat, isSetView: false, setTitle: null }, '');
              setSelectedMenuCategory(cat);
              setIsSetView(false);
              setActiveSetTitle(null);
            }}
            onBackToHome={() => {
              if (window.history.state && window.history.state.view === 'menu') {
                window.history.back();
              } else {
                setIsSetView(false);
                setActiveSetTitle(null);
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            isAdmin={isAdmin}
            onEditMenuItem={(item) => {
              window.history.pushState({ modal: 'adminEdit' }, '');
              setAdminEditState({ isOpen: true, type: 'menuItem', menuItem: item });
            }}
            onDeleteMenuItem={async (itemId) => {
              await deleteMenuItem(itemId);
              showToast('Məhsul bazadan silindi.');
            }}
            onAddNewMenuItem={() => {
              window.history.pushState({ modal: 'adminEdit' }, '');
              setAdminEditState({ isOpen: true, type: 'menuItem', menuItem: null });
            }}
            isSetView={isSetView}
            setTitle={activeSetTitle || undefined}
            highlightedItemId={highlightedItemId}
            onEditCategoryBanner={(catId, slideIndex) => {
              const existingCat = categories.find((c) => c.id === catId);
              const catName = categories.find((c) => c.id === catId)?.name || catId;
              const catCard: CategoryCard = existingCat || {
                id: catId,
                name: catName,
                image: '',
                images: [],
                mobileImages: [],
                description: ''
              };
              window.history.pushState({ modal: 'adminEdit' }, '');
              setAdminEditState({
                isOpen: true,
                type: 'categoryHero',
                categoryCard: catCard,
                slideIndex
              });
            }}
          />
        )}
      </main>

      {/* Live Top Search Popup Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        menuItems={menuItems}
        onSelectItem={handleSelectSearchItem}
      />

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        onSelectCategory={handleOpenMenuWithCategory}
      />

      {/* Admin Quick Edit Modal (Logo, Food Items & Hero Cloudinary Upload Modal) */}
      <AdminEditModal
        isOpen={adminEditState.isOpen}
        onClose={() => setAdminEditState((prev) => ({ ...prev, isOpen: false }))}
        type={adminEditState.type}
        logoUrl={siteConfig.logoUrl}
        menuItem={adminEditState.menuItem}
        heroConfig={adminEditState.type === 'middleHero' ? middleHeroConfig : heroConfig}
        categoryCard={adminEditState.categoryCard}
        initialSlideIndex={adminEditState.slideIndex ?? 0}
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
          if (adminEditState.type === 'middleHero') {
            await saveMiddleHeroConfig(updatedHero);
          } else {
            await saveHeroConfig(updatedHero);
          }
        }}
        onSaveCategory={async (updatedCat) => {
          await saveCategory(updatedCat);
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
