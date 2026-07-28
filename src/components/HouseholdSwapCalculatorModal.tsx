import React, { useState } from 'react';
import { Product } from '../types';
import { X, Calculator, Leaf, ArrowRight, CheckCircle2, RefreshCw, ShoppingBag, Sparkles } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddToCartBatch: (products: Product[]) => void;
}

export const HouseholdSwapCalculatorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  products,
  onAddToCartBatch
}) => {
  // Monthly Household Plastic Counters
  const [takeawayBoxes, setTakeawayBoxes] = useState(25); // plastic food containers / month
  const [toothbrushes, setToothbrushes] = useState(3); // plastic toothbrushes / 3 months
  const [stationeryNotebooks, setStationeryNotebooks] = useState(2); // synthetic paper / year
  const [plasticBags, setPlasticBags] = useState(40); // plastic bags / month

  if (!isOpen) return null;

  // Impact Calculations
  const monthlyPlasticGrams = (takeawayBoxes * 35) + (toothbrushes * 18) + (stationeryNotebooks * 40) + (plasticBags * 8);
  const yearlyPlasticKg = (monthlyPlasticGrams * 12) / 1000;
  const yearlyCarbonKg = Math.round(yearlyPlasticKg * 6.2); // ~6.2 kg CO2 per kg plastic
  const yearlyRupeeSpent = (takeawayBoxes * 12 * 12) + (toothbrushes * 4 * 60) + (stationeryNotebooks * 150) + (plasticBags * 12 * 3);

  // Matched Biodegradable Alternatives in Catalog
  const sugarcaneTray = products.find(p => p.id === 'prod-001') || products[0];
  const neemBrush = products.find(p => p.id === 'prod-006') || products[1];
  const seedPaper = products.find(p => p.id === 'prod-007') || products[2];

  const handleSwapAll = () => {
    const batch = [sugarcaneTray, neemBrush, seedPaper].filter(Boolean) as Product[];
    onAddToCartBatch(batch);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="bg-white border border-[#E1D7C6] rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#5F7161] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-2xl">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-base flex items-center gap-2">
                Household Single-Use Plastic Audit
              </h2>
              <p className="text-xs text-[#A3B18A]">Calculate your plastic waste footprint & swap to zero-plastic alternatives</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full text-white/80 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <p className="text-xs text-[#2C3333]/80 leading-relaxed">
            Adjust your monthly household consumption sliders below to analyze how much plastic landfill waste and carbon footprint you generate, and see how switching to certified compostable sugarcane bagasse, neem wood, and seed paper transforms your impact.
          </p>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="bg-[#F9F7F3] border border-[#E1D7C6] p-4 rounded-2xl space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-[#2C3333]">
                <span>Plastic Takeaway Boxes / Month</span>
                <span className="text-[#5F7161] text-sm">{takeawayBoxes} pcs</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={takeawayBoxes}
                onChange={(e) => setTakeawayBoxes(Number(e.target.value))}
                className="w-full accent-[#5F7161] cursor-pointer"
              />
              <p className="text-[10px] text-gray-500">Swap with: 100% Bagasse Sugarcane Meal Trays</p>
            </div>

            <div className="bg-[#F9F7F3] border border-[#E1D7C6] p-4 rounded-2xl space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-[#2C3333]">
                <span>Plastic Toothbrushes / Year</span>
                <span className="text-[#5F7161] text-sm">{toothbrushes} pcs</span>
              </div>
              <input
                type="range"
                min="0"
                max="12"
                value={toothbrushes}
                onChange={(e) => setToothbrushes(Number(e.target.value))}
                className="w-full accent-[#5F7161] cursor-pointer"
              />
              <p className="text-[10px] text-gray-500">Swap with: Wild Neem Wood & Castor Bio-Bristles</p>
            </div>

            <div className="bg-[#F9F7F3] border border-[#E1D7C6] p-4 rounded-2xl space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-[#2C3333]">
                <span>Stationery Notebooks / Year</span>
                <span className="text-[#5F7161] text-sm">{stationeryNotebooks} pcs</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={stationeryNotebooks}
                onChange={(e) => setStationeryNotebooks(Number(e.target.value))}
                className="w-full accent-[#5F7161] cursor-pointer"
              />
              <p className="text-[10px] text-gray-500">Swap with: Tree-Free Cotton Seed Paper (Grows Tulsi)</p>
            </div>

            <div className="bg-[#F9F7F3] border border-[#E1D7C6] p-4 rounded-2xl space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-[#2C3333]">
                <span>Single-Use Carry Bags / Month</span>
                <span className="text-[#5F7161] text-sm">{plasticBags} bags</span>
              </div>
              <input
                type="range"
                min="0"
                max="150"
                value={plasticBags}
                onChange={(e) => setPlasticBags(Number(e.target.value))}
                className="w-full accent-[#5F7161] cursor-pointer"
              />
              <p className="text-[10px] text-gray-500">Swap with: Unbleached Organic Cotton Totes</p>
            </div>

          </div>

          {/* Results Impact Dashboard */}
          <div className="bg-[#2C3333] text-white p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-bold text-[#A3B18A] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#D4A373]" /> Annual Household Waste Footprint
              </span>
              <span className="text-[10px] bg-red-500/20 text-red-300 font-bold px-2 py-0.5 rounded-full border border-red-500/30">
                Conventional Waste
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="block text-lg font-black text-white">{yearlyPlasticKg.toFixed(1)} kg</span>
                <span className="text-[10px] text-gray-300 font-semibold">Plastic Landfill Waste / Yr</span>
              </div>

              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="block text-lg font-black text-[#D4A373]">{yearlyCarbonKg} kg</span>
                <span className="text-[10px] text-gray-300 font-semibold">CO₂ Emissions / Yr</span>
              </div>

              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="block text-lg font-black text-green-400">₹{yearlyRupeeSpent}</span>
                <span className="text-[10px] text-gray-300 font-semibold">Annual Single-Use Spend</span>
              </div>
            </div>

            <div className="bg-[#5F7161]/20 border border-[#5F7161]/40 rounded-xl p-3 text-xs text-[#A3B18A] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
              <span>
                By replacing these items with certified compostable alternatives, 100% of this plastic is eliminated in soil within 90–180 days!
              </span>
            </div>
          </div>

          {/* Matched Product Swaps Recommendation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#5F7161] mb-3 flex items-center gap-1.5">
              <Leaf className="w-4 h-4" /> Recommended Zero-Plastic Swap Bundle
            </h3>

            <div className="space-y-2">
              {[sugarcaneTray, neemBrush, seedPaper].filter(Boolean).map(prod => (
                <div key={prod.id} className="bg-[#F9F7F3] border border-[#E1D7C6] rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={prod.imageUrl} alt={prod.title} className="w-10 h-10 object-cover rounded-lg border border-[#E1D7C6]" />
                    <div>
                      <p className="text-xs font-bold text-[#2C3333]">{prod.title}</p>
                      <p className="text-[10px] text-[#5F7161] font-semibold">{prod.brand} • {prod.sustainabilityScore.overall}/100 Sustainability Score</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#2C3333]">₹{prod.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#F5F2ED] border-t border-[#E1D7C6] flex items-center justify-between shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-white border border-[#E1D7C6] text-[#2C3333] hover:bg-[#E1D7C6]/50 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={handleSwapAll}
            className="px-6 py-2.5 bg-[#5F7161] hover:bg-[#4E5D50] text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-md"
          >
            <ShoppingBag className="w-4 h-4" /> Add Swap Bundle to Cart & Reduce Waste
          </button>
        </div>

      </div>
    </div>
  );
};
