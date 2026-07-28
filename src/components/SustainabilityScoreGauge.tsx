import React, { useState } from 'react';
import { SustainabilityScore } from '../types';
import { Leaf, Award, ChevronDown, ChevronUp, ShieldCheck, Zap, Box, Wrench, Clock, Recycle } from 'lucide-react';

interface Props {
  score: SustainabilityScore;
  size?: 'sm' | 'md' | 'lg';
  showDetailsToggle?: boolean;
}

export const SustainabilityScoreGauge: React.FC<Props> = ({ score, size = 'md', showDetailsToggle = true }) => {
  const [expanded, setExpanded] = useState(false);

  const getScoreColor = (val: number) => {
    if (val >= 90) return { text: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500', border: 'border-emerald-500', gradient: 'from-emerald-500 to-teal-600', badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200' };
    if (val >= 75) return { text: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-500', border: 'border-teal-500', gradient: 'from-teal-500 to-cyan-600', badgeBg: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-200' };
    if (val >= 60) return { text: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500', border: 'border-amber-500', gradient: 'from-amber-500 to-orange-600', badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200' };
    return { text: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-500', border: 'border-rose-500', gradient: 'from-rose-500 to-red-600', badgeBg: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200' };
  };

  const colors = getScoreColor(score.overall);
  const radius = size === 'lg' ? 48 : size === 'md' ? 36 : 24;
  const stroke = size === 'lg' ? 8 : size === 'md' ? 6 : 4;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score.overall / 100) * circumference;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Radial SVG Gauge */}
          <div className="relative flex items-center justify-center">
            <svg
              height={radius * 2}
              width={radius * 2}
              className="transform -rotate-90"
            >
              <circle
                stroke="currentColor"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                className="text-slate-100 dark:text-slate-800"
              />
              <circle
                stroke="currentColor"
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={circumference + ' ' + circumference}
                style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.8s ease-in-out' }}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                className={colors.text}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className={`font-bold tracking-tight ${size === 'lg' ? 'text-2xl' : size === 'md' ? 'text-lg' : 'text-sm'} ${colors.text}`}>
                {score.overall}
              </span>
              {size !== 'sm' && (
                <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  / 100
                </span>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-base flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-emerald-500" /> Sustainability Score
              </h4>
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${colors.badgeBg}`}>
                Grade {score.grade}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
              {score.breakdownSummary}
            </p>
          </div>
        </div>

        {showDetailsToggle && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
            title="Toggle Detailed Score Breakdown"
          >
            {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        )}
      </div>

      {/* Expanded Factor Breakdown */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span className="flex items-center gap-1"><Recycle className="w-3.5 h-3.5 text-emerald-500" /> Materials</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">{score.materialsScore}/100</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${score.materialsScore}%` }} />
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span className="flex items-center gap-1"><Box className="w-3.5 h-3.5 text-teal-500" /> Packaging</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">{score.packagingScore}/100</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div className="bg-teal-500 h-full rounded-full" style={{ width: `${score.packagingScore}%` }} />
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-amber-500" /> Energy</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">{score.energyScore}/100</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: `${score.energyScore}%` }} />
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-blue-500" /> Durability</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">{score.durabilityScore}/100</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: `${score.durabilityScore}%` }} />
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span className="flex items-center gap-1"><Wrench className="w-3.5 h-3.5 text-indigo-500" /> Repairability</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">{score.repairabilityScore}/100</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${score.repairabilityScore}%` }} />
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-purple-500" /> Cert Bonus</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">+{score.certificationBonus} pts</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full rounded-full" style={{ width: `${(score.certificationBonus / 20) * 100}%` }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
