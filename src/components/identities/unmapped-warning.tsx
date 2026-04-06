import { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { mockUnmappedIdentities } from '../../lib/mock-data/identity-mappings';
import { toast } from 'sonner';

interface UnmappedWarningProps {
  onDismiss: () => void;
}

export function UnmappedWarning({ onDismiss }: UnmappedWarningProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const getProviderStyle = (provider: string) => {
    switch (provider) {
      case 'aws': return 'bg-[#FF9900]/15 text-[#FF9900] border-[#FF9900]/30';
      case 'azure': return 'bg-[#0078D4]/15 text-[#0078D4] border-[#0078D4]/30';
      case 'gcp': return 'bg-[#EA4335]/15 text-[#EA4335] border-[#EA4335]/30';
      default: return 'bg-slate-500/15 text-slate-500 border-slate-500/30';
    }
  };

  const getRiskStyle = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-500/15 text-red-500 border-red-500/30';
      case 'medium': return 'bg-yellow-500/15 text-yellow-500 border-yellow-500/30';
      case 'low': return 'bg-green-500/15 text-green-500 border-green-500/30';
      default: return 'bg-slate-500/15 text-slate-500 border-slate-500/30';
    }
  };

  const handleDismiss = () => {
    toast.success('Warning dismissed. It will reappear if new unmapped identities are found.');
    onDismiss();
  };

  return (
    <>
      <div id="unmapped-warning" className="bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20 border-l-[4px] border-l-amber-500 rounded-xl p-4 sm:p-5 animate-in slide-in-from-top-4 fade-in duration-300 shadow-sm">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-amber-500 mb-1">
              3 identities could not be linked across cloud providers
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              The following accounts have no matching identity on other providers and may represent rogue accounts, orphaned service accounts, or incomplete federation configurations.
            </p>

            <div className="bg-white dark:bg-[#12121a]/50 rounded-lg border border-slate-200 dark:border-white/10 overflow-hidden mb-4">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10">
                  <tr>
                    <th className="p-2.5 font-medium text-slate-500 dark:text-slate-400">Identity</th>
                    <th className="p-2.5 font-medium text-slate-500 dark:text-slate-400 w-[100px]">Provider</th>
                    <th className="p-2.5 font-medium text-slate-500 dark:text-slate-400 hidden sm:table-cell">Reason</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  <tr>
                    <td className="p-2.5 font-mono font-semibold text-slate-900 dark:text-white">svc_lambda_exec</td>
                    <td className="p-2.5"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#FF9900]/15 text-[#FF9900]">AWS</span></td>
                    <td className="p-2.5 text-slate-500 dark:text-slate-400 hidden sm:table-cell">No matching Azure/GCP identity</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-mono font-semibold text-slate-900 dark:text-white">deploy_bot_az</td>
                    <td className="p-2.5"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#0078D4]/15 text-[#0078D4]">Azure</span></td>
                    <td className="p-2.5 text-slate-500 dark:text-slate-400 hidden sm:table-cell">No matching AWS/GCP identity</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-mono font-semibold text-slate-900 dark:text-white">ci_runner_gcp</td>
                    <td className="p-2.5"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#EA4335]/15 text-[#EA4335]">GCP</span></td>
                    <td className="p-2.5 text-slate-500 dark:text-slate-400 hidden sm:table-cell">No matching AWS/Azure identity</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-medium rounded-lg transition-all shadow-md shadow-orange-500/20"
              >
                Investigate
              </button>
              <button 
                onClick={handleDismiss}
                className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-amber-100 dark:hover:bg-amber-500/10 text-sm font-medium rounded-lg transition-colors"
              >
                Dismiss Warning
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#12121a] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col animate-in slide-in-from-bottom-8 duration-300">
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-white/10 shrink-0">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Unmapped Identity Investigation</h2>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 overflow-y-auto styled-scrollbar space-y-6">
              {mockUnmappedIdentities.map((uid, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono font-bold text-slate-900 dark:text-white text-base">{uid.identity_id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${getProviderStyle(uid.provider)}`}>
                          {uid.provider}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${getRiskStyle(uid.risk_assessment)}`}>
                          {uid.risk_assessment} Risk
                        </span>
                      </div>
                      <div className="text-xs text-slate-500">Last seen: {new Date(uid.last_seen).toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-xs font-medium text-slate-900 dark:text-white mb-1.5">Suggested Action:</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 bg-white dark:bg-[#1a1a24] p-2.5 rounded-lg border border-slate-200 dark:border-white/5">
                      {uid.suggested_action}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-medium text-slate-900 dark:text-white mb-1.5">Recent Actions:</div>
                    <div className="space-y-1.5">
                      {uid.recent_actions.map(act => (
                        <div key={act.id} className={`flex items-start gap-2 text-xs p-2 rounded-md ${act.is_malicious ? 'bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20' : 'bg-white dark:bg-[#1a1a24] border border-slate-200 dark:border-white/5'}`}>
                          <div className="font-mono text-slate-500 w-[60px] shrink-0">{new Date(act.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                          <div className="flex-1">
                            <span className="font-medium text-slate-900 dark:text-white mr-1">{act.action}</span>
                            <span className="text-slate-500 break-all">{act.target}</span>
                          </div>
                          {act.is_malicious && <span className="text-[10px] text-red-500 font-medium shrink-0">⚠ {act.attack_phase}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-slate-200 dark:border-white/10 shrink-0 flex justify-end">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-900 dark:text-white text-sm font-medium rounded-lg transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
