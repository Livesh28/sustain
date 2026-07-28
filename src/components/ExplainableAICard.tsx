import React from 'react';
import { ExplainableRecommendation } from '../types';
import { Brain, CheckCircle2, AlertTriangle, Sparkles, Shield, DollarSign, TrendingUp, Layers } from 'lucide-react';

interface Props {
  explanation: ExplainableRecommendation;
  loading?: boolean;
}

export const ExplainableAICard: React.FC<Props> = ({ explanation, loading = false }) => {
  if (loading) {
    return (
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-lg border border-slate-800 animate-pulse">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-6 h-6 text-emerald-400 animate-spin" />
          <div className="h-5 bg-slate-800 rounded w-48" />
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-slate-800 rounded w-full" />
          <div className="h-4 bg-slate-800 rounded w-3/4" />
          <div className="h-4 bg-slate-800 rounded w-5/6" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#2C3333] text-white rounded-[28px] p-6 shadow-xl border border-[#E1D7C6]/20 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-5 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#5F7161] text-[#EFEAD8] border border-[#6D8B74]">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-serif font-bold flex items-center gap-2 text-white">
              Explainable AI Insight <Sparkles className="w-4 h-4 text-[#D4A373]" />
            </h3>
            <p className="text-xs text-gray-300 italic">
              Transparent multi-criteria evaluation for <strong className="text-[#D4A373]">{explanation.productTitle}</strong>
            </p>
          </div>
        </div>

        {/* Confidence Score Badge */}
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">AI Confidence</span>
          <div className="flex items-center gap-1.5 bg-[#5F7161] border border-[#6D8B74] px-3 py-1 rounded-full text-xs font-bold text-white shadow-xs">
            <Shield className="w-3.5 h-3.5 text-[#EFEAD8]" /> {explanation.confidenceScore}% Match
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Why Recommended */}
        <div className="bg-white/5 border border-white/10 p-4.5 rounded-2xl">
          <h4 className="text-sm font-serif font-bold text-[#8D9971] flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-[#8D9971] shrink-0" /> Why Recommended
          </h4>
          <ul className="space-y-2">
            {explanation.whyRecommended.map((reason, idx) => (
              <li key={idx} className="text-xs text-gray-200 flex items-start gap-2 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8D9971] mt-1.5 shrink-0" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tradeoffs / Why Not Recommended */}
        <div className="bg-white/5 border border-white/10 p-4.5 rounded-2xl">
          <h4 className="text-sm font-serif font-bold text-[#D4A373] flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-[#D4A373] shrink-0" /> Tradeoffs & Considerations
          </h4>
          <ul className="space-y-2">
            {explanation.whyNotRecommended.map((item, idx) => (
              <li key={idx} className="text-xs text-gray-200 flex items-start gap-2 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373] mt-1.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Environmental Savings Grid */}
      <div className="mt-5 pt-4 border-t border-white/10">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#D4A373]" /> Annual Environmental Impact Savings
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl text-center">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">CO₂e Avoided</span>
            <div className="text-base font-serif font-bold text-[#8D9971] mt-0.5">
              {explanation.environmentalImpact.carbonSavedKgYear} kg / yr
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-3 rounded-xl text-center">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Plastic Avoided</span>
            <div className="text-base font-serif font-bold text-[#EFEAD8] mt-0.5">
              {explanation.environmentalImpact.plasticAvoidedGrams} g
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-3 rounded-xl text-center">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Energy Saved</span>
            <div className="text-base font-serif font-bold text-[#D4A373] mt-0.5">
              {explanation.environmentalImpact.energySavedKwhYear} kWh / yr
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-3 rounded-xl text-center">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Water Conserved</span>
            <div className="text-base font-serif font-bold text-sky-300 mt-0.5">
              {explanation.environmentalImpact.waterSavedLitersYear} L / yr
            </div>
          </div>
        </div>
      </div>

      {/* Long-Term Value ROI Banner */}
      <div className="mt-4 bg-[#5F7161]/40 border border-[#5F7161] p-4 rounded-xl flex items-center gap-3">
        <DollarSign className="w-5 h-5 text-[#D4A373] shrink-0" />
        <div className="text-xs text-[#EFEAD8]">
          <strong className="text-white font-serif font-bold text-sm">Long-Term Value ROI:</strong> {explanation.longTermValue}
        </div>
      </div>
    </div>
  );
};
