export function FormSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="w-24 h-4 rounded bg-slate-200 dark:bg-white/5 animate-pulse" />
          <div className="w-full h-11 rounded-lg bg-slate-200 dark:bg-white/5 animate-pulse" />
        </div>
      ))}
      <div className="w-32 h-10 rounded-lg bg-slate-200 dark:bg-white/5 animate-pulse mt-6" />
    </div>
  );
}
