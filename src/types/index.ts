export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';
export type Provider = 'AWS' | 'Azure' | 'GCP';

export interface Alert {
  id: string;
  severity: Severity;
  nodeName: string;
  nodeType: string;
  provider: Provider;
  timestamp: string;
  description: string;
  score: number;
  acknowledged?: boolean;
}

export interface Node {
  data: {
    id: string;
    label: string;
    type: string;
    provider: Provider;
    score: number;
    severity: Severity;
  };
}

export interface Edge {
  data: {
    id: string;
    source: string;
    target: string;
    label: string;
    score: number;
  };
}

export interface ProviderStatus {
  name: Provider;
  status: 'Connected' | 'Delayed' | 'Disconnected';
  delay?: string;
  events: number;
  threats: number;
  lastSync: string;
}

export interface ThreatStats {
  total: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
}
