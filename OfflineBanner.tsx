import React from 'react';
import { useApp } from '../../context/AppContext';
import { WifiOff, SignalHigh, CheckCircle, Info } from 'lucide-react';

export const OfflineBanner: React.FC = () => {
  const { simulatedOffline, lowDataMode, downloads } = useApp();

  if (!simulatedOffline && !lowDataMode) return null;

  return (
    <div className="w-full bg-amber-500 text-amber-950 px-4 py-2 text-xs md:text-sm font-medium border-b border-amber-600 flex flex-wrap items-center justify-between gap-2 shadow-inner">
      <div className="flex items-center gap-2">
        {simulatedOffline ? (
          <>
            <span className="p-1 bg-amber-900 text-amber-100 rounded-full flex items-center justify-center">
              <WifiOff className="w-3.5 h-3.5" />
            </span>
            <span>
              <strong>Simulated Offline Mode Active:</strong> You are browsing cached local content. {downloads.length} resources available without internet!
            </span>
          </>
        ) : (
          <>
            <span className="p-1 bg-amber-900 text-amber-100 rounded-full flex items-center justify-center">
              <SignalHigh className="w-3.5 h-3.5" />
            </span>
            <span>
              <strong>📶 Low Data Mode ON:</strong> Compressed text notes prioritized. Autoplay disabled to preserve mobile bandwidth for rural networks.
            </span>
          </>
        )}
      </div>

      <div className="flex items-center gap-2 text-xs bg-amber-600/30 px-2 py-1 rounded">
        <CheckCircle className="w-3.5 h-3.5 text-amber-900" />
        <span>Rural Nabha Network Optimized</span>
      </div>
    </div>
  );
};
