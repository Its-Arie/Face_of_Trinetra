import { Bug, ShieldPlus, ArrowRightLeft, Shuffle, Search, CheckCircle, ArrowUpCircle, MoreHorizontal, FileText, Network, Clock, ShieldOff, XCircle, ShieldAlert } from 'lucide-react';
import { type Alert } from '../../types/alert';
import { useNavigate } from 'react-router-dom';

interface AlertCardProps {
  alert: Alert;
  isSelected: boolean;
  isActive: boolean;
  onClick: () => void;
  onToggleSelect: () => void;
  onAcknowledge: () => void;
  onEscalate: () => void;
  onDismiss: () => void;
  onFalsePositive: () => void;
}

export function AlertCard({ alert, isSelected, isActive, onClick, onToggleSelect, onAcknowledge, onEscalate, onDismiss, onFalsePositive }: AlertCardProps) {
  const navigate = useNavigate();

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const getSeverityTextColor = (severity: string) => {
    switch(severity) {
      case 'critical': return 'text-red-500';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-500';
      default: return 'text-green-500';
    }
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

  const getAttackIcon = (type: string | null) => {
    switch(type) {
      case 'CVE Exploitation': return <Bug className="w-[13px] h-[13px]" />;
      case 'Privilege Escalation': return <ShieldPlus className="w-[13px] h-[13px]" />;
      case 'Lateral Movement': return <ArrowRightLeft className="w-[13px] h-[13px]" />;
      case 'Cross-Cloud Pivot': return <Shuffle className="w-[13px] h-[13px]" />;
      case 'Reconnaissance': return <Search className="w-[13px] h-[13px]" />;
      default: return <ShieldAlert className="w-[13px] h-[13px]" />;
    }
  };

  const isResolvedOrDismissed = alert.status === 'resolved' || alert.status === 'dismissed';
  
  // Left border logic
  let leftBorderClass = 'border-l-transparent';
  if (isActive) leftBorderClass = 'border-l-indigo-500 border-l-[3px]';
  else if (alert.status === 'new' && new Date(alert.timestamp).getTime() > Date.now() - 60000) {
    leftBorderClass = 'border-l-indigo-500 border-l-[3px] animate-pulse';
  } else if (alert.status === 'escalated') {
    leftBorderClass = 'border-l-red-500/50 border-l-[3px]';
  }

  return (
    <div 
      onClick={onClick}
      className={`bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-xl p-3.5 cursor-pointer relative transition-all duration-150 group 
      ${leftBorderClass}
      ${isSelected ? 'ring-2 ring-indigo-500/50 bg-indigo-500/5' : 'hover:bg-slate-50 dark:hover:bg-white/5'}
      ${isResolvedOrDismissed ? (alert.status === 'dismissed' ? 'opacity-70' : 'opacity-80') : ''}
    `}>
      
      {/* Row 1 */}
      <div className="flex items-center gap-2.5">
        <div onClick={e => e.stopPropagation()} className="flex items-center justify-center h-full">
          <input 
            type="checkbox" 
            checked={isSelected}
            onChange={onToggleSelect}
            className="rounded text-indigo-500 focus:ring-indigo-500 bg-slate-100 dark:bg-white/10 border-slate-300 dark:border-white/20 w-4 h-4 cursor-pointer"
          />
        </div>
        
        <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${getSeverityColor(alert.severity)}`} />
        
        <div className="text-sm font-semibold text-slate-900 dark:text-white truncate max-w-[150px] sm:max-w-[200px]">
          {alert.nodeName}
        </div>
        
        <span className={`px-1.5 py-0 rounded-full border text-[10px] font-medium uppercase ${getTypeStyle(alert.nodeType)}`}>
          {alert.nodeType}
        </span>
        
        <div className="flex-1" />
        
        <span className={`px-1.5 py-0 rounded-full border text-[10px] font-medium uppercase hidden sm:inline-block ${getProviderStyle(alert.provider)}`}>
          {alert.provider}
        </span>
        
        <span className={`px-1.5 py-0 rounded-full border text-[10px] font-bold uppercase ${getStatusStyle(alert.status)}`}>
          {alert.status === 'acknowledged' ? 'ACK' : alert.status}
        </span>
        
        <div className="text-[11px] text-slate-500 font-mono flex-shrink-0 w-12 text-right" title={alert.timestamp}>
          {alert.relativeTime}
        </div>
      </div>

      {/* Row 2 */}
      <div className="mt-1.5 flex items-center gap-2 pl-7">
        <div className="text-slate-400 dark:text-slate-500">
          {getAttackIcon(alert.attackType)}
        </div>
        <div className={`text-xs text-slate-600 dark:text-slate-400 truncate flex-1 ${alert.status === 'dismissed' ? 'line-through opacity-70' : ''}`}>
          {alert.description}
        </div>
      </div>

      {/* Row 3 */}
      <div className="mt-1.5 flex items-center justify-between pl-7">
        <div className="flex items-center gap-2.5">
          <span className="text-[11px] text-slate-500">Score:</span>
          <div className="w-[60px] sm:w-[80px] h-1.5 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
            <div className={`h-full ${getSeverityColor(alert.severity)}`} style={{ width: `${alert.score * 100}%` }} />
          </div>
          <span className={`text-xs font-mono font-semibold ${getSeverityTextColor(alert.severity)}`}>
            {alert.score.toFixed(2)}
          </span>

          {!isResolvedOrDismissed && alert.relatedCVEs.length > 0 && (
            <div className="hidden sm:flex items-center gap-1 text-[10px] text-slate-500 ml-2">
              <Bug className="w-[10px] h-[10px]" /> {alert.relatedCVEs.length} CVEs
            </div>
          )}
          
          {!isResolvedOrDismissed && alert.connectedNodes > 0 && (
            <div className="hidden sm:flex items-center gap-1 text-[10px] text-slate-500 ml-2">
              <Network className="w-[10px] h-[10px]" /> {alert.connectedNodes} connected
            </div>
          )}
        </div>

        {!isResolvedOrDismissed && (
          <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
            {alert.status === 'new' && (
              <button onClick={onAcknowledge} title="Acknowledge" className="w-7 h-7 flex items-center justify-center rounded hover:bg-green-500/10 text-green-500/70 hover:text-green-500 transition-colors">
                <CheckCircle className="w-3.5 h-3.5" />
              </button>
            )}
            {(alert.status === 'new' || alert.status === 'acknowledged') && (
              <button onClick={onEscalate} title="Escalate" className="w-7 h-7 flex items-center justify-center rounded hover:bg-amber-500/10 text-amber-500/70 hover:text-amber-500 transition-colors">
                <ArrowUpCircle className="w-3.5 h-3.5" />
              </button>
            )}
            
            {/* Dropdown Menu Mock (using a simple hover menu for now to avoid radix-ui dependency issues) */}
            <div className="relative group/menu">
              <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
              <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-[#1a1a24] rounded-lg shadow-xl border border-slate-200 dark:border-white/10 py-1 hidden group-hover/menu:block z-50">
                <button onClick={() => navigate(`/reports/${alert.nodeId}`)} className="w-full text-left px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" /> View Full Report
                </button>
                <button onClick={() => navigate(`/graph?highlight=${alert.nodeId}`)} className="w-full text-left px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2">
                  <Network className="w-3.5 h-3.5" /> View in Graph
                </button>
                <button onClick={() => navigate(`/timeline?node=${alert.nodeId}`)} className="w-full text-left px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" /> View Timeline
                </button>
                <div className="h-px bg-slate-200 dark:bg-white/10 my-1" />
                <button onClick={onFalsePositive} className="w-full text-left px-3 py-1.5 text-xs text-amber-600 dark:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 flex items-center gap-2">
                  <ShieldOff className="w-3.5 h-3.5" /> Mark False Positive
                </button>
                <button onClick={onDismiss} className="w-full text-left px-3 py-1.5 text-xs text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-2">
                  <XCircle className="w-3.5 h-3.5" /> Dismiss
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
