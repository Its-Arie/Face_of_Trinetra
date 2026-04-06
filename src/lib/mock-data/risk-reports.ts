import { type RiskReport } from '../../types/report';

const baseReports: RiskReport[] = [
  {
    id: 'rpt_001',
    nodeId: 'user_john',
    nodeName: 'user_john',
    nodeType: 'User',
    provider: 'AWS',
    severity: 'Critical',
    attackType: 'Privilege Escalation',
    threatScore: 0.94,
    generatedAt: new Date(Date.now() - 3 * 60000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 60000).toISOString(),
    firstSeen: new Date(Date.now() - 24 * 3600000).toISOString(),
    compromiseTime: 't=3',
    cloudAccount: 'aws_account_001',
    relatedAlerts: 3,
    summary: 'Privilege escalation detected via anomalous role assumption',
    narrative: 'user_john was observed assuming admin_role on AWS at timestep t=3, a high-risk privilege escalation pattern. Shortly after, the identity accessed vm_007, which is associated with CVE-2024-9999 (CVSS 9.8) and elevated exploit likelihood. The temporal model detected increasing compromise probability across subsequent timesteps, while graph reasoning linked the identity to a broader attack path involving vulnerable infrastructure and privileged resource access. Together, these signals produced a critical threat score of 0.94.',
    analystInterpretation: [
      'Initial trigger: anomalous role assumption (admin_role)',
      'Escalation vector: privileged access path to critical infrastructure',
      'Contextual enrichment: highly vulnerable VM present in attack path',
      'Recommendation: isolate identity and revoke credentials immediately'
    ],
    contributions: [
      { key: 'zlog', label: 'Log Behavior', value: 0.31, description: 'Anomalous ASSUME_ROLE sequence' },
      { key: 'zcve', label: 'Vulnerability', value: 0.24, description: 'Access to highly vulnerable asset' },
      { key: 'risk_score', label: 'Risk Score', value: 0.14, description: 'High baseline risk for admin_role' },
      { key: 'exploit_prob', label: 'Exploit Prob', value: 0.11, description: 'High probability of lateral movement' },
      { key: 'zidentity', label: 'Identity', value: -0.05, description: 'Normal identity baseline' }
    ],
    relatedCVEs: [
      { cveId: 'CVE-2024-9999', description: 'Remote code execution vulnerability in exposed VM service', cvss: 9.8, exploitProbability: 0.91, affectedAsset: 'vm_007', priority: 'Immediate' }
    ],
    remediation: [
      { id: 'rem_1', priority: 'Immediate', title: 'Disable or rotate credentials for user_john', description: 'This identity has exhibited high-confidence malicious behavior and should be isolated to prevent continued access.', owner: 'IAM Team' },
      { id: 'rem_2', priority: 'Immediate', title: 'Revoke admin_role session tokens', description: 'The detected attack path includes anomalous privileged role assumption.', owner: 'IAM Team' },
      { id: 'rem_3', priority: 'High', title: 'Isolate vm_007 from production network', description: 'The node is associated with high exploitability vulnerability context.', owner: 'SecOps' }
    ],
    history: [
      { id: 'h1', timestamp: new Date(Date.now() - 5 * 60000).toISOString(), label: 'Initial alert generated', actor: 'System' },
      { id: 'h2', timestamp: new Date(Date.now() - 4 * 60000).toISOString(), label: 'Threat score recalculated (t=3)', actor: 'GRU-GNN Model' },
      { id: 'h3', timestamp: new Date(Date.now() - 3 * 60000).toISOString(), label: 'Explainability report generated', actor: 'GNNExplainer' }
    ],
    explainerSubgraph: {
      nodes: [
        { id: 'user_john', label: 'user_john', type: 'user', provider: 'aws', importance: 1.0 },
        { id: 'admin_role', label: 'admin_role', type: 'role', provider: 'aws', importance: 0.85 },
        { id: 'vm_007', label: 'vm_007', type: 'vm', provider: 'gcp', importance: 0.72 },
        { id: 'cve_9999', label: 'CVE-2024-9999', type: 'cve', provider: 'gcp', importance: 0.65 },
        { id: 'aws_account_001', label: 'aws_account_001', type: 'cloudAccount', provider: 'aws', importance: 0.3 }
      ],
      edges: [
        { id: 'e1', source: 'user_john', target: 'admin_role', label: 'ASSUMES_ROLE', importance: 0.95 },
        { id: 'e2', source: 'user_john', target: 'vm_007', label: 'ACCESS', importance: 0.88 },
        { id: 'e3', source: 'vm_007', target: 'cve_9999', label: 'HAS_VULNERABILITY', importance: 0.75 },
        { id: 'e4', source: 'user_john', target: 'aws_account_001', label: 'BELONGS_TO', importance: 0.4 }
      ]
    },
    reportVersion: '1.0.0',
    modelStack: ['Structural RGCN', 'Temporal GRU-GNN', 'Fusion Layer'],
    relatedReportNodeIds: ['vm_007', 'admin_role']
  },
  {
    id: 'rpt_002',
    nodeId: 'vm_007',
    nodeName: 'vm_007',
    nodeType: 'VM',
    provider: 'GCP',
    severity: 'Critical',
    attackType: 'CVE Exploitation',
    threatScore: 0.97,
    generatedAt: new Date(Date.now() - 8 * 60000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60000).toISOString(),
    firstSeen: new Date(Date.now() - 48 * 3600000).toISOString(),
    compromiseTime: 't=14',
    cloudAccount: 'gcp_project_001',
    relatedAlerts: 5,
    summary: 'Critical CVE exploitation with high probability of lateral movement',
    narrative: 'vm_007 in GCP us-central1 has been compromised through CVE-2024-9999 (CVSS 9.8), a remote code execution vulnerability in the cloud runtime environment. The exploit was initiated from ip_mal_02 after lateral movement from vm_015. Anomalous outbound traffic was detected post-exploitation, indicating potential data exfiltration or further scanning.',
    analystInterpretation: [
      'Initial trigger: Inbound connection from known malicious IP',
      'Escalation vector: RCE vulnerability exploitation',
      'Contextual enrichment: Post-exploitation anomalous outbound traffic',
      'Recommendation: Isolate VM and patch immediately'
    ],
    contributions: [
      { key: 'zlog', label: 'Log Behavior', value: 0.12, description: 'Anomalous network traffic' },
      { key: 'zcve', label: 'Vulnerability', value: 0.45, description: 'Presence of CVSS 9.8 vulnerability' },
      { key: 'risk_score', label: 'Risk Score', value: 0.20, description: 'High asset criticality' },
      { key: 'exploit_prob', label: 'Exploit Prob', value: 0.25, description: 'Active exploit signature matched' },
      { key: 'zidentity', label: 'Identity', value: -0.02, description: 'N/A' }
    ],
    relatedCVEs: [
      { cveId: 'CVE-2024-9999', description: 'Remote code execution in cloud runtime', cvss: 9.8, exploitProbability: 0.95, affectedAsset: 'vm_007', priority: 'Immediate' }
    ],
    remediation: [
      { id: 'rem_1', priority: 'Immediate', title: 'Isolate vm_007 from all network connections', description: 'Prevent further lateral movement or data exfiltration.', owner: 'SecOps' },
      { id: 'rem_2', priority: 'Immediate', title: 'Patch CVE-2024-9999', description: 'Apply latest security patches to the cloud runtime.', owner: 'Cloud Infra Team' },
      { id: 'rem_3', priority: 'High', title: 'Review network logs for data exfiltration', description: 'Analyze VPC flow logs for outbound anomalies.', owner: 'SecOps' }
    ],
    history: [
      { id: 'h1', timestamp: new Date(Date.now() - 10 * 60000).toISOString(), label: 'Initial alert generated', actor: 'System' },
      { id: 'h2', timestamp: new Date(Date.now() - 8 * 60000).toISOString(), label: 'Explainability report generated', actor: 'GNNExplainer' }
    ],
    explainerSubgraph: {
      nodes: [
        { id: 'vm_007', label: 'vm_007', type: 'vm', provider: 'gcp', importance: 1.0 },
        { id: 'cve_9999', label: 'CVE-2024-9999', type: 'cve', provider: 'gcp', importance: 0.95 },
        { id: 'ip_mal_02', label: 'ip_mal_02', type: 'ip', provider: 'azure', importance: 0.80 },
        { id: 'vm_015', label: 'vm_015', type: 'vm', provider: 'azure', importance: 0.60 }
      ],
      edges: [
        { id: 'e1', source: 'vm_007', target: 'cve_9999', label: 'HAS_VULNERABILITY', importance: 0.95 },
        { id: 'e2', source: 'ip_mal_02', target: 'vm_007', label: 'CONNECTS_TO', importance: 0.85 },
        { id: 'e3', source: 'ip_mal_02', target: 'vm_015', label: 'CONNECTS_TO', importance: 0.65 }
      ]
    },
    reportVersion: '1.0.0',
    modelStack: ['Structural RGCN', 'Temporal GRU-GNN', 'Fusion Layer'],
    relatedReportNodeIds: ['ip_mal_02', 'vm_015']
  },
  {
    id: 'rpt_003',
    nodeId: 'ip_mal_02',
    nodeName: 'ip_mal_02',
    nodeType: 'IP',
    provider: 'Azure',
    severity: 'High',
    attackType: 'Lateral Movement',
    threatScore: 0.78,
    generatedAt: new Date(Date.now() - 12 * 60000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 60000).toISOString(),
    firstSeen: new Date(Date.now() - 72 * 3600000).toISOString(),
    compromiseTime: 't=8',
    relatedAlerts: 4,
    summary: 'Scanning and lateral movement originating from external IP',
    narrative: 'ip_mal_02 has been observed scanning port 443 on multiple Azure VMs including vm_015 and vm_020. The IP has subsequently established connections to vm_015 and used it as a pivot point to reach vm_007 in GCP. This pattern is consistent with automated lateral movement tools.',
    analystInterpretation: [
      'Initial trigger: Port scanning behavior',
      'Escalation vector: Successful connection to internal VMs',
      'Contextual enrichment: Cross-cloud connectivity observed',
      'Recommendation: Block IP at NSG level'
    ],
    contributions: [
      { key: 'zlog', label: 'Log Behavior', value: 0.45, description: 'High frequency port scanning' },
      { key: 'zcve', label: 'Vulnerability', value: 0.05, description: 'N/A' },
      { key: 'risk_score', label: 'Risk Score', value: 0.22, description: 'Known malicious IP reputation' },
      { key: 'exploit_prob', label: 'Exploit Prob', value: 0.08, description: 'Low probability without CVE' },
      { key: 'zidentity', label: 'Identity', value: -0.02, description: 'N/A' }
    ],
    relatedCVEs: [],
    remediation: [
      { id: 'rem_1', priority: 'Immediate', title: 'Block ip_mal_02 at the Azure NSG and firewall level', description: 'Prevent further scanning and access.', owner: 'Network Team' },
      { id: 'rem_2', priority: 'High', title: 'Review all connections from ip_mal_02 in last 48 hours', description: 'Identify potential compromised assets.', owner: 'SecOps' }
    ],
    history: [
      { id: 'h1', timestamp: new Date(Date.now() - 15 * 60000).toISOString(), label: 'Initial alert generated', actor: 'System' },
      { id: 'h2', timestamp: new Date(Date.now() - 12 * 60000).toISOString(), label: 'Explainability report generated', actor: 'GNNExplainer' }
    ],
    explainerSubgraph: {
      nodes: [
        { id: 'ip_mal_02', label: 'ip_mal_02', type: 'ip', provider: 'azure', importance: 1.0 },
        { id: 'vm_015', label: 'vm_015', type: 'vm', provider: 'azure', importance: 0.85 },
        { id: 'vm_007', label: 'vm_007', type: 'vm', provider: 'gcp', importance: 0.75 }
      ],
      edges: [
        { id: 'e1', source: 'ip_mal_02', target: 'vm_015', label: 'CONNECTS_TO', importance: 0.90 },
        { id: 'e2', source: 'ip_mal_02', target: 'vm_007', label: 'CONNECTS_TO', importance: 0.80 }
      ]
    },
    reportVersion: '1.0.0',
    modelStack: ['Structural RGCN', 'Temporal GRU-GNN', 'Fusion Layer'],
    relatedReportNodeIds: ['vm_015', 'vm_007']
  },
  {
    id: 'rpt_004',
    nodeId: 'user_alice_az',
    nodeName: 'user_alice_az',
    nodeType: 'User',
    provider: 'Azure',
    severity: 'High',
    attackType: 'Cross-Cloud Pivot',
    threatScore: 0.81,
    generatedAt: new Date(Date.now() - 18 * 60000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 60000).toISOString(),
    firstSeen: new Date(Date.now() - 120 * 3600000).toISOString(),
    compromiseTime: 't=8',
    cloudAccount: 'azure_tenant_001',
    relatedAlerts: 2,
    summary: 'Azure identity used to access GCP resources anomalously',
    narrative: 'user_alice_az (Azure) has been detected accessing GCP resources using cross-cloud federated credentials. The identity user_alice_gcp was used to access compute instances in GCP us-central1. This cross-cloud pivot is unusual and was not seen in the 30-day baseline behavior for this user.',
    analystInterpretation: [
      'Initial trigger: Anomalous cross-cloud federation usage',
      'Escalation vector: Access to compute instances in GCP',
      'Contextual enrichment: Deviation from 30-day baseline',
      'Recommendation: Suspend cross-cloud access and verify intent'
    ],
    contributions: [
      { key: 'zlog', label: 'Log Behavior', value: 0.25, description: 'Anomalous cross-cloud login' },
      { key: 'zcve', label: 'Vulnerability', value: -0.05, description: 'N/A' },
      { key: 'risk_score', label: 'Risk Score', value: 0.15, description: 'Elevated identity risk' },
      { key: 'exploit_prob', label: 'Exploit Prob', value: 0.05, description: 'Low' },
      { key: 'zidentity', label: 'Identity', value: 0.41, description: 'Strong cross-cloud pivot signal' }
    ],
    relatedCVEs: [],
    remediation: [
      { id: 'rem_1', priority: 'Immediate', title: 'Temporarily suspend cross-cloud access for user_alice', description: 'Prevent further unauthorized access to GCP.', owner: 'IAM Team' },
      { id: 'rem_2', priority: 'High', title: 'Verify federation trust between Azure and GCP tenants', description: 'Ensure federation configurations are secure.', owner: 'Cloud Security' },
      { id: 'rem_3', priority: 'High', title: 'Contact user_alice to confirm legitimacy', description: 'Determine if activity was authorized.', owner: 'SecOps' }
    ],
    history: [
      { id: 'h1', timestamp: new Date(Date.now() - 20 * 60000).toISOString(), label: 'Initial alert generated', actor: 'System' },
      { id: 'h2', timestamp: new Date(Date.now() - 18 * 60000).toISOString(), label: 'Explainability report generated', actor: 'GNNExplainer' }
    ],
    explainerSubgraph: {
      nodes: [
        { id: 'user_alice_az', label: 'user_alice_az', type: 'user', provider: 'azure', importance: 1.0 },
        { id: 'user_alice_gcp', label: 'user_alice_gcp', type: 'user', provider: 'gcp', importance: 0.95 },
        { id: 'vm_015', label: 'vm_015', type: 'vm', provider: 'azure', importance: 0.5 },
        { id: 'azure_tenant_001', label: 'azure_tenant_001', type: 'cloudAccount', provider: 'azure', importance: 0.3 }
      ],
      edges: [
        { id: 'e1', source: 'user_alice_az', target: 'user_alice_gcp', label: 'CROSS_CLOUD_ACCESS', importance: 0.98 },
        { id: 'e2', source: 'user_alice_az', target: 'vm_015', label: 'ACCESS', importance: 0.4 }
      ]
    },
    reportVersion: '1.0.0',
    modelStack: ['Structural RGCN', 'Temporal GRU-GNN', 'Fusion Layer'],
    relatedReportNodeIds: ['user_alice_gcp']
  },
  {
    id: 'rpt_005',
    nodeId: 'container_k8s_01',
    nodeName: 'container_k8s_01',
    nodeType: 'Container',
    provider: 'AWS',
    severity: 'Critical',
    attackType: 'CVE Exploitation',
    threatScore: 0.91,
    generatedAt: new Date(Date.now() - 25 * 60000).toISOString(),
    updatedAt: new Date(Date.now() - 15 * 60000).toISOString(),
    firstSeen: new Date(Date.now() - 200 * 3600000).toISOString(),
    compromiseTime: 't=8',
    relatedAlerts: 6,
    summary: 'Container escape vulnerability exploited in runtime',
    narrative: 'container_k8s_01 running on AWS EKS in us-east-1 has been compromised via CVE-2024-1234 (CVSS 8.5), a container escape vulnerability. The attacker gained access to the underlying host vm_003. This container shares a node with container_k8s_02 which may also be at risk.',
    analystInterpretation: [
      'Initial trigger: Exploitation of known container escape CVE',
      'Escalation vector: Host (vm_003) compromise',
      'Contextual enrichment: Neighboring containers at risk',
      'Recommendation: Terminate container and patch host'
    ],
    contributions: [
      { key: 'zlog', label: 'Log Behavior', value: 0.15, description: 'Anomalous syscalls detected' },
      { key: 'zcve', label: 'Vulnerability', value: 0.42, description: 'CVSS 8.5 container escape' },
      { key: 'risk_score', label: 'Risk Score', value: 0.18, description: 'Production EKS cluster' },
      { key: 'exploit_prob', label: 'Exploit Prob', value: 0.20, description: 'High exploit probability' },
      { key: 'zidentity', label: 'Identity', value: -0.04, description: 'N/A' }
    ],
    relatedCVEs: [
      { cveId: 'CVE-2024-1234', description: 'Container escape vulnerability in runtime', cvss: 8.5, exploitProbability: 0.88, affectedAsset: 'container_k8s_01', priority: 'Immediate' }
    ],
    remediation: [
      { id: 'rem_1', priority: 'Immediate', title: 'Terminate and replace container_k8s_01', description: 'Stop the active compromise.', owner: 'DevOps' },
      { id: 'rem_2', priority: 'Immediate', title: 'Patch CVE-2024-1234 across all EKS nodes', description: 'Update container runtime to secure version.', owner: 'Cloud Infra' },
      { id: 'rem_3', priority: 'High', title: 'Audit container_k8s_02 for signs of compromise', description: 'Check neighboring containers on the same host.', owner: 'SecOps' }
    ],
    history: [
      { id: 'h1', timestamp: new Date(Date.now() - 30 * 60000).toISOString(), label: 'Initial alert generated', actor: 'System' },
      { id: 'h2', timestamp: new Date(Date.now() - 25 * 60000).toISOString(), label: 'Explainability report generated', actor: 'GNNExplainer' }
    ],
    explainerSubgraph: {
      nodes: [
        { id: 'container_k8s_01', label: 'container_k8s_01', type: 'container', provider: 'aws', importance: 1.0 },
        { id: 'cve_1234', label: 'CVE-2024-1234', type: 'cve', provider: 'aws', importance: 0.90 },
        { id: 'vm_003', label: 'vm_003', type: 'vm', provider: 'aws', importance: 0.85 }
      ],
      edges: [
        { id: 'e1', source: 'container_k8s_01', target: 'cve_1234', label: 'EXPLOITS', importance: 0.95 },
        { id: 'e2', source: 'container_k8s_01', target: 'vm_003', label: 'DEPLOYED_ON', importance: 0.80 }
      ]
    },
    reportVersion: '1.0.0',
    modelStack: ['Structural RGCN', 'Temporal GRU-GNN', 'Fusion Layer'],
    relatedReportNodeIds: ['vm_003', 'container_k8s_02']
  }
];

const nodeTypes = ['User', 'VM', 'Container', 'IP', 'Role', 'CVE', 'CloudAccount'] as const;
const providers = ['AWS', 'Azure', 'GCP'] as const;
const attackTypes = ['CVE Exploitation', 'Privilege Escalation', 'Lateral Movement', 'Cross-Cloud Pivot', 'Reconnaissance', 'Unclassified'] as const;

const generatedReports: RiskReport[] = Array.from({ length: 19 }).map((_, i) => {
  const score = Math.random() * 0.9 + 0.1;
  const severity = score > 0.9 ? 'Critical' : score > 0.75 ? 'High' : score > 0.5 ? 'Medium' : 'Low';
  const provider = providers[i % providers.length];
  const nodeType = nodeTypes[i % nodeTypes.length];
  const attackType = attackTypes[i % attackTypes.length];

  return {
    id: `rpt_${(i + 6).toString().padStart(3, '0')}`,
    nodeId: `node_${i + 6}`,
    nodeName: `${nodeType}_${i + 6}`,
    nodeType,
    provider,
    severity,
    attackType,
    threatScore: score,
    generatedAt: new Date(Date.now() - (i + 30) * 60000).toISOString(),
    updatedAt: new Date(Date.now() - (i + 20) * 60000).toISOString(),
    firstSeen: new Date(Date.now() - 100 * 3600000).toISOString(),
    relatedAlerts: Math.floor(Math.random() * 5) + 1,
    summary: `Automated explainability report for ${nodeType}_${i + 6}`,
    narrative: `The node ${nodeType}_${i + 6} in ${provider} exhibited behavior consistent with ${attackType}. The GNNExplainer identified a subgraph of related entities contributing to this elevated threat score of ${score.toFixed(2)}.`,
    analystInterpretation: [
      `Initial trigger: Anomalous activity detected for ${nodeType}`,
      `Escalation vector: Potential ${attackType}`,
      'Recommendation: Investigate entity and related alerts'
    ],
    contributions: [
      { key: 'zlog', label: 'Log Behavior', value: Math.random() * 0.4 - 0.1, description: 'Log anomalies' },
      { key: 'zcve', label: 'Vulnerability', value: Math.random() * 0.4 - 0.1, description: 'CVE proximity' },
      { key: 'risk_score', label: 'Risk Score', value: Math.random() * 0.3, description: 'Baseline risk' },
      { key: 'exploit_prob', label: 'Exploit Prob', value: Math.random() * 0.3, description: 'Exploit likelihood' },
      { key: 'zidentity', label: 'Identity', value: Math.random() * 0.3 - 0.1, description: 'Identity linking' }
    ],
    relatedCVEs: i % 3 === 0 ? [
      { cveId: `CVE-2024-${1000 + i}`, description: 'Generic vulnerability', cvss: 7.5, exploitProbability: 0.6, affectedAsset: `node_${i + 6}`, priority: 'Medium' }
    ] : [],
    remediation: [
      { id: `rem_${i}_1`, priority: 'High', title: `Investigate ${nodeType}_${i + 6}`, description: 'Review recent logs and activity.', owner: 'SecOps' }
    ],
    history: [
      { id: `h_${i}_1`, timestamp: new Date(Date.now() - (i + 35) * 60000).toISOString(), label: 'Report generated', actor: 'System' }
    ],
    explainerSubgraph: {
      nodes: [
        { id: `node_${i + 6}`, label: `${nodeType}_${i + 6}`, type: nodeType.toLowerCase(), provider: provider.toLowerCase(), importance: 1.0 }
      ],
      edges: []
    },
    reportVersion: '1.0.0',
    modelStack: ['Structural RGCN', 'Temporal GRU-GNN', 'Fusion Layer'],
    relatedReportNodeIds: []
  };
});

export const mockRiskReports: RiskReport[] = [...baseReports, ...generatedReports];
