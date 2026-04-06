import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { mockUserProfile } from '../../lib/mock-data/settings-data';
import { useAuth } from '../../contexts/auth-context';

export function ProfileTab() {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    ...mockUserProfile,
    fullName: user?.name || mockUserProfile.fullName,
    email: user?.email || mockUserProfile.email,
  });

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success('Profile updated successfully');
    }, 1000);
  };

  const handleCancel = () => {
    setForm({
      ...mockUserProfile,
      fullName: user?.name || mockUserProfile.fullName,
      email: user?.email || mockUserProfile.email,
    });
  };

  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6 animate-in fade-in duration-300">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Profile Settings</h2>

      {/* Avatar Section */}
      <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-200 dark:border-white/10">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-500/20 shrink-0">
          {form.avatarInitials}
        </div>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <button 
              onClick={() => toast.success('Avatar updated')}
              className="px-3 py-1.5 text-xs font-medium rounded-md bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 transition-colors"
            >
              Change Photo
            </button>
          </div>
          <button className="text-xs text-red-500 hover:text-red-400 transition-colors">
            Remove Photo
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-5 max-w-xl">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
          <input
            type="text"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            className="w-full h-10 px-3 rounded-lg bg-slate-100 dark:bg-white/5 border border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-sm text-slate-900 dark:text-white"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full h-10 px-3 rounded-lg bg-slate-100 dark:bg-white/5 border border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-sm text-slate-900 dark:text-white"
            placeholder="you@example.com"
          />
          <p className="text-xs text-slate-500 mt-1.5">Alerts and notifications will be sent to this email.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Phone Number <span className="text-slate-400 font-normal">(optional)</span></label>
          <input
            type="tel"
            value={form.phone || ''}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full h-10 px-3 rounded-lg bg-slate-100 dark:bg-white/5 border border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-sm text-slate-900 dark:text-white"
            placeholder="+91 XXXXXXXXXX"
          />
          <p className="text-xs text-slate-500 mt-1.5">Used for SMS alerts if enabled.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Timezone</label>
            <select
              value={form.timezone}
              onChange={(e) => setForm({ ...form, timezone: e.target.value })}
              className="w-full h-10 px-3 rounded-lg bg-slate-100 dark:bg-white/5 border border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-sm text-slate-900 dark:text-white appearance-none"
            >
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="UTC">UTC</option>
              <option value="America/New_York">America/New_York (EST)</option>
              <option value="Europe/London">Europe/London (GMT)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Preferred Language</label>
            <select
              value={form.language}
              onChange={(e) => setForm({ ...form, language: e.target.value })}
              className="w-full h-10 px-3 rounded-lg bg-slate-100 dark:bg-white/5 border border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-sm text-slate-900 dark:text-white appearance-none"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="h-10 px-6 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center shadow-md shadow-indigo-500/20 text-sm"
        >
          {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : 'Save Changes'}
        </button>
        <button
          onClick={handleCancel}
          disabled={saving}
          className="h-10 px-4 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
