import { Cloud } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { providerThreats } from '../../lib/mock-data/dashboard-stats';
import { useAuth } from '../../contexts/auth-context';
import { Link } from 'react-router-dom';

export function ProviderComparisonChart() {
  const { user } = useAuth();
  
  // Filter data based on connected providers
  const activeProviders = Object.entries(user?.connectedProviders || {})
    .filter(([_, value]) => value !== null)
    .map(([key]) => key.toUpperCase());

  const data = providerThreats.filter(p => activeProviders.includes(p.provider));
  const isSingleProvider = data.length === 1;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-[#1a1a24]/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 dark:border-white/10 shadow-xl text-sm">
          <p className="font-bold text-slate-900 dark:text-white mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: entry.color }} />
              <span className="text-slate-600 dark:text-slate-300 capitalize w-16">{entry.name}:</span>
              <span className="font-medium text-slate-900 dark:text-white">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Cloud className="w-[18px] h-[18px] text-indigo-500" /> Threats by Provider
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">Distribution across connected cloud providers</p>
      </div>

      <div className="flex-1 min-h-[300px]">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" strokeOpacity={0.05} />
              <XAxis dataKey="provider" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.5 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'currentColor', opacity: 0.5 }} width={35} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'currentColor', opacity: 0.05 }} />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} iconType="circle" />
              
              <Bar dataKey="critical" name="Critical" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={isSingleProvider ? 32 : 16} animationDuration={1000} />
              <Bar dataKey="high" name="High" fill="#f97316" radius={[4, 4, 0, 0]} barSize={isSingleProvider ? 32 : 16} animationDuration={1000} />
              <Bar dataKey="medium" name="Medium" fill="#eab308" radius={[4, 4, 0, 0]} barSize={isSingleProvider ? 32 : 16} animationDuration={1000} />
              <Bar dataKey="low" name="Low" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={isSingleProvider ? 32 : 16} animationDuration={1000} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-500">
            <Cloud className="w-12 h-12 mb-2 opacity-20" />
            <p className="text-sm">No providers connected</p>
          </div>
        )}
      </div>

      {isSingleProvider && (
        <div className="text-center mt-4">
          <p className="text-xs text-slate-500">
            Connect more providers in <Link to="/settings" className="text-indigo-500 hover:underline">Settings</Link> for comparison
          </p>
        </div>
      )}
    </div>
  );
}
