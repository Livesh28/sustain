import React from 'react';
import { UserRole, UserProfile } from '../types';
import { Leaf, Search, Brain, Database, BarChart3, Settings, Scale, Heart, User, Sparkles, Filter, ShieldCheck, TreePine, Building2, Gift, ShoppingBag, Calculator } from 'lucide-react';

interface Props {
  activeView: 'catalog' | 'compare' | 'ai_assistant' | 'pipelines' | 'analytics' | 'admin' | 'scope3_fleet' | 'carbon_offset';
  setActiveView: (view: 'catalog' | 'compare' | 'ai_assistant' | 'pipelines' | 'analytics' | 'admin' | 'scope3_fleet' | 'carbon_offset') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  userProfile: UserProfile;
  comparedCount: number;
  wishlistCount: number;
  cartCount: number;
  onOpenProfile: () => void;
  onOpenCart: () => void;
  onOpenSwapCalculator: () => void;
  onSelectRole: (role: UserRole) => void;
}

export const Navbar: React.FC<Props> = ({
  activeView,
  setActiveView,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  userProfile,
  comparedCount,
  wishlistCount,
  cartCount,
  onOpenProfile,
  onOpenCart,
  onOpenSwapCalculator,
  onSelectRole
}) => {
  const categories = [
    'All',
    'Kitchen & Dining',
    'Packaging',
    'Grocery & Daily Essentials',
    'Personal Care',
    'Home & Cleaning',
    'Office & Stationery',
    'Fashion & Accessories',
    'Gardening',
    'Household Products'
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F5F2ED]/95 backdrop-blur-md border-b border-[#E1D7C6] transition-colors">
      
      {/* Top Banner Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Logo & Platform Name */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => setActiveView('catalog')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#D4A373] text-white flex items-center justify-center font-bold text-xl italic shadow-sm group-hover:scale-105 transition-transform">
              L
            </div>
            <div>
              <span className="text-2xl font-serif tracking-tight text-[#2C3333] flex items-center gap-2">
                Leviathan
                <span className="text-[10px] font-sans font-bold bg-[#EFEAD8] text-[#5F7161] px-2 py-0.5 rounded-full border border-[#5F7161]/20">
                  AI v3.6
                </span>
              </span>
              <p className="text-[10px] font-sans text-[#5F7161] italic">
                AI-Driven Sustainability Intelligence & Product Evaluation
              </p>
            </div>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="w-full md:w-auto flex-1 max-w-md relative flex items-center">
          <Search className="w-4 h-4 text-[#5F7161] absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sugarcane bagasse, neem toothbrush, seed paper..."
            className="w-full bg-white border border-[#E1D7C6] rounded-2xl py-2 pl-9 pr-28 text-xs text-[#2C3333] placeholder-[#2C3333]/50 focus:outline-none focus:ring-2 focus:ring-[#5F7161]/40"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="absolute right-1.5 bg-[#F9F7F3] border border-[#E1D7C6] rounded-xl py-1 px-2 text-[11px] font-semibold text-[#5F7161] focus:outline-none cursor-pointer"
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* User Role Switcher & Profile Quick Stats */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Persona Role Selector */}
          <div className="flex items-center gap-1.5 bg-white border border-[#E1D7C6] px-3 py-1.5 rounded-xl text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#5F7161]" />
            <select
              value={userProfile.role}
              onChange={(e) => onSelectRole(e.target.value as UserRole)}
              className="bg-transparent text-xs font-semibold text-[#2C3333] focus:outline-none cursor-pointer"
            >
              <option value="Customer">Customer Persona</option>
              <option value="Retail Business">Retailer Persona</option>
              <option value="Green Brand">Green Brand Persona</option>
              <option value="Procurement Team">Enterprise Procurement</option>
              <option value="Admin">System Administrator</option>
            </select>
          </div>

          {/* Household Plastic Audit Calculator Trigger */}
          <button
            onClick={onOpenSwapCalculator}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#5F7161]/10 hover:bg-[#5F7161]/20 border border-[#5F7161]/30 text-[#5F7161] font-bold text-xs rounded-xl transition-colors cursor-pointer"
            title="Household Single-Use Plastic Audit"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Plastic Audit</span>
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="p-2 rounded-xl bg-[#5F7161] text-white hover:bg-[#4E5D50] transition-colors relative cursor-pointer shadow-xs flex items-center justify-center"
            title="View Eco Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#D4A373] text-white font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-xs border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>

          {/* Eco Points & Carbon Badge */}
          <div
            onClick={onOpenProfile}
            className="flex items-center gap-2 bg-[#F1F1E6] border border-[#E1D7C6] px-3 py-1.5 rounded-xl cursor-pointer hover:border-[#5F7161] transition-colors"
          >
            <TreePine className="w-4 h-4 text-[#5F7161]" />
            <div className="text-[10px] leading-tight">
              <span className="font-bold text-[#2C3333] block">
                {userProfile.carbonSavedTotalKg.toFixed(0)} kg CO₂e
              </span>
              <span className="text-[#D4A373] font-semibold">
                {userProfile.rewardPoints} EcoPts
              </span>
            </div>
          </div>

          {/* Profile Modal Toggle */}
          <button
            onClick={onOpenProfile}
            className="p-2 rounded-xl bg-white border border-[#E1D7C6] text-[#2C3333] hover:bg-[#F9F7F3] transition-colors relative cursor-pointer"
            title="User Profile & Wishlist"
          >
            <User className="w-4 h-4 text-[#5F7161]" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D4A373] text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {wishlistCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* View Navigation Tabs */}
      <div className="border-t border-[#E1D7C6] bg-[#F5F2ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1.5 overflow-x-auto py-2">
          <button
            onClick={() => setActiveView('catalog')}
            className={`px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeView === 'catalog'
                ? 'bg-[#5F7161] text-white shadow-xs'
                : 'text-[#2C3333]/80 hover:bg-[#6D8B74]/15 hover:text-[#2C3333]'
            }`}
          >
            <Leaf className="w-3.5 h-3.5" /> Product Catalog
          </button>

          <button
            onClick={() => setActiveView('compare')}
            className={`px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeView === 'compare'
                ? 'bg-[#5F7161] text-white shadow-xs'
                : 'text-[#2C3333]/80 hover:bg-[#6D8B74]/15 hover:text-[#2C3333]'
            }`}
          >
            <Scale className="w-3.5 h-3.5" /> Comparison Matrix
            {comparedCount > 0 && (
              <span className="bg-[#D4A373] text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {comparedCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveView('ai_assistant')}
            className={`px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeView === 'ai_assistant'
                ? 'bg-[#5F7161] text-white shadow-xs'
                : 'text-[#2C3333]/80 hover:bg-[#6D8B74]/15 hover:text-[#2C3333]'
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-[#D4A373]" /> AI Recommendation Assistant
          </button>

          <button
            onClick={() => setActiveView('pipelines')}
            className={`px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeView === 'pipelines'
                ? 'bg-[#5F7161] text-white shadow-xs'
                : 'text-[#2C3333]/80 hover:bg-[#6D8B74]/15 hover:text-[#2C3333]'
            }`}
          >
            <Database className="w-3.5 h-3.5" /> Data Adapters
          </button>

          <button
            onClick={() => setActiveView('analytics')}
            className={`px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeView === 'analytics'
                ? 'bg-[#5F7161] text-white shadow-xs'
                : 'text-[#2C3333]/80 hover:bg-[#6D8B74]/15 hover:text-[#2C3333]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" /> Intelligence Analytics
          </button>

          <button
            onClick={() => setActiveView('scope3_fleet')}
            className={`px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeView === 'scope3_fleet'
                ? 'bg-[#5F7161] text-white shadow-xs'
                : 'text-[#2C3333]/80 hover:bg-[#6D8B74]/15 hover:text-[#2C3333]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-[#D4A373]" /> Scope 3 Decarbonization
          </button>

          <button
            onClick={() => setActiveView('carbon_offset')}
            className={`px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeView === 'carbon_offset'
                ? 'bg-[#5F7161] text-white shadow-xs'
                : 'text-[#2C3333]/80 hover:bg-[#6D8B74]/15 hover:text-[#2C3333]'
            }`}
          >
            <Gift className="w-3.5 h-3.5" /> Offset Marketplace
          </button>

          <button
            onClick={() => setActiveView('admin')}
            className={`px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeView === 'admin'
                ? 'bg-[#5F7161] text-white shadow-xs'
                : 'text-[#2C3333]/80 hover:bg-[#6D8B74]/15 hover:text-[#2C3333]'
            }`}
          >
            <Settings className="w-3.5 h-3.5" /> Admin Portal
          </button>
        </div>
      </div>
    </header>
  );
};
