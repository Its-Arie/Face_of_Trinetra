import { Link, useLocation } from 'react-router-dom';
import { useSidebar } from '../../contexts/sidebar-context';
import {
  Home,
  BarChart2,
  Network,
  AlertTriangle,
  FileText,
  Bug,
  Link2,
  Clock,
  FileBarChart,
  Activity,
  Settings,
  Info
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { icon: Home, label: 'Home', route: '/home' },
  { icon: BarChart2, label: 'Dashboard', route: '/dashboard' },
  { icon: Network, label: 'Attack Graph', route: '/graph' },
  { icon: AlertTriangle, label: 'Alerts', route: '/alerts' },
  { icon: FileText, label: 'Log Monitor', route: '/logs' },
  { icon: Bug, label: 'Vulnerabilities', route: '/vulnerabilities' },
  { icon: Link2, label: 'Identities', route: '/identities' },
  { icon: Clock, label: 'Timeline', route: '/timeline' },
  { icon: FileBarChart, label: 'Reports', route: '/reports' },
  { icon: Activity, label: 'Performance', route: '/performance' },
  { icon: Settings, label: 'Settings', route: '/settings' },
  { icon: Info, label: 'About', route: '/about' },
];

export function Sidebar() {
  const { isExpanded } = useSidebar();
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-[#FBE8CE]/90 dark:bg-[#2C3E2C]/90 backdrop-blur-xl border-r border-[#E4DFB5] dark:border-white/10 transition-all duration-300 z-40 overflow-y-auto overflow-x-hidden",
        isExpanded ? "w-64" : "w-16"
      )}
    >
      <div className="py-4 flex flex-col gap-1 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.route);
          return (
            <Link
              key={item.route}
              to={item.route}
              className={cn(
                "flex items-center px-3 py-2.5 rounded-lg transition-all group relative",
                isActive
                  ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
              )}
              title={!isExpanded ? item.label : undefined}
            >
              <div className="relative flex items-center justify-center shrink-0">
                <item.icon className={cn("h-5 w-5", isActive ? "text-indigo-600 dark:text-indigo-400" : "")} />
                {isActive && (
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-500 rounded-r-full" />
                )}
              </div>
              
              <span
                className={cn(
                  "ml-3 whitespace-nowrap transition-opacity duration-300",
                  isExpanded ? "opacity-100" : "opacity-0 w-0 hidden"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
