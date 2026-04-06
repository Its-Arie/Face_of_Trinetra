import { useState } from 'react';
import { type IdentityGroup } from '../../types/identity';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface RiskScoreTableProps {
  groups: IdentityGroup[];
}

export function RiskScoreTable({ groups }: RiskScoreTableProps) {
  const navigate = useNavigate();
  const [sortParam, setSortParam] = useState('risk_desc');

  // Sort groups
  const sortedGroups = [...groups].sort((a, b) => {
    switch (sortParam) {
      case 'risk_desc': return b.risk_score - a.risk_score;
      case 'alpha': return a.logical_name.localeCompare(b.logical_name);
      case 'active': return b.total_actions_24h - a.total_actions_24h;
      default: return b.risk_score - a.risk_score;
    }
  });

  const getRiskColor = (risk: string) => {
    switch(risk) {
      case 'critical': return 'bg-red-500/15 text-red-500 border-red-500/30';
      case 'high': return 'bg-orange-500/15 text-orange-500 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/15 text-yellow-500 border-yellow-500/30';
      default: return 'bg-green-500/15 text-green-500 border-green-500/30';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.90) return 'bg-red-500 text-red-500';
    if (score >= 0.75) return 'bg-orange-500 text-orange-500';
    if (score >= 0.50) return 'bg-yellow-500 text-yellow-500';
    return 'bg-green-500 text-green-500';
  };

  const renderTrend = (trend: number) => {
    if (trend > 0) return <span className="text-red-500 flex items-center gap-1"><ChevronUp className="w-3 h-3" /> {trend.toFixed(2)}</span>;
    if (trend < 0) return <span className="text-green-500 flex items-center gap-1"><ChevronDown className="w-3 h-3" /> {Math.abs(trend).toFixed(2)}</span>;
    return <span className="text-slate-500 flex items-center gap-1">→ 0.00</span>;
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          ⚡ Identity Risk Assessment
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 hidden sm:inline">Sort by:</span>
          <select 
            value={sortParam}
            onChange={(e) => setSortParam(e.target.value)}
            className="w-[140px] h-8 px-2 rounded-lg bg-white dark:bg-[#12121a] border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="risk_desc">Highest Risk</option>
            <option value="alpha">Alphabetical</option>
            <option value="active">Most Active</option>
          </select>
        </div>
      </div>

      <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto styled-scrollbar">
          <div className="min-w-[800px]">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/50 dark:bg-[#1a1a24]/50 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="p-4 w-12 text-center">#</th>
                  <th className="p-4 w-36">Logical User</th>
                  <th className="p-4 w-28 text-center">Active Providers</th>
                  <th className="p-4 w-28 text-center hidden sm:table-cell">Total Actions (24h)</th>
                  <th className="p-4 w-28 text-center">Malicious Actions</th>
                  <th className="p-4 w-40">Risk Score</th>
                  <th className="p-4 w-24 text-center">Risk Level</th>
                  <th className="p-4 w-24 text-center hidden sm:table-cell">Trend</th>
                  <th className="p-4 w-20 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {sortedGroups.map((group, idx) => {
                  const scoreColorClass = getScoreColor(group.risk_score);
                  const [bgClass, textClass] = scoreColorClass.split(' ');
                  const isHighRisk = group.risk_level === 'critical' || group.risk_level === 'high';

                  return (
                    <tr key={group.group_id} className={`hover:bg-slate-50 dark:hover:bg-white/5 transition-colors ${isHighRisk ? 'border-l-[3px] border-l-red-500 bg-red-50/10 dark:bg-red-500/5' : 'border-l-[3px] border-l-transparent'}`}>
                      <td className="p-4 text-center">
                        <span className="text-xs font-medium text-slate-500">#{idx + 1}</span>
                      </td>
                      <td className="p-4 font-semibold text-slate-900 dark:text-white truncate" title={group.logical_name}>
                        {group.logical_name}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {group.identities.aws && <div className="w-2.5 h-2.5 rounded-full bg-[#FF9900]" title="AWS" />}
                          {group.identities.azure && <div className="w-2.5 h-2.5 rounded-full bg-[#0078D4]" title="Azure" />}
                          {group.identities.gcp && <div className="w-2.5 h-2.5 rounded-full bg-[#EA4335]" title="GCP" />}
                        </div>
                      </td>
                      <td className="p-4 text-center text-sm font-medium text-slate-700 dark:text-slate-300 hidden sm:table-cell">
                        {group.total_actions_24h}
                      </td>
                      <td className="p-4 text-center text-sm font-medium">
                        {group.malicious_actions_24h > 0 ? (
                          <span className="text-red-500">{group.malicious_actions_24h}</span>
                        ) : (
                          <span className="text-slate-400">0</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                            <div className={`h-full ${bgClass}`} style={{ width: `${group.risk_score * 100}%` }} />
                          </div>
                          <span className={`text-xs font-mono font-bold ${textClass}`}>{group.risk_score.toFixed(2)}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase ${getRiskColor(group.risk_level)}`}>
                          {group.risk_level}
                        </span>
                      </td>
                      <td className="p-4 text-center text-xs font-medium hidden sm:table-cell">
                        {renderTrend(group.risk_trend)}
                      </td>
                      <td className="p-4 text-center">
                        <button onClick={() => navigate(`/reports/${group.group_id}`)} className="px-3 py-1 text-xs font-medium border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 rounded transition-colors">
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
