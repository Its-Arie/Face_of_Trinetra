import { useState } from 'react';
import { Files, Loader2, X } from 'lucide-react';
import { toast } from 'sonner';

interface BatchReportDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BatchReportDialog({ isOpen, onClose }: BatchReportDialogProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [severity, setSeverity] = useState('critical');
  const [format, setFormat] = useState('pdf');

  if (!isOpen) return null;

  const handleSubmit = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast.success('Batch reports generated successfully');
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#12121a] rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-slate-200 dark:border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Files className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Generate Batch Reports</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-md text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Target Severity</label>
            <select 
              value={severity} 
              onChange={e => setSeverity(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-slate-50 dark:bg-[#1a1a24] border border-slate-200 dark:border-white/10 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="critical">Critical only</option>
              <option value="high">Critical + High</option>
              <option value="all">All flagged nodes</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Output Format</label>
            <div className="flex gap-3">
              <label className={`flex-1 flex items-center justify-center h-10 rounded-lg border cursor-pointer transition-colors ${format === 'pdf' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium' : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'}`}>
                <input type="radio" name="format" value="pdf" checked={format === 'pdf'} onChange={() => setFormat('pdf')} className="hidden" />
                PDF
              </label>
              <label className={`flex-1 flex items-center justify-center h-10 rounded-lg border cursor-pointer transition-colors ${format === 'json' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium' : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'}`}>
                <input type="radio" name="format" value="json" checked={format === 'json'} onChange={() => setFormat('json')} className="hidden" />
                JSON
              </label>
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-slate-200 dark:border-white/10 flex justify-end gap-3 bg-slate-50/50 dark:bg-[#1a1a24]/50">
          <button onClick={onClose} disabled={isGenerating} className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors">
            Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            disabled={isGenerating}
            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 rounded-lg transition-all flex items-center shadow-md disabled:opacity-50"
          >
            {isGenerating ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</> : 'Generate Reports'}
          </button>
        </div>
      </div>
    </div>
  );
}
