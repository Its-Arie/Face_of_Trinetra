import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../contexts/auth-context';

interface CloudConnectionCardProps {
  provider: 'aws' | 'azure' | 'gcp';
  name: string;
  colorClass: string;
  iconColor: string;
  bgClass: string;
  connection: any; // from auth context
  mockData: any; // from mock data if not connected in context but we want to show mock structure
  onConnect: () => void;
}

export function CloudConnectionCard({ provider, name, colorClass, iconColor, bgClass, connection, mockData, onConnect }: CloudConnectionCardProps) {
  const { disconnectProvider } = useAuth();
  const [testingConnection, setTestingConnection] = useState(false);
  const [showConfirmRemove, setShowConfirmRemove] = useState(false);

  const isConnected = !!connection;

  const handleTestConnection = () => {
    setTestingConnection(true);
    setTimeout(() => {
      setTestingConnection(false);
      // Randomly show warning or success for demo
      if (Math.random() > 0.8) {
        toast.warning('Connection slow but active');
      } else {
        toast.success('Connection verified');
      }
    }, 1500);
  };

  const handleRemove = () => {
    setShowConfirmRemove(true);
  };

  const confirmRemove = () => {
    disconnectProvider(provider);
    setShowConfirmRemove(false);
    toast.success(`${name} account disconnected`);
  };

  return (
    <div className={`bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm border-t-[3px] ${colorClass}`}>
      <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${bgClass}`}>
            <svg className={`w-6 h-6 ${iconColor}`} viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 19c2.5 0 4.5-2 4.5-4.5S20 10 17.5 10c-.3 0-.7 0-1 .1C15.8 7.2 13.1 5 10 5 6.1 5 3 8.1 3 12c0 .3 0 .7.1 1C1.3 13.8 0 15.3 0 17.5 0 20 2 22 4.5 22h13c2.5 0 4.5-2 4.5-4.5z"/></svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{name}</h3>
        </div>
        
        <div className="flex items-center gap-2">
          {isConnected ? (
            <>
              <span className="px-2.5 py-1 rounded-full bg-green-500/15 text-green-600 dark:text-green-500 text-xs font-bold uppercase tracking-wider">Connected</span>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            </>
          ) : (
            <>
              <span className="px-2.5 py-1 rounded-full bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Not Connected</span>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
            </>
          )}
        </div>
      </div>

      {isConnected && (
        <div className="p-5 bg-slate-50/50 dark:bg-white/[0.02]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mb-6">
            <div className="flex justify-between items-center py-1.5 border-b border-slate-200 dark:border-white/5">
              <span className="text-sm text-slate-500 dark:text-slate-400">Account ID</span>
              <span className="text-sm font-medium text-slate-900 dark:text-white">{connection.accountId}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-slate-200 dark:border-white/5">
              <span className="text-sm text-slate-500 dark:text-slate-400">Connected Since</span>
              <span className="text-sm font-medium text-slate-900 dark:text-white">{new Date(connection.connectedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-slate-200 dark:border-white/5">
              <span className="text-sm text-slate-500 dark:text-slate-400">Last Sync</span>
              <span className="text-sm font-medium text-slate-900 dark:text-white">Just now</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-slate-200 dark:border-white/5">
              <span className="text-sm text-slate-500 dark:text-slate-400">Permissions</span>
              <span className="text-sm font-medium text-slate-900 dark:text-white truncate max-w-[150px]" title={mockData.permissions}>{mockData.permissions}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-slate-200 dark:border-white/5 md:col-span-2">
              <span className="text-sm text-slate-500 dark:text-slate-400">Monitored Regions</span>
              <span className="text-sm font-medium text-slate-900 dark:text-white">{connection.region}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={handleTestConnection}
              disabled={testingConnection}
              className="h-9 px-4 text-sm font-medium rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors flex items-center disabled:opacity-50"
            >
              {testingConnection ? <><Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" /> Testing...</> : 'Test Connection'}
            </button>
            <button className="h-9 px-4 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
              Reconnect
            </button>
            <div className="flex-1" />
            <button onClick={handleRemove} className="h-9 px-4 text-sm font-medium rounded-lg text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
              Remove
            </button>
          </div>
        </div>
      )}

      {!isConnected && (
        <div className="p-5 flex justify-center">
          <button 
            onClick={onConnect}
            className="h-10 px-6 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white rounded-lg font-medium transition-all shadow-md shadow-indigo-500/20 text-sm"
          >
            Connect {name.split(' ')[0]}
          </button>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmRemove && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-[#12121a] p-6 rounded-2xl border border-slate-200 dark:border-white/10 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Remove {name} Connection?</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              This will stop monitoring your {name} environment. Existing alerts will remain in the system.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowConfirmRemove(false)} className="h-9 px-4 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors">
                Cancel
              </button>
              <button onClick={confirmRemove} className="h-9 px-4 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-sm">
                Remove Connection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
