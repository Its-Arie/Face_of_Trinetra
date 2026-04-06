import { useNavigate } from 'react-router-dom';

interface ActivityItemProps {
  event: {
    id: string;
    time: string;
    severity: string;
    description: string;
    provider: string;
    type: string;
    attackType: string | null;
  };
}

export function ActivityItem({ event }: ActivityItemProps) {
  const navigate = useNavigate();

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const getProviderStyle = (provider: string) => {
    switch(provider) {
      case 'aws': return 'bg-[#FF9900]/15 text-[#FF9900]';
      case 'azure': return 'bg-[#0078D4]/15 text-[#0078D4]';
      case 'gcp': return 'bg-[#EA4335]/15 text-[#EA4335]';
      default: return 'bg-slate-500/15 text-slate-500';
    }
  };

  const handleClick = () => {
    if (event.type === 'malicious' || event.type === 'suspicious') {
      navigate('/alerts');
    } else {
      navigate('/logs');
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-colors border-b border-slate-100 dark:border-white/5 last:border-0"
    >
      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${getSeverityColor(event.severity)} shadow-sm`} />
      
      <div className="flex-1 min-w-0">
        <p className={`text-sm truncate ${event.type === 'malicious' || event.type === 'suspicious' ? 'font-medium text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>
          {event.description}
        </p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className="text-[11px] text-slate-500 font-mono">{event.time}</span>
          {event.attackType && (
            <>
              <div className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-600" />
              <span className="text-[11px] text-slate-500">{event.attackType}</span>
            </>
          )}
        </div>
      </div>

      <div className={`text-[10px] font-medium px-1.5 py-0.5 rounded uppercase flex-shrink-0 ${getProviderStyle(event.provider)}`}>
        {event.provider}
      </div>
    </div>
  );
}
