import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { type TimelineTimestep } from '../../types/timeline';

interface PhaseChartProps {
  timesteps: TimelineTimestep[];
}

export function PhaseChart({ timesteps }: PhaseChartProps) {
  
  const data = timesteps.map(t => ({
    timestep: t.timestep,
    'Privilege Escalation': t.phase_distribution.privilege_escalation,
    'Lateral Movement': t.phase_distribution.lateral_movement,
    'Cross-Cloud Pivot': t.phase_distribution.cross_cloud_pivot,
    'CVE Exploitation': t.phase_distribution.cve_exploitation,
    'Benign': t.phase_distribution.benign,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-[#1a1a24]/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 dark:border-white/10 shadow-xl text-sm z-50">
          <p className="font-bold text-slate-900 dark:text-white mb-2">Timestep: t={label}</p>
          {payload.map((entry: any, index: number) => {
            if (entry.value === 0) return null;
            return (
              <div key={index} className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-slate-600 dark:text-slate-300 w-32">{entry.name}:</span>
                <span className="font-medium text-slate-900 dark:text-white">{entry.value}</span>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl flex flex-col overflow-hidden h-full">
      <div className="p-4 sm:p-6 pb-2">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Attack Phase Progression</h3>
        <p className="text-xs text-slate-500 mt-0.5">Distribution of attack types across all 20 timesteps</p>
      </div>

      <div className="flex-1 p-4 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" strokeOpacity={0.05} />
            <XAxis dataKey="timestep" tick={{ fontSize: 11, fill: 'currentColor', opacity: 0.5 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'currentColor', opacity: 0.5 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'currentColor', opacity: 0.1 }} />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} iconType="circle" />
            
            <Bar dataKey="CVE Exploitation" stackId="a" fill="#ef4444" animationDuration={800} />
            <Bar dataKey="Privilege Escalation" stackId="a" fill="#f97316" animationDuration={800} />
            <Bar dataKey="Lateral Movement" stackId="a" fill="#eab308" animationDuration={800} />
            <Bar dataKey="Cross-Cloud Pivot" stackId="a" fill="#a855f7" animationDuration={800} />
            <Bar dataKey="Benign" stackId="a" fill="#64748b" fillOpacity={0.3} animationDuration={800} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
