import { useEffect, useRef } from 'react';
import { type TimelineTimestep } from '../../types/timeline';
import { attackPhaseColors } from '../../lib/mock-data/timeline-data';

interface AttackTimelineProps {
  currentTimestep: number;
  setCurrentTimestep: (t: number) => void;
  timesteps: TimelineTimestep[];
}

export function AttackTimeline({ currentTimestep, setCurrentTimestep, timesteps }: AttackTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedRef.current && containerRef.current) {
      selectedRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [currentTimestep]);

  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6">
      
      <div className="w-full overflow-visible">
        <div className="overflow-x-auto overflow-y-visible styled-scrollbar pb-6" ref={containerRef}>
          <div className="flex items-center min-w-max px-4 pt-10 pb-4">
            {timesteps.map((step, index) => {
              const isSelected = currentTimestep === step.timestep;
              const phaseColor = attackPhaseColors[step.phase] || 'bg-slate-600';
              
              return (
                <div key={step.timestep} className="flex items-center relative" ref={isSelected ? selectedRef : null}>
                  
                  {/* Node */}
                  <div 
                    onClick={() => setCurrentTimestep(step.timestep)}
                    className={`relative flex flex-col items-center cursor-pointer group transition-all duration-300 ${isSelected ? 'scale-120 -translate-y-1' : 'hover:scale-110'}`}
                  >
                    {/* Badges */}
                    <div className="absolute -top-8 flex gap-1 z-10">
                      {step.total_events > 0 && (
                        <div className={`text-[9px] font-bold px-1.5 rounded-full text-white shadow-sm ${step.malicious_events > 0 ? 'bg-red-500' : 'bg-blue-500'}`}>
                          {step.total_events}
                        </div>
                      )}
                      {step.new_compromised_count > 0 && (
                        <div className="text-[9px] font-bold px-1.5 rounded-full bg-red-500 text-white border border-red-400 shadow-sm">
                          ↑{step.new_compromised_count}
                        </div>
                      )}
                    </div>

                    {/* Circle */}
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white/20 flex items-center justify-center transition-all z-0 ${phaseColor} ${isSelected ? 'shadow-[0_0_12px_rgba(99,102,241,0.8)] ring-2 ring-indigo-500 ring-offset-2 ring-offset-[#12121a]' : ''}`}>
                      <div className="w-2 h-2 rounded-full bg-white/50" />
                    </div>

                    {/* Label */}
                    <div className={`absolute -bottom-6 text-xs font-mono whitespace-nowrap ${isSelected ? 'text-indigo-500 font-bold' : 'text-slate-500'}`}>
                      {isSelected ? `t=${step.timestep}` : step.timestep}
                    </div>

                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-8 hidden group-hover:block z-50 bg-slate-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap pointer-events-none">
                      {step.phase === 'none' ? 'No Activity' : step.phase.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </div>
                  </div>

                  {/* Connecting Line */}
                  {index < timesteps.length - 1 && (
                    <div className="w-8 sm:w-12 h-0.5 mx-1 relative overflow-hidden bg-slate-200 dark:bg-slate-700">
                      <div className={`absolute inset-0 ${phaseColor} opacity-50`} />
                      {step.phase !== 'none' && (
                        <div className={`absolute inset-0 w-1/2 ${phaseColor} animate-[slideRight_1s_linear_infinite]`} />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-6 pt-4 border-t border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-1.5 text-[10px] text-slate-500"><div className="w-2 h-2 rounded-full bg-orange-500" /> Privilege Escalation</div>
        <div className="flex items-center gap-1.5 text-[10px] text-slate-500"><div className="w-2 h-2 rounded-full bg-yellow-500" /> Lateral Movement</div>
        <div className="flex items-center gap-1.5 text-[10px] text-slate-500"><div className="w-2 h-2 rounded-full bg-purple-500" /> Cross-Cloud Pivot</div>
        <div className="flex items-center gap-1.5 text-[10px] text-slate-500"><div className="w-2 h-2 rounded-full bg-red-500" /> CVE Exploitation</div>
        <div className="flex items-center gap-1.5 text-[10px] text-slate-500"><div className="w-2 h-2 rounded-full bg-slate-600 border border-slate-400" /> No Attack Activity</div>
      </div>

    </div>
  );
}
