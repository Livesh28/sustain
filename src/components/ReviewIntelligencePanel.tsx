import React from 'react';
import { ReviewIntelligence, Review } from '../types';
import { MessageSquare, ThumbsUp, ThumbsDown, Star, CheckCircle, Tag, Sparkles } from 'lucide-react';

interface Props {
  reviewIntelligence: ReviewIntelligence;
  reviews: Review[];
}

export const ReviewIntelligencePanel: React.FC<Props> = ({ reviewIntelligence, reviews }) => {
  const dist = reviewIntelligence.sentimentDistribution || { positive: 90, neutral: 7, negative: 3 };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 rounded-lg">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base">
              Review Intelligence Engine
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              AI NLP Sentiment Analysis & Customer Eco Feedback
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 px-3 py-1 rounded-full">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-bold text-amber-900 dark:text-amber-200">
            {reviewIntelligence.overallEcoRating || 4.8} / 5.0
          </span>
        </div>
      </div>

      {/* AI Sentiment Summary */}
      <div className="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300">
        <strong className="text-purple-600 dark:text-purple-400 font-semibold block mb-1">
          AI Executive Sentiment Summary:
        </strong>
        {reviewIntelligence.sentimentSummary}
      </div>

      {/* Sentiment Bar Distribution */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
          <span>Sentiment Breakdown</span>
          <span className="text-emerald-600 dark:text-emerald-400">{dist.positive}% Positive</span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full flex overflow-hidden">
          <div className="bg-emerald-500 h-full transition-all" style={{ width: `${dist.positive}%` }} title={`Positive ${dist.positive}%`} />
          <div className="bg-amber-400 h-full transition-all" style={{ width: `${dist.neutral}%` }} title={`Neutral ${dist.neutral}%`} />
          <div className="bg-rose-500 h-full transition-all" style={{ width: `${dist.negative}%` }} title={`Negative ${dist.negative}%`} />
        </div>
      </div>

      {/* Pros & Cons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 p-3.5 rounded-xl">
          <h5 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 mb-2">
            <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" /> Frequently Praised Pros
          </h5>
          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {reviewIntelligence.pros.map((pro, idx) => (
              <li key={idx} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 p-3.5 rounded-xl">
          <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-2">
            <ThumbsDown className="w-3.5 h-3.5 text-slate-500" /> Areas to Note
          </h5>
          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
            {reviewIntelligence.cons.length > 0 ? (
              reviewIntelligence.cons.map((con, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                  <span>{con}</span>
                </li>
              ))
            ) : (
              <li className="text-slate-400 italic">No recurring issues flagged by reviewers.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Top Eco Keywords */}
      <div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
          Top Mentioned Eco Topics
        </span>
        <div className="flex flex-wrap gap-1.5">
          {reviewIntelligence.frequentlyMentionedEcoTopics.map((topic, idx) => (
            <span key={idx} className="inline-flex items-center gap-1 text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700">
              <Tag className="w-3 h-3 text-purple-500" /> {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Customer Reviews List */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
        <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
          Verified Buyer Reviews ({reviews.length})
        </h5>
        {reviews.map((rev) => (
          <div key={rev.id} className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-200/50 dark:border-slate-700/50 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">{rev.author}</span>
                {rev.verifiedPurchase && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded">
                    <CheckCircle className="w-3 h-3" /> Verified Buyer
                  </span>
                )}
              </div>
              <span className="text-[11px] text-slate-400">{rev.date}</span>
            </div>

            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'}`} />
              ))}
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              "{rev.text}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
