import { type IdentityGroup, type PivotAlert, type CrossCloudActivity } from '../../types/identity';
import { EmbeddingDetails } from './embedding-details';
import { ActivityTimeline } from './activity-timeline';
import { PivotAlertsTab } from './pivot-alerts-tab';

interface IdentityExpandedProps {
  group: IdentityGroup;
  activities: CrossCloudActivity[];
  pivotAlerts: PivotAlert[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function IdentityExpanded({ group, activities, pivotAlerts, activeTab, onTabChange }: IdentityExpandedProps) {
  
  return (
    <div className="border-t border-slate-200 dark:border-white/10 bg-slate-50/30 dark:bg-white/[0.02] overflow-hidden animate-in slide-in-from-top-2 duration-200">
      <div className="flex items-center gap-4 px-4 pt-3 border-b border-slate-200 dark:border-white/5">
        <button 
          onClick={() => onTabChange('embedding')}
          className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'embedding' ? 'border-indigo-500 text-slate-900 dark:text-white' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
        >
          Embedding Details
        </button>
        <button 
          onClick={() => onTabChange('activity')}
          className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'activity' ? 'border-indigo-500 text-slate-900 dark:text-white' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
        >
          Activity Timeline
        </button>
        <button 
          onClick={() => onTabChange('alerts')}
          className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'alerts' ? 'border-indigo-500 text-slate-900 dark:text-white' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
        >
          Pivot Alerts
        </button>
      </div>

      <div className="bg-transparent">
        {activeTab === 'embedding' && <EmbeddingDetails group={group} />}
        {activeTab === 'activity' && <ActivityTimeline activities={activities} />}
        {activeTab === 'alerts' && <PivotAlertsTab alerts={pivotAlerts} logicalName={group.logical_name} />}
      </div>
    </div>
  );
}
