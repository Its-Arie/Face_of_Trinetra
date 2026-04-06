import { Search } from 'lucide-react';
import { useAuth } from '../../contexts/auth-context';

interface AlertFiltersProps {
  filters: any;
  setFilters: (filters: any) => void;
}

export function AlertFilters({ filters, setFilters }: AlertFiltersProps) {
  const { user } = useAuth();
  
  const connectedProviders = Object.entries(user?.connectedProviders || {})
    .filter(([_, val]) => val !== null)
    .map(([key]) => key);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev: any) => ({ ...prev, [key]: value }));
  };

  const activeFilterCount = Object.entries(filters).filter(([k, v]) => 
    k !== 'search' && k !== 'sort' && k !== 'timeRange' && v !== 'all'
  ).length + (filters.search ? 1 : 0);

  const clearAll = () => {
    setFilters({
      severity: 'all',
      provider: 'all',
      entityType: 'all',
      attackType: 'all',
      timeRange: '24h',
      search: '',
      sort: 'Newest First'
    });
  };

  return (
    <div className="bg-slate-100/50 dark:bg-white/5 rounded-lg p-3 mb-3 flex flex-wrap items-center gap-2.5">
      
      <select 
        value={filters.severity} 
        onChange={(e) => handleFilterChange('severity', e.target.value)}
        className="w-[130px] h-9 px-3 rounded-lg bg-white dark:bg-[#1a1a24] border border-slate-200 dark:border-white/10 text-sm text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="all">All Severities</option>
        <option value="critical">🔴 Critical</option>
        <option value="high">🟠 High</option>
        <option value="medium">🟡 Medium</option>
        <option value="low">🟢 Low</option>
      </select>

      <select 
        value={filters.provider} 
        onChange={(e) => handleFilterChange('provider', e.target.value)}
        className="w-[130px] h-9 px-3 rounded-lg bg-white dark:bg-[#1a1a24] border border-slate-200 dark:border-white/10 text-sm text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="all">All Providers</option>
        {connectedProviders.includes('aws') && <option value="aws">🟠 AWS</option>}
        {connectedProviders.includes('azure') && <option value="azure">🔵 Azure</option>}
        {connectedProviders.includes('gcp') && <option value="gcp">🔴 GCP</option>}
      </select>

      <select 
        value={filters.entityType} 
        onChange={(e) => handleFilterChange('entityType', e.target.value)}
        className="w-[120px] h-9 px-3 rounded-lg bg-white dark:bg-[#1a1a24] border border-slate-200 dark:border-white/10 text-sm text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="all">All Types</option>
        <option value="user">🔵 User</option>
        <option value="vm">🟢 VM</option>
        <option value="container">🟠 Container</option>
        <option value="ip">🔴 IP</option>
        <option value="role">🟣 Role</option>
        <option value="cve">🟡 CVE</option>
        <option value="cloudAccount">⚪ CloudAccount</option>
      </select>

      <select 
        value={filters.attackType} 
        onChange={(e) => handleFilterChange('attackType', e.target.value)}
        className="w-[140px] h-9 px-3 rounded-lg bg-white dark:bg-[#1a1a24] border border-slate-200 dark:border-white/10 text-sm text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="all">All Attacks</option>
        <option value="CVE Exploitation">CVE Exploitation</option>
        <option value="Privilege Escalation">Privilege Escalation</option>
        <option value="Lateral Movement">Lateral Movement</option>
        <option value="Cross-Cloud Pivot">Cross-Cloud Pivot</option>
        <option value="Reconnaissance">Reconnaissance</option>
      </select>

      <select 
        value={filters.timeRange} 
        onChange={(e) => handleFilterChange('timeRange', e.target.value)}
        className="w-[120px] h-9 px-3 rounded-lg bg-white dark:bg-[#1a1a24] border border-slate-200 dark:border-white/10 text-sm text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="all">All Time</option>
        <option value="1h">Last 1 Hour</option>
        <option value="6h">Last 6 Hours</option>
        <option value="24h">Last 24 Hours</option>
        <option value="7d">Last 7 Days</option>
        <option value="30d">Last 30 Days</option>
      </select>

      <div className="relative flex-1 min-w-[180px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input 
          type="text" 
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          placeholder="Search alerts by node name, CVE, description..." 
          className="w-full pl-9 pr-8 h-9 rounded-lg bg-white dark:bg-[#1a1a24] border border-slate-200 dark:border-white/10 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white"
        />
        {filters.search && (
          <button onClick={() => handleFilterChange('search', '')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <span className="text-xs font-bold">×</span>
          </button>
        )}
      </div>

      <select 
        value={filters.sort} 
        onChange={(e) => handleFilterChange('sort', e.target.value)}
        className="w-[150px] h-9 px-3 rounded-lg bg-white dark:bg-[#1a1a24] border border-slate-200 dark:border-white/10 text-sm font-medium text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="Newest First">Newest First</option>
        <option value="Oldest First">Oldest First</option>
        <option value="Highest Score">Highest Score</option>
        <option value="Lowest Score">Lowest Score</option>
        <option value="Severity (High→Low)">Severity (High→Low)</option>
        <option value="Severity (Low→High)">Severity (Low→High)</option>
      </select>

      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2 px-2 shrink-0">
          <span className="text-xs text-slate-500">{activeFilterCount} filters active</span>
          <button onClick={clearAll} className="text-xs text-indigo-500 hover:underline">Clear All</button>
        </div>
      )}
    </div>
  );
}
