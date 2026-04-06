export const statCardsData = [
  {
    id: 'total-threats',
    label: 'TOTAL THREATS',
    value: 147,
    trend: { value: '12%', direction: 'up' as const, isPositive: false },
    sparklineData: [85, 92, 88, 105, 98, 112, 120, 118, 130, 125, 140, 147]
  },
  {
    id: 'critical-alerts',
    label: 'CRITICAL ALERTS',
    value: 5,
    trend: { value: '2 new', direction: 'up' as const, isPositive: false },
    sparklineData: [1, 2, 1, 3, 2, 3, 4, 3, 3, 4, 4, 5]
  },
  {
    id: 'events-sec',
    label: 'EVENTS / SEC',
    value: 2800,
    format: (v: number) => `${v.toLocaleString()}`,
    trend: { value: '5%', direction: 'up' as const, isPositive: true },
    sparklineData: [2200, 2350, 2400, 2500, 2450, 2600, 2550, 2700, 2650, 2750, 2780, 2800]
  },
  {
    id: 'avg-latency',
    label: 'AVG LATENCY',
    value: 320,
    format: (v: number) => `${v}ms`,
    trend: { value: '8%', direction: 'down' as const, isPositive: true },
    sparklineData: [380, 370, 360, 355, 345, 340, 350, 338, 330, 325, 322, 320]
  },
  {
    id: 'false-positive',
    label: 'FALSE POSITIVE RATE',
    value: 4,
    format: (v: number) => `${v}%`,
    trend: { value: '1.2%', direction: 'down' as const, isPositive: true },
    sparklineData: [8.5, 7.8, 7.2, 6.5, 6.0, 5.8, 5.5, 5.2, 4.8, 4.5, 4.2, 4.0]
  },
  {
    id: 'model-accuracy',
    label: 'MODEL ACCURACY',
    value: 95,
    format: (v: number) => `${v}%`,
    trend: { value: '0.3%', direction: 'up' as const, isPositive: true },
    sparklineData: [91, 91.5, 92, 92.3, 92.8, 93, 93.5, 93.8, 94, 94.3, 94.7, 95]
  }
];

export const threatTrendData24H = [
  { time: '12 AM', critical: 1, high: 3, medium: 8, low: 15 },
  { time: '1 AM', critical: 0, high: 2, medium: 7, low: 12 },
  { time: '2 AM', critical: 0, high: 1, medium: 5, low: 10 },
  { time: '3 AM', critical: 0, high: 2, medium: 6, low: 11 },
  { time: '4 AM', critical: 1, high: 1, medium: 4, low: 9 },
  { time: '5 AM', critical: 0, high: 2, medium: 5, low: 13 },
  { time: '6 AM', critical: 0, high: 3, medium: 7, low: 14 },
  { time: '7 AM', critical: 1, high: 4, medium: 9, low: 18 },
  { time: '8 AM', critical: 2, high: 5, medium: 12, low: 22 },
  { time: '9 AM', critical: 1, high: 6, medium: 14, low: 25 },
  { time: '10 AM', critical: 2, high: 7, medium: 15, low: 28 },
  { time: '11 AM', critical: 3, high: 6, medium: 13, low: 26 },
  { time: '12 PM', critical: 2, high: 8, medium: 16, low: 30 },
  { time: '1 PM', critical: 1, high: 7, medium: 14, low: 27 },
  { time: '2 PM', critical: 3, high: 5, medium: 12, low: 24 },
  { time: '3 PM', critical: 2, high: 6, medium: 15, low: 28 },
  { time: '4 PM', critical: 1, high: 8, medium: 17, low: 32 },
  { time: '5 PM', critical: 2, high: 7, medium: 14, low: 29 },
  { time: '6 PM', critical: 3, high: 5, medium: 11, low: 25 },
  { time: '7 PM', critical: 2, high: 6, medium: 13, low: 27 },
  { time: '8 PM', critical: 1, high: 4, medium: 10, low: 22 },
  { time: '9 PM', critical: 2, high: 5, medium: 12, low: 24 },
  { time: '10 PM', critical: 1, high: 4, medium: 9, low: 20 },
  { time: '11 PM', critical: 2, high: 5, medium: 10, low: 18 },
];

export const threatTrendData1H = [
  { time: '00', critical: 0, high: 1, medium: 2, low: 5 },
  { time: '05', critical: 0, high: 0, medium: 3, low: 4 },
  { time: '10', critical: 1, high: 2, medium: 2, low: 6 },
  { time: '15', critical: 0, high: 1, medium: 4, low: 5 },
  { time: '20', critical: 0, high: 2, medium: 3, low: 7 },
  { time: '25', critical: 2, high: 1, medium: 5, low: 8 },
  { time: '30', critical: 1, high: 3, medium: 4, low: 6 },
  { time: '35', critical: 0, high: 2, medium: 3, low: 5 },
  { time: '40', critical: 0, high: 1, medium: 2, low: 4 },
  { time: '45', critical: 1, high: 2, medium: 4, low: 7 },
  { time: '50', critical: 0, high: 1, medium: 3, low: 6 },
  { time: '55', critical: 0, high: 2, medium: 2, low: 5 },
];

export const threatTrendData6H = [
  { time: '1h ago', critical: 1, high: 4, medium: 10, low: 22 },
  { time: '2h ago', critical: 2, high: 6, medium: 13, low: 27 },
  { time: '3h ago', critical: 3, high: 5, medium: 11, low: 25 },
  { time: '4h ago', critical: 2, high: 7, medium: 14, low: 29 },
  { time: '5h ago', critical: 1, high: 8, medium: 17, low: 32 },
  { time: '6h ago', critical: 2, high: 6, medium: 15, low: 28 },
];

export const threatTrendData7D = [
  { time: 'Mon', critical: 5, high: 18, medium: 42, low: 82 },
  { time: 'Tue', critical: 3, high: 15, medium: 38, low: 75 },
  { time: 'Wed', critical: 7, high: 22, medium: 45, low: 90 },
  { time: 'Thu', critical: 4, high: 19, medium: 40, low: 85 },
  { time: 'Fri', critical: 2, high: 14, medium: 35, low: 70 },
  { time: 'Sat', critical: 1, high: 10, medium: 28, low: 60 },
  { time: 'Sun', critical: 6, high: 20, medium: 44, low: 88 },
];

export const providerThreats = [
  { provider: 'AWS', critical: 3, high: 8, medium: 15, low: 30 },
  { provider: 'Azure', critical: 1, high: 5, medium: 12, low: 25 },
  { provider: 'GCP', critical: 1, high: 5, medium: 15, low: 27 },
];

export const topRiskEntities = [
  { id: 'vm_007', name: 'vm_007', displayId: 'VM-GCP-007', type: 'VM', provider: 'gcp', score: 0.97, severity: 'critical', attack: 'CVE Exploitation' },
  { id: 'user_john', name: 'user_john', displayId: 'USR-AWS-001', type: 'User', provider: 'aws', score: 0.94, severity: 'critical', attack: 'Privilege Escalation' },
  { id: 'container_k8s_01', name: 'container_k8s_01', displayId: 'CTR-AWS-001', type: 'Container', provider: 'aws', score: 0.91, severity: 'critical', attack: 'CVE Exploitation' },
  { id: 'user_alice_az', name: 'user_alice_az', displayId: 'USR-AZR-002', type: 'User', provider: 'azure', score: 0.81, severity: 'high', attack: 'Cross-Cloud Pivot' },
  { id: 'ip_mal_02', name: 'ip_mal_02', displayId: 'IP-AZR-MAL-002', type: 'IP', provider: 'azure', score: 0.78, severity: 'high', attack: 'Lateral Movement' },
  { id: 'vm_015', name: 'vm_015', displayId: 'VM-AZR-015', type: 'VM', provider: 'azure', score: 0.73, severity: 'high', attack: 'Lateral Movement' },
  { id: 'role_admin', name: 'admin_role', displayId: 'ROL-AWS-ADMIN', type: 'Role', provider: 'aws', score: 0.68, severity: 'medium', attack: 'Privilege Escalation' },
  { id: 'vm_003', name: 'vm_003', displayId: 'VM-AWS-003', type: 'VM', provider: 'aws', score: 0.62, severity: 'medium', attack: 'CVE Exploitation' },
  { id: 'ip_ext_05', name: 'ip_ext_05', displayId: 'IP-GCP-EXT-005', type: 'IP', provider: 'gcp', score: 0.58, severity: 'medium', attack: 'Reconnaissance' },
  { id: 'user_bob_gcp', name: 'user_bob_gcp', displayId: 'USR-GCP-003', type: 'User', provider: 'gcp', score: 0.54, severity: 'medium', attack: 'Cross-Cloud Pivot' },
];

export const attackDistribution = [
  { name: 'CVE Exploitation', count: 45, color: '#ef4444', percentage: 31 },
  { name: 'Privilege Escalation', count: 34, color: '#f97316', percentage: 23 },
  { name: 'Lateral Movement', count: 28, color: '#eab308', percentage: 19 },
  { name: 'Reconnaissance', count: 25, color: '#6b7280', percentage: 17 },
  { name: 'Cross-Cloud Pivot', count: 15, color: '#8b5cf6', percentage: 10 },
];

export const activityFeedData = [
  { id: 'evt-001', time: '2:34 PM', severity: 'critical', description: 'user_john assumed admin_role', provider: 'aws', type: 'malicious', attackType: 'Privilege Escalation' },
  { id: 'evt-002', time: '2:33 PM', severity: 'low', description: 'vm_003 routine health check passed', provider: 'aws', type: 'benign', attackType: null },
  { id: 'evt-003', time: '2:32 PM', severity: 'high', description: 'ip_mal_02 scanned port 443 on vm_015', provider: 'azure', type: 'malicious', attackType: 'Lateral Movement' },
  { id: 'evt-004', time: '2:31 PM', severity: 'low', description: 'user_alice logged in from Azure portal', provider: 'azure', type: 'benign', attackType: null },
  { id: 'evt-005', time: '2:30 PM', severity: 'critical', description: 'CVE-2024-9999 exploited on vm_007', provider: 'gcp', type: 'malicious', attackType: 'CVE Exploitation' },
  { id: 'evt-006', time: '2:29 PM', severity: 'low', description: 'S3 bucket backup completed successfully', provider: 'aws', type: 'benign', attackType: null },
  { id: 'evt-007', time: '2:28 PM', severity: 'medium', description: 'Unusual API call pattern from user_bob', provider: 'gcp', type: 'suspicious', attackType: 'Reconnaissance' },
  { id: 'evt-008', time: '2:27 PM', severity: 'low', description: 'Container health check: container_k8s_02', provider: 'aws', type: 'benign', attackType: null },
  { id: 'evt-009', time: '2:26 PM', severity: 'high', description: 'Lateral movement detected: vm_007 → vm_015', provider: 'azure', type: 'malicious', attackType: 'Lateral Movement' },
  { id: 'evt-010', time: '2:25 PM', severity: 'low', description: 'GCS read operation by service account', provider: 'gcp', type: 'benign', attackType: null },
  { id: 'evt-011', time: '2:24 PM', severity: 'critical', description: 'Cross-cloud pivot: user_alice AWS → Azure', provider: 'azure', type: 'malicious', attackType: 'Cross-Cloud Pivot' },
  { id: 'evt-012', time: '2:23 PM', severity: 'low', description: 'Azure AD token refresh for user_alice', provider: 'azure', type: 'benign', attackType: null },
  { id: 'evt-013', time: '2:22 PM', severity: 'medium', description: 'vm_003 high CPU usage detected (92%)', provider: 'aws', type: 'suspicious', attackType: null },
  { id: 'evt-014', time: '2:21 PM', severity: 'low', description: 'Blob storage read: analytics-data.csv', provider: 'azure', type: 'benign', attackType: null },
  { id: 'evt-015', time: '2:20 PM', severity: 'high', description: 'admin_role permissions modified', provider: 'aws', type: 'malicious', attackType: 'Privilege Escalation' },
  { id: 'evt-016', time: '2:19 PM', severity: 'low', description: 'GCP Cloud Function invoked: process-logs', provider: 'gcp', type: 'benign', attackType: null },
  { id: 'evt-017', time: '2:18 PM', severity: 'medium', description: 'Failed SSH attempt on vm_015 from unknown IP', provider: 'azure', type: 'suspicious', attackType: 'Reconnaissance' },
  { id: 'evt-018', time: '2:17 PM', severity: 'low', description: 'CloudTrail logging verified active', provider: 'aws', type: 'benign', attackType: null },
  { id: 'evt-019', time: '2:16 PM', severity: 'high', description: 'CVE-2024-1234 detected on container_k8s_01', provider: 'aws', type: 'malicious', attackType: 'CVE Exploitation' },
  { id: 'evt-020', time: '2:15 PM', severity: 'low', description: 'Network egress within normal range', provider: 'gcp', type: 'benign', attackType: null },
];

export const riskGaugeData = {
  overall: 72,
  breakdown: {
    structural: 68,
    temporal: 74,
    vulnerability: 81,
    identity: 52
  }
};
