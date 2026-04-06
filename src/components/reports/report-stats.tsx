import { FileText, ShieldAlert, AlertTriangle, Clock3 } from 'lucide-react';
import { useCountUp } from '../../hooks/use-count-up';

interface ReportStatsProps {
  total: number;
  critical: number;
  high: number;
  today: number;
}

export function ReportStats({ total, critical, high, today }: ReportStatsProps) {
  const animatedTotal = useCountUp(total, 1000);
  const animatedCritical = useCountUp(critical, 1000);
  const animatedHigh = useCountUp(high, 1000);
  const animatedToday = useCountUp(today, 1000);

  const stats = [
    {
      id: 'total',
      icon: FileText,
      bg: 'bg-indigo-500/20',
      text: 'text-indigo-500',
      value: animatedTotal,
      label: 'Total Reports',
      subtext: 'Archived explainability reports'
    },
    {
      id: 'critical',
      icon: ShieldAlert,
      bg: 'bg-red-500/20',
      text: 'text-red-500',
      value: animatedCritical,
      label: 'Critical',
      subtext: 'Require immediate action'
    },
    {
      id: 'high',
      icon: AlertTriangle,
      bg: 'bg-orange-500/20',
      text: 'text-orange-500',
      value: animatedHigh,
      label: 'High Severity',
      subtext: 'Elevated operational risk'
    },
    {
      id: 'today',
      icon: Clock3,
      bg: 'bg-green-500/20',
      text: 'text-green-500',
      value: animatedToday,
      label: 'Generated Today',
      subtext: 'Latest report activity'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div key={stat.id} className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-5 hover:-translate-y-1 transition-transform duration-300 shadow-sm">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.text}`} />
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white leading-none mb-1.5">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-0.5">
                {stat.label}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {stat.subtext}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
