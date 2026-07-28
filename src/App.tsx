import React, { useState, useEffect } from 'react';
import { Product, UserRole, UserProfile, DataAdapter, AuditLog, AIModelConfig } from './types';
import { INITIAL_PRODUCTS, INITIAL_DATA_ADAPTERS, INITIAL_AUDIT_LOGS } from './data/mockProducts';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { AIRecommendationAssistant } from './components/AIRecommendationAssistant';
import { DataPipelineManager } from './components/DataPipelineManager';
import { AnalyticsDashboardView } from './components/AnalyticsDashboardView';
import { AdminPortalView } from './components/AdminPortalView';
import { UserProfileModal } from './components/UserProfileModal';
import { Scope3FleetCalculator } from './components/Scope3FleetCalculator';
import { CarbonOffsetMarketplace } from './components/CarbonOffsetMarketplace';
import { CartDrawerModal, CartItem } from './components/CartDrawerModal';
import { HouseholdSwapCalculatorModal } from './components/HouseholdSwapCalculatorModal';
import { Filter, SlidersHorizontal, Leaf, Sparkles, CheckCircle2, ShieldCheck, Scale, AlertCircle } from 'lucide-react';

export function App() {
  // Navigation View State
  const [activeView, setActiveView] = useState<'catalog' | 'compare' | 'ai_assistant' | 'pipelines' | 'analytics' | 'admin' | 'scope3_fleet' | 'carbon_offset'>('catalog');

  // Product Catalog & Filter States
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minEcoScore, setMinEcoScore] = useState(0);
  const [plasticFreeOnly, setPlasticFreeOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'eco_desc' | 'carbon_asc' | 'price_asc' | 'price_desc'>('eco_desc');

  // Interactive Selection States
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod-001', 'prod-002']);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart & Swap Modal States
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: INITIAL_PRODUCTS[0], quantity: 2 },
    { product: INITIAL_PRODUCTS[5], quantity: 3 }
  ]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showSwapCalculatorModal, setShowSwapCalculatorModal] = useState(false);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`Added "${product.title}" to your Eco Cart! 🛒`);
  };

  const handleAddToCartBatch = (batchProducts: Product[]) => {
    setCartItems(prev => {
      const updated = [...prev];
      batchProducts.forEach(prod => {
        const existingIndex = updated.findIndex(item => item.product.id === prod.id);
        if (existingIndex >= 0) {
          updated[existingIndex] = { ...updated[existingIndex], quantity: updated[existingIndex].quantity + 1 };
        } else {
          updated.push({ product: prod, quantity: 1 });
        }
      });
      return updated;
    });
    setShowCartModal(true);
    showToast(`Added ${batchProducts.length} zero-plastic swap products to cart! 🌿`);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
    showToast('Removed item from cart');
  };

  const handleCompleteCheckout = (orderDetails: any) => {
    setUserProfile(prev => ({
      ...prev,
      carbonSavedTotalKg: prev.carbonSavedTotalKg + orderDetails.carbonSavedKg,
      rewardPoints: prev.rewardPoints + orderDetails.pointsEarned - orderDetails.pointsRedeemed,
      purchaseHistory: [
        {
          id: orderDetails.orderId,
          productId: orderDetails.items[0]?.product.id || 'bulk-order',
          productTitle: orderDetails.items.map((i: any) => i.product.title).join(', '),
          date: orderDetails.date,
          price: orderDetails.finalPrice,
          carbonSavedKg: orderDetails.carbonSavedKg
        },
        ...prev.purchaseHistory
      ]
    }));
    showToast(`Order ${orderDetails.orderId} Confirmed! GST Tax Invoice Downloadable.`);
  };

  // Platform Adapters & Config
  const [adapters, setAdapters] = useState<DataAdapter[]>(INITIAL_DATA_ADAPTERS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [modelConfig, setModelConfig] = useState<AIModelConfig>({
    sustainabilityScoreWeight: 0.4,
    productSimilarityWeight: 0.3,
    carbonPenaltyFactor: 1.5,
    reviewSentimentWeight: 0.15,
    lastTunedAt: '2026-07-25 10:00'
  });

  // User Profile State
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 'usr-1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@greenprocure.in',
    role: 'Customer',
    companyName: 'GreenProcure India Private Ltd',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    ecoPreferences: {
      carbonWeight: 80,
      packagingWeight: 90,
      materialWeight: 85,
      durabilityWeight: 75,
      maxPrice: 200000
    },
    carbonSavedTotalKg: 428.5,
    rewardPoints: 1250,
    purchaseHistory: [
      { id: 'ord-101', productId: 'prod-001', productTitle: 'BioTray Sugarcane Bagasse Meal Set 50-Pack', date: '2026-06-12', price: 899, carbonSavedKg: 18 },
      { id: 'ord-102', productId: 'prod-2', productTitle: 'Verde Organics GOTS Khadi Hoodie', date: '2026-07-02', price: 3499, carbonSavedKg: 35 }
    ]
  });

  // Toast Banner Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Fetch API products on boot if server responds
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      })
      .catch(err => console.log('Using local mock data initializers:', err));
  }, []);

  // Filter & Sort Logic
  const filteredProducts = products.filter(p => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.materials.some(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesEcoScore = p.sustainabilityScore.overall >= minEcoScore;
    const matchesPlasticFree = !plasticFreeOnly || p.packaging.plasticFree;

    return matchesSearch && matchesCategory && matchesEcoScore && matchesPlasticFree;
  }).sort((a, b) => {
    if (sortBy === 'eco_desc') return b.sustainabilityScore.overall - a.sustainabilityScore.overall;
    if (sortBy === 'carbon_asc') return a.carbonFootprint.totalCO2eKg - b.carbonFootprint.totalCO2eKg;
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    return 0;
  });

  // Wishlist Toggle
  const handleToggleWishlist = (id: string) => {
    if (wishlistIds.includes(id)) {
      setWishlistIds(wishlistIds.filter(item => item !== id));
      showToast('Removed product from your eco wishlist');
    } else {
      setWishlistIds([...wishlistIds, id]);
      showToast('Added product to your eco wishlist!');
    }
  };

  // Compare Toggle
  const handleToggleCompare = (id: string) => {
    if (comparedIds.includes(id)) {
      setComparedIds(comparedIds.filter(item => item !== id));
    } else {
      if (comparedIds.length >= 4) {
        showToast('Maximum 4 items can be compared side-by-side');
        return;
      }
      setComparedIds([...comparedIds, id]);
      showToast('Added to comparison matrix');
    }
  };

  // Simulate Purchase & Reward Calculation
  const handleSimulatePurchase = (product: Product) => {
    const savedCarbon = Math.round(product.carbonFootprint.benchmarkAverageKg - product.carbonFootprint.totalCO2eKg);
    const addedPoints = Math.round(product.sustainabilityScore.overall * 2);

    setUserProfile(prev => ({
      ...prev,
      carbonSavedTotalKg: prev.carbonSavedTotalKg + savedCarbon,
      rewardPoints: prev.rewardPoints + addedPoints,
      purchaseHistory: [
        {
          id: `ord-${Date.now().toString().slice(-4)}`,
          productId: product.id,
          productTitle: product.title,
          date: new Date().toISOString().split('T')[0],
          price: product.price,
          carbonSavedKg: savedCarbon
        },
        ...prev.purchaseHistory
      ]
    }));

    showToast(`Order Placed! Saved ~${savedCarbon} kg CO₂e & Earned +${addedPoints} EcoPoints! 🎉`);
  };

  // Redeem EcoPoints for Carbon Offset
  const handleRedeemPoints = (pointsCost: number, projectTitle: string) => {
    setUserProfile(prev => ({
      ...prev,
      rewardPoints: Math.max(0, prev.rewardPoints - pointsCost),
      carbonSavedTotalKg: prev.carbonSavedTotalKg + Math.round(pointsCost * 2)
    }));
    showToast(`Successfully redeemed ${pointsCost} EcoPoints for ${projectTitle}!`);
  };

  // Add Product Handler (Admin Portal)
  const handleAddProduct = async (newProdData: Partial<Product>) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProdData)
      });
      const created = await res.json();
      setProducts([created, ...products]);
      showToast(`Created product: ${created.title}`);
    } catch (err) {
      showToast('Product added to local state!');
    }
  };

  // Delete Product Handler
  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    setComparedIds(comparedIds.filter(item => item !== id));
    setWishlistIds(wishlistIds.filter(item => item !== id));
    showToast('Product removed from catalog');
  };

  // Trigger Sync Adapter
  const handleTriggerSync = (adapterId: string) => {
    setAdapters(adapters.map(a => a.id === adapterId ? { ...a, status: 'syncing' } : a));
    setTimeout(() => {
      setAdapters(adapters.map(a => a.id === adapterId ? {
        ...a,
        status: 'active',
        itemsProcessed: a.itemsProcessed + Math.floor(Math.random() * 50) + 10,
        lastSyncTime: 'Just now'
      } : a));
      showToast('Adapter sync completed successfully');
    }, 1500);
  };

  const comparedProductsList = products.filter(p => comparedIds.includes(p.id));
  const wishlistProductsList = products.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#F5F2ED] text-[#2C3333] flex flex-col font-sans selection:bg-[#D4A373]/30">
      
      {/* Toast Notification Floating Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2C3333] text-white px-5 py-3.5 rounded-2xl shadow-xl border border-[#D4A373]/40 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle2 className="w-5 h-5 text-[#D4A373] shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main Sticky Navbar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        userProfile={userProfile}
        comparedCount={comparedIds.length}
        wishlistCount={wishlistIds.length}
        cartCount={cartItems.reduce((s, i) => s + i.quantity, 0)}
        onOpenProfile={() => setShowProfileModal(true)}
        onOpenCart={() => setShowCartModal(true)}
        onOpenSwapCalculator={() => setShowSwapCalculatorModal(true)}
        onSelectRole={(role) => {
          setUserProfile(prev => ({ ...prev, role }));
          showToast(`Switched persona view to: ${role}`);
        }}
      />

      {/* Main App Content View Switcher */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        {/* VIEW 1: Catalog View */}
        {activeView === 'catalog' && (
          <div className="space-y-8">
            
            {/* Natural Tones Intelligence Header & Metric Spotlight Cards */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-3xl font-serif font-normal text-[#2C3333] tracking-tight">Sustainability Intelligence</h2>
                <p className="text-[#5F7161] text-sm italic mt-1">AI-driven evaluation for modern procurement and eco-conscious shopping.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white rounded-full px-4 py-2 flex items-center gap-2 border border-[#E1D7C6] shadow-xs">
                  <span className="w-2.5 h-2.5 bg-emerald-600 rounded-full animate-pulse"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#5F7161]">AI Pipeline Active</span>
                </div>
              </div>
            </header>

            {/* Top Cards Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-[32px] p-6 shadow-xs border border-[#E1D7C6] flex flex-col justify-between h-36">
                <span className="text-xs font-bold text-[#8D9971] uppercase tracking-wider">Avg. Sustainability Score</span>
                <div className="flex items-baseline gap-2 my-1">
                  <span className="text-4xl font-serif font-normal text-[#2C3333]">84</span>
                  <span className="text-[#5F7161] font-medium text-sm">/ 100</span>
                </div>
                <p className="text-xs text-gray-500 italic">+12% carbon reduction vs benchmark</p>
              </div>

              <div className="bg-white rounded-[32px] p-6 shadow-xs border border-[#E1D7C6] flex flex-col justify-between h-36">
                <span className="text-xs font-bold text-[#8D9971] uppercase tracking-wider">Eco Impact Balance</span>
                <div className="flex items-baseline gap-2 my-1">
                  <span className="text-4xl font-serif font-normal text-[#2C3333]">{userProfile.carbonSavedTotalKg.toFixed(0)}</span>
                  <span className="text-xs font-bold text-[#D4A373] uppercase">kg CO₂e Saved</span>
                </div>
                <p className="text-xs text-gray-500 italic">{userProfile.rewardPoints} EcoPoints Accumulated</p>
              </div>

              <div className="bg-[#8D9971] rounded-[32px] p-6 shadow-xs flex flex-col justify-between text-white h-36">
                <span className="text-xs font-bold uppercase tracking-wider opacity-90">Active Certifications</span>
                <div className="flex gap-2 flex-wrap my-1">
                  <div className="bg-white/20 px-2.5 py-1 rounded-lg text-[11px] font-bold">ENERGY STAR</div>
                  <div className="bg-white/20 px-2.5 py-1 rounded-lg text-[11px] font-bold">FSC ORGANIC</div>
                  <div className="bg-white/20 px-2.5 py-1 rounded-lg text-[11px] font-bold">EPEAT GOLD</div>
                </div>
                <p className="text-xs opacity-80 italic">Verified by Leviathan Engine</p>
              </div>
            </section>

            {/* Filter & Subheader Toolbar */}
            <div className="bg-white p-5 rounded-[28px] border border-[#E1D7C6] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
              
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <SlidersHorizontal className="w-4 h-4 text-[#5F7161] shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#5F7161] shrink-0">
                  Filters
                </span>

                {/* Min Eco Score Slider */}
                <div className="flex items-center gap-2.5 bg-[#F5F2ED] px-3.5 py-2 rounded-2xl border border-[#E1D7C6]">
                  <span className="text-xs font-medium text-[#2C3333]">Min Eco Score:</span>
                  <span className="text-xs font-bold text-[#5F7161] w-8">{minEcoScore}</span>
                  <input
                    type="range"
                    min="0"
                    max="95"
                    step="5"
                    value={minEcoScore}
                    onChange={(e) => setMinEcoScore(Number(e.target.value))}
                    className="w-24 accent-[#5F7161]"
                  />
                </div>

                {/* Plastic Free Checkbox Toggle */}
                <label className="flex items-center gap-2 bg-[#F5F2ED] px-3.5 py-2 rounded-2xl border border-[#E1D7C6] cursor-pointer text-xs font-medium text-[#2C3333]">
                  <input
                    type="checkbox"
                    checked={plasticFreeOnly}
                    onChange={(e) => setPlasticFreeOnly(e.target.checked)}
                    className="rounded text-[#5F7161] focus:ring-[#5F7161]"
                  />
                  <span>Zero Plastic</span>
                </label>
              </div>

              {/* Sorting Selector */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <span className="text-xs text-gray-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#F9F7F3] border border-[#E1D7C6] rounded-xl py-2 px-3 text-xs font-semibold text-[#2C3333] focus:outline-none cursor-pointer"
                >
                  <option value="eco_desc">Highest Sustainability Score</option>
                  <option value="carbon_asc">Lowest Carbon CO₂e Footprint</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Results Counter */}
            <div className="flex items-center justify-between text-xs text-[#5F7161]">
              <span>Showing <strong>{filteredProducts.length}</strong> audited products</span>
              {comparedIds.length > 0 && (
                <button
                  onClick={() => setActiveView('compare')}
                  className="text-[#5F7161] font-bold hover:underline flex items-center gap-1"
                >
                  <Scale className="w-3.5 h-3.5" /> View {comparedIds.length} Compared Products
                </button>
              )}
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-[#E1D7C6] rounded-[32px] p-12 text-center space-y-3">
                <Leaf className="w-10 h-10 text-[#8D9971] mx-auto" />
                <h3 className="font-serif font-bold text-xl text-[#2C3333]">No products match your active filters</h3>
                <p className="text-xs text-gray-500 italic">Try lowering the minimum sustainability score or clearing the search term.</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setMinEcoScore(0); setPlasticFreeOnly(false); }}
                  className="bg-[#5F7161] text-white text-xs font-bold px-5 py-2.5 rounded-xl mt-2 hover:bg-[#6D8B74] transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    isWishlisted={wishlistIds.includes(prod.id)}
                    isCompared={comparedIds.includes(prod.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onToggleCompare={handleToggleCompare}
                    onSelectProduct={(p) => setSelectedProduct(p)}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: Comparison Matrix */}
        {activeView === 'compare' && (
          <ComparisonMatrix
            products={comparedProductsList}
            onRemoveFromCompare={(id) => setComparedIds(comparedIds.filter(item => item !== id))}
            onClearCompare={() => setComparedIds([])}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}

        {/* VIEW 3: AI Recommendation Assistant */}
        {activeView === 'ai_assistant' && (
          <AIRecommendationAssistant
            products={products}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}

        {/* VIEW 4: Data Pipelines */}
        {activeView === 'pipelines' && (
          <DataPipelineManager
            adapters={adapters}
            onTriggerSync={handleTriggerSync}
            onFileUpload={(fileName, count) => {
              showToast(`Imported dataset "${fileName}" with ${count} new products!`);
            }}
          />
        )}

        {/* VIEW 5: Intelligence Analytics */}
        {activeView === 'analytics' && (
          <AnalyticsDashboardView products={products} />
        )}

        {/* VIEW 6: Scope 3 Fleet Strategy & ESG Compliance */}
        {activeView === 'scope3_fleet' && (
          <Scope3FleetCalculator
            products={products}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}

        {/* VIEW 7: Carbon Offset Marketplace */}
        {activeView === 'carbon_offset' && (
          <CarbonOffsetMarketplace
            userProfile={userProfile}
            onRedeemPoints={handleRedeemPoints}
          />
        )}

        {/* VIEW 8: Admin Portal */}
        {activeView === 'admin' && (
          <AdminPortalView
            products={products}
            auditLogs={auditLogs}
            modelConfig={modelConfig}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateModelConfig={(cfg) => {
              setModelConfig(prev => ({ ...prev, ...cfg }));
              showToast('AI Model weights updated successfully');
            }}
          />
        )}
      </main>

      {/* Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isWishlisted={wishlistIds.includes(selectedProduct.id)}
          onClose={() => setSelectedProduct(null)}
          onToggleWishlist={handleToggleWishlist}
          onPurchaseSimulate={handleSimulatePurchase}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Cart Drawer & Checkout Modal */}
      <CartDrawerModal
        isOpen={showCartModal}
        onClose={() => setShowCartModal(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
        userEcoPoints={userProfile.rewardPoints}
        onCompleteCheckout={handleCompleteCheckout}
      />

      {/* Household Plastic Audit Calculator Modal */}
      <HouseholdSwapCalculatorModal
        isOpen={showSwapCalculatorModal}
        onClose={() => setShowSwapCalculatorModal(false)}
        products={products}
        onAddToCartBatch={handleAddToCartBatch}
      />

      {/* User Profile Modal */}
      {showProfileModal && (
        <UserProfileModal
          profile={userProfile}
          wishlistProducts={wishlistProductsList}
          onClose={() => setShowProfileModal(false)}
          onUpdatePreferences={(prefs) => {
            setUserProfile(prev => ({ ...prev, ecoPreferences: prefs }));
            showToast('Eco preference weights saved');
          }}
          onRemoveWishlist={handleToggleWishlist}
          onSelectProduct={(p) => {
            setShowProfileModal(false);
            setSelectedProduct(p);
          }}
        />
      )}

      {/* Footer */}
      <footer className="mt-16 border-t border-[#E1D7C6] bg-white py-8 text-xs text-[#5F7161]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-[#D4A373] text-white flex items-center justify-center font-bold text-xs italic">
              L
            </div>
            <span className="font-serif text-sm font-semibold text-[#2C3333]">Leviathan AI Platform</span>
            <span className="italic">— Enterprise Sustainable Product Evaluation</span>
          </div>

          <div className="flex items-center gap-4 text-gray-500">
            <span>Powered by Gemini 3.6 Flash</span>
            <span>•</span>
            <span>Cradle-to-Grave Carbon Audit</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
