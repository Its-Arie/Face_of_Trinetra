import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

// Components
import { VulnStatCards } from './vuln-stat-cards';
import { RiskMatrix } from './risk-matrix';
import { NERSummary } from './ner-summary';
import { CVETable } from './cve-table';
import { CVEDetailSheet } from './cve-detail-sheet';
import { CVSSDistributionChart } from './cvss-distribution-chart';
import { CVEEmbeddingScatter } from './cve-embedding-scatter';

// Skeletons
import { StatCardSkeleton } from '../loading/stat-card-skeleton';
import { ChartSkeleton } from '../loading/chart-skeleton';
import { TableSkeleton } from '../loading/table-skeleton';
import { FeedSkeleton } from '../loading/feed-skeleton';

// Data
import { mockCVEs } from '../../lib/mock-data/cve-data';
import { type CVEEntry } from '../../types/cve';

export function VulnPageClient() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [updatedSecondsAgo, setUpdatedSecondsAgo] = useState(0);
  
  const [filters, setFilters] = useState({
    search: '',
    severity: 'all',
    provider: 'all',
    status: 'all',
    sort: 'cvss_desc'
  });
  
  const [selectedCVE, setSelectedCVE] = useState<CVEEntry | null>(null);

  // Initial load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Lock body scroll when detail panel is open
  useEffect(() => {
    if (selectedCVE) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCVE]);
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
      toast.success('Vulnerability data refreshed');
    }, 500);
  };

  // Filter logic
  const filteredCVEs = mockCVEs.filter(cve => {
    if (filters.severity !== 'all' && cve.severity !== filters.severity) return false;
    if (filters.provider !== 'all' && cve.provider !== filters.provider) return false;
    if (filters.status !== 'all' && cve.status !== filters.status) return false;
    
    if (filters.search) {
      const q = filters.search.toLowerCase();
      return cve.id.toLowerCase().includes(q) || 
             cve.description.toLowerCase().includes(q) || 
             cve.affectedSoftware.toLowerCase().includes(q);
    }
    return true;
  }).sort((a, b) => {
    switch(filters.sort) {
      case 'cvss_desc': return b.cvssScore - a.cvssScore;
      case 'cvss_asc': return a.cvssScore - b.cvssScore;
      case 'prob_desc': return b.exploitProbability - a.exploitProbability;
      case 'id_asc': return a.id.localeCompare(b.id);
      case 'nodes_desc': return b.affectedNodes.length - a.affectedNodes.length;
      default: return b.cvssScore - a.cvssScore;
    }
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Vulnerability Intelligence</h1>
          <p className="text-sm text-slate-500 mt-0.5">CVE risk scoring, NER extraction, and embedding-based vulnerability analysis via Stage 3a and Stage 3b</p>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 min-w-[120px] text-right">
            Last updated: {updatedSecondsAgo < 2 ? 'just now' : `${updatedSecondsAgo}s ago`}
          </span>
          <button 
            onClick={handleRefresh}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-sm border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-indigo-500' : ''}`} />
          </button>
        </div>
      </div>

      <div className={`transition-opacity duration-300 ${isRefreshing ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        
        {/* Stat Cards */}
        <div className="mb-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Array.from({ length: 5 }).map((_, i) => <StatCardSkeleton key={i} />)}
            </div>
          ) : (
            <VulnStatCards />
          )}
        </div>

        {/* Two Column Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
          <div className="lg:col-span-3">
            {isLoading ? <ChartSkeleton /> : <RiskMatrix />}
          </div>
          <div className="lg:col-span-2">
            {isLoading ? <FeedSkeleton /> : <NERSummary />}
          </div>
        </div>

        {/* Table */}
        <div className="mb-6 relative z-10">
          {isLoading ? <TableSkeleton /> : (
            <CVETable 
              cves={filteredCVEs} 
              onRowClick={setSelectedCVE} 
              filters={filters} 
              setFilters={setFilters} 
            />
          )}
          
          {/* Detail Sheet Overlay (Row-anchored via absolute positioning inside relative container) */}
          {selectedCVE && (
            <>
              <div className="fixed inset-0 bg-background/50 backdrop-blur-sm z-40" onClick={() => setSelectedCVE(null)} />
              <div className="absolute top-12 right-0 z-50">
                <CVEDetailSheet cve={selectedCVE} onClose={() => setSelectedCVE(null)} />
              </div>
            </>
          )}
        </div>

        {/* Two Column Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
          <div className="lg:col-span-3">
            {isLoading ? <ChartSkeleton /> : <CVSSDistributionChart cves={mockCVEs} />}
          </div>
          <div className="lg:col-span-2 hidden md:block">
            {isLoading ? <ChartSkeleton /> : <CVEEmbeddingScatter cves={mockCVEs} />}
          </div>
          <div className="md:hidden lg:col-span-2 p-6 rounded-2xl border border-dashed border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 text-sm">
            View on desktop to see t-SNE embedding visualization
          </div>
        </div>

      </div>
    </div>
  );
}
