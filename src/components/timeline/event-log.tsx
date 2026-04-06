import { Bug, ShieldPlus, ArrowRightLeft, Shuffle, ShieldAlert, Check } from 'lucide-react';
import { type TimestepEvent } from '../../types/timeline';

interface EventLogProps {
  currentTimestep: number;
  events: TimestepEvent[];
}

export function EventLog({ currentTimestep, events }: EventLogProps) {
  
  const getAttackIcon = (type: string | null) => {
    switch(type) {
      case 'cve_exploitation': return <Bug className="w-[12px] h-[12px]" />;
      case 'privilege_escalation': return <ShieldPlus className="w-[12px] h-[12px]" />;
      case 'lateral_movement': return <ArrowRightLeft className="w-[12px] h-[12px]" />;
      case 'cross_cloud_pivot': return <Shuffle className="w-[12px] h-[12px]" />;
      case 'none': return <Check className="w-[12px] h-[12px]" />;
      default: return <ShieldAlert className="w-[12px] h-[12px]" />;
    }
  };

  const getProviderColor = (provider: string) => {
    switch(provider) {
      case 'aws': return 'bg-[#FF9900]/15 text-[#FF9900] border-[#FF9900]/30';
      case 'azure': return 'bg-[#0078D4]/15 text-[#0078D4] border-[#0078D4]/30';
      case 'gcp': return 'bg-[#EA4335]/15 text-[#EA4335] border-[#EA4335]/30';
      default: return 'bg-slate-500/15 text-slate-500 border-slate-500/30';
    }
  };

  const getPhaseColor = (phase: string | null) => {
    switch(phase) {
      case 'cve_exploitation': return 'bg-red-500/15 text-red-500 border-red-500/30';
      case 'privilege_escalation': return 'bg-orange-500/15 text-orange-500 border-orange-500/30';
      case 'lateral_movement': return 'bg-yellow-500/15 text-yellow-500 border-yellow-500/30';
      case 'cross_cloud_pivot': return 'bg-purple-500/15 text-purple-500 border-purple-500/30';
      default: return 'bg-green-500/15 text-green-500 border-green-500/30';
    }
  };

  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl flex flex-col h-[350px] md:h-[450px] overflow-hidden">
      <div className="p-4 border-b border-slate-200 dark:border-white/10 flex justify-between items-center bg-white/50 dark:bg-transparent z-10 shrink-0">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Events at t = {currentTimestep}</h3>
          <p className="text-xs text-slate-500 mt-0.5">Chronological activity log</p>
        </div>
        <div className="px-2 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-xs font-medium text-slate-600 dark:text-slate-300">
          {events.length} events
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 styled-scrollbar space-y-2 animate-in fade-in duration-200">
        {events.map((evt) => (
          <div 
            key={evt.id} 
            className={`flex items-start gap-3 p-2.5 rounded-lg border-l-[3px] ${evt.is_malicious ? 'border-l-red-500 bg-red-500/5' : 'border-l-transparent hover:bg-slate-50 dark:hover:bg-white/5'} transition-colors`}
          >
            <div className="text-[11px] font-mono text-slate-500 mt-0.5 whitespace-nowrap">{evt.timestamp}</div>
            
            <div className={`px-1.5 py-0.5 rounded border text-[9px] font-bold uppercase mt-0.5 shrink-0 ${getProviderColor(evt.provider)}`}>
              {evt.provider}
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-sm text-slate-900 dark:text-white truncate">
                <span className="font-semibold">{evt.entity_id}</span>
                <span className="mx-1.5 text-slate-400 font-mono text-xs">{evt.action}</span>
                {evt.target_id && <span className="font-semibold">{evt.target_id}</span>}
              </div>
              
              <div className="mt-1.5 flex items-center">
                <span className={`flex items-center gap-1 px-1.5 py-0.5 rounded border text-[9px] font-medium uppercase ${getPhaseColor(evt.attack_phase)}`}>
                  {getAttackIcon(evt.attack_phase)}
                  {evt.is_malicious ? evt.attack_phase?.replace('_', ' ') : 'Benign'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
