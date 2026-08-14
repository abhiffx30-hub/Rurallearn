import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  Plus,
  Video,
  FileText,
  Trash2,
  CheckCircle2,
  Clock,
  Sparkles,
  X,
  Send,
  WifiOff,
  Filter,
  Home,
  ArrowLeft
} from 'lucide-react';
import { LessonMaterial } from '../../types';

export const TeacherLessonsView: React.FC = () => {
  const { lessons, publishLesson, teacherProfile, setActiveView, logout } = useApp();

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Science');
  const [classSection, setClassSection] = useState('8A');
  const [chapter, setChapter] = useState('Chapter 5 — Human Body');
  const [topic, setTopic] = useState('');
  const [contentType, setContentType] = useState<'notes' | 'video' | 'pdf'>('notes');
  const [description, setDescription] = useState('');
  const [contentBody, setContentBody] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [duration, setDuration] = useState('8 min');
  const [fileSizeMb, setFileSizeMb] = useState(3.5);
  const [keyTakeawayInput, setKeyTakeawayInput] = useState('');
  const [keyTakeaways, setKeyTakeaways] = useState<string[]>([]);
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('All');

  const handleAddTakeaway = () => {
    if (keyTakeawayInput.trim()) {
      setKeyTakeaways([...keyTakeaways, keyTakeawayInput.trim()]);
      setKeyTakeawayInput('');
    }
  };

  const handleRemoveTakeaway = (idx: number) => {
    setKeyTakeaways(keyTakeaways.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !topic.trim()) return;

    publishLesson({
      title,
      subject,
      classSection,
      chapter,
      topic,
      contentType,
      description,
      contentBody: contentType !== 'video' ? contentBody : undefined,
      videoUrl: contentType === 'video' ? (videoUrl || 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80') : undefined,
      duration: contentType === 'video' ? duration : undefined,
      fileSizeMb: Number(fileSizeMb) || 4.2,
      keyTakeaways: keyTakeaways.length > 0 ? keyTakeaways : ['Core definitions', 'Practice examples', 'Summary points'],
      tags: ['PSEB Aligned', 'Class 8A', 'Low Data']
    });

    // Reset & close
    setTitle('');
    setTopic('');
    setDescription('');
    setContentBody('');
    setVideoUrl('');
    setKeyTakeaways([]);
    setShowModal(false);
  };

  const filteredLessons = lessons.filter(
    l => selectedSubjectFilter === 'All' || l.subject.toLowerCase() === selectedSubjectFilter.toLowerCase()
  );

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
            <span>Back to Teacher Dashboard</span>
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500 font-medium">Digital Lessons & Notes</span>
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

      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
              Teacher Workspace • {teacherProfile.name}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Digital Lesson Delivery 📚
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Publish structured notes, video lectures, and low-data learning packs for Class 8A & other sections.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Publish New Lesson Material</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['All', 'Science', 'Mathematics', 'English', 'Computer Science'].map(subj => (
          <button
            key={subj}
            onClick={() => setSelectedSubjectFilter(subj)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedSubjectFilter === subj
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {subj}
          </button>
        ))}
      </div>

      {/* Lesson List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map(lesson => (
          <div
            key={lesson.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {lesson.subject} • Class {lesson.classSection}
                </span>
                <span className="text-[11px] font-medium text-slate-400">
                  {lesson.fileSizeMb} MB
                </span>
              </div>

              <h3 className="font-bold text-base text-slate-900 leading-snug">{lesson.title}</h3>
              <p className="text-xs font-semibold text-emerald-700 mt-1">{lesson.chapter} — {lesson.topic}</p>
              <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">{lesson.description}</p>

              {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <p className="text-[11px] font-bold text-slate-700 mb-1.5">Key Learning Takeaways:</p>
                  <ul className="space-y-1">
                    {lesson.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                      <li key={idx} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                {lesson.contentType === 'video' ? (
                  <Video className="w-3.5 h-3.5 text-blue-600" />
                ) : (
                  <FileText className="w-3.5 h-3.5 text-emerald-600" />
                )}
                <span className="capitalize">{lesson.contentType} ({lesson.duration || 'Reading'})</span>
              </div>
              <span className="text-[11px] text-slate-400">{lesson.datePublished}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Publish Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">Publish New Lesson</h3>
                  <p className="text-xs text-slate-500">Delivered directly to students in Nabha digital portal</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subject</label>
                  <select
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-900"
                  >
                    <option value="Science">Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="English">English</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Social Studies">Social Studies</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Class Section</label>
                  <select
                    value={classSection}
                    onChange={e => setClassSection(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-900"
                  >
                    <option value="8A">Class 8A (Nabha Pilot)</option>
                    <option value="8B">Class 8B</option>
                    <option value="9A">Class 9A</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Lesson Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Circulatory System & Pumping Mechanism of Heart"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Chapter</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chapter 5 — Human Body"
                    value={chapter}
                    onChange={e => setChapter(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Topic</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Heart Valves & Arteries"
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Type</label>
                  <select
                    value={contentType}
                    onChange={e => setContentType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-900"
                  >
                    <option value="notes">Structured Notes</option>
                    <option value="video">Video Lecture</option>
                    <option value="pdf">Handout / PDF</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Duration / Read</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={e => setDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Estimated Size</label>
                  <input
                    type="number"
                    step="0.5"
                    value={fileSizeMb}
                    onChange={e => setFileSizeMb(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Lesson Summary / Overview</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Summary for students to read before starting..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-900"
                />
              </div>

              {contentType === 'video' ? (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Video Stream / Thumbnail URL</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={videoUrl}
                    onChange={e => setVideoUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-900"
                  />
                </div>
              ) : (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Chapter Content / Notes Body</label>
                  <textarea
                    rows={4}
                    placeholder="Enter formatted notes, definitions, and analogies..."
                    value={contentBody}
                    onChange={e => setContentBody(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-900 font-mono text-xs"
                  />
                </div>
              )}

              {/* Key Takeaways */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Key Takeaways (Bullet points for students)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Heart pumps 5 liters of blood every minute"
                    value={keyTakeawayInput}
                    onChange={e => setKeyTakeawayInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddTakeaway(); } }}
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={handleAddTakeaway}
                    className="px-3 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
                  >
                    Add
                  </button>
                </div>

                {keyTakeaways.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {keyTakeaways.map((k, i) => (
                      <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs">
                        <span>{k}</span>
                        <button type="button" onClick={() => handleRemoveTakeaway(i)} className="text-slate-400 hover:text-red-600">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-sm transition flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Publish to Class 8A</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
