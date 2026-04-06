import { useNavigate } from 'react-router-dom';
import { nerEntityCounts, recentExtractions } from '../../lib/mock-data/ner-extractions';

export function NERSummary() {
  const navigate = useNavigate();

  const entityConfig = {
    SOFTWARE: { color: 'text-blue-500', bg: 'bg-blue-500' },
    VERSION: { color: 'text-cyan-500', bg: 'bg-cyan-500' },
    ERROR: { color: 'text-red-500', bg: 'bg-red-500' },
    EXPLOIT: { color: 'text-orange-500', bg: 'bg-orange-500' },
    IP: { color: 'text-purple-500', bg: 'bg-purple-500' },
    PORT: { color: 'text-green-500', bg: 'bg-green-500' },
    USER: { color: 'text-amber-500', bg: 'bg-amber-500' },
    PATH: { color: 'text-pink-500', bg: 'bg-pink-500' },
  };

  const totalEntities = Object.values(nerEntityCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col h-full">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">NER Extraction — Stage 3a</h3>
        <p className="text-xs text-slate-500 mt-0.5">Entity types extracted from normalized log text</p>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {Object.entries(nerEntityCounts).map(([type, count]) => {
          const config = entityConfig[type as keyof typeof entityConfig] || { color: 'text-slate-500', bg: 'bg-slate-500' };
          const percent = (count / totalEntities) * 100;
          return (
            <div key={type} className="bg-slate-100 dark:bg-slate-800/40 rounded-lg p-2">
              <div className="flex justify-between items-end mb-1.5">
                <span className="text-[10px] font-medium text-slate-500 uppercase">{type}</span>
                <span className={`text-sm font-bold ${config.color}`}>{count}</span>
              </div>
              <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className={`h-full ${config.bg}`} style={{ width: `${percent}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="h-px bg-slate-200 dark:bg-white/10 mb-4" />

      <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
        Recent Extractions
      </div>

      <div className="flex-1 overflow-y-auto styled-scrollbar pr-2 space-y-2">
        {recentExtractions.slice(0, 5).map(ext => {
          const config = entityConfig[ext.entityType as keyof typeof entityConfig] || { color: 'text-slate-500', bg: 'bg-slate-500' };
          const badgeClass = `${config.bg}/15 ${config.color}`;
          return (
            <div key={ext.id} className="bg-slate-50 dark:bg-white/5 rounded-lg p-2.5 border border-slate-100 dark:border-white/5">
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2">
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${badgeClass}`}>
                    {ext.entityType === 'ERROR' ? 'CVE/CWE' : ext.entityType}
                  </span>
                  <span className="font-mono text-xs text-slate-900 dark:text-white truncate max-w-[120px]" title={ext.extractedText}>
                    {ext.extractedText}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500">
                  Conf: {(ext.confidence * 100).toFixed(0)}%
                </span>
              </div>
              <div className="text-[10px] text-slate-400">
                from: {ext.sourceLogId} • {ext.provider} • {new Date(ext.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/10 text-right">
        <button onClick={() => navigate('/logs')} className="text-xs text-indigo-500 hover:text-indigo-400 font-medium transition-colors">
          View full NER results in Log Monitor →
        </button>
      </div>
    </div>
  );
}
