import { TableSkeleton } from '../../components/loading/table-skeleton';

export default function AlertsLoading() {
  return (
    <div className="flex flex-col h-full relative">
      <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-white/10 shrink-0 mb-4">
        <div className="w-48 h-8 rounded bg-slate-200 dark:bg-white/5 animate-pulse" />
        <div className="w-32 h-8 rounded bg-slate-200 dark:bg-white/5 animate-pulse" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={`h-[72px] rounded-xl bg-slate-200 dark:bg-white/5 animate-pulse ${i === 4 ? 'hidden md:block' : ''} ${i > 2 ? 'hidden sm:block' : ''}`} />
        ))}
      </div>
      <div className="flex gap-4 border-b border-slate-200 dark:border-white/10 mb-3 pb-2">
        <div className="w-20 h-5 rounded bg-slate-200 dark:bg-white/5 animate-pulse" />
        <div className="w-20 h-5 rounded bg-slate-200 dark:bg-white/5 animate-pulse" />
      </div>
      <div className="h-14 rounded-lg bg-slate-200 dark:bg-white/5 animate-pulse mb-3" />
      <div className="flex-1">
        <TableSkeleton />
      </div>
    </div>
  );
}
