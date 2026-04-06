import { type Alert } from '../../types/alert';

export const alertStats = {
  total: 147,
  critical: 5,
  unacknowledged: 23,
  avgScore: 0.72,
  meanTimeToAck: '4m',
  mttaTrend: -12,
  activeCount: 124,
  resolvedCount: 23,
};

const baseAlerts: Alert[] = [
  {
    id: 'alert-001',
    nodeId: 'user_john',
    nodeName: 'user_john',
    nodeType: 'user',
    provider: 'aws',
    score: 0.94,
    severity: 'critical',
    status: 'new',
    attackType: 'Privilege Escalation',
    description: 'Privilege Escalation: assumed admin_role outside normal hours',
    timestamp: new Date(Date.now() - 3 * 60000).toISOString(),
    relativeTime: '3m ago',
    relatedCVEs: [],
    connectedNodes: 5,
    features: { zlog: 0.88, zcve: 0.12, riskScore: 0.91, exploitProb: 0.15, zidentity: 0.72 },
    shap: { logBehavior: 0.28, vulnerability: 0.05, riskScore: 0.22, exploitProb: 0.04, identity: 0.18 },
    narrative: 'user_john authenticated to AWS at 08:02 AM and assumed admin_role at 08:05 AM, which is outside normal behavior patterns. The user then accessed vm_007 (GCP) at 08:15 AM via cross-cloud credentials. This privilege escalation follows a pattern consistent with compromised credentials.',
    remediation: [
      { priority: 'immediate', text: 'Revoke admin_role access for user_john immediately' },
      { priority: 'high', text: 'Reset credentials and enforce MFA re-enrollment' },
      { priority: 'medium', text: 'Review all actions performed under admin_role in last 24 hours' },
    ],
    falsePositive: false,
  },
  {
    id: 'alert-002',
    nodeId: 'vm_007',
    nodeName: 'vm_007',
    nodeType: 'vm',
    provider: 'gcp',
    score: 0.97,
    severity: 'critical',
    status: 'new',
    attackType: 'CVE Exploitation',
    description: 'CVE Exploitation: CVE-2024-9999 (CVSS 9.8) actively exploited',
    timestamp: new Date(Date.now() - 8 * 60000).toISOString(),
    relativeTime: '8m ago',
    relatedCVEs: [
      { id: 'CVE-2024-9999', description: 'Remote code execution in cloud runtime', cvss: 9.8 },
    ],
    connectedNodes: 6,
    features: { zlog: 0.72, zcve: 0.95, riskScore: 0.96, exploitProb: 0.93, zidentity: 0.10 },
    shap: { logBehavior: 0.12, vulnerability: 0.35, riskScore: 0.20, exploitProb: 0.25, identity: -0.03 },
    narrative: 'vm_007 in GCP us-central1 has been compromised through CVE-2024-9999 (CVSS 9.8), a remote code execution vulnerability in the cloud runtime environment. The exploit was initiated from ip_mal_02 after lateral movement from vm_015. Anomalous outbound traffic detected post-exploitation.',
    remediation: [
      { priority: 'immediate', text: 'Isolate vm_007 from all network connections' },
      { priority: 'immediate', text: 'Patch CVE-2024-9999 on vm_007 immediately' },
      { priority: 'high', text: 'Scan all GCP VMs for the same vulnerability' },
      { priority: 'medium', text: 'Review network logs for data exfiltration indicators' },
    ],
    falsePositive: false,
  },
  {
    id: 'alert-003',
    nodeId: 'ip_mal_02',
    nodeName: 'ip_mal_02',
    nodeType: 'ip',
    provider: 'azure',
    score: 0.78,
    severity: 'high',
    status: 'acknowledged',
    attackType: 'Lateral Movement',
    description: 'Lateral Movement: scanning and connecting to multiple VMs',
    timestamp: new Date(Date.now() - 12 * 60000).toISOString(),
    relativeTime: '12m ago',
    relatedCVEs: [],
    connectedNodes: 4,
    features: { zlog: 0.75, zcve: 0.08, riskScore: 0.76, exploitProb: 0.05, zidentity: 0.03 },
    shap: { logBehavior: 0.30, vulnerability: 0.02, riskScore: 0.18, exploitProb: 0.01, identity: -0.05 },
    narrative: 'ip_mal_02 has been observed scanning port 443 on multiple Azure VMs including vm_015 and vm_020. The IP has subsequently established connections to vm_015 and used it as a pivot point to reach vm_007 in GCP. This pattern is consistent with automated lateral movement tools.',
    remediation: [
      { priority: 'immediate', text: 'Block ip_mal_02 at the Azure NSG and firewall level' },
      { priority: 'high', text: 'Review all connections from ip_mal_02 in last 48 hours' },
      { priority: 'medium', text: 'Update IDS signatures for this scanning pattern' },
    ],
    falsePositive: false,
    acknowledgedAt: new Date(Date.now() - 10 * 60000).toISOString(),
  },
  {
    id: 'alert-004',
    nodeId: 'user_alice_az',
    nodeName: 'user_alice_az',
    nodeType: 'user',
    provider: 'azure',
    score: 0.81,
    severity: 'high',
    status: 'escalated',
    attackType: 'Cross-Cloud Pivot',
    description: 'Cross-Cloud Pivot: Azure identity used to access GCP resources',
    timestamp: new Date(Date.now() - 18 * 60000).toISOString(),
    relativeTime: '18m ago',
    relatedCVEs: [],
    connectedNodes: 4,
    features: { zlog: 0.75, zcve: 0.10, riskScore: 0.78, exploitProb: 0.08, zidentity: 0.88 },
    shap: { logBehavior: 0.15, vulnerability: 0.03, riskScore: 0.12, exploitProb: 0.02, identity: 0.32 },
    narrative: 'user_alice_az (Azure) has been detected accessing GCP resources using cross-cloud federated credentials. The identity user_alice_gcp was used to access compute instances in GCP us-central1. This cross-cloud pivot is unusual and was not seen in the 30-day baseline behavior for this user.',
    remediation: [
      { priority: 'immediate', text: 'Temporarily suspend cross-cloud access for user_alice' },
      { priority: 'high', text: 'Verify federation trust between Azure and GCP tenants' },
      { priority: 'high', text: 'Contact user_alice to confirm legitimacy of cross-cloud access' },
      { priority: 'medium', text: 'Review cross-cloud access policies and tighten federation rules' },
    ],
    falsePositive: false,
    acknowledgedAt: new Date(Date.now() - 16 * 60000).toISOString(),
  },
  {
    id: 'alert-005',
    nodeId: 'container_k8s_01',
    nodeName: 'container_k8s_01',
    nodeType: 'container',
    provider: 'aws',
    score: 0.91,
    severity: 'critical',
    status: 'new',
    attackType: 'CVE Exploitation',
    description: 'CVE Exploitation: CVE-2024-1234 (CVSS 8.5) in container runtime',
    timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
    relativeTime: '25m ago',
    relatedCVEs: [
      { id: 'CVE-2024-1234', description: 'Container escape vulnerability in runtime', cvss: 8.5 },
    ],
    connectedNodes: 3,
    features: { zlog: 0.68, zcve: 0.92, riskScore: 0.88, exploitProb: 0.90, zidentity: 0.05 },
    shap: { logBehavior: 0.10, vulnerability: 0.33, riskScore: 0.18, exploitProb: 0.24, identity: -0.02 },
    narrative: 'container_k8s_01 running on AWS EKS in us-east-1 has been compromised via CVE-2024-1234 (CVSS 8.5), a container escape vulnerability. The attacker gained access to the underlying host vm_003. This container shares a node with container_k8s_02 which may also be at risk.',
    remediation: [
      { priority: 'immediate', text: 'Terminate and replace container_k8s_01' },
      { priority: 'immediate', text: 'Patch CVE-2024-1234 across all EKS nodes' },
      { priority: 'high', text: 'Audit container_k8s_02 for signs of compromise' },
      { priority: 'medium', text: 'Implement container runtime security policies' },
    ],
    falsePositive: false,
  },
];

// Generate 45 more mock alerts to reach 50
const nodeTypes = ['user', 'vm', 'container', 'ip', 'role', 'cve', 'cloudAccount'] as const;
const providers = ['aws', 'azure', 'gcp'] as const;
const attackTypes = ['CVE Exploitation', 'Privilege Escalation', 'Lateral Movement', 'Cross-Cloud Pivot', 'Reconnaissance'] as const;

const generatedAlerts: Alert[] = Array.from({ length: 45 }).map((_, i) => {
  const isResolved = i % 10 === 0;
  const isDismissed = i % 15 === 0;
  let status: Alert['status'] = 'new';
  if (isResolved) status = 'resolved';
  else if (isDismissed) status = 'dismissed';
  else if (i % 5 === 0) status = 'escalated';
  else if (i % 3 === 0) status = 'acknowledged';

  const score = Math.random() * 0.9 + 0.1;
  const severity = score > 0.9 ? 'critical' : score > 0.75 ? 'high' : score > 0.5 ? 'medium' : 'low';
  const provider = providers[i % providers.length];
  const nodeType = nodeTypes[i % nodeTypes.length];
  const attackType = attackTypes[i % attackTypes.length];

  return {
    id: `alert-${(i + 6).toString().padStart(3, '0')}`,
    nodeId: `${nodeType}_${i}`,
    nodeName: `${nodeType}_${i}`,
    nodeType,
    provider,
    score,
    severity,
    status,
    attackType,
    description: `${attackType} detected on ${nodeType}_${i}`,
    timestamp: new Date(Date.now() - (i + 30) * 60000).toISOString(),
    relativeTime: `${i + 30}m ago`,
    relatedCVEs: i % 4 === 0 ? [{ id: `CVE-2024-${1000+i}`, description: 'Generic vulnerability', cvss: 7.5 }] : [],
    connectedNodes: Math.floor(Math.random() * 5) + 1,
    features: { zlog: Math.random(), zcve: Math.random(), riskScore: score, exploitProb: Math.random(), zidentity: Math.random() },
    shap: { logBehavior: 0.2, vulnerability: 0.1, riskScore: 0.3, exploitProb: 0.2, identity: 0.2 },
    narrative: `Automated detection of ${attackType} on ${provider} resource ${nodeType}_${i}. The activity deviates significantly from the established baseline.`,
    remediation: [
      { priority: 'high', text: `Investigate ${nodeType}_${i} for unauthorized access` },
      { priority: 'medium', text: 'Review recent audit logs' }
    ],
    falsePositive: false,
    ...(status === 'dismissed' ? { dismissReason: 'Expected maintenance activity' } : {}),
    ...(status === 'resolved' ? { resolvedAt: new Date().toISOString() } : {}),
    ...(status === 'acknowledged' || status === 'escalated' ? { acknowledgedAt: new Date().toISOString() } : {})
  };
});

export const mockAlerts: Alert[] = [...baseAlerts, ...generatedAlerts];
