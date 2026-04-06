import { type RiskReport } from '../../types/report';

interface ReportSummaryProps {
  report: RiskReport;
}

export function ReportSummary({ report }: ReportSummaryProps) {
  
  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'Critical': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const getSeverityText = (severity: string) => {
    switch(severity) {
      case 'Critical': return 'text-red-500';
      case 'High': return 'text-orange-500';
      case 'Medium': return 'text-yellow-500';
      default: return 'text-green-500';
    }
  };

  const getSeverityBg = (severity: string) => {
    switch(severity) {
      case 'Critical': return 'bg-red-500/15';
      case 'High': return 'bg-orange-500/15';
      case 'Medium': return 'bg-yellow-500/15';
      default: return 'bg-green-500/15';
    }
  };

  // Calculate SVG arc for gauge
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const arcLength = (circumference / 2); // Semi-circle
  const dashOffset = arcLength - (arcLength * report.threatScore);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      
      {/* Card 1: Gauge */}
      <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm">
        <div className="relative w-48 h-24 overflow-hidden flex justify-center mt-2">
          <svg className="w-48 h-48 transform -rotate-180" viewBox="0 0 160 160">
            {/* Background arc */}
            <circle
              cx="80" cy="80" r={radius}
              fill="none"
              stroke="currentColor"
              className="text-slate-100 dark:text-white/5"
              strokeWidth="16"
              strokeDasharray={`${arcLength} ${circumference}`}
            />
            {/* Value arc */}
            <circle
              cx="80" cy="80" r={radius}
              fill="none"
              className={getSeverityText(report.severity)}
              stroke="currentColor"
              strokeWidth="16"
              strokeDasharray={`${arcLength} ${circumference}`}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 1s ease-out' }}
            />
          </svg>
          
          <div className="absolute bottom-0 flex flex-col items-center">
            <span className="text-4xl font-bold text-slate-900 dark:text-white leading-none">
              {(report.threatScore * 100).toFixed(0)}
            </span>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <h3 className="font-semibold text-slate-900 dark:text-white">Threat Score</h3>
          <p className="text-xs text-slate-500 mt-0.5">Probability {report.threatScore.toFixed(2)}</p>
          <div className="text-xs font-medium mt-3 text-slate-600 dark:text-slate-300">
            Environment Classification: <span className={getSeverityText(report.severity)}>{report.severity}</span>
          </div>
        </div>
      </div>

      {/* Card 2: Metadata */}
      <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Report Metadata</h3>
        <div className="space-y-2.5">
          {[
            { label: 'Node ID', val: report.nodeId },
            { label: 'Node Type', val: report.nodeType },
            { label: 'Provider', val: report.provider },
            { label: 'First Seen', val: new Date(report.firstSeen).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' }) },
            { label: 'Compromise Time', val: report.compromiseTime || '—' },
            { label: 'Alert Source', val: 'Structural + Temporal Fusion' },
            { label: 'Related Alerts', val: report.relatedAlerts.toString() },
            { label: 'Cloud Account', val: report.cloudAccount || '—' },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center text-sm">
              <span className="text-slate-500">{item.label}</span>
              <span className="font-medium text-slate-900 dark:text-white truncate max-w-[140px]" title={item.val}>{item.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card 3: Summary */}
      <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6 flex flex-col shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Severity Summary</h3>
        
        <div className={`w-fit px-4 py-1.5 rounded-lg text-sm font-bold uppercase tracking-wider mb-4 border ${getSeverityBg(report.severity)} ${getSeverityText(report.severity)} border-${getSeverityColor(report.severity).split('-')[1]}-500/30`}>
          {report.severity} RISK
        </div>

        <ul className="space-y-2 flex-1">
          {report.analystInterpretation.slice(0, 3).map((point, i) => (
            <li key={i} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
              <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${getSeverityColor(report.severity)}`} />
              <span className="leading-snug">{point}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10 text-xs font-medium text-slate-500">
          Score increased by +0.12 in last 2 timesteps
        </div>
      </div>

    </div>
  );
}
