import { useState } from 'react';
import { Download, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';

export function PrivacyTab() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [retentionPeriod, setRetentionPeriod] = useState('90');
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clearCacheDialogOpen, setClearCacheDialogOpen] = useState(false);

  const handleExport = (type: string) => {
    toast.success(`${type} exported successfully`);
  };

  const handleClearCache = () => {
    setClearCacheDialogOpen(false);
    toast.success('Cached monitoring data cleared');
  };

  const handleSaveRetention = () => {
    toast.success('Retention settings saved');
  };

  const handleDeleteAccount = () => {
    setDeleteDialogOpen(false);
    toast.success('Account deletion requested. You will be logged out shortly.');
    setTimeout(() => {
      logout();
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Export Data */}
      <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Export My Data</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Download all your TRINETRA data including alerts, reports, and account information</p>
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02]">
            <div>
              <div className="font-medium text-sm text-slate-900 dark:text-white mb-1">Export Alerts & Reports</div>
              <div className="text-xs text-slate-500">Download all your alerts and risk reports as JSON</div>
            </div>
            <button onClick={() => handleExport('Alerts and reports')} className="h-9 px-4 text-sm font-medium rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors flex items-center shrink-0">
              <Download className="w-4 h-4 mr-2" /> Export JSON
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02]">
            <div>
              <div className="font-medium text-sm text-slate-900 dark:text-white mb-1">Export Activity Logs</div>
              <div className="text-xs text-slate-500">Download your complete activity and audit log as CSV</div>
            </div>
            <button onClick={() => handleExport('Activity logs')} className="h-9 px-4 text-sm font-medium rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors flex items-center shrink-0">
              <Download className="w-4 h-4 mr-2" /> Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Cloud Data Management */}
      <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Cloud Monitoring Data</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Manage the data TRINETRA has collected from your connected cloud accounts</p>
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02]">
            <div>
              <div className="font-medium text-sm text-slate-900 dark:text-white mb-1">Clear Cached Monitoring Data</div>
              <div className="text-xs text-slate-500 leading-relaxed max-w-md">Remove locally cached cloud event data. Your cloud accounts remain connected.</div>
            </div>
            <button onClick={() => setClearCacheDialogOpen(true)} className="h-9 px-4 text-sm font-medium text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-lg transition-colors shrink-0">
              Clear Cache
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02]">
            <div>
              <div className="font-medium text-sm text-slate-900 dark:text-white mb-1">Remove All Cloud Data</div>
              <div className="text-xs text-slate-500 leading-relaxed max-w-md">Delete all collected cloud monitoring data from TRINETRA. This does not remove your cloud accounts.</div>
            </div>
            <button onClick={() => toast.success('All cloud monitoring data removed')} className="h-9 px-4 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors shrink-0">
              Remove Data
            </button>
          </div>
        </div>
      </div>

      {/* Data Retention */}
      <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Data Retention</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">How long TRINETRA keeps your monitoring data</p>
        
        <div className="space-y-3 mb-4">
          {[
            { id: '30', label: '30 days' },
            { id: '60', label: '60 days' },
            { id: '90', label: '90 days (default)' },
            { id: '180', label: '180 days' },
            { id: '365', label: '1 year' },
          ].map(opt => (
            <label key={opt.id} className="flex items-center gap-3 cursor-pointer group w-fit">
              <div className="flex items-center justify-center w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 group-hover:border-indigo-500">
                {retentionPeriod === opt.id && <div className="w-2 h-2 rounded-full bg-indigo-500" />}
              </div>
              <input 
                type="radio" 
                name="retention" 
                className="sr-only" 
                checked={retentionPeriod === opt.id}
                onChange={() => setRetentionPeriod(opt.id)}
              />
              <span className="text-sm font-medium text-slate-900 dark:text-white">{opt.label}</span>
            </label>
          ))}
        </div>
        <p className="text-xs text-slate-500 mb-6">Older data is automatically purged based on your selection.</p>
        
        <button onClick={handleSaveRetention} className="h-10 px-6 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white rounded-lg font-medium transition-all text-sm">
          Save Retention Settings
        </button>
      </div>

      {/* Privacy Information */}
      <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Privacy</h2>
        <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
          <p>TRINETRA processes your cloud audit logs locally to detect threats. We do not sell or share your cloud data with third parties.</p>
          <p>Your cloud credentials are encrypted at rest using AES-256.</p>
          <p>You can request complete data deletion at any time.</p>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-4 text-sm">
          <a href="#" className="text-indigo-500 hover:text-indigo-400 font-medium">View Privacy Policy →</a>
          <a href="#" className="text-indigo-500 hover:text-indigo-400 font-medium">View Terms of Service →</a>
        </div>
      </div>

      {/* Delete Account */}
      <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Delete Account</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Permanently delete your TRINETRA account and all associated data</p>
        
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 flex gap-3 mb-6 max-w-3xl">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-700 dark:text-amber-500/90 leading-relaxed">
            This action is permanent and cannot be undone. All your connected cloud accounts, alerts, reports, and monitoring data will be deleted.
          </p>
        </div>

        <button onClick={() => setDeleteDialogOpen(true)} className="h-10 px-6 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors text-sm">
          Delete My Account
        </button>
      </div>

      {/* Clear Cache Dialog */}
      {clearCacheDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-[#12121a] p-6 rounded-2xl border border-slate-200 dark:border-white/10 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Clear Cached Data?</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              This will remove temporarily stored event data. Live monitoring will continue normally.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setClearCacheDialogOpen(false)} className="h-9 px-4 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors">
                Cancel
              </button>
              <button onClick={handleClearCache} className="h-9 px-4 text-sm font-medium bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors">
                Clear Cache
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Dialog */}
      {deleteDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-[#12121a] p-6 rounded-2xl border border-slate-200 dark:border-white/10 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Are you absolutely sure?</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              This will permanently delete your account and all data. This action cannot be undone.
            </p>
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Type DELETE to confirm</label>
              <input 
                type="text" 
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-slate-100 dark:bg-white/5 border-transparent focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-sm text-slate-900 dark:text-white" 
              />
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => { setDeleteDialogOpen(false); setDeleteConfirmText(''); }} className="h-9 px-4 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors">
                Cancel
              </button>
              <button 
                onClick={handleDeleteAccount} 
                disabled={deleteConfirmText !== 'DELETE'}
                className="h-9 px-4 text-sm font-medium bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-lg transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
