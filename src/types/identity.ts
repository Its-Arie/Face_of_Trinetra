export interface CloudIdentity {
  identity_id: string;
  display_name: string;
  provider: "aws" | "azure" | "gcp";
  account_type: "human" | "service" | "system";
  email: string | null;
  arn_or_id: string;
  last_active: string;
  action_count_24h: number;
  malicious_action_count: number;
}

export interface IdentityGroup {
  group_id: string;
  logical_name: string;
  identities: {
    aws: CloudIdentity | null;
    azure: CloudIdentity | null;
    gcp: CloudIdentity | null;
  };
  linking_status: "fully_linked" | "partially_linked" | "unmapped";
  avg_similarity: number;
  pairwise_similarity: {
    aws_azure: number | null;
    aws_gcp: number | null;
    azure_gcp: number | null;
  };
  risk_score: number;
  risk_level: "critical" | "high" | "medium" | "low";
  risk_trend: number;
  total_actions_24h: number;
  malicious_actions_24h: number;
  feature_contributions: {
    username_pattern: number;
    login_behavior: number;
    resource_access: number;
    time_correlation: number;
    ip_overlap: number;
  };
  pivot_alert_count: number;
}

export interface IdentityEmbeddingPoint {
  identity_id: string;
  display_name: string;
  provider: "aws" | "azure" | "gcp";
  group_id: string;
  logical_name: string;
  x: number;
  y: number;
  is_outlier: boolean;
  risk_level: "critical" | "high" | "medium" | "low";
}

export interface PivotAlert {
  id: string;
  timestamp: string;
  relative_time: string;
  severity: "critical" | "high" | "medium" | "low";
  source_identity: string;
  source_provider: "aws" | "azure" | "gcp";
  target_identity: string;
  target_provider: "aws" | "azure" | "gcp";
  logical_user: string;
  pivot_path: string;
  threat_score: number;
  evidence: string[];
  related_node_id: string;
}

export interface CrossCloudActivity {
  id: string;
  timestamp: string;
  identity_used: string;
  provider: "aws" | "azure" | "gcp";
  action: string;
  target: string | null;
  region: string;
  source_ip: string;
  is_malicious: boolean;
  attack_phase: string | null;
}

export interface UnmappedIdentity {
  identity_id: string;
  provider: "aws" | "azure" | "gcp";
  account_type: "human" | "service" | "system";
  last_seen: string;
  recent_actions: CrossCloudActivity[];
  risk_assessment: "low" | "medium" | "high";
  suggested_action: string;
}
