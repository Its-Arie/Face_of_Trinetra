import { Zap, Timer, BellRing, Network } from 'lucide-react';
import { scalabilityMetrics } from '../../lib/mock-data/model-metrics';

const iconMap: Record<string, any> = {
  'eps': Zap,
  'latency': Timer,
  'alert': BellRing,
  'graph': Network
};

const colorMap: Record<string, string> = {
  'eps': 'text-blue-500 bg-blue-500/20',
  'latency': 'text-green-500 bg-green-500/20',
  'alert': 'text-orange-500 bg-orange-500/20',
  'graph': 'text-purple-500 bg-purple-500/20'
};

export function ScalabilityCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {scalabilityMetrics.map((metric) => {
        const Icon = iconMap[metric.id];
        const colors = colorMap[metric.id];
        
        return (
          <div key={metric.id} className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-4 mb-3">
              <div className={`p-2.5 rounded-xl ${colors.split(' ')[1]}`}>
                <Icon className={`w-5 h-5 ${colors.split(' ')[0]}`} />
              </div>
              <div>
                <div className="text-xl font-bold text-slate-900 dark:text-white leading-none mb-1">
                  {metric.value}
                </div>
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  {metric.label}
                </div>
              </div>
            </div>
            <div className="text-xs text-slate-500 pt-3 border-t border-slate-100 dark:border-white/5">
              {metric.description}
            </div>
          </div>
        );
      })}
    </div>
  );
}
