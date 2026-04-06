import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, ReferenceLine } from 'recharts';
import { type RocPoint } from '../../types/metrics';

interface MiniRocChartProps {
  data: RocPoint[];
  color: string;
  gradientId: string;
}

export function MiniRocChart({ data, color, gradientId }: MiniRocChartProps) {
  return (
    <div className="w-full h-[140px] mt-4 relative">
      {/* Axis labels */}
      <div className="absolute -left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[9px] text-slate-400 tracking-wider">TPR</div>
      <div className="absolute bottom-[-16px] left-1/2 -translate-x-1/2 text-[9px] text-slate-400 tracking-wider">FPR</div>
      
      <div className="w-full h-full pl-3 pb-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="fpr" type="number" domain={[0, 1]} hide />
            <YAxis dataKey="tpr" type="number" domain={[0, 1]} hide />
            <ReferenceLine segment={[{ x: 0, y: 0 }, { x: 1, y: 1 }]} stroke="currentColor" strokeOpacity={0.1} strokeDasharray="3 3" />
            <Area 
              type="monotone" 
              dataKey="tpr" 
              stroke={color} 
              strokeWidth={2} 
              fill={`url(#${gradientId})`} 
              isAnimationActive={true}
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
