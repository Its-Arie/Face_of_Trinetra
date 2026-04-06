import { type LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useCountUp } from '../../hooks/use-count-up';

interface StatCardProps {
  icon: LucideIcon;
  iconColor: string;
  iconTextColor: string;
  label: string;
  value: number;
  format?: (v: number) => string;
  trend: {
    value: string;
    direction: 'up' | 'down';
    isPositive: boolean;
  };
  sparklineData: number[];
  sparklineColor: string;
  href: string;
}

export function StatCard({ icon: Icon, iconColor, iconTextColor, label, value, format, trend, sparklineData, sparklineColor, href }: StatCardProps) {
  const navigate = useNavigate();
  const animatedValue = useCountUp(value, 1000);
  const displayValue = format ? format(animatedValue) : animatedValue;
  const chartData = sparklineData.map((v, i) => ({ index: i, value: v }));

  return (
    <div 
      onClick={() => navigate(href)}
      className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-4 cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group"
    >
      <div className="flex justify-between items-start">
        <div className={`p-2.5 rounded-lg ${iconColor}`}>
          <Icon className={`w-[18px] h-[18px] ${iconTextColor}`} />
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {trend.direction === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
          {trend.value}
        </div>
      </div>

      <div className="mt-3">
        <div className="text-2xl font-bold text-slate-900 dark:text-white">{displayValue}</div>
        <div className="text-[10px] font-medium text-slate-500 uppercase tracking-wider mt-1">{label}</div>
      </div>

      <div className="mt-3 h-10 w-full opacity-80 group-hover:opacity-100 transition-opacity">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={sparklineColor} 
              strokeWidth={1.5} 
              dot={false} 
              isAnimationActive={true}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
