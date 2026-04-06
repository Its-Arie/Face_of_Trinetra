import { Menu, Search, Bell, Moon, Sun, Shield } from 'lucide-react';
import { useSidebar } from '../../contexts/sidebar-context';
import { useTheme } from '../../contexts/theme-context';
import { useAuth } from '../../contexts/auth-context';
import { useState } from 'react';
import { mockAlerts } from '../../lib/mock-data';
import { Link, useNavigate } from 'react-router-dom';

export function TopNavbar() {
  const { toggleSidebar } = useSidebar();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 z-50 w-full h-16 bg-[#9AB17A] dark:bg-[#2C3E2C] border-b border-[#E4DFB5] dark:border-white/10">
      <div className="flex items-center justify-between px-4 h-full">
        <div className="flex items-center space-x-4">
          <Link to="/home" className="flex items-center space-x-2 mr-4">
            <Shield className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white hidden sm:block">
              TRINETRA
            </span>
          </Link>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-[#7A9160] dark:hover:bg-white/5 transition-colors text-white"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 max-w-xl px-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search nodes, CVEs, alerts..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-100 dark:bg-white/5 border border-transparent focus:border-indigo-500 dark:focus:border-indigo-500 focus:bg-white dark:focus:bg-[#1a1a24] outline-none transition-all text-sm text-slate-900 dark:text-slate-100"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-[#7A9160] dark:hover:bg-white/5 transition-colors text-white"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-[#7A9160] dark:hover:bg-white/5 transition-colors relative text-white"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#1a1a24] rounded-xl shadow-lg border border-slate-200 dark:border-white/10 overflow-hidden">
                <div className="p-4 border-b border-slate-200 dark:border-white/10 flex justify-between items-center">
                  <h3 className="font-semibold text-slate-900 dark:text-white">Notifications</h3>
                  <button className="text-xs text-indigo-500 hover:text-indigo-400">Mark all read</button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {mockAlerts.slice(0, 5).map((alert) => (
                    <Link
                      key={alert.id}
                      to={`/alerts/${alert.id}`}
                      className="block p-4 hover:bg-slate-50 dark:hover:bg-white/5 border-b border-slate-100 dark:border-white/5 last:border-0 transition-colors"
                      onClick={() => setShowNotifications(false)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`mt-1 h-2.5 w-2.5 rounded-full shrink-0 ${
                          alert.severity === 'Critical' ? 'bg-red-500' :
                          alert.severity === 'High' ? 'bg-orange-500' :
                          alert.severity === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                            {alert.nodeName} <span className="text-slate-500 dark:text-slate-400 font-normal">({alert.nodeType})</span>
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                            {alert.description}
                          </p>
                          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                            {alert.timestamp}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="p-3 border-t border-slate-200 dark:border-white/10 text-center">
                  <Link
                    to="/alerts"
                    className="text-sm text-indigo-500 hover:text-indigo-400 font-medium"
                    onClick={() => setShowNotifications(false)}
                  >
                    View All Notifications →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-2 p-1 rounded-lg hover:bg-[#7A9160] dark:hover:bg-white/5 transition-colors text-white"
            >
              <img src={user?.avatar} alt="Avatar" className="h-8 w-8 rounded-full bg-[#E4DFB5] dark:bg-slate-700" />
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
              </div>
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1a1a24] rounded-xl shadow-lg border border-slate-200 dark:border-white/10 overflow-hidden">
                <div className="p-4 border-b border-slate-200 dark:border-white/10">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{user?.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{user?.email}</p>
                </div>
                <div className="p-2">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors" onClick={() => setShowProfile(false)}>👤 My Profile</Link>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors" onClick={() => setShowProfile(false)}>⚙️ Settings</Link>
                </div>
                <div className="p-2 border-t border-slate-200 dark:border-white/10">
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                    🚪 Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
