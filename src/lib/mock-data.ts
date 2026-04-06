import { type Alert, type ProviderStatus, type ThreatStats, type Node, type Edge } from '../types';

export const mockAlerts: Alert[] = [
  { id: '1', severity: 'Critical', nodeName: 'user_john', nodeType: 'User', provider: 'AWS', timestamp: '3 min ago', description: 'Privilege Escalation: assumed admin_role', score: 0.94 },
  { id: '2', severity: 'Critical', nodeName: 'vm_007', nodeType: 'VM', provider: 'GCP', timestamp: '8 min ago', description: 'CVE Exploitation: CVE-2024-9999 (CVSS 9.8)', score: 0.97 },
  { id: '3', severity: 'High', nodeName: 'ip_mal_02', nodeType: 'IP', provider: 'Azure', timestamp: '12 min ago', description: 'Lateral Movement: connected to vm_015', score: 0.78 },
  { id: '4', severity: 'High', nodeName: 'user_alice_az', nodeType: 'User', provider: 'Azure', timestamp: '18 min ago', description: 'Cross-Cloud Pivot: accessed GCP from Azure credentials', score: 0.81 },
  { id: '5', severity: 'Critical', nodeName: 'container_k8s_01', nodeType: 'Container', provider: 'AWS', timestamp: '25 min ago', description: 'CVE Exploitation: CVE-2024-1234 (CVSS 8.5)', score: 0.91 },
];

export const mockProviderStatus: ProviderStatus[] = [
  { name: 'AWS', status: 'Connected', events: 45230, threats: 12, lastSync: '2s ago' },
  { name: 'Azure', status: 'Connected', events: 38100, threats: 8, lastSync: '5s ago' },
  { name: 'GCP', status: 'Delayed', delay: '45s', events: 28670, threats: 6, lastSync: '45s ago' },
];

export const mockThreatStats: ThreatStats = {
  total: 147,
  critical: 5,
  high: 18,
  medium: 42,
  low: 82,
};

export const mockNodes: Node[] = [
  { data: { id: 'n1', label: 'user_john', type: 'User', provider: 'AWS', score: 0.94, severity: 'Critical' } },
  { data: { id: 'n2', label: 'admin_role', type: 'Role', provider: 'AWS', score: 0.85, severity: 'High' } },
  { data: { id: 'n3', label: 'vm_007', type: 'VM', provider: 'GCP', score: 0.97, severity: 'Critical' } },
  { data: { id: 'n4', label: 'CVE-2024-9999', type: 'CVE', provider: 'GCP', score: 0.99, severity: 'Critical' } },
  { data: { id: 'n5', label: 'ip_mal_02', type: 'IP', provider: 'Azure', score: 0.78, severity: 'High' } },
  { data: { id: 'n6', label: 'vm_015', type: 'VM', provider: 'Azure', score: 0.65, severity: 'Medium' } },
  { data: { id: 'n7', label: 'user_alice_az', type: 'User', provider: 'Azure', score: 0.81, severity: 'High' } },
  { data: { id: 'n8', label: 'container_k8s_01', type: 'Container', provider: 'AWS', score: 0.91, severity: 'Critical' } },
];

export const mockEdges: Edge[] = [
  { data: { id: 'e1', source: 'n1', target: 'n2', label: 'ASSUMES_ROLE', score: 0.92 } },
  { data: { id: 'e2', source: 'n5', target: 'n6', label: 'CONNECTS_TO', score: 0.75 } },
  { data: { id: 'e3', source: 'n3', target: 'n4', label: 'HAS_VULNERABILITY', score: 0.98 } },
  { data: { id: 'e4', source: 'n7', target: 'n3', label: 'CROSS_CLOUD_ACCESS', score: 0.88 } },
  { data: { id: 'e5', source: 'n8', target: 'n1', label: 'BELONGS_TO', score: 0.45 } },
];
