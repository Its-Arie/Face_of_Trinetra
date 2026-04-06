export function TableSkeleton() {
  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl flex flex-col h-full overflow-hidden">
      <div className="p-4 sm:p-6 flex justify-between items-center border-b border-slate-200 dark:border-white/10">
        <div>
          <div className="w-40 h-5 rounded bg-slate-200 dark:bg-white/5 animate-pulse mb-2" />
          <div className="w-56 h-3 rounded bg-slate-200 dark:bg-white/5 animate-pulse" />
        </div>
        <div className="w-32 h-8 rounded-lg bg-slate-200 dark:bg-white/5 animate-pulse" />
      </div>
      <div className="p-4 space-y-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 rounded bg-slate-200 dark:bg-white/5 animate-pulse" />
              <div className="space-y-2">
                <div className="w-32 h-4 rounded bg-slate-200 dark:bg-white/5 animate-pulse" />
                <div className="w-24 h-3 rounded bg-slate-200 dark:bg-white/5 animate-pulse" />
              </div>
            </div>
            <div className="w-16 h-5 rounded-full bg-slate-200 dark:bg-white/5 animate-pulse" />
            <div className="w-24 h-2 rounded-full bg-slate-200 dark:bg-white/5 animate-pulse" />
            <div className="w-16 h-5 rounded-full bg-slate-200 dark:bg-white/5 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
