import { useState, useRef, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { activityFeedData } from '../../lib/mock-data/dashboard-stats';
import { ActivityItem } from './activity-item';

export function ActivityFeed() {
  const navigate = useNavigate();
  const [autoScroll, setAutoScroll] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      const scrollElement = scrollRef.current;
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  }, [autoScroll]); // In a real app, also depend on the data array

  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl flex flex-col h-full overflow-hidden">
      <div className="p-4 sm:p-6 pb-4 border-b border-slate-200 dark:border-white/10 flex justify-between items-center bg-white/50 dark:bg-transparent">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="w-[18px] h-[18px] text-indigo-500" /> Live Activity Feed
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Real-time events across all providers</p>
        </div>
        
        <div className="flex items-center gap-4">
          <label className="hidden sm:flex items-center gap-1.5 cursor-pointer">
            <input 
              type="checkbox" 
              checked={autoScroll}
              onChange={(e) => setAutoScroll(e.target.checked)}
              className="rounded text-indigo-500 focus:ring-indigo-500 bg-slate-100 dark:bg-white/5 border-transparent w-3.5 h-3.5" 
            />
            <span className="text-xs text-slate-500">Auto-scroll</span>
          </label>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
            <span className="text-xs font-medium text-green-500 uppercase tracking-wider">Live</span>
          </div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto h-[380px] p-2 sm:p-4 styled-scrollbar"
      >
        <div className="space-y-1">
          {activityFeedData.map((event) => (
            <ActivityItem key={event.id} event={event} />
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-white/10 flex justify-between items-center bg-white/50 dark:bg-transparent">
        <span className="text-xs text-slate-500">Showing latest 20 events</span>
        <button onClick={() => navigate('/logs')} className="text-xs font-medium text-indigo-500 hover:text-indigo-400 transition-colors">
          View All Logs →
        </button>
      </div>
    </div>
  );
}
