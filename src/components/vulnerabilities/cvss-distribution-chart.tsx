import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { type CVEEntry } from '../../types/cve';

interface CVSSDistributionChartProps {
  cves: CVEEntry[];
}

export function CVSSDistributionChart({ cves }: CVSSDistributionChartProps) {
  // Sort descending by CVSS
  const sortedData = [...cves].sort((a, b) => b.cvssScore - a.cvssScore).map(c => ({
    id: c.id,
    displayId: c.id.substring(0, 14),
    cvss: c.cvssScore,
    severity: c.severity,
    status: c.status
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
              <span className="font-medium text-slate-900 dark:text-white">{data.cvss.toFixed(1)}</span>
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

  const CustomLabel = (props: any) => {
    const { x, y, value, width } = props;
    return (
      <text x={x + width + 5} y={y + 10} fill="currentColor" fontSize={10} fontFamily="monospace" className="text-slate-500">
        {value.toFixed(1)}
      </text>
    );
  };

  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">CVSS Score Distribution</h3>
        <p className="text-xs text-slate-500 mt-0.5">All 20 CVEs sorted by severity score</p>
      </div>

      <div className="flex-1 min-h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sortedData} layout="vertical" margin={{ top: 20, right: 30, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="currentColor" strokeOpacity={0.05} />
            <XAxis type="number" domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'currentColor', opacity: 0.5 }} />
            <YAxis type="category" dataKey="displayId" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontFamily: 'monospace', fill: 'currentColor', opacity: 0.7 }} width={100} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'currentColor', opacity: 0.05 }} />
            
            <ReferenceLine x={9.0} stroke="#ef4444" strokeDasharray="3 3" strokeOpacity={0.5} label={{ position: 'top', value: 'Critical', fill: '#ef4444', fontSize: 10 }} />
            <ReferenceLine x={7.0} stroke="#f97316" strokeDasharray="3 3" strokeOpacity={0.5} label={{ position: 'top', value: 'High', fill: '#f97316', fontSize: 10 }} />
            <ReferenceLine x={4.0} stroke="#eab308" strokeDasharray="3 3" strokeOpacity={0.5} label={{ position: 'top', value: 'Medium', fill: '#eab308', fontSize: 10 }} />

            <Bar 
              dataKey="cvss" 
              radius={[0, 4, 4, 0]} 
              barSize={12}
              isAnimationActive={true}
              animationDuration={1000}
              label={<CustomLabel />}
            >
              {sortedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getColor(entry.severity)} 
                  fillOpacity={entry.status === 'core' ? 1 : 0.7}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-slate-200 dark:border-white/10 text-xs text-slate-500">
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-slate-500" /> Core Registry</div>
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-slate-500 opacity-50" /> NER Extracted</div>
      </div>
    </div>
  );
}
