import { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { type IdentityGroup, type CrossCloudActivity, type PivotAlert } from '../../types/identity';
import { IdentityRow } from './identity-row';

interface IdentityTableProps {
  groups: IdentityGroup[];
  activities: Record<string, CrossCloudActivity[]>;
  pivotAlerts: PivotAlert[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  statusFilter: string;
  setStatusFilter: (f: string) => void;
  riskFilter: string;
  setRiskFilter: (f: string) => void;
  expandedGroupId: string | null;
  setExpandedGroupId: (id: string | null) => void;
  expandedTab: string;
  setExpandedTab: (t: string) => void;
  highlightedGroupId: string | null;
}

type SortConfig = { key: keyof IdentityGroup; direction: 'asc' | 'desc' };

export function IdentityTable({ 
  groups, activities, pivotAlerts,
  searchQuery, setSearchQuery, statusFilter, setStatusFilter, riskFilter, setRiskFilter,
  expandedGroupId, setExpandedGroupId, expandedTab, setExpandedTab, highlightedGroupId
}: IdentityTableProps) {
  
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'risk_score', direction: 'desc' });

  // Filter and sort
  const filteredAndSortedGroups = useMemo(() => {
    let result = groups.filter(g => {
      // Status
      if (statusFilter !== 'all' && g.linking_status !== statusFilter) return false;
      // Risk
      if (riskFilter !== 'all' && g.risk_level !== riskFilter) return false;
      // Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (g.logical_name.toLowerCase().includes(q)) return true;
        if (g.identities.aws?.identity_id.toLowerCase().includes(q)) return true;
        if (g.identities.azure?.identity_id.toLowerCase().includes(q)) return true;
        if (g.identities.gcp?.identity_id.toLowerCase().includes(q)) return true;
        if (g.identities.aws?.email?.toLowerCase().includes(q)) return true;
        if (g.identities.azure?.email?.toLowerCase().includes(q)) return true;
        if (g.identities.gcp?.email?.toLowerCase().includes(q)) return true;
        return false;
      }
      return true;
    });

    result.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortConfig.direction === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });

    return result;
  }, [groups, searchQuery, statusFilter, riskFilter, sortConfig]);

  const handleSort = (key: keyof IdentityGroup) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const SortIcon = ({ columnKey }: { columnKey: keyof IdentityGroup }) => {
    if (sortConfig.key !== columnKey) return null;
    return sortConfig.direction === 'asc' ? <ChevronUp className="w-3 h-3 inline ml-1" /> : <ChevronDown className="w-3 h-3 inline ml-1" />;
  };

  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl flex flex-col h-full overflow-hidden shadow-sm">
      
      {/* Header Controls */}
      <div className="p-4 sm:p-5 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 border-b border-slate-200 dark:border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Identity Mappings</h2>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-500">
            {filteredAndSortedGroups.length} groups
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto">
          <div className="relative flex-1 min-w-[200px] xl:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search identities..." 
              className="w-full pl-9 pr-4 h-9 rounded-lg bg-slate-100 dark:bg-white/5 border-none text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white"
            />
          </div>

          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-36 h-9 px-3 rounded-lg bg-slate-100 dark:bg-white/5 border-none text-sm text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="fully_linked">Fully Linked</option>
            <option value="partially_linked">Partially Linked</option>
            <option value="unmapped">Unmapped</option>
          </select>

          <select 
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="w-32 h-9 px-3 rounded-lg bg-slate-100 dark:bg-white/5 border-none text-sm text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Risks</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto styled-scrollbar relative">
        <div className="min-w-[1000px]">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 dark:bg-[#1a1a24]/50 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 sticky top-0 z-10">
              <tr>
                <th className="p-3 w-8"></th>
                <th className="p-3 w-40 cursor-pointer hover:text-slate-700 dark:hover:text-slate-200" onClick={() => handleSort('logical_name')}>
                  Logical User <SortIcon columnKey="logical_name" />
                </th>
                <th className="p-3 w-48">AWS Identity</th>
                <th className="p-3 w-48">Azure Identity</th>
                <th className="p-3 w-48">GCP Identity</th>
                <th className="p-3 w-32 cursor-pointer hover:text-slate-700 dark:hover:text-slate-200" onClick={() => handleSort('avg_similarity')}>
                  Similarity <SortIcon columnKey="avg_similarity" />
                </th>
                <th className="p-3 w-24 cursor-pointer hover:text-slate-700 dark:hover:text-slate-200" onClick={() => handleSort('risk_score')}>
                  Risk Level <SortIcon columnKey="risk_score" />
                </th>
                <th className="p-3 w-28 cursor-pointer hover:text-slate-700 dark:hover:text-slate-200" onClick={() => handleSort('linking_status')}>
                  Status <SortIcon columnKey="linking_status" />
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedGroups.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500">No identities match your filters</td>
                </tr>
              ) : (
                filteredAndSortedGroups.map(group => (
                  <IdentityRow 
                    key={group.group_id}
                    group={group}
                    isExpanded={expandedGroupId === group.group_id}
                    onToggle={() => setExpandedGroupId(expandedGroupId === group.group_id ? null : group.group_id)}
                    activeTab={expandedTab}
                    onTabChange={setExpandedTab}
                    activities={activities[group.group_id] || []}
                    pivotAlerts={pivotAlerts.filter(a => a.logical_user === group.logical_name)}
                    isHighlighted={highlightedGroupId === group.group_id}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
