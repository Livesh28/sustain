import React, { useState } from 'react';
import { Product, ExplainableRecommendation } from '../types';
import { SustainabilityScoreGauge } from './SustainabilityScoreGauge';
import { CarbonFootprintVisualizer } from './CarbonFootprintVisualizer';
import { ExplainableAICard } from './ExplainableAICard';
import { ReviewIntelligencePanel } from './ReviewIntelligencePanel';
import { LifecycleCarbonFlowModal } from './LifecycleCarbonFlowModal';
import { X, ShieldCheck, Heart, ShoppingBag, Award, Wrench, Clock, Zap, Check, Sparkles, ExternalLink, Layers, AlertTriangle, Recycle, FileCheck } from 'lucide-react';
import { evaluateGreenwashingRisk, calculateBiodegradabilityProfile } from '../utils/sustainabilityEngine';

interface Props {
  product: Product;
  isWishlisted: boolean;
  onClose: () => void;
  onToggleWishlist: (id: string) => void;
  onPurchaseSimulate: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export const ProductDetailModal: React.FC<Props> = ({
  product,
  isWishlisted,
  onClose,
  onToggleWishlist,
  onPurchaseSimulate,
  onAddToCart
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'biodegradable' | 'greenwashing' | 'carbon' | 'xai' | 'reviews'>('overview');
  const [selectedImg, setSelectedImg] = useState(product.imageUrl);
  const [showLcaModal, setShowLcaModal] = useState(false);

  const greenwashing = product.greenwashingAnalysis || evaluateGreenwashingRisk(product);
  const biodegradability = product.biodegradabilityProfile || calculateBiodegradabilityProfile(product);

  // Fallback Explainable AI object
  const xaiData: ExplainableRecommendation = {
    productId: product.id,
    productTitle: product.title,
    matchScore: product.decisionScore.overall,
    whyRecommended: [
      `Overall Sustainability Score of ${product.sustainabilityScore.overall}/100 (${product.sustainabilityScore.grade} Grade).`,
      `Zero plastic & 100% recyclable/compostable packaging reduces landfill burden.`,
      `Verified certifications: ${product.certifications.map(c => c.name).join(', ')}.`,
      `High repairability index (${product.repairabilityIndex}/10) ensures extended 7+ year product lifecycle.`
    ],
    whyNotRecommended: [
      product.price > 500 ? 'Higher upfront price compared to disposable low-quality alternatives.' : 'High demand item with limited stock.'
    ],
    sustainabilityAdvantages: [
      'Circular design engineered for easy dismantling and recycling',
      'Calculated lifecycle emissions far below sector average',
      'Ethically audited supply chain and eco seller'
    ],
    environmentalImpact: {
      carbonSavedKgYear: Math.round((product.carbonFootprint.benchmarkAverageKg - product.carbonFootprint.totalCO2eKg) * 0.5),
      plasticAvoidedGrams: product.packaging.plasticFree ? 350 : 150,
      energySavedKwhYear: product.powerConsumptionWatts !== undefined ? Math.max(0, 120 - product.powerConsumptionWatts) : 60,
      waterSavedLitersYear: 280
    },
    longTermValue: `Estimated ₹18,000+ saved over 5 years via durable construction, BEE energy savings, and user-repairable design.`,
    confidenceScore: 96
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2C3333]/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#F9F7F3] border border-[#E1D7C6] rounded-[36px] w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl relative my-auto animate-in fade-in zoom-in duration-200">
        
        {/* Top Header Sticky Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#E1D7C6] flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#8D9971] uppercase tracking-wider">
              {product.brand} • {product.category}
            </span>
            <h2 className="text-lg sm:text-2xl font-serif font-bold text-[#2C3333] line-clamp-1">
              {product.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#F5F2ED] text-[#5F7161] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Grid */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left: Product Images & Purchase Box */}
            <div className="md:col-span-5 space-y-4">
              <div className="aspect-square rounded-[28px] bg-[#F5F2ED] overflow-hidden border border-[#E1D7C6]">
                <img
                  src={selectedImg}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {product.images && product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImg(img)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${selectedImg === img ? 'border-[#5F7161]' : 'border-[#E1D7C6]'}`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Price & Action Box */}
              <div className="bg-white p-5 rounded-[24px] border border-[#E1D7C6] space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-3xl font-serif font-bold text-[#2C3333]">
                      {product.currency}{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs line-through text-gray-400 ml-2">
                        {product.currency}{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-[#5F7161] bg-[#F1F1E6] px-3 py-1 rounded-full border border-[#E1D7C6]">
                    In Stock ({product.inventory} available)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (onAddToCart) {
                        onAddToCart(product);
                      } else {
                        onPurchaseSimulate(product);
                      }
                    }}
                    className="flex-1 bg-[#5F7161] hover:bg-[#4E5D50] text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#EFEAD8]" /> Add to Eco Cart
                  </button>

                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${isWishlisted ? 'bg-[#EFEAD8] border-[#D4A373] text-[#D4A373]' : 'border-[#E1D7C6] bg-white text-[#5F7161] hover:bg-[#F5F2ED]'}`}
                    title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#D4A373]' : ''}`} />
                  </button>
                </div>

                {/* Eco Seller Verification */}
                <div className="flex items-center gap-2 pt-2 border-t border-[#E1D7C6] text-xs text-gray-600">
                  <ShieldCheck className="w-4 h-4 text-[#8D9971] shrink-0" />
                  <span>
                    Fulfilled by <strong className="text-[#2C3333]">{product.seller.name}</strong> ({product.seller.location})
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Tabs & Audit Intelligence */}
            <div className="md:col-span-7 space-y-5">
              
              {/* Navigation Tabs */}
              <div className="flex border-b border-[#E1D7C6] gap-3 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${activeTab === 'overview' ? 'border-[#5F7161] text-[#5F7161]' : 'border-transparent text-gray-500 hover:text-[#2C3333]'}`}
                >
                  Overview & Specs
                </button>
                <button
                  onClick={() => setActiveTab('biodegradable')}
                  className={`pb-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1 whitespace-nowrap ${activeTab === 'biodegradable' ? 'border-[#5F7161] text-[#5F7161]' : 'border-transparent text-gray-500 hover:text-[#2C3333]'}`}
                >
                  <Recycle className="w-3.5 h-3.5 text-[#8D9971]" /> Biodegradability
                </button>
                <button
                  onClick={() => setActiveTab('greenwashing')}
                  className={`pb-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1 whitespace-nowrap ${activeTab === 'greenwashing' ? 'border-[#5F7161] text-[#5F7161]' : 'border-transparent text-gray-500 hover:text-[#2C3333]'}`}
                >
                  <FileCheck className="w-3.5 h-3.5 text-[#D4A373]" /> Greenwash Audit
                </button>
                <button
                  onClick={() => setActiveTab('carbon')}
                  className={`pb-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${activeTab === 'carbon' ? 'border-[#5F7161] text-[#5F7161]' : 'border-transparent text-gray-500 hover:text-[#2C3333]'}`}
                >
                  Carbon Footprint
                </button>
                <button
                  onClick={() => setActiveTab('xai')}
                  className={`pb-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1 whitespace-nowrap ${activeTab === 'xai' ? 'border-[#5F7161] text-[#5F7161]' : 'border-transparent text-gray-500 hover:text-[#2C3333]'}`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" /> Explainable AI
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${activeTab === 'reviews' ? 'border-[#5F7161] text-[#5F7161]' : 'border-transparent text-gray-500 hover:text-[#2C3333]'}`}
                >
                  Review Intelligence
                </button>
              </div>

              {/* Tab 1: Overview */}
              {activeTab === 'overview' && (
                <div className="space-y-5">
                  <p className="text-sm text-[#2C3333] leading-relaxed italic">
                    {product.description}
                  </p>

                  <SustainabilityScoreGauge score={product.sustainabilityScore} size="lg" />

                  {/* Materials & Packaging Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-[#E1D7C6] space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#8D9971]">
                        Material Composition
                      </h4>
                      <ul className="space-y-1.5">
                        {product.materials.map((m, idx) => (
                          <li key={idx} className="flex items-center justify-between text-xs">
                            <span className="text-[#2C3333] font-medium">{m.name}</span>
                            <span className="text-[#5F7161] font-bold">{m.percentage}%</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-[#E1D7C6] space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#8D9971]">
                        Packaging & Lifecycle
                      </h4>
                      <div className="text-xs space-y-1 text-[#2C3333]">
                        <div>Type: <strong className="capitalize">{product.packaging.type.replace('_', ' ')}</strong></div>
                        <div>Plastic-Free: <strong>{product.packaging.plasticFree ? 'Yes' : 'No'}</strong></div>
                        <div>Repair Index: <strong>{product.repairabilityIndex} / 10</strong></div>
                        <div>Expected Lifespan: <strong>{product.durabilityYears} Years</strong></div>
                      </div>
                    </div>
                  </div>

                  {/* Certifications Badges */}
                  {product.certifications.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#8D9971]">
                        Verified Environmental Certifications
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {product.certifications.map((c) => (
                          <div key={c.id} className="p-3 bg-white border border-[#E1D7C6] rounded-xl flex items-start gap-2.5">
                            <Award className="w-5 h-5 text-[#5F7161] shrink-0 mt-0.5" />
                            <div>
                              <div className="text-xs font-bold text-[#2C3333]">{c.name}</div>
                              <p className="text-[11px] text-gray-500 leading-tight mt-0.5">{c.description}</p>
                              {c.verificationId && (
                                <span className="text-[10px] text-[#5F7161] font-mono block mt-1">
                                  ID: {c.verificationId}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technical Specs */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#8D9971]">
                      Technical Specifications
                    </h4>
                    <div className="bg-white p-4 rounded-2xl border border-[#E1D7C6] grid grid-cols-2 gap-3 text-xs">
                      {Object.entries(product.specs || {}).map(([key, val], idx) => (
                        <div key={idx} className="border-b border-[#E1D7C6]/50 pb-1">
                          <span className="text-gray-400 block text-[10px] uppercase font-bold">{key}</span>
                          <span className="font-semibold text-[#2C3333]">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Biodegradability Engine */}
              {activeTab === 'biodegradable' && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="bg-white p-5 rounded-2xl border border-[#E1D7C6] space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Recycle className="w-5 h-5 text-[#8D9971]" />
                        <h3 className="font-serif font-bold text-[#2C3333] text-base">Biodegradability & Decomposition Engine</h3>
                      </div>
                      <span className="text-xs font-bold px-3 py-1 bg-[#8D9971]/20 text-[#5F7161] rounded-full border border-[#8D9971]/30">
                        Score {biodegradability.biodegradabilityScore} / 100
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <div className="bg-[#F5F2ED] p-3.5 rounded-xl text-center border border-[#E1D7C6]">
                        <span className="text-[10px] font-bold text-gray-500 uppercase block">Natural Fiber %</span>
                        <span className="text-xl font-serif font-bold text-[#5F7161]">{biodegradability.naturalFiberPercent}%</span>
                      </div>
                      <div className="bg-[#F5F2ED] p-3.5 rounded-xl text-center border border-[#E1D7C6]">
                        <span className="text-[10px] font-bold text-gray-500 uppercase block">Decomposition Est.</span>
                        <span className="text-xl font-serif font-bold text-[#2C3333]">~{biodegradability.estimatedDecompositionDays} Days</span>
                      </div>
                      <div className="bg-[#F5F2ED] p-3.5 rounded-xl text-center border border-[#E1D7C6]">
                        <span className="text-[10px] font-bold text-gray-500 uppercase block">Microplastics Risk</span>
                        <span className={`text-xl font-serif font-bold ${biodegradability.microplasticsRisk === 'None' ? 'text-emerald-700' : biodegradability.microplasticsRisk === 'Low' ? 'text-amber-600' : 'text-rose-600'}`}>
                          {biodegradability.microplasticsRisk}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-[#2C3333] pt-2 border-t border-[#E1D7C6]">
                      <div className="flex justify-between py-1">
                        <span className="text-gray-500">Compostability Environment:</span>
                        <strong className="font-semibold text-[#5F7161]">{biodegradability.decompositionEnvironment}</strong>
                      </div>
                      <div className="flex justify-between py-1 border-t border-gray-100">
                        <span className="text-gray-500">Home Compostable:</span>
                        <strong>{biodegradability.homeCompostable ? 'Yes (Certified)' : 'Requires Industrial Facility'}</strong>
                      </div>
                      <div className="flex justify-between py-1 border-t border-gray-100">
                        <span className="text-gray-500">Synthetic Plastic Content:</span>
                        <strong>{biodegradability.syntheticPlasticPercent}%</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Greenwashing Audit */}
              {activeTab === 'greenwashing' && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="bg-white p-5 rounded-2xl border border-[#E1D7C6] space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-[#5F7161]" />
                        <h3 className="font-serif font-bold text-[#2C3333] text-base">AI Greenwashing & Claims Verification</h3>
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full text-white ${greenwashing.riskLevel === 'Low' ? 'bg-emerald-700' : greenwashing.riskLevel === 'Medium' ? 'bg-amber-600' : 'bg-rose-700'}`}>
                        {greenwashing.riskLevel} Risk ({greenwashing.greenwashingScore}/100 Trust)
                      </span>
                    </div>

                    <p className="text-xs text-gray-700 italic leading-relaxed bg-[#F5F2ED] p-3 rounded-xl border border-[#E1D7C6]">
                      "{greenwashing.assessmentSummary}"
                    </p>

                    {/* Verified Claims */}
                    {greenwashing.verifiedClaims.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                          <Check className="w-4 h-4 text-emerald-600" /> Audited & Verified Evidence
                        </h4>
                        <ul className="space-y-1.5">
                          {greenwashing.verifiedClaims.map((claim, idx) => (
                            <li key={idx} className="text-xs text-emerald-900 bg-emerald-50/80 p-2.5 rounded-lg border border-emerald-200 flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                              <span>{claim}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Unsupported Claims */}
                    {greenwashing.unsupportedClaims.length > 0 ? (
                      <div className="space-y-2 pt-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-amber-600" /> Unsupported or Unverified Marketing Claims
                        </h4>
                        <ul className="space-y-1.5">
                          {greenwashing.unsupportedClaims.map((claim, idx) => (
                            <li key={idx} className="text-xs text-amber-900 bg-amber-50 p-2.5 rounded-lg border border-amber-200 flex items-start gap-2">
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                              <span>{claim}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="text-xs text-emerald-700 bg-emerald-50/50 p-3 rounded-xl border border-emerald-200/60 font-medium">
                        ✓ No misleading claims or unverified eco buzzwords were detected in this product's audit.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 2: Carbon Footprint */}
              {activeTab === 'carbon' && (
                <div className="space-y-4">
                  <CarbonFootprintVisualizer carbon={product.carbonFootprint} />
                  <button
                    onClick={() => setShowLcaModal(true)}
                    className="w-full bg-[#5F7161] hover:bg-[#6D8B74] text-white font-bold text-xs py-3 rounded-2xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Layers className="w-4 h-4 text-[#EFEAD8]" /> Launch Interactive Cradle-to-Grave LCA Explorer
                  </button>
                </div>
              )}

              {/* Tab 3: Explainable AI */}
              {activeTab === 'xai' && (
                <ExplainableAICard explanation={xaiData} />
              )}

              {/* Tab 4: Review Intelligence */}
              {activeTab === 'reviews' && (
                <ReviewIntelligencePanel
                  reviewIntelligence={product.reviewIntelligence}
                  reviews={product.reviews}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {showLcaModal && (
        <LifecycleCarbonFlowModal
          product={product}
          onClose={() => setShowLcaModal(false)}
        />
      )}
    </div>
  );
};
