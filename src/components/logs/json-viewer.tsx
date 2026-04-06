import { highlightJson } from '../../lib/utils';

interface JsonViewerProps {
  data: any;
  isMalicious?: boolean;
}

export function JsonViewer({ data }: JsonViewerProps) {
  const jsonString = JSON.stringify(data, null, 2);
  const highlightedHtml = highlightJson(jsonString);

  return (
    <div className="flex-1 max-h-80 overflow-y-auto overflow-x-auto styled-scrollbar bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/30 rounded-lg p-4">
      <pre 
        className="font-mono text-xs sm:text-sm leading-relaxed m-0"
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      />
    </div>
  );
}
