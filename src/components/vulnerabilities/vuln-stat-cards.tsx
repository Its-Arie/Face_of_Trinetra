import { Bug, ShieldAlert, BarChart2, Zap, Target } from 'lucide-react';
import { useCountUp } from '../../hooks/use-count-up';

export function VulnStatCards() {
  const totalCVEs = useCountUp(20, 800);
  const criticalCVEs = useCountUp(4, 800);
  const avgCVSS = useCountUp(72, 800); // animate to 72, render as 7.2
  const exploitable = useCountUp(8, 800);
  const mae = useCountUp(34, 800); // animate to 34, render as 0.34

  const cards = [
    {
      id: 'total',
      icon: Bug,
      bg: 'bg-indigo-500',
      value: totalCVEs.toString(),
      label: 'Total CVEs Tracked',
      sub: '6 core registry + 14 NER-extracted',
      borderClass: 'border-transparent'
    },
    {
      id: 'critical',
      icon: ShieldAlert,
      bg: 'bg-red-500',
      value: criticalCVEs.toString(),
      label: 'Critical Severity',
      sub: 'CVSS ≥ 9.0',
      borderClass: 'border-l-[3px] border-l-red-500'
    },
    {
      id: 'avg',
      icon: BarChart2,
      bg: 'bg-orange-500',
      value: (avgCVSS / 10).toFixed(1),
      valueClass: 'text-amber-500',
      label: 'Avg CVSS Score',
      sub: 'Across all 20 CVEs',
      borderClass: 'border-transparent'
    },
    {
      id: 'exploitable',
      icon: Zap,
      bg: 'bg-amber-500',
      value: exploitable.toString(),
      label: 'Actively Exploitable',
      sub: 'exploit_prob > 0.70',
      trend: '↑ 2 from last scan',
      borderClass: 'border-transparent'
    },
    {
      id: 'mae',
      icon: Target,
      bg: 'bg-green-500',
      value: (mae / 100).toFixed(2),
      valueClass: 'text-green-500',
      label: 'Prediction MAE',
      sub: 'Stage 3b vs CVSS ground truth',
      borderClass: 'border-transparent',
      tooltip: 'Mean Absolute Error between Stage 3b MLP predictions and actual CVSS scores across 6 core CVEs'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {cards.map(card => (
        <div 
          key={card.id}
          className={`bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-4 flex items-center gap-4 transition-transform hover:-translate-y-0.5 shadow-sm group ${card.borderClass}`}
          title={card.tooltip}
        >
          <div className={`w-12 h-12 rounded-full ${card.bg} flex items-center justify-center shrink-0`}>
            <card.icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className={`text-2xl font-bold leading-none mb-1 ${card.valueClass || 'text-slate-900 dark:text-white'}`}>
              {card.value}
            </div>
            <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wider leading-none mb-1">
              {card.label}
            </div>
            <div className="text-[10px] text-slate-400">
              {card.sub}
            </div>
            {card.trend && (
              <div className="text-[10px] text-amber-500 mt-0.5 font-medium">
                {card.trend}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
