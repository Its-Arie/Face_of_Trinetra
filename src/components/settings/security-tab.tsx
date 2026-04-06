import { useState } from 'react';
import { Eye, EyeOff, Monitor, Smartphone, Copy, QrCode } from 'lucide-react';
import { toast } from 'sonner';
import { mockActiveSessions, mockLoginActivity, mockApiKeys } from '../../lib/mock-data/settings-data';

export function SecurityTab() {
  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false });
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [mfaDialogOpen, setMfaDialogOpen] = useState(false);
  const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);

  const handlePasswordUpdate = () => {
    toast.success('Password updated successfully');
  };

  const handleEnableMfa = () => {
    setMfaEnabled(true);
    setMfaDialogOpen(false);
    toast.success('2FA enabled successfully');
  };

  const handleRevokeSession = () => {
    toast.success('Session revoked');
  };

  const handleRevokeAll = () => {
    toast.success('All other sessions revoked');
  };

  const handleGenerateKey = () => {
    setGeneratedKey('trinetra_sk_f8a9b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Change Password */}
      <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Change Password</h2>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Current Password</label>
            <div className="relative">
              <input type={showPassword.current ? 'text' : 'password'} className="w-full h-10 px-3 pr-10 rounded-lg bg-slate-100 dark:bg-white/5 border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm text-slate-900 dark:text-white" />
              <button type="button" onClick={() => setShowPassword({...showPassword, current: !showPassword.current})} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                {showPassword.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">New Password</label>
            <div className="relative mb-2">
              <input type={showPassword.new ? 'text' : 'password'} className="w-full h-10 px-3 pr-10 rounded-lg bg-slate-100 dark:bg-white/5 border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm text-slate-900 dark:text-white" />
              <button type="button" onClick={() => setShowPassword({...showPassword, new: !showPassword.new})} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                {showPassword.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex gap-1 h-1.5">
              <div className="flex-1 rounded-full bg-red-500"></div>
              <div className="flex-1 rounded-full bg-orange-500"></div>
              <div className="flex-1 rounded-full bg-slate-200 dark:bg-white/10"></div>
              <div className="flex-1 rounded-full bg-slate-200 dark:bg-white/10"></div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Confirm New Password</label>
            <div className="relative">
              <input type={showPassword.confirm ? 'text' : 'password'} className="w-full h-10 px-3 pr-10 rounded-lg bg-slate-100 dark:bg-white/5 border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm text-slate-900 dark:text-white" />
              <button type="button" onClick={() => setShowPassword({...showPassword, confirm: !showPassword.confirm})} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                {showPassword.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button onClick={handlePasswordUpdate} className="mt-2 h-10 px-6 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white rounded-lg font-medium transition-all text-sm">
            Update Password
          </button>
        </div>
      </div>

      {/* MFA */}
      <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Two-Factor Authentication</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Add an extra layer of security to your account</p>
            {mfaEnabled ? (
              <span className="px-2.5 py-1 rounded-full bg-green-500/15 text-green-600 dark:text-green-500 text-xs font-bold uppercase">Enabled</span>
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase">Not Enabled</span>
            )}
          </div>
          {mfaEnabled ? (
            <button onClick={() => { setMfaEnabled(false); toast.success('2FA disabled'); }} className="h-10 px-4 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
              Disable 2FA
            </button>
          ) : (
            <button onClick={() => setMfaDialogOpen(true)} className="h-10 px-6 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white rounded-lg font-medium transition-all text-sm">
              Enable 2FA
            </button>
          )}
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Active Sessions</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Devices currently logged into your account</p>
        
        <div className="space-y-4 mb-6">
          {mockActiveSessions.map(session => (
            <div key={session.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-lg bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                  {session.device.includes('iPhone') ? <Smartphone className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">{session.device}</span>
                    {session.isCurrent && <span className="px-1.5 py-0.5 rounded bg-green-500/15 text-green-600 dark:text-green-500 text-[10px] font-bold uppercase">This device</span>}
                  </div>
                  <div className="text-xs text-slate-500">{session.location} • {session.ip} • Last active: {session.lastActive}</div>
                </div>
              </div>
              {!session.isCurrent && (
                <button onClick={handleRevokeSession} className="text-xs font-medium text-red-500 hover:text-red-600 transition-colors">
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
        <button onClick={handleRevokeAll} className="w-full h-10 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors border border-red-200 dark:border-red-500/20">
          Revoke All Other Sessions
        </button>
      </div>

      {/* Recent Login Activity */}
      <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6 overflow-hidden">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Recent Login Activity</h2>
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm text-left min-w-[600px]">
            <thead className="text-xs text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-white/10">
              <tr>
                <th className="pb-3 font-medium">Date/Time</th>
                <th className="pb-3 font-medium">Device</th>
                <th className="pb-3 font-medium">Location</th>
                <th className="pb-3 font-medium">IP Address</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {mockLoginActivity.map(log => (
                <tr key={log.id} className={log.status === 'failed' ? 'bg-red-50/50 dark:bg-red-500/5' : ''}>
                  <td className="py-3 text-slate-600 dark:text-slate-300">{log.timestamp}</td>
                  <td className="py-3 text-slate-900 dark:text-white font-medium">{log.device}</td>
                  <td className="py-3 text-slate-600 dark:text-slate-300">{log.location}</td>
                  <td className="py-3 text-slate-500 font-mono">{log.ip}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      log.status === 'success' ? 'bg-green-500/15 text-green-600 dark:text-green-500' : 'bg-red-500/15 text-red-600 dark:text-red-500'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Personal API Keys */}
      <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Personal API Keys</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Use these keys to access TRINETRA data via API</p>
        
        <div className="space-y-3 mb-6">
          {mockApiKeys.map(key => (
            <div key={key.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02]">
              <div>
                <div className="font-medium text-sm text-slate-900 dark:text-white mb-1">{key.name}</div>
                <div className="text-xs text-slate-500 font-mono mb-1.5">{key.partialKey}</div>
                <div className="text-[10px] text-slate-400">Created: {key.createdAt} • Last used: {key.lastUsed}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => copyToClipboard(key.partialKey)} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-md hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
                <button className="text-xs font-medium text-red-500 hover:text-red-600 px-3 py-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                  Revoke
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <button onClick={() => setApiKeyDialogOpen(true)} className="h-9 px-4 text-sm font-medium rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
          Generate New API Key
        </button>
      </div>

      {/* MFA Dialog */}
      {mfaDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-[#12121a] p-6 rounded-2xl border border-slate-200 dark:border-white/10 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Setup 2FA</h3>
            
            <div className="mb-6">
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">1. Scan this QR code with your authenticator app</p>
              <div className="w-40 h-40 mx-auto bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 flex items-center justify-center mb-4">
                <QrCode className="w-16 h-16 text-slate-400" />
              </div>
              <p className="text-xs text-center text-slate-500 font-mono">Or enter code manually: JBSWY3DPEHPK3PXP</p>
            </div>

            <div className="mb-6">
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">2. Enter the 6-digit code from your app</p>
              <input type="text" placeholder="000000" className="w-full h-10 px-3 text-center tracking-[0.5em] font-mono text-lg rounded-lg bg-slate-100 dark:bg-white/5 border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white" />
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={() => setMfaDialogOpen(false)} className="h-9 px-4 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors">
                Cancel
              </button>
              <button onClick={handleEnableMfa} className="h-9 px-4 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
                Verify & Enable
              </button>
            </div>
          </div>
        </div>
      )}

      {/* API Key Dialog */}
      {apiKeyDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-[#12121a] p-6 rounded-2xl border border-slate-200 dark:border-white/10 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Generate API Key</h3>
            
            {!generatedKey ? (
              <>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Key Name</label>
                  <input type="text" value={newKeyName} onChange={(e) => setNewKeyName(e.target.value)} placeholder="e.g. CI/CD Integration" className="w-full h-10 px-3 rounded-lg bg-slate-100 dark:bg-white/5 border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm text-slate-900 dark:text-white" />
                </div>
                <div className="flex justify-end gap-3">
                  <button onClick={() => setApiKeyDialogOpen(false)} className="h-9 px-4 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleGenerateKey} disabled={!newKeyName} className="h-9 px-4 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg transition-colors">
                    Generate
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-sm text-amber-600 dark:text-amber-500 mb-3 font-medium">Store this key safely. You will not see it again.</p>
                  <div className="flex items-center gap-2 p-3 bg-slate-100 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/10">
                    <code className="text-xs text-slate-900 dark:text-white break-all">{generatedKey}</code>
                    <button onClick={() => copyToClipboard(generatedKey)} className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-md hover:bg-slate-200 dark:hover:bg-white/10 transition-colors shrink-0">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button onClick={() => { setApiKeyDialogOpen(false); setGeneratedKey(null); setNewKeyName(''); }} className="h-9 px-4 text-sm font-medium bg-slate-800 hover:bg-slate-900 text-white rounded-lg transition-colors">
                    Done
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
