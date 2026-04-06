import { X, ArrowRight } from 'lucide-react';
import { type GraphEdge, type GraphNode } from '../../types/graph';

interface EdgeDetailPanelProps {
  edge: GraphEdge;
  sourceNode?: GraphNode;
  targetNode?: GraphNode;
  onClose: () => void;
  onNodeClick: (nodeId: string) => void;
}

export function EdgeDetailPanel({ edge, sourceNode, targetNode, onClose, onNodeClick }: EdgeDetailPanelProps) {
  
  const getScoreColor = (score: number) => {
    if (score > 0.75) return 'text-red-500 bg-red-500';
    if (score > 0.50) return 'text-orange-500 bg-orange-500';
    if (score > 0.25) return 'text-yellow-500 bg-yellow-500';
    return 'text-green-500 bg-green-500';
  };

  const getEdgeBadgeStyle = (type: string) => {
    switch(type) {
      case 'assumes_role': return 'bg-purple-400/15 text-purple-500 border-purple-400/30';
      case 'access': return 'bg-blue-400/15 text-blue-500 border-blue-400/30';
      case 'connects_to': return 'bg-green-400/15 text-green-500 border-green-400/30';
      case 'exploits': return 'bg-red-400/15 text-red-500 border-red-400/30';
      case 'has_vulnerability': return 'bg-yellow-400/15 text-yellow-500 border-yellow-400/30';
      case 'deployed_on': return 'bg-orange-400/15 text-orange-500 border-orange-400/30';
      case 'cross_cloud_access': return 'bg-amber-500/15 text-amber-500 border-amber-500/30';
      default: return 'bg-gray-400/15 text-gray-400 border-gray-400/30';
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

  return (
    <div className="absolute top-0 right-0 bottom-0 w-80 bg-white/95 dark:bg-[#12121a]/95 backdrop-blur-xl border-l border-slate-200 dark:border-white/10 shadow-2xl z-20 flex flex-col animate-in slide-in-from-right-full duration-200">
      
      <div className="p-5 border-b border-slate-200 dark:border-white/10 shrink-0 relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-md hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
          <X className="w-5 h-5 text-slate-500" />
        </button>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white pr-8">Edge Details</h2>
        <div className="mt-2">
          <span className={`px-2 py-0.5 rounded-full border text-[10px] font-medium uppercase ${getEdgeBadgeStyle(edge.type)}`}>
            {edge.type}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 styled-scrollbar space-y-6">
        
        {/* Connection */}
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-3">Connection</div>
          <div className="flex items-center gap-2">
            <div 
              onClick={() => onNodeClick(edge.source)}
              className="flex-1 p-2.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            >
              <span className="text-xs font-medium text-slate-900 dark:text-white truncate w-full text-center mb-1" title={sourceNode?.label}>{sourceNode?.label || edge.source}</span>
              {sourceNode && <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium uppercase ${getTypeStyle(sourceNode.type)}`}>{sourceNode.type}</span>}
            </div>
            
            <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
            
            <div 
              onClick={() => onNodeClick(edge.target)}
              className="flex-1 p-2.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            >
              <span className="text-xs font-medium text-slate-900 dark:text-white truncate w-full text-center mb-1" title={targetNode?.label}>{targetNode?.label || edge.target}</span>
              {targetNode && <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium uppercase ${getTypeStyle(targetNode.type)}`}>{targetNode.type}</span>}
            </div>
          </div>
        </div>

        {/* Anomaly Score */}
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-3">DistMult Anomaly Score</div>
          <div className={`text-3xl font-bold mb-2 ${getScoreColor(edge.anomalyScore).split(' ')[0]}`}>
            {edge.anomalyScore.toFixed(2)}
          </div>
          <div className="h-2 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
            <div className={`h-full ${getScoreColor(edge.anomalyScore).split(' ')[1]}`} style={{ width: `${edge.anomalyScore * 100}%` }} />
          </div>
          <p className="text-[10px] text-slate-500 mt-1.5 leading-snug">
            Higher scores indicate more anomalous relationships predicted by the knowledge graph embedding model.
          </p>
        </div>

        {/* Details */}
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-3">Details</div>
          <div className="space-y-1">
            {[
              { label: 'Edge Type', val: edge.type },
              { label: 'Direction', val: 'Source → Target' },
              { label: 'Weight', val: edge.weight.toFixed(2) },
              { label: 'First Observed', val: new Date(edge.firstObserved).toLocaleDateString() },
              { label: 'Provider', val: sourceNode?.provider === targetNode?.provider ? sourceNode?.provider : 'Cross-Cloud' },
            ].map((d, i) => (
              <div key={i} className="flex justify-between py-1.5 border-b border-slate-100 dark:border-white/5 last:border-0">
                <span className="text-xs text-slate-500">{d.label}</span>
                <span className="text-xs font-medium text-slate-900 dark:text-white text-right max-w-[150px] truncate capitalize">{d.val}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="p-5 border-t border-slate-200 dark:border-white/10 shrink-0 flex flex-col gap-2 bg-white/50 dark:bg-transparent">
        <button onClick={() => onNodeClick(edge.source)} className="w-full h-8 flex items-center justify-center border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 text-xs font-medium rounded-lg transition-colors">
          View Source Node
        </button>
        <button onClick={() => onNodeClick(edge.target)} className="w-full h-8 flex items-center justify-center border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 text-xs font-medium rounded-lg transition-colors">
          View Target Node
        </button>
      </div>
    </div>
  );
}
