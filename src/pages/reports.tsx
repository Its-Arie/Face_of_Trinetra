import { useState, useEffect } from 'react';
import { Files, Download } from 'lucide-react';
import { mockRiskReports } from '../lib/mock-data/risk-reports';
import { ReportStats } from '../components/reports/report-stats';
import { ReportFilters } from '../components/reports/report-filters';
import { ReportTable } from '../components/reports/report-table';
import { ReportPagination } from '../components/reports/report-pagination';
import { BatchReportDialog } from '../components/reports/batch-report-dialog';
import { toast } from 'sonner';
import { PageSectionSkeleton } from '../components/loading/page-section-skeleton';
import { StatCardSkeleton } from '../components/loading/stat-card-skeleton';
import { TableSkeleton } from '../components/loading/table-skeleton';

export function Reports() {
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    severity: 'all',
    provider: 'all',
    type: 'all',
    date: '7d',
    search: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [batchDialogOpen, setBatchDialogOpen] = useState(false);
  const itemsPerPage = 10;

  // Simulate initial load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter logic
  const filteredReports = mockRiskReports.filter((report: any) => {
    if (filters.severity !== 'all' && report.severity !== filters.severity) return false;
    if (filters.provider !== 'all' && report.provider !== filters.provider) return false;
    if (filters.type !== 'all' && report.nodeType !== filters.type) return false;
    
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (!report.nodeName.toLowerCase().includes(q) && 
          !report.id.toLowerCase().includes(q) &&
          !report.provider.toLowerCase().includes(q) &&
          !report.nodeType.toLowerCase().includes(q)) {
        return false;
      }
    }
    
    // Date filter simulation (mock data generatedAt is recent)
    // For demo, we'll just let all pass unless it's a specific test case
    return true;
  });

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const currentReports = filteredReports.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const stats = {
    total: mockRiskReports.length,
    critical: mockRiskReports.filter((r: any) => r.severity === 'Critical').length,
    high: mockRiskReports.filter((r: any) => r.severity === 'High').length,
    today: 11 // Mock static value matching prompt
  };

  const handleExportAll = () => {
    toast.success('All reports exported as PDF');
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Risk Reports</h1>
          <p className="text-sm text-slate-500 mt-1 max-w-3xl">
            Explainable AI-generated threat reports with subgraph attribution, SHAP-style feature reasoning, and remediation guidance
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
          <button 
            onClick={handleExportAll}
            className="h-10 px-4 flex items-center justify-center text-sm font-medium rounded-lg border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" /> Export All PDF
          </button>
          <button 
            onClick={() => setBatchDialogOpen(true)}
            className="h-10 px-4 flex items-center justify-center text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 rounded-lg transition-all shadow-md shadow-indigo-500/20"
          >
            <Files className="w-4 h-4 mr-2" /> Generate Batch Report
          </button>
        </div>
      </div>

      {isLoading ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}
          </div>
          <PageSectionSkeleton />
          <TableSkeleton />
        </>
      ) : (
        <div className="animate-in fade-in duration-500">
          <ReportStats {...stats} />
          <ReportFilters 
            filters={filters} 
            setFilters={setFilters} 
            totalResults={currentReports.length} 
            totalAvailable={filteredReports.length} 
          />
          <ReportTable reports={currentReports} />
          <ReportPagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
          />
        </div>
      )}

      <BatchReportDialog isOpen={batchDialogOpen} onClose={() => setBatchDialogOpen(false)} />
    </div>
  );
}
