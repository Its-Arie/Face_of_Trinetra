import { useEffect, useRef, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import { Network, Maximize, RotateCcw } from 'lucide-react';
import { type RiskReport } from '../../types/report';

interface ExplainerSubgraphCanvasProps {
  report: RiskReport;
  highlightCritical: boolean;
  showLabels: boolean;
}

export default function ExplainerSubgraphCanvas({ report, highlightCritical, showLabels }: ExplainerSubgraphCanvasProps) {
  const cyRef = useRef<cytoscape.Core | null>(null);
  const [cyReady, setCyReady] = useState(false);

  const { nodes, edges } = report.explainerSubgraph;

  const elements = [
    ...nodes.map(n => ({
      data: { 
        id: n.id, 
        label: n.label, 
        type: n.type, 
        provider: n.provider || 'unknown',
        importance: n.importance,
        isTarget: n.id === report.nodeId
      }
    })),
    ...edges.map(e => ({
      data: { 
        id: e.id, 
        source: e.source, 
        target: e.target, 
        label: e.label,
        importance: e.importance 
      }
    }))
  ];

  const stylesheet: any[] = [
    {
      selector: 'node',
      style: {
        'label': showLabels ? 'data(label)' : '',
        'text-valign': 'bottom',
        'text-halign': 'center',
        'font-size': 10,
        'color': '#94a3b8',
        'text-margin-y': 6,
        'shape': 'ellipse',
        'width': 'mapData(importance, 0, 1, 30, 50)',
        'height': 'mapData(importance, 0, 1, 30, 50)',
        'border-width': 2,
        'border-color': '#1e1e2e',
        'opacity': highlightCritical ? 'mapData(importance, 0, 1, 0.3, 1)' : 1,
        'transition-property': 'opacity, border-width, width, height',
        'transition-duration': 300,
      }
    },
    // Target Node (The one the report is about)
    {
      selector: 'node[?isTarget]',
      style: {
        'border-width': 4,
        'border-color': '#6366f1',
        'width': 60,
        'height': 60,
        'font-weight': 'bold',
        'color': '#6366f1',
      }
    },
    // Node Types Colors
    { selector: 'node[type = "user"]', style: { 'background-color': '#3b82f6' } },
    { selector: 'node[type = "vm"]', style: { 'background-color': '#22c55e' } },
    { selector: 'node[type = "container"]', style: { 'background-color': '#f97316' } },
    { selector: 'node[type = "ip"]', style: { 'background-color': '#ef4444' } },
    { selector: 'node[type = "role"]', style: { 'background-color': '#a855f7' } },
    { selector: 'node[type = "cve"]', style: { 'background-color': '#eab308' } },
    { selector: 'node[type = "cloudAccount"]', style: { 'background-color': '#6b7280' } },
    
    // Edges
    {
      selector: 'edge',
      style: {
        'width': highlightCritical ? 'mapData(importance, 0, 1, 1, 4)' : 2,
        'line-color': '#475569',
        'target-arrow-color': '#475569',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        'opacity': highlightCritical ? 'mapData(importance, 0, 1, 0.2, 0.9)' : 0.7,
        'label': showLabels ? 'data(label)' : '',
        'font-size': 8,
        'text-rotation': 'autorotate',
        'color': '#64748b',
        'transition-property': 'opacity, width',
        'transition-duration': 300,
      }
    }
  ];

  const layout = {
    name: 'cose',
    animate: true,
    animationDuration: 500,
    padding: 30,
    nodeRepulsion: 6000,
    idealEdgeLength: 100,
  };

  useEffect(() => {
    if (cyRef.current && cyReady) {
      cyRef.current.fit(undefined, 40);
    }
  }, [cyReady, highlightCritical, showLabels]);

  const handleFit = () => cyRef.current?.fit(undefined, 40);
  const handleReset = () => {
    if (cyRef.current) {
      cyRef.current.layout(layout).run();
    }
  };

  return (
    <>
      <CytoscapeComponent
        elements={elements}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
        layout={layout}
        stylesheet={stylesheet}
        cy={(cy) => { 
          cyRef.current = cy; 
          if (!cyReady) setCyReady(true);
        }}
        minZoom={0.5}
        maxZoom={2.5}
        userPanningEnabled={true}
        userZoomingEnabled={true}
        boxSelectionEnabled={false}
      />
      
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <button onClick={handleFit} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-sm border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors shadow-sm" title="Fit to screen">
          <Maximize className="w-4 h-4" />
        </button>
        <button onClick={handleReset} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-sm border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors shadow-sm" title="Reset layout">
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {!cyReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/50 dark:bg-[#0a0a0f]/50 backdrop-blur-sm z-20">
          <Network className="w-8 h-8 text-slate-400 animate-pulse mb-2" />
          <span className="text-xs text-slate-500">Loading subgraph...</span>
        </div>
      )}
    </>
  );
}
