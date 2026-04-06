import { useState } from 'react';
import { Target, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { topRiskEntities } from '../../lib/mock-data/dashboard-stats';

export function HighRiskTable() {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('Score (High→Low)');

  // Simple sorting logic based on the dropdown
  const sortedData = [...topRiskEntities].sort((a, b) => {
    switch(sortBy) {
      case 'Score (High→Low)': return b.score - a.score;
      case 'Score (Low→High)': return a.score - b.score;
      case 'Name (A→Z)': return a.name.localeCompare(b.name);
      case 'Provider': return a.provider.localeCompare(b.provider);
      case 'Type': return a.type.localeCompare(b.type);
      default: return b.score - a.score;
    }
  });

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
      case 'aws': return 'border-[#FF9900]/50 text-[#FF9900]';
      case 'azure': return 'border-[#0078D4]/50 text-[#0078D4]';
      case 'gcp': return 'border-[#EA4335]/50 text-[#EA4335]';
      default: return 'border-slate-500/50 text-slate-500';
    }
  };

  const getScoreColor = (score: number) => {
    if (score > 0.75) return 'bg-red-500 text-red-500';
    if (score > 0.50) return 'bg-orange-500 text-orange-500';
    if (score > 0.25) return 'bg-yellow-500 text-yellow-500';
    return 'bg-green-500 text-green-500';
  };

  const getSeverityStyle = (severity: string) => {
    switch(severity) {
      case 'critical': return 'bg-red-500/15 text-red-500 border-red-500/30';
      case 'high': return 'bg-orange-500/15 text-orange-500 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/15 text-yellow-500 border-yellow-500/30';
      default: return 'bg-green-500/15 text-green-500 border-green-500/30';
    }
  };

  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl flex flex-col h-full overflow-hidden">
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-white/10">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-[18px] h-[18px] text-indigo-500" /> Top 10 High-Risk Entities
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Entities with highest threat probability scores</p>
        </div>
        
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-[160px] px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border-none text-xs font-medium text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option>Score (High→Low)</option>
          <option>Score (Low→High)</option>
          <option>Name (A→Z)</option>
          <option>Provider</option>
          <option>Type</option>
        </select>
      </div>

      <div className="flex-1 overflow-x-auto">
        <div className="min-w-[700px]">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 dark:bg-[#1a1a24]/50 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 sticky top-0">
              <tr>
                <th className="p-3 w-[40px] text-center">#</th>
                <th className="p-3">Entity</th>
                <th className="p-3 w-[100px] text-center">Type</th>
                <th className="p-3 w-[100px] text-center">Provider</th>
                <th className="p-3 w-[160px]">Threat Score</th>
                <th className="p-3 w-[100px] text-center">Severity</th>
                <th className="p-3 w-[40px]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {sortedData.slice(0, 10).map((entity, idx) => {
                const scoreColorClass = getScoreColor(entity.score);
                const [bgColorClass, textColorClass] = scoreColorClass.split(' ');
                
                return (
                  <tr 
                    key={entity.id} 
                    onClick={() => navigate(`/reports/${entity.id}`)}
                    className={`cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors ${idx % 2 !== 0 ? 'bg-slate-50/30 dark:bg-white/[0.02]' : ''}`}
                  >
                    <td className="p-3 text-sm font-medium text-slate-400 text-center">{idx + 1}</td>
                    <td className="p-3">
                      <div className="text-sm font-medium text-slate-900 dark:text-white">{entity.name}</div>
                      <div className="text-xs text-slate-500">{entity.displayId}</div>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full border text-[11px] font-medium whitespace-nowrap ${getTypeStyle(entity.type)}`}>
                        {entity.type}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full border border-solid text-[11px] font-medium uppercase ${getProviderStyle(entity.provider)}`}>
                        {entity.provider}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-[80px] bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                          <div className={`h-full ${bgColorClass}`} style={{ width: `${entity.score * 100}%` }} />
                        </div>
                        <span className={`text-sm font-mono font-medium ${textColorClass}`}>
                          {entity.score.toFixed(2)}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full border text-[11px] font-medium capitalize ${getSeverityStyle(entity.severity)}`}>
                        {entity.severity}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <ChevronRight className="w-4 h-4 text-slate-400 opacity-50 group-hover:opacity-100" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-white/10 flex justify-between items-center bg-white/50 dark:bg-transparent">
        <span className="text-xs text-slate-500">Showing 10 of 26 flagged entities</span>
        <button onClick={() => navigate('/alerts')} className="text-xs font-medium text-indigo-500 hover:text-indigo-400 transition-colors">
          View All →
        </button>
      </div>
    </div>
  );
}
