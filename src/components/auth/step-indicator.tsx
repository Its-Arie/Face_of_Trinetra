import { Check } from 'lucide-react';

interface StepIndicatorProps {
  steps: { label: string; completed: boolean; current: boolean }[];
}

export function StepIndicator({ steps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-8 w-full max-w-sm mx-auto">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className="flex flex-col items-center relative">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 z-10 ${
              step.completed ? 'bg-indigo-500 text-white' :
              step.current ? 'bg-indigo-500 text-white ring-4 ring-indigo-500/30 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]' :
              'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
            }`}>
              {step.completed ? <Check className="w-4 h-4" /> : index + 1}
            </div>
            <span className={`absolute top-10 text-[10px] whitespace-nowrap font-medium ${
              step.current || step.completed ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'
            }`}>
              {step.label}
            </span>
          </div>
          
          {index < steps.length - 1 && (
            <div className={`w-12 sm:w-16 h-0.5 mx-2 transition-colors duration-300 ${
              step.completed ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-slate-800 border-t border-dashed border-slate-300 dark:border-slate-700 bg-transparent'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}
