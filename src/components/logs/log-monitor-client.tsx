import { useState, useEffect, useRef, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

// Components
import { PipelineStepper } from './pipeline-stepper';
import { IngestionStats } from './ingestion-stats';
import { ProviderTabs } from './provider-tabs';
import { LogFilters } from './log-filters';
import { LogEntryRow } from './log-entry';
import { LogPagination } from './log-pagination';
import { SchemaMapping } from './schema-mapping';

// Mock Data
import { mockLogEntries } from '../../lib/mock-data/log-entries';

export function LogMonitorClient() {
  // State
  const [activeProvider, setActiveProvider] = useState<string>('all');
  const [filters, setFilters] = useState({
    entityType: 'all',
    action: 'all',
    severity: 'all',
    timeRange: '1h',
    search: ''
  });
  const [viewMode, setViewMode] = useState<'raw' | 'normalized' | 'both'>('normalized');
  const [autoScroll, setAutoScroll] = useState<boolean>(false);
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(50);
  
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [updatedSecondsAgo, setUpdatedSecondsAgo] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setUpdatedSecondsAgo(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (autoScroll) {
      interval = setInterval(() => {
        // In a real app, we'd fetch new logs and append.
        // Here we just scroll to top (assuming newest are at top)
        if (scrollRef.current) {
          scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [autoScroll]);

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
    setExpandedLogId(null);
  }, [filters, activeProvider, itemsPerPage]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setUpdatedSecondsAgo(0);
      toast.success('Logs refreshed');
    }, 500);
  };

  // Filtering Logic
  const filteredLogs = useMemo(() => {
    return mockLogEntries.filter(log => {
      // Provider Tab
      if (activeProvider !== 'all' && log.provider !== activeProvider) return false;
      
      // Select Filters
      if (filters.entityType !== 'all' && log.entity_type !== filters.entityType) return false;
      if (filters.action !== 'all' && log.action !== filters.action) return false;
      if (filters.severity !== 'all' && log.severity !== filters.severity) return false;
      
      // Time Range (Mock logic: just filtering out a few randomly for demo if not 'all')
      // In reality, compare log.timestamp with Date.now() - range
      
      // Search
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matches = 
          log.entity_id.toLowerCase().includes(query) ||
          log.action.toLowerCase().includes(query) ||
          (log.target_id && log.target_id.toLowerCase().includes(query)) ||
          log.source_ip.includes(query) ||
          (log.attack_phase && log.attack_phase.toLowerCase().includes(query));
        if (!matches) return false;
      }

      return true;
    });
  }, [activeProvider, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedLogs = filteredLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setExpandedLogId(null);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-2 border-b border-slate-200 dark:border-white/10">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Log Monitor</h1>
          <p className="text-sm text-slate-500 mt-0.5">Multi-cloud log ingestion and UDM++ normalization pipeline</p>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 w-32 text-right">
            {updatedSecondsAgo < 2 ? 'Last updated: just now' : `Last updated: ${updatedSecondsAgo}s ago`}
          </span>
          <button 
            onClick={handleRefresh}
            className="h-8 px-3 flex items-center text-xs font-medium rounded-md border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isRefreshing ? 'animate-spin text-indigo-500' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      <div className={`transition-opacity duration-300 space-y-4 ${isRefreshing ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        
        <PipelineStepper />
        
        <IngestionStats />

        <ProviderTabs activeTab={activeProvider} onTabChange={setActiveProvider} />

        <LogFilters 
          filters={filters} 
          setFilters={setFilters} 
          viewMode={viewMode} 
          setViewMode={setViewMode}
          autoScroll={autoScroll}
          setAutoScroll={setAutoScroll}
        />

        {/* Log Viewer */}
        <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl flex flex-col h-[600px] overflow-hidden">
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-2 styled-scrollbar bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-50/50 via-slate-100/50 to-slate-200/50 dark:from-[#1a1a24]/50 dark:via-[#12121a]/50 dark:to-[#0a0a0f]/50"
          >
            {paginatedLogs.length > 0 ? (
              paginatedLogs.map(log => (
                <LogEntryRow 
                  key={log.id} 
                  log={log} 
                  isExpanded={expandedLogId === log.id}
                  onToggle={() => setExpandedLogId(expandedLogId === log.id ? null : log.id)}
                  viewMode={viewMode}
                />
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500">
                <p className="text-sm font-medium">No logs match the current filters.</p>
              </div>
            )}
          </div>
          
          <div className="px-4 bg-white/50 dark:bg-transparent">
            <LogPagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              totalItems={filteredLogs.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={setItemsPerPage}
            />
          </div>
        </div>

        <SchemaMapping />

      </div>
    </div>
  );
}
