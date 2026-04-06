import { CheckCircle2, Loader2, XCircle, ChevronRight } from 'lucide-react';
import { pipelineStages } from '../../lib/mock-data/pipeline-stages';

export function PipelineStepper() {
  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl py-3 px-4 sm:px-6 overflow-x-auto styled-scrollbar">
      <div className="flex items-center gap-6 sm:gap-8 min-w-max">
        {pipelineStages.map((stage, index) => {
          const isSuccess = stage.status === 'success';
          const isError = stage.status === 'error';
          const isPending = stage.status === 'pending';

          const nextIsSuccess = index < pipelineStages.length - 1 && pipelineStages[index + 1].status === 'success';
          const lineClass = isSuccess && nextIsSuccess ? 'bg-green-500' : 'bg-slate-200 dark:bg-slate-700';

          return (
            <div key={stage.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="font-semibold text-sm text-slate-900 dark:text-white whitespace-nowrap">{stage.label}</span>
                  {isSuccess && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                  {isError && <XCircle className="w-4 h-4 text-red-500" />}
                  {isPending && <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-slate-500">{stage.stage}</span>
                  <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-white/5 px-1.5 rounded">{stage.time}</span>
                </div>
              </div>
              
              {index < pipelineStages.length - 1 && (
                <div className="flex items-center mx-4 sm:mx-6">
                  <div className={`h-0.5 w-8 sm:w-16 transition-colors ${lineClass}`} />
                  <ChevronRight className={`w-3 h-3 -ml-1 ${isSuccess && nextIsSuccess ? 'text-green-500' : 'text-slate-300 dark:text-slate-600'}`} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
