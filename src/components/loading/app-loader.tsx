import { Shield } from 'lucide-react';

export function AppLoader() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-50 dark:bg-[#0a0a0f] transition-colors duration-300">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center mb-5 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] shadow-lg shadow-indigo-500/25">
        <Shield className="w-7 h-7 text-white" />
      </div>
      <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-violet-500 mb-2">
        TRINETRA
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
        Initializing threat intelligence workspace
      </p>
      <div className="w-40 h-1 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden relative">
        <div className="absolute top-0 left-0 h-full w-1/2 bg-indigo-500 rounded-full animate-[slideRight_1s_ease-in-out_infinite_alternate]" />
      </div>
    </div>
  );
}
