import { type TimelineTimestep, type TimestepEvent, type NodeThreatTimeline, type HeatmapData } from '../../types/timeline';

export const attackPhaseColors: Record<string, string> = {
  privilege_escalation: 'bg-orange-500',
  lateral_movement: 'bg-yellow-500',
  cross_cloud_pivot: 'bg-purple-500',
  cve_exploitation: 'bg-red-500',
  none: 'bg-slate-500'
};

export const timelineTimesteps: TimelineTimestep[] = [
  { timestep: 0, phase: 'privilege_escalation', total_events: 8, malicious_events: 2, benign_events: 6, new_compromised_count: 1, newly_compromised_nodes: ['user_john'], cumulative_compromised: 1, description: 'Initial compromise: user_john on AWS', phase_distribution: { privilege_escalation: 2, lateral_movement: 0, cross_cloud_pivot: 0, cve_exploitation: 0, benign: 6 } },
  { timestep: 1, phase: 'privilege_escalation', total_events: 12, malicious_events: 3, benign_events: 9, new_compromised_count: 1, newly_compromised_nodes: ['admin_role'], cumulative_compromised: 2, description: 'user_john assumes admin_role', phase_distribution: { privilege_escalation: 3, lateral_movement: 0, cross_cloud_pivot: 0, cve_exploitation: 0, benign: 9 } },
  { timestep: 2, phase: 'privilege_escalation', total_events: 10, malicious_events: 2, benign_events: 8, new_compromised_count: 1, newly_compromised_nodes: ['vm_007'], cumulative_compromised: 3, description: 'admin_role accesses vm_007', phase_distribution: { privilege_escalation: 2, lateral_movement: 0, cross_cloud_pivot: 0, cve_exploitation: 0, benign: 8 } },
  { timestep: 3, phase: 'lateral_movement', total_events: 15, malicious_events: 4, benign_events: 11, new_compromised_count: 2, newly_compromised_nodes: ['vm_015', 'vm_010'], cumulative_compromised: 5, description: 'vm_007 connects to vm_015, vm_010', phase_distribution: { privilege_escalation: 0, lateral_movement: 4, cross_cloud_pivot: 0, cve_exploitation: 0, benign: 11 } },
  { timestep: 4, phase: 'lateral_movement', total_events: 14, malicious_events: 3, benign_events: 11, new_compromised_count: 1, newly_compromised_nodes: ['vm_020'], cumulative_compromised: 6, description: 'vm_015 connects to vm_020', phase_distribution: { privilege_escalation: 0, lateral_movement: 3, cross_cloud_pivot: 0, cve_exploitation: 0, benign: 11 } },
  { timestep: 5, phase: 'cve_exploitation', total_events: 18, malicious_events: 5, benign_events: 13, new_compromised_count: 2, newly_compromised_nodes: ['cve_9999', 'ip_mal_01'], cumulative_compromised: 8, description: 'ip_mal_01 exploits CVE-2024-9999 on vm_007', phase_distribution: { privilege_escalation: 0, lateral_movement: 0, cross_cloud_pivot: 0, cve_exploitation: 5, benign: 13 } },
  { timestep: 6, phase: 'cross_cloud_pivot', total_events: 16, malicious_events: 4, benign_events: 12, new_compromised_count: 1, newly_compromised_nodes: ['john@gcp.iam'], cumulative_compromised: 9, description: 'user_john pivots to john@gcp.iam', phase_distribution: { privilege_escalation: 0, lateral_movement: 0, cross_cloud_pivot: 4, cve_exploitation: 0, benign: 12 } },
  { timestep: 7, phase: 'cve_exploitation', total_events: 20, malicious_events: 6, benign_events: 14, new_compromised_count: 2, newly_compromised_nodes: ['container_k8s_01', 'cve_1234'], cumulative_compromised: 11, description: 'ip_mal_02 exploits CVE-2024-1234 on container_k8s_01', phase_distribution: { privilege_escalation: 0, lateral_movement: 0, cross_cloud_pivot: 0, cve_exploitation: 6, benign: 14 } },
  { timestep: 8, phase: 'lateral_movement', total_events: 13, malicious_events: 3, benign_events: 10, new_compromised_count: 1, newly_compromised_nodes: ['vm_022'], cumulative_compromised: 12, description: 'vm_010 connects to vm_022', phase_distribution: { privilege_escalation: 0, lateral_movement: 3, cross_cloud_pivot: 0, cve_exploitation: 0, benign: 10 } },
  { timestep: 9, phase: 'cross_cloud_pivot', total_events: 17, malicious_events: 4, benign_events: 13, new_compromised_count: 1, newly_compromised_nodes: ['alice.wong@corp.com'], cumulative_compromised: 13, description: 'user_alice pivots to alice.wong@corp.com on Azure', phase_distribution: { privilege_escalation: 0, lateral_movement: 0, cross_cloud_pivot: 4, cve_exploitation: 0, benign: 13 } },
  { timestep: 10, phase: 'privilege_escalation', total_events: 11, malicious_events: 2, benign_events: 9, new_compromised_count: 1, newly_compromised_nodes: ['network_admin_role'], cumulative_compromised: 14, description: 'user_alice_az assumes network_admin_role', phase_distribution: { privilege_escalation: 2, lateral_movement: 0, cross_cloud_pivot: 0, cve_exploitation: 0, benign: 9 } },
  { timestep: 11, phase: 'cve_exploitation', total_events: 19, malicious_events: 5, benign_events: 14, new_compromised_count: 1, newly_compromised_nodes: ['vm_012'], cumulative_compromised: 15, description: 'ip_mal_01 exploits CVE-2023-8888 on vm_012', phase_distribution: { privilege_escalation: 0, lateral_movement: 0, cross_cloud_pivot: 0, cve_exploitation: 5, benign: 14 } },
  { timestep: 12, phase: 'lateral_movement', total_events: 14, malicious_events: 3, benign_events: 11, new_compromised_count: 1, newly_compromised_nodes: ['vm_003'], cumulative_compromised: 16, description: 'vm_012 connects to vm_003', phase_distribution: { privilege_escalation: 0, lateral_movement: 3, cross_cloud_pivot: 0, cve_exploitation: 0, benign: 11 } },
  { timestep: 13, phase: 'none', total_events: 8, malicious_events: 0, benign_events: 8, new_compromised_count: 0, newly_compromised_nodes: [], cumulative_compromised: 16, description: 'Benign activity only — attacker pausing', phase_distribution: { privilege_escalation: 0, lateral_movement: 0, cross_cloud_pivot: 0, cve_exploitation: 0, benign: 8 } },
  { timestep: 14, phase: 'none', total_events: 7, malicious_events: 0, benign_events: 7, new_compromised_count: 0, newly_compromised_nodes: [], cumulative_compromised: 16, description: 'Benign activity only', phase_distribution: { privilege_escalation: 0, lateral_movement: 0, cross_cloud_pivot: 0, cve_exploitation: 0, benign: 7 } },
  { timestep: 15, phase: 'cve_exploitation', total_events: 22, malicious_events: 7, benign_events: 15, new_compromised_count: 1, newly_compromised_nodes: ['vm_001'], cumulative_compromised: 17, description: 'Renewed exploitation wave: CVE-2024-5678 on vm_001', phase_distribution: { privilege_escalation: 0, lateral_movement: 0, cross_cloud_pivot: 0, cve_exploitation: 7, benign: 15 } },
  { timestep: 16, phase: 'cross_cloud_pivot', total_events: 16, malicious_events: 4, benign_events: 12, new_compromised_count: 1, newly_compromised_nodes: ['user_mike_az'], cumulative_compromised: 18, description: 'user_mike pivots from AWS to user_mike_az on Azure', phase_distribution: { privilege_escalation: 0, lateral_movement: 0, cross_cloud_pivot: 4, cve_exploitation: 0, benign: 12 } },
  { timestep: 17, phase: 'lateral_movement', total_events: 18, malicious_events: 5, benign_events: 13, new_compromised_count: 0, newly_compromised_nodes: [], cumulative_compromised: 18, description: 'vm_022 connects to vm_001', phase_distribution: { privilege_escalation: 0, lateral_movement: 5, cross_cloud_pivot: 0, cve_exploitation: 0, benign: 13 } },
  { timestep: 18, phase: 'privilege_escalation', total_events: 15, malicious_events: 3, benign_events: 12, new_compromised_count: 0, newly_compromised_nodes: [], cumulative_compromised: 18, description: 'Maintaining compromised access, no new nodes', phase_distribution: { privilege_escalation: 3, lateral_movement: 0, cross_cloud_pivot: 0, cve_exploitation: 0, benign: 12 } },
  { timestep: 19, phase: 'cve_exploitation', total_events: 25, malicious_events: 8, benign_events: 17, new_compromised_count: 1, newly_compromised_nodes: ['container_gke_01'], cumulative_compromised: 19, description: 'Final exploitation: CVE-2024-7777 on container_gke_01', phase_distribution: { privilege_escalation: 0, lateral_movement: 0, cross_cloud_pivot: 0, cve_exploitation: 8, benign: 17 } },
];

export const timestepEvents: Record<number, TimestepEvent[]> = {
  0: [
    { id: 'evt_t0_001', timestep: 0, timestamp: '2026-01-15T08:00:00Z', provider: 'aws', entity_id: 'user_john', entity_type: 'user', action: 'LOGIN', target_id: 'aws_account_01', is_malicious: true, severity: 'high', attack_phase: 'privilege_escalation' },
    { id: 'evt_t0_002', timestep: 0, timestamp: '2026-01-15T08:01:00Z', provider: 'aws', entity_id: 'user_john', entity_type: 'user', action: 'ACCESS', target_id: 'vm_001', is_malicious: true, severity: 'medium', attack_phase: 'privilege_escalation' },
    { id: 'evt_t0_003', timestep: 0, timestamp: '2026-01-15T08:02:00Z', provider: 'aws', entity_id: 'user_bob', entity_type: 'user', action: 'LOGIN', target_id: 'aws_account_01', is_malicious: false, severity: 'benign', attack_phase: null },
    { id: 'evt_t0_004', timestep: 0, timestamp: '2026-01-15T08:03:00Z', provider: 'aws', entity_id: 'user_alice', entity_type: 'user', action: 'S3_READ', target_id: 'bucket_data', is_malicious: false, severity: 'benign', attack_phase: null },
    { id: 'evt_t0_005', timestep: 0, timestamp: '2026-01-15T08:04:00Z', provider: 'aws', entity_id: 'user_sarah', entity_type: 'user', action: 'API_CALL', target_id: 'ec2.describeInstances', is_malicious: false, severity: 'benign', attack_phase: null },
  ],
  5: [
    { id: 'evt_t5_001', timestep: 5, timestamp: '2026-01-15T08:30:00Z', provider: 'gcp', entity_id: 'ip_mal_01', entity_type: 'ip', action: 'EXPLOIT', target_id: 'vm_007', is_malicious: true, severity: 'critical', attack_phase: 'cve_exploitation' },
    { id: 'evt_t5_002', timestep: 5, timestamp: '2026-01-15T08:31:00Z', provider: 'gcp', entity_id: 'vm_007', entity_type: 'vm', action: 'DOWNLOAD', target_id: 'malware.sh', is_malicious: true, severity: 'high', attack_phase: 'cve_exploitation' },
    { id: 'evt_t5_003', timestep: 5, timestamp: '2026-01-15T08:32:00Z', provider: 'gcp', entity_id: 'service_account', entity_type: 'user', action: 'API_CALL', target_id: 'compute.instances.list', is_malicious: false, severity: 'benign', attack_phase: null },
  ],
  13: [
    { id: 'evt_t13_001', timestep: 13, timestamp: '2026-01-15T10:00:00Z', provider: 'azure', entity_id: 'user_david', entity_type: 'user', action: 'LOGIN', target_id: 'azure_tenant', is_malicious: false, severity: 'benign', attack_phase: null },
    { id: 'evt_t13_002', timestep: 13, timestamp: '2026-01-15T10:05:00Z', provider: 'aws', entity_id: 'vm_012', entity_type: 'vm', action: 'HEALTH_CHECK', target_id: null, is_malicious: false, severity: 'benign', attack_phase: null },
  ],
  19: [
    { id: 'evt_t19_001', timestep: 19, timestamp: '2026-01-15T11:30:00Z', provider: 'gcp', entity_id: 'ip_mal_02', entity_type: 'ip', action: 'EXPLOIT', target_id: 'container_gke_01', is_malicious: true, severity: 'critical', attack_phase: 'cve_exploitation' },
    { id: 'evt_t19_002', timestep: 19, timestamp: '2026-01-15T11:31:00Z', provider: 'gcp', entity_id: 'container_gke_01', entity_type: 'container', action: 'ESCALATE', target_id: 'host_node', is_malicious: true, severity: 'high', attack_phase: 'cve_exploitation' },
    { id: 'evt_t19_003', timestep: 19, timestamp: '2026-01-15T11:32:00Z', provider: 'aws', entity_id: 'user_sarah', entity_type: 'user', action: 'LOGOUT', target_id: 'aws_account_01', is_malicious: false, severity: 'benign', attack_phase: null },
  ]
};

// Fill in remaining timesteps with basic data
for (let i = 0; i < 20; i++) {
  if (!timestepEvents[i]) {
    timestepEvents[i] = [
      { id: `evt_t${i}_001`, timestep: i, timestamp: `2026-01-15T08:${i.toString().padStart(2, '0')}:00Z`, provider: 'aws', entity_id: 'system', entity_type: 'system', action: 'HEARTBEAT', target_id: null, is_malicious: false, severity: 'benign', attack_phase: null },
      { id: `evt_t${i}_002`, timestep: i, timestamp: `2026-01-15T08:${i.toString().padStart(2, '0')}:30Z`, provider: 'azure', entity_id: 'system', entity_type: 'system', action: 'METRICS_SYNC', target_id: null, is_malicious: false, severity: 'benign', attack_phase: null }
    ];
  }
}

export const nodeThreatTimelines: NodeThreatTimeline[] = [
  {
    node_id: 'user_john', node_type: 'user', provider: 'aws', compromise_timestep: 0,
    predicted_probabilities: [0.82, 0.89, 0.92, 0.94, 0.95, 0.96, 0.96, 0.97, 0.97, 0.97, 0.97, 0.98, 0.98, 0.95, 0.95, 0.97, 0.97, 0.98, 0.98, 0.98],
    actual_labels: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    first_predicted_above_threshold: 0, prediction_mse: 0.015, early_warning_steps: 0
  },
  {
    node_id: 'vm_007', node_type: 'vm', provider: 'gcp', compromise_timestep: 2,
    predicted_probabilities: [0.08, 0.35, 0.78, 0.88, 0.91, 0.94, 0.95, 0.96, 0.96, 0.96, 0.96, 0.97, 0.97, 0.93, 0.93, 0.96, 0.96, 0.97, 0.97, 0.97],
    actual_labels: [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    first_predicted_above_threshold: 2, prediction_mse: 0.022, early_warning_steps: 0
  },
  {
    node_id: 'vm_015', node_type: 'vm', provider: 'azure', compromise_timestep: 3,
    predicted_probabilities: [0.05, 0.07, 0.18, 0.72, 0.85, 0.90, 0.92, 0.93, 0.94, 0.94, 0.94, 0.95, 0.95, 0.92, 0.92, 0.94, 0.95, 0.95, 0.96, 0.96],
    actual_labels: [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    first_predicted_above_threshold: 3, prediction_mse: 0.018, early_warning_steps: 0
  },
  {
    node_id: 'user_bob', node_type: 'user', provider: 'aws', compromise_timestep: null,
    predicted_probabilities: [0.05, 0.06, 0.05, 0.07, 0.06, 0.08, 0.07, 0.06, 0.05, 0.06, 0.07, 0.06, 0.05, 0.04, 0.05, 0.06, 0.07, 0.06, 0.05, 0.05],
    actual_labels: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    first_predicted_above_threshold: null, prediction_mse: 0.003, early_warning_steps: null
  },
  {
    node_id: 'container_k8s_01', node_type: 'container', provider: 'aws', compromise_timestep: 7,
    predicted_probabilities: [0.02, 0.03, 0.05, 0.08, 0.12, 0.25, 0.45, 0.82, 0.89, 0.91, 0.93, 0.94, 0.95, 0.95, 0.95, 0.96, 0.96, 0.97, 0.97, 0.98],
    actual_labels: [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    first_predicted_above_threshold: 7, prediction_mse: 0.025, early_warning_steps: 0
  }
];

// Generate remaining mock data for 12 more nodes to total 17
const extraNodes = [
  { id: 'admin_role', type: 'role', prov: 'aws', comp: 1 },
  { id: 'vm_010', type: 'vm', prov: 'azure', comp: 3 },
  { id: 'vm_020', type: 'vm', prov: 'gcp', comp: 4 },
  { id: 'john@gcp.iam', type: 'user', prov: 'gcp', comp: 6 },
  { id: 'alice.wong', type: 'user', prov: 'azure', comp: 9 },
  { id: 'network_admin', type: 'role', prov: 'azure', comp: 10 },
  { id: 'vm_012', type: 'vm', prov: 'aws', comp: 11 },
  { id: 'vm_003', type: 'vm', prov: 'aws', comp: 12 },
  { id: 'vm_001', type: 'vm', prov: 'gcp', comp: 15 },
  { id: 'user_mike_az', type: 'user', prov: 'azure', comp: 16 },
  { id: 'vm_022', type: 'vm', prov: 'aws', comp: 8 },
  { id: 'container_gke', type: 'container', prov: 'gcp', comp: 19 }
];

extraNodes.forEach(n => {
  const preds = Array(20).fill(0).map((_, i) => {
    if (i < n.comp - 1) return 0.05 + Math.random() * 0.1;
    if (i === n.comp - 1) return 0.3 + Math.random() * 0.2;
    return 0.8 + Math.random() * 0.15;
  });
  const acts = Array(20).fill(0).map((_, i) => i >= n.comp ? 1 : 0);
  
  nodeThreatTimelines.push({
    node_id: n.id,
    node_type: n.type,
    provider: n.prov as any,
    compromise_timestep: n.comp,
    predicted_probabilities: preds,
    actual_labels: acts,
    first_predicted_above_threshold: n.comp,
    prediction_mse: 0.02,
    early_warning_steps: 0
  });
});

export const heatmapData: HeatmapData[] = nodeThreatTimelines.map(nt => ({
  node_id: nt.node_id,
  node_type: nt.node_type,
  provider: nt.provider,
  threat_probabilities: nt.predicted_probabilities
}));
