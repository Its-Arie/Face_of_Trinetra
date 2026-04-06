import { Suspense } from 'react';
import { LogMonitorClient } from '../components/logs/log-monitor-client';

export function Logs() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 animate-pulse">Loading log monitor...</div>}>
      <LogMonitorClient />
    </Suspense>
  );
}
