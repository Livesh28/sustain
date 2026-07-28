import React, { useState } from 'react';
import { UserProfile, Product, EcoPreferences } from '../types';
import { X, User, Heart, ShoppingBag, Award, Sliders, ShieldCheck, Download, TreePine, Sparkles } from 'lucide-react';

interface Props {
  profile: UserProfile;
  wishlistProducts: Product[];
  onClose: () => void;
  onUpdatePreferences: (prefs: EcoPreferences) => void;
  onRemoveWishlist: (id: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const UserProfileModal: React.FC<Props> = ({
  profile,
  wishlistProducts,
  onClose,
  onUpdatePreferences,
  onRemoveWishlist,
  onSelectProduct
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'wishlist' | 'purchases' | 'certificate'>('profile');
  const [prefs, setPrefs] = useState<EcoPreferences>(profile.ecoPreferences);

  const handleSliderChange = (field: keyof EcoPreferences, val: number) => {
    const updated = { ...prefs, [field]: val };
    setPrefs(updated);
    onUpdatePreferences(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-3xl shadow-2xl p-6 relative space-y-6 my-auto">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <img src={profile.avatarUrl} alt={profile.name} className="w-12 h-12 rounded-2xl object-cover border border-slate-200 dark:border-slate-700" />
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{profile.name}</h2>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold uppercase">{profile.role} • {profile.companyName}</span>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-2.5 text-xs font-bold border-b-2 transition-all ${activeTab === 'profile' ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-500'}`}
          >
            Eco Preferences
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`pb-2.5 text-xs font-bold border-b-2 transition-all ${activeTab === 'wishlist' ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-500'}`}
          >
            Wishlist ({wishlistProducts.length})
          </button>
          <button
            onClick={() => setActiveTab('purchases')}
            className={`pb-2.5 text-xs font-bold border-b-2 transition-all ${activeTab === 'purchases' ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-500'}`}
          >
            Purchase History & Impact
          </button>
          <button
            onClick={() => setActiveTab('certificate')}
            className={`pb-2.5 text-xs font-bold border-b-2 transition-all ${activeTab === 'certificate' ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-500'}`}
          >
            Eco Offset Certificate
          </button>
        </div>

        {/* TAB 1: Eco Preferences */}
        {activeTab === 'profile' && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
              <div>
                <span className="text-xs text-slate-400">Total Carbon Saved</span>
                <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{profile.carbonSavedTotalKg.toFixed(1)} kg CO₂e</div>
              </div>
              <div>
                <span className="text-xs text-slate-400">Reward Eco-Points</span>
                <div className="text-xl font-extrabold text-amber-500">{profile.rewardPoints} Points</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Personalized Eco Decision Weighting Sliders
              </h4>

              <div className="space-y-3 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span>Low-Carbon Footprint Weight</span>
                    <span className="text-emerald-600 font-bold">{prefs.carbonWeight}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={prefs.carbonWeight}
                    onChange={e => handleSliderChange('carbonWeight', Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span>Zero Plastic Packaging Weight</span>
                    <span className="text-emerald-600 font-bold">{prefs.packagingWeight}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={prefs.packagingWeight}
                    onChange={e => handleSliderChange('packagingWeight', Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span>Organic & Recycled Materials Weight</span>
                    <span className="text-emerald-600 font-bold">{prefs.materialWeight}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={prefs.materialWeight}
                    onChange={e => handleSliderChange('materialWeight', Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Wishlist */}
        {activeTab === 'wishlist' && (
          <div className="space-y-3">
            {wishlistProducts.length === 0 ? (
              <p className="text-xs text-slate-400 py-8 text-center">Your wishlist is empty.</p>
            ) : (
              wishlistProducts.map(p => (
                <div key={p.id} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={p.imageUrl} alt={p.title} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100">{p.title}</h4>
                      <span className="text-emerald-600 font-semibold">{p.currency}{p.price.toLocaleString('en-IN')} • Eco Score {p.sustainabilityScore.overall}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { onClose(); onSelectProduct(p); }}
                      className="bg-slate-900 dark:bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-semibold"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onRemoveWishlist(p.id)}
                      className="text-rose-500 p-1.5 hover:bg-rose-50 rounded"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: Purchase History */}
        {activeTab === 'purchases' && (
          <div className="space-y-3">
            {profile.purchaseHistory.map(order => (
              <div key={order.id} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">{order.productTitle}</h4>
                  <span className="text-slate-400">{order.date} • ₹{order.price.toLocaleString('en-IN')}</span>
                </div>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full">
                  +{order.carbonSavedKg} kg CO₂e Saved
                </span>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: Eco Offset Certificate Generator */}
        {activeTab === 'certificate' && (
          <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-2xl p-6 border border-emerald-500/40 space-y-4 text-center">
            <Award className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-extrabold text-emerald-200">
              Official Leviathan Sustainability Impact Certificate
            </h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Certified that <strong className="text-white">{profile.name}</strong> has avoided <strong className="text-emerald-400">{profile.carbonSavedTotalKg.toFixed(1)} kg CO₂e</strong> in lifecycle carbon emissions through sustainable purchasing.
            </p>
            <div className="text-[10px] text-emerald-400/80 font-mono">
              Certificate Hash: LEV-CERT-2026-908122-VERIFIED
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
