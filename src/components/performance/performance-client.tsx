import { useState, useEffect } from 'react';
import { RefreshCw, Download, BarChart2 } from 'lucide-react';
import { toast } from 'sonner';

// Components
import { PerformanceStats } from './performance-stats';
import { ModelCards } from './model-cards';
import { AblationChart } from './ablation-chart';
import { ComparisonTable } from './comparison-table';
import { ScalabilityCards } from './scalability-cards';
import { LossCurves } from './loss-curves';
import { PerformanceNotes } from './performance-notes';

// Skeletons
import { PageSectionSkeleton } from '../loading/page-section-skeleton';
import { StatCardSkeleton } from '../loading/stat-card-skeleton';
import { ChartSkeleton } from '../loading/chart-skeleton';

export function PerformanceClient() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [updatedSecondsAgo, setUpdatedSecondsAgo] = useState(0);

  // Initial load simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Timer for "Updated Xs ago"
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
      toast.success('Performance metrics refreshed');
    }, 600);
  };

  const handleExport = () => {
    toast.success('Metrics exported as CSV');
  };

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto">
      
      {/* SECTION 1: Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart2 className="w-6 h-6 text-indigo-500" /> Model Performance
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-3xl">
            Evaluation metrics, ablation results, and scalability analysis for the RGCN, GRU-GNN, and Fusion risk models
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-xs text-slate-500 min-w-[120px] text-right hidden sm:block">
            {updatedSecondsAgo < 2 ? 'Updated just now' : `Last updated: ${updatedSecondsAgo}s ago`}
          </span>

          <button 
            onClick={handleRefresh}
            className="h-9 px-3 flex items-center text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin text-indigo-500' : ''}`} />
            Refresh
          </button>

          <button 
            onClick={handleExport}
            className="h-9 px-3 flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Metrics
          </button>
        </div>
      </div>

      <div className={`transition-opacity duration-300 ${isRefreshing ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        
        {/* SECTION 2: Summary Stats */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}
          </div>
        ) : (
          <PerformanceStats />
        )}

        {/* SECTION 3: Model Cards */}
        <div className="mt-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => <PageSectionSkeleton key={i} />)}
            </div>
          ) : (
            <ModelCards />
          )}
        </div>

        {/* SECTION 4: Ablation Comparison */}
        <div className="mt-8 bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Ablation & Baseline Comparison</h2>
            <p className="text-xs text-slate-500 mt-1">Comparison across rule-based and graph-based approaches</p>
          </div>
          {isLoading ? (
            <ChartSkeleton />
          ) : (
            <>
              <AblationChart />
              <ComparisonTable />
            </>
          )}
        </div>

        {/* SECTION 5: Scalability */}
        <div className="mt-8">
          <div className="mb-4 px-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">System Scalability Metrics</h2>
            <p className="text-xs text-slate-500 mt-1">Operational throughput and latency characteristics</p>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}
            </div>
          ) : (
            <ScalabilityCards />
          )}
        </div>

        {/* SECTION 6: Loss Curves */}
        <div className="mt-8 bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Training Loss Curves</h2>
            <p className="text-xs text-slate-500 mt-1">Model convergence behavior across training epochs</p>
          </div>
          {isLoading ? (
            <ChartSkeleton />
          ) : (
            <LossCurves />
          )}
        </div>

        {/* SECTION 7: Interpretation Notes */}
        {!isLoading && (
          <div className="mt-8">
            <PerformanceNotes />
          </div>
        )}

      </div>
    </div>
  );
}
