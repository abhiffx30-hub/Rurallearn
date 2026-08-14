import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DownloadedResource } from '../../types';
import {
  HardDriveDownload,
  WifiOff,
  Wifi,
  Play,
  FileText,
  Trash2,
  CheckCircle,
  Database,
  Info,
  Layers,
  Sparkles,
  Home,
  ArrowLeft
} from 'lucide-react';

export const OfflineDownloadsView: React.FC<{
  onPlayDownloadedVideo: (item: DownloadedResource) => void;
}> = ({ onPlayDownloadedVideo }) => {
  const {
    downloads,
    removeDownload,
    simulatedOffline,
    toggleSimulatedOffline,
    lowDataMode,
    toggleLowDataMode,
    setActiveView,
    logout
  } = useApp();

  const [activeNotesReader, setActiveNotesReader] = useState<DownloadedResource | null>(null);

  const totalSizeMb = downloads.reduce((acc, d) => acc + (d.fileSizeMb || 0), 0);

  return (
    <div className="space-y-6 animate-in fade-in pb-12">
      {/* Navigation Breadcrumb Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('dashboard')}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold border border-slate-200 shadow-2xs flex items-center gap-1.5 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
            <span>Back to Student Hub</span>
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500 font-medium">Offline Downloads</span>
        </div>

        <button
          onClick={logout}
          className="px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-slate-600 hover:text-emerald-800 font-semibold border border-slate-200 transition flex items-center gap-1.5 shadow-2xs"
          title="Directly return to Landing Homepage"
        >
          <Home className="w-3.5 h-3.5 text-emerald-600" />
          <span>Back to Homepage</span>
        </button>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900 via-slate-900 to-amber-950 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-2 border border-amber-500/30">
            <WifiOff className="w-3.5 h-3.5" />
            <span>Zero-Internet Learning Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            📶 Offline Learning & Downloads
          </h1>
          <p className="text-xs sm:text-sm text-amber-100/90 mt-1">
            "Continue learning without interruption even during electricity cuts or zero cellular internet."
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={toggleSimulatedOffline}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow ${
              simulatedOffline
                ? 'bg-rose-600 hover:bg-rose-500 text-white'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            {simulatedOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
            <span>{simulatedOffline ? 'Disable Offline Mode' : 'Test Without Internet'}</span>
          </button>

          <button
            onClick={toggleLowDataMode}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
              lowDataMode
                ? 'bg-amber-500 text-amber-950 border-amber-400 font-extrabold'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <span>{lowDataMode ? '📶 Low Data Active' : 'Enable Low Data Mode'}</span>
          </button>
        </div>
      </div>

      {/* Offline Storage Metrics Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Local Device Storage</h3>
              <p className="text-xs text-slate-500">
                {downloads.length} resources downloaded • <strong>{totalSizeMb.toFixed(1)} MB</strong> used on device
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>IndexedDB Offline Cache Ready</span>
          </div>
        </div>

        {/* Storage Bar */}
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-amber-600 h-full rounded-full transition-all"
            style={{ width: `${Math.min(100, Math.max(15, totalSizeMb * 2))}%` }}
          />
        </div>
      </div>

      {/* Downloaded Content Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <HardDriveDownload className="w-4 h-4 text-amber-600" />
            <span>Downloaded Educational Content ({downloads.length})</span>
          </h3>
          <span className="text-xs text-slate-400">All available offline</span>
        </div>

        {downloads.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
            <HardDriveDownload className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="font-bold text-slate-700 text-sm">No Offline Content Downloaded Yet</h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Go to School Learning and click "Download Offline" on any video lesson or chapter note to study without network.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {downloads.map(item => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {item.subject} • {item.chapter}
                    </span>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      <span>Available Offline</span>
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-400">
                    Type: <strong className="capitalize">{item.type}</strong> • Size: {item.fileSizeMb} MB • Downloaded {item.downloadedAt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-4">
                  <button
                    onClick={() => removeDownload(item.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition text-xs flex items-center gap-1"
                    title="Delete local copy"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>

                  {item.type === 'video' ? (
                    <button
                      onClick={() => onPlayDownloadedVideo(item)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Play Offline Video</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveNotesReader(item)}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Read Offline Notes</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Offline Notes Reader Modal */}
      {activeNotesReader && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 flex flex-col max-h-[85vh]">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                  Offline Reader • {activeNotesReader.subject}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{activeNotesReader.title}</h3>
              </div>
              <button
                onClick={() => setActiveNotesReader(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto font-sans text-xs text-slate-800 leading-relaxed space-y-3">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Reading from local offline memory. No internet data consumed.</span>
              </div>
              <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                {activeNotesReader.contentBody || 'No text content available.'}
              </pre>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setActiveNotesReader(null)}
                className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
