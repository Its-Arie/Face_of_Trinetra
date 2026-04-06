import { type IdentityGroup } from '../../types/identity';

interface EmbeddingDetailsProps {
  group: IdentityGroup;
}

export function EmbeddingDetails({ group }: EmbeddingDetailsProps) {
  const getLevelColor = (level: string) => {
    switch(level) {
      case 'Very High': return 'bg-indigo-500';
      case 'High': return 'bg-green-500';
      case 'Medium': return 'bg-blue-500';
      default: return 'bg-slate-500';
    }
  };

  const getLevelLabel = (val: number) => {
    if (val >= 0.9) return 'Very High';
    if (val >= 0.7) return 'High';
    if (val >= 0.5) return 'Medium';
    return 'Low';
  };

  const renderPair = (label: string, val: number | null) => (
    <div className="flex items-center gap-3 mb-2">
      <span className="text-xs text-slate-500 w-[90px]">{label}</span>
      {val !== null ? (
        <>
          <span className="text-xs font-mono font-medium text-slate-900 dark:text-white w-8">{val.toFixed(2)}</span>
          <div className="flex-1 h-2 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500" style={{ width: `${val * 100}%` }} />
          </div>
          <span className="text-xs text-slate-500 w-10 text-right">({(val * 100).toFixed(0)}%)</span>
        </>
      ) : (
        <span className="text-xs text-slate-400 italic flex-1">N/A</span>
      )}
    </div>
  );

  return (
    <div className="p-4 bg-slate-50/50 dark:bg-black/20 rounded-b-lg border-t border-slate-200 dark:border-white/5 animate-in fade-in duration-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Col: Similarities */}
        <div>
          <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Pairwise Cosine Similarity</h4>
          {renderPair('AWS ↔ Azure:', group.pairwise_similarity.aws_azure)}
          {renderPair('AWS ↔ GCP:', group.pairwise_similarity.aws_gcp)}
          {renderPair('Azure ↔ GCP:', group.pairwise_similarity.azure_gcp)}
          
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-slate-500">Average Similarity:</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">{group.avg_similarity.toFixed(2)}</span>
            </div>
            <div className="text-[10px] text-slate-400 space-y-0.5 mt-2">
              <div>Embedding Dimensions: 128</div>
              <div>Training Method: Contrastive Learning (Margin α = 0.3)</div>
              <div>Last Updated: {new Date().toISOString().split('T')[0]}T14:00:00Z</div>
            </div>
          </div>
        </div>

        {/* Right Col: Features */}
        <div>
          <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Feature Contributions to Linking</h4>
          <div className="space-y-2.5">
            {[
              { label: 'Username pattern match', val: group.feature_contributions.username_pattern },
              { label: 'Login behavior overlap', val: group.feature_contributions.login_behavior },
              { label: 'Resource access pattern', val: group.feature_contributions.resource_access },
              { label: 'Time-of-day correlation', val: group.feature_contributions.time_correlation },
              { label: 'IP address overlap', val: group.feature_contributions.ip_overlap },
            ].map((f, i) => {
              const level = getLevelLabel(f.val);
              return (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 w-[140px] truncate">├─ {f.label}:</span>
                  <div className="flex-1 h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full ${getLevelColor(level)}`} style={{ width: `${f.val * 100}%` }} />
                  </div>
                  <span className={`text-[10px] font-medium w-16 ${getLevelColor(level).replace('bg-', 'text-')}`}>
                    {level}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
