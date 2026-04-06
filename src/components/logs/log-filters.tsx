import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LogFiltersProps {
  filters: any;
  setFilters: (filters: any) => void;
  viewMode: 'raw' | 'normalized' | 'both';
  setViewMode: (mode: 'raw' | 'normalized' | 'both') => void;
  autoScroll: boolean;
  setAutoScroll: (val: boolean) => void;
}

export function LogFilters({ filters, setFilters, viewMode, setViewMode, autoScroll, setAutoScroll }: LogFiltersProps) {
  const [searchInput, setSearchInput] = useState(filters.search);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkSize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (!desktop && viewMode === 'both') {
        setViewMode('normalized');
      }
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, [viewMode, setViewMode]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev: any) => ({ ...prev, search: searchInput }));
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput, setFilters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev: any) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-4">
      
      <div className="flex flex-wrap items-center gap-2.5 flex-1">
        <select 
          value={filters.entityType} 
          onChange={(e) => handleFilterChange('entityType', e.target.value)}
          className="w-full sm:w-[130px] h-9 px-3 rounded-lg bg-slate-100 dark:bg-[#1a1a24] border border-slate-200 dark:border-white/10 text-sm text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
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
          value={filters.action} 
          onChange={(e) => handleFilterChange('action', e.target.value)}
          className="w-full sm:w-[150px] h-9 px-3 rounded-lg bg-slate-100 dark:bg-[#1a1a24] border border-slate-200 dark:border-white/10 text-sm text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Actions</option>
          <option value="ASSUME_ROLE">ASSUME_ROLE</option>
          <option value="ACCESS">ACCESS</option>
          <option value="CONNECTS_TO">CONNECTS_TO</option>
          <option value="EXPLOITS">EXPLOITS</option>
          <option value="LOGIN">LOGIN</option>
          <option value="API_CALL">API_CALL</option>
          <option value="S3_READ">S3_READ</option>
        </select>

        <select 
          value={filters.severity} 
          onChange={(e) => handleFilterChange('severity', e.target.value)}
          className="w-full sm:w-[130px] h-9 px-3 rounded-lg bg-slate-100 dark:bg-[#1a1a24] border border-slate-200 dark:border-white/10 text-sm text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Severities</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
          <option value="benign">Benign</option>
        </select>

        <select 
          value={filters.timeRange} 
          onChange={(e) => handleFilterChange('timeRange', e.target.value)}
          className="w-full sm:w-[130px] h-9 px-3 rounded-lg bg-slate-100 dark:bg-[#1a1a24] border border-slate-200 dark:border-white/10 text-sm text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="15m">Last 15 min</option>
          <option value="1h">Last 1 hour</option>
          <option value="6h">Last 6 hours</option>
          <option value="24h">Last 24 hours</option>
          <option value="7d">Last 7 days</option>
        </select>

        <div className="relative flex-1 min-w-[200px] w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search logs by entity, action, IP..." 
            className="w-full pl-9 pr-8 h-9 rounded-lg bg-slate-100 dark:bg-[#1a1a24] border border-slate-200 dark:border-white/10 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white"
          />
          {searchInput && (
            <button onClick={() => setSearchInput('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              <span className="text-xs font-bold">×</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-slate-200 dark:border-white/10 pt-3 sm:pt-0">
        
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-xs text-slate-500 font-medium">Auto-scroll</span>
            <input 
              type="checkbox" 
              checked={autoScroll}
              onChange={(e) => setAutoScroll(e.target.checked)}
              className="rounded text-indigo-500 focus:ring-indigo-500 bg-slate-200 dark:bg-white/10 border-transparent w-4 h-4" 
            />
          </label>
          {autoScroll && (
            <span className="flex items-center gap-1 text-[10px] font-bold text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded animate-in fade-in">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> LIVE
            </span>
          )}
        </div>

        <div className="flex p-0.5 bg-slate-100 dark:bg-[#1a1a24] rounded-lg border border-slate-200 dark:border-white/10">
          <button 
            onClick={() => setViewMode('raw')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${viewMode === 'raw' ? 'bg-white dark:bg-[#2a2a36] text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Raw
          </button>
          <button 
            onClick={() => setViewMode('normalized')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${viewMode === 'normalized' ? 'bg-white dark:bg-[#2a2a36] text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Normalized
          </button>
          {isDesktop && (
            <button 
              onClick={() => setViewMode('both')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${viewMode === 'both' ? 'bg-white dark:bg-[#2a2a36] text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              Both
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
