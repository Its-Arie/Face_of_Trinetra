export function DetailPanelSkeleton() {
  return (
    <div className="w-80 bg-white/90 dark:bg-[#1a1a24]/95 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-white/10 p-4 flex flex-col h-full shadow-2xl">
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-2">
          <div className="w-32 h-6 rounded bg-slate-200 dark:bg-white/5 animate-pulse" />
          <div className="flex gap-2">
            <div className="w-16 h-5 rounded bg-slate-200 dark:bg-white/5 animate-pulse" />
            <div className="w-16 h-5 rounded bg-slate-200 dark:bg-white/5 animate-pulse" />
          </div>
        </div>
        <div className="w-8 h-8 rounded bg-slate-200 dark:bg-white/5 animate-pulse" />
      </div>
      <div className="space-y-6">
        <div>
          <div className="w-24 h-4 rounded bg-slate-200 dark:bg-white/5 animate-pulse mb-2" />
          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-white/5 animate-pulse" />
        </div>
        <div className="space-y-4">
          <div className="w-32 h-4 rounded bg-slate-200 dark:bg-white/5 animate-pulse" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="w-full h-3 rounded bg-slate-200 dark:bg-white/5 animate-pulse" />
              <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-white/5 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
