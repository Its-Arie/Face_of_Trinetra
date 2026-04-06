import { useState, useEffect } from 'react';
import { RefreshCw, Download } from 'lucide-react';
import { toast } from 'sonner';

// Data
import { timelineTimesteps, timestepEvents, heatmapData, nodeThreatTimelines } from '../lib/mock-data/timeline-data';

// Components
import { TemporalStats } from '../components/timeline/temporal-stats';
import { PlaybackControls } from '../components/timeline/playback-controls';
import { AttackTimeline } from '../components/timeline/attack-timeline';
import { EventLog } from '../components/timeline/event-log';
import { ThreatHeatmap } from '../components/timeline/threat-heatmap';
import { PredictionChart } from '../components/timeline/prediction-chart';
import { PhaseChart } from '../components/timeline/phase-chart';

// Lazy loaded
import React, { Suspense } from 'react';
import { ChartSkeleton } from '../components/loading/chart-skeleton';
const GraphSnapshot = React.lazy(() => import('../components/timeline/graph-snapshot'));

export function Timeline() {
  const [currentTimestep, setCurrentTimestep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string>("user_john");
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Playback Interval
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      const ms = 2000 / playbackSpeed;
      interval = setInterval(() => {
        setCurrentTimestep(prev => {
          if (prev >= 19) {
            if (isLooping) return 0;
            setIsPlaying(false);
            toast.success('Playback complete');
            return 19;
          }
          return prev + 1;
        });
      }, ms);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, isLooping]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('Timeline data refreshed');
    }, 1000);
  };

  const handleExport = () => {
    toast.success('Timeline data exported as JSON');
  };

  const currentStepData = timelineTimesteps.find(t => t.timestep === currentTimestep) || timelineTimesteps[0];
  const activePhasesNames = Object.entries(currentStepData.phase_distribution)
    .filter(([k, v]) => k !== 'benign' && v > 0)
    .map(([k]) => k.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '))
    .join(', ');
  const activePhasesCount = Object.entries(currentStepData.phase_distribution)
    .filter(([k, v]) => k !== 'benign' && v > 0).length;

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Temporal Analysis</h1>
          <p className="text-sm text-slate-500 mt-0.5">Watch attacks unfold across 20 timesteps with GRU-GNN temporal threat propagation</p>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 hidden sm:inline">Last updated: {isRefreshing ? 'just now' : '10s ago'}</span>
          <button 
            onClick={handleRefresh}
            className="h-9 px-3 flex items-center text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin text-indigo-500' : ''}`} />
            Refresh
          </button>
          <button 
            onClick={handleExport}
            className="h-9 px-3 flex items-center text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4 mr-2" /> Export Timeline
          </button>
        </div>
      </div>

      <div className={`transition-opacity duration-300 ${isRefreshing ? 'opacity-50 pointer-events-none' : 'opacity-100'} space-y-6`}>
        
        {/* STATS */}
        <TemporalStats 
          currentTimestep={currentTimestep} 
          compromisedCount={currentStepData.cumulative_compromised}
          activePhasesCount={activePhasesCount}
          activePhasesNames={activePhasesNames}
        />

        {/* CONTROLS */}
        <PlaybackControls 
          currentTimestep={currentTimestep}
          setCurrentTimestep={setCurrentTimestep}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          playbackSpeed={playbackSpeed}
          setPlaybackSpeed={setPlaybackSpeed}
          isLooping={isLooping}
          setIsLooping={setIsLooping}
          currentPhase={currentStepData.phase}
        />

        {/* TIMELINE DOTS */}
        <AttackTimeline 
          currentTimestep={currentTimestep}
          setCurrentTimestep={setCurrentTimestep}
          timesteps={timelineTimesteps}
        />

        {/* GRAPH & EVENTS */}
        <div className="flex flex-col xl:flex-row gap-6">
          <div className="w-full xl:w-[55%]">
            <Suspense fallback={<ChartSkeleton />}>
              <GraphSnapshot 
                currentTimestep={currentTimestep} 
                selectedNodeId={selectedNodeId} 
                onNodeSelect={(id) => id && setSelectedNodeId(id)} 
              />
            </Suspense>
          </div>
          <div className="w-full xl:w-[45%]">
            <EventLog 
              currentTimestep={currentTimestep} 
              events={timestepEvents[currentTimestep] || []} 
            />
          </div>
        </div>

        {/* HEATMAP */}
        <ThreatHeatmap 
          currentTimestep={currentTimestep}
          setCurrentTimestep={setCurrentTimestep}
          selectedNodeId={selectedNodeId}
          setSelectedNodeId={setSelectedNodeId}
          heatmapData={heatmapData}
        />

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PredictionChart 
            selectedNodeId={selectedNodeId}
            setSelectedNodeId={setSelectedNodeId}
            nodeTimelines={nodeThreatTimelines}
          />
          <PhaseChart 
            timesteps={timelineTimesteps}
          />
        </div>

      </div>
    </div>
  );
}
