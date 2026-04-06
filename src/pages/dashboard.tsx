import { useState, useEffect } from 'react';
import { BarChart3, RefreshCw, CloudOff, Link2, ShieldAlert, AlertTriangle, Zap, Timer, ShieldOff, Brain } from 'lucide-react';
import { useAuth } from '../contexts/auth-context';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Components
import { StatCard } from '../components/dashboard/stat-card';
import { ThreatTrendChart } from '../components/dashboard/threat-trend-chart';
import { ProviderComparisonChart } from '../components/dashboard/provider-comparison-chart';
import { HighRiskTable } from '../components/dashboard/high-risk-table';
import { RiskGauge } from '../components/dashboard/risk-gauge';
import { AttackDistribution } from '../components/dashboard/attack-distribution';
import { ActivityFeed } from '../components/dashboard/activity-feed';
import { ModelPerformance } from '../components/dashboard/model-performance';

// Skeletons
import { StatCardSkeleton } from '../components/loading/stat-card-skeleton';
import { ChartSkeleton } from '../components/loading/chart-skeleton';
import { TableSkeleton } from '../components/loading/table-skeleton';
import { GaugeSkeleton } from '../components/loading/gauge-skeleton';
import { FeedSkeleton } from '../components/loading/feed-skeleton';

// Data
import { statCardsData } from '../lib/mock-data/dashboard-stats';

export function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [timeRange, setTimeRange] = useState('24h');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [updatedSecondsAgo, setUpdatedSecondsAgo] = useState(0);

  // Timer for "Updated Xs ago"
  useEffect(() => {
    const timer = setInterval(() => {
      setUpdatedSecondsAgo(prev => prev + 1);
    }, 1000);
    
    // Auto refresh every 30s
    const autoRefresh = setInterval(() => {
      setUpdatedSecondsAgo(0);
      // In a real app, fetch new data here silently
    }, 30000);

    return () => {
      clearInterval(timer);
      clearInterval(autoRefresh);
    };
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setUpdatedSecondsAgo(0);
      toast.success('Dashboard refreshed');
    }, 500);
  };

  const connectedCount = Object.values(user?.connectedProviders || {}).filter(Boolean).length;

  if (connectedCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-[60vh]">
        <CloudOff className="w-16 h-16 text-slate-400 dark:text-slate-600 mb-4" />
        <h2 className="text-xl font-semibold text-slate-600 dark:text-slate-300">No Cloud Providers Connected</h2>
        <p className="text-sm text-slate-500 text-center max-w-md mt-2">
          Connect at least one cloud provider to start seeing threat intelligence data on your dashboard.
        </p>
        <button 
          onClick={() => navigate('/settings')}
          className="mt-6 h-11 px-6 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white rounded-lg font-medium transition-all flex items-center shadow-lg shadow-indigo-500/25"
        >
          <Link2 className="w-4 h-4 mr-2" /> Connect Cloud Providers
        </button>
        <p className="text-xs text-slate-500 mt-4">You can connect AWS, Azure, or GCP from Settings</p>
      </div>
    );
  }

  // Map string icons from data to Lucide components
  const iconMap: Record<string, any> = {
    'total-threats': ShieldAlert,
    'critical-alerts': AlertTriangle,
    'events-sec': Zap,
    'avg-latency': Timer,
    'false-positive': ShieldOff,
    'model-accuracy': Brain
  };

  const colorMap: Record<string, { bg: string, text: string, stroke: string }> = {
    'total-threats': { bg: 'bg-red-100 dark:bg-red-500/20', text: 'text-red-500', stroke: '#ef4444' },
    'critical-alerts': { bg: 'bg-orange-100 dark:bg-orange-500/20', text: 'text-orange-500', stroke: '#f97316' },
    'events-sec': { bg: 'bg-blue-100 dark:bg-blue-500/20', text: 'text-blue-500', stroke: '#3b82f6' },
    'avg-latency': { bg: 'bg-green-100 dark:bg-green-500/20', text: 'text-green-500', stroke: '#22c55e' },
    'false-positive': { bg: 'bg-teal-100 dark:bg-teal-500/20', text: 'text-teal-500', stroke: '#14b8a6' },
    'model-accuracy': { bg: 'bg-purple-100 dark:bg-purple-500/20', text: 'text-purple-500', stroke: '#8b5cf6' }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* SECTION 1: Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
        <div className="flex items-start gap-3">
          <div className="mt-1">
            <BarChart3 className="w-6 h-6 text-indigo-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
            <p className="text-sm text-slate-500 hidden md:block mt-0.5">Real-time threat intelligence across your cloud infrastructure</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select 
            value={timeRange}
            onChange={(e) => {
              setTimeRange(e.target.value);
              handleRefresh();
            }}
            className="w-[160px] h-9 px-3 rounded-lg bg-white dark:bg-[#12121a] border border-slate-200 dark:border-white/10 text-sm font-medium text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="1h">Last 1 Hour</option>
            <option value="6h">Last 6 Hours</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>

          <button 
            onClick={handleRefresh}
            className="h-9 px-3 flex items-center text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin text-indigo-500' : ''}`} />
            Refresh
          </button>

          <span className="text-xs text-slate-500 min-w-[100px] text-right">
            {updatedSecondsAgo < 2 ? 'Updated just now' : `Updated ${updatedSecondsAgo}s ago`}
          </span>
        </div>
      </div>

      {/* Loading State Overlay (Simulated) */}
      <div className="transition-opacity duration-300">
        
        {/* SECTION 2: Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
          {isRefreshing ? (
            Array.from({ length: 6 }).map((_, i) => <StatCardSkeleton key={i} />)
          ) : (
            statCardsData.map(stat => (
              <StatCard
                key={stat.id}
                icon={iconMap[stat.id]}
                iconColor={colorMap[stat.id].bg}
                iconTextColor={colorMap[stat.id].text}
                label={stat.label}
                value={stat.value}
                format={stat.format}
                trend={stat.trend}
                sparklineData={stat.sparklineData}
                sparklineColor={colorMap[stat.id].stroke}
                href={stat.id === 'total-threats' ? '/alerts' : stat.id === 'critical-alerts' ? '/alerts?severity=critical' : stat.id === 'events-sec' ? '/logs' : '/performance'}
              />
            ))
          )}
        </div>

        {/* SECTION 3: Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {isRefreshing ? (
            <>
              <ChartSkeleton />
              <ChartSkeleton />
            </>
          ) : (
            <>
              <ThreatTrendChart />
              <ProviderComparisonChart />
            </>
          )}
        </div>

        {/* SECTION 4: Table + Gauge */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2">
            {isRefreshing ? <TableSkeleton /> : <HighRiskTable />}
          </div>
          <div className="lg:col-span-1">
            {isRefreshing ? <GaugeSkeleton /> : <RiskGauge />}
          </div>
        </div>

        {/* SECTION 5: Distribution + Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
          <div className="lg:col-span-2">
            {isRefreshing ? <ChartSkeleton /> : <AttackDistribution />}
          </div>
          <div className="lg:col-span-3">
            {isRefreshing ? <FeedSkeleton /> : <ActivityFeed />}
          </div>
        </div>

        {/* SECTION 6: Model Performance */}
        <div className="mb-6">
          {isRefreshing ? <ChartSkeleton /> : <ModelPerformance />}
        </div>

      </div>
    </div>
  );
}
