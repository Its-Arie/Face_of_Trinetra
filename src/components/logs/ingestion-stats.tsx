import { Database, Zap, AlertTriangle, Timer, TrendingUp, TrendingDown } from 'lucide-react';
import { ingestionStats } from '../../lib/mock-data/ingestion-stats';
import { useCountUp } from '../../hooks/use-count-up';

export function IngestionStats() {
  const animatedTotal = useCountUp(ingestionStats.totalEvents, 1000);
  const animatedRate = useCountUp(ingestionStats.eventsPerSecond, 1000);

  const cards = [
    {
      id: 'total',
      icon: Database,
      bg: 'bg-indigo-500/20',
      text: 'text-indigo-500',
      value: animatedTotal.toLocaleString(),
      label: 'Total Events',
      trend: '↑ 2,340 in last hour',
      trendColor: 'text-green-500',
      trendIcon: TrendingUp
    },
    {
      id: 'rate',
      icon: Zap,
      bg: 'bg-blue-500/20',
      text: 'text-blue-500',
      value: `${animatedRate.toLocaleString()}/s`,
      label: 'Events per Second',
      trend: '↑ 5% from avg',
      trendColor: 'text-green-500',
      trendIcon: TrendingUp
    },
    {
      id: 'errors',
      icon: AlertTriangle,
      bg: 'bg-amber-500/20',
      text: 'text-amber-500',
      value: ingestionStats.errorCount.toString(),
      label: 'Ingestion Errors',
      trend: '↓ 2 from yesterday',
      trendColor: 'text-green-500',
      trendIcon: TrendingDown,
      hasError: ingestionStats.errorCount > 0
    },
    {
      id: 'latency',
      icon: Timer,
      bg: 'bg-green-500/20',
      text: 'text-green-500',
      value: `${ingestionStats.avgLatency}ms`,
      label: 'Avg Latency',
      trend: '↓ 8% from avg',
      trendColor: 'text-green-500',
      trendIcon: TrendingDown
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(card => (
        <div 
          key={card.id}
          className={`bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-4 flex items-center gap-4 transition-transform hover:-translate-y-0.5 ${card.hasError ? 'border-l-[3px] border-l-amber-500' : ''}`}
        >
          <div className={`p-3 rounded-xl ${card.bg}`}>
            <card.icon className={`w-6 h-6 ${card.text}`} />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white leading-none mb-1.5">
              {card.value}
            </div>
            <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1">
              {card.label}
            </div>
            <div className={`flex items-center gap-1 text-[10px] font-medium ${card.trendColor}`}>
              <card.trendIcon className="w-3 h-3" /> {card.trend}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
