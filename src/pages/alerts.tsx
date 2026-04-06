import { useState, useEffect, useMemo } from 'react';
import { ShieldAlert, BellRing, BellOff, RefreshCw, SearchX, PartyPopper } from 'lucide-react';
import { toast } from 'sonner';

// Components
import { AlertStatCards } from '../components/alerts/alert-stat-cards';
import { AlertFilters } from '../components/alerts/alert-filters';
import { BulkActions } from '../components/alerts/bulk-actions';
import { AlertList } from '../components/alerts/alert-list';
import { AlertDetailPanel } from '../components/alerts/alert-detail-panel';
import { AlertPagination } from '../components/alerts/alert-pagination';
import { FalsePositiveDialog } from '../components/alerts/false-positive-dialog';
import { DismissDialog } from '../components/alerts/dismiss-dialog';
// Data
import { mockAlerts } from '../lib/mock-data/alerts';
import { type Alert } from '../types/alert';

export function Alerts() {
  
  // State
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [updatedSecondsAgo, setUpdatedSecondsAgo] = useState(0);
  
  const [activeTab, setActiveTab] = useState<'active' | 'resolved'>('active');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeAlertId, setActiveAlertId] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  
  const [dialogState, setDialogState] = useState<{type: 'fp' | 'dismiss' | null, alertId: string | null}>({ type: null, alertId: null });

  const [filters, setFilters] = useState({
    severity: 'all',
    provider: 'all',
    entityType: 'all',
    attackType: 'all',
    timeRange: '24h',
    search: '',
    sort: 'Newest First'
  });

  // Timer
  useEffect(() => {
    const timer = setInterval(() => setUpdatedSecondsAgo(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setUpdatedSecondsAgo(0);
      toast.success('Alerts refreshed');
    }, 300);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    toast.success(`Alert sounds ${!soundEnabled ? 'enabled' : 'disabled'}`);
  };

  const handleFilterUpdate = (key: string, value: string) => {
    if (key === 'clear') {
      setFilters({
        severity: 'all', provider: 'all', entityType: 'all', attackType: 'all',
        timeRange: '24h', search: '', sort: 'Newest First'
      });
    } else {
      setFilters(prev => ({ ...prev, [key]: value }));
    }
    setCurrentPage(1);
    setSelectedIds(new Set());
  };

  // Filter & Sort Logic
  const filteredAndSortedAlerts = useMemo(() => {
    let result = alerts.filter(alert => {
      // Tab filter
      const isResolvedTab = activeTab === 'resolved';
      const isAlertResolved = alert.status === 'resolved' || alert.status === 'dismissed';
      if (isResolvedTab !== isAlertResolved) return false;

      // Dropdown filters
      if (filters.severity !== 'all' && alert.severity !== filters.severity) return false;
      if (filters.provider !== 'all' && alert.provider !== filters.provider) return false;
      if (filters.entityType !== 'all' && alert.nodeType !== filters.entityType) return false;
      if (filters.attackType !== 'all' && alert.attackType !== filters.attackType) return false;

      // Search filter
      if (filters.search) {
        const query = filters.search.toLowerCase();
        return alert.nodeName.toLowerCase().includes(query) || 
               alert.description.toLowerCase().includes(query) ||
               alert.relatedCVEs.some(cve => cve.id.toLowerCase().includes(query));
      }

      return true;
    });

    // Sort
    result.sort((a, b) => {
      switch (filters.sort) {
        case 'Oldest First': return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        case 'Highest Score': return b.score - a.score;
        case 'Lowest Score': return a.score - b.score;
        case 'Severity (High→Low)': {
          const sevMap = { critical: 4, high: 3, medium: 2, low: 1 };
          return sevMap[b.severity] - sevMap[a.severity];
        }
        case 'Severity (Low→High)': {
          const sevMap = { critical: 4, high: 3, medium: 2, low: 1 };
          return sevMap[a.severity] - sevMap[b.severity];
        }
        case 'Newest First':
        default:
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }
    });

    return result;
  }, [alerts, activeTab, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedAlerts.length / itemsPerPage);
  const paginatedAlerts = filteredAndSortedAlerts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Actions
  const updateAlertStatus = (ids: string[], newStatus: Alert['status'], extraData: Partial<Alert> = {}) => {
    setAlerts(prev => prev.map(a => 
      ids.includes(a.id) ? { ...a, status: newStatus, ...extraData } : a
    ));
    setSelectedIds(new Set());
  };

  const handleAcknowledge = (id: string) => {
    updateAlertStatus([id], 'acknowledged', { acknowledgedAt: new Date().toISOString() });
    toast.success('Alert acknowledged');
  };

  const handleEscalate = (id: string) => {
    updateAlertStatus([id], 'escalated', { acknowledgedAt: new Date().toISOString() });
    toast.success('Alert escalated');
  };

  const handleResolve = (id: string) => {
    updateAlertStatus([id], 'resolved', { resolvedAt: new Date().toISOString() });
    setActiveAlertId(null);
    toast.success('Alert resolved');
  };

  const handleBulkAction = (action: 'ack' | 'esc') => {
    const ids = Array.from(selectedIds);
    if (action === 'ack') {
      updateAlertStatus(ids, 'acknowledged', { acknowledgedAt: new Date().toISOString() });
      toast.success(`${ids.length} alerts acknowledged`);
    } else {
      updateAlertStatus(ids, 'escalated', { acknowledgedAt: new Date().toISOString() });
      toast.success(`${ids.length} alerts escalated`);
    }
  };

  const handleFpSubmit = (reason: string, notes: string) => {
    if (dialogState.alertId) {
      updateAlertStatus([dialogState.alertId], 'resolved', { 
        falsePositive: true, fpReason: reason, fpNotes: notes, resolvedAt: new Date().toISOString() 
      });
      toast.success('Marked as false positive. Feedback submitted.');
    } else {
      // Bulk FP not fully spec'd, skipping for now
    }
    setDialogState({ type: null, alertId: null });
    setActiveAlertId(null);
  };

  const handleDismissSubmit = (reason: string) => {
    const ids = dialogState.alertId ? [dialogState.alertId] : Array.from(selectedIds);
    updateAlertStatus(ids, 'dismissed', { dismissReason: reason, resolvedAt: new Date().toISOString() });
    toast.success(`${ids.length === 1 ? 'Alert' : `${ids.length} alerts`} dismissed`);
    setDialogState({ type: null, alertId: null });
    setActiveAlertId(null);
  };

  return (
    <div className="flex flex-col h-full relative">
      
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-white/10 shrink-0 mb-4">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-6 h-6 text-indigo-500" />
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white leading-none">Threat Alerts</h1>
            <p className="text-sm text-slate-500 mt-1 hidden md:block">Real-time threat detections across your cloud infrastructure</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={toggleSound} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 transition-colors" title={soundEnabled ? "Alert Sound On" : "Alert Sound Off"}>
            {soundEnabled ? <BellRing className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
          </button>
          <button onClick={handleRefresh} className="h-8 px-3 flex items-center text-xs font-medium rounded-md hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 transition-colors">
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isRefreshing ? 'animate-spin text-indigo-500' : ''}`} /> Refresh
          </button>
          <span className="text-xs text-slate-500 min-w-[90px] text-right">
            {updatedSecondsAgo < 2 ? 'Updated just now' : `Updated ${updatedSecondsAgo}s ago`}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={`flex-1 flex flex-col min-h-0 transition-opacity duration-300 ${isRefreshing ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        
        {/* Stat Cards */}
        <AlertStatCards onFilter={handleFilterUpdate} />

        {/* Tabs */}
        <div className="flex items-center gap-6 border-b border-slate-200 dark:border-white/10 mb-3 shrink-0">
          <button 
            onClick={() => { setActiveTab('active'); setCurrentPage(1); setSelectedIds(new Set()); setActiveAlertId(null); }}
            className={`pb-2.5 px-1 flex items-center gap-2 text-sm font-medium transition-colors relative ${activeTab === 'active' ? 'text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Active
            <span className="text-[10px] bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded-full">{alerts.filter(a => a.status !== 'resolved' && a.status !== 'dismissed').length}</span>
            {activeTab === 'active' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500" />}
          </button>
          <button 
            onClick={() => { setActiveTab('resolved'); setCurrentPage(1); setSelectedIds(new Set()); setActiveAlertId(null); }}
            className={`pb-2.5 px-1 flex items-center gap-2 text-sm font-medium transition-colors relative ${activeTab === 'resolved' ? 'text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Resolved
            <span className="text-[10px] bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded-full">{alerts.filter(a => a.status === 'resolved' || a.status === 'dismissed').length}</span>
            {activeTab === 'resolved' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500" />}
          </button>
        </div>

        {/* Filters */}
        <AlertFilters filters={filters} setFilters={setFilters} />

        {/* Bulk Actions */}
        <BulkActions 
          selectedCount={selectedIds.size} 
          totalVisible={paginatedAlerts.length}
          onSelectAll={(select) => setSelectedIds(select ? new Set(paginatedAlerts.map(a => a.id)) : new Set())}
          onAcknowledge={() => handleBulkAction('ack')}
          onEscalate={() => handleBulkAction('esc')}
          onDismiss={() => setDialogState({ type: 'dismiss', alertId: null })}
          onDeselectAll={() => setSelectedIds(new Set())}
        />

        {/* Main List Area */}
        <div className="flex-1 relative min-h-0">
          {paginatedAlerts.length > 0 ? (
            <div className="h-full overflow-y-auto styled-scrollbar pr-2 pb-4">
              <AlertList 
                alerts={paginatedAlerts}
                selectedIds={selectedIds}
                onToggleSelect={(id) => {
                  const newSet = new Set(selectedIds);
                  if (newSet.has(id)) newSet.delete(id); else newSet.add(id);
                  setSelectedIds(newSet);
                }}
                activeAlertId={activeAlertId}
                onAlertClick={(alert) => setActiveAlertId(alert.id)}
                onAcknowledge={handleAcknowledge}
                onEscalate={handleEscalate}
                onDismiss={(id) => setDialogState({ type: 'dismiss', alertId: id })}
                onFalsePositive={(id) => setDialogState({ type: 'fp', alertId: id })}
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {activeTab === 'active' ? (
                <>
                  <SearchX className="w-14 h-14 text-slate-300 dark:text-slate-600 mb-4" />
                  <h3 className="text-lg font-semibold text-slate-500 dark:text-slate-400">No alerts match your filters</h3>
                  <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Try adjusting your filter criteria or clearing all filters</p>
                  <button onClick={() => handleFilterUpdate('clear', 'all')} className="mt-4 px-4 py-2 border border-slate-200 dark:border-white/10 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                    Clear All Filters
                  </button>
                </>
              ) : (
                <>
                  <PartyPopper className="w-14 h-14 text-green-500/30 mb-4" />
                  <h3 className="text-lg font-semibold text-slate-500 dark:text-slate-400">No resolved alerts</h3>
                  <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Resolved and dismissed alerts will appear here</p>
                </>
              )}
            </div>
          )}

          {/* Detail Panel Overlay */}
          {activeAlertId && (
            <AlertDetailPanel 
              alert={alerts.find(a => a.id === activeAlertId)!}
              onClose={() => setActiveAlertId(null)}
              onAcknowledge={() => handleAcknowledge(activeAlertId)}
              onEscalate={() => handleEscalate(activeAlertId)}
              onResolve={() => handleResolve(activeAlertId)}
              onFalsePositive={() => setDialogState({ type: 'fp', alertId: activeAlertId })}
              onDismiss={() => setDialogState({ type: 'dismiss', alertId: activeAlertId })}
            />
          )}
        </div>

        {/* Pagination */}
        <AlertPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredAndSortedAlerts.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(n) => { setItemsPerPage(n); setCurrentPage(1); }}
        />

      </div>

      {/* Dialogs */}
      {dialogState.type === 'fp' && (
        <FalsePositiveDialog 
          nodeName={alerts.find(a => a.id === dialogState.alertId)?.nodeName || 'Selected Alerts'}
          onClose={() => setDialogState({ type: null, alertId: null })}
          onSubmit={handleFpSubmit}
        />
      )}
      
      {dialogState.type === 'dismiss' && (
        <DismissDialog 
          onClose={() => setDialogState({ type: null, alertId: null })}
          onSubmit={handleDismissSubmit}
        />
      )}

    </div>
  );
}
