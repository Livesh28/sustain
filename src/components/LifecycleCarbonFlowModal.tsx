import React, { useState } from 'react';
import { Product } from '../types';
import { X, Layers, AlertTriangle, CheckCircle, ArrowRight, Sparkles, Factory, Truck, Zap, Recycle, ShieldCheck, Leaf } from 'lucide-react';

interface Props {
  product: Product;
  onClose: () => void;
}

export const LifecycleCarbonFlowModal: React.FC<Props> = ({ product, onClose }) => {
  const [activeStage, setActiveStage] = useState<'raw' | 'mfg' | 'logistics' | 'usage' | 'eol'>('raw');

  const fp = product.carbonFootprint;
  const total = fp.totalCO2eKg || 1;

  const rawPct = Math.round((fp.rawMaterialsKg / total) * 100);
  const mfgPct = Math.round((fp.manufacturingKg / total) * 100);
  const logPct = Math.round((fp.logisticsKg / total) * 100);
  const usePct = Math.round((fp.usagePowerKg / total) * 100);
  const eolPct = Math.round((fp.endOfLifeKg / total) * 100);

  const stages = [
    {
      id: 'raw',
      title: '1. Raw Material Extraction',
      kg: fp.rawMaterialsKg,
      pct: rawPct,
      icon: Leaf,
      details: `${product.materials.map(m => `${m.percentage}% ${m.name}`).join(', ')}. Raw sourcing accounts for ${rawPct}% of total emissions.`,
      recommendation: 'Prioritize FSC-certified bamboo and 100% recycled metals to further reduce extraction emissions by 24%.'
    },
    {
      id: 'mfg',
      title: '2. Clean Manufacturing',
      kg: fp.manufacturingKg,
      pct: mfgPct,
      icon: Factory,
      details: `Factory processing powered by solar micro-grid array. Zero industrial wastewater effluent discharged into waterways.`,
      recommendation: 'Incorporate ISO 14001 energy auditing to optimize heat recovery during molding processes.'
    },
    {
      id: 'logistics',
      title: '3. Transport & Distribution',
      kg: fp.logisticsKg,
      pct: logPct,
      icon: Truck,
      details: `Zero plastic packaging with ${product.packaging.type.replace('_', ' ')}. Shipped via maritime and EV fleet delivery.`,
      recommendation: 'Regional warehouse distribution lowers maritime transport miles by ~450 km per unit.'
    },
    {
      id: 'usage',
      title: '4. Consumer Usage Phase',
      kg: fp.usagePowerKg,
      pct: usePct,
      icon: Zap,
      details: `Energy Efficiency Rating: ${product.energyRating || 'A++'}. Lifespan estimated at ${product.durabilityYears} years with repairability index of ${product.repairabilityIndex}/10.`,
      recommendation: 'High durability extends product replacement cycles, cutting consumer lifetime electronic waste.'
    },
    {
      id: 'eol',
      title: '5. Circular End-of-Life',
      kg: fp.endOfLifeKg,
      pct: eolPct,
      icon: Recycle,
      details: `Take-back recycling program active. High material recyclability rate reduces landfill dumping to under 2%.`,
      recommendation: 'Modular component design allows individual battery and board swapping without discarding enclosure.'
    }
  ];

  const currentStageInfo = stages.find(s => s.id === activeStage) || stages[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C3333]/70 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-[#E1D7C6] rounded-[32px] p-8 w-full max-w-3xl shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#F5F2ED] text-[#2C3333] hover:bg-[#EFEAD8] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-[#F1F1E6] text-[#5F7161] text-xs font-bold px-3 py-1 rounded-full border border-[#E1D7C6]">
            <Layers className="w-3.5 h-3.5 text-[#5F7161]" /> Cradle-to-Grave LCA Explorer
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#2C3333]">
            {product.title} — Lifecycle Carbon Flow
          </h2>
          <p className="text-xs text-[#5F7161] italic">
            Total Carbon Footprint: <strong>{fp.totalCO2eKg} kg CO₂e</strong> ({fp.reductionPercentVsBenchmark}% lower than industry average)
          </p>
        </div>

        {/* Interactive Lifecycle Stage Bar */}
        <div className="space-y-2">
          <div className="grid grid-cols-5 gap-1.5 h-10 rounded-2xl overflow-hidden border border-[#E1D7C6] bg-[#F5F2ED] p-1">
            {stages.map((s) => {
              const Icon = s.icon;
              const isSelected = activeStage === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveStage(s.id as any)}
                  className={`flex items-center justify-center gap-1 text-[11px] font-bold rounded-xl transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#5F7161] text-white shadow-xs'
                      : 'text-[#2C3333] hover:bg-[#EFEAD8]'
                  }`}
                  title={`${s.title}: ${s.pct}%`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden sm:inline">{s.pct}%</span>
                </button>
              );
            })}
          </div>
          <div className="flex justify-between text-[10px] text-gray-500 font-bold px-1">
            <span>Raw Extraction</span>
            <span>Manufacturing</span>
            <span>Logistics</span>
            <span>Usage</span>
            <span>End-of-Life</span>
          </div>
        </div>

        {/* Selected Stage Detail Card */}
        <div className="bg-[#F5F2ED] p-6 rounded-[28px] border border-[#E1D7C6] space-y-4">
          <div className="flex items-center justify-between border-b border-[#E1D7C6] pb-3">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#5F7161] text-white rounded-2xl">
                <currentStageInfo.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#2C3333]">
                  {currentStageInfo.title}
                </h3>
                <span className="text-xs font-bold text-[#5F7161]">
                  {currentStageInfo.kg} kg CO₂e ({currentStageInfo.pct}% of Total Footprint)
                </span>
              </div>
            </div>

            <span className="text-xs font-bold bg-[#EFEAD8] text-[#2C3333] px-3 py-1 rounded-full border border-[#E1D7C6]">
              Verified ISO 14040
            </span>
          </div>

          <p className="text-xs text-[#2C3333] leading-relaxed">
            {currentStageInfo.details}
          </p>

          <div className="p-4 bg-white rounded-2xl border border-[#E1D7C6] flex items-start gap-3 text-xs text-[#2C3333]">
            <Sparkles className="w-4 h-4 text-[#D4A373] shrink-0 mt-0.5" />
            <div>
              <strong className="font-serif text-[#5F7161] block mb-0.5">AI Sustainability Optimization Insight:</strong>
              {currentStageInfo.recommendation}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="bg-[#5F7161] hover:bg-[#6D8B74] text-white font-bold text-xs py-2.5 px-6 rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
