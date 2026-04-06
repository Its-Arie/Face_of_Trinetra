export function GaugeSkeleton() {
  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col h-full items-center justify-center">
      <div className="w-full flex justify-between mb-6">
        <div className="w-32 h-5 rounded bg-slate-200 dark:bg-white/5 animate-pulse" />
      </div>
      <div className="w-32 h-32 rounded-full bg-slate-200 dark:bg-white/5 animate-pulse mb-4" />
      <div className="w-16 h-6 rounded-full bg-slate-200 dark:bg-white/5 animate-pulse mb-8" />
      <div className="w-full space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex gap-3 items-center">
            <div className="w-20 h-3 rounded bg-slate-200 dark:bg-white/5 animate-pulse" />
            <div className="flex-1 h-1.5 rounded-full bg-slate-200 dark:bg-white/5 animate-pulse" />
            <div className="w-8 h-3 rounded bg-slate-200 dark:bg-white/5 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
