import { History, Link2 } from 'lucide-react';
import { type RiskReport } from '../../types/report';
import { useNavigate } from 'react-router-dom';

interface ReportHistoryProps {
  report: RiskReport;
}

export function ReportHistory({ report }: ReportHistoryProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <History className="w-[18px] h-[18px] text-indigo-500" /> Report History & Context
        </h3>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Timeline */}
        <div className="flex-1">
          <div className="relative border-l border-slate-200 dark:border-slate-700 ml-2 space-y-4">
            {report.history.map((event, i) => (
              <div key={i} className="relative pl-5">
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-[#12121a]" />
                <div className="text-xs text-slate-500 mb-0.5">
                  {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
                  {event.actor && <span className="italic ml-1">by {event.actor}</span>}
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                  {event.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Context Links */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 p-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Report Context</h4>
            <div className="space-y-2 mb-4 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Version:</span>
                <span className="font-medium text-slate-900 dark:text-white">{report.reportVersion}</span>
              </div>
              <div className="flex justify-between">
                <span>Models:</span>
                <span className="font-medium text-slate-900 dark:text-white text-right">
                  {report.modelStack.join(' + ')}
                </span>
              </div>
            </div>

            {report.relatedReportNodeIds.length > 0 && (
              <>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Related Reports</h4>
                <div className="flex flex-wrap gap-2">
                  {report.relatedReportNodeIds.map(id => (
                    <button 
                      key={id} 
                      onClick={() => navigate(`/reports/${id}`)}
                      className="flex items-center gap-1 px-2 py-1 rounded bg-white dark:bg-[#1a1a24] border border-slate-200 dark:border-white/10 hover:border-indigo-500 text-xs text-indigo-600 dark:text-indigo-400 transition-colors"
                    >
                      <Link2 className="w-3 h-3" /> {id}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
