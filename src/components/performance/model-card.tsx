import { type ModelMetricSummary } from '../../types/metrics';
import { MiniRocChart } from './mini-roc-chart';
import { rocCurves } from '../../lib/mock-data/model-metrics';

interface ModelCardProps {
  model: ModelMetricSummary;
}

export function ModelCard({ model }: ModelCardProps) {
  const isBest = model.isBest;
  
  const getColor = () => {
    if (model.key === 'rgcn') return '#6366f1'; // indigo
    if (model.key === 'gru_gnn') return '#10b981'; // emerald
    return '#8b5cf6'; // violet (fusion)
  };

  return (
    <div className={`relative bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl rounded-2xl p-5 flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
      isBest 
        ? 'border-2 border-violet-500/50 shadow-[0_0_30px_-10px_rgba(139,92,246,0.3)]' 
        : 'border border-slate-200 dark:border-white/10'
    }`}>
      
      {isBest && (
        <div className="absolute -top-3 right-4 px-3 py-1 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg">
          Best Model
        </div>
      )}

      <div className="mb-4">
        <h3 className={`text-lg font-bold ${isBest ? 'bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-violet-500' : 'text-slate-900 dark:text-white'}`}>
          {model.name}
        </h3>
        <p className="text-xs text-slate-500 mt-1 leading-snug h-8">
          {model.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-2">
        {[
          { label: 'Accuracy', val: model.accuracy.toFixed(2) },
          { label: 'Precision', val: model.precision.toFixed(2) },
          { label: 'Recall', val: model.recall.toFixed(2) },
          { label: 'F1-Score', val: model.f1.toFixed(2) },
          { label: 'ROC-AUC', val: model.rocAuc.toFixed(2) },
          ...(model.fpr !== undefined ? [{ label: 'FPR', val: model.fpr.toFixed(2) }] : [])
        ].map((m, i) => (
          <div key={i} className="flex justify-between items-center border-b border-slate-100 dark:border-white/5 pb-1">
            <span className="text-xs text-slate-500">{m.label}</span>
            <span className={`text-sm font-bold ${m.label === 'FPR' && isBest ? 'text-green-500' : 'text-slate-900 dark:text-white'}`}>
              {m.val}
            </span>
          </div>
        ))}
      </div>

      <div className="flex-1 flex flex-col justify-end">
        <MiniRocChart 
          data={rocCurves[model.key]} 
          color={getColor()} 
          gradientId={`grad-${model.key}`} 
        />
      </div>

      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/10">
        <p className="text-[11px] text-slate-500 leading-snug italic">
          "{model.description}"
        </p>
      </div>
    </div>
  );
}
