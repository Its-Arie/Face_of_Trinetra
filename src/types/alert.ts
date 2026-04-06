export interface AlertCVE {
  id: string;
  description: string;
  cvss: number;
}

export interface RemediationStep {
  priority: 'immediate' | 'high' | 'medium';
  text: string;
}

export interface Alert {
  id: string;
  nodeId: string;
  nodeName: string;
  nodeType: 'user' | 'vm' | 'container' | 'ip' | 'role' | 'cve' | 'cloudAccount';
  provider: 'aws' | 'azure' | 'gcp';
  score: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'new' | 'acknowledged' | 'escalated' | 'resolved' | 'dismissed';
  attackType: 'CVE Exploitation' | 'Privilege Escalation' | 'Lateral Movement' |
              'Cross-Cloud Pivot' | 'Reconnaissance' | null;
  description: string;
  timestamp: string;
  relativeTime: string;
  relatedCVEs: AlertCVE[];
  connectedNodes: number;
  features: {
    zlog: number;
    zcve: number;
    riskScore: number;
    exploitProb: number;
    zidentity: number;
  };
  shap: {
    logBehavior: number;
    vulnerability: number;
    riskScore: number;
    exploitProb: number;
    identity: number;
  };
  narrative: string;
  remediation: RemediationStep[];
  falsePositive: boolean;
  fpReason?: string;
  fpNotes?: string;
  dismissReason?: string;
  acknowledgedAt?: string;
  resolvedAt?: string;
}
