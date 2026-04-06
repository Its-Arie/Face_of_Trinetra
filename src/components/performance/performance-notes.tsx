import { Info } from 'lucide-react';

export function PerformanceNotes() {
  const notes = [
    {
      title: 'Accuracy',
      desc: 'Overall fraction of correctly classified samples. Indicates general model reliability.'
    },
    {
      title: 'F1-Score',
      desc: 'Harmonic mean of precision and recall. Useful under class imbalance (rare threats).'
    },
    {
      title: 'ROC-AUC & FPR',
      desc: 'ROC-AUC measures separability. FPR indicates analyst-facing noise (false alarms).'
    }
  ];

  return (
    <div className="bg-white/50 dark:bg-black/20 rounded-2xl border border-slate-200 dark:border-white/10 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Info className="w-4 h-4 text-indigo-500" />
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Interpretation Guide</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {notes.map((note, i) => (
          <div key={i} className="flex flex-col">
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">{note.title}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{note.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
