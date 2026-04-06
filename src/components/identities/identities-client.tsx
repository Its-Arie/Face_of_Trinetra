import { useState, useEffect } from 'react';
import { RefreshCw, Download } from 'lucide-react';
import { toast } from 'sonner';

// Data
import { mockIdentityGroups, mockUnmappedIdentities, mockCrossCloudActivities, mockEmbeddingPoints, mockPivotAlerts } from '../../lib/mock-data/identity-mappings';

// Components
import { IdentityStats } from './identity-stats';
import { UnmappedWarning } from './unmapped-warning';
import { IdentityTable } from './identity-table';
import { EmbeddingScatter } from './embedding-scatter';
import { PivotAlerts } from './pivot-alerts';
import { RiskScoreTable } from './risk-score-table';
import { PageSectionSkeleton } from '../loading/page-section-skeleton';

export function IdentitiesClient() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [updatedSecondsAgo, setUpdatedSecondsAgo] = useState(0);

  // Table State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [expandedGroupId, setExpandedGroupId] = useState<string | null>(null);
  const [expandedTab, setExpandedTab] = useState('embedding');
  const [highlightedGroupId, setHighlightedGroupId] = useState<string | null>(null);

  // Warning State
  const [warningDismissed, setWarningDismissed] = useState(false);

  // Initial Load Simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Update Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setUpdatedSecondsAgo(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setUpdatedSecondsAgo(0);
      toast.success('Identity data refreshed');
    }, 1000);
  };

  const handleExport = () => {
    toast.success('Identity mappings exported as CSV');
  };

  const handlePointClick = (groupId: string) => {
    if (groupId.startsWith('unmapped')) return; // Outliers don't have table rows
    
    setExpandedGroupId(groupId);
    setExpandedTab('embedding');
    setHighlightedGroupId(groupId);
    
    // Clear highlight after 1s
    setTimeout(() => {
      setHighlightedGroupId(null);
    }, 1000);

    // Note: Scroll into view would be handled by a ref on the row in a full implementation,
    // but React Router structure makes it complex without deep prop drilling.
    // For this scope, highlighting and expanding is sufficient.
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageSectionSkeleton />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3"><PageSectionSkeleton /></div>
          <div className="lg:col-span-2"><PageSectionSkeleton /></div>
        </div>
        <PageSectionSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Cross-Cloud Identity Management</h1>
          <p className="text-sm text-slate-500 mt-0.5">Track and verify identity linking across AWS, Azure, and GCP using contrastive embeddings</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-xs text-slate-500 hidden sm:inline">
            {updatedSecondsAgo < 2 ? 'Last updated: just now' : `Last updated: ${updatedSecondsAgo}s ago`}
          </span>
          <button onClick={handleRefresh} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
            <RefreshCw className={`w-4 h-4 text-slate-500 ${isRefreshing ? 'animate-spin text-indigo-500' : ''}`} />
          </button>
          <button onClick={handleExport} className="h-9 px-3 flex items-center text-sm font-medium rounded-md hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 transition-colors">
            <Download className="w-3.5 h-3.5 mr-1.5" /> Export Mappings
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className={`transition-opacity duration-300 ${isRefreshing ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        <IdentityStats />
      </div>

      {/* Unmapped Warning */}
      {!warningDismissed && mockUnmappedIdentities.length > 0 && (
        <UnmappedWarning onDismiss={() => setWarningDismissed(true)} />
      )}

      {/* Two Column Layout: Table & Scatter Plot */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 h-[500px] lg:h-[600px]">
          <IdentityTable 
            groups={mockIdentityGroups}
            activities={mockCrossCloudActivities}
            pivotAlerts={mockPivotAlerts}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            riskFilter={riskFilter}
            setRiskFilter={setRiskFilter}
            expandedGroupId={expandedGroupId}
            setExpandedGroupId={setExpandedGroupId}
            expandedTab={expandedTab}
            setExpandedTab={setExpandedTab}
            highlightedGroupId={highlightedGroupId}
          />
        </div>
        <div className="lg:col-span-2 h-[400px] lg:h-[600px]">
          <EmbeddingScatter 
            points={mockEmbeddingPoints}
            onPointClick={handlePointClick}
          />
        </div>
      </div>

      {/* Pivot Alerts */}
      <PivotAlerts alerts={mockPivotAlerts} />

      {/* Risk Score Table */}
      <RiskScoreTable groups={mockIdentityGroups} />

    </div>
  );
}
