import { type ReactNode } from 'react';

export function AuthBackground({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#FBE8CE] dark:bg-[#2C3E2C]">
      {/* Particles */}
      {Array.from({ length: 15 }).map((_, i) => {
        const size = Math.random() * 4 + 4;
        const left = Math.random() * 100;
        const delay = Math.random() * 20;
        const duration = Math.random() * 20 + 20;
        return (
          <div
            key={i}
            className="absolute rounded-full bg-[#9AB17A]/20 blur-[1px] animate-[floatUp_linear_infinite]"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              bottom: '-10%',
            }}
          />
        );
      })}
      
      <div className="relative z-10 w-full flex justify-center p-4">
        {children}
      </div>
    </div>
  );
}
