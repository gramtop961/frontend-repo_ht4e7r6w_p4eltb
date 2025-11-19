import { useEffect, useState } from 'react';

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.random() * 15);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => onFinish && onFinish(), 500);
        }
        return next;
      });
    }, 250);
    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-orange-500">
      <div className="relative w-40 h-40 mb-8">
        <div className="absolute inset-0 rounded-full border-4 border-orange-600/40 animate-ping" />
        <div className="absolute inset-2 rounded-full border-4 border-orange-500/60 animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center text-6xl font-extrabold tracking-wider">A</div>
      </div>
      <div className="w-64 h-2 bg-orange-900/40 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-orange-600 to-orange-400" style={{ width: `${progress}%` }} />
      </div>
      <p className="mt-4 text-orange-200/80">Lädt...</p>
    </div>
  );
}
