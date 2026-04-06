export type AttackPhase =
  | "privilege_escalation"
  | "lateral_movement"
  | "cross_cloud_pivot"
  | "cve_exploitation";

export interface TimelineTimestep {
  timestep: number;
  phase: AttackPhase | "none";
  total_events: number;
  malicious_events: number;
  benign_events: number;
  new_compromised_count: number;
  newly_compromised_nodes: string[];
  cumulative_compromised: number;
  description: string;
  phase_distribution: {
    privilege_escalation: number;
    lateral_movement: number;
    cross_cloud_pivot: number;
    cve_exploitation: number;
    benign: number;
  };
}

export interface TimestepEvent {
  id: string;
  timestep: number;
  timestamp: string;
  provider: "aws" | "azure" | "gcp";
  entity_id: string;
  entity_type: string;
  action: string;
  target_id: string | null;
  is_malicious: boolean;
  severity: "critical" | "high" | "medium" | "low" | "benign";
  attack_phase: AttackPhase | null;
}

export interface NodeThreatTimeline {
  node_id: string;
  node_type: string;
  provider: "aws" | "azure" | "gcp";
  compromise_timestep: number | null;
  predicted_probabilities: number[];
  actual_labels: number[];
  first_predicted_above_threshold: number | null;
  prediction_mse: number;
  early_warning_steps: number | null;
}

export interface HeatmapData {
  node_id: string;
  node_type: string;
  provider: "aws" | "azure" | "gcp";
  threat_probabilities: number[];
}
