import { ShieldOff } from 'lucide-react';
import { useState } from 'react';

interface FalsePositiveDialogProps {
  nodeName: string;
  onClose: () => void;
  onSubmit: (reason: string, notes: string) => void;
}

export function FalsePositiveDialog({ nodeName, onClose, onSubmit }: FalsePositiveDialogProps) {
  const [reason, setReason] = useState('Known benign activity');
  const [notes, setNotes] = useState('');

  const reasons = [
    "Known benign activity",
    "Legitimate admin action",
    "Test/simulation activity",
    "Duplicate detection",
    "Incorrect entity mapping",
    "Other"
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#12121a] p-6 rounded-2xl border border-slate-200 dark:border-white/10 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200 mx-4">
        <div className="flex items-center gap-3 text-amber-500 mb-2">
          <ShieldOff className="w-5 h-5" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Mark as False Positive</h3>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          This will mark the alert for <span className="font-medium text-slate-900 dark:text-white">{nodeName}</span> as a false positive. Your feedback helps improve the detection model.
        </p>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Reason</label>
            <select 
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full h-9 px-3 rounded-lg bg-slate-100 dark:bg-white/5 border-none text-sm text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {reasons.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Additional Notes (optional)</label>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Provide details about why this is a false positive..."
              rows={3}
              className="w-full p-3 rounded-lg bg-slate-100 dark:bg-white/5 border-none text-sm text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors">
            Cancel
          </button>
          <button onClick={() => onSubmit(reason, notes)} className="px-4 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors">
            Submit as False Positive
          </button>
        </div>
      </div>
    </div>
  );
}
