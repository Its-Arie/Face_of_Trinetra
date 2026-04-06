import { Link } from 'react-router-dom';
import { Shield, ShieldAlert, Zap, Timer, Link as LinkIcon, RefreshCw, Network, Bug, Link2, Clock, FileText, BarChart3, Cloud, CloudRain, Server } from 'lucide-react';
import { mockAlerts, mockProviderStatus, mockThreatStats } from '../lib/mock-data';
import { formatNumber } from '../lib/utils';
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export function Home() {
  const [threatCount, setThreatCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = mockThreatStats.total;
    const duration = 1000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setThreatCount(end);
        clearInterval(timer);
      } else {
        setThreatCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, []);

  const severityData = [
    { name: 'Critical', value: mockThreatStats.critical, color: '#ef4444' },
    { name: 'High', value: mockThreatStats.high, color: '#f97316' },
    { name: 'Medium', value: mockThreatStats.medium, color: '#eab308' },
    { name: 'Low', value: mockThreatStats.low, color: '#22c55e' },
  ];

  const attackTypeData = [
    { name: 'CVE Exploitation', value: 45, fill: '#ef4444' },
    { name: 'Privilege Escalation', value: 34, fill: '#f97316' },
    { name: 'Lateral Movement', value: 28, fill: '#eab308' },
    { name: 'Cross-Cloud Pivot', value: 15, fill: '#8b5cf6' },
    { name: 'Unclassified', value: 25, fill: '#64748b' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row gap-8 items-center bg-white/50 dark:bg-[#12121a]/50 p-8 rounded-2xl border border-slate-200 dark:border-white/10 backdrop-blur-xl">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium border border-indigo-100 dark:border-indigo-500/20">
            <span className="mr-2">🔱</span> Powered by Graph Neural Networks
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-violet-500 leading-tight">
            Intelligent Threat Detection Across Multi-Cloud Environments
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Real-time detection of privilege escalation, lateral movement, cross-cloud pivots, and CVE exploitation across AWS, Azure, and GCP.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <Link to="/dashboard" className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white font-medium transition-all transform hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/25">
              Go to Dashboard
            </Link>
            <Link to="/graph" className="px-6 py-3 rounded-xl border border-indigo-500 text-indigo-600 dark:text-indigo-400 font-medium hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors">
              View Attack Graph
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-2/5 flex justify-center items-center h-64 relative">
          {/* Simple CSS animated illustration */}
          <div className="relative w-48 h-48">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 p-4 bg-orange-500/10 rounded-full border border-orange-500/20 animate-pulse">
              <Cloud className="w-8 h-8 text-orange-500" />
            </div>
            <div className="absolute bottom-0 left-0 p-4 bg-blue-500/10 rounded-full border border-blue-500/20 animate-pulse delay-75">
              <CloudRain className="w-8 h-8 text-blue-500" />
            </div>
            <div className="absolute bottom-0 right-0 p-4 bg-red-500/10 rounded-full border border-red-500/20 animate-pulse delay-150">
              <Server className="w-8 h-8 text-red-500" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-indigo-500/10 rounded-full border border-indigo-500/20 shadow-[0_0_30px_rgba(99,102,241,0.3)]">
              <Shield className="w-10 h-10 text-indigo-500" />
            </div>
            {/* Connecting lines */}
            <svg className="absolute inset-0 w-full h-full -z-10" viewBox="0 0 100 100">
              <line x1="50" y1="20" x2="50" y2="50" stroke="rgba(99,102,241,0.5)" strokeWidth="2" strokeDasharray="4" className="animate-[dash_1s_linear_infinite]" />
              <line x1="20" y1="80" x2="50" y2="50" stroke="rgba(99,102,241,0.5)" strokeWidth="2" strokeDasharray="4" className="animate-[dash_1s_linear_infinite]" />
              <line x1="80" y1="80" x2="50" y2="50" stroke="rgba(99,102,241,0.5)" strokeWidth="2" strokeDasharray="4" className="animate-[dash_1s_linear_infinite]" />
            </svg>
          </div>
        </div>
      </section>

      {/* Live Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: ShieldAlert, label: 'Threats Detected', value: threatCount, trend: '↑ 12% from yesterday', color: 'red', route: '/alerts' },
          { icon: Zap, label: 'Events Processed', value: '2,800/s', trend: '↑ 5% from last hour', color: 'blue', route: '/logs' },
          { icon: Timer, label: 'Avg Latency', value: '320ms', trend: '↓ 8% from last hour', color: 'green', route: '/performance', goodTrend: true },
          { icon: LinkIcon, label: 'Active Chains', value: 3, trend: '↑ 1 new today', color: 'orange', route: '/graph' },
        ].map((stat, i) => (
          <Link key={i} to={stat.route} className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 dark:border-white/10 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors" onClick={(e) => { e.preventDefault(); /* animate spin */ }}>
                <RefreshCw className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300" />
              </button>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-${stat.color}-500/10`}>
              <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{stat.label}</p>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{stat.value}</h3>
            <p className={`text-xs font-medium ${stat.goodTrend ? 'text-green-500' : stat.trend.includes('↑') ? 'text-red-500' : 'text-green-500'}`}>
              {stat.trend}
            </p>
          </Link>
        ))}
      </section>

      {/* Cloud Provider Status */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockProviderStatus.map((provider) => (
          <div key={provider.name} className={`bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl p-6 rounded-2xl border-t-4 border-slate-200 dark:border-white/10 shadow-sm ${
            provider.name === 'AWS' ? 'border-t-orange-500' :
            provider.name === 'Azure' ? 'border-t-blue-500' : 'border-t-red-500'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                {provider.name === 'AWS' && <Cloud className="w-6 h-6 text-orange-500" />}
                {provider.name === 'Azure' && <CloudRain className="w-6 h-6 text-blue-500" />}
                {provider.name === 'GCP' && <Server className="w-6 h-6 text-red-500" />}
                <h3 className="font-semibold text-lg text-slate-900 dark:text-white">{provider.name}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {provider.status === 'Delayed' ? `Delayed (${provider.delay})` : provider.status}
                </span>
                <div className={`w-2.5 h-2.5 rounded-full ${
                  provider.status === 'Connected' ? 'bg-green-500 animate-pulse' :
                  provider.status === 'Delayed' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2"><Zap className="w-4 h-4"/> Events</span>
                <span className="font-medium text-slate-900 dark:text-white">{formatNumber(provider.events)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2"><ShieldAlert className="w-4 h-4"/> Threats</span>
                <span className="font-medium text-slate-900 dark:text-white">{provider.threats}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2"><Clock className="w-4 h-4"/> Last Sync</span>
                <span className="font-medium text-slate-900 dark:text-white">{provider.lastSync}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Link to={`/logs?provider=${provider.name.toLowerCase()}`} className="flex-1 py-2 text-center text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg transition-colors">
                View Logs
              </Link>
              <Link to={`/alerts?provider=${provider.name.toLowerCase()}`} className="flex-1 py-2 text-center text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg transition-colors">
                View Alerts
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* Severity Overview & Attack Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 dark:border-white/10">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Threat Severity Overview</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 h-64 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={severityData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {severityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'rgba(18, 18, 26, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">{mockThreatStats.total}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Total</span>
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              {severityData.map((sev) => (
                <div key={sev.name} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sev.color }} />
                    <span className="font-medium text-slate-700 dark:text-slate-300">{sev.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-slate-900 dark:text-white">{sev.value}</span>
                    <Link to={`/alerts?severity=${sev.name.toLowerCase()}`} className="text-xs text-indigo-500 hover:text-indigo-400">View All →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 dark:border-white/10 flex flex-col">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">📊 Attack Type Distribution</h2>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attackTypeData} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} width={120} />
                <RechartsTooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: 'rgba(18, 18, 26, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                  {attackTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-right">
            <Link to="/graph" className="text-sm font-medium text-indigo-500 hover:text-indigo-400 inline-flex items-center gap-1 group">
              View Attack Graph <span className="transform transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </section>
      </div>

      {/* Recent Critical Alerts */}
      <section className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 dark:border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <span>🚨</span> Recent Critical Alerts
          </h2>
          <Link to="/alerts" className="text-sm font-medium text-indigo-500 hover:text-indigo-400">View All Alerts →</Link>
        </div>
        <div className="space-y-3">
          {mockAlerts.map((alert) => (
            <div key={alert.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors gap-4">
              <div className="flex items-start gap-4">
                <div className={`mt-1.5 w-3 h-3 rounded-full shrink-0 ${
                  alert.severity === 'Critical' ? 'bg-red-500' :
                  alert.severity === 'High' ? 'bg-orange-500' :
                  alert.severity === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`} />
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-bold text-slate-900 dark:text-white">{alert.nodeName}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300">{alert.nodeType}</span>
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                      alert.provider === 'AWS' ? 'bg-orange-500/10 text-orange-500' :
                      alert.provider === 'Azure' ? 'bg-blue-500/10 text-blue-500' : 'bg-red-500/10 text-red-500'
                    }`}>{alert.provider}</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{alert.description}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-auto w-full">
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${alert.severity === 'Critical' ? 'bg-red-500' : alert.severity === 'High' ? 'bg-orange-500' : 'bg-yellow-500'}`}
                      style={{ width: `${alert.score * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{alert.score.toFixed(2)}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400 mr-2 whitespace-nowrap">{alert.timestamp}</span>
                  <Link to={`/reports/${alert.nodeName}`} className="px-3 py-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 rounded-lg transition-colors">
                    Details
                  </Link>
                  <button className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg transition-colors hidden sm:block">
                    Ack
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: Network, title: "Attack Graph", desc: "Explore the live heterogeneous knowledge graph with 7 node types and 10 edge types", route: "/graph" },
          { icon: Bug, title: "CVE Intelligence", desc: "View vulnerability risk scores, CVSS mappings, and exploit probabilities", route: "/vulnerabilities" },
          { icon: Link2, title: "Identity Linking", desc: "Track cross-cloud identity pivots across AWS, Azure, and GCP", route: "/identities" },
          { icon: Clock, title: "Temporal Analysis", desc: "Watch attacks unfold over 20 timesteps with temporal progression", route: "/timeline" },
          { icon: FileText, title: "Risk Reports", desc: "Explainable AI-powered threat reports with SHAP attribution and attack paths", route: "/reports" },
          { icon: BarChart3, title: "Model Performance", desc: "RGCN, GRU-GNN, and Fusion model metrics with ablation study results", route: "/performance" },
        ].map((card, i) => (
          <Link key={i} to={card.route} className="bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 dark:border-white/10 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:border-indigo-500/30 group flex flex-col h-full">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 flex items-center justify-center mb-4">
              <card.icon className="w-6 h-6 text-indigo-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{card.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 flex-1 line-clamp-2">{card.desc}</p>
            <div className="mt-4 text-sm font-medium text-indigo-500 flex items-center gap-1 group-hover:text-indigo-400">
              Explore <span className="transform transition-transform group-hover:translate-x-1">→</span>
            </div>
          </Link>
        ))}
      </section>

      {/* Footer */}
      <footer className="pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" />
          <span className="font-medium">🔱 Trinetra v1.0</span>
        </div>
        <div className="flex gap-4">
          <Link to="/about" className="hover:text-slate-900 dark:hover:text-white transition-colors">About</Link>
          <span>·</span>
          <a href="mailto:support@trinetra.local" className="hover:text-slate-900 dark:hover:text-white transition-colors">Contact</a>
        </div>
        <div className="text-center md:text-right">
          <p>© 2026 Group 24 · Sister Nivedita University</p>
          <p className="mt-1">Supervised by Dr. Alamgir Sardar</p>
        </div>
      </footer>
    </div>
  );
}
