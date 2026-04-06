import { useState } from 'react';
import { toast } from 'sonner';
import { mockNotificationSettings } from '../../lib/mock-data/settings-data';

export function NotificationsTab() {
  const [settings, setSettings] = useState(mockNotificationSettings);

  const handleSave = () => {
    toast.success('Notification preferences saved');
  };

  const handleTestSlack = () => {
    toast.success('Test message sent to Slack');
  };

  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6 animate-in fade-in duration-300">
      
      {/* Channels */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Notification Channels</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Choose how you want to receive threat alerts</p>

        <div className="space-y-4">
          <div className="flex items-start justify-between p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02]">
            <div className="pr-4">
              <div className="font-medium text-sm text-slate-900 dark:text-white mb-1">Email Alerts</div>
              <div className="text-xs text-slate-500">Receive threat alerts to your registered email address</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
              <input type="checkbox" className="sr-only peer" checked={settings.emailEnabled} onChange={(e) => setSettings({...settings, emailEnabled: e.target.checked})} />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-500"></div>
            </label>
          </div>

          <div className="flex items-start justify-between p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02]">
            <div className="pr-4">
              <div className="font-medium text-sm text-slate-900 dark:text-white mb-1">Browser Notifications</div>
              <div className="text-xs text-slate-500 mb-1">Show desktop push notifications in your browser</div>
              {!settings.browserEnabled && <div className="text-[10px] text-slate-400 italic">Enable to get real-time browser alerts</div>}
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
              <input type="checkbox" className="sr-only peer" checked={settings.browserEnabled} onChange={(e) => setSettings({...settings, browserEnabled: e.target.checked})} />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-500"></div>
            </label>
          </div>

          <div className="flex items-start justify-between p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] opacity-80">
            <div className="pr-4">
              <div className="font-medium text-sm text-slate-900 dark:text-white mb-1">In-App Notifications</div>
              <div className="text-xs text-slate-500 mb-1">Show alerts in the TRINETRA notification panel</div>
              <div className="text-[10px] text-slate-400 italic">Always enabled for platform reliability</div>
            </div>
            <label className="relative inline-flex items-center cursor-not-allowed shrink-0 mt-1">
              <input type="checkbox" className="sr-only peer" checked disabled />
              <div className="w-9 h-5 bg-indigo-500/50 rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[18px] after:bg-white after:rounded-full after:h-4 after:w-4"></div>
            </label>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02]">
            <div className="flex items-start justify-between">
              <div className="pr-4">
                <div className="font-medium text-sm text-slate-900 dark:text-white mb-1">Slack Webhook</div>
                <div className="text-xs text-slate-500">Send alerts to a Slack channel via webhook</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input type="checkbox" className="sr-only peer" checked={settings.slackEnabled} onChange={(e) => setSettings({...settings, slackEnabled: e.target.checked})} />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-500"></div>
              </label>
            </div>
            
            {settings.slackEnabled && (
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/5 animate-in slide-in-from-top-2 duration-200">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Slack Webhook URL</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={settings.slackWebhook}
                    onChange={(e) => setSettings({...settings, slackWebhook: e.target.value})}
                    placeholder="https://hooks.slack.com/services/..." 
                    className="flex-1 h-9 px-3 rounded-lg bg-white dark:bg-[#12121a] border border-slate-200 dark:border-white/10 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white"
                  />
                  <button onClick={handleTestSlack} className="h-9 px-3 text-xs font-medium rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors shrink-0">
                    Test Webhook
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Frequency */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Alert Frequency</h2>
        <div className="space-y-3">
          {[
            { id: 'realtime', label: 'Real-time', desc: 'Send alert immediately when detected' },
            { id: 'hourly', label: 'Hourly Digest', desc: 'Bundle alerts and send once per hour' },
            { id: 'daily', label: 'Daily Summary', desc: 'Send one daily email with all alerts' }
          ].map(opt => (
            <label key={opt.id} className="flex items-start gap-3 cursor-pointer group">
              <div className="flex items-center justify-center w-4 h-4 mt-0.5 rounded-full border border-slate-300 dark:border-slate-600 group-hover:border-indigo-500">
                {settings.frequency === opt.id && <div className="w-2 h-2 rounded-full bg-indigo-500" />}
              </div>
              <input 
                type="radio" 
                name="frequency" 
                className="sr-only" 
                checked={settings.frequency === opt.id}
                onChange={() => setSettings({...settings, frequency: opt.id as any})}
              />
              <div>
                <div className="text-sm font-medium text-slate-900 dark:text-white mb-0.5 leading-none">{opt.label}</div>
                <div className="text-xs text-slate-500">{opt.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Quiet Hours */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Quiet Hours</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Pause non-critical notifications during specific hours</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
            <input type="checkbox" className="sr-only peer" checked={settings.quietHoursEnabled} onChange={(e) => setSettings({...settings, quietHoursEnabled: e.target.checked})} />
            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-500"></div>
          </label>
        </div>

        {settings.quietHoursEnabled && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-3">
              <label className="text-sm text-slate-600 dark:text-slate-400">From</label>
              <input 
                type="time" 
                value={settings.quietFrom}
                onChange={(e) => setSettings({...settings, quietFrom: e.target.value})}
                className="h-9 px-3 rounded-lg bg-white dark:bg-[#12121a] border border-slate-200 dark:border-white/10 text-sm focus:border-indigo-500 outline-none text-slate-900 dark:text-white"
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm text-slate-600 dark:text-slate-400">To</label>
              <input 
                type="time" 
                value={settings.quietTo}
                onChange={(e) => setSettings({...settings, quietTo: e.target.value})}
                className="h-9 px-3 rounded-lg bg-white dark:bg-[#12121a] border border-slate-200 dark:border-white/10 text-sm focus:border-indigo-500 outline-none text-slate-900 dark:text-white"
              />
            </div>
            <div className="text-xs text-amber-500 sm:ml-4">Critical alerts will still be delivered during quiet hours</div>
          </div>
        )}
      </div>

      <div className="pt-6 border-t border-slate-200 dark:border-white/10">
        <button onClick={handleSave} className="h-10 px-6 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white rounded-lg font-medium transition-all shadow-md shadow-indigo-500/20 text-sm">
          Save Notification Settings
        </button>
      </div>

    </div>
  );
}
