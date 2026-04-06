import { Network } from 'lucide-react';

export function GraphCanvasLoader() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/50 dark:bg-[#0a0a0f]/50 backdrop-blur-sm z-10">
      <Network className="w-10 h-10 text-slate-400 dark:text-slate-600 animate-pulse mb-3" />
      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Loading attack graph...</p>
      <p className="text-xs text-slate-500 dark:text-slate-500/70 mt-1">Preparing nodes, edges, and layout</p>
    </div>
  );
}
