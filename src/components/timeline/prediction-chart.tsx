import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { type NodeThreatTimeline } from '../../types/timeline';

interface PredictionChartProps {
  selectedNodeId: string;
  setSelectedNodeId: (id: string) => void;
  nodeTimelines: NodeThreatTimeline[];
}

export function PredictionChart({ selectedNodeId, setSelectedNodeId, nodeTimelines }: PredictionChartProps) {
  
  const selectedTimeline = nodeTimelines.find(n => n.node_id === selectedNodeId) || nodeTimelines[0];

  const data = selectedTimeline.predicted_probabilities.map((pred, i) => ({
    timestep: i,
    Predicted: pred,
    Actual: selectedTimeline.actual_labels[i]
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-[#1a1a24]/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 dark:border-white/10 shadow-xl text-sm">
          <p className="font-bold text-slate-900 dark:text-white mb-2">Timestep: t={label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-slate-600 dark:text-slate-300 capitalize w-16">{entry.name}:</span>
              <span className="font-medium text-slate-900 dark:text-white">{entry.value.toFixed(2)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl flex flex-col overflow-hidden h-full">
      <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/50 dark:bg-transparent">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Compromise Prediction</h3>
          <p className="text-xs text-slate-500 mt-0.5">GRU-GNN predicted probability vs ground truth</p>
        </div>
        <select 
          value={selectedNodeId} 
          onChange={(e) => setSelectedNodeId(e.target.value)}
          className="w-48 h-9 px-3 rounded-lg bg-slate-100 dark:bg-white/5 border-none text-sm font-medium text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {nodeTimelines.map(n => (
            <option key={n.node_id} value={n.node_id}>{n.node_id}</option>
          ))}
        </select>
      </div>

      <div className="flex-1 p-4 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" strokeOpacity={0.05} />
            <XAxis dataKey="timestep" tick={{ fontSize: 11, fill: 'currentColor', opacity: 0.5 }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 1]} tick={{ fontSize: 11, fill: 'currentColor', opacity: 0.5 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            
            <ReferenceLine y={0.5} stroke="#f59e0b" strokeOpacity={0.3} strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'Detection Threshold (0.50)', fill: '#f59e0b', fontSize: 10 }} />
            
            {selectedTimeline.compromise_timestep !== null && (
              <ReferenceLine x={selectedTimeline.compromise_timestep} stroke="#ef4444" strokeOpacity={0.5} strokeDasharray="3 3" label={{ position: 'insideTopRight', value: `Compromised at t=${selectedTimeline.compromise_timestep}`, fill: '#ef4444', fontSize: 10 }} />
            )}

            <Line type="monotone" dataKey="Predicted" stroke="#6366f1" strokeWidth={2} dot={{ r: 3, fill: '#6366f1', strokeWidth: 0 }} activeDot={{ r: 5 }} animationDuration={1500} />
            <Line type="stepAfter" dataKey="Actual" stroke="#22c55e" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3, fill: '#22c55e', strokeWidth: 0 }} activeDot={{ r: 5 }} animationDuration={1500} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] flex flex-wrap gap-4 sm:gap-8 justify-center">
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">Warning</span>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">{selectedTimeline.first_predicted_above_threshold !== null ? `t=${selectedTimeline.first_predicted_above_threshold}` : 'None'}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">Actual</span>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">{selectedTimeline.compromise_timestep !== null ? `t=${selectedTimeline.compromise_timestep}` : 'Never'}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">Lead Time</span>
          <span className="text-sm font-semibold text-indigo-500">{selectedTimeline.early_warning_steps !== null ? `${selectedTimeline.early_warning_steps} steps` : '—'}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">MSE</span>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">{selectedTimeline.prediction_mse.toFixed(3)}</span>
        </div>
      </div>
    </div>
  );
}
