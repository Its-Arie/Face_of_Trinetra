import { useState, useEffect } from 'react';
import { Link2, Mail, ChevronDown, Loader2, Search, CircleCheck, AlertTriangle, Unlink, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';
import { toast } from 'sonner';
import { AuthBackground } from '../components/auth/auth-background';
import { StepIndicator } from '../components/auth/step-indicator';

export function ConnectCloud() {
  const { user, connectProvider, disconnectProvider, completeFirstLogin, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  const [expanded, setExpanded] = useState<'aws' | 'azure' | 'gcp' | null>('aws');
  const [inputs, setInputs] = useState({ aws: '', azure: '', gcp: '' });
  const [loading, setLoading] = useState({ aws: false, azure: false, gcp: false });
  const [errors, setErrors] = useState<{ [key: string]: { type: string, message: string } | null }>({ aws: null, azure: null, gcp: null });
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const connectedCount = Object.values(user.connectedProviders).filter(Boolean).length;

  const handleVerify = async (provider: 'aws' | 'azure' | 'gcp') => {
    const accountId = inputs[provider];
    if (!accountId) return;

    setLoading(prev => ({ ...prev, [provider]: true }));
    setErrors(prev => ({ ...prev, [provider]: null }));

    const result = await connectProvider(provider, accountId);
    if (result.success) {
      toast.success(`${provider.toUpperCase()} connected successfully! Welcome, ${result.data?.username}`);
      setInputs(prev => ({ ...prev, [provider]: '' }));
    } else {
      setErrors(prev => ({ ...prev, [provider]: { type: result.error!, message: result.message! } }));
    }
    setLoading(prev => ({ ...prev, [provider]: false }));
  };

  const handleDisconnect = (provider: 'aws' | 'azure' | 'gcp') => {
    if (confirm(`Are you sure you want to disconnect ${provider.toUpperCase()}? You will stop receiving threat alerts from this provider.`)) {
      disconnectProvider(provider);
      toast.success(`${provider.toUpperCase()} disconnected`);
    }
  };

  const handleContinue = () => {
    completeFirstLogin();
    toast.success(`Setup complete! Welcome to Trinetra, ${user.name}.`);
    navigate('/home');
  };

  const handleSkip = () => {
    setShowSkipConfirm(true);
  };

  const providers = [
    { id: 'aws' as const, name: 'AWS', color: 'text-[#FF9900]', placeholder: 'e.g. 123456789012', label: 'AWS Account ID', help: 'Enter your 12-digit AWS Account ID (found in AWS Console → Account Settings)' },
    { id: 'azure' as const, name: 'Azure', color: 'text-[#0078D4]', placeholder: 'e.g. a1b2c3d4-e5f6-7890-abcd-ef1234567890', label: 'Azure Tenant ID', help: 'Enter your Azure Directory (Tenant) ID (found in Azure Portal → Azure Active Directory → Properties)' },
    { id: 'gcp' as const, name: 'GCP', color: 'text-[#EA4335]', placeholder: 'e.g. my-project-123456', label: 'GCP Project ID', help: 'Enter your GCP Project ID (found in GCP Console → Project Settings)' }
  ];

  return (
    <AuthBackground>
      <button onClick={() => { logout(); navigate('/login'); }} className="absolute top-6 left-6 flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors z-50">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
      </button>
      <div className="w-full max-w-[580px] p-8 bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-500 my-8">
        
        {user.isFirstLogin && (
          <StepIndicator steps={[
            { label: 'Create Account', completed: true, current: false },
            { label: 'Verify Email', completed: true, current: false },
            { label: 'Connect Cloud', completed: false, current: true }
          ]} />
        )}

        <div className="flex flex-col items-center mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
            <Link2 className="w-6 h-6 text-indigo-500" /> Connect Your Cloud Providers
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
            Link your cloud accounts to start monitoring your infrastructure. We'll verify that each account is associated with your registered email.
          </p>
        </div>

        <div className="rounded-lg border-l-4 border-blue-500 bg-blue-500/10 p-4 flex gap-3 mb-6">
          <Mail className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <div className="text-sm text-slate-900 dark:text-white">Logged in as: <span className="font-medium">{user.email}</span></div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Your cloud accounts must be linked to this email address for verification to succeed.</div>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {providers.map((p) => {
            const isExpanded = expanded === p.id;
            const connection = user.connectedProviders[p.id];
            const isVerifying = loading[p.id];
            const error = errors[p.id];

            return (
              <div key={p.id} className="border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden bg-white/50 dark:bg-slate-950/50">
                <button 
                  onClick={() => setExpanded(isExpanded ? null : p.id)}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <svg className={`w-5 h-5 ${p.color}`} viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 19c2.5 0 4.5-2 4.5-4.5S20 10 17.5 10c-.3 0-.7 0-1 .1C15.8 7.2 13.1 5 10 5 6.1 5 3 8.1 3 12c0 .3 0 .7.1 1C1.3 13.8 0 15.3 0 17.5 0 20 2 22 4.5 22h13c2.5 0 4.5-2 4.5-4.5z"/></svg>
                    <span className="font-medium text-slate-900 dark:text-white">{p.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {connection ? (
                      <span className="flex items-center gap-1.5 text-xs text-green-500"><div className="w-2 h-2 rounded-full bg-green-500" /> Connected</span>
                    ) : isVerifying ? (
                      <span className="flex items-center gap-1.5 text-xs text-amber-500"><Loader2 className="w-3 h-3 animate-spin" /> Verifying...</span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs text-slate-500"><div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" /> Not Connected</span>
                    )}
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-900/50">
                    {connection ? (
                      <div>
                        <div className="rounded-lg bg-green-500/10 border border-green-500/30 p-3 flex items-center gap-2 mb-4">
                          <CircleCheck className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium text-green-500">Successfully Verified & Connected</span>
                        </div>
                        <div className="rounded-lg border border-slate-200 dark:border-white/10 overflow-hidden text-sm">
                          {[
                            { label: 'Account Name', val: connection.accountName },
                            { label: 'Account ID', val: connection.accountId },
                            { label: 'Username', val: connection.username },
                            { label: 'Email Match', val: <span className="flex items-center gap-1 text-green-500"><CircleCheck className="w-3 h-3"/> {user.email}</span> },
                            { label: 'Region', val: connection.region },
                            { label: 'Resources', val: `${connection.resources.vms} VMs · ${connection.resources.containers} Containers · ${connection.resources.roles} Roles` },
                          ].map((row, i) => (
                            <div key={i} className={`flex justify-between p-3 ${i % 2 === 0 ? 'bg-white dark:bg-[#12121a]' : 'bg-slate-50 dark:bg-white/5'}`}>
                              <span className="text-xs text-slate-500 dark:text-slate-400">{row.label}</span>
                              <span className="font-medium text-slate-900 dark:text-white text-right">{row.val}</span>
                            </div>
                          ))}
                        </div>
                        <button onClick={() => handleDisconnect(p.id)} className="mt-4 px-4 py-2 text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-colors flex items-center gap-2">
                          <Unlink className="w-4 h-4" /> Disconnect
                        </button>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{p.label}</label>
                        <input
                          type="text"
                          value={inputs[p.id]}
                          onChange={(e) => setInputs({...inputs, [p.id]: e.target.value})}
                          placeholder={p.placeholder}
                          disabled={isVerifying}
                          className={`w-full px-4 h-11 rounded-lg bg-white dark:bg-[#12121a] border ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-white/10 focus:border-indigo-500 focus:ring-indigo-500'} outline-none transition-all text-sm text-slate-900 dark:text-slate-100 mb-2`}
                        />
                        <p className="text-xs text-slate-500 dark:text-slate-400">{p.help}</p>

                        {error && (
                          error.type === 'email_mismatch' ? (
                            <div className="rounded-lg border-l-4 border-amber-500 bg-amber-500/10 p-3 mt-3">
                              <div className="flex items-center gap-2 text-amber-500 mb-1">
                                <AlertTriangle className="w-4 h-4" />
                                <span className="text-sm font-medium">Email Mismatch</span>
                              </div>
                              <p className="text-xs text-slate-600 dark:text-slate-300">{error.message}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 italic mt-2">💡 Tip: Check your {p.name} Console → Account Settings to find the correct Account ID.</p>
                            </div>
                          ) : (
                            <p className="text-xs text-red-500 mt-2">{error.message}</p>
                          )
                        )}

                        <button
                          onClick={() => handleVerify(p.id)}
                          disabled={isVerifying || !inputs[p.id]}
                          className="w-full mt-4 h-10 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center"
                        >
                          {isVerifying ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Verifying...</> : <><Search className="w-4 h-4 mr-2" /> Verify & Connect</>}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center text-sm mb-6">
          {connectedCount === 0 && <span className="text-red-500">Connected: 0/3 (minimum 1 required)</span>}
          {connectedCount > 0 && connectedCount < 3 && <span className="text-green-500">Connected: {connectedCount}/3 ✅</span>}
          {connectedCount === 3 && <span className="text-green-500 font-medium">Connected: 3/3 — All providers connected! 🎉</span>}
        </div>

        {user.isFirstLogin && (
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            {connectedCount === 0 ? (
              <button onClick={handleSkip} className="h-10 px-4 text-slate-500 hover:text-slate-900 dark:hover:text-white font-medium rounded-lg transition-colors">
                Skip for Now
              </button>
            ) : <div />}
            <button
              onClick={handleContinue}
              disabled={connectedCount === 0}
              className="h-10 px-6 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center"
            >
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        )}

      </div>

      {showSkipConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#12121a] p-6 rounded-2xl border border-slate-200 dark:border-white/10 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200 mx-4">
            <div className="flex items-center gap-3 text-amber-500 mb-4">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Skip Cloud Connection?</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              You haven't connected any cloud provider yet. Threat detection won't work until at least one provider is connected. You can connect later from Settings.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowSkipConfirm(false)} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors">
                Go Back
              </button>
              <button onClick={() => {
                setShowSkipConfirm(false);
                completeFirstLogin();
                toast.warning('No cloud providers connected. Connect from Settings to start monitoring.');
                navigate('/home');
              }} className="px-4 py-2 text-sm font-medium text-amber-600 bg-amber-500/10 hover:bg-amber-500/20 rounded-lg transition-colors">
                Skip Anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthBackground>
  );
}
