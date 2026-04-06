import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LogPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (num: number) => void;
}

export function LogPagination({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange, onItemsPerPageChange }: LogPaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Simple pagination logic for 5 buttons max
  let pages = [];
  if (totalPages <= 5) {
    pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    if (currentPage <= 3) {
      pages = [1, 2, 3, 4, '...', totalPages];
    } else if (currentPage >= totalPages - 2) {
      pages = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    }
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 py-4 border-t border-slate-200 dark:border-white/10">
      <div className="text-xs text-slate-500">
        Showing {totalItems === 0 ? 0 : startItem}-{endItem} of {totalItems} logs
      </div>

      <div className="flex items-center gap-1">
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 dark:border-white/10 text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 disabled:opacity-50 disabled:pointer-events-none transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {pages.map((p, i) => (
          <button
            key={i}
            onClick={() => typeof p === 'number' ? onPageChange(p) : null}
            disabled={p === '...'}
            className={`w-8 h-8 flex items-center justify-center rounded-md text-xs font-medium transition-colors ${
              p === currentPage 
                ? 'bg-indigo-500 text-white border border-indigo-500' 
                : p === '...' 
                  ? 'text-slate-400 cursor-default'
                  : 'border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
            }`}
          >
            {p}
          </button>
        ))}

        <button 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 dark:border-white/10 text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 disabled:opacity-50 disabled:pointer-events-none transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="hidden sm:flex items-center gap-2">
        <span className="text-xs text-slate-500">Per page:</span>
        <select 
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange?.(Number(e.target.value))}
          className="h-8 px-2 rounded-md bg-white dark:bg-[#1a1a24] border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
}
