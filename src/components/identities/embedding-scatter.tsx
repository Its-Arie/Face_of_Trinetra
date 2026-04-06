import { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { type IdentityEmbeddingPoint } from '../../types/identity';
import { RefreshCw } from 'lucide-react';

interface EmbeddingScatterProps {
  points: IdentityEmbeddingPoint[];
  onPointClick: (groupId: string) => void;
}

export function EmbeddingScatter({ points, onPointClick }: EmbeddingScatterProps) {
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'aws': return '#FF9900';
      case 'azure': return '#0078D4';
      case 'gcp': return '#EA4335';
      default: return '#64748b';
    }
  };

  const getRiskStyle = (risk: string) => {
    switch (risk) {
      case 'critical': return 'text-red-500 bg-red-500/15 border-red-500/30';
      case 'high': return 'text-orange-500 bg-orange-500/15 border-orange-500/30';
      case 'medium': return 'text-yellow-500 bg-yellow-500/15 border-yellow-500/30';
      default: return 'text-green-500 bg-green-500/15 border-green-500/30';
    }
  };

  // Custom Dot rendering to support outliers and hover states
  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    const isHovered = hoveredPoint === payload.identity_id;
    const color = getProviderColor(payload.provider);
    
    if (payload.is_outlier) {
      return (
        <g onClick={() => onPointClick(payload.group_id)} className="cursor-pointer" onMouseEnter={() => setHoveredPoint(payload.identity_id)} onMouseLeave={() => setHoveredPoint(null)}>
          <circle cx={cx} cy={cy} r={isHovered ? 10 : 8} fill={color} className="transition-all duration-200" />
          <circle cx={cx} cy={cy} r={isHovered ? 16 : 14} fill="transparent" stroke="#ef4444" strokeWidth="2" className="animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
        </g>
      );
    }
    
    return (
      <g onClick={() => onPointClick(payload.group_id)} className="cursor-pointer" onMouseEnter={() => setHoveredPoint(payload.identity_id)} onMouseLeave={() => setHoveredPoint(null)}>
        <circle cx={cx} cy={cy} r={isHovered ? 8 : 6} fill={color} className="transition-all duration-200" />
      </g>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as IdentityEmbeddingPoint;
      return (
        <div className="bg-white/95 dark:bg-[#1a1a24]/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 dark:border-white/10 shadow-xl text-sm z-50">
          <p className="font-bold text-slate-900 dark:text-white mb-1">{data.identity_id}</p>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 w-16">Provider:</span>
              <span className="text-xs font-semibold uppercase" style={{ color: getProviderColor(data.provider) }}>{data.provider}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 w-16">Group:</span>
              <span className="text-xs font-medium text-slate-900 dark:text-white">{data.logical_name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 w-16">Risk:</span>
              <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border ${getRiskStyle(data.risk_level)}`}>{data.risk_level}</span>
            </div>
          </div>
          {data.is_outlier && (
            <div className="mt-2 pt-2 border-t border-slate-200 dark:border-white/10 text-xs text-red-500 font-medium">
              ⚠ Unmapped Outlier
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl flex flex-col h-full overflow-hidden shadow-sm">
      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-white/10 flex justify-between items-start shrink-0">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Identity Embedding Space</h2>
          <p className="text-xs text-slate-500 mt-0.5">128-dim embeddings projected to 2D via t-SNE</p>
        </div>
        <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 transition-colors" title="Reset View">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 w-full relative min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.05} />
            <XAxis type="number" dataKey="x" name="t-SNE 1" tick={false} axisLine={false} tickLine={false} label={{ value: 't-SNE Dimension 1', position: 'insideBottom', fill: 'currentColor', opacity: 0.5, fontSize: 10, dy: 10 }} />
            <YAxis type="number" dataKey="y" name="t-SNE 2" tick={false} axisLine={false} tickLine={false} label={{ value: 't-SNE Dimension 2', angle: -90, position: 'insideLeft', fill: 'currentColor', opacity: 0.5, fontSize: 10, dx: -10 }} />
            <Tooltip cursor={{ strokeDasharray: '3 3', stroke: 'currentColor', strokeOpacity: 0.2 }} content={<CustomTooltip />} />
            <Scatter data={points} shape={<CustomDot />} animationDuration={1000} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="p-3 border-t border-slate-200 dark:border-white/10 flex flex-wrap justify-center gap-4 bg-slate-50/50 dark:bg-white/[0.02] shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF9900]" />
          <span className="text-xs font-medium text-slate-600 dark:text-slate-300">AWS</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#0078D4]" />
          <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Azure</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#EA4335]" />
          <span className="text-xs font-medium text-slate-600 dark:text-slate-300">GCP</span>
        </div>
        <div className="flex items-center gap-1.5 ml-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-red-500/30" />
          <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Outlier/Unmapped</span>
        </div>
      </div>
    </div>
  );
}
