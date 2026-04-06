import { modelMetricSummaries } from '../../lib/mock-data/model-metrics';
import { ModelCard } from './model-card';

export function ModelCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {modelMetricSummaries.map((model) => (
        <ModelCard key={model.key} model={model} />
      ))}
    </div>
  );
}
