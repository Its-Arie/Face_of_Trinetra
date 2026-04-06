import { useEffect, useRef, useState, useMemo } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import { Maximize2, RotateCcw } from 'lucide-react';
import { mockGraphNodes } from '../../lib/mock-data/graph-nodes';
import { mockGraphEdges } from '../../lib/mock-data/graph-edges';

interface GraphSnapshotProps {
  currentTimestep: number;
  selectedNodeId: string | null;
  onNodeSelect: (id: string | null) => void;
}

export default function GraphSnapshot({ currentTimestep, selectedNodeId, onNodeSelect }: GraphSnapshotProps) {
  const cyRef = useRef<cytoscape.Core | null>(null);
  const [isCumulative, setIsCumulative] = useState(true);

  // Filter edges based on timestep and cumulative toggle
  const visibleEdges = useMemo(() => {
    return mockGraphEdges.filter(e => {
      const t = e.timestep || 0;
      return isCumulative ? t <= currentTimestep : t === currentTimestep;
    });
  }, [currentTimestep, isCumulative]);

  // Cytoscape elements
  const elements = useMemo(() => {
    const els: cytoscape.ElementDefinition[] = [];
    
    mockGraphNodes.forEach(n => {
      const cTime = n.compromise_timestep ?? null;
      const isCompromisedNow = cTime === currentTimestep;
      const isCompromisedBefore = cTime !== null && cTime < currentTimestep;
      
      els.push({
        data: {
          id: n.id,
          label: n.label,
          type: n.type,
          provider: n.provider,
          score: n.score,
          isCompromisedNow,
          isCompromisedBefore
        }
      });
    });

    visibleEdges.forEach(e => {
      els.push({
        data: {
          id: e.id,
          source: e.source,
          target: e.target,
          type: e.type,
          isNew: e.timestep === currentTimestep
        }
      });
    });

    return els;
  }, [visibleEdges, currentTimestep]);

  const stylesheet: any[] = [
    {
      selector: 'node',
      style: {
        'shape': 'ellipse',
        'width': 'mapData(score, 0, 1, 20, 45)',
        'height': 'mapData(score, 0, 1, 20, 45)',
        'label': 'data(label)',
        'text-valign': 'bottom',
        'text-halign': 'center',
        'font-size': 9,
        'color': '#94a3b8',
        'text-margin-y': 4,
        'border-width': 1,
        'border-color': '#1e1e2e',
        'transition-property': 'border-width, border-color, width, height',
        'transition-duration': 300,
      }
    },
    { selector: 'node[type = "user"]', style: { 'background-color': '#3b82f6' } },
    { selector: 'node[type = "vm"]', style: { 'background-color': '#22c55e' } },
    { selector: 'node[type = "container"]', style: { 'background-color': '#f97316' } },
    { selector: 'node[type = "ip"]', style: { 'background-color': '#ef4444' } },
    { selector: 'node[type = "role"]', style: { 'background-color': '#a855f7' } },
    { selector: 'node[type = "cve"]', style: { 'background-color': '#eab308' } },
    { selector: 'node[type = "cloudAccount"]', style: { 'background-color': '#6b7280' } },
    
    // Compromise states
    { selector: 'node[?isCompromisedBefore]', style: { 'border-width': 2, 'border-color': '#ef4444' } },
    { selector: 'node[?isCompromisedNow]', style: { 'border-width': 4, 'border-color': '#ef4444', 'width': 50, 'height': 50 } },
    { selector: 'node:selected', style: { 'border-width': 3, 'border-color': '#6366f1' } },

    {
      selector: 'edge',
      style: {
        'width': 1,
        'line-color': '#475569',
        'target-arrow-color': '#475569',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        'opacity': 0.3,
        'transition-property': 'opacity, line-color, width',
        'transition-duration': 300,
      }
    },
    { selector: 'edge[?isNew]', style: { 'opacity': 1, 'width': 2, 'line-color': '#ef4444', 'target-arrow-color': '#ef4444' } },
  ];

  useEffect(() => {
    if (cyRef.current) {
      const cy = cyRef.current;
      cy.elements().unselect();
      if (selectedNodeId) {
        const node = cy.$id(selectedNodeId);
        node.select();
        cy.animate({ fit: { eles: node.neighborhood().add(node), padding: 50 } }, { duration: 400 });
      }
    }
  }, [selectedNodeId]);

  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl flex flex-col h-[350px] md:h-[450px] overflow-hidden">
      <div className="p-4 border-b border-slate-200 dark:border-white/10 flex justify-between items-center bg-white/50 dark:bg-transparent z-10 shrink-0">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Graph at t = {currentTimestep}</h3>
          <p className="text-xs text-slate-500 mt-0.5">Showing active nodes and edges</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 cursor-pointer mr-2">
            <input 
              type="checkbox" 
              checked={isCumulative}
              onChange={(e) => setIsCumulative(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-7 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-500 relative"></div>
            <span className="text-xs text-slate-500 hidden sm:inline">{isCumulative ? 'Cumulative' : 'Current Only'}</span>
          </label>
          <button onClick={() => cyRef.current?.fit(undefined, 40)} className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500" title="Fit to screen">
            <Maximize2 className="w-4 h-4" />
          </button>
          <button onClick={() => cyRef.current?.reset()} className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500" title="Reset view">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-50 via-slate-100 to-slate-200 dark:from-[#1a1a24] dark:via-[#12121a] dark:to-[#0a0a0f]">
        <CytoscapeComponent
          elements={elements}
          style={{ width: '100%', height: '100%' }}
          layout={{ name: 'cose', animate: false, randomize: false }}
          stylesheet={stylesheet}
          cy={(cy) => {
            cyRef.current = cy;
            cy.on('tap', 'node', (e) => onNodeSelect(e.target.id()));
            cy.on('tap', (e) => { if (e.target === cy) onNodeSelect(null); });
          }}
          wheelSensitivity={0.2}
        />
      </div>
    </div>
  );
}
