import { BarChart3 } from 'lucide-react';
import { type RiskReport } from '../../types/report';

interface ShapAttributionProps {
  report: RiskReport;
}

export function ShapAttribution({ report }: ShapAttributionProps) {
  // Sort contributions by magnitude for visual hierarchy, but keep original order for display
  const sortedByMagnitude = [...report.contributions].sort((a, b) => Math.abs(b.value) - Math.abs(a.value));
  const largestDriver = sortedByMagnitude[0];
  const secondaryDriver = sortedByMagnitude[1];

  const getIdentityStrength = (val: number) => {
    const abs = Math.abs(val);
    if (abs > 0.2) return 'Strong';
    if (abs > 0.05) return 'Moderate';
    return 'Weak';
  };

  const identityContrib = report.contributions.find(c => c.key === 'zidentity');
  const identityStrength = identityContrib ? getIdentityStrength(identityContrib.value) : 'N/A';

  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="w-[18px] h-[18px] text-indigo-500" /> SHAP Feature Attribution
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">Contribution of semantic feature groups to the final threat score</p>
      </div>

      <div className="space-y-4 max-w-2xl">
        {report.contributions.map((c, i) => {
          const isPositive = c.value >= 0;
          // Scale width for visibility (max expected value ~0.5, so multiply by 200 to get percentage)
          const widthPct = Math.min(Math.abs(c.value) * 200, 100);
          
          return (
            <div key={i} className="group relative flex items-center gap-3">
              <div className="w-[120px] shrink-0 text-xs font-medium text-slate-600 dark:text-slate-400">
                {c.label}
              </div>
              
              <div className="flex-1 h-4 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden relative flex">
                <div className="w-1/2 flex justify-end border-r border-slate-300 dark:border-slate-700/50">
                  {!isPositive && (
                    <div 
                      className="h-full bg-gradient-to-l from-blue-400 to-blue-500 rounded-l-full" 
                      style={{ width: `${widthPct}%`, transition: 'width 1s ease-out' }} 
                    />
                  )}
                </div>
                <div className="w-1/2 flex justify-start">
                  {isPositive && (
                    <div 
                      className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-r-full" 
                      style={{ width: `${widthPct}%`, transition: 'width 1s ease-out' }} 
                    />
                  )}
                </div>
              </div>
              
              <div className={`w-[50px] shrink-0 text-right text-xs font-mono font-bold ${isPositive ? 'text-red-500' : 'text-blue-500'}`}>
                {isPositive ? '+' : ''}{c.value.toFixed(2)}
              </div>

              {/* Custom Tooltip on hover */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max max-w-xs bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs rounded-lg py-1.5 px-3 shadow-xl z-10 pointer-events-none">
                <span className="font-semibold">{c.label}</span> contributed {isPositive ? '+' : ''}{c.value.toFixed(2)} due to {c.description.toLowerCase()}
                <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-white" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-5 border-t border-slate-200 dark:border-white/10 flex flex-wrap gap-3">
        <div className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs">
          <span className="text-slate-500">Largest driver:</span> <span className="font-semibold text-slate-900 dark:text-white">{largestDriver.label}</span>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs">
          <span className="text-slate-500">Secondary driver:</span> <span className="font-semibold text-slate-900 dark:text-white">{secondaryDriver.label}</span>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs">
          <span className="text-slate-500">Identity signal:</span> <span className="font-semibold text-slate-900 dark:text-white">{identityStrength}</span>
        </div>
      </div>
    </div>
  );
}
