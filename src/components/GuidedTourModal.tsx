import React, { useState } from 'react';
import { X, Play, ArrowRight, ArrowLeft, CheckCircle2, Leaf, Calculator, ShoppingBag, Brain, ShieldCheck, BarChart3, Download, Sparkles } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onStartStepAction: (stepIndex: number) => void;
}

export const GuidedTourModal: React.FC<Props> = ({ isOpen, onClose, onStartStepAction }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const tourSteps = [
    {
      id: 'step-1',
      title: '1. Certified Zero-Plastic Product Discovery',
      icon: Leaf,
      badge: 'Real Products & Impact Data',
      description: 'Explore authentic eco-friendly products likeSugarcane Bagasse Trays, Neem Toothbrushes, Cotton Seed Paper, and Bamboo Cutlery. Each item features verified carbon footprints, plastic-free packaging tags, and 100-point sustainability scores.',
      actionText: 'Explore Catalog View',
      keyHighlights: [
        '100-Point Algorithmic Sustainability Gauge',
        'ISO 17088 Compostability & Carbon LCA Specs',
        'Interactive Product Compare Matrix'
      ]
    },
    {
      id: 'step-2',
      title: '2. Household Plastic Footprint Audit',
      icon: Calculator,
      badge: 'Interactive Impact Tool',
      description: 'Use the Plastic Audit calculator to measure your household single-use plastic waste (takeaway containers, toothbrushes, plastic bags). Automatically convert consumption into yearly landfill kg and CO₂ emissions, then swap with a zero-plastic bundle in 1 click.',
      actionText: 'Open Plastic Audit Calculator',
      keyHighlights: [
        'Real-time Household Waste Calculation',
        'Instant CO₂e & Landfill Equivalency Metrics',
        'One-Click Zero-Plastic Swap Bundle'
      ]
    },
    {
      id: 'step-3',
      title: '3. Eco Cart, Reward Points & EV Checkout',
      icon: ShoppingBag,
      badge: 'Zero-Emission Commerce',
      description: 'Add products to your cart, redeem EcoPoints for instant discounts, choose 100% Zero-Emission EV delivery fleets (Ather/Tata EVs), select instant UPI or Card payments, and download official GST Tax Invoices upon order dispatch.',
      actionText: 'Open Eco Shopping Cart',
      keyHighlights: [
        'EcoPoints Loyalty Redemption (10 Pts = ₹1)',
        '100% Electric Vehicle (EV) Express Fleet',
        'Instant Downloadable GST Tax Invoice'
      ]
    },
    {
      id: 'step-4',
      title: '4. AI Sustainability Inspector & Greenwashing Guard',
      icon: Brain,
      badge: 'Gemini AI Assistant',
      description: 'Ask the AI Assistant complex questions about product lifecycles, material provenance, scope emissions, or greenwashing risks. Powered by server-side Gemini AI for explainable reasoning.',
      actionText: 'Launch AI Assistant View',
      keyHighlights: [
        'Explainable AI (XAI) Raw Data Lineage',
        'Automated Greenwashing Risk Scoring',
        'Natural Language Product Sustainability Advice'
      ]
    },
    {
      id: 'step-5',
      title: '5. Enterprise Scope 3 Fleet & Offset Marketplace',
      icon: ShieldCheck,
      badge: 'B2B & Admin Governance',
      description: 'For corporate buyers and ESG managers: calculate Scope 3 logistics emissions across electric vs. diesel transport, purchase verified carbon offset credits, and manage system audit logs in the Admin Portal.',
      actionText: 'View Scope 3 Fleet Calculator',
      keyHighlights: [
        'Scope 3 Freight & Fleet Logistics Emissions',
        'Verra & Gold Standard Offset Purchasing',
        'Real-Time Audit Logs & CSV Exports'
      ]
    }
  ];

  const step = tourSteps[currentStep];
  const StepIcon = step.icon;

  const handleExecuteAction = () => {
    onStartStepAction(currentStep);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="bg-white border border-[#E1D7C6] rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-[#2C3333] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#5F7161] rounded-2xl text-white">
              <Play className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h2 className="font-bold text-base flex items-center gap-2">
                Platform Interactive Walkthrough
              </h2>
              <p className="text-xs text-[#A3B18A]">Step {currentStep + 1} of {tourSteps.length} • How it works</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full text-white/80 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="bg-[#F5F2ED] px-6 py-2 border-b border-[#E1D7C6] flex gap-2">
          {tourSteps.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentStep(idx)}
              className={`h-2 flex-1 rounded-full transition-all cursor-pointer ${
                idx === currentStep ? 'bg-[#5F7161]' : idx < currentStep ? 'bg-[#8D9971]' : 'bg-[#E1D7C6]'
              }`}
              title={s.title}
            />
          ))}
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5F7161] bg-[#5F7161]/10 px-3 py-1 rounded-full border border-[#5F7161]/20">
              {step.badge}
            </span>
            <span className="text-xs text-gray-400 font-semibold">Guide {currentStep + 1} / 5</span>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#5F7161] text-white rounded-2xl shrink-0 shadow-xs">
              <StepIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#2C3333]">{step.title}</h3>
              <p className="text-xs text-[#2C3333]/80 leading-relaxed mt-1.5">
                {step.description}
              </p>
            </div>
          </div>

          {/* Key Features Bullet Box */}
          <div className="bg-[#F9F7F3] border border-[#E1D7C6] rounded-2xl p-4 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#5F7161] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" /> What you can try in this step:
            </h4>
            <div className="space-y-1.5">
              {step.keyHighlights.map((hl, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-[#2C3333] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Navigation Actions */}
        <div className="p-4 bg-[#F5F2ED] border-t border-[#E1D7C6] flex items-center justify-between shrink-0">
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className="p-2.5 bg-white border border-[#E1D7C6] text-[#2C3333] hover:bg-[#E1D7C6]/40 rounded-xl text-xs font-bold disabled:opacity-40 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentStep(prev => Math.min(tourSteps.length - 1, prev + 1))}
              disabled={currentStep === tourSteps.length - 1}
              className="p-2.5 bg-white border border-[#E1D7C6] text-[#2C3333] hover:bg-[#E1D7C6]/40 rounded-xl text-xs font-bold disabled:opacity-40 transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleExecuteAction}
            className="px-5 py-2.5 bg-[#5F7161] hover:bg-[#4E5D50] text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-md"
          >
            <span>{step.actionText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
