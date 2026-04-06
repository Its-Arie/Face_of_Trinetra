import { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { threatTrendData1H, threatTrendData6H, threatTrendData24H, threatTrendData7D } from '../../lib/mock-data/dashboard-stats';

export function ThreatTrendChart() {
  const [timeRange, setTimeRange] = useState('24H');
  const [visibleLines, setVisibleLines] = useState({ critical: true, high: true, medium: true, low: true });

  const dataMap: Record<string, any[]> = {
    '1H': threatTrendData1H,
    '6H': threatTrendData6H,
    '24H': threatTrendData24H,
    '7D': threatTrendData7D,
  };

  const data = dataMap[timeRange];

  const toggleLine = (key: keyof typeof visibleLines) => {
    setVisibleLines(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-[#1a1a24]/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 dark:border-white/10 shadow-xl text-sm">
          <p className="font-bold text-slate-900 dark:text-white mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-[18px] h-[18px] text-indigo-500" /> Threat Trend
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Threats detected over time</p>
        </div>
        
        <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5">
          {['1H', '6H', '24H', '7D'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                timeRange === range 
                  ? 'bg-indigo-500 text-white' 
                  : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCritical" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorMedium" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorLow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" strokeOpacity={0.05} />
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'currentColor', opacity: 0.5 }} interval="preserveStartEnd" />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'currentColor', opacity: 0.5 }} width={35} />
            <Tooltip content={<CustomTooltip />} />
            
            {visibleLines.low && <Area type="monotone" dataKey="low" name="Low" stroke="#22c55e" strokeWidth={2} fill="url(#colorLow)" animationDuration={1000} />}
            {visibleLines.medium && <Area type="monotone" dataKey="medium" name="Medium" stroke="#eab308" strokeWidth={2} fill="url(#colorMedium)" animationDuration={1000} />}
            {visibleLines.high && <Area type="monotone" dataKey="high" name="High" stroke="#f97316" strokeWidth={2} fill="url(#colorHigh)" animationDuration={1000} />}
            {visibleLines.critical && <Area type="monotone" dataKey="critical" name="Critical" stroke="#ef4444" strokeWidth={2} fill="url(#colorCritical)" animationDuration={1000} />}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center flex-wrap gap-4 sm:gap-6 pt-4 mt-4 border-t border-slate-200 dark:border-white/10">
        {[
          { key: 'critical', label: 'Critical', color: 'bg-red-500' },
          { key: 'high', label: 'High', color: 'bg-orange-500' },
          { key: 'medium', label: 'Medium', color: 'bg-yellow-500' },
          { key: 'low', label: 'Low', color: 'bg-green-500' },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => toggleLine(item.key as keyof typeof visibleLines)}
            className={`flex items-center gap-1.5 text-xs transition-opacity ${visibleLines[item.key as keyof typeof visibleLines] ? 'opacity-100' : 'opacity-40 line-through'}`}
          >
            <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
            <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
