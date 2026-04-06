import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { lossCurveData } from '../../lib/mock-data/model-metrics';

export function LossCurves() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-[#1a1a24]/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 dark:border-white/10 shadow-xl text-sm">
          <p className="font-bold text-slate-900 dark:text-white mb-2">Epoch {label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4 mb-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-slate-600 dark:text-slate-300">{entry.name}:</span>
              </div>
              <span className="font-mono font-medium text-slate-900 dark:text-white">{entry.value.toFixed(3)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={lossCurveData}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" strokeOpacity={0.05} />
            <XAxis 
              dataKey="epoch" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: 'currentColor', opacity: 0.6 }} 
              dy={10}
              label={{ value: 'Training Epoch', position: 'bottom', fontSize: 11, fill: 'currentColor', opacity: 0.5, dy: 10 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: 'currentColor', opacity: 0.6 }} 
              dx={-10}
              label={{ value: 'Loss', angle: -90, position: 'insideLeft', fontSize: 11, fill: 'currentColor', opacity: 0.5, dx: -10 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} iconType="circle" />
            
            <Line 
              type="monotone" 
              dataKey="rgcnLoss" 
              name="RGCN Loss" 
              stroke="#6366f1" 
              strokeWidth={3} 
              dot={false} 
              activeDot={{ r: 6, strokeWidth: 0 }}
              isAnimationActive={true}
              animationDuration={2000}
            />
            <Line 
              type="monotone" 
              dataKey="gruLoss" 
              name="GRU-GNN Loss" 
              stroke="#10b981" 
              strokeWidth={3} 
              dot={false} 
              activeDot={{ r: 6, strokeWidth: 0 }}
              isAnimationActive={true}
              animationDuration={2000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 px-2">
        <div className="bg-slate-50 dark:bg-white/5 rounded-lg p-3 border border-slate-100 dark:border-white/5">
          <p className="text-xs text-slate-600 dark:text-slate-400">RGCN converges faster in early epochs.</p>
        </div>
        <div className="bg-slate-50 dark:bg-white/5 rounded-lg p-3 border border-slate-100 dark:border-white/5">
          <p className="text-xs text-slate-600 dark:text-slate-400">Temporal model stabilizes after epoch 12.</p>
        </div>
        <div className="bg-slate-50 dark:bg-white/5 rounded-lg p-3 border border-slate-100 dark:border-white/5">
          <p className="text-xs text-slate-600 dark:text-slate-400">Both models show healthy monotonic convergence.</p>
        </div>
      </div>
    </div>
  );
}
