import { type CrossCloudActivity } from '../../types/identity';
import { useNavigate } from 'react-router-dom';

interface ActivityTimelineProps {
  activities: CrossCloudActivity[];
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  const navigate = useNavigate();

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'aws': return 'bg-[#FF9900]';
      case 'azure': return 'bg-[#0078D4]';
      case 'gcp': return 'bg-[#EA4335]';
      default: return 'bg-slate-500';
    }
  };

  const getProviderLabel = (provider: string) => {
    switch (provider) {
      case 'aws': return 'AWS';
      case 'azure': return 'Azure';
      case 'gcp': return 'GCP';
      default: return provider;
    }
  };

  return (
    <div className="p-4 bg-slate-50/50 dark:bg-black/20 rounded-b-lg border-t border-slate-200 dark:border-white/5 animate-in fade-in duration-200">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Recent Cross-Cloud Activity (Last 24 hours)</h4>
      </div>

      {activities.length === 0 ? (
        <div className="text-sm text-slate-500 italic py-4">No recent activity recorded for this identity group.</div>
      ) : (
        <div className="relative pl-4 space-y-4 before:absolute before:inset-y-2 before:left-1 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
          {activities.slice(0, 10).map((act) => (
            <div key={act.id} className={`relative pl-4 p-2.5 rounded-lg border ${act.is_malicious ? 'bg-red-50/50 dark:bg-red-500/5 border-red-100 dark:border-red-500/20' : 'bg-white dark:bg-[#1a1a24] border-slate-200 dark:border-white/5'}`}>
              {/* Timeline Dot */}
              <div className={`absolute top-4 -left-5 w-2.5 h-2.5 rounded-full ring-4 ring-slate-50 dark:ring-black/20 ${getProviderColor(act.provider)}`} />
              
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-slate-500">{new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{act.identity_used}</span>
                    <span className="text-[10px] text-slate-500 uppercase">({getProviderLabel(act.provider)})</span>
                  </div>
                  
                  <div className="text-sm text-slate-700 dark:text-slate-300 mb-1">
                    <span className="font-medium">{act.action}</span>
                    {act.target && <span className="text-slate-500"> → {act.target}</span>}
                  </div>
                  
                  <div className="text-[10px] text-slate-500 flex items-center gap-2">
                    <span>Region: {act.region}</span>
                    <span>•</span>
                    <span>IP: {act.source_ip}</span>
                  </div>
                </div>
                
                <div className="shrink-0">
                  {act.is_malicious ? (
                    <div className="text-xs font-medium text-red-500 flex items-center gap-1 bg-red-500/10 px-2 py-1 rounded">
                      ⚠ Malicious — {act.attack_phase}
                    </div>
                  ) : (
                    <div className="text-xs font-medium text-green-500 flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded">
                      ✅ Benign
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activities.length > 0 && (
        <div className="mt-4 pt-2 text-center">
          <button onClick={() => navigate('/logs')} className="text-xs font-medium text-indigo-500 hover:text-indigo-400 transition-colors">
            View more in Log Monitor →
          </button>
        </div>
      )}
    </div>
  );
}
