import { AlertTriangle, ShieldAlert, Clock, Target, Timer } from 'lucide-react';
import { alertStats } from '../../lib/mock-data/alerts';

interface AlertStatCardsProps {
  onFilter: (key: string, value: string) => void;
}

export function AlertStatCards({ onFilter }: AlertStatCardsProps) {
  const cards = [
    {
      id: 'total',
      icon: AlertTriangle,
      bg: 'bg-indigo-500/20',
      text: 'text-indigo-500',
      value: alertStats.total,
      label: 'TOTAL ALERTS',
      onClick: () => onFilter('clear', 'all')
    },
    {
      id: 'critical',
      icon: ShieldAlert,
      bg: 'bg-red-500/20',
      text: 'text-red-500',
      value: alertStats.critical,
      label: 'CRITICAL',
      sub: '3 new',
      subClass: 'text-red-400',
      onClick: () => onFilter('severity', 'critical')
    },
    {
      id: 'unacked',
      icon: Clock,
      bg: 'bg-amber-500/20',
      text: 'text-amber-500',
      value: alertStats.unacknowledged,
      label: 'UNACKNOWLEDGED',
      onClick: () => onFilter('status', 'new')
    },
    {
      id: 'avgScore',
      icon: Target,
      bg: 'bg-orange-500/20',
      text: 'text-orange-500',
      value: alertStats.avgScore.toFixed(2),
      label: 'AVG SCORE',
      onClick: () => onFilter('sort', 'Highest Score')
    },
    {
      id: 'mtta',
      icon: Timer,
      bg: 'bg-green-500/20',
      text: 'text-green-500',
      value: alertStats.meanTimeToAck,
      label: 'MTTA',
      sub: '↓ 12%',
      subClass: 'text-green-500',
      onClick: () => onFilter('sort', 'Newest First')
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 mb-4">
      {cards.map((card, i) => (
        <div
          key={card.id}
          onClick={card.onClick}
          className={`bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-xl p-3.5 flex items-center gap-3 cursor-pointer hover:-translate-y-0.5 hover:bg-slate-50 dark:hover:bg-white/5 transition-all shadow-sm ${i === 4 ? 'hidden md:flex' : ''} ${i > 2 ? 'hidden sm:flex' : ''}`}
        >
          <div className={`p-2 rounded-lg ${card.bg}`}>
            <card.icon className={`w-5 h-5 ${card.text}`} />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900 dark:text-white leading-none mb-1">
              {card.value}
            </div>
            <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wider leading-none">
              {card.label}
            </div>
            {card.sub && (
              <div className={`text-[10px] mt-1 font-medium ${card.subClass}`}>
                {card.sub}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
