export function PageSectionSkeleton() {
  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6">
      <div className="w-48 h-6 rounded bg-slate-200 dark:bg-white/5 animate-pulse mb-6" />
      <div className="space-y-4">
        <div className="w-full h-24 rounded-lg bg-slate-200 dark:bg-white/5 animate-pulse" />
        <div className="w-full h-24 rounded-lg bg-slate-200 dark:bg-white/5 animate-pulse" />
      </div>
    </div>
  );
}
