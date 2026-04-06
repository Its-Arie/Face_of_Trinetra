import { Download, FileSearch, ChevronRight } from 'lucide-react';
import { type RiskReport } from '../../types/report';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ReportTableProps {
  reports: RiskReport[];
}

export function ReportTable({ reports }: ReportTableProps) {
  const navigate = useNavigate();

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'Critical': return 'bg-red-500/15 text-red-500 border-red-500/30';
      case 'High': return 'bg-orange-500/15 text-orange-500 border-orange-500/30';
      case 'Medium': return 'bg-yellow-500/15 text-yellow-500 border-yellow-500/30';
      default: return 'bg-green-500/15 text-green-500 border-green-500/30';
    }
  };

  const getScoreColor = (score: number) => {
    if (score > 0.90) return 'text-red-500 bg-red-500';
    if (score > 0.75) return 'text-orange-500 bg-orange-500';
    if (score > 0.50) return 'text-yellow-500 bg-yellow-500';
    return 'text-green-500 bg-green-500';
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

  const getProviderStyle = (provider: string) => {
    switch(provider) {
      case 'AWS': return 'bg-[#FF9900]/15 text-[#FF9900]';
      case 'Azure': return 'bg-[#0078D4]/15 text-[#0078D4]';
      case 'GCP': return 'bg-[#EA4335]/15 text-[#EA4335]';
      default: return 'bg-slate-500/15 text-slate-500';
    }
  };

  const formatRelativeTime = (dateString: string) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  if (reports.length === 0) {
    return (
      <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl flex flex-col items-center justify-center py-24 shadow-sm">
        <FileSearch className="w-14 h-14 text-slate-400 dark:text-slate-600 mb-4 opacity-50" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">No reports found</h3>
        <p className="text-sm text-slate-500 mt-1">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 dark:bg-[#1a1a24]/50 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-white/10">
              <tr>
                <th className="p-4 w-[100px]">Report ID</th>
                <th className="p-4">Node</th>
                <th className="p-4 w-[100px] text-center">Type</th>
                <th className="p-4 w-[100px] text-center">Provider</th>
                <th className="p-4 w-[100px] text-center">Severity</th>
                <th className="p-4 w-[150px]">Threat Score</th>
                <th className="p-4 w-[140px]">Generated At</th>
                <th className="p-4 w-[100px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {reports.map((report) => {
                const scoreColorClass = getScoreColor(report.threatScore);
                const [textColorClass, bgColorClass] = scoreColorClass.split(' ');

                return (
                  <tr 
                    key={report.id}
                    onClick={() => navigate(`/reports/${report.nodeId}`)}
                    className={`group cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors ${
                      report.severity === 'Critical' || report.severity === 'High' 
                        ? `border-l-2 ${report.severity === 'Critical' ? 'border-l-red-500' : 'border-l-orange-500'}` 
                        : 'border-l-2 border-l-transparent'
                    }`}
                  >
                    <td className="p-4 text-xs font-mono text-slate-500">{report.id}</td>
                    <td className="p-4">
                      <div className="text-sm font-bold text-slate-900 dark:text-white">{report.nodeName}</div>
                      <div className="text-xs text-slate-500 truncate max-w-[200px]">{report.summary}</div>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-0.5 rounded-full border text-[10px] font-medium whitespace-nowrap ${getTypeStyle(report.nodeType)}`}>
                        {report.nodeType}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getProviderStyle(report.provider)}`}>
                        {report.provider}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase ${getSeverityColor(report.severity)}`}>
                        {report.severity}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-[60px] bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                          <div className={`h-full ${bgColorClass}`} style={{ width: `${report.threatScore * 100}%` }} />
                        </div>
                        <span className={`text-xs font-mono font-semibold ${textColorClass}`}>
                          {report.threatScore.toFixed(2)}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-xs text-slate-900 dark:text-white">
                        {new Date(report.generatedAt).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {formatRelativeTime(report.generatedAt)}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toast.success(`Exporting ${report.id} as JSON`);
                          }}
                          className="p-1.5 rounded-md text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
                          title="Export report"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-md text-slate-400 group-hover:text-indigo-500 transition-colors">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
