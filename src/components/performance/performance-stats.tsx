import { Target, BadgeCheck, ActivitySquare, ShieldCheck } from 'lucide-react';
import { useCountUp } from '../../hooks/use-count-up';

export function PerformanceStats() {
  const accuracy = useCountUp(95, 1000);
  const f1 = useCountUp(95, 1000);
  const auc = useCountUp(97, 1000);
  const fpr = useCountUp(4, 1000);

  const stats = [
    {
      id: 'acc',
      icon: Target,
      bg: 'bg-indigo-500/20',
      text: 'text-indigo-500',
      value: `${accuracy}%`,
      label: 'Best Accuracy',
      subtext: 'Fusion Risk Model',
      note: '↑ 2% vs Temporal-only',
      noteClass: 'text-green-500'
    },
    {
      id: 'f1',
      icon: BadgeCheck,
      bg: 'bg-green-500/20',
      text: 'text-green-500',
      value: `0.${f1}`,
      label: 'Best F1',
      subtext: 'Fusion Risk Model',
      note: 'Balanced precision and recall',
      noteClass: 'text-slate-500'
    },
    {
      id: 'auc',
      icon: ActivitySquare,
      bg: 'bg-blue-500/20',
      text: 'text-blue-500',
      value: `0.${auc}`,
      label: 'Best ROC-AUC',
      subtext: 'Fusion Risk Model',
      note: 'Strong separation power',
      noteClass: 'text-slate-500'
    },
    {
      id: 'fpr',
      icon: ShieldCheck,
      bg: 'bg-amber-500/20',
      text: 'text-amber-500',
      value: `0.0${fpr}`,
      label: 'Lowest FPR',
      subtext: 'Fusion Risk Model',
      note: 'Reduced analyst fatigue',
      noteClass: 'text-green-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.id} className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl ${stat.bg} shrink-0`}>
              <stat.icon className={`w-6 h-6 ${stat.text}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-3xl font-bold text-slate-900 dark:text-white leading-none mb-1">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-0.5">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-500 truncate">
                {stat.subtext}
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/10">
            <span className={`text-[11px] font-medium ${stat.noteClass}`}>
              {stat.note}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
