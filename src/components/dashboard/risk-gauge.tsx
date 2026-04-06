import { Gauge } from 'lucide-react';
import { riskGaugeData } from '../../lib/mock-data/dashboard-stats';

export function RiskGauge() {
  const { overall, breakdown } = riskGaugeData;

  const getRiskLevel = (score: number) => {
    if (score >= 76) return { label: 'CRITICAL', colorClass: 'bg-red-500', badgeClass: 'bg-red-500/15 text-red-500' };
    if (score >= 51) return { label: 'HIGH', colorClass: 'bg-orange-500', badgeClass: 'bg-orange-500/15 text-orange-500' };
    if (score >= 26) return { label: 'MEDIUM', colorClass: 'bg-yellow-500', badgeClass: 'bg-yellow-500/15 text-yellow-500' };
    return { label: 'LOW', colorClass: 'bg-green-500', badgeClass: 'bg-green-500/15 text-green-500' };
  };

  const risk = getRiskLevel(overall);
  
  // Calculate SVG arc
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const arcLength = (circumference / 2); // Semi-circle
  const dashOffset = arcLength - (arcLength * (overall / 100));

  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Gauge className="w-[18px] h-[18px] text-indigo-500" /> Environment Risk
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">Overall risk score across all providers</p>
      </div>

      <div className="flex flex-col items-center justify-center pt-4">
        {/* Simple SVG Semi-circle Gauge */}
        <div className="relative w-48 h-24 overflow-hidden flex justify-center">
          <svg className="w-48 h-48 transform -rotate-180" viewBox="0 0 160 160">
            {/* Background arc */}
            <circle
              cx="80" cy="80" r={radius}
              fill="none"
              stroke="currentColor"
              className="text-slate-100 dark:text-white/5"
              strokeWidth="16"
              strokeDasharray={`${arcLength} ${circumference}`}
            />
            {/* Value arc */}
            <circle
              cx="80" cy="80" r={radius}
              fill="none"
              className={risk.colorClass.replace('bg-', 'text-')}
              stroke="currentColor"
              strokeWidth="16"
              strokeDasharray={`${arcLength} ${circumference}`}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 1s ease-out' }}
            />
          </svg>
          
          <div className="absolute bottom-0 flex flex-col items-center">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-slate-900 dark:text-white">{overall}</span>
              <span className="text-sm text-slate-500">/100</span>
            </div>
          </div>
        </div>

        <div className={`mt-2 px-3 py-1 rounded-full text-sm font-bold tracking-wider ${risk.badgeClass}`}>
          {risk.label}
        </div>
      </div>

      <div className="mt-8 flex-1">
        <h4 className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-4">Risk Breakdown</h4>
        <div className="space-y-3">
          {[
            { label: 'Structural Risk', value: breakdown.structural },
            { label: 'Temporal Risk', value: breakdown.temporal },
            { label: 'Vulnerability', value: breakdown.vulnerability },
            { label: 'Identity Risk', value: breakdown.identity },
          ].map((item, i) => {
            const itemRisk = getRiskLevel(item.value);
            return (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs text-slate-500 w-[110px] truncate">{item.label}</span>
                <div className="flex-1 h-1.5 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full ${itemRisk.colorClass}`} style={{ width: `${item.value}%` }} />
                </div>
                <span className="text-xs font-mono font-medium w-[30px] text-right text-slate-900 dark:text-white">{item.value}</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
