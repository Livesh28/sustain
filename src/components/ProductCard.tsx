import React from 'react';
import { Product } from '../types';
import { Leaf, Cloud, Heart, Check, ShieldCheck, ChevronRight, AlertTriangle, Clock, ShoppingBag } from 'lucide-react';
import { evaluateGreenwashingRisk, calculateBiodegradabilityProfile } from '../utils/sustainabilityEngine';

interface Props {
  product: Product;
  isWishlisted: boolean;
  isCompared: boolean;
  onToggleWishlist: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<Props> = ({
  product,
  isWishlisted,
  isCompared,
  onToggleWishlist,
  onToggleCompare,
  onSelectProduct,
  onAddToCart
}) => {
  const score = product.sustainabilityScore.overall;
  const greenwashing = product.greenwashingAnalysis || evaluateGreenwashingRisk(product);
  const biodegradability = product.biodegradabilityProfile || calculateBiodegradabilityProfile(product);

  return (
    <div className="bg-white rounded-[28px] border border-[#E1D7C6] hover:border-[#5F7161]/60 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] bg-[#F5F2ED] overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#5F7161] text-white shadow-xs">
            <Leaf className="w-3.5 h-3.5 text-[#EFEAD8]" /> Eco Score {score}
          </span>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#2C3333]/90 text-[#EFEAD8] backdrop-blur-md border border-white/10 shadow-xs">
            <Cloud className="w-3.5 h-3.5 text-[#D4A373]" /> {product.carbonFootprint.totalCO2eKg} kg CO₂e
          </span>

          {/* Greenwashing Risk Badge */}
          {greenwashing.riskLevel === 'Low' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-700 text-white shadow-xs border border-emerald-500">
              <ShieldCheck className="w-3 h-3" /> Greenwash Verified
            </span>
          )}
          {greenwashing.riskLevel === 'Medium' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-600 text-white shadow-xs border border-amber-400">
              <AlertTriangle className="w-3 h-3" /> Medium Risk Claim
            </span>
          )}
          {greenwashing.riskLevel === 'High' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-700 text-white shadow-xs border border-rose-500">
              <AlertTriangle className="w-3 h-3" /> Greenwash Alert
            </span>
          )}
        </div>

        {/* Right Floating Actions (Wishlist & Compare) */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={() => onToggleWishlist(product.id)}
            className={`p-2 rounded-full backdrop-blur-md transition-colors shadow-xs ${
              isWishlisted 
                ? 'bg-[#D4A373] text-white' 
                : 'bg-white/90 text-[#5F7161] hover:text-[#D4A373]'
            }`}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
          </button>

          <label
            className={`p-2 rounded-full backdrop-blur-md transition-colors shadow-xs cursor-pointer ${
              isCompared
                ? 'bg-[#5F7161] text-white'
                : 'bg-white/90 text-[#5F7161] hover:bg-[#F5F2ED]'
            }`}
            title="Compare Product"
          >
            <input
              type="checkbox"
              checked={isCompared}
              onChange={() => onToggleCompare(product.id)}
              className="sr-only"
            />
            <Check className={`w-4 h-4 ${isCompared ? 'opacity-100' : 'opacity-60'}`} />
          </label>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-[#8D9971] uppercase tracking-wider text-[11px]">{product.brand}</span>
            <span className="bg-[#F1F1E6] text-[#5F7161] px-2.5 py-0.5 rounded-full text-[11px] font-medium border border-[#E1D7C6]/60">{product.category}</span>
          </div>

          <h3
            onClick={() => onSelectProduct(product)}
            className="font-serif font-bold text-[#2C3333] text-lg leading-snug line-clamp-2 hover:text-[#5F7161] cursor-pointer transition-colors"
          >
            {product.title}
          </h3>

          <p className="text-xs text-gray-600 line-clamp-2 mt-2 leading-relaxed italic">
            {product.description}
          </p>
        </div>

        {/* Eco Materials & Certifications Tags */}
        <div className="space-y-2 pt-1">
          <div className="flex flex-wrap gap-1.5">
            {product.materials.slice(0, 2).map((m, i) => (
              <span key={i} className="text-[10px] font-medium bg-[#F5F2ED] text-[#5F7161] px-2.5 py-1 rounded-lg border border-[#E1D7C6]">
                {m.percentage}% {m.name}
              </span>
            ))}
            {product.packaging.plasticFree && (
              <span className="text-[10px] font-medium bg-[#EFEAD8] text-[#5F7161] px-2.5 py-1 rounded-lg border border-[#E1D7C6]">
                Plastic-Free
              </span>
            )}
            <span className="text-[10px] font-bold bg-[#8D9971]/20 text-[#5F7161] px-2.5 py-1 rounded-lg border border-[#8D9971]/30 inline-flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" />
              {biodegradability.biodegradablePercent >= 80 
                ? `Decomposes: ~${biodegradability.estimatedDecompositionDays}d` 
                : `${biodegradability.naturalFiberPercent}% Bio Content`}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#5F7161]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8D9971] shrink-0" />
            <span className="truncate italic">
              {product.certifications.length > 0
                ? product.certifications.map(c => c.name).join(', ')
                : 'Verified Eco Certification'}
            </span>
          </div>
        </div>

        {/* Footer Price & Action */}
        <div className="pt-3.5 border-t border-[#E1D7C6] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-serif font-bold text-[#2C3333]">
                {product.currency}{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs line-through text-gray-400">
                  {product.currency}{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[10px] text-gray-500 block font-medium">Repairability: {product.repairabilityIndex}/10</span>
          </div>

          <div className="flex items-center gap-1.5">
            {onAddToCart && (
              <button
                onClick={() => onAddToCart(product)}
                className="p-2.5 bg-[#F5F2ED] hover:bg-[#5F7161] text-[#2C3333] hover:text-white rounded-xl border border-[#E1D7C6] transition-all cursor-pointer shadow-2xs"
                title="Add to Eco Cart"
              >
                <ShoppingBag className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => onSelectProduct(product)}
              className="inline-flex items-center gap-1 bg-[#5F7161] hover:bg-[#4E5D50] text-white text-xs font-semibold px-3 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
            >
              Inspect <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
