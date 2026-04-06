import { Suspense, lazy } from 'react';
import { PageSectionSkeleton } from '../components/loading/page-section-skeleton';

const IdentitiesClient = lazy(() => import('../components/identities/identities-client').then(m => ({ default: m.IdentitiesClient })));

export function Identities() {
  return (
    <Suspense fallback={
      <div className="space-y-6">
        <PageSectionSkeleton />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3"><PageSectionSkeleton /></div>
          <div className="lg:col-span-2"><PageSectionSkeleton /></div>
        </div>
        <PageSectionSkeleton />
      </div>
    }>
      <IdentitiesClient />
    </Suspense>
  );
}
