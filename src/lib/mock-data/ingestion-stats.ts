export const ingestionStats = {
  totalEvents: 112847,
  eventsPerSecond: 2800,
  errorCount: 3,
  avgLatency: 320,
  perProviderStats: {
    aws: { events: 45230, rate: 1120, errors: 1, status: "connected", lastSync: "2s ago" },
    azure: { events: 38100, rate: 940, errors: 0, status: "connected", lastSync: "5s ago" },
    gcp: { events: 29517, rate: 740, errors: 2, status: "delayed", lastSync: "45s ago" }
  }
};
