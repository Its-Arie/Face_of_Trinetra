import { useState } from 'react';
import { Loader2, X, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../contexts/auth-context';

interface CloudConnectModalProps {
  provider: 'aws' | 'azure' | 'gcp';
  onClose: () => void;
}

export function CloudConnectModal({ provider, onClose }: CloudConnectModalProps) {
  const { connectProvider } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [inputs, setInputs] = useState({
    accountId: '',
    accessKey: '',
    secretKey: '',
    region: ''
  });

  const getProviderName = () => {
    switch(provider) {
      case 'aws': return 'AWS Account';
      case 'azure': return 'Azure Tenant';
      case 'gcp': return 'GCP Project';
    }
  };

  const handleConnect = () => {
    if (!inputs.accountId) {
      toast.error('Account ID is required');
      return;
    }

    setLoading(true);
    setTimeout(async () => {
      const result = await connectProvider(provider, inputs.accountId);
      setLoading(false);
      if (result.success) {
        toast.success(`${getProviderName()} connected successfully`);
        onClose();
      } else {
        toast.error(result.message || 'Failed to connect');
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white dark:bg-[#12121a] rounded-2xl border border-slate-200 dark:border-white/10 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        <div className="p-5 border-b border-slate-200 dark:border-white/10 flex justify-between items-center shrink-0">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Connect {getProviderName()}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5">
          {/* Dynamic fields based on provider */}
          {provider === 'aws' && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">AWS Account ID</label>
                <input
                  type="text"
                  value={inputs.accountId}
                  onChange={(e) => setInputs({...inputs, accountId: e.target.value})}
                  className="w-full h-10 px-3 rounded-lg bg-slate-100 dark:bg-white/5 border border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-sm text-slate-900 dark:text-white"
                  placeholder="123456789012"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">AWS Access Key ID</label>
                <input
                  type="text"
                  className="w-full h-10 px-3 rounded-lg bg-slate-100 dark:bg-white/5 border border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-sm text-slate-900 dark:text-white"
                  placeholder="AKIAIOSFODNN7EXAMPLE"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">AWS Secret Access Key</label>
                <div className="relative">
                  <input
                    type={showSecret ? 'text' : 'password'}
                    className="w-full h-10 pl-3 pr-10 rounded-lg bg-slate-100 dark:bg-white/5 border border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-sm text-slate-900 dark:text-white"
                    placeholder="Your secret key"
                  />
                  <button type="button" onClick={() => setShowSecret(!showSecret)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                    {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Preferred Region(s)</label>
                <input
                  type="text"
                  className="w-full h-10 px-3 rounded-lg bg-slate-100 dark:bg-white/5 border border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-sm text-slate-900 dark:text-white"
                  placeholder="us-east-1, us-west-2"
                />
              </div>
            </>
          )}

          {provider === 'azure' && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Tenant ID</label>
                <input
                  type="text"
                  value={inputs.accountId}
                  onChange={(e) => setInputs({...inputs, accountId: e.target.value})}
                  className="w-full h-10 px-3 rounded-lg bg-slate-100 dark:bg-white/5 border border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-sm text-slate-900 dark:text-white"
                  placeholder="a1b2c3d4-e5f6-7890-abcd-ef1234567890"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Subscription ID</label>
                <input type="text" className="w-full h-10 px-3 rounded-lg bg-slate-100 dark:bg-white/5 border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Client ID</label>
                <input type="text" className="w-full h-10 px-3 rounded-lg bg-slate-100 dark:bg-white/5 border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Client Secret</label>
                <input type="password" placeholder="••••••••" className="w-full h-10 px-3 rounded-lg bg-slate-100 dark:bg-white/5 border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm text-slate-900 dark:text-white" />
              </div>
            </>
          )}

          {provider === 'gcp' && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Project ID</label>
                <input
                  type="text"
                  value={inputs.accountId}
                  onChange={(e) => setInputs({...inputs, accountId: e.target.value})}
                  className="w-full h-10 px-3 rounded-lg bg-slate-100 dark:bg-white/5 border border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-sm text-slate-900 dark:text-white"
                  placeholder="my-project-123456"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Service Account Email</label>
                <input type="email" placeholder="sa@project.iam.gserviceaccount.com" className="w-full h-10 px-3 rounded-lg bg-slate-100 dark:bg-white/5 border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Service Account Key (JSON)</label>
                <textarea 
                  rows={4} 
                  placeholder="Paste your service account JSON key here" 
                  className="w-full p-3 rounded-lg bg-slate-100 dark:bg-white/5 border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm text-slate-900 dark:text-white font-mono resize-none"
                />
              </div>
            </>
          )}

          <div className="bg-slate-50 dark:bg-white/5 rounded-lg p-3 border border-slate-200 dark:border-white/10">
            <p className="text-xs text-slate-500 leading-relaxed">
              TRINETRA requires read-only CloudTrail and IAM permissions. We recommend creating a dedicated IAM user/service account with minimal permissions.
            </p>
          </div>
        </div>

        <div className="p-5 border-t border-slate-200 dark:border-white/10 flex justify-end gap-3 shrink-0">
          <button onClick={onClose} disabled={loading} className="h-10 px-4 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors">
            Cancel
          </button>
          <button 
            onClick={handleConnect} 
            disabled={loading || !inputs.accountId}
            className="h-10 px-6 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center shadow-md shadow-indigo-500/20 text-sm"
          >
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Connecting...</> : 'Connect'}
          </button>
        </div>

      </div>
    </div>
  );
}
