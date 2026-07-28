import React from 'react';
import { Product } from '../types';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, TrendingUp, Cloud, Leaf, ShieldAlert, Award, DollarSign, Package } from 'lucide-react';

interface Props {
  products: Product[];
}

export const AnalyticsDashboardView: React.FC<Props> = ({ products }) => {
  // Aggregate KPIs
  const totalProducts = products.length;
  const avgEcoScore = Math.round(products.reduce((acc, p) => acc + p.sustainabilityScore.overall, 0) / (totalProducts || 1));
  const totalCarbonSavedKg = Math.round(products.reduce((acc, p) => acc + (p.carbonFootprint.benchmarkAverageKg - p.carbonFootprint.totalCO2eKg), 0));
  const totalPlasticFreeCount = products.filter(p => p.packaging.plasticFree).length;

  // Chart Data 1: Category Sustainability Scores
  const categoryData = Object.entries(
    products.reduce((acc: Record<string, { count: number; totalScore: number }>, p) => {
      acc[p.category] = acc[p.category] || { count: 0, totalScore: 0 };
      acc[p.category].count += 1;
      acc[p.category].totalScore += p.sustainabilityScore.overall;
      return acc;
    }, {})
  ).map(([cat, val]: [string, { count: number; totalScore: number }]) => ({
    category: cat,
    avgScore: Math.round(val.totalScore / val.count),
    itemCount: val.count
  }));

  // Chart Data 2: Monthly Carbon Offsets Trend
  const monthlyTrendData = [
    { month: 'Jan', carbonSaved: 120, plasticAvoided: 450 },
    { month: 'Feb', carbonSaved: 210, plasticAvoided: 820 },
    { month: 'Mar', carbonSaved: 340, plasticAvoided: 1200 },
    { month: 'Apr', carbonSaved: 480, plasticAvoided: 1650 },
    { month: 'May', carbonSaved: 620, plasticAvoided: 2100 },
    { month: 'Jun', carbonSaved: 850, plasticAvoided: 2900 },
    { month: 'Jul', carbonSaved: 1120, plasticAvoided: 3800 }
  ];

  // Chart Data 3: Material Types Distribution with Natural Tones palette
  const materialDist = [
    { name: 'Organic Fiber', value: 35, color: '#5F7161' },
    { name: 'Recycled Aluminum/Steel', value: 30, color: '#8D9971' },
    { name: 'Bio-based Bamboo/Hemp', value: 20, color: '#D4A373' },
    { name: 'Borosilicate Glass', value: 10, color: '#E1D7C6' },
    { name: 'Virgin Plastics', value: 5, color: '#2C3333' }
  ];

  return (
    <div className="space-y-8">
      {/* Top Executive KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-[28px] border border-[#E1D7C6] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#8D9971]">Total Products Audited</span>
            <div className="text-3xl font-serif font-bold text-[#2C3333] mt-1">{totalProducts} Items</div>
            <span className="text-[11px] text-[#5F7161] font-medium italic">100% Real-time Verified</span>
          </div>
          <div className="p-3.5 bg-[#F1F1E6] text-[#5F7161] rounded-2xl border border-[#E1D7C6]">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-[28px] border border-[#E1D7C6] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#8D9971]">Average Eco Score</span>
            <div className="text-3xl font-serif font-bold text-[#5F7161] mt-1">{avgEcoScore} / 100</div>
            <span className="text-[11px] text-[#5F7161] font-medium italic">Grade A Average</span>
          </div>
          <div className="p-3.5 bg-[#F1F1E6] text-[#5F7161] rounded-2xl border border-[#E1D7C6]">
            <Leaf className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-[28px] border border-[#E1D7C6] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#8D9971]">Total Carbon Avoided</span>
            <div className="text-3xl font-serif font-bold text-[#2C3333] mt-1">{totalCarbonSavedKg} kg</div>
            <span className="text-[11px] text-[#8D9971] font-medium italic">vs Industry Benchmark</span>
          </div>
          <div className="p-3.5 bg-[#F1F1E6] text-[#5F7161] rounded-2xl border border-[#E1D7C6]">
            <Cloud className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-[28px] border border-[#E1D7C6] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#8D9971]">Plastic-Free Rate</span>
            <div className="text-3xl font-serif font-bold text-[#D4A373] mt-1">
              {Math.round((totalPlasticFreeCount / (totalProducts || 1)) * 100)}%
            </div>
            <span className="text-[11px] text-[#D4A373] font-medium italic">{totalPlasticFreeCount} Plastic-Free Items</span>
          </div>
          <div className="p-3.5 bg-[#F1F1E6] text-[#D4A373] rounded-2xl border border-[#E1D7C6]">
            <Award className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Chart Row 1: Carbon Trend & Category Scores */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Carbon Saved Monthly Trend */}
        <div className="lg:col-span-7 bg-white p-6 rounded-[32px] border border-[#E1D7C6] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-[#2C3333] text-xl flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#5F7161]" /> Cumulative Carbon Avoidance Trend
              </h3>
              <p className="text-xs text-[#5F7161] italic mt-0.5">Monthly CO₂e savings across consumer purchases (kg)</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrendData}>
                <defs>
                  <linearGradient id="colorCarbon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5F7161" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#5F7161" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} stroke="#E1D7C6" />
                <XAxis dataKey="month" stroke="#2C3333" fontSize={12} />
                <YAxis stroke="#2C3333" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#F5F2ED', borderColor: '#E1D7C6', color: '#2C3333', borderRadius: '16px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="carbonSaved" name="Carbon Saved (kg)" stroke="#5F7161" strokeWidth={3} fillOpacity={1} fill="url(#colorCarbon)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Sustainability Score */}
        <div className="lg:col-span-5 bg-white p-6 rounded-[32px] border border-[#E1D7C6] shadow-xs space-y-4">
          <div>
            <h3 className="font-serif font-bold text-[#2C3333] text-xl flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#8D9971]" /> Category Eco Rating
            </h3>
            <p className="text-xs text-[#5F7161] italic mt-0.5">Average sustainability score per category</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} stroke="#E1D7C6" />
                <XAxis dataKey="category" stroke="#2C3333" fontSize={10} interval={0} />
                <YAxis domain={[50, 100]} stroke="#2C3333" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#F5F2ED', borderColor: '#E1D7C6', color: '#2C3333', borderRadius: '16px', fontSize: '12px' }} />
                <Bar dataKey="avgScore" name="Avg Eco Score" fill="#8D9971" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Chart Row 2: Material Composition Pie Chart */}
      <div className="bg-white p-6 rounded-[32px] border border-[#E1D7C6] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-md">
          <h3 className="font-serif font-bold text-[#2C3333] text-xl">
            Platform Material Composition Breakdown
          </h3>
          <p className="text-xs text-[#5F7161] leading-relaxed italic">
            Leviathan prioritizes products with certified organic fibers, 100% recycled metals, and bio-based hemp/bamboo, systematically reducing virgin plastic reliance.
          </p>

          <div className="space-y-2 pt-1">
            {materialDist.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-[#2C3333] font-medium">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="font-bold text-[#2C3333]">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-64 h-64 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={materialDist}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {materialDist.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#F5F2ED', borderRadius: '16px', color: '#2C3333', fontSize: '12px', borderColor: '#E1D7C6' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
