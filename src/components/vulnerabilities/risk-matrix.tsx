import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { mockCVEs } from '../../lib/mock-data/cve-data';

export function RiskMatrix() {
  const data = mockCVEs.map(cve => ({
    id: cve.id,
    x: cve.cvssScore,
    y: cve.exploitProbability,
    severity: cve.severity,
    status: cve.status
  }));

  const getColor = (severity: string) => {
    switch(severity) {
      case 'critical': return '#ef4444';
      case 'high': return '#f97316';
      case 'medium': return '#eab308';
      default: return '#22c55e';
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 dark:bg-[#1a1a24]/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 dark:border-white/10 shadow-xl text-sm">
          <p className="font-bold text-slate-900 dark:text-white mb-2">{data.id}</p>
          <div className="space-y-1">
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">CVSS Score:</span>
              <span className="font-medium text-slate-900 dark:text-white">{data.x.toFixed(1)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Exploit Prob:</span>
              <span className="font-medium text-slate-900 dark:text-white">{(data.y * 100).toFixed(0)}%</span>
            </div>
            <div className="flex justify-between gap-4 items-center pt-1 border-t border-slate-200 dark:border-white/10 mt-2">
              <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${data.severity === 'critical' ? 'bg-red-500/15 text-red-500' : data.severity === 'high' ? 'bg-orange-500/15 text-orange-500' : data.severity === 'medium' ? 'bg-yellow-500/15 text-yellow-500' : 'bg-green-500/15 text-green-500'}`}>
                {data.severity}
              </span>
              <span className="text-[10px] text-slate-500">
                {data.status === 'core' ? 'Core Registry' : 'NER Extracted'}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">Risk Matrix — CVSS Score × Exploit Probability</h3>
        <p className="text-xs text-slate-500 mt-0.5">Upper-right quadrant = highest priority for patching</p>
      </div>

      <div className="flex-1 min-h-[250px] relative">
        {/* Quadrant Labels */}
        <div className="absolute top-2 right-4 text-xs text-red-500/50 font-medium pointer-events-none">Critical Priority</div>
        <div className="absolute top-2 left-10 text-xs text-orange-500/50 font-medium pointer-events-none">Monitor</div>
        <div className="absolute bottom-6 right-4 text-xs text-yellow-500/50 font-medium pointer-events-none">Patch Planned</div>
        <div className="absolute bottom-6 left-10 text-xs text-green-500/50 font-medium pointer-events-none">Low Priority</div>

        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.05} />
            <XAxis 
              type="number" 
              dataKey="x" 
              name="CVSS Score" 
              domain={[0, 10]} 
              ticks={[0, 2, 4, 6, 8, 10]}
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: 'currentColor', opacity: 0.5 }}
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              name="Exploit Probability" 
              domain={[0, 1]} 
              ticks={[0, 0.2, 0.4, 0.6, 0.8, 1.0]}
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: 'currentColor', opacity: 0.5 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            
            <ReferenceLine x={7.0} stroke="#475569" strokeDasharray="3 3" strokeOpacity={0.5} label={{ position: 'top', value: 'High CVSS', fill: '#475569', fontSize: 10 }} />
            <ReferenceLine y={0.5} stroke="#475569" strokeDasharray="3 3" strokeOpacity={0.5} label={{ position: 'right', value: 'High Exploit Risk', fill: '#475569', fontSize: 10 }} />

            <Scatter data={data} animationDuration={1000}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getColor(entry.severity)} 
                  fillOpacity={entry.status === 'core' ? 1 : 0.6}
                  stroke={entry.status === 'core' ? 'none' : getColor(entry.severity)}
                  strokeWidth={entry.status === 'core' ? 0 : 1.5}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 mt-4 pt-4 border-t border-slate-200 dark:border-white/10 text-xs text-slate-500">
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500" /> Critical (≥9.0)</div>
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-orange-500" /> High (7.0-8.9)</div>
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-yellow-500" /> Medium (4.0-6.9)</div>
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-green-500" /> Low (&lt;4.0)</div>
        <div className="w-px h-4 bg-slate-200 dark:bg-white/10 mx-2" />
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-slate-500" /> Core Registry</div>
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full border-2 border-slate-500" /> NER Extracted</div>
      </div>
    </div>
  );
}
