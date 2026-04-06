import { ChevronDown, ChevronUp } from 'lucide-react';
import { type LogEntry } from '../../types/log-entry';
import { JsonViewer } from './json-viewer';

interface LogEntryRowProps {
  log: LogEntry;
  isExpanded: boolean;
  onToggle: () => void;
  viewMode: 'raw' | 'normalized' | 'both';
}

export function LogEntryRow({ log, isExpanded, onToggle, viewMode }: LogEntryRowProps) {
  
  const getSeverityBorder = (severity: string) => {
    switch(severity) {
      case 'critical': return 'border-l-red-500';
      case 'high': return 'border-l-orange-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-transparent';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch(severity) {
      case 'critical': return <span className="px-2 py-0.5 rounded-full bg-red-500/15 text-red-500 text-[10px] font-bold uppercase border border-red-500/30">⚠ Critical</span>;
      case 'high': return <span className="px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-500 text-[10px] font-bold uppercase border border-orange-500/30">High</span>;
      case 'medium': return <span className="px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-500 text-[10px] font-bold uppercase border border-yellow-500/30">Medium</span>;
      case 'low': return <span className="px-2 py-0.5 rounded-full bg-green-500/15 text-green-500 text-[10px] font-bold uppercase border border-green-500/30">Low</span>;
      default: return <span className="px-2 py-0.5 rounded-full bg-slate-500/15 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase border border-slate-500/30">✅ Benign</span>;
    }
  };

  const getProviderStyle = (provider: string) => {
    switch(provider) {
      case 'aws': return 'bg-[#FF9900]/15 text-[#FF9900] border-[#FF9900]/30';
      case 'azure': return 'bg-[#0078D4]/15 text-[#0078D4] border-[#0078D4]/30';
      case 'gcp': return 'bg-[#EA4335]/15 text-[#EA4335] border-[#EA4335]/30';
      default: return 'bg-slate-500/15 text-slate-500 border-slate-500/30';
    }
  };

  const getTypeStyle = (type: string) => {
    switch(type) {
      case 'User': return 'text-blue-500';
      case 'VM': return 'text-green-500';
      case 'Container': return 'text-orange-500';
      case 'IP': return 'text-red-500';
      case 'Role': return 'text-purple-500';
      case 'CVE': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  const timeString = new Date(log.timestamp).toLocaleTimeString('en-US', { hour12: false });
  const isMalicious = log.is_malicious;

  return (
    <div className={`bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden transition-all duration-150 ${isMalicious ? 'dark:bg-red-500/5' : ''}`}>
      
      {/* Collapsed Row */}
      <div 
        onClick={onToggle}
        className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 border-l-[3px] ${getSeverityBorder(log.severity)}`}
      >
        <div className="w-16 sm:w-20 text-xs font-mono text-slate-500 shrink-0">{timeString}</div>
        
        <div className={`px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase shrink-0 ${getProviderStyle(log.provider)}`}>
          {log.provider}
        </div>

        <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 min-w-0">
          <div className="flex items-baseline gap-1.5 truncate">
            <span className="text-sm font-semibold text-slate-900 dark:text-white truncate">{log.entity_id}</span>
            <span className={`text-[10px] font-medium ${getTypeStyle(log.entity_type)}`}>({log.entity_type})</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300 truncate">
            <span className="font-mono text-xs">{log.action}</span>
            {log.target_id && (
              <>
                <span className="text-slate-400">→</span>
                <span className="truncate">{log.target_id}</span>
              </>
            )}
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <div className="hidden sm:block">{getSeverityBadge(log.severity)}</div>
          {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-black/20">
          
          <div className="sm:hidden mb-4">{getSeverityBadge(log.severity)}</div>

          {viewMode === 'both' ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col h-full">
                <div className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1.5">
                  📄 Raw Log <span className="text-[10px] opacity-70">({log.provider === 'aws' ? 'CloudTrail' : log.provider === 'azure' ? 'Activity Log' : 'Cloud Audit'})</span>
                </div>
                <JsonViewer data={log.raw_log} isMalicious={log.is_malicious} />
              </div>
              <div className="flex flex-col h-full">
                <div className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1.5">
                  📋 Normalized <span className="text-[10px] opacity-70">(UDM++)</span>
                </div>
                <JsonViewer data={log.normalized_log} isMalicious={log.is_malicious} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1.5">
                {viewMode === 'raw' ? '📄 Raw Log' : '📋 Normalized (UDM++)'}
              </div>
              <JsonViewer data={viewMode === 'raw' ? log.raw_log : log.normalized_log} isMalicious={log.is_malicious} />
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700/50 flex flex-wrap gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">📊 Event ID: <span className="font-mono text-slate-700 dark:text-slate-300">{log.id}</span></div>
            <div className="flex items-center gap-1.5">📍 Region: <span className="text-slate-700 dark:text-slate-300">{log.region}</span></div>
            <div className="flex items-center gap-1.5">⏱ Processed: <span className="font-mono text-slate-700 dark:text-slate-300">{timeString}</span></div>
          </div>
        </div>
      )}

    </div>
  );
}
