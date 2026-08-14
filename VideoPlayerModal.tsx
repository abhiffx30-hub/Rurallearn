import React, { useState, useRef, useEffect } from 'react';
import { LessonMaterial } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, HardDriveDownload, CheckCircle, Play, Pause, Volume2, Maximize, FileText, Check } from 'lucide-react';

export const VideoPlayerModal: React.FC<{
  lesson: LessonMaterial | null;
  onClose: () => void;
}> = ({ lesson, onClose }) => {
  const { downloadResource, downloads } = useApp();
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(45);
  const [downloaded, setDownloaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (lesson) {
      const isAlready = downloads.some(d => d.materialId === lesson.id);
      setDownloaded(isAlready);
    }
  }, [lesson, downloads]);

  if (!lesson) return null;

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      downloadResource(lesson);
      setIsDownloading(false);
      setDownloaded(true);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 text-white flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
              {lesson.subject} • {lesson.chapter}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white mt-1">{lesson.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas */}
        <div className="relative bg-black aspect-video flex items-center justify-center overflow-hidden group">
          <video
            src={lesson.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
            className="w-full h-full object-contain"
            controls
            autoPlay
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          {/* Offline watermark badge */}
          {downloaded && (
            <div className="absolute top-4 right-4 bg-emerald-600/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-md shadow-md pointer-events-none">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Available Offline</span>
            </div>
          )}
        </div>

        {/* Bottom Actions & Details */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs text-slate-400">
                Published by <span className="text-white font-medium">{lesson.teacherName}</span> • Duration: {lesson.duration || '12 mins'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                disabled={downloaded || isDownloading}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
                  downloaded
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 cursor-default'
                    : isDownloading
                    ? 'bg-amber-600 text-white animate-pulse'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                }`}
              >
                {downloaded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Downloaded for Offline</span>
                  </>
                ) : isDownloading ? (
                  <span>Caching Offline ({lesson.fileSizeMb} MB)...</span>
                ) : (
                  <>
                    <HardDriveDownload className="w-4 h-4" />
                    <span>Download Offline ({lesson.fileSizeMb} MB)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Description & Key Takeaways */}
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              Lesson Overview & Key Takeaways
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">{lesson.description}</p>

            {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
              <ul className="space-y-1.5 text-xs text-slate-300">
                {lesson.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
