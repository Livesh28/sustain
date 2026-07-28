import React, { useState } from 'react';
import { UserProfile } from '../types';
import { TreePine, Award, Sparkles, CheckCircle2, ShieldCheck, MapPin, Download, Gift, ArrowRight } from 'lucide-react';

interface Props {
  userProfile: UserProfile;
  onRedeemPoints: (pointsCost: number, projectTitle: string) => void;
}

interface OffsetProject {
  id: string;
  title: string;
  category: 'Reforestation' | 'Solar Microgrid' | 'Ocean Plastic Cleanup' | 'Biochar Soil Enrichment';
  location: string;
  gpsCoordinates: string;
  costPointsPerKg: number;
  minPoints: number;
  co2PerUnitKg: number;
  verifiedBy: string;
  imageUrl: string;
  description: string;
}

const PROJECTS: OffsetProject[] = [
  {
    id: 'proj-1',
    title: 'Sundarbans Mangrove Tidal Forest Restoration',
    category: 'Reforestation',
    location: 'Sundarbans Biosphere Reserve, West Bengal, India',
    gpsCoordinates: '21.9497° N, 88.9007° E',
    costPointsPerKg: 10,
    minPoints: 200,
    co2PerUnitKg: 20,
    verifiedBy: 'Verra VCS Standard #1892 & Ministry of Environment India',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600',
    description: 'Planting resilient salt-water mangroves that absorb 4x more carbon than tropical rainforests while protecting Bengal coastal communities from storm surges.'
  },
  {
    id: 'proj-2',
    title: 'Himalayan High-Altitude Solar Micro-Grid',
    category: 'Solar Microgrid',
    location: 'Ladakh, High Altitude Himalayas, India',
    gpsCoordinates: '34.1526° N, 77.5771° E',
    costPointsPerKg: 15,
    minPoints: 300,
    co2PerUnitKg: 25,
    verifiedBy: 'Gold Standard GS-4091 & SECI India',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=600',
    description: 'Replacing diesel generators in remote mountain villages with 100% off-grid clean solar energy, lithium battery storage, and local employment.'
  },
  {
    id: 'proj-3',
    title: 'Kerala Backwater Ocean Plastic Interception & Upcycling',
    category: 'Ocean Plastic Cleanup',
    location: 'Kochi Backwaters & Coastal Waters, Kerala, India',
    gpsCoordinates: '9.9312° N, 76.2673° E',
    costPointsPerKg: 12,
    minPoints: 250,
    co2PerUnitKg: 15,
    verifiedBy: 'CPCB Plastic Waste Directive & Ocean Cleanup Verified',
    imageUrl: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&q=80&w=600',
    description: 'Intercepting waste plastic before entering the Arabian Sea and empowering local women cooperatives to upcycle collected plastics.'
  }
];

export const CarbonOffsetMarketplace: React.FC<Props> = ({ userProfile, onRedeemPoints }) => {
  const [selectedProject, setSelectedProject] = useState<OffsetProject>(PROJECTS[0]);
  const [redeemAmountPoints, setRedeemAmountPoints] = useState<number>(200);
  const [activeCertificate, setActiveCertificate] = useState<{
    id: string;
    projectTitle: string;
    tonsCO2: number;
    date: string;
    gps: string;
  } | null>(null);

  const calculatedCO2Kg = Math.round((redeemAmountPoints / selectedProject.costPointsPerKg) * selectedProject.co2PerUnitKg);

  const handleRedeem = () => {
    if (userProfile.rewardPoints < redeemAmountPoints) {
      alert(`Insufficient EcoPoints. You need ${redeemAmountPoints} EcoPoints, but currently have ${userProfile.rewardPoints}.`);
      return;
    }

    onRedeemPoints(redeemAmountPoints, selectedProject.title);

    // Generate Certificate
    setActiveCertificate({
      id: `CERT-OFF-${Date.now().toString().slice(-6)}`,
      projectTitle: selectedProject.title,
      tonsCO2: Number((calculatedCO2Kg / 1000).toFixed(3)),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      gps: selectedProject.gpsCoordinates
    });
  };

  return (
    <div className="space-y-8">
      {/* Executive Header */}
      <div className="bg-[#2C3333] text-white rounded-[32px] p-8 border border-[#E1D7C6]/20 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 bg-[#D4A373] text-white text-xs font-bold px-3.5 py-1 rounded-full">
            <Gift className="w-3.5 h-3.5" /> EcoPoints Impact Redemption Hub
          </div>
          <h2 className="text-3xl font-serif font-bold text-white">
            Verified Carbon Offset & Reforestation Marketplace
          </h2>
          <p className="text-xs text-gray-300 leading-relaxed italic">
            Redeem your accumulated EcoPoints to fund Gold Standard & Verra verified carbon offset projects around the globe.
          </p>
        </div>

        <div className="bg-[#5F7161] p-6 rounded-[28px] border border-[#6D8B74] text-center min-w-[220px]">
          <span className="text-xs font-bold uppercase tracking-wider text-[#EFEAD8]">Your EcoPoints Balance</span>
          <div className="text-3xl font-serif font-bold text-white mt-1">
            {userProfile.rewardPoints.toLocaleString()} Pts
          </div>
          <span className="text-[11px] text-[#EFEAD8] font-semibold italic">
            ~{(userProfile.rewardPoints * 0.5).toFixed(0)} kg CO₂ Offset Potential
          </span>
        </div>
      </div>

      {/* Projects Directory & Redemption Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Project List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-xl font-serif font-bold text-[#2C3333] flex items-center gap-2">
            <TreePine className="w-5 h-5 text-[#5F7161]" /> Verified Reforestation & Clean Energy Projects
          </h3>

          <div className="space-y-4">
            {PROJECTS.map(p => {
              const isSelected = selectedProject.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => {
                    setSelectedProject(p);
                    setRedeemAmountPoints(p.minPoints);
                  }}
                  className={`bg-white p-5 rounded-[28px] border transition-all cursor-pointer flex flex-col sm:flex-row gap-4 items-center ${
                    isSelected
                      ? 'border-[#5F7161] ring-2 ring-[#5F7161]/30 shadow-xs'
                      : 'border-[#E1D7C6] hover:border-[#5F7161]/60'
                  }`}
                >
                  <img src={p.imageUrl} alt={p.title} className="w-full sm:w-36 h-28 rounded-2xl object-cover shrink-0 border border-[#E1D7C6]" />
                  
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold bg-[#F1F1E6] text-[#5F7161] px-2.5 py-0.5 rounded-full border border-[#E1D7C6]">
                        {p.category}
                      </span>
                      <span className="text-[10px] font-bold text-[#D4A373]">
                        {p.verifiedBy}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-base text-[#2C3333]">
                      {p.title}
                    </h4>

                    <p className="text-xs text-[#5F7161] line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>

                    <div className="flex items-center gap-1 text-[11px] font-semibold text-gray-500">
                      <MapPin className="w-3.5 h-3.5 text-[#8D9971]" /> {p.location}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Redemption Calculator Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-7 rounded-[32px] border border-[#E1D7C6] shadow-xs space-y-5">
            <div className="border-b border-[#E1D7C6] pb-3">
              <h3 className="text-xl font-serif font-bold text-[#2C3333]">
                Impact Redemption Box
              </h3>
              <p className="text-xs text-[#5F7161] italic mt-0.5">
                Funding: {selectedProject.title}
              </p>
            </div>

            {/* Slider for Points */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-[#2C3333]">
                <span>Redeem Points Amount</span>
                <span className="font-serif text-lg text-[#5F7161]">{redeemAmountPoints} EcoPoints</span>
              </div>
              <input
                type="range"
                min={selectedProject.minPoints}
                max={Math.max(selectedProject.minPoints, userProfile.rewardPoints)}
                step="50"
                value={redeemAmountPoints}
                onChange={(e) => setRedeemAmountPoints(Number(e.target.value))}
                className="w-full accent-[#5F7161] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                <span>Min: {selectedProject.minPoints} Pts</span>
                <span>Max: {userProfile.rewardPoints} Pts</span>
              </div>
            </div>

            {/* Calculated CO2 Offset output */}
            <div className="p-4 bg-[#F5F2ED] rounded-2xl border border-[#E1D7C6] space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8D9971]">Verified Environmental Offset</span>
              <div className="text-2xl font-serif font-bold text-[#2C3333] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#D4A373]" /> {calculatedCO2Kg} kg CO₂e Offset
              </div>
              <p className="text-xs text-[#5F7161] italic">
                Equivalent to planting ~{Math.round(calculatedCO2Kg / 21)} trees in {selectedProject.location}
              </p>
            </div>

            {/* Redeem Action Button */}
            <button
              onClick={handleRedeem}
              disabled={userProfile.rewardPoints < redeemAmountPoints}
              className="w-full bg-[#5F7161] hover:bg-[#6D8B74] text-white font-bold text-sm py-3.5 rounded-2xl transition-colors shadow-xs cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4 text-[#EFEAD8]" /> Confirm & Generate Offset Certificate
            </button>
          </div>

          {/* Certificate Modal / Banner */}
          {activeCertificate && (
            <div className="bg-[#2C3333] text-white p-6 rounded-[32px] border border-[#E1D7C6]/40 shadow-xl space-y-4 animate-fade-in">
              <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#D4A373]" />
                  <span className="font-serif font-bold text-sm text-[#EFEAD8]">Official Carbon Offset Certificate</span>
                </div>
                <span className="text-[10px] font-mono text-gray-400">{activeCertificate.id}</span>
              </div>

              <div className="space-y-1 text-xs text-gray-200">
                <p><strong>Issued To:</strong> {userProfile.name}</p>
                <p><strong>Project:</strong> {activeCertificate.projectTitle}</p>
                <p><strong>Certified CO₂ Offset:</strong> <span className="text-[#D4A373] font-bold">{activeCertificate.tonsCO2} Metric Tonnes ({activeCertificate.tonsCO2 * 1000} kg)</span></p>
                <p><strong>GPS Location:</strong> {activeCertificate.gps}</p>
                <p><strong>Date Certified:</strong> {activeCertificate.date}</p>
              </div>

              <button
                onClick={() => alert('Certificate PDF downloaded successfully!')}
                className="w-full bg-[#5F7161] hover:bg-[#6D8B74] text-white font-bold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" /> Download Digital Certificate
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
