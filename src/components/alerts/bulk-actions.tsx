import { CheckCircle, ArrowUpCircle, XCircle, X } from 'lucide-react';

interface BulkActionsProps {
  selectedCount: number;
  totalVisible: number;
  onSelectAll: (select: boolean) => void;
  onAcknowledge: () => void;
  onEscalate: () => void;
  onDismiss: () => void;
  onDeselectAll: () => void;
}

export function BulkActions({ selectedCount, totalVisible, onSelectAll, onAcknowledge, onEscalate, onDismiss, onDeselectAll }: BulkActionsProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="w-full bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-2.5 mb-3 flex items-center justify-between animate-in slide-in-from-top-2 fade-in duration-200">
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 cursor-pointer pl-1">
          <input 
            type="checkbox" 
            checked={selectedCount === totalVisible && totalVisible > 0}
            onChange={(e) => onSelectAll(e.target.checked)}
            className="rounded text-indigo-500 focus:ring-indigo-500 bg-white dark:bg-white/10 border-slate-300 dark:border-white/20 w-4 h-4"
          />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Select All</span>
        </label>
        <div className="w-px h-5 bg-indigo-500/30" />
        <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
          {selectedCount} alerts selected
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={onAcknowledge} className="h-8 px-3 flex items-center text-xs font-medium rounded-md border border-green-500/50 text-green-600 dark:text-green-500 hover:bg-green-500/10 transition-colors bg-white/50 dark:bg-transparent">
          <CheckCircle className="w-3.5 h-3.5 mr-1.5" /> Acknowledge
        </button>
        <button onClick={onEscalate} className="h-8 px-3 flex items-center text-xs font-medium rounded-md border border-amber-500/50 text-amber-600 dark:text-amber-500 hover:bg-amber-500/10 transition-colors bg-white/50 dark:bg-transparent">
          <ArrowUpCircle className="w-3.5 h-3.5 mr-1.5" /> Escalate
        </button>
        <button onClick={onDismiss} className="h-8 px-3 flex items-center text-xs font-medium rounded-md border border-red-500/50 text-red-600 dark:text-red-500 hover:bg-red-500/10 transition-colors bg-white/50 dark:bg-transparent">
          <XCircle className="w-3.5 h-3.5 mr-1.5" /> Dismiss
        </button>
        <button onClick={onDeselectAll} className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
