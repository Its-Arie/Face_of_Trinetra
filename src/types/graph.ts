export interface NodeFeatures {
  zlog: number;
  zcve: number;
  riskScore: number;
  exploitProb: number;
  zidentity: number;
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'user' | 'vm' | 'container' | 'ip' | 'role' | 'cve' | 'cloudAccount';
  provider: 'aws' | 'azure' | 'gcp';
  score: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  highRisk: boolean;
  critical: boolean;
  region: string;
  firstSeen: string;
  attackType: string | null;
  temporalStep: number;
  features: NodeFeatures;
  explainerNodes: string[];
  explainerEdges: string[];
  compromise_timestep?: number | null;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: 'assumes_role' | 'access' | 'connects_to' | 'exploits' |
        'has_vulnerability' | 'deployed_on' | 'belongs_to' |
        'cross_cloud_access' | 'authenticates_as' | 'routes_to';
  weight: number;
  anomalyScore: number;
  firstObserved: string;
  temporalStep: number;
  timestep?: number;
}

export interface GraphSnapshot {
  label: string;
  description: string;
  nodes: string[];
  edges: string[];
}

export interface GraphFilterState {
  search: string;
  nodeTypes: string[];
  edgeTypes: string[];
  providers: string[];
  scoreRange: [number, number];
  temporalSnapshot: string;
  layout: string;
  attackPathHighlight: boolean;
}
