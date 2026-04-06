import { useState } from 'react';
import { ChevronDown, BookOpen } from 'lucide-react';

export function SchemaMapping() {
  const [isOpen, setIsOpen] = useState(false);

  const mappings = [
    { provider: 'AWS', pField: 'eventName', uField: 'action', bg: 'bg-[#FF9900]/15 text-[#FF9900]' },
    { provider: 'AWS', pField: 'userIdentity.arn', uField: 'entity_id', bg: 'bg-[#FF9900]/15 text-[#FF9900]' },
    { provider: 'AWS', pField: 'userIdentity.type', uField: 'entity_type', bg: 'bg-[#FF9900]/15 text-[#FF9900]' },
    { provider: 'AWS', pField: 'sourceIPAddress', uField: 'source_ip', bg: 'bg-[#FF9900]/15 text-[#FF9900]' },
    { provider: 'AWS', pField: 'awsRegion', uField: 'region', bg: 'bg-[#FF9900]/15 text-[#FF9900]' },
    { provider: 'Azure', pField: 'operationName', uField: 'action', bg: 'bg-[#0078D4]/15 text-[#0078D4]' },
    { provider: 'Azure', pField: 'caller', uField: 'entity_id', bg: 'bg-[#0078D4]/15 text-[#0078D4]' },
    { provider: 'Azure', pField: 'callerType', uField: 'entity_type', bg: 'bg-[#0078D4]/15 text-[#0078D4]' },
    { provider: 'Azure', pField: 'callerIpAddress', uField: 'source_ip', bg: 'bg-[#0078D4]/15 text-[#0078D4]' },
    { provider: 'Azure', pField: 'resourceLocation', uField: 'region', bg: 'bg-[#0078D4]/15 text-[#0078D4]' },
    { provider: 'GCP', pField: 'methodName', uField: 'action', bg: 'bg-[#EA4335]/15 text-[#EA4335]' },
    { provider: 'GCP', pField: 'principalEmail', uField: 'entity_id', bg: 'bg-[#EA4335]/15 text-[#EA4335]' },
    { provider: 'GCP', pField: 'principalType', uField: 'entity_type', bg: 'bg-[#EA4335]/15 text-[#EA4335]' },
    { provider: 'GCP', pField: 'callerIp', uField: 'source_ip', bg: 'bg-[#EA4335]/15 text-[#EA4335]' },
    { provider: 'GCP', pField: 'resource.labels.location', uField: 'region', bg: 'bg-[#EA4335]/15 text-[#EA4335]' },
    { provider: 'All', pField: 'timestamp / eventTime', uField: 'timestamp (ISO 8601)', bg: 'bg-slate-500/15 text-slate-500 dark:text-slate-400' },
    { provider: 'All', pField: 'status / errorCode', uField: 'status', bg: 'bg-slate-500/15 text-slate-500 dark:text-slate-400' },
  ];

  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden mt-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
          <BookOpen className="w-4 h-4 text-indigo-500" />
          📖 Schema Mapping Reference — How provider fields map to UDM++ canonical schema
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-black/10">
          <div className="overflow-x-auto styled-scrollbar">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead className="bg-slate-100/50 dark:bg-white/5 text-xs font-medium uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="p-3 w-32 rounded-tl-lg">Provider</th>
                  <th className="p-3">Provider Field</th>
                  <th className="p-3 rounded-tr-lg">UDM++ Canonical Field</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/50 dark:divide-white/5">
                {mappings.map((m, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-transparent' : 'bg-slate-50/30 dark:bg-white/[0.02]'}>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase border-transparent ${m.bg}`}>
                        {m.provider}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-xs text-slate-600 dark:text-slate-400">{m.pField}</td>
                    <td className="p-3 font-mono text-xs font-semibold text-indigo-500 dark:text-indigo-400">{m.uField}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 italic mt-4">
            This mapping is performed by Stage 1 of the TRINETRA pipeline using a CodeBERT-based normalization model with LoRA adapters. The canonical schema ensures cross-cloud compatibility for downstream graph construction.
          </p>
        </div>
      )}
    </div>
  );
}
