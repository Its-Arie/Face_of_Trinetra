import { type PivotAlert } from '../../types/identity';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

interface PivotAlertsTabProps {
  alerts: PivotAlert[];
  logicalName: string;
}

export function PivotAlertsTab({ alerts, logicalName }: PivotAlertsTabProps) {
  const navigate = useNavigate();

  const getSeverityStyle = (severity: string) => {
    switch(severity) {
      case 'critical': return 'text-red-500';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-500';
      default: return 'text-green-500';
    }
  };

  const getSeverityBg = (severity: string) => {
    switch(severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  return (
    <div className="p-4 bg-slate-50/50 dark:bg-black/20 rounded-b-lg border-t border-slate-200 dark:border-white/5 animate-in fade-in duration-200">
      <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Cross-Cloud Pivot Alerts for "{logicalName}"</h4>

      {alerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6 text-slate-500">
          <ShieldCheck className="w-8 h-8 mb-2 text-green-500/50" />
          <p className="text-sm">No pivot alerts for this identity</p>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map(alert => (
            <div key={alert.id} className="bg-white dark:bg-[#1a1a24] rounded-lg border border-slate-200 dark:border-white/10 p-4 relative overflow-hidden">
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${getSeverityBg(alert.severity)}`} />
              
              <div className="flex justify-between items-center mb-3">
                <div className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 ${getSeverityStyle(alert.severity)}`}>
                  {alert.severity}
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  {new Date(alert.timestamp).toLocaleTimeString()}
                </div>
              </div>

              <div className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                <span className="font-semibold">{alert.source_identity}</span> ({alert.source_provider.toUpperCase()}) pivoted to <span className="font-semibold">{alert.target_identity}</span> ({alert.target_provider.toUpperCase()})
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                <span className="font-medium text-slate-700 dark:text-slate-300">Path:</span> {alert.pivot_path}
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs text-slate-500">Threat Score:</span>
                <div className="w-32 h-1.5 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full ${getSeverityBg(alert.severity)}`} style={{ width: `${alert.threat_score * 100}%` }} />
                </div>
                <span className={`text-xs font-mono font-bold ${getSeverityStyle(alert.severity)}`}>{alert.threat_score.toFixed(2)}</span>
              </div>

              <button onClick={() => navigate(`/reports/${alert.related_node_id}`)} className="text-xs font-medium text-indigo-500 hover:text-indigo-400 transition-colors">
                View Full Alert →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
