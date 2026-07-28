import React, { useState } from 'react';
import { Product } from '../types';
import { Calculator, Building2, ShieldCheck, TrendingDown, ArrowRight, FileText, CheckCircle, Download, RefreshCw, Award, TreePine, Sparkles } from 'lucide-react';

interface Props {
  products: Product[];
  onSelectProduct: (p: Product) => void;
}

export const Scope3FleetCalculator: React.FC<Props> = ({ products, onSelectProduct }) => {
  // Simulator Parameters
  const [fleetType, setFleetType] = useState<'laptops' | 'chairs' | 'uniforms' | 'solar'>('laptops');
  const [unitCount, setUnitCount] = useState<number>(250);
  const [replacementYears, setReplacementYears] = useState<number>(4);
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || 'prod-001');
  const [showComplianceReport, setShowComplianceReport] = useState<boolean>(false);

  // Selected Target Product
  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];

  // Benchmark vs Target Calculation
  const benchmarkCO2ePerUnit = selectedProduct ? selectedProduct.carbonFootprint.benchmarkAverageKg : 180;
  const targetCO2ePerUnit = selectedProduct ? selectedProduct.carbonFootprint.totalCO2eKg : 65;
  const co2eSavedPerUnit = Math.max(1, benchmarkCO2ePerUnit - targetCO2ePerUnit);

  const totalCO2eSavedKg = co2eSavedPerUnit * unitCount;
  const totalCO2eSavedTons = (totalCO2eSavedKg / 1000).toFixed(2);

  const treesEquivalent = Math.round(totalCO2eSavedKg / 21); // ~21kg CO2 per tree/year
  const totalCost = (selectedProduct?.price || 100) * unitCount;
  const estimatedEnergySavings5Yr = Math.round(unitCount * (selectedProduct?.durabilityYears || 3) * 42);

  // Compliance Framework Ratings
  const complianceStandards = [
    { name: 'SEBI BRSR Core Compliance (Business Responsibility & Sustainability)', status: 'Verified', score: '99%', statusColor: 'bg-[#5F7161] text-white' },
    { name: 'CPCB Extended Producer Responsibility (EPR Directive 2026)', status: 'Audit Passed', score: '96%', statusColor: 'bg-[#8D9971] text-white' },
    { name: 'Bureau of Indian Standards (BIS Eco Mark & BEE Star)', status: 'Certified', score: '100%', statusColor: 'bg-[#5F7161] text-white' },
    { name: 'ISO 14040 Lifecycle Carbon Assessment (LCA India)', status: 'Certified', score: '94%', statusColor: 'bg-[#8D9971] text-white' }
  ];

  return (
    <div className="space-y-8">
      {/* Executive Header Banner */}
      <div className="bg-[#2C3333] text-white rounded-[32px] p-8 border border-[#E1D7C6]/20 shadow-xs relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#5F7161] text-[#EFEAD8] text-xs font-bold px-3.5 py-1 rounded-full border border-[#6D8B74]">
            <Building2 className="w-3.5 h-3.5" /> Enterprise Scope 3 Decarbonization Module
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Scope 3 Fleet Replacement & ESG Strategy Simulator
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed italic">
            Simulate enterprise-wide hardware & equipment swaps to measure total Scope 3 carbon reduction, evaluate 5-year TCO energy savings in ₹, and download SEBI BRSR & CPCB EPR compliance audits.
          </p>
        </div>

        <div className="absolute -right-12 -bottom-12 w-80 h-80 bg-[#5F7161]/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Simulator Inputs & Dynamic Outputs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 bg-white p-7 rounded-[32px] border border-[#E1D7C6] shadow-xs space-y-6">
          <h3 className="text-xl font-serif font-bold text-[#2C3333] flex items-center gap-2 border-b border-[#E1D7C6] pb-3">
            <Calculator className="w-5 h-5 text-[#5F7161]" /> Fleet Parameters
          </h3>

          {/* Fleet Preset Type */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8D9971]">
              Select Equipment Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'laptops', label: 'IT Hardware & Laptops' },
                { id: 'chairs', label: 'Office Furniture & Chairs' },
                { id: 'uniforms', label: 'Organic Corporate Apparel' },
                { id: 'solar', label: 'Renewable Power Units' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setFleetType(item.id as any)}
                  className={`p-3 rounded-2xl text-xs font-bold text-left border transition-all cursor-pointer ${
                    fleetType === item.id
                      ? 'bg-[#5F7161] text-white border-[#5F7161] shadow-xs'
                      : 'bg-[#F5F2ED] text-[#2C3333] border-[#E1D7C6] hover:bg-[#EFEAD8]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Fleet Product Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8D9971]">
              Target Eco-Audited Product Swap
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full bg-[#F5F2ED] border border-[#E1D7C6] rounded-2xl p-3 text-xs font-bold text-[#2C3333] focus:ring-2 focus:ring-[#5F7161] outline-none cursor-pointer"
            >
              {products.map(p => (
                <option key={p.id} value={p.id}>
                  {p.title} — Grade {p.sustainabilityScore.grade} ({p.carbonFootprint.totalCO2eKg}kg CO₂e)
                </option>
              ))}
            </select>
          </div>

          {/* Fleet Size Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-[#2C3333]">
              <span>Fleet Unit Volume</span>
              <span className="font-serif text-base text-[#5F7161]">{unitCount} Units</span>
            </div>
            <input
              type="range"
              min="10"
              max="2000"
              step="10"
              value={unitCount}
              onChange={(e) => setUnitCount(Number(e.target.value))}
              className="w-full accent-[#5F7161] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-bold">
              <span>10 Units</span>
              <span>1,000 Units</span>
              <span>2,000 Units</span>
            </div>
          </div>

          {/* Lifecycle Lifespan Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-[#2C3333]">
              <span>Target Asset Lifespan</span>
              <span className="font-serif text-base text-[#D4A373]">{replacementYears} Years</span>
            </div>
            <input
              type="range"
              min="2"
              max="10"
              step="1"
              value={replacementYears}
              onChange={(e) => setReplacementYears(Number(e.target.value))}
              className="w-full accent-[#D4A373] cursor-pointer"
            />
          </div>

          {/* Target Product Summary Box */}
          {selectedProduct && (
            <div className="p-4 bg-[#F5F2ED] rounded-2xl border border-[#E1D7C6] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img src={selectedProduct.imageUrl} alt={selectedProduct.title} className="w-12 h-12 rounded-xl object-cover border border-[#E1D7C6]" />
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#2C3333] line-clamp-1">{selectedProduct.title}</h4>
                  <p className="text-[11px] text-[#5F7161] font-semibold">₹{selectedProduct.price.toLocaleString('en-IN')} / unit • Grade {selectedProduct.sustainabilityScore.grade}</p>
                </div>
              </div>
              <button
                onClick={() => onSelectProduct(selectedProduct)}
                className="bg-[#5F7161] text-white text-[11px] font-bold px-3 py-1.5 rounded-xl hover:bg-[#6D8B74] transition-colors shrink-0 cursor-pointer"
              >
                Inspect
              </button>
            </div>
          )}
        </div>

        {/* Results Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Executive KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-[28px] border border-[#E1D7C6] shadow-xs space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8D9971]">Scope 3 CO₂e Reduced</span>
              <div className="text-2xl font-serif font-bold text-[#5F7161]">
                {totalCO2eSavedTons} Tonnes
              </div>
              <p className="text-[10px] text-gray-500 italic">vs Conventional Baseline</p>
            </div>

            <div className="bg-white p-5 rounded-[28px] border border-[#E1D7C6] shadow-xs space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8D9971]">Trees Equivalent</span>
              <div className="text-2xl font-serif font-bold text-[#2C3333] flex items-center gap-1.5">
                <TreePine className="w-5 h-5 text-[#8D9971]" /> {treesEquivalent.toLocaleString()}
              </div>
              <p className="text-[10px] text-gray-500 italic">Annual Sequestration</p>
            </div>

            <div className="bg-white p-5 rounded-[28px] border border-[#E1D7C6] shadow-xs space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8D9971]">5-Year TCO Energy Saved</span>
              <div className="text-2xl font-serif font-bold text-[#D4A373]">
                ₹{estimatedEnergySavings5Yr.toLocaleString('en-IN')}
              </div>
              <p className="text-[10px] text-gray-500 italic">Energy & Maintenance</p>
            </div>
          </div>

          {/* Detailed Impact Breakdown */}
          <div className="bg-white p-7 rounded-[32px] border border-[#E1D7C6] shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-[#E1D7C6] pb-3">
              <h3 className="text-xl font-serif font-bold text-[#2C3333]">
                Decarbonization Impact Breakdown
              </h3>
              <span className="text-xs font-bold text-[#5F7161] bg-[#F1F1E6] px-3 py-1 rounded-full border border-[#E1D7C6]">
                Capital Budget: ₹{totalCost.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="space-y-4 text-xs">
              {/* Comparison Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-bold text-[#2C3333]">
                  <span>Conventional Industry Baseline Carbon</span>
                  <span>{(benchmarkCO2ePerUnit * unitCount / 1000).toFixed(2)} Tonnes CO₂e</span>
                </div>
                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                  <div className="bg-rose-700 h-full w-full" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between font-bold text-[#2C3333]">
                  <span>Leviathan Fleet Swap Carbon Emissions</span>
                  <span className="text-[#5F7161]">{(targetCO2ePerUnit * unitCount / 1000).toFixed(2)} Tonnes CO₂e</span>
                </div>
                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-[#5F7161] h-full rounded-full"
                    style={{ width: `${Math.min(100, (targetCO2ePerUnit / benchmarkCO2ePerUnit) * 100)}%` }}
                  />
                </div>
              </div>

              <div className="p-4 bg-[#F1F1E6] rounded-2xl border border-[#E1D7C6] flex items-center gap-3 text-[#2C3333] leading-relaxed">
                <Sparkles className="w-5 h-5 text-[#D4A373] shrink-0" />
                <p>
                  Executing this swap across <strong>{unitCount} units</strong> delivers a <strong>{selectedProduct?.sustainabilityScore.overall}% Sustainability Rating</strong>, saving <strong>{totalCO2eSavedTons} metric tonnes of CO₂e</strong> over {replacementYears} years.
                </p>
              </div>
            </div>
          </div>

          {/* Regulatory ESG Compliance Matrix */}
          <div className="bg-white p-7 rounded-[32px] border border-[#E1D7C6] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#E1D7C6] pb-3">
              <h3 className="text-xl font-serif font-bold text-[#2C3333] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#5F7161]" /> Regulatory ESG Audit Pass Status
              </h3>
              <button
                onClick={() => setShowComplianceReport(!showComplianceReport)}
                className="text-xs font-bold text-[#5F7161] hover:underline cursor-pointer flex items-center gap-1"
              >
                <FileText className="w-4 h-4" /> {showComplianceReport ? 'Hide Audit PDF' : 'Download ESG Audit'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {complianceStandards.map((std, idx) => (
                <div key={idx} className="p-3.5 bg-[#F5F2ED] rounded-2xl border border-[#E1D7C6] flex items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-xs text-[#2C3333]">{std.name}</h4>
                    <span className="text-[10px] text-[#5F7161] font-semibold">{std.status}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${std.statusColor}`}>
                    {std.score}
                  </span>
                </div>
              ))}
            </div>

            {/* Simulated Compliance Report Exporter */}
            {showComplianceReport && (
              <div className="p-5 bg-[#2C3333] text-white rounded-2xl space-y-3 animate-fade-in">
                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <span className="font-serif font-bold text-sm text-[#EFEAD8]">Official Corporate ESG Compliance Certificate #ESG-2026-9042</span>
                  <span className="text-[10px] text-gray-400">Issued July 2026</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed italic">
                  This audit certifies that the proposed procurement swap of {unitCount}x {selectedProduct.title} complies with EU Digital Product Passport (DPP), CSDDD Article 12 supply chain due diligence, and FTC zero-greenwashing guidelines.
                </p>
                <button
                  onClick={() => alert('ESG Compliance Strategy Brief downloaded (PDF simulation)!')}
                  className="w-full bg-[#5F7161] hover:bg-[#6D8B74] text-white font-bold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Export Signed Executive Briefing (PDF)
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
