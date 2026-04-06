import { useState, lazy, Suspense } from 'react';
import { type RiskReport } from '../../types/report';
import { Network } from 'lucide-react';

const ExplainerSubgraphCanvas = lazy(() => import('./explainer-subgraph-canvas'));

interface ExplainerSubgraphProps {
  report: RiskReport;
}

export function ExplainerSubgraph({ report }: ExplainerSubgraphProps) {
  const [highlightCritical, setHighlightCritical] = useState(false);
  const [showLabels, setShowLabels] = useState(true);

  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl flex flex-col h-full overflow-hidden shadow-sm mb-6">
      
      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <Network className="w-[18px] h-[18px] text-indigo-500" /> GNNExplainer Subgraph
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Minimal subgraph responsible for the final risk prediction</p>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={highlightCritical}
              onChange={(e) => setHighlightCritical(e.target.checked)}
              className="rounded text-indigo-500 focus:ring-indigo-500 bg-slate-100 dark:bg-white/10 border-transparent w-3.5 h-3.5"
            />
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Highlight Critical Path</span>
          </label>
          <label className="hidden sm:flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={showLabels}
              onChange={(e) => setShowLabels(e.target.checked)}
              className="rounded text-indigo-500 focus:ring-indigo-500 bg-slate-100 dark:bg-white/10 border-transparent w-3.5 h-3.5"
            />
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Labels</span>
          </label>
        </div>
      </div>

      <div className="relative w-full h-[320px] md:h-[420px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-50 via-slate-100 to-slate-200 dark:from-[#1a1a24] dark:via-[#12121a] dark:to-[#0a0a0f]">
        <Suspense fallback={
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/50 dark:bg-[#0a0a0f]/50 backdrop-blur-sm z-20">
            <Network className="w-8 h-8 text-slate-400 animate-pulse mb-2" />
            <span className="text-xs text-slate-500">Loading subgraph...</span>
          </div>
        }>
          <ExplainerSubgraphCanvas 
            report={report} 
            highlightCritical={highlightCritical}
            showLabels={showLabels}
          />
        </Suspense>
      </div>

      <div className="p-3 border-t border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-transparent flex flex-wrap gap-2">
        <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[11px] text-slate-600 dark:text-slate-300">
          {report.explainerSubgraph.nodes.length} nodes involved
        </span>
        <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[11px] text-slate-600 dark:text-slate-300">
          {report.explainerSubgraph.edges.length} edges important
        </span>
        <span className="px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
          Top driver: {report.contributions.sort((a,b) => Math.abs(b.value) - Math.abs(a.value))[0].label}
        </span>
      </div>
    </div>
  );
}
