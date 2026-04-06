export function ChartSkeleton() {
  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="w-32 h-5 rounded bg-slate-200 dark:bg-white/5 animate-pulse mb-2" />
          <div className="w-48 h-3 rounded bg-slate-200 dark:bg-white/5 animate-pulse" />
        </div>
        <div className="w-24 h-8 rounded-lg bg-slate-200 dark:bg-white/5 animate-pulse" />
      </div>
      <div className="flex-1 w-full h-[300px] rounded bg-slate-200 dark:bg-white/5 animate-pulse" />
    </div>
  );
}
