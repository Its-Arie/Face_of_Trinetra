import { Search } from 'lucide-react';

interface ReportFiltersProps {
  filters: {
    severity: string;
    provider: string;
    type: string;
    date: string;
    search: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  totalResults: number;
  totalAvailable: number;
}

export function ReportFilters({ filters, setFilters, totalResults, totalAvailable }: ReportFiltersProps) {
  
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev: any) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
        <select 
          value={filters.severity} 
          onChange={(e) => handleFilterChange('severity', e.target.value)}
          className="w-[140px] h-9 px-3 rounded-lg bg-slate-100 dark:bg-white/5 border border-transparent focus:border-indigo-500 text-sm text-slate-700 dark:text-slate-300 outline-none transition-colors"
        >
          <option value="all">All Severities</option>
          <option value="Critical">🔴 Critical</option>
          <option value="High">🟠 High</option>
          <option value="Medium">🟡 Medium</option>
          <option value="Low">🟢 Low</option>
        </select>

        <select 
          value={filters.provider} 
          onChange={(e) => handleFilterChange('provider', e.target.value)}
          className="w-[140px] h-9 px-3 rounded-lg bg-slate-100 dark:bg-white/5 border border-transparent focus:border-indigo-500 text-sm text-slate-700 dark:text-slate-300 outline-none transition-colors"
        >
          <option value="all">All Providers</option>
          <option value="AWS">🟠 AWS</option>
          <option value="Azure">🔵 Azure</option>
          <option value="GCP">🔴 GCP</option>
        </select>

        <select 
          value={filters.type} 
          onChange={(e) => handleFilterChange('type', e.target.value)}
          className="w-[130px] h-9 px-3 rounded-lg bg-slate-100 dark:bg-white/5 border border-transparent focus:border-indigo-500 text-sm text-slate-700 dark:text-slate-300 outline-none transition-colors"
        >
          <option value="all">All Types</option>
          <option value="User">User</option>
          <option value="VM">VM</option>
          <option value="Container">Container</option>
          <option value="IP">IP</option>
          <option value="Role">Role</option>
          <option value="CVE">CVE</option>
          <option value="CloudAccount">CloudAccount</option>
        </select>

        <select 
          value={filters.date} 
          onChange={(e) => handleFilterChange('date', e.target.value)}
          className="w-[140px] h-9 px-3 rounded-lg bg-slate-100 dark:bg-white/5 border border-transparent focus:border-indigo-500 text-sm text-slate-700 dark:text-slate-300 outline-none transition-colors"
        >
          <option value="24h">Last 24 hours</option>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="all">All time</option>
        </select>

        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="Search by node, report ID, provider..." 
            className="w-full pl-9 pr-8 h-9 rounded-lg bg-slate-100 dark:bg-white/5 border border-transparent focus:border-indigo-500 text-sm outline-none text-slate-900 dark:text-white transition-colors"
          />
          {filters.search && (
            <button onClick={() => handleFilterChange('search', '')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              <span className="text-xs font-bold">×</span>
            </button>
          )}
        </div>
      </div>

      <div className="text-xs text-slate-500 shrink-0 whitespace-nowrap">
        Showing {totalResults} of {totalAvailable} reports
      </div>
    </div>
  );
}
