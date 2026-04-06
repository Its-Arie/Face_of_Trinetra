import { useState } from 'react';
import { SettingsSidebarNav } from './settings-sidebar-nav';
import { ProfileTab } from './profile-tab';
import { CloudAccountsTab } from './cloud-accounts-tab';
import { NotificationsTab } from './notifications-tab';
import { AlertPreferencesTab } from './alert-preferences-tab';
import { SecurityTab } from './security-tab';
import { PrivacyTab } from './privacy-tab';
import { PageSectionSkeleton } from '../loading/page-section-skeleton';
import { useEffect } from 'react';

export function SettingsClient() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(true);

  // Initial loading simulation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    if (isLoading) return <PageSectionSkeleton />;

    switch (activeTab) {
      case 'profile': return <ProfileTab />;
      case 'cloud': return <CloudAccountsTab />;
      case 'notifications': return <NotificationsTab />;
      case 'alerts': return <AlertPreferencesTab />;
      case 'security': return <SecurityTab />;
      case 'privacy': return <PrivacyTab />;
      default: return <ProfileTab />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your account, cloud connections, notifications, and preferences</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <SettingsSidebarNav activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 min-w-0">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
