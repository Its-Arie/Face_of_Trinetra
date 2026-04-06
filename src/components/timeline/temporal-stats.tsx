import { Clock, Play, ShieldAlert, Layers, Target } from 'lucide-react';
import { useCountUp } from '../../hooks/use-count-up';

interface TemporalStatsProps {
  currentTimestep: number;
  compromisedCount: number;
  activePhasesCount: number;
  activePhasesNames: string;
}

export function TemporalStats({ currentTimestep, compromisedCount, activePhasesCount, activePhasesNames }: TemporalStatsProps) {
  const animatedTotal = useCountUp(20, 800);
  const animatedCompromised = useCountUp(compromisedCount, 500);
  const animatedPhases = useCountUp(activePhasesCount, 500);

  const cards = [
    {
      id: 'total',
      icon: Clock,
      bg: 'bg-indigo-500/20',
      text: 'text-indigo-500',
      value: animatedTotal.toString(),
      label: 'Total Timesteps',
      sub: 'T=0 through T=19',
      subColor: 'text-slate-500'
    },
    {
      id: 'current',
      icon: Play,
      bg: 'bg-blue-500/20',
      text: 'text-blue-500',
      value: currentTimestep.toString(),
      label: 'Current Step',
      sub: 'of 20 total',
      subColor: 'text-slate-500'
    },
    {
      id: 'compromised',
      icon: ShieldAlert,
      bg: 'bg-red-500/20',
      text: 'text-red-500',
      value: animatedCompromised.toString(),
      label: 'Compromised Nodes',
      sub: 'at current timestep',
      subColor: 'text-red-500'
    },
    {
      id: 'phases',
      icon: Layers,
      bg: 'bg-orange-500/20',
      text: 'text-orange-500',
      value: animatedPhases.toString(),
      label: 'Active Phases',
      sub: activePhasesNames || 'None',
      subColor: 'text-slate-500 truncate max-w-[120px]'
    },
    {
      id: 'accuracy',
      icon: Target,
      bg: 'bg-green-500/20',
      text: 'text-green-500',
      value: '93%',
      label: 'Prediction Accuracy',
      sub: 'Temporal GNN (GRU)',
      subColor: 'text-slate-500',
      progress: 93
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {cards.map((card) => (
        <div key={card.id} className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-4 flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${card.bg}`}>
              <card.icon className={`w-4 h-4 ${card.text}`} />
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">
              {card.value}
            </div>
          </div>
          <div className="text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            {card.label}
          </div>
          <div className={`text-[10px] mt-1 ${card.subColor}`} title={card.sub}>
            {card.sub}
          </div>
          {card.progress !== undefined && (
            <div className="w-full h-1 bg-slate-100 dark:bg-white/10 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-green-500" style={{ width: `${card.progress}%` }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
