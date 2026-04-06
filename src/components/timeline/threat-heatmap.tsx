import { useState } from 'react';
import { type HeatmapData } from '../../types/timeline';
import { getThreatColor } from '../../lib/utils';

interface ThreatHeatmapProps {
  currentTimestep: number;
  setCurrentTimestep: (t: number) => void;
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string) => void;
  heatmapData: HeatmapData[];
}

export function ThreatHeatmap({ currentTimestep, setCurrentTimestep, selectedNodeId, setSelectedNodeId, heatmapData }: ThreatHeatmapProps) {
  const [showCount, setShowCount] = useState(15);
  
  const displayData = heatmapData.slice(0, showCount);

  const getProviderDot = (provider: string) => {
    switch(provider) {
      case 'aws': return 'bg-[#FF9900]';
      case 'azure': return 'bg-[#0078D4]';
      case 'gcp': return 'bg-[#EA4335]';
      default: return 'bg-slate-500';
    }
  };

  const getTypeDot = (type: string) => {
    switch(type) {
      case 'user': return 'bg-blue-500';
      case 'vm': return 'bg-green-500';
      case 'container': return 'bg-orange-500';
      case 'ip': return 'bg-red-500';
      case 'role': return 'bg-purple-500';
      case 'cve': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl flex flex-col overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-white/10 flex justify-between items-center bg-white/50 dark:bg-transparent">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Threat Probability Heatmap</h3>
          <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">Node threat scores across all 20 timesteps. Click any cell to select.</p>
        </div>
        <select 
          value={showCount} 
          onChange={(e) => setShowCount(Number(e.target.value))}
          className="h-8 px-2 rounded-md bg-slate-100 dark:bg-white/5 border-none text-xs font-medium text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value={10}>Top 10</option>
          <option value={15}>Top 15</option>
          <option value={20}>Top 20</option>
        </select>
      </div>

      <div className="overflow-x-auto styled-scrollbar">
        <div className="min-w-max p-4">
          <div className="grid" style={{ gridTemplateColumns: '160px repeat(20, minmax(28px, 1fr))' }}>
            
            {/* Header Row */}
            <div className="sticky left-0 bg-white/95 dark:bg-[#12121a]/95 backdrop-blur-sm z-10 p-2 border-b border-slate-200 dark:border-white/10" />
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className={`p-2 text-center text-xs font-mono text-slate-500 border-b border-slate-200 dark:border-white/10 ${i === currentTimestep ? 'bg-indigo-500/10 font-bold text-indigo-500' : ''}`}>
                {i}
              </div>
            ))}

            {/* Data Rows */}
            {displayData.map((row) => (
              <React.Fragment key={row.node_id}>
                {/* Fixed Label Column */}
                <div className={`sticky left-0 bg-white/95 dark:bg-[#12121a]/95 backdrop-blur-sm z-10 p-2 flex items-center gap-2 border-r border-slate-200 dark:border-white/10 ${selectedNodeId === row.node_id ? 'bg-slate-50 dark:bg-white/5' : ''}`}>
                  <div className={`w-2 h-2 rounded-full shrink-0 ${getTypeDot(row.node_type)}`} />
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${getProviderDot(row.provider)}`} />
                  <span className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 truncate w-full" title={row.node_id}>
                    {row.node_id}
                  </span>
                </div>

                {/* Heatmap Cells */}
                {row.threat_probabilities.map((prob, i) => {
                  const isSelected = selectedNodeId === row.node_id && currentTimestep === i;
                  const isCurrentCol = currentTimestep === i;
                  return (
                    <div 
                      key={i} 
                      onClick={() => {
                        setCurrentTimestep(i);
                        setSelectedNodeId(row.node_id);
                      }}
                      className={`p-0.5 cursor-pointer relative group ${isCurrentCol && !isSelected ? 'bg-indigo-500/10' : ''}`}
                    >
                      <div 
                        className={`w-full h-6 sm:h-8 rounded-sm border border-black/10 dark:border-white/10 transition-all duration-200 ${isSelected ? 'ring-2 ring-white scale-110 z-10 shadow-lg' : 'hover:ring-2 hover:ring-white/50 hover:scale-110 hover:z-10'}`}
                        style={{ backgroundColor: getThreatColor(prob) }}
                      >
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block z-50 bg-slate-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap pointer-events-none">
                          t={i} • {prob.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
