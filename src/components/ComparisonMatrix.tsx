import React from 'react';
import { Product } from '../types';
import { Trophy, Leaf, Cloud, Check, X, Award, Wrench, Shield, ArrowRight, BarChart3 } from 'lucide-react';

interface Props {
  products: Product[];
  onRemoveFromCompare: (id: string) => void;
  onClearCompare: () => void;
  onSelectProduct: (product: Product) => void;
}

export const ComparisonMatrix: React.FC<Props> = ({
  products,
  onRemoveFromCompare,
  onClearCompare,
  onSelectProduct
}) => {
  if (products.length === 0) {
    return (
      <div className="bg-white border border-[#E1D7C6] rounded-[32px] p-12 text-center space-y-4 shadow-xs">
        <div className="p-4 bg-[#F1F1E6] text-[#5F7161] rounded-full w-16 h-16 mx-auto flex items-center justify-center">
          <Leaf className="w-8 h-8 text-[#5F7161]" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-[#2C3333]">
          No Products Selected for Comparison
        </h3>
        <p className="text-sm text-[#5F7161] max-w-md mx-auto italic">
          Check the comparison box on product cards in the catalog to perform side-by-side sustainability and decision intelligence audits.
        </p>
      </div>
    );
  }

  // Determine top eco winner
  const bestEcoProduct = [...products].sort((a, b) => b.sustainabilityScore.overall - a.sustainabilityScore.overall)[0];

  return (
    <div className="bg-white rounded-[32px] border border-[#E1D7C6] shadow-xs overflow-hidden p-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E1D7C6] pb-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#2C3333] flex items-center gap-2">
            Multi-Product Sustainability Comparison Matrix
          </h2>
          <p className="text-xs text-[#5F7161] italic mt-0.5">
            Comparing {products.length} eco-audited products side-by-side • Team Leviathan Decision Intelligence
          </p>
        </div>

        <button
          onClick={onClearCompare}
          className="text-xs font-bold text-rose-700 hover:underline self-start sm:self-auto cursor-pointer"
        >
          Clear All Selected
        </button>
      </div>

      {/* Slide 8 Benchmarks: Comparative Performance Metrics */}
      <div className="bg-[#F5F2ED]/90 border border-[#E1D7C6] rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#5F7161] flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4 text-[#D4A373]" /> Comparative Performance Metrics (Eco Benchmark Index)
          </h3>
          <span className="text-[10px] bg-[#5F7161]/10 text-[#5F7161] font-bold px-2.5 py-0.5 rounded-full border border-[#5F7161]/20">
            Leviathan Decision Engine
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white p-3 rounded-xl border border-[#E1D7C6] space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-[#2C3333]">
              <span>Standard vs Eco Detergent</span>
              <span className="text-[#5F7161]">92% Eco Score</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden flex">
              <div className="bg-gray-400 h-full" style={{ width: '35%' }} title="Standard Detergent (35%)"></div>
              <div className="bg-[#5F7161] h-full" style={{ width: '57%' }} title="Eco Detergent (+57%)"></div>
            </div>
            <p className="text-[10px] text-gray-500">Standard Detergent: 35% vs Eco Detergent: 92% (+57% CO₂ reduction)</p>
          </div>

          <div className="bg-white p-3 rounded-xl border border-[#E1D7C6] space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-[#2C3333]">
              <span>Regular vs Recycled Sneakers</span>
              <span className="text-[#5F7161]">95% Eco Score</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden flex">
              <div className="bg-gray-400 h-full" style={{ width: '30%' }} title="Regular Sneakers (30%)"></div>
              <div className="bg-[#5F7161] h-full" style={{ width: '65%' }} title="Recycled Sneakers (+65%)"></div>
            </div>
            <p className="text-[10px] text-gray-500">Regular Sneakers: 30% vs Recycled Sneakers: 95% (+65% CO₂ reduction)</p>
          </div>

          <div className="bg-white p-3 rounded-xl border border-[#E1D7C6] space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-[#2C3333]">
              <span>Plastic Bottle vs Sustainable Packaging</span>
              <span className="text-[#5F7161]">100% Eco Score</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden flex">
              <div className="bg-gray-400 h-full" style={{ width: '20%' }} title="Plastic Bottle (20%)"></div>
              <div className="bg-[#5F7161] h-full" style={{ width: '80%' }} title="Sustainable Packaging (+80%)"></div>
            </div>
            <p className="text-[10px] text-gray-500">Plastic Bottle: 20% vs Sustainable Packaging: 100% (Zero Plastic)</p>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[650px]">
          <thead>
            <tr className="border-b border-[#E1D7C6]">
              <th className="p-3 text-xs font-bold uppercase tracking-wider text-[#8D9971] w-44">
                Criteria
              </th>
              {products.map((p) => {
                const isWinner = p.id === bestEcoProduct.id;
                return (
                  <th key={p.id} className="p-3 min-w-[200px] align-top relative">
                    <div className="space-y-2">
                      {isWinner && (
                        <span className="inline-flex items-center gap-1 bg-[#D4A373] text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                          <Trophy className="w-3 h-3 text-white" /> Eco Winner
                        </span>
                      )}

                      <div className="aspect-video rounded-2xl bg-[#F5F2ED] overflow-hidden border border-[#E1D7C6]">
                        <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                      </div>

                      <div className="font-serif font-bold text-base text-[#2C3333] line-clamp-2">
                        {p.title}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#8D9971]">{p.brand}</span>
                        <button
                          onClick={() => onRemoveFromCompare(p.id)}
                          className="text-[10px] text-rose-600 font-bold hover:underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E1D7C6]/60 text-xs text-[#2C3333]">
            {/* Price */}
            <tr>
              <td className="p-3 font-bold text-[#8D9971]">Price</td>
              {products.map(p => (
                <td key={p.id} className="p-3 font-serif font-bold text-[#2C3333] text-base">
                  {p.currency}{p.price.toLocaleString('en-IN')}
                </td>
              ))}
            </tr>

            {/* Sustainability Score */}
            <tr className="bg-[#F5F2ED]/80">
              <td className="p-3 font-serif font-bold text-[#5F7161]">
                Sustainability Score
              </td>
              {products.map(p => (
                <td key={p.id} className="p-3">
                  <span className="font-serif font-bold text-lg text-[#5F7161]">
                    {p.sustainabilityScore.overall} / 100
                  </span>
                  <span className="ml-2 text-xs font-bold text-[#5F7161] bg-[#F1F1E6] px-2.5 py-1 rounded-full border border-[#E1D7C6]">
                    Grade {p.sustainabilityScore.grade}
                  </span>
                </td>
              ))}
            </tr>

            {/* Carbon Footprint */}
            <tr>
              <td className="p-3 font-bold text-[#8D9971]">
                Lifecycle Carbon CO₂e
              </td>
              {products.map(p => (
                <td key={p.id} className="p-3 font-semibold text-[#5F7161]">
                  {p.carbonFootprint.totalCO2eKg} kg
                </td>
              ))}
            </tr>

            {/* Zero Plastic Packaging */}
            <tr>
              <td className="p-3 font-bold text-[#8D9971]">Plastic-Free Packaging</td>
              {products.map(p => (
                <td key={p.id} className="p-3">
                  {p.packaging.plasticFree ? (
                    <span className="text-[#5F7161] font-bold flex items-center gap-1"><Check className="w-4 h-4 text-[#8D9971]" /> Yes</span>
                  ) : (
                    <span className="text-gray-400 font-medium flex items-center gap-1"><X className="w-4 h-4 text-gray-400" /> No</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Repairability Index */}
            <tr>
              <td className="p-3 font-bold text-[#8D9971]">Repairability Index</td>
              {products.map(p => (
                <td key={p.id} className="p-3 font-bold text-[#2C3333]">
                  {p.repairabilityIndex} / 10
                </td>
              ))}
            </tr>

            {/* Durability Years */}
            <tr>
              <td className="p-3 font-bold text-[#8D9971]">Durability Lifespan</td>
              {products.map(p => (
                <td key={p.id} className="p-3 text-[#2C3333]">
                  {p.durabilityYears} Years
                </td>
              ))}
            </tr>

            {/* Certifications */}
            <tr>
              <td className="p-3 font-bold text-[#8D9971]">Certifications</td>
              {products.map(p => (
                <td key={p.id} className="p-3">
                  {p.certifications.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {p.certifications.map((c, i) => (
                        <span key={i} className="bg-[#F5F2ED] text-[#2C3333] border border-[#E1D7C6] px-2 py-0.5 rounded-lg text-[10px] font-semibold">
                          {c.name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-400 italic">None</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Decision Score */}
            <tr className="bg-[#EFEAD8]/60">
              <td className="p-3 font-serif font-bold text-[#2C3333]">
                Decision Intelligence
              </td>
              {products.map(p => (
                <td key={p.id} className="p-3 font-serif font-bold text-[#D4A373] text-base">
                  {p.decisionScore.overall} / 100
                </td>
              ))}
            </tr>

            {/* Action Row */}
            <tr>
              <td className="p-3 font-bold text-[#8D9971]">Action</td>
              {products.map(p => (
                <td key={p.id} className="p-3">
                  <button
                    onClick={() => onSelectProduct(p)}
                    className="w-full bg-[#5F7161] hover:bg-[#6D8B74] text-white font-semibold py-2.5 px-3 rounded-xl text-xs transition-colors shadow-xs cursor-pointer"
                  >
                    Inspect Full Audit
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
