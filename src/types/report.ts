export interface ReportContribution {
  key: "zlog" | "zcve" | "risk_score" | "exploit_prob" | "zidentity";
  label: string;
  value: number;
  description: string;
}

export interface RelatedCVEReportItem {
  cveId: string;
  description: string;
  cvss: number;
  exploitProbability: number;
  affectedAsset: string;
  priority: "Immediate" | "High" | "Medium" | "Low";
}

export interface RemediationItem {
  id: string;
  priority: "Immediate" | "High" | "Medium" | "Low";
  title: string;
  description: string;
  owner?: string;
}

export interface ReportHistoryItem {
  id: string;
  timestamp: string;
  label: string;
  actor?: string;
}

export interface ExplainerNode {
  id: string;
  label: string;
  type: string;
  provider?: string;
  importance: number;
}

export interface ExplainerEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  importance: number;
}

export interface RiskReport {
  id: string;
  nodeId: string;
  nodeName: string;
  nodeType: "User" | "VM" | "Container" | "IP" | "Role" | "CVE" | "CloudAccount";
  provider: "AWS" | "Azure" | "GCP";
  severity: "Critical" | "High" | "Medium" | "Low";
  attackType: "Privilege Escalation" | "Lateral Movement" | "Cross-Cloud Pivot" | "CVE Exploitation" | "Unclassified" | "Reconnaissance";
  threatScore: number;
  generatedAt: string;
  updatedAt: string;
  firstSeen: string;
  compromiseTime?: string;
  cloudAccount?: string;
  relatedAlerts: number;
  summary: string;
  narrative: string;
  analystInterpretation: string[];
  contributions: ReportContribution[];
  relatedCVEs: RelatedCVEReportItem[];
  remediation: RemediationItem[];
  history: ReportHistoryItem[];
  explainerSubgraph: {
    nodes: ExplainerNode[];
    edges: ExplainerEdge[];
  };
  reportVersion: string;
  modelStack: string[];
  relatedReportNodeIds: string[];
}
