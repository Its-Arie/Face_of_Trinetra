import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function RouteProgress() {
  const [isNavigating, setIsNavigating] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => setIsNavigating(false), 400);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!isNavigating) return null;

  return (
    <div className="fixed top-16 left-0 w-full h-[2px] z-[100] overflow-hidden">
      <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 animate-[slideRight_1s_ease-in-out_infinite]" style={{ width: '30%' }} />
    </div>
  );
}
