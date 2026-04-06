export interface ModelMetricSummary {
  name: string;
  key: "rgcn" | "gru_gnn" | "fusion";
  subtitle: string;
  description: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  rocAuc: number;
  fpr?: number;
  isBest?: boolean;
}

export interface RocPoint {
  fpr: number;
  tpr: number;
}

export interface AblationResult {
  method: string;
  accuracy: number;
  f1: number;
  fpr: number;
  isProposed?: boolean;
}

export interface ScalabilityMetric {
  id: string;
  label: string;
  value: string;
  description: string;
}

export interface LossCurvePoint {
  epoch: number;
  rgcnLoss: number;
  gruLoss: number;
}
