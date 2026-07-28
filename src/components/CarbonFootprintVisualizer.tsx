import React from 'react';
import { CarbonFootprint } from '../types';
import { Cloud, TreePine, ArrowDownRight, Factory, Truck, Zap, Recycle, ShieldCheck } from 'lucide-react';

interface Props {
  carbon: CarbonFootprint;
}

export const CarbonFootprintVisualizer: React.FC<Props> = ({ carbon }) => {
  const isNetNegative = carbon.totalCO2eKg <= 0;

  const stages = [
    { label: 'Raw Materials', val: carbon.rawMaterialsKg, icon: Cloud, color: 'bg-amber-500' },
    { label: 'Manufacturing', val: carbon.manufacturingKg, icon: Factory, color: 'bg-orange-500' },
    { label: 'Logistics', val: carbon.logisticsKg, icon: Truck, color: 'bg-blue-500' },
    { label: 'Usage Power', val: carbon.usagePowerKg, icon: Zap, color: 'bg-purple-500' },
    { label: 'End-of-Life', val: carbon.endOfLifeKg, icon: Recycle, color: carbon.endOfLifeKg < 0 ? 'bg-emerald-500' : 'bg-slate-400' }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-base flex items-center gap-2">
            <Cloud className="w-5 h-5 text-sky-500" /> Lifecycle Carbon Footprint (CO₂e)
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Full cradle-to-grave lifecycle emissions estimation
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/50 px-3 py-1.5 rounded-lg">
          <TreePine className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-200">
            Saves ~{carbon.treesEquivalentSaved} Trees / Year
          </span>
        </div>
      </div>

      {/* Main Metric Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl mb-5">
        <div>
          <span className="text-xs uppercase font-medium tracking-wider text-slate-500 dark:text-slate-400">
            Total CO₂e Footprint
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className={`text-2xl sm:text-3xl font-extrabold ${isNetNegative ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-slate-100'}`}>
              {carbon.totalCO2eKg} kg
            </span>
            {isNetNegative && (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded-full">
                Net Negative!
              </span>
            )}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            vs Industry Benchmark: <strong className="text-slate-700 dark:text-slate-300">{carbon.benchmarkAverageKg} kg</strong>
          </span>
        </div>

        <div className="flex flex-col justify-center border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-slate-700 pt-3 sm:pt-0 sm:pl-4">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
            <ArrowDownRight className="w-4 h-4" />
            <span>{carbon.reductionPercentVsBenchmark}% Lower Emissions</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Significantly below standard category carbon footprint threshold.
          </p>
        </div>
      </div>

      {/* Lifecycle Stage Breakdown Bars */}
      <div className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Cradle-to-Grave Stage Analysis
        </span>
        
        <div className="grid grid-cols-1 gap-2.5">
          {stages.map((stage, idx) => {
            const IconComponent = stage.icon;
            const absoluteMax = Math.max(100, Math.abs(carbon.totalCO2eKg) + 50);
            const percentWidth = Math.min(100, Math.max(5, (Math.abs(stage.val) / absoluteMax) * 100));

            return (
              <div key={idx} className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 w-32 shrink-0 text-xs font-medium text-slate-700 dark:text-slate-300">
                  <IconComponent className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{stage.label}</span>
                </div>

                <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden relative">
                  <div
                    className={`h-full rounded-full ${stage.color} transition-all duration-500`}
                    style={{ width: `${percentWidth}%` }}
                  />
                </div>

                <span className={`w-16 text-right text-xs font-bold ${stage.val < 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'}`}>
                  {stage.val > 0 ? `+${stage.val}` : stage.val} kg
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
