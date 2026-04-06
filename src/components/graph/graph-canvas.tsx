import { useEffect, useRef, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import { ZoomIn, ZoomOut, Maximize, EyeOff } from 'lucide-react';
import { type GraphNode, type GraphEdge, type GraphFilterState } from '../../types/graph';

interface GraphCanvasProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  filters: GraphFilterState;
  onNodeSelect: (nodeId: string | null) => void;
  onEdgeSelect: (edgeId: string | null) => void;
  selectedNodeId: string | null;
  selectedEdgeId: string | null;
  isSubgraphMode: boolean;
}

export default function GraphCanvas({ 
  nodes, edges, filters, onNodeSelect, onEdgeSelect, selectedNodeId, selectedEdgeId, isSubgraphMode 
}: GraphCanvasProps) {
  const cyRef = useRef<cytoscape.Core | null>(null);
  const [cyReady, setCyReady] = useState(false);

  // Convert our data to Cytoscape elements
  const elements = [
    ...nodes.map(n => ({
      data: { 
        id: n.id, 
        label: n.label, 
        type: n.type, 
        provider: n.provider, 
        score: n.score,
        highRisk: n.highRisk,
        critical: n.critical
      }
    })),
    ...edges.map(e => ({
      data: { 
        id: e.id, 
        source: e.source, 
        target: e.target, 
        type: e.type, 
        weight: e.weight 
      }
    }))
  ];

  // Map our layout string to Cytoscape layout options
  const getLayout = (layoutName: string) => {
    switch(layoutName) {
      case 'circle':
        return { name: 'circle', animate: true, animationDuration: 500, padding: 40 };
      case 'breadthfirst':
        return { name: 'breadthfirst', animate: true, animationDuration: 500, padding: 40, directed: true, spacingFactor: 1.5 };
      case 'cose':
      default:
        return { 
          name: 'cose', animate: true, animationDuration: 500, 
          nodeRepulsion: 8000, idealEdgeLength: 120, gravity: 0.3, numIter: 300, padding: 40, randomize: false 
        };
    }
  };

  // Stylesheet
  const stylesheet: any[] = [
    // Base Node
    {
      selector: 'node',
      style: {
        'label': 'data(label)',
        'text-valign': 'bottom',
        'text-halign': 'center',
        'font-size': 10,
        'color': '#94a3b8',
        'text-margin-y': 6,
        'text-max-width': '80px',
        'text-wrap': 'ellipsis',
        'min-zoomed-font-size': 8,
        'border-width': 2,
        'border-color': '#1e1e2e',
        'overlay-padding': 4,
        'transition-property': 'border-width, border-color, opacity' as any,
        'transition-duration': 200,
        'width': 'mapData(score, 0, 1, 30, 55)' as any,
        'height': 'mapData(score, 0, 1, 30, 55)' as any,
      }
    },
    // Node Types
    { selector: 'node[type = "user"]', style: { 'shape': 'ellipse', 'width': 40, 'height': 40, 'background-color': '#3b82f6', 'border-color': '#2563eb' } },
    { selector: 'node[type = "vm"]', style: { 'shape': 'ellipse', 'width': 40, 'height': 40, 'background-color': '#22c55e', 'border-color': '#16a34a' } },
    { selector: 'node[type = "container"]', style: { 'shape': 'ellipse', 'width': 40, 'height': 40, 'background-color': '#f97316', 'border-color': '#ea580c' } },
    { selector: 'node[type = "ip"]', style: { 'shape': 'ellipse', 'width': 40, 'height': 40, 'background-color': '#ef4444', 'border-color': '#dc2626' } },
    { selector: 'node[type = "role"]', style: { 'shape': 'ellipse', 'width': 40, 'height': 40, 'background-color': '#a855f7', 'border-color': '#9333ea' } },
    { selector: 'node[type = "cve"]', style: { 'shape': 'ellipse', 'width': 40, 'height': 40, 'background-color': '#eab308', 'border-color': '#ca8a04' } },
    { selector: 'node[type = "cloudAccount"]', style: { 'shape': 'ellipse', 'width': 40, 'height': 40, 'background-color': '#6b7280', 'border-color': '#4b5563' } },
    
    // Risk Indicators
    { selector: 'node[?highRisk]', style: { 'border-width': 4, 'border-color': '#ef4444' } },
    { selector: 'node[?critical]', style: { 'border-width': 5, 'border-color': '#ef4444', 'border-style': 'double' } },
    
    // Base Edge
    {
      selector: 'edge',
      style: {
        'width': 1.5,
        'line-color': '#475569',
        'target-arrow-color': '#475569',
        'target-arrow-shape': 'triangle',
        'arrow-scale': 0.8,
        'curve-style': 'bezier',
        'opacity': 0.7,
        'transition-property': 'opacity, line-color, width' as any,
        'transition-duration': 200,
        'label': '',
        'font-size': 8,
        'text-rotation': 'autorotate',
        'color': '#64748b',
      }
    },
    // Edge Types
    { selector: 'edge[type = "exploits"]', style: { 'line-color': '#ef4444', 'target-arrow-color': '#ef4444', 'line-style': 'dashed', 'line-dash-pattern': [6, 3], 'width': 2.5 } },
    { selector: 'edge[type = "access"]', style: { 'line-color': '#3b82f6', 'target-arrow-color': '#3b82f6', 'line-style': 'solid', 'width': 2 } },
    { selector: 'edge[type = "connects_to"]', style: { 'line-color': '#22c55e', 'target-arrow-color': '#22c55e', 'line-style': 'solid', 'width': 1.5 } },
    { selector: 'edge[type = "assumes_role"]', style: { 'line-color': '#a855f7', 'target-arrow-color': '#a855f7', 'line-style': 'dotted', 'line-dash-pattern': [2, 4], 'width': 2 } },
    { selector: 'edge[type = "cross_cloud_access"]', style: { 'line-color': '#f59e0b', 'target-arrow-color': '#f59e0b', 'line-style': 'dashed', 'line-dash-pattern': [8, 4], 'width': 2.5 } },
    { selector: 'edge[type = "has_vulnerability"]', style: { 'line-color': '#eab308', 'target-arrow-color': '#eab308', 'line-style': 'solid', 'width': 1.5 } },
    { selector: 'edge[type = "deployed_on"]', style: { 'line-color': '#f97316', 'target-arrow-color': '#f97316', 'line-style': 'solid', 'width': 1.5 } },
    { selector: 'edge[type = "belongs_to"]', style: { 'line-color': '#6b7280', 'target-arrow-color': '#6b7280', 'line-style': 'solid', 'width': 1 } },
    { selector: 'edge[type = "authenticates_as"]', style: { 'line-color': '#14b8a6', 'target-arrow-color': '#14b8a6', 'line-style': 'solid', 'width': 1.5 } },
    { selector: 'edge[type = "routes_to"]', style: { 'line-color': '#06b6d4', 'target-arrow-color': '#06b6d4', 'line-style': 'solid', 'width': 1.5 } },

    // Selected States
    { selector: 'node:selected', style: { 'border-width': 4, 'border-color': '#6366f1', 'overlay-color': '#6366f1', 'overlay-opacity': 0.15 } },
    { selector: 'edge:selected', style: { 'width': 3, 'line-color': '#6366f1', 'target-arrow-color': '#6366f1', 'opacity': 1 } },

    // Classes for filtering/highlighting
    { selector: 'node.dimmed', style: { 'opacity': 0.15 } },
    { selector: 'edge.dimmed', style: { 'opacity': 0.08 } },
    { selector: 'node.highlighted', style: { 'opacity': 1, 'border-width': 4, 'border-color': '#6366f1' } },
    { selector: 'edge.highlighted', style: { 'opacity': 1, 'width': 3 } },
    { selector: 'node.search-match', style: { 'border-width': 4, 'border-color': '#eab308' } },
  ];

  // Setup events
  useEffect(() => {
    if (cyRef.current && cyReady) {
      const cy = cyRef.current;
      
      cy.off('tap'); // remove old listeners
      
      cy.on('tap', 'node', (evt) => {
        onNodeSelect(evt.target.id());
      });
      
      cy.on('tap', 'edge', (evt) => {
        onEdgeSelect(evt.target.id());
      });
      
      cy.on('tap', (evt) => {
        if (evt.target === cy) {
          onNodeSelect(null);
          onEdgeSelect(null);
        }
      });

      cy.on('dblclick', 'node', (evt) => {
        const node = evt.target;
        cy.animate({ fit: { eles: node.neighborhood().add(node), padding: 60 } }, { duration: 400 });
      });

      // Hover effects for desktop
      cy.on('mouseover', 'node', (evt) => {
        const node = evt.target;
        node.style('border-width', (node.numericStyle('border-width') || 2) + 1);
        // Tooltip logic could go here (using tippy.js or similar, omitted for lightweight requirement)
      });
      
      cy.on('mouseout', 'node', (evt) => {
        const node = evt.target;
        node.removeStyle('border-width');
      });
    }
  }, [cyReady, onNodeSelect, onEdgeSelect]);

  // Handle external selection changes
  useEffect(() => {
    if (cyRef.current && cyReady) {
      const cy = cyRef.current;
      cy.elements().unselect();
      if (selectedNodeId) cy.$id(selectedNodeId).select();
      if (selectedEdgeId) cy.$id(selectedEdgeId).select();
    }
  }, [selectedNodeId, selectedEdgeId, cyReady]);

  // Handle visual filtering (dimming) based on search, attack path, or subgraph
  useEffect(() => {
    if (cyRef.current && cyReady) {
      const cy = cyRef.current;
      cy.startBatch();
      
      // Reset classes
      cy.elements().removeClass('dimmed highlighted search-match');

      if (isSubgraphMode && selectedNodeId) {
        // Subgraph mode handled externally via props/data, but we can enforce dimming here
        // Actually, the parent filters the nodes/edges passed down, so we don't need to dim here
        // unless we want to show the whole graph and dim the rest. The prompt says "show only minimal subgraph"
        // but the detail panel says "add class dimmed to all nodes not in explanatory subgraph".
        // Let's implement the dimming approach.
        const selectedNodeData = nodes.find(n => n.id === selectedNodeId);
        if (selectedNodeData && selectedNodeData.explainerNodes.length > 0) {
          cy.elements().addClass('dimmed');
          selectedNodeData.explainerNodes.forEach((id: string) => cy.$id(id).removeClass('dimmed').addClass('highlighted'));
          selectedNodeData.explainerEdges.forEach((id: string) => cy.$id(id).removeClass('dimmed').addClass('highlighted'));
        }
      } else if (filters.attackPathHighlight) {
        cy.elements().addClass('dimmed');
        const highRiskNodes = cy.nodes().filter(n => n.data('score') > 0.5);
        highRiskNodes.removeClass('dimmed').addClass('highlighted');
        highRiskNodes.connectedEdges().removeClass('dimmed').addClass('highlighted');
      } else if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matches = cy.nodes().filter(n => n.data('label').toLowerCase().includes(searchLower));
        if (matches.length > 0) {
          cy.elements().addClass('dimmed');
          matches.removeClass('dimmed').addClass('search-match');
          matches.connectedEdges().removeClass('dimmed');
        }
      }

      cy.endBatch();
    }
  }, [filters.search, filters.attackPathHighlight, isSubgraphMode, selectedNodeId, cyReady, nodes]);

  // Zoom controls
  const handleZoomIn = () => cyRef.current?.zoom(cyRef.current.zoom() * 1.3);
  const handleZoomOut = () => cyRef.current?.zoom(cyRef.current.zoom() / 1.3);
  const handleFit = () => cyRef.current?.fit(undefined, 40);

  if (nodes.length === 0) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/50 dark:bg-[#0a0a0f]/50">
        <EyeOff className="w-12 h-12 text-slate-400/50 mb-3" />
        <p className="text-sm text-slate-500">No nodes match current filters</p>
        <p className="text-xs text-slate-400 mt-1">Try adjusting your filters or reset all filters</p>
      </div>
    );
  }

  return (
    <>
      <CytoscapeComponent
        elements={elements}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
        layout={getLayout(filters.layout)}
        stylesheet={stylesheet}
        cy={(cy) => { 
          cyRef.current = cy; 
          if (!cyReady) setCyReady(true);
        }}
        minZoom={0.3}
        maxZoom={3}
        wheelSensitivity={0.3}
        boxSelectionEnabled={false}
        autounselectify={false}
      />
      
      {/* Zoom Controls */}
      <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
        <button onClick={handleZoomIn} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-sm border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors shadow-sm">
          <ZoomIn className="w-4 h-4" />
        </button>
        <button onClick={handleZoomOut} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-sm border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors shadow-sm">
          <ZoomOut className="w-4 h-4" />
        </button>
        <button onClick={handleFit} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-sm border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors shadow-sm">
          <Maximize className="w-4 h-4" />
        </button>
      </div>
    </>
  );
}
