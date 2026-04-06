import { Link2, ArrowRight } from 'lucide-react';
import { type PivotAlert } from '../../types/identity';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface PivotAlertsProps {
  alerts: PivotAlert[];
}

export function PivotAlerts({ alerts }: PivotAlertsProps) {
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

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'aws': return 'border-[#FF9900] text-[#FF9900]';
      case 'azure': return 'border-[#0078D4] text-[#0078D4]';
      case 'gcp': return 'border-[#EA4335] text-[#EA4335]';
      default: return 'border-slate-500 text-slate-500';
    }
  };

  const getProviderDot = (provider: string) => {
    switch (provider) {
      case 'aws': return 'bg-[#FF9900]';
      case 'azure': return 'bg-[#0078D4]';
      case 'gcp': return 'bg-[#EA4335]';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <Link2 className="w-5 h-5 text-indigo-500" /> Cross-Cloud Pivot Detections
          </h2>
          <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-white/10 text-xs text-slate-600 dark:text-slate-300">
            {alerts.length} alerts
          </span>
        </div>
        <button onClick={() => navigate('/alerts')} className="text-sm font-medium text-indigo-500 hover:text-indigo-400">
          View All Alerts →
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {alerts.map(alert => (
          <div key={alert.id} className={`bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 border-l-[3px] rounded-xl p-4 sm:p-5 relative overflow-hidden shadow-sm ${alert.severity === 'critical' ? 'border-l-red-500 bg-red-50/30 dark:bg-red-500/5' : alert.severity === 'high' ? 'border-l-orange-500' : 'border-l-yellow-500'}`}>
            
            <div className="flex justify-between items-start mb-4">
              <div className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 ${getSeverityStyle(alert.severity)}`}>
                {alert.severity}
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-slate-500">{new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
                <div className="text-[10px] text-slate-400">{alert.relative_time}</div>
              </div>
            </div>

            {/* Visual Pivot Path */}
            <div className="flex items-center justify-between gap-2 sm:gap-4 mb-4 bg-slate-50 dark:bg-black/20 p-4 rounded-lg border border-slate-200 dark:border-white/5">
              <div className={`flex-1 min-w-0 flex flex-col items-center justify-center p-3 rounded-lg border bg-white dark:bg-[#1a1a24] ${getProviderColor(alert.source_provider)}`}>
                <div className="flex items-center gap-1.5 mb-1">
                  <div className={`w-2 h-2 rounded-full ${getProviderDot(alert.source_provider)}`} />
                  <span className="text-[10px] font-bold uppercase">{alert.source_provider}</span>
                </div>
                <span className="text-sm font-semibold text-slate-900 dark:text-white truncate w-full text-center" title={alert.source_identity}>{alert.source_identity}</span>
              </div>

              <div className="flex flex-col items-center shrink-0 w-16 sm:w-32">
                <span className="text-[10px] font-bold text-slate-400 tracking-widest mb-1">PIVOT</span>
                <svg className="w-full h-2">
                  <line x1="0" y1="4" x2="100%" y2="4" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-slate-400 animate-[dash_1s_linear_infinite]" />
                </svg>
                <ArrowRight className="w-4 h-4 text-slate-400 mt-1" />
              </div>

              <div className={`flex-1 min-w-0 flex flex-col items-center justify-center p-3 rounded-lg border bg-white dark:bg-[#1a1a24] ${getProviderColor(alert.target_provider)}`}>
                <div className="flex items-center gap-1.5 mb-1">
                  <div className={`w-2 h-2 rounded-full ${getProviderDot(alert.target_provider)}`} />
                  <span className="text-[10px] font-bold uppercase">{alert.target_provider}</span>
                </div>
                <span className="text-sm font-semibold text-slate-900 dark:text-white truncate w-full text-center" title={alert.target_identity}>{alert.target_identity}</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm text-slate-700 dark:text-slate-300">
                <span className="font-semibold text-slate-900 dark:text-white">Pivot Path:</span> {alert.pivot_path}
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs text-slate-500 font-medium">Threat Score:</span>
              <div className="w-48 h-2 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                <div className={`h-full ${getSeverityBg(alert.severity)}`} style={{ width: `${alert.threat_score * 100}%` }} />
              </div>
              <span className={`text-sm font-mono font-bold ${getSeverityStyle(alert.severity)}`}>{alert.threat_score.toFixed(2)}</span>
            </div>

            <div className="mb-5 hidden sm:block">
              <div className="text-xs font-semibold text-slate-900 dark:text-white mb-2">Evidence:</div>
              <ul className="space-y-1 pl-1">
                {alert.evidence.map((ev, i) => (
                  <li key={i} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                    <span className="text-slate-400 mt-0.5">•</span> <span>{ev}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              <button onClick={() => navigate(`/reports/${alert.related_node_id}`)} className="px-4 py-2 text-sm font-medium border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg transition-colors">
                View Full Report
              </button>
              <button onClick={(e) => {
                const btn = e.currentTarget;
                btn.innerHTML = '<svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Acknowledged';
                btn.classList.add('text-green-500', 'border-green-500/50', 'bg-green-500/10');
                toast.success('Alert acknowledged');
              }} className="px-4 py-2 text-sm font-medium border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg transition-colors flex items-center">
                Acknowledge
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
