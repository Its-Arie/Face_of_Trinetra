import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ablationResults } from '../../lib/mock-data/model-metrics';

export function AblationChart() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-[#1a1a24]/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 dark:border-white/10 shadow-xl text-sm">
          <p className="font-bold text-slate-900 dark:text-white mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4 mb-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: entry.color }} />
                <span className="text-slate-600 dark:text-slate-300">{entry.name}:</span>
              </div>
              <span className="font-mono font-medium text-slate-900 dark:text-white">{entry.value.toFixed(2)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={ablationResults}
          margin={{ top: 20, right: 30, left: 0, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" strokeOpacity={0.05} />
          
          <XAxis 
            dataKey="method" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 11, fill: 'currentColor', opacity: 0.6 }} 
            dy={10}
          />
          
          {/* Left Y-Axis for Acc/F1 */}
          <YAxis 
            yAxisId="left"
            domain={[0.7, 1.0]} 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 11, fill: 'currentColor', opacity: 0.6 }} 
            dx={-10}
            tickFormatter={(val) => val.toFixed(2)}
          />
          
          {/* Right Y-Axis for FPR */}
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            domain={[0, 0.15]} 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 11, fill: 'currentColor', opacity: 0.6 }} 
            dx={10}
            tickFormatter={(val) => val.toFixed(2)}
          />
          
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'currentColor', opacity: 0.05 }} />
          
          <Legend 
            wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} 
            iconType="circle"
          />
          
          <Bar yAxisId="left" dataKey="accuracy" name="Accuracy" fill="#6366f1" radius={[4, 4, 0, 0]} animationDuration={1500} />
          <Bar yAxisId="left" dataKey="f1" name="F1-Score" fill="#10b981" radius={[4, 4, 0, 0]} animationDuration={1500} />
          <Bar yAxisId="right" dataKey="fpr" name="FPR (Right Axis)" fill="#ef4444" radius={[4, 4, 0, 0]} animationDuration={1500} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
