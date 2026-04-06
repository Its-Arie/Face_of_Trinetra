import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { type RiskReport } from '../../types/report';

interface RemediationListProps {
  report: RiskReport;
}

export function RemediationList({ report }: RemediationListProps) {
  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'Immediate': return 'bg-red-500/15 text-red-500 border-red-500/30';
      case 'High': return 'bg-orange-500/15 text-orange-500 border-orange-500/30';
      case 'Medium': return 'bg-yellow-500/15 text-yellow-500 border-yellow-500/30';
      default: return 'bg-slate-500/15 text-slate-500 border-slate-500/30';
    }
  };

  const getBorderColor = (priority: string) => {
    switch(priority) {
      case 'Immediate': return 'border-l-red-500';
      case 'High': return 'border-l-orange-500';
      case 'Medium': return 'border-l-yellow-500';
      default: return 'border-l-slate-500';
    }
  };

  const overallUrgency = report.remediation.some(r => r.priority === 'Immediate') ? 'Immediate' : 
                         report.remediation.some(r => r.priority === 'High') ? 'High' : 'Medium';
  
  const urgencyColor = overallUrgency === 'Immediate' ? 'text-red-500' : overallUrgency === 'High' ? 'text-orange-500' : 'text-yellow-500';

  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-[18px] h-[18px] text-indigo-500" /> Remediation Recommendations
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">Priority-ranked response guidance</p>
      </div>

      <div className="space-y-3">
        {report.remediation.map((item, i) => (
          <div key={i} className={`flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] border-l-4 ${getBorderColor(item.priority)}`}>
            <CheckCircle2 className="w-5 h-5 text-slate-300 dark:text-slate-600 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1.5">
                <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border shrink-0 w-fit ${getPriorityBadge(item.priority)}`}>
                  {item.priority}
                </span>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">{item.title}</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.description}
              </p>
              {item.owner && (
                <div className="mt-2 text-[10px] text-slate-500 font-medium">
                  Owner: <span className="text-slate-700 dark:text-slate-300">{item.owner}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
        <div className="font-medium text-slate-700 dark:text-slate-300">
          Estimated response urgency: <span className={`font-bold uppercase ${urgencyColor}`}>{overallUrgency}</span>
        </div>
        <div className="text-slate-500">
          Recommended owner: <span className="font-medium text-slate-700 dark:text-slate-300">SOC Analyst / Cloud IAM Team</span>
        </div>
      </div>
    </div>
  );
}
