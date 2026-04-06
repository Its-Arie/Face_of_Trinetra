import { useState, useMemo, useEffect } from 'react';
import { Shield, Bug, Search, Target, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Simple mock data for vulnerabilities
const mockCVEs = [
  { id: 'CVE-2024-9999', cvss: 9.8, desc: 'Remote code execution in cloud runtime', software: 'CloudRuntime v2.4', provider: 'gcp', nodes: 3, prob: 0.95 },
  { id: 'CVE-2024-1234', cvss: 8.5, desc: 'Container escape vulnerability in runtime', software: 'K8s Engine v1.28', provider: 'aws', nodes: 5, prob: 0.88 },
  { id: 'CVE-2023-5555', cvss: 7.2, desc: 'Privilege escalation in IAM policy evaluation', software: 'IAM Service', provider: 'azure', nodes: 2, prob: 0.65 },
  { id: 'CVE-2023-4444', cvss: 6.5, desc: 'Information disclosure via metadata API', software: 'Metadata Server', provider: 'aws', nodes: 12, prob: 0.45 },
  { id: 'CVE-2022-1111', cvss: 5.3, desc: 'Denial of service in network load balancer', software: 'LB Service', provider: 'gcp', nodes: 8, prob: 0.25 },
];

export function Vulnerabilities() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeCVE, setActiveCVE] = useState<string | null>(null);

  const filteredCVEs = useMemo(() => {
    if (!search) return mockCVEs;
    const q = search.toLowerCase();
    return mockCVEs.filter(cve => cve.id.toLowerCase().includes(q) || cve.desc.toLowerCase().includes(q));
  }, [search]);

  useEffect(() => {
    if (activeCVE) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeCVE]);

  const getCvssStyle = (cvss: number) => {
    if (cvss >= 9.0) return 'bg-red-500/15 text-red-500 border-red-500/30';
    if (cvss >= 7.0) return 'bg-orange-500/15 text-orange-500 border-orange-500/30';
    if (cvss >= 4.0) return 'bg-yellow-500/15 text-yellow-500 border-yellow-500/30';
    return 'bg-green-500/15 text-green-500 border-green-500/30';
  };

  const getProbColor = (prob: number) => {
    if (prob >= 0.9) return 'bg-red-500';
    if (prob >= 0.7) return 'bg-orange-500';
    if (prob >= 0.4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-white/10 mb-4 shrink-0">
        <div className="flex items-center gap-3">
          <Bug className="w-6 h-6 text-yellow-500" />
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white leading-none">Vulnerability Intelligence</h1>
            <p className="text-sm text-slate-500 mt-1 hidden md:block">CVE mapping and exploitability scoring dashboard</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'TOTAL CVEs', val: '142', icon: Bug, color: 'text-indigo-500', bg: 'bg-indigo-500/20' },
          { label: 'CRITICAL', val: '18', icon: Shield, color: 'text-red-500', bg: 'bg-red-500/20' },
          { label: 'AVG CVSS', val: '6.4', icon: Target, color: 'text-orange-500', bg: 'bg-orange-500/20' },
          { label: 'EXPLOITABLE', val: '35', icon: CheckCircle2, color: 'text-yellow-500', bg: 'bg-yellow-500/20' },
        ].map((s, i) => (
          <div key={i} className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-xl p-3.5 flex items-center gap-3">
            <div className={`p-2 rounded-lg ${s.bg}`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900 dark:text-white leading-none mb-1">{s.val}</div>
              <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wider leading-none">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input 
          type="text" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search CVE ID or description..." 
          className="w-full max-w-md pl-9 pr-4 h-9 rounded-lg bg-white dark:bg-[#1a1a24] border border-slate-200 dark:border-white/10 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white"
        />
      </div>

      {/* Table Container - Relative for absolute positioning of panel */}
      <div className="flex-1 overflow-hidden relative bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl">
        
        {/* Backdrop overlay for the panel */}
        {activeCVE && (
          <div 
            className="fixed inset-0 z-40 bg-slate-900/20 dark:bg-black/40 backdrop-blur-sm"
            onClick={() => setActiveCVE(null)}
          />
        )}

        <div className="h-full overflow-y-auto styled-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 dark:bg-[#1a1a24]/50 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 sticky top-0 z-10">
              <tr>
                <th className="p-3 pl-4">CVE ID</th>
                <th className="p-3">Description</th>
                <th className="p-3 w-[100px] text-center">CVSS</th>
                <th className="p-3 w-[150px]">Exploit Prob</th>
                <th className="p-3 w-[120px] text-center">Provider</th>
                <th className="p-3 w-[100px] text-center">Nodes</th>
                <th className="p-3 w-[40px]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 relative">
              {filteredCVEs.map((cve, idx) => {
                const isActive = activeCVE === cve.id;
                
                return (
                  <tr 
                    key={cve.id} 
                    onClick={() => setActiveCVE(cve.id)}
                    className={`cursor-pointer transition-colors relative ${isActive ? 'bg-indigo-50/50 dark:bg-indigo-500/10' : 'hover:bg-slate-50 dark:hover:bg-white/5'} ${idx % 2 !== 0 && !isActive ? 'bg-slate-50/30 dark:bg-white/[0.02]' : ''}`}
                  >
                    <td className="p-3 pl-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap">{cve.id}</td>
                    <td className="p-3 text-sm text-slate-600 dark:text-slate-400 truncate max-w-[200px] sm:max-w-xs">{cve.desc}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full border text-[11px] font-bold ${getCvssStyle(cve.cvss)}`}>
                        {cve.cvss.toFixed(1)}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-[60px] bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                          <div className={`h-full ${getProbColor(cve.prob)}`} style={{ width: `${cve.prob * 100}%` }} />
                        </div>
                        <span className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
                          {(cve.prob * 100).toFixed(0)}%
                        </span>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-[10px] font-medium uppercase text-slate-600 dark:text-slate-300">
                        {cve.provider}
                      </span>
                    </td>
                    <td className="p-3 text-center text-sm font-medium text-slate-700 dark:text-slate-300">{cve.nodes}</td>
                    <td className="p-3 text-right">
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </td>

                    {/* SURGICAL FIX: Row-Anchored Panel */}
                    {isActive && (
                      <td className="p-0 m-0 border-0">
                        <div 
                          className="absolute right-0 top-0 z-50 w-80 bg-white dark:bg-[#1a1a24] rounded-xl shadow-2xl border border-slate-200 dark:border-white/10 flex flex-col animate-in fade-in slide-in-from-right-4 duration-200"
                          style={{
                            // Ensure it doesn't bleed off screen if near the bottom
                            maxHeight: '70vh',
                            transform: 'translateX(-16px) translateY(8px)', // slight offset from edge
                          }}
                          onClick={(e) => e.stopPropagation()} // Prevent row click from firing
                        >
                          {/* Panel Header */}
                          <div className="p-4 border-b border-slate-200 dark:border-white/10 flex justify-between items-start shrink-0">
                            <div>
                              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{cve.id}</h3>
                              <span className={`inline-block mt-1 px-2 py-0.5 rounded-full border text-[10px] font-bold ${getCvssStyle(cve.cvss)}`}>
                                CVSS {cve.cvss.toFixed(1)}
                              </span>
                            </div>
                            <button onClick={() => setActiveCVE(null)} className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                              <X className="w-4 h-4 text-slate-500" />
                            </button>
                          </div>

                          {/* Panel Scrollable Content */}
                          <div className="flex-1 overflow-y-auto p-4 styled-scrollbar space-y-5">
                            <div>
                              <div className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-1">Description</div>
                              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{cve.desc}</p>
                            </div>
                            
                            <div>
                              <div className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-1">Affected Software</div>
                              <p className="text-sm text-slate-700 dark:text-slate-300">{cve.software}</p>
                            </div>

                            <div>
                              <div className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">Risk Prediction</div>
                              <div className="flex items-center gap-3">
                                <div className="text-2xl font-bold text-red-500">{(cve.prob * 100).toFixed(0)}%</div>
                                <div className="text-xs text-slate-500">Probability of exploitation based on current environment context.</div>
                              </div>
                            </div>

                            {/* SURGICAL FIX: Buttons placed directly below content, no flex-1 push */}
                            <div className="mt-6 flex flex-col gap-2">
                              <button onClick={() => navigate(`/graph?cve=${cve.id}`)} className="w-full h-8 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white text-xs font-medium rounded-lg transition-all shadow-md shadow-indigo-500/20">
                                View in Attack Graph
                              </button>
                              <button className="w-full h-8 flex items-center justify-center border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 text-xs font-medium rounded-lg transition-colors">
                                Export JSON
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
