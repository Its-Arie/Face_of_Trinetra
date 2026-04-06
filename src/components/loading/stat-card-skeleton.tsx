export function StatCardSkeleton() {
  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-4">
      <div className="flex justify-between items-start">
        <div className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-white/5 animate-pulse" />
        <div className="w-12 h-4 rounded bg-slate-200 dark:bg-white/5 animate-pulse" />
      </div>
      <div className="mt-3">
        <div className="w-16 h-7 rounded bg-slate-200 dark:bg-white/5 animate-pulse mb-2" />
        <div className="w-24 h-3 rounded bg-slate-200 dark:bg-white/5 animate-pulse" />
      </div>
      <div className="mt-3 w-full h-10 rounded bg-slate-200 dark:bg-white/5 animate-pulse" />
    </div>
  );
}
