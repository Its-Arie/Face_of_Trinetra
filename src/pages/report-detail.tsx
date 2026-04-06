import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, ShieldOff, FileSearch } from 'lucide-react';
import { mockRiskReports } from '../lib/mock-data/risk-reports';
import { toast } from 'sonner';

// Components
import { ReportSummary } from '../components/reports/report-summary';
import { ExplainerSubgraph } from '../components/reports/explainer-subgraph';
import { ShapAttribution } from '../components/reports/shap-attribution';
import { AttackNarrative } from '../components/reports/attack-narrative';
import { RelatedCVEs } from '../components/reports/related-cves';
import { RemediationList } from '../components/reports/remediation-list';
import { ReportHistory } from '../components/reports/report-history';
import { FalsePositiveDialog } from '../components/reports/false-positive-dialog';
import { PageSectionSkeleton } from '../components/loading/page-section-skeleton';

export function ReportDetail() {
  const { nodeId } = useParams<{ nodeId: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [falsePositiveOpen, setFalsePositiveOpen] = useState(false);

  useEffect(() => {
    // Reset loading state when nodeId changes
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [nodeId]);

  const report = mockRiskReports.find(r => r.nodeId === nodeId);

  if (isLoading) {
    return (
      <div className="space-y-6 pb-12 max-w-5xl mx-auto">
        <div className="w-32 h-8 bg-slate-200 dark:bg-white/5 rounded animate-pulse mb-6" />
        <div className="w-64 h-10 bg-slate-200 dark:bg-white/5 rounded animate-pulse mb-2" />
        <div className="w-48 h-5 bg-slate-200 dark:bg-white/5 rounded animate-pulse mb-6" />
        <PageSectionSkeleton />
        <PageSectionSkeleton />
        <PageSectionSkeleton />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center py-24 min-h-[60vh]">
        <FileSearch className="w-16 h-16 text-slate-400 dark:text-slate-600 mb-4 opacity-50" />
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Report not found</h2>
        <p className="text-sm text-slate-500 mt-2 mb-6">No explainability report exists for this node.</p>
        <button 
          onClick={() => navigate('/reports')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
        >
          Back to Reports
        </button>
      </div>
    );
  }

  const getSeverityStyle = (severity: string) => {
    switch(severity) {
      case 'Critical': return 'bg-red-500/15 text-red-500 border-red-500/30';
      case 'High': return 'bg-orange-500/15 text-orange-500 border-orange-500/30';
      case 'Medium': return 'bg-yellow-500/15 text-yellow-500 border-yellow-500/30';
      default: return 'bg-green-500/15 text-green-500 border-green-500/30';
    }
  };

  const getProviderStyle = (provider: string) => {
    switch(provider) {
      case 'AWS': return 'bg-[#FF9900]/15 text-[#FF9900] border-[#FF9900]/30';
      case 'Azure': return 'bg-[#0078D4]/15 text-[#0078D4] border-[#0078D4]/30';
      case 'GCP': return 'bg-[#EA4335]/15 text-[#EA4335] border-[#EA4335]/30';
      default: return 'bg-slate-500/15 text-slate-500 border-slate-500/30';
    }
  };

  const getTypeStyle = (type: string) => {
    switch(type) {
      case 'User': return 'bg-blue-500/15 text-blue-500 border-blue-500/30';
      case 'VM': return 'bg-green-500/15 text-green-500 border-green-500/30';
      case 'Container': return 'bg-orange-500/15 text-orange-500 border-orange-500/30';
      case 'IP': return 'bg-red-500/15 text-red-500 border-red-500/30';
      case 'Role': return 'bg-purple-500/15 text-purple-500 border-purple-500/30';
      case 'CVE': return 'bg-yellow-500/15 text-yellow-500 border-yellow-500/30';
      default: return 'bg-gray-500/15 text-gray-500 border-gray-500/30';
    }
  };

  const handleExport = (format: string) => {
    toast.success(`Exporting report as ${format.toUpperCase()}`);
  };

  const formatRelativeTime = (dateString: string) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="space-y-6 pb-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b border-slate-200 dark:border-white/10">
        <div>
          <button 
            onClick={() => navigate('/reports')}
            className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Reports
          </button>
          
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white break-all">{report.nodeName}</h1>
          
          <div className="flex flex-wrap gap-2 mt-3">
            <span className={`px-2.5 py-0.5 rounded-full border text-xs font-medium uppercase ${getTypeStyle(report.nodeType)}`}>
              {report.nodeType}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full border text-xs font-bold uppercase ${getProviderStyle(report.provider)}`}>
              {report.provider}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full border text-xs font-bold uppercase ${getSeverityStyle(report.severity)}`}>
              {report.severity}
            </span>
            {report.attackType !== 'Unclassified' && (
              <span className="px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-xs font-medium text-slate-700 dark:text-slate-300">
                {report.attackType}
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-xs text-slate-500">
            <span>Report ID: <span className="font-mono">{report.id}</span></span>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span>Generated: {new Date(report.generatedAt).toLocaleString()}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span>Updated: {formatRelativeTime(report.updatedAt)}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto shrink-0">
          <button onClick={() => handleExport('pdf')} className="h-9 px-4 flex-1 lg:flex-none items-center justify-center text-sm font-medium rounded-lg border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
            <Download className="w-4 h-4 mr-2 inline" /> PDF
          </button>
          <button onClick={() => handleExport('json')} className="h-9 px-4 flex-1 lg:flex-none items-center justify-center text-sm font-medium rounded-lg border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
            <Download className="w-4 h-4 mr-2 inline" /> JSON
          </button>
          <button onClick={() => setFalsePositiveOpen(true)} className="h-9 px-4 flex-1 lg:flex-none items-center justify-center text-sm font-medium rounded-lg border border-red-500/50 text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
            <ShieldOff className="w-4 h-4 mr-2 inline" /> Mark False Positive
          </button>
        </div>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
        <ReportSummary report={report} />
      </div>
      
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100 fill-mode-both">
        <ExplainerSubgraph report={report} />
      </div>
      
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200 fill-mode-both">
        <ShapAttribution report={report} />
      </div>
      
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 fill-mode-both">
        <AttackNarrative report={report} />
      </div>
      
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400 fill-mode-both">
        <RelatedCVEs report={report} />
      </div>
      
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500 fill-mode-both">
        <RemediationList report={report} />
      </div>
      
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-600 fill-mode-both">
        <ReportHistory report={report} />
      </div>

      <FalsePositiveDialog 
        isOpen={falsePositiveOpen} 
        nodeName={report.nodeName} 
        onClose={() => setFalsePositiveOpen(false)} 
      />
    </div>
  );
}
