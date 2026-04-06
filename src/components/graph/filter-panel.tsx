import { useState, useEffect } from 'react';
import { Search, PanelLeftClose, PanelLeftOpen, RotateCcw, Route } from 'lucide-react';
import { type GraphFilterState } from '../../types/graph';
import { mockGraphNodes } from '../../lib/mock-data/graph-nodes';

interface FilterPanelProps {
  filters: GraphFilterState;
  setFilters: React.Dispatch<React.SetStateAction<GraphFilterState>>;
  isMobile: boolean;
  onCloseMobile?: () => void;
}

const NODE_TYPES = [
  { id: 'user', label: 'User', color: 'bg-blue-500' },
  { id: 'vm', label: 'VM', color: 'bg-green-500' },
  { id: 'container', label: 'Container', color: 'bg-orange-500' },
  { id: 'ip', label: 'IP', color: 'bg-red-500' },
  { id: 'role', label: 'Role', color: 'bg-purple-500' },
  { id: 'cve', label: 'CVE', color: 'bg-yellow-500' },
  { id: 'cloudAccount', label: 'CloudAccount', color: 'bg-gray-400' },
];

const EDGE_TYPES = [
  { id: 'assumes_role', label: 'ASSUMES_ROLE', color: 'bg-purple-400' },
  { id: 'access', label: 'ACCESS', color: 'bg-blue-400' },
  { id: 'connects_to', label: 'CONNECTS_TO', color: 'bg-green-400' },
  { id: 'exploits', label: 'EXPLOITS', color: 'bg-red-400' },
  { id: 'has_vulnerability', label: 'HAS_VULNERABILITY', color: 'bg-yellow-400' },
  { id: 'deployed_on', label: 'DEPLOYED_ON', color: 'bg-orange-400' },
  { id: 'belongs_to', label: 'BELONGS_TO', color: 'bg-gray-400' },
  { id: 'cross_cloud_access', label: 'CROSS_CLOUD_ACCESS', color: 'bg-amber-500' },
  { id: 'authenticates_as', label: 'AUTHENTICATES_AS', color: 'bg-teal-400' },
  { id: 'routes_to', label: 'ROUTES_TO', color: 'bg-cyan-400' },
];

const PROVIDERS = [
  { id: 'aws', label: 'AWS', color: 'bg-[#FF9900]' },
  { id: 'azure', label: 'Azure', color: 'bg-[#0078D4]' },
  { id: 'gcp', label: 'GCP', color: 'bg-[#EA4335]' },
];

export function FilterPanel({ filters, setFilters, isMobile, onCloseMobile }: FilterPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showEdgeFilters, setShowEdgeFilters] = useState(false);
  const [searchInput, setSearchInput] = useState(filters.search);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(prev => ({ ...prev, search: searchInput }));
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput, setFilters]);

  const toggleNodeType = (type: string) => {
    setFilters(prev => ({
      ...prev,
      nodeTypes: prev.nodeTypes.includes(type)
        ? prev.nodeTypes.filter(t => t !== type)
        : [...prev.nodeTypes, type]
    }));
  };

  const toggleEdgeType = (type: string) => {
    setFilters(prev => ({
      ...prev,
      edgeTypes: prev.edgeTypes.includes(type)
        ? prev.edgeTypes.filter(t => t !== type)
        : [...prev.edgeTypes, type]
    }));
  };

  const toggleProvider = (provider: string) => {
    setFilters(prev => ({
      ...prev,
      providers: prev.providers.includes(provider)
        ? prev.providers.filter(p => p !== provider)
        : [...prev.providers, provider]
    }));
  };

  const handleScoreRangeChange = (e: React.ChangeEvent<HTMLInputElement>, index: 0 | 1) => {
    const val = parseFloat(e.target.value);
    setFilters(prev => {
      const newRange = [...prev.scoreRange] as [number, number];
      newRange[index] = val;
      return { ...prev, scoreRange: newRange };
    });
  };

  const resetFilters = () => {
    setSearchInput('');
    setFilters({
      search: '',
      nodeTypes: NODE_TYPES.map(t => t.id),
      edgeTypes: EDGE_TYPES.map(t => t.id),
      providers: PROVIDERS.map(p => p.id),
      scoreRange: [0, 1],
      temporalSnapshot: 't19',
      layout: 'cose',
      attackPathHighlight: false
    });
  };

  // If mobile and not visible, just render null (handled by parent Sheet usually, but safe here)
  if (isMobile && onCloseMobile) {
    // Mobile renders full content
  }

  if (isCollapsed && !isMobile) {
    return (
      <div className="w-12 h-full bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border-r border-slate-200 dark:border-white/10 flex flex-col items-center py-4 z-10 transition-all duration-300">
        <button onClick={() => setIsCollapsed(false)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
          <PanelLeftOpen className="w-5 h-5 text-slate-500" />
        </button>
      </div>
    );
  }

  const content = (
    <div className="w-72 h-full bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border-r border-slate-200 dark:border-white/10 flex flex-col z-10 transition-all duration-300 overflow-hidden shrink-0">
      <div className="p-4 border-b border-slate-200 dark:border-white/10 flex justify-between items-center shrink-0">
        <h2 className="font-semibold text-slate-900 dark:text-white">Filters</h2>
        {!isMobile && (
          <button onClick={() => setIsCollapsed(true)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
            <PanelLeftClose className="w-4 h-4 text-slate-500" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 styled-scrollbar space-y-6">
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search nodes..." 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-9 pr-8 h-9 rounded-lg bg-slate-100 dark:bg-white/5 border-none text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white"
          />
          {searchInput && (
            <button onClick={() => setSearchInput('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              <span className="text-xs font-bold">×</span>
            </button>
          )}
        </div>

        {/* Node Types */}
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2.5">Node Types</div>
          <div className="space-y-2">
            {NODE_TYPES.map(t => {
              const count = mockGraphNodes.filter(n => n.type === t.id).length;
              return (
                <label key={t.id} className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-2.5">
                    <input 
                      type="checkbox" 
                      checked={filters.nodeTypes.includes(t.id)}
                      onChange={() => toggleNodeType(t.id)}
                      className="rounded text-indigo-500 focus:ring-indigo-500 bg-slate-100 dark:bg-white/5 border-transparent w-4 h-4" 
                    />
                    <div className={`w-2.5 h-2.5 rounded-full ${t.color}`} />
                    <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{t.label}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 rounded-full">{count}</span>
                </label>
              );
            })}
          </div>
          <div className="mt-2 flex gap-3">
            <button onClick={() => setFilters(prev => ({ ...prev, nodeTypes: NODE_TYPES.map(t => t.id) }))} className="text-xs text-indigo-500 hover:text-indigo-400">Select All</button>
            <button onClick={() => setFilters(prev => ({ ...prev, nodeTypes: [] }))} className="text-xs text-indigo-500 hover:text-indigo-400">Deselect All</button>
          </div>
        </div>

        {/* Edge Types */}
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2.5 flex justify-between items-center">
            <span>Edge Types</span>
            <button onClick={() => setShowEdgeFilters(!showEdgeFilters)} className="text-indigo-500 hover:text-indigo-400 capitalize normal-case text-xs">
              {showEdgeFilters ? 'Hide' : 'Show'}
            </button>
          </div>
          {showEdgeFilters && (
            <div className="space-y-2 mt-2">
              {EDGE_TYPES.map(t => (
                <label key={t.id} className="flex items-center gap-2.5 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={filters.edgeTypes.includes(t.id)}
                    onChange={() => toggleEdgeType(t.id)}
                    className="rounded text-indigo-500 focus:ring-indigo-500 bg-slate-100 dark:bg-white/5 border-transparent w-4 h-4" 
                  />
                  <div className={`w-2.5 h-2.5 rounded-sm ${t.color}`} />
                  <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors truncate">{t.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Providers */}
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2.5">Cloud Provider</div>
          <div className="space-y-2">
            {PROVIDERS.map(p => {
              const count = mockGraphNodes.filter(n => n.provider === p.id).length;
              return (
                <label key={p.id} className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-2.5">
                    <input 
                      type="checkbox" 
                      checked={filters.providers.includes(p.id)}
                      onChange={() => toggleProvider(p.id)}
                      className="rounded text-indigo-500 focus:ring-indigo-500 bg-slate-100 dark:bg-white/5 border-transparent w-4 h-4" 
                    />
                    <div className={`w-2.5 h-2.5 rounded-full ${p.color}`} />
                    <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{p.label}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 rounded-full">{count}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Score Range */}
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2.5">Threat Score Range</div>
          <div className="px-2">
            <div className="flex items-center gap-2">
              <input type="range" min="0" max="1" step="0.05" value={filters.scoreRange[0]} onChange={(e) => handleScoreRangeChange(e, 0)} className="w-full accent-indigo-500 h-1 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer" />
            </div>
            <div className="text-xs font-mono text-slate-500 text-center mt-2">
              Min: {filters.scoreRange[0].toFixed(2)}
            </div>
          </div>
        </div>

        {/* Layout */}
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2.5">Graph Layout</div>
          <select 
            value={filters.layout}
            onChange={(e) => setFilters(prev => ({ ...prev, layout: e.target.value }))}
            className="w-full h-9 px-3 rounded-lg bg-slate-100 dark:bg-white/5 border-none text-sm text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="cose">Force-Directed</option>
            <option value="circle">Circular</option>
            <option value="breadthfirst">Hierarchical</option>
          </select>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-slate-200 dark:border-white/10 flex flex-col gap-2 shrink-0">
        <button 
          onClick={() => setFilters(prev => ({ ...prev, attackPathHighlight: !prev.attackPathHighlight }))}
          className={`w-full h-8 rounded-lg text-xs font-medium transition-colors flex items-center justify-center border ${
            filters.attackPathHighlight 
              ? 'bg-indigo-500/15 border-indigo-500/50 text-indigo-500' 
              : 'border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
          }`}
        >
          <Route className="w-3.5 h-3.5 mr-1.5" />
          {filters.attackPathHighlight ? 'Clear Highlights' : 'Highlight Attack Paths'}
        </button>
        <button 
          onClick={resetFilters}
          className="w-full h-8 rounded-lg text-xs font-medium transition-colors flex items-center justify-center border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
        >
          <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
          Reset All Filters
        </button>
      </div>
    </div>
  );

  return content;
}
