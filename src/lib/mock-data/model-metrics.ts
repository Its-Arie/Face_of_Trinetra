import { type ModelMetricSummary, type RocPoint, type AblationResult, type ScalabilityMetric, type LossCurvePoint } from '../../types/metrics';

export const modelMetricSummaries: ModelMetricSummary[] = [
  {
    name: 'Structural GNN',
    key: 'rgcn',
    subtitle: 'Relation-aware RGCN for heterogeneous graph threat detection',
    description: 'Strong relational reasoning across typed edges and nodes.',
    accuracy: 0.92,
    precision: 0.91,
    recall: 0.93,
    f1: 0.92,
    rocAuc: 0.94,
  },
  {
    name: 'Temporal GNN',
    key: 'gru_gnn',
    subtitle: 'GRU-enhanced graph model for compromise propagation prediction',
    description: 'Captures multi-step attack progression over time windows.',
    accuracy: 0.93,
    precision: 0.92,
    recall: 0.94,
    f1: 0.93,
    rocAuc: 0.95,
  },
  {
    name: 'Fusion Risk Model',
    key: 'fusion',
    subtitle: 'Combined structural + temporal + risk fusion output',
    description: 'Best overall model with highest predictive quality and lowest noise.',
    accuracy: 0.95,
    precision: 0.94,
    recall: 0.96,
    f1: 0.95,
    rocAuc: 0.97,
    fpr: 0.04,
    isBest: true,
  }
];

// Generate smooth synthetic ROC curves for the sparklines
const generateRocCurve = (auc: number): RocPoint[] => {
  const points: RocPoint[] = [];
  const steps = 20;
  for (let i = 0; i <= steps; i++) {
    const fpr = i / steps;
    // Simple power function to simulate ROC curve shape based on AUC
    // Higher AUC = sharper curve towards top-left
    const power = auc > 0.95 ? 0.15 : auc > 0.9 ? 0.25 : 0.4;
    const tpr = Math.min(1, Math.pow(fpr, power));
    points.push({ fpr, tpr });
  }
  return points;
};

export const rocCurves: Record<string, RocPoint[]> = {
  rgcn: generateRocCurve(0.94),
  gru_gnn: generateRocCurve(0.95),
  fusion: generateRocCurve(0.97),
};

export const ablationResults: AblationResult[] = [
  { method: 'Rule-Based SIEM', accuracy: 0.81, f1: 0.79, fpr: 0.12 },
  { method: 'Structural GNN Only', accuracy: 0.91, f1: 0.91, fpr: 0.07 },
  { method: 'Temporal GNN Only', accuracy: 0.93, f1: 0.93, fpr: 0.06 },
  { method: 'Proposed Dual GNN Fusion', accuracy: 0.95, f1: 0.95, fpr: 0.04, isProposed: true },
];

export const scalabilityMetrics: ScalabilityMetric[] = [
  { id: 'eps', label: 'Events / sec', value: '2,800', description: 'Near real-time processing' },
  { id: 'latency', label: 'Avg Latency', value: '320 ms', description: 'From ingestion to detection' },
  { id: 'alert', label: 'Alert Latency', value: '90 ms', description: 'Time to detection output' },
  { id: 'graph', label: 'Graph Update / 10k Events', value: '2.4 s', description: 'Incremental heterogeneous graph rebuild' },
];

export const lossCurveData: LossCurvePoint[] = [
  { epoch: 1, rgcnLoss: 1.22, gruLoss: 1.34 },
  { epoch: 2, rgcnLoss: 1.06, gruLoss: 1.18 },
  { epoch: 3, rgcnLoss: 0.94, gruLoss: 1.02 },
  { epoch: 4, rgcnLoss: 0.85, gruLoss: 0.91 },
  { epoch: 5, rgcnLoss: 0.76, gruLoss: 0.83 },
  { epoch: 6, rgcnLoss: 0.69, gruLoss: 0.76 },
  { epoch: 7, rgcnLoss: 0.63, gruLoss: 0.71 },
  { epoch: 8, rgcnLoss: 0.58, gruLoss: 0.66 },
  { epoch: 9, rgcnLoss: 0.54, gruLoss: 0.61 },
  { epoch: 10, rgcnLoss: 0.50, gruLoss: 0.57 },
  { epoch: 11, rgcnLoss: 0.46, gruLoss: 0.53 },
  { epoch: 12, rgcnLoss: 0.43, gruLoss: 0.50 },
  { epoch: 13, rgcnLoss: 0.40, gruLoss: 0.47 },
  { epoch: 14, rgcnLoss: 0.38, gruLoss: 0.44 },
  { epoch: 15, rgcnLoss: 0.36, gruLoss: 0.42 },
  { epoch: 16, rgcnLoss: 0.34, gruLoss: 0.40 },
  { epoch: 17, rgcnLoss: 0.33, gruLoss: 0.39 },
  { epoch: 18, rgcnLoss: 0.32, gruLoss: 0.38 },
  { epoch: 19, rgcnLoss: 0.31, gruLoss: 0.37 },
  { epoch: 20, rgcnLoss: 0.30, gruLoss: 0.36 },
];
