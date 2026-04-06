import { Bug } from 'lucide-react';
import { type RiskReport } from '../../types/report';

interface RelatedCVEsProps {
  report: RiskReport;
}

export function RelatedCVEs({ report }: RelatedCVEsProps) {
  const getCvssBadge = (cvss: number) => {
    if (cvss >= 9.0) return 'bg-red-500/15 text-red-500 border-red-500/30';
    if (cvss >= 7.0) return 'bg-orange-500/15 text-orange-500 border-orange-500/30';
    if (cvss >= 4.0) return 'bg-yellow-500/15 text-yellow-500 border-yellow-500/30';
    return 'bg-green-500/15 text-green-500 border-green-500/30';
  };

  const getPriorityColor = (priority: string) => {
    if (priority === 'Immediate') return 'text-red-500';
    if (priority === 'High') return 'text-orange-500';
    if (priority === 'Medium') return 'text-yellow-500';
    return 'text-slate-500';
  };

  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Bug className="w-[18px] h-[18px] text-indigo-500" /> Related Vulnerabilities
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">Known vulnerabilities associated with this report</p>
      </div>

      {report.relatedCVEs.length === 0 ? (
        <div className="py-6 text-center border border-dashed border-slate-200 dark:border-white/10 rounded-xl">
          <p className="text-sm text-slate-500">No direct CVE relationships found for this node</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead className="bg-slate-50/50 dark:bg-[#1a1a24]/50 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-white/10">
              <tr>
                <th className="p-3">CVE ID</th>
                <th className="p-3">Description</th>
                <th className="p-3 text-center">CVSS Score</th>
                <th className="p-3 text-center">Exploit Prob</th>
                <th className="p-3">Affected Asset</th>
                <th className="p-3">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {report.relatedCVEs.map((cve, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <td className="p-3 font-semibold text-sm text-slate-900 dark:text-white">{cve.cveId}</td>
                  <td className="p-3 text-xs text-slate-600 dark:text-slate-400 max-w-[250px] truncate" title={cve.description}>
                    {cve.description}
                  </td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full border text-[11px] font-bold ${getCvssBadge(cve.cvss)}`}>
                      {cve.cvss.toFixed(1)}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <div className="w-12 h-1.5 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500" style={{ width: `${cve.exploitProbability * 100}%` }} />
                      </div>
                      <span className="text-xs font-mono">{cve.exploitProbability.toFixed(2)}</span>
                    </div>
                  </td>
                  <td className="p-3 text-xs font-mono text-slate-500">{cve.affectedAsset}</td>
                  <td className={`p-3 text-xs font-bold uppercase ${getPriorityColor(cve.priority)}`}>
                    {cve.priority}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
