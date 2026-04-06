import { SkipBack, StepBack, Play, Pause, StepForward, SkipForward, Repeat } from 'lucide-react';

interface PlaybackControlsProps {
  currentTimestep: number;
  setCurrentTimestep: (t: number) => void;
  isPlaying: boolean;
  setIsPlaying: (p: boolean) => void;
  playbackSpeed: number;
  setPlaybackSpeed: (s: number) => void;
  isLooping: boolean;
  setIsLooping: (l: boolean) => void;
  currentPhase: string;
}

export function PlaybackControls({
  currentTimestep, setCurrentTimestep, isPlaying, setIsPlaying, 
  playbackSpeed, setPlaybackSpeed, isLooping, setIsLooping, currentPhase
}: PlaybackControlsProps) {

  return (
    <div className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-6">
      
      {/* Left */}
      <div className="flex flex-col items-center md:items-start min-w-[150px]">
        <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">t = {currentTimestep}</div>
        <div className="text-sm text-slate-500">Phase: {currentPhase === 'none' ? 'No Activity' : currentPhase.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</div>
      </div>

      {/* Center */}
      <div className="flex-1 w-full flex flex-col items-center max-w-2xl">
        <div className="flex items-center gap-2 mb-4">
          <button 
            onClick={() => setCurrentTimestep(0)} 
            disabled={currentTimestep === 0}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 disabled:opacity-30 transition-colors"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setCurrentTimestep(Math.max(0, currentTimestep - 1))} 
            disabled={currentTimestep === 0}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 disabled:opacity-30 transition-colors"
          >
            <StepBack className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)} 
            className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:scale-105 transition-transform shadow-lg shadow-indigo-500/25"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
          </button>
          <button 
            onClick={() => setCurrentTimestep(Math.min(19, currentTimestep + 1))} 
            disabled={currentTimestep === 19}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 disabled:opacity-30 transition-colors"
          >
            <StepForward className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setCurrentTimestep(19)} 
            disabled={currentTimestep === 19}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 disabled:opacity-30 transition-colors"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        <div className="w-full px-2 relative">
          <input 
            type="range" 
            min="0" 
            max="19" 
            step="1" 
            value={currentTimestep} 
            onChange={(e) => setCurrentTimestep(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-2 px-1">
            <span>t=0</span>
            <span>t=5</span>
            <span>t=10</span>
            <span>t=15</span>
            <span>t=19</span>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4 min-w-[150px] justify-center md:justify-end">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">Speed:</span>
          <div className="flex rounded-md border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 overflow-hidden">
            {[1, 2, 4].map(s => (
              <button 
                key={s} 
                onClick={() => setPlaybackSpeed(s)}
                className={`px-2.5 py-1 text-xs font-medium transition-colors ${playbackSpeed === s ? 'bg-indigo-500 text-white' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10'}`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
        <button 
          onClick={() => setIsLooping(!isLooping)}
          className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${isLooping ? 'text-indigo-500 bg-indigo-500/10' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
          title="Loop Playback"
        >
          <Repeat className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
