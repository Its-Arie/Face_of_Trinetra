export function FeedSkeleton() {
  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl flex flex-col h-full overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-white/10 flex justify-between items-center">
        <div>
          <div className="w-32 h-5 rounded bg-slate-200 dark:bg-white/5 animate-pulse mb-2" />
          <div className="w-48 h-3 rounded bg-slate-200 dark:bg-white/5 animate-pulse" />
        </div>
      </div>
      <div className="p-4 space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-white/5 animate-pulse mt-1.5" />
            <div className="flex-1 space-y-2">
              <div className="w-full max-w-[200px] h-4 rounded bg-slate-200 dark:bg-white/5 animate-pulse" />
              <div className="w-24 h-3 rounded bg-slate-200 dark:bg-white/5 animate-pulse" />
            </div>
            <div className="w-12 h-4 rounded bg-slate-200 dark:bg-white/5 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
