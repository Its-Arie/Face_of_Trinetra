import { LayoutDashboard, FileText, Bug, Link2, Clock, FileBarChart, Activity, Settings as SettingsIcon, BookOpen, Search, Info } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
      <div className="p-4 bg-indigo-500/10 rounded-full animate-pulse">
        <LayoutDashboard className="w-16 h-16 text-indigo-500" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          This page is under construction. Please use the navigation to explore the main features like the Attack Graph or Alerts.
        </p>
      </div>
    </div>
  );
}

export function Logs() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
      <div className="p-4 bg-blue-500/10 rounded-full">
        <FileText className="w-16 h-16 text-blue-500" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Log Monitor</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Real-time log ingestion and UDM++ normalization view coming soon.
        </p>
      </div>
    </div>
  );
}

export function Vulnerabilities() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
      <div className="p-4 bg-yellow-500/10 rounded-full">
        <Bug className="w-16 h-16 text-yellow-500" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Vulnerability Intelligence</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          CVE mapping and exploitability scoring dashboard coming soon.
        </p>
      </div>
    </div>
  );
}

export function Identities() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
      <div className="p-4 bg-purple-500/10 rounded-full">
        <Link2 className="w-16 h-16 text-purple-500" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Identity Linking</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Cross-cloud identity pivot tracking and embedding visualization coming soon.
        </p>
      </div>
    </div>
  );
}

export function Timeline() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
      <div className="p-4 bg-green-500/10 rounded-full">
        <Clock className="w-16 h-16 text-green-500" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Temporal Analysis</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Time-series attack progression visualization coming soon.
        </p>
      </div>
    </div>
  );
}

export function Reports() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
      <div className="p-4 bg-orange-500/10 rounded-full">
        <FileBarChart className="w-16 h-16 text-orange-500" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Risk Reports</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Explainable AI reports with SHAP feature attribution coming soon.
        </p>
      </div>
    </div>
  );
}

export function Performance() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
      <div className="p-4 bg-indigo-500/10 rounded-full">
        <Activity className="w-16 h-16 text-indigo-500" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Model Performance</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          GNN model metrics and ablation study results coming soon.
        </p>
      </div>
    </div>
  );
}

export function Simulation() {
  return null;
}

export function Feedback() {
  return null;
}

export function Settings() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
      <div className="p-4 bg-slate-500/10 rounded-full">
        <SettingsIcon className="w-16 h-16 text-slate-500" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          System configuration and cloud provider integration coming soon.
        </p>
      </div>
    </div>
  );
}

export function ApiDocs() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
      <div className="p-4 bg-sky-500/10 rounded-full">
        <BookOpen className="w-16 h-16 text-sky-500" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">API Documentation</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          REST API reference for integrating with Trinetra backend coming soon.
        </p>
      </div>
    </div>
  );
}

export function Audit() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
      <div className="p-4 bg-gray-500/10 rounded-full">
        <Search className="w-16 h-16 text-gray-500" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Audit Trail</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          System-wide action logging and compliance tracking coming soon.
        </p>
      </div>
    </div>
  );
}

export function About() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
      <div className="p-4 bg-indigo-500/10 rounded-full">
        <Info className="w-16 h-16 text-indigo-500" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">About TRINETRA</h1>
        
        <div className="max-w-2xl mx-auto text-left bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">System Pages</h2>
          <div className="space-y-2">
            {[
              { num: 1, name: 'Login / Auth', desc: 'Authentication and access' },
              { num: 2, name: 'Home', desc: 'Landing page with system overview' },
              { num: 3, name: 'Dashboard', desc: 'Main operational command center' },
              { num: 4, name: 'Attack Graph', desc: 'Interactive heterogeneous knowledge graph' },
              { num: 5, name: 'Alerts', desc: 'Threat detection alert feed' },
              { num: 6, name: 'Log Monitor', desc: 'Log ingestion and normalization viewer' },
              { num: 7, name: 'Vulnerabilities', desc: 'CVE intelligence center' },
              { num: 8, name: 'Identities', desc: 'Cross-cloud identity management' },
              { num: 9, name: 'Timeline', desc: 'Temporal attack progression analysis' },
              { num: 10, name: 'Reports', desc: 'Explainable AI risk reports' },
              { num: 11, name: 'Performance', desc: 'Model metrics and ablation results' },
              { num: 12, name: 'Settings', desc: 'User account and preferences' },
              { num: 13, name: 'About', desc: 'System info, team, and documentation' },
            ].map((page) => (
              <div key={page.num} className="flex gap-3 text-sm py-1.5 border-b border-slate-100 dark:border-white/5 last:border-0">
                <span className="text-slate-400 font-mono w-5">{page.num}.</span>
                <span className="font-medium text-slate-700 dark:text-slate-300 w-32">{page.name}</span>
                <span className="text-slate-500">{page.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
