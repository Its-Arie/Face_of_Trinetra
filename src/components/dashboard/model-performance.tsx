import { Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ModelPerformance() {
  const navigate = useNavigate();

  const models = [
    {
      title: 'Structural GNN',
      badge: 'RGCN',
      desc: 'Relational Graph Convolutional Network',
      metrics: [
        { val: 0.92, label: 'Accuracy' },
        { val: 0.91, label: 'F1 Score' },
        { val: 0.93, label: 'ROC-AUC' }
      ],
      progress: 92,
      highlight: false
    },
    {
      title: 'Temporal GNN',
      badge: 'GRU-GNN',
      desc: 'GRU-Based Temporal Propagation',
      metrics: [
        { val: 0.91, label: 'Accuracy' },
        { val: 0.90, label: 'F1 Score' },
        { val: 0.92, label: 'ROC-AUC' }
      ],
      progress: 91,
      highlight: false
    },
    {
      title: 'Fusion Risk Model',
      badge: 'PRIMARY',
      desc: 'Structural + Temporal + Vulnerability Fusion',
      metrics: [
        { val: 0.95, label: 'Accuracy' },
        { val: 0.95, label: 'F1 Score' },
        { val: 0.97, label: 'ROC-AUC' }
      ],
      progress: 95,
      highlight: true,
      extra: { label: 'FPR: 4%', badge: '↓ Low' }
    }
  ];

  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl w-full">
      <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-white/10 flex justify-between items-center">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <Brain className="w-[18px] h-[18px] text-indigo-500" /> Model Performance Overview
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Dual GNN + Fusion model metrics</p>
        </div>
        <button onClick={() => navigate('/performance')} className="text-xs font-medium text-indigo-500 hover:text-indigo-400 transition-colors">
          View Details →
        </button>
      </div>

      <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {models.map((model, i) => (
          <div 
            key={i} 
            className={`rounded-xl border p-4 ${
              model.highlight 
                ? 'bg-indigo-50/50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/30' 
                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-white/10'
            }`}
          >
            <div className="flex justify-between items-start mb-1">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{model.title}</h4>
              <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                model.highlight ? 'bg-indigo-500 text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300'
              }`}>
                {model.badge}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{model.desc}</p>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {model.metrics.map((m, j) => (
                <div key={j}>
                  <div className="text-lg font-bold text-slate-900 dark:text-white">{m.val.toFixed(2)}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 h-1.5 bg-slate-200 dark:bg-black/20 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500" style={{ width: `${model.progress}%` }} />
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-[10px] text-green-600 dark:text-green-500 font-medium uppercase tracking-wider">Active</span>
              </div>
              
              {model.extra && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">{model.extra.label}</span>
                  <span className="px-1.5 py-0.5 rounded bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 text-[10px] font-medium">
                    {model.extra.badge}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
