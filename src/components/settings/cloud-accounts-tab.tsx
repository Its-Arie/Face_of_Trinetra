import { useState } from 'react';
import { Info } from 'lucide-react';
import { useAuth } from '../../contexts/auth-context';
import { CloudConnectionCard } from './cloud-connection-card';
import { CloudConnectModal } from './cloud-connect-modal';
import { mockCloudConnections } from '../../lib/mock-data/settings-data';

export function CloudAccountsTab() {
  const { user } = useAuth();
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [connectingProvider, setConnectingProvider] = useState<'aws' | 'azure' | 'gcp' | null>(null);

  const handleConnectClick = (provider: 'aws' | 'azure' | 'gcp') => {
    setConnectingProvider(provider);
    setConnectModalOpen(true);
  };

  const providers = [
    {
      id: 'aws' as const,
      name: 'Amazon Web Services',
      color: 'border-[#FF9900]',
      iconColor: 'text-[#FF9900]',
      bg: 'bg-[#FF9900]/10',
      mockData: mockCloudConnections.aws
    },
    {
      id: 'azure' as const,
      name: 'Microsoft Azure',
      color: 'border-[#0078D4]',
      iconColor: 'text-[#0078D4]',
      bg: 'bg-[#0078D4]/10',
      mockData: mockCloudConnections.azure
    },
    {
      id: 'gcp' as const,
      name: 'Google Cloud Platform',
      color: 'border-[#EA4335]',
      iconColor: 'text-[#EA4335]',
      bg: 'bg-[#EA4335]/10',
      mockData: mockCloudConnections.gcp
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Connected Cloud Accounts</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Manage the environments TRINETRA monitors for threats.</p>
      </div>

      <div className="space-y-4">
        {providers.map((p) => {
          const connection = user?.connectedProviders[p.id];
          return (
            <CloudConnectionCard
              key={p.id}
              provider={p.id}
              name={p.name}
              colorClass={p.color}
              iconColor={p.iconColor}
              bgClass={p.bg}
              connection={connection}
              mockData={p.mockData}
              onConnect={() => handleConnectClick(p.id)}
            />
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 flex items-start gap-3">
        <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Your cloud credentials are encrypted and stored securely. TRINETRA uses read-only access and never modifies your cloud resources.
        </p>
      </div>

      {connectModalOpen && connectingProvider && (
        <CloudConnectModal
          provider={connectingProvider}
          onClose={() => {
            setConnectModalOpen(false);
            setConnectingProvider(null);
          }}
        />
      )}
    </div>
  );
}
