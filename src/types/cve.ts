export interface CVSSVector {
  attackVector: "Network" | "Adjacent" | "Local" | "Physical";
  attackComplexity: "Low" | "High";
  privilegesRequired: "None" | "Low" | "High";
  userInteraction: "None" | "Required";
  scope: "Unchanged" | "Changed";
  confidentialityImpact: "None" | "Low" | "High";
  integrityImpact: "None" | "Low" | "High";
  availabilityImpact: "None" | "Low" | "High";
  vectorString: string;
}

export interface AffectedNode {
  nodeId: string;
  nodeName: string;
  nodeType: "VM" | "Container" | "IP" | "User";
  provider: "aws" | "azure" | "gcp";
  threatScore: number;
  severity: "critical" | "high" | "medium" | "low";
}

export interface RemediationStep {
  priority: "immediate" | "high" | "medium" | "low";
  description: string;
}

export interface RelatedAlert {
  alertId: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  timestamp: string;
}

export interface NERExtraction {
  id: string;
  entityType: "SOFTWARE" | "VERSION" | "ERROR" | "EXPLOIT" |
              "IP" | "PORT" | "USER" | "PATH";
  extractedText: string;
  confidence: number;
  sourceLogId: string;
  provider: "aws" | "azure" | "gcp";
  timestamp: string;
}

export interface CVEEntry {
  id: string;
  cvssScore: number;
  cvssVector: CVSSVector;
  severity: "critical" | "high" | "medium" | "low";
  description: string;
  shortDescription: string;
  affectedSoftware: string;
  softwareVersion: string;
  provider: "aws" | "azure" | "gcp";
  affectedNodes: AffectedNode[];
  exploitProbability: number;
  predictedRiskScore: number;
  predictedExploitProb: number;
  remediationSteps: RemediationStep[];
  relatedAlerts: RelatedAlert[];
  status: "core" | "ner_extracted" | "pending";
  discoveredAt: string;
  tsneX: number;
  tsneY: number;
  cluster: "web" | "container" | "cloud_identity" | "os_infra" | "uncategorized";
}

export interface NEREntityCounts {
  SOFTWARE: number;
  VERSION: number;
  ERROR: number;
  EXPLOIT: number;
  IP: number;
  PORT: number;
  USER: number;
  PATH: number;
}
