import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { TopNavbar } from './top-navbar';
import { Sidebar } from './sidebar';
import { useSidebar } from '../../contexts/sidebar-context';
import { useAuth } from '../../contexts/auth-context';
import { AppLoader } from '../loading/app-loader';
import { RouteProgress } from '../loading/route-progress';
import { cn } from '../../lib/utils';

export function Layout() {
  const { isExpanded } = useSidebar();
  const { isAuthenticated, user, isHydrating } = useAuth();
  const location = useLocation();

  if (isHydrating) {
    return <AppLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated but needs cloud connection, redirect to connect-cloud
  // Allow accessing other pages if they navigated from settings, but generally enforce it
  const connectedCount = Object.values(user?.connectedProviders || {}).filter(Boolean).length;
  if (user?.isFirstLogin && connectedCount === 0 && location.pathname !== '/connect-cloud') {
    return <Navigate to="/connect-cloud" replace />;
  }

  return (
    <div className="min-h-screen bg-[#E4DFB5] dark:bg-[#2C3E2C] text-[#2C3E2C] dark:text-[#E4DFB5] font-sans transition-colors duration-300">
      <RouteProgress />
      <TopNavbar />
      <Sidebar />
      <main
        className={cn(
          "pt-16 min-h-screen transition-all duration-300",
          isExpanded ? "ml-64" : "ml-16"
        )}
      >
        <div className="p-6 h-full max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
