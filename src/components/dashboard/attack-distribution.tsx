import { Swords } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { attackDistribution } from '../../lib/mock-data/dashboard-stats';

export function AttackDistribution() {
  const navigate = useNavigate();

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 dark:bg-[#1a1a24]/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 dark:border-white/10 shadow-xl text-sm">
          <p className="font-bold text-slate-900 dark:text-white mb-1">{data.name}</p>
          <div className="flex items-center gap-2">
            <span className="text-slate-600 dark:text-slate-300">Count:</span>
            <span className="font-medium text-slate-900 dark:text-white">{data.count}</span>
            <span className="text-xs text-slate-500 ml-1">({data.percentage}%)</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl flex flex-col h-full overflow-hidden">
      <div className="p-4 sm:p-6 pb-2">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Swords className="w-[18px] h-[18px] text-indigo-500" /> Attack Distribution
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">Breakdown by attack category</p>
      </div>

      <div className="flex-1 p-4 min-h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={attackDistribution} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="currentColor" strokeOpacity={0.05} />
            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'currentColor', opacity: 0.5 }} />
            <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'currentColor', opacity: 0.7 }} width={110} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'currentColor', opacity: 0.05 }} />
            <Bar 
              dataKey="count" 
              radius={[0, 4, 4, 0]} 
              barSize={20}
              animationDuration={1000}
              onClick={(data) => navigate(`/alerts?attackType=${encodeURIComponent(data.name || '')}`)}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              {attackDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-white/10 flex justify-between items-center bg-white/50 dark:bg-transparent">
        <span className="text-xs text-slate-500">Total: 147 threats</span>
        <button onClick={() => navigate('/graph')} className="text-xs font-medium text-indigo-500 hover:text-indigo-400 transition-colors">
          View Attack Graph →
        </button>
      </div>
    </div>
  );
}
