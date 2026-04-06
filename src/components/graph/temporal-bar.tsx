import { Clock } from 'lucide-react';
import { type GraphFilterState } from '../../types/graph';

interface TemporalBarProps {
  filters: GraphFilterState;
  setFilters: React.Dispatch<React.SetStateAction<GraphFilterState>>;
  isMobile: boolean;
}

const steps = [
  { id: 't0', label: 't=0', sub: 'Initial' },
  { id: 't4', label: 't=4', sub: 'Recon' },
  { id: 't8', label: 't=8', sub: 'Escalation' },
  { id: 't14', label: 't=14', sub: 'Lateral' },
  { id: 't19', label: 't=19', sub: 'Full Attack' },
];

export function TemporalBar({ filters, setFilters, isMobile }: TemporalBarProps) {
  
  const handleStepClick = (stepId: string) => {
    setFilters(prev => ({ ...prev, temporalSnapshot: stepId }));
  };

  const activeIndex = steps.findIndex(s => s.id === filters.temporalSnapshot);

  return (
    <div className="h-14 w-full bg-white/90 dark:bg-[#12121a]/90 backdrop-blur-xl border-t border-slate-200 dark:border-white/10 px-4 flex items-center gap-4 z-15 shrink-0">
      
      <div className="flex items-center gap-1.5 shrink-0">
        <Clock className="w-3.5 h-3.5 text-slate-500" />
        <span className="text-xs font-medium text-slate-500 hidden sm:inline">Temporal View</span>
      </div>

      <div className="flex-1 flex justify-center max-w-2xl mx-auto">
        {isMobile ? (
          <select 
            value={filters.temporalSnapshot}
            onChange={(e) => handleStepClick(e.target.value)}
            className="w-full max-w-[200px] h-8 px-2 rounded-md bg-slate-100 dark:bg-white/5 border-none text-xs text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {steps.map(s => (
              <option key={s.id} value={s.id}>{s.label} — {s.sub}</option>
            ))}
          </select>
        ) : (
          <div className="w-full flex items-center justify-between relative px-4">
            {steps.map((step, index) => {
              const isActive = index === activeIndex;
              const isVisited = index < activeIndex;

              return (
                <div key={step.id} className="flex items-center relative z-10 flex-1 last:flex-none">
                  <div className="flex flex-col items-center cursor-pointer group" onClick={() => handleStepClick(step.id)}>
                    <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      isActive ? 'w-4 h-4 bg-indigo-500 ring-4 ring-indigo-500/20' : 
                      isVisited ? 'bg-indigo-500/50' : 'bg-slate-200 dark:bg-slate-700 group-hover:bg-slate-300 dark:group-hover:bg-slate-600'
                    }`} />
                    <div className="absolute top-5 flex flex-col items-center">
                      <span className={`text-[10px] whitespace-nowrap ${isActive ? 'text-indigo-500 font-bold' : 'text-slate-500'}`}>{step.label}</span>
                      <span className="text-[9px] text-slate-400/70 whitespace-nowrap">{step.sub}</span>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-0.5 flex-1 mx-1 transition-colors duration-300 ${isVisited ? 'bg-indigo-500/50' : 'bg-slate-200 dark:bg-slate-700'}`} />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="shrink-0">
        <a href="/timeline" className="text-xs text-indigo-500 hover:text-indigo-400 font-medium">
          <span className="hidden sm:inline">Full Timeline </span>→
        </a>
      </div>
    </div>
  );
}
