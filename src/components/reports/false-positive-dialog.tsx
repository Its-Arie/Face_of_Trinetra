import { useState } from 'react';
import { ShieldOff, Loader2, X } from 'lucide-react';
import { toast } from 'sonner';

interface FalsePositiveDialogProps {
  isOpen: boolean;
  nodeName: string;
  onClose: () => void;
}

export function FalsePositiveDialog({ isOpen, nodeName, onClose }: FalsePositiveDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reason, setReason] = useState('Known benign activity');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Marked as false positive. Feedback submitted.');
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#12121a] rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-slate-200 dark:border-white/10 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldOff className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Mark as False Positive</h2>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              This will mark the alert for <span className="font-medium text-slate-700 dark:text-slate-300">{nodeName}</span> as a false positive. Your feedback helps improve the detection model.
            </p>
          </div>
          <button onClick={onClose} className="p-1 rounded-md text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Reason</label>
            <select 
              value={reason} 
              onChange={e => setReason(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-slate-50 dark:bg-[#1a1a24] border border-slate-200 dark:border-white/10 text-sm outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 dark:text-white"
            >
              <option>Known benign activity</option>
              <option>Legitimate admin action</option>
              <option>Test/simulation activity</option>
              <option>Duplicate detection</option>
              <option>Incorrect entity mapping</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Additional Notes (optional)</label>
            <textarea 
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={3}
              placeholder="Provide details about why this is a false positive..."
              className="w-full p-3 rounded-lg bg-slate-50 dark:bg-[#1a1a24] border border-slate-200 dark:border-white/10 text-sm outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 dark:text-white resize-none"
            />
          </div>
        </div>

        <div className="p-5 border-t border-slate-200 dark:border-white/10 flex justify-end gap-3 bg-slate-50/50 dark:bg-[#1a1a24]/50">
          <button onClick={onClose} disabled={isSubmitting} className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors">
            Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors flex items-center shadow-md disabled:opacity-50"
          >
            {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</> : 'Submit as False Positive'}
          </button>
        </div>
      </div>
    </div>
  );
}
