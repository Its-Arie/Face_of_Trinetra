import { User, Cloud, Bell, SlidersHorizontal, Shield, Lock } from 'lucide-react';

interface SettingsSidebarNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function SettingsSidebarNav({ activeTab, setActiveTab }: SettingsSidebarNavProps) {
  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'cloud', label: 'Cloud Accounts', icon: Cloud },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'alerts', label: 'Alert Preferences', icon: SlidersHorizontal },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'privacy', label: 'Data & Privacy', icon: Lock },
  ];

  return (
    <nav className="flex md:flex-col overflow-x-auto md:overflow-visible no-scrollbar pb-2 md:pb-0 gap-1 w-full md:w-56 shrink-0 md:sticky md:top-24">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              isActive
                ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 md:border-l-[3px] border-indigo-500 md:rounded-l-none'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white md:border-l-[3px] border-transparent md:rounded-l-none'
            }`}
          >
            <tab.icon className={`w-4 h-4 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
