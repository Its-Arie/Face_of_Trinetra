import { XCircle } from 'lucide-react';
import { useState } from 'react';

interface DismissDialogProps {
  onClose: () => void;
  onSubmit: (reason: string) => void;
}

export function DismissDialog({ onClose, onSubmit }: DismissDialogProps) {
  const [reason, setReason] = useState('');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#12121a] p-6 rounded-2xl border border-slate-200 dark:border-white/10 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200 mx-4">
        <div className="flex items-center gap-3 text-red-500 mb-2">
          <XCircle className="w-5 h-5" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Dismiss Alert</h3>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          Dismissing this alert will move it to the Resolved tab. Please provide a reason for dismissal.
        </p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Reason for dismissal</label>
          <input 
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g., Not relevant to current investigation"
            className="w-full h-9 px-3 rounded-lg bg-slate-100 dark:bg-white/5 border-none text-sm text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
            autoFocus
          />
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors">
            Cancel
          </button>
          <button 
            onClick={() => onSubmit(reason)} 
            disabled={!reason.trim()}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors disabled:opacity-50 disabled:pointer-events-none"
          >
            Dismiss Alert
          </button>
        </div>
      </div>
    </div>
  );
}
