import { ablationResults } from '../../lib/mock-data/model-metrics';

export function ComparisonTable() {
  return (
    <div className="mt-8">
      <div className="rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden bg-white/50 dark:bg-black/20">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/80 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="p-4">Method</th>
                <th className="p-4 text-center">Accuracy</th>
                <th className="p-4 text-center">F1-Score</th>
                <th className="p-4 text-center">False Positive Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {ablationResults.map((row, i) => (
                <tr 
                  key={i} 
                  className={`transition-colors hover:bg-slate-50/80 dark:hover:bg-white/5 ${
                    row.isProposed ? 'bg-indigo-50/50 dark:bg-indigo-500/10' : ''
                  }`}
                >
                  <td className="p-4 flex items-center gap-2">
                    <span className={row.isProposed ? 'font-bold text-indigo-600 dark:text-indigo-400' : 'font-medium text-slate-700 dark:text-slate-300'}>
                      {row.method}
                    </span>
                    {row.isProposed && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500 text-white uppercase tracking-wider">
                        Best
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center font-mono text-slate-600 dark:text-slate-300">{row.accuracy.toFixed(2)}</td>
                  <td className="p-4 text-center font-mono text-slate-600 dark:text-slate-300">{row.f1.toFixed(2)}</td>
                  <td className={`p-4 text-center font-mono ${row.isProposed ? 'text-green-600 dark:text-green-500 font-bold' : 'text-slate-600 dark:text-slate-300'}`}>
                    {row.fpr.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-5 space-y-2 px-2">
        <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
          <p>Fusion model improves accuracy by 14 points over rule-based SIEM.</p>
        </div>
        <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
          <p>False positive rate drops significantly from 0.12 to 0.04.</p>
        </div>
        <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
          <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 shrink-0" />
          <p>Joint structural-temporal reasoning produces the strongest balanced performance.</p>
        </div>
      </div>
    </div>
  );
}
