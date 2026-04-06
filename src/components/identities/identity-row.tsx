import { ChevronRight } from 'lucide-react';
import { type IdentityGroup, type CrossCloudActivity, type PivotAlert } from '../../types/identity';
import { IdentityExpanded } from './identity-expanded';

interface IdentityRowProps {
  group: IdentityGroup;
  isExpanded: boolean;
  onToggle: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  activities: CrossCloudActivity[];
  pivotAlerts: PivotAlert[];
  isHighlighted: boolean;
}

export function IdentityRow({ group, isExpanded, onToggle, activeTab, onTabChange, activities, pivotAlerts, isHighlighted }: IdentityRowProps) {
  
  const getRiskColor = (risk: string) => {
    switch(risk) {
      case 'critical': return 'bg-red-500/15 text-red-500 border-red-500/30';
      case 'high': return 'bg-orange-500/15 text-orange-500 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/15 text-yellow-500 border-yellow-500/30';
      default: return 'bg-green-500/15 text-green-500 border-green-500/30';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.90) return 'bg-green-500 text-green-500';
    if (score >= 0.75) return 'bg-blue-500 text-blue-500';
    if (score >= 0.50) return 'bg-amber-500 text-amber-500';
    return 'bg-red-500 text-red-500';
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'fully_linked': return <span className="px-2 py-0.5 rounded-full bg-green-500/15 text-green-500 text-[10px] font-bold">Fully Linked</span>;
      case 'partially_linked': return <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-500 text-[10px] font-bold">Partially Linked</span>;
      case 'unmapped': return <span className="px-2 py-0.5 rounded-full bg-red-500/15 text-red-500 text-[10px] font-bold">Unmapped</span>;
      default: return null;
    }
  };

  const scoreColorClass = getScoreColor(group.avg_similarity);
  const [bgClass, textClass] = scoreColorClass.split(' ');

  const hasHighRisk = group.risk_level === 'critical' || group.risk_level === 'high';
  const leftBorderColor = group.risk_level === 'critical' ? 'border-l-red-500' : 'border-l-orange-500';

  return (
    <>
      <tr 
        onClick={onToggle}
        className={`cursor-pointer transition-all duration-300 border-b border-slate-100 dark:border-white/5 
          ${isExpanded ? 'bg-slate-50 dark:bg-white/5' : 'hover:bg-slate-50/50 dark:hover:bg-white/[0.02]'}
          ${hasHighRisk ? `border-l-[3px] ${leftBorderColor}` : 'border-l-[3px] border-l-transparent'}
          ${isHighlighted ? 'bg-indigo-500/20 dark:bg-indigo-500/20' : ''}
        `}
      >
        <td className="p-3 w-8 text-center">
          <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
        </td>
        <td className="p-3 w-40 font-semibold text-slate-900 dark:text-white truncate" title={group.logical_name}>
          {group.logical_name}
        </td>
        
        {/* AWS */}
        <td className="p-3 w-48">
          {group.identities.aws ? (
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#FF9900] shrink-0" />
              <span className="font-mono text-sm text-slate-700 dark:text-slate-300 truncate" title={group.identities.aws.identity_id}>{group.identities.aws.identity_id}</span>
            </div>
          ) : (
            <span className="text-slate-400 dark:text-slate-600 font-mono text-sm">—</span>
          )}
        </td>

        {/* Azure */}
        <td className="p-3 w-48">
          {group.identities.azure ? (
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#0078D4] shrink-0" />
              <span className="font-mono text-sm text-slate-700 dark:text-slate-300 truncate" title={group.identities.azure.identity_id}>{group.identities.azure.identity_id}</span>
            </div>
          ) : (
            <span className="text-slate-400 dark:text-slate-600 font-mono text-sm">—</span>
          )}
        </td>

        {/* GCP */}
        <td className="p-3 w-48">
          {group.identities.gcp ? (
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#EA4335] shrink-0" />
              <span className="font-mono text-sm text-slate-700 dark:text-slate-300 truncate" title={group.identities.gcp.identity_id}>{group.identities.gcp.identity_id}</span>
            </div>
          ) : (
            <span className="text-slate-400 dark:text-slate-600 font-mono text-sm">—</span>
          )}
        </td>

        {/* Similarity */}
        <td className="p-3 w-32">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-12 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
              <div className={`h-full ${bgClass}`} style={{ width: `${group.avg_similarity * 100}%` }} />
            </div>
            <span className={`text-xs font-mono font-medium ${textClass}`}>{group.avg_similarity.toFixed(2)}</span>
          </div>
        </td>

        {/* Risk */}
        <td className="p-3 w-24">
          <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase ${getRiskColor(group.risk_level)}`}>
            {group.risk_level}
          </span>
        </td>

        {/* Status */}
        <td className="p-3 w-28">
          {getStatusBadge(group.linking_status)}
        </td>
      </tr>

      {/* Expanded Content */}
      {isExpanded && (
        <tr>
          <td colSpan={8} className="p-0 border-b border-slate-200 dark:border-white/10">
            <IdentityExpanded 
              group={group} 
              activities={activities} 
              pivotAlerts={pivotAlerts} 
              activeTab={activeTab} 
              onTabChange={onTabChange} 
            />
          </td>
        </tr>
      )}
    </>
  );
}
