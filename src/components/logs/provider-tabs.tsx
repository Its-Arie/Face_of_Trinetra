import { useAuth } from '../../contexts/auth-context';
import { ingestionStats } from '../../lib/mock-data/ingestion-stats';

interface ProviderTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function ProviderTabs({ activeTab, onTabChange }: ProviderTabsProps) {
  const { user } = useAuth();
  
  const connectedProviders = Object.entries(user?.connectedProviders || {})
    .filter(([_, val]) => val !== null)
    .map(([key]) => key);

  // For demo, we show all providers if none connected, otherwise only connected
  const showProviders = connectedProviders.length > 0 ? connectedProviders : ['aws', 'azure', 'gcp'];

  const tabs = [
    { id: 'all', label: 'All', count: ingestionStats.totalEvents, bg: 'bg-slate-200 dark:bg-white/10', dot: null },
    ...(showProviders.includes('aws') ? [{ id: 'aws', label: 'AWS', count: ingestionStats.perProviderStats.aws.events, bg: 'bg-[#FF9900]/15 text-[#FF9900]', dot: ingestionStats.perProviderStats.aws.status }] : []),
    ...(showProviders.includes('azure') ? [{ id: 'azure', label: 'Azure', count: ingestionStats.perProviderStats.azure.events, bg: 'bg-[#0078D4]/15 text-[#0078D4]', dot: ingestionStats.perProviderStats.azure.status }] : []),
    ...(showProviders.includes('gcp') ? [{ id: 'gcp', label: 'GCP', count: ingestionStats.perProviderStats.gcp.events, bg: 'bg-[#EA4335]/15 text-[#EA4335]', dot: ingestionStats.perProviderStats.gcp.status }] : [])
  ];

  const getDotColor = (status: string | null) => {
    if (status === 'connected') return 'bg-green-500 animate-pulse';
    if (status === 'delayed') return 'bg-amber-500';
    if (status === 'disconnected') return 'bg-red-500';
    return '';
  };

  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-2 overflow-x-auto styled-scrollbar">
      <div className="flex items-center gap-2 min-w-max">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive 
                  ? 'bg-white dark:bg-[#1a1a24] text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200 dark:border-white/5 border-b-2 border-b-indigo-500' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white border border-transparent'
              }`}
            >
              {tab.dot && <div className={`w-2 h-2 rounded-full shrink-0 ${getDotColor(tab.dot)}`} />}
              {tab.label}
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${tab.bg}`}>
                {tab.count.toLocaleString()}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
