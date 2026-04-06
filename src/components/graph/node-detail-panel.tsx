import { X, FileText, Clock } from 'lucide-react';
import { type GraphNode } from '../../types/graph';
import { useNavigate } from 'react-router-dom';

interface NodeDetailPanelProps {
  node: GraphNode;
  onClose: () => void;
  onNodeClick: (nodeId: string) => void;
  connectedNodes: { id: string; label: string; type: string; edgeType: string }[];
  isSubgraphMode: boolean;
  onToggleSubgraph: () => void;
}

export function NodeDetailPanel({ node, onClose, onNodeClick, connectedNodes, isSubgraphMode, onToggleSubgraph }: NodeDetailPanelProps) {
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

  const getDotColor = (type: string) => {
    switch(type) {
      case 'user': return 'bg-blue-500';
      case 'vm': return 'bg-green-500';
      case 'container': return 'bg-orange-500';
      case 'ip': return 'bg-red-500';
      case 'role': return 'bg-purple-500';
      case 'cve': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="absolute top-0 right-0 bottom-0 w-80 bg-white/95 dark:bg-[#12121a]/95 backdrop-blur-xl border-l border-slate-200 dark:border-white/10 shadow-2xl z-20 flex flex-col animate-in slide-in-from-right-full duration-200">
      
      <div className="p-5 border-b border-slate-200 dark:border-white/10 shrink-0 relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-md hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
          <X className="w-5 h-5 text-slate-500" />
        </button>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white pr-8 break-all">{node.label}</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className={`px-2 py-0.5 rounded-full border text-[10px] font-medium uppercase ${getTypeStyle(node.type)}`}>
            {node.type}
          </span>
          <span className="px-2 py-0.5 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-[10px] font-medium uppercase text-slate-600 dark:text-slate-300">
            {node.provider}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 styled-scrollbar space-y-6">
        
        {/* Threat Assessment */}
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-3">Threat Assessment</div>
          <div className="flex items-end gap-3 mb-2">
            <span className={`text-4xl font-bold leading-none ${getScoreColor(node.score)}`}>
              {(node.score * 100).toFixed(0)}%
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase mb-1 ${getScoreBg(node.score)}/15 ${getScoreColor(node.score)}`}>
              {node.severity}
            </span>
          </div>
          <div className="h-2 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
            <div className={`h-full ${getScoreBg(node.score)}`} style={{ width: `${node.score * 100}%` }} />
          </div>
        </div>

        {/* Feature Vector */}
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-3">Feature Contributions</div>
          <div className="space-y-2">
            {[
              { label: 'Log Behavior', val: node.features.zlog, color: 'bg-blue-500' },
              { label: 'Vulnerability', val: node.features.zcve, color: 'bg-yellow-500' },
              { label: 'Risk Score', val: node.features.riskScore, color: 'bg-orange-500' },
              { label: 'Exploit Prob', val: node.features.exploitProb, color: 'bg-red-500' },
              { label: 'Identity', val: node.features.zidentity, color: 'bg-purple-500' },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-xs text-slate-500 w-[85px] shrink-0">{f.label}</span>
                <div className="flex-1 h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${f.color}`} style={{ width: `${f.val * 100}%` }} />
                </div>
                <span className="text-xs font-mono text-slate-700 dark:text-slate-300 w-[30px] text-right">{f.val.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-3">Details</div>
          <div className="space-y-1">
            {[
              { label: 'Node ID', val: node.id },
              { label: 'Cloud Region', val: node.region },
              { label: 'First Seen', val: new Date(node.firstSeen).toLocaleDateString() },
              { label: 'Attack Type', val: node.attackType || '—' },
              { label: 'Temporal Step', val: `t=${node.temporalStep}` },
            ].map((d, i) => (
              <div key={i} className="flex justify-between py-1.5 border-b border-slate-100 dark:border-white/5 last:border-0">
                <span className="text-xs text-slate-500">{d.label}</span>
                <span className="text-xs font-medium text-slate-900 dark:text-white text-right max-w-[150px] truncate" title={d.val}>{d.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Connected Nodes */}
        {connectedNodes.length > 0 && (
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-3">Connected Entities ({connectedNodes.length})</div>
            <div className="space-y-1">
              {connectedNodes.slice(0, 8).map((cn, i) => (
                <div key={i} onClick={() => onNodeClick(cn.id)} className="flex items-center gap-2 py-1.5 px-2 -mx-2 rounded-md hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-colors group">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${getDotColor(cn.type)}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-slate-900 dark:text-white truncate">{cn.label}</div>
                    <div className="text-[10px] text-slate-500 truncate">{cn.edgeType}</div>
                  </div>
                  <ChevronRight className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
              {connectedNodes.length > 8 && (
                <div className="text-xs text-indigo-500 pt-1">+ {connectedNodes.length - 8} more...</div>
              )}
            </div>
          </div>
        )}

        {/* Subgraph Toggle */}
        {node.explainerNodes.length > 0 && (
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-900 dark:text-white">GNNExplainer View</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={isSubgraphMode} onChange={onToggleSubgraph} />
                <div className="w-7 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-500"></div>
              </label>
            </div>
            <p className="text-[10px] text-slate-500 leading-snug">
              Show only the minimal subgraph that explains why this node was flagged.
            </p>
          </div>
        )}

      </div>

      <div className="p-5 border-t border-slate-200 dark:border-white/10 shrink-0 flex flex-col gap-2 bg-white/50 dark:bg-transparent">
        <button onClick={() => navigate(`/reports/${node.id}`)} className="w-full h-8 flex items-center justify-center gap-1.5 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white text-xs font-medium rounded-lg transition-all shadow-md shadow-indigo-500/20">
          <FileText className="w-3.5 h-3.5" /> View Full Report
        </button>
        <button onClick={() => navigate(`/timeline?node=${node.id}`)} className="w-full h-8 flex items-center justify-center gap-1.5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 text-xs font-medium rounded-lg transition-colors">
          <Clock className="w-3.5 h-3.5" /> View in Timeline
        </button>
      </div>
    </div>
  );
}

// Needed for the ChevronRight icon in the list
import { ChevronRight } from 'lucide-react';
