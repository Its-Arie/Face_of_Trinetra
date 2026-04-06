import { X, Clock, FileText, Network, CheckCircle, ArrowUpCircle, CheckCircle2, ShieldOff, XCircle, Brain } from 'lucide-react';
import { type Alert } from '../../types/alert';
import { useNavigate } from 'react-router-dom';

interface AlertDetailPanelProps {
  alert: Alert;
  onClose: () => void;
  onAcknowledge: () => void;
  onEscalate: () => void;
  onResolve: () => void;
  onFalsePositive: () => void;
  onDismiss: () => void;
}

export function AlertDetailPanel({ alert, onClose, onAcknowledge, onEscalate, onResolve, onFalsePositive, onDismiss }: AlertDetailPanelProps) {
  const navigate = useNavigate();

  const getScoreColor = (score: number) => {
    if (score > 0.90) return 'text-red-500';
    if (score > 0.75) return 'text-orange-500';
    if (score > 0.50) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getScoreBg = (score: number) => {
    if (score > 0.90) return 'bg-red-500';
    if (score > 0.75) return 'bg-orange-500';
    if (score > 0.50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getTypeStyle = (type: string) => {
    switch(type) {
      case 'user': return 'bg-blue-500/15 text-blue-500 border-blue-500/30';
      case 'vm': return 'bg-green-500/15 text-green-500 border-green-500/30';
      case 'container': return 'bg-orange-500/15 text-orange-500 border-orange-500/30';
      case 'ip': return 'bg-red-500/15 text-red-500 border-red-500/30';
      case 'role': return 'bg-purple-500/15 text-purple-500 border-purple-500/30';
      case 'cve': return 'bg-yellow-500/15 text-yellow-500 border-yellow-500/30';
      default: return 'bg-gray-500/15 text-gray-500 border-gray-500/30';
    }
  };

  const getProviderStyle = (provider: string) => {
    switch(provider) {
      case 'aws': return 'border-[#FF9900]/50 text-[#FF9900]';
      case 'azure': return 'border-[#0078D4]/50 text-[#0078D4]';
      case 'gcp': return 'border-[#EA4335]/50 text-[#EA4335]';
      default: return 'border-slate-500/50 text-slate-500';
    }
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'new': return 'bg-blue-500/15 text-blue-500 border-blue-500/30';
      case 'acknowledged': return 'bg-amber-500/15 text-amber-500 border-amber-500/30';
      case 'escalated': return 'bg-red-500/15 text-red-500 border-red-500/30';
      case 'resolved': return 'bg-green-500/15 text-green-500 border-green-500/30';
      case 'dismissed': return 'bg-gray-500/15 text-gray-500 border-gray-500/30';
      default: return 'bg-slate-500/15 text-slate-500 border-slate-500/30';
    }
  };

  const getCvssStyle = (cvss: number) => {
    if (cvss >= 9.0) return 'bg-red-500/15 text-red-500';
    if (cvss >= 7.0) return 'bg-orange-500/15 text-orange-500';
    if (cvss >= 4.0) return 'bg-yellow-500/15 text-yellow-500';
    return 'bg-green-500/15 text-green-500';
  };

  const getPriorityStyle = (priority: string) => {
    switch(priority) {
      case 'immediate': return 'bg-red-500/15 text-red-500';
      case 'high': return 'bg-orange-500/15 text-orange-500';
      case 'medium': return 'bg-yellow-500/15 text-yellow-500';
      default: return 'bg-slate-500/15 text-slate-500';
    }
  };

  return (
    <div className="fixed top-16 right-0 h-[calc(100vh-4rem)] w-full md:w-[420px] bg-white/95 dark:bg-[#12121a]/95 backdrop-blur-xl border-l border-slate-200 dark:border-white/10 shadow-2xl z-20 flex flex-col animate-in slide-in-from-right-full duration-200">
      
      {/* Header */}
      <div className="p-5 border-b border-slate-200 dark:border-white/10 shrink-0 relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-md hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
          <X className="w-5 h-5 text-slate-500" />
        </button>
        
        <h2 className="text-lg font-bold text-slate-900 dark:text-white pr-8 truncate">{alert.nodeName}</h2>
        
        <div className="flex flex-wrap gap-2 mt-2">
          <span className={`px-2 py-0.5 rounded-full border text-[10px] font-medium uppercase ${getTypeStyle(alert.nodeType)}`}>
            {alert.nodeType}
          </span>
          <span className={`px-2 py-0.5 rounded-full border text-[10px] font-medium uppercase ${getProviderStyle(alert.provider)}`}>
            {alert.provider}
          </span>
          <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase ${getStatusStyle(alert.status)}`}>
            {alert.status}
          </span>
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500" title={alert.timestamp}>
          <Clock className="w-3.5 h-3.5" /> Detected {alert.relativeTime}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 styled-scrollbar space-y-6">
        
        {/* Threat Assessment */}
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-3">Threat Assessment</div>
          <div className="flex items-center gap-4">
            <span className={`text-4xl font-bold ${getScoreColor(alert.score)}`}>
              {(alert.score * 100).toFixed(0)}
            </span>
            <div className="flex flex-col">
              <span className={`px-3 py-1 rounded-full text-sm font-bold uppercase text-center w-fit ${getScoreBg(alert.score)}/15 ${getScoreColor(alert.score)}`}>
                {alert.severity}
              </span>
              <span className="text-xs text-slate-500 mt-1.5">{alert.attackType || 'Unknown Pattern'}</span>
            </div>
          </div>
          <div className="mt-4 h-2.5 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
            <div className={`h-full ${getScoreBg(alert.score)}`} style={{ width: `${alert.score * 100}%` }} />
          </div>
        </div>

        {/* Feature Attribution */}
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-3">Feature Attribution (SHAP)</div>
          <div className="space-y-2">
            {[
              { label: 'Log Behavior', val: alert.shap.logBehavior },
              { label: 'Vulnerability', val: alert.shap.vulnerability },
              { label: 'Risk Score', val: alert.shap.riskScore },
              { label: 'Exploit Prob', val: alert.shap.exploitProb },
              { label: 'Identity', val: alert.shap.identity },
            ].map((f, i) => {
              const isPositive = f.val >= 0;
              const width = Math.abs(f.val) * 100; // Visual scaling
              return (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 w-[90px] shrink-0">{f.label}</span>
                  <div className="flex-1 h-3 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden relative flex">
                    <div className="w-1/2 flex justify-end">
                      {!isPositive && <div className="h-full bg-blue-500/80 rounded-l-full" style={{ width: `${width}%` }} />}
                    </div>
                    <div className="w-1/2 flex justify-start">
                      {isPositive && <div className="h-full bg-red-500/80 rounded-r-full" style={{ width: `${width}%` }} />}
                    </div>
                  </div>
                  <span className={`text-[11px] font-mono w-[45px] text-right ${isPositive ? 'text-red-500' : 'text-blue-500'}`}>
                    {isPositive ? '+' : ''}{f.val.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-[10px] text-slate-400 italic mt-2">Features contributing to threat detection</p>
        </div>

        {/* Attack Narrative */}
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-3">Attack Narrative</div>
          <div className="rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-3.5">
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {alert.narrative}
            </p>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-slate-400">
            <Brain className="w-3 h-3" />
            <span className="text-[10px] italic">Generated by Mistral-7B</span>
          </div>
        </div>

        {/* Related CVEs */}
        {alert.relatedCVEs.length > 0 && (
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-3">Related Vulnerabilities</div>
            <div className="space-y-2">
              {alert.relatedCVEs.map((cve, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-slate-200 dark:border-white/10 p-2.5 bg-white dark:bg-[#12121a]">
                  <div className="min-w-0 pr-2">
                    <div className="text-xs font-semibold text-slate-900 dark:text-white">{cve.id}</div>
                    <div className="text-[10px] text-slate-500 truncate max-w-[200px]">{cve.description}</div>
                  </div>
                  <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${getCvssStyle(cve.cvss)}`}>
                    {cve.cvss.toFixed(1)}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 text-[11px] text-indigo-500 hover:text-indigo-400 cursor-pointer w-fit" onClick={() => navigate('/vulnerabilities')}>
              View All CVEs →
            </div>
          </div>
        )}

        {/* Remediation */}
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-3">Remediation Steps</div>
          <div className="space-y-2.5">
            {alert.remediation.map((step, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded w-[65px] text-center flex-shrink-0 mt-0.5 ${getPriorityStyle(step.priority)}`}>
                  {step.priority}
                </span>
                <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {step.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 mt-6 border-t border-slate-200 dark:border-white/10">
          <div className="flex flex-col gap-2">
            <button onClick={() => navigate(`/reports/${alert.nodeId}`)} className="h-9 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white text-sm font-medium rounded-lg transition-all shadow-md shadow-indigo-500/20">
              <FileText className="w-4 h-4 mr-2" /> View Full Report
            </button>
            <button onClick={() => navigate(`/graph?highlight=${alert.nodeId}`)} className="h-9 flex items-center justify-center border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 text-sm font-medium rounded-lg transition-colors">
              <Network className="w-4 h-4 mr-2" /> View in Attack Graph
            </button>

            <div className="h-px bg-slate-200 dark:border-white/10 my-2" />

            {/* Status actions */}
            {alert.status !== 'resolved' && alert.status !== 'dismissed' && (
              <div className="flex gap-2">
                {alert.status === 'new' && (
                  <button onClick={onAcknowledge} className="flex-1 h-8 flex items-center justify-center border border-slate-200 dark:border-white/10 hover:bg-green-500/10 hover:border-green-500/30 text-xs font-medium rounded-md transition-colors text-slate-700 dark:text-slate-300 hover:text-green-500">
                    <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-green-500" /> Acknowledge
                  </button>
                )}
                {(alert.status === 'new' || alert.status === 'acknowledged') && (
                  <button onClick={onEscalate} className="flex-1 h-8 flex items-center justify-center border border-slate-200 dark:border-white/10 hover:bg-amber-500/10 hover:border-amber-500/30 text-xs font-medium rounded-md transition-colors text-slate-700 dark:text-slate-300 hover:text-amber-500">
                    <ArrowUpCircle className="w-3.5 h-3.5 mr-1.5 text-amber-500" /> Escalate
                  </button>
                )}
                {(alert.status === 'acknowledged' || alert.status === 'escalated') && (
                  <button onClick={onResolve} className="flex-1 h-8 flex items-center justify-center border border-slate-200 dark:border-white/10 hover:bg-green-500/10 hover:border-green-500/30 text-xs font-medium rounded-md transition-colors text-slate-700 dark:text-slate-300 hover:text-green-500">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-green-500" /> Resolve
                  </button>
                )}
              </div>
            )}

            {/* Bottom actions */}
            {alert.status !== 'resolved' && alert.status !== 'dismissed' && (
              <div className="flex gap-2 mt-1">
                <button onClick={onFalsePositive} className="flex-1 h-8 flex items-center justify-center hover:bg-amber-50 dark:hover:bg-amber-500/10 text-amber-600 dark:text-amber-500 text-xs font-medium rounded-md transition-colors">
                  <ShieldOff className="w-3.5 h-3.5 mr-1.5" /> Mark False Positive
                </button>
                <button onClick={onDismiss} className="flex-1 h-8 flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 dark:text-red-500 text-xs font-medium rounded-md transition-colors">
                  <XCircle className="w-3.5 h-3.5 mr-1.5" /> Dismiss
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
