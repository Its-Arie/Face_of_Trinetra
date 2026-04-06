import { useState } from 'react';
import { toast } from 'sonner';
import { mockAlertPreferences } from '../../lib/mock-data/settings-data';

export function AlertPreferencesTab() {
  const [prefs, setPrefs] = useState(mockAlertPreferences);

  const handleSave = () => {
    toast.success('Alert preferences saved');
  };

  const severities = [
    { id: 'critical', label: 'Critical', color: 'bg-red-500', border: 'border-red-500' },
    { id: 'high', label: 'High', color: 'bg-orange-500', border: 'border-orange-500' },
    { id: 'medium', label: 'Medium', color: 'bg-yellow-500', border: 'border-yellow-500' },
    { id: 'low', label: 'Low', color: 'bg-green-500', border: 'border-green-500' },
  ];

  const getActiveSeveritiesText = () => {
    if (prefs.minSeverity === 'low') return 'Critical, High, Medium, Low';
    if (prefs.minSeverity === 'medium') return 'Critical, High, Medium';
    if (prefs.minSeverity === 'high') return 'Critical, High';
    return 'Critical';
  };

  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6 animate-in fade-in duration-300">
      
      {/* Min Severity */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Minimum Alert Severity</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Only receive notifications for alerts at or above this severity</p>

        <div className="flex flex-wrap gap-3 mb-3">
          {severities.map((sev) => {
            const isSelected = prefs.minSeverity === sev.id;
            return (
              <button
                key={sev.id}
                onClick={() => setPrefs({...prefs, minSeverity: sev.id as any})}
                className={`h-9 px-4 rounded-lg text-sm font-medium transition-all border ${
                  isSelected 
                    ? `${sev.color} border-transparent text-white shadow-md` 
                    : `bg-transparent border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5`
                }`}
              >
                {sev.label}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-slate-500">Currently notifying for: <span className="font-medium text-slate-700 dark:text-slate-300">{getActiveSeveritiesText()}</span></p>
      </div>

      {/* Attack Types */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Attack Types to Monitor</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Select which attack categories you want to be alerted about</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { id: 'privilegeEscalation', label: 'Privilege Escalation', desc: 'Compromised identities assuming high-privilege roles' },
            { id: 'lateralMovement', label: 'Lateral Movement', desc: 'Threats spreading across VMs within a cloud provider' },
            { id: 'crossCloudPivot', label: 'Cross-Cloud Pivot', desc: 'Identities pivoting between AWS, Azure, and GCP' },
            { id: 'cveExploitation', label: 'CVE Exploitation', desc: 'External IPs exploiting known CVEs on your infrastructure' },
          ].map((type) => (
            <label key={type.id} className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] cursor-pointer group">
              <input 
                type="checkbox" 
                checked={prefs.attackTypes[type.id as keyof typeof prefs.attackTypes]}
                onChange={(e) => setPrefs({
                  ...prefs, 
                  attackTypes: { ...prefs.attackTypes, [type.id]: e.target.checked }
                })}
                className="mt-1 rounded text-indigo-500 focus:ring-indigo-500 bg-white dark:bg-white/10 border-slate-300 dark:border-white/20 w-4 h-4 cursor-pointer" 
              />
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white leading-none mb-1.5">{type.label}</div>
                <div className="text-xs text-slate-500 leading-snug">{type.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Display Preferences */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Display Preferences</h2>
        <div className="space-y-4 max-w-2xl">
          {[
            { id: 'groupDuplicates', label: 'Group Duplicate Alerts', desc: 'Combine similar alerts into a single notification' },
            { id: 'showBenign', label: 'Show Benign Events', desc: 'Include non-malicious events in the event log' },
            { id: 'autoDismissLow', label: 'Auto-dismiss Low Severity', desc: 'Automatically dismiss Low severity alerts after 24 hours' },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm text-slate-900 dark:text-white">{item.label}</div>
                <div className="text-xs text-slate-500">{item.desc}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={prefs[item.id as keyof typeof prefs] as boolean} 
                  onChange={(e) => setPrefs({...prefs, [item.id]: e.target.checked})} 
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-500"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Default Dashboard Filters */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Default Dashboard Filters</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Set your preferred defaults when opening the dashboard</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Default Provider</label>
            <select 
              value={prefs.defaultProvider}
              onChange={(e) => setPrefs({...prefs, defaultProvider: e.target.value})}
              className="w-full h-9 px-3 rounded-lg bg-slate-100 dark:bg-[#1a1a24] border border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm text-slate-900 dark:text-white"
            >
              <option value="all">All Providers</option>
              <option value="aws">AWS</option>
              <option value="azure">Azure</option>
              <option value="gcp">GCP</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Default Time Range</label>
            <select 
              value={prefs.defaultTimeRange}
              onChange={(e) => setPrefs({...prefs, defaultTimeRange: e.target.value})}
              className="w-full h-9 px-3 rounded-lg bg-slate-100 dark:bg-[#1a1a24] border border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm text-slate-900 dark:text-white"
            >
              <option value="15m">Last 15 min</option>
              <option value="1h">Last 1 hour</option>
              <option value="6h">Last 6 hours</option>
              <option value="24h">Last 24 hours</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Default Severity View</label>
            <select 
              value={prefs.defaultSeverityView}
              onChange={(e) => setPrefs({...prefs, defaultSeverityView: e.target.value})}
              className="w-full h-9 px-3 rounded-lg bg-slate-100 dark:bg-[#1a1a24] border border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm text-slate-900 dark:text-white"
            >
              <option value="all">All Severities</option>
              <option value="critical_high">Critical + High</option>
              <option value="critical">Critical Only</option>
            </select>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-200 dark:border-white/10">
        <button onClick={handleSave} className="h-10 px-6 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white rounded-lg font-medium transition-all shadow-md shadow-indigo-500/20 text-sm">
          Save Alert Preferences
        </button>
      </div>

    </div>
  );
}
