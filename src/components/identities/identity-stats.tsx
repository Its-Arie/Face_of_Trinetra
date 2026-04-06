import { Users, Link2, Target, AlertTriangle, UserX } from 'lucide-react';
import { useCountUp } from '../../hooks/use-count-up';
import { identityStats } from '../../lib/mock-data/identity-stats';

export function IdentityStats() {
  const total = useCountUp(identityStats.totalIdentities, 800);
  const linked = useCountUp(identityStats.linkedGroups, 800);
  const pivot = useCountUp(identityStats.pivotAlerts, 800);
  const unmapped = useCountUp(identityStats.unmappedCount, 800);

  // For decimals, we don't use the simple integer countup, just display directly or animate custom
  const avgSim = identityStats.avgSimilarity.toFixed(2);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {/* Total Identities */}
      <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-4 flex items-center gap-3 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
        <div className="p-2.5 rounded-full bg-indigo-500/20 shrink-0">
          <Users className="w-5 h-5 text-indigo-500" />
        </div>
        <div>
          <div className="text-xl font-bold text-slate-900 dark:text-white leading-none mb-1">{total}</div>
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider leading-none mb-1">Total Identities</div>
          <div className="text-[10px] text-slate-400">Across all providers</div>
        </div>
      </div>

      {/* Linked Groups */}
      <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-4 flex items-center gap-3 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
        <div className="p-2.5 rounded-full bg-green-500/20 shrink-0">
          <Link2 className="w-5 h-5 text-green-500" />
        </div>
        <div>
          <div className="text-xl font-bold text-slate-900 dark:text-white leading-none mb-1">{linked}</div>
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider leading-none mb-1">Linked Groups</div>
          <div className="text-[10px] text-green-500">Successfully mapped</div>
        </div>
      </div>

      {/* Avg Similarity */}
      <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-4 flex items-center gap-3 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
        <div className="p-2.5 rounded-full bg-blue-500/20 shrink-0">
          <Target className="w-5 h-5 text-blue-500" />
        </div>
        <div className="flex-1">
          <div className="text-xl font-bold text-slate-900 dark:text-white leading-none mb-1">{avgSim}</div>
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider leading-none mb-1.5">Avg Similarity</div>
          <div className="h-1 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500" style={{ width: `${identityStats.avgSimilarity * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Pivot Alerts */}
      <div 
        onClick={() => scrollToSection('pivot-alerts')}
        className={`bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-4 flex items-center gap-3 cursor-pointer hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 ${identityStats.pivotAlerts > 0 ? 'border-l-[3px] border-l-orange-500' : ''}`}
      >
        <div className="p-2.5 rounded-full bg-orange-500/20 shrink-0">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
        </div>
        <div>
          <div className="text-xl font-bold text-slate-900 dark:text-white leading-none mb-1">{pivot}</div>
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider leading-none mb-1">Pivot Alerts</div>
          <div className="text-[10px] text-orange-500">↑ 2 from yesterday</div>
        </div>
      </div>

      {/* Unmapped */}
      <div 
        onClick={() => scrollToSection('unmapped-warning')}
        className={`bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-4 flex items-center gap-3 cursor-pointer hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 ${identityStats.unmappedCount > 0 ? 'border-l-[3px] border-l-red-500 relative overflow-hidden' : ''}`}
      >
        {identityStats.unmappedCount > 0 && (
          <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-red-500 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
        )}
        <div className="p-2.5 rounded-full bg-red-500/20 shrink-0">
          <UserX className="w-5 h-5 text-red-500" />
        </div>
        <div>
          <div className="text-xl font-bold text-slate-900 dark:text-white leading-none mb-1">{unmapped}</div>
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider leading-none mb-1">Unmapped</div>
          <div className="text-[10px] text-red-500">Require investigation</div>
        </div>
      </div>
    </div>
  );
}
