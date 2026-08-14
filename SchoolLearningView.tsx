import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  School,
  BookOpen,
  Video,
  FileCheck,
  HelpCircle,
  Bell,
  HardDriveDownload,
  CheckCircle2,
  Clock,
  Play,
  FileText,
  User,
  ArrowRight,
  Filter,
  Check,
  Home,
  ArrowLeft
} from 'lucide-react';
import { LessonMaterial, Assignment, Quiz } from '../../types';

export const SchoolLearningView: React.FC<{
  onPlayVideo: (lesson: LessonMaterial) => void;
  onOpenAssignment: (asg: Assignment) => void;
  onOpenQuiz: (quiz: Quiz) => void;
}> = ({ onPlayVideo, onOpenAssignment, onOpenQuiz }) => {
  const {
    studentProfile,
    lessons,
    assignments,
    submissions,
    quizzes,
    announcements,
    downloads,
    downloadResource,
    setActiveView,
    logout,
    t
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'lessons' | 'videos' | 'assignments' | 'quizzes' | 'announcements'>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');

  const subjects = [
    { name: 'Science', teacher: 'Priya Sharma', currentLesson: 'Human Body — Chapter 5', progress: 72, color: 'emerald' },
    { name: 'Mathematics', teacher: 'Ravi Kumar', currentLesson: 'Fractions & Practical Ratios', progress: 85, color: 'blue' },
    { name: 'English', teacher: 'Neelam Verma', currentLesson: 'Rural Stories & Reading Comprehension', progress: 91, color: 'purple' },
    { name: 'Social Studies', teacher: 'Jaswinder Singh', currentLesson: 'Rivers & Agriculture of Punjab', progress: 78, color: 'amber' },
    { name: 'Computer Science', teacher: 'Priya Sharma', currentLesson: 'Digital Tools & Internet Safety', progress: 68, color: 'indigo' }
  ];

  const filteredLessons = lessons.filter(l => selectedSubject === 'All' || l.subject.toLowerCase() === selectedSubject.toLowerCase());
  const filteredAssignments = assignments.filter(a => selectedSubject === 'All' || a.subject.toLowerCase() === selectedSubject.toLowerCase());
  const filteredQuizzes = quizzes.filter(q => selectedSubject === 'All' || q.subject.toLowerCase() === selectedSubject.toLowerCase());

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
            <span>{t.dashboard || 'Back to Student Hub'}</span>
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500 font-medium">{t.schoolConnectedLearning || 'School Connected Learning'}</span>
        </div>

        <button
          onClick={logout}
          className="px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-slate-600 hover:text-emerald-800 font-semibold border border-slate-200 transition flex items-center gap-1.5 shadow-2xs"
          title="Directly return to Landing Homepage"
        >
          <Home className="w-3.5 h-3.5 text-emerald-600" />
          <span>{t.backToHomepage || 'Homepage'}</span>
        </button>
      </div>

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              {studentProfile.schoolName}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Class {studentProfile.classSection} (Section A)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            🏫 {t.schoolConnectedLearning || 'School Connected Learning'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {t.learnWithSchoolDesc || 'Your official classes, syllabus lessons, homework submissions, and teacher notices.'}
          </p>
        </div>

        {/* Subject Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
          {['All', 'Science', 'Mathematics', 'English', 'Social Studies', 'Computer Science'].map(subj => (
            <button
              key={subj}
              onClick={() => setSelectedSubject(subj)}
              className={`px-3 py-1 text-xs font-semibold rounded-xl transition ${
                selectedSubject === subj
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {subj}
            </button>
          ))}
        </div>
      </div>

      {/* 5 Core Subject Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects
          .filter(s => selectedSubject === 'All' || s.name.toLowerCase() === selectedSubject.toLowerCase())
          .map(subj => (
            <div
              key={subj.name}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-emerald-400 hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {subj.name}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {subj.progress}%
                  </span>
                </div>

                <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
                  <User className="w-3 h-3" />
                  <span>Teacher: <strong>{subj.teacher}</strong></span>
                </p>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 mb-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Current Topic</span>
                  <p className="text-xs font-semibold text-slate-800 truncate mt-0.5">
                    {subj.currentLesson}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-3">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${subj.progress}%` }}
                  />
                </div>

                <button
                  onClick={() => {
                    const l = lessons.find(les => les.subject.toLowerCase() === subj.name.toLowerCase());
                    if (l) onPlayVideo(l);
                  }}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Continue Learning</span>
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Navigation Sub-Tabs: All / Lessons / Videos / Assignments / Quizzes / Announcements */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-semibold">
        {[
          { id: 'all', label: 'All Content' },
          { id: 'lessons', label: `${t.lessons || 'Lessons'} (${filteredLessons.length})` },
          { id: 'videos', label: `${t.videos || 'Videos'} (${filteredLessons.filter(l => l.contentType === 'video').length})` },
          { id: 'assignments', label: `${t.assignments || 'Assignments'} (${filteredAssignments.length})` },
          { id: 'quizzes', label: `${t.quizzes || 'Quizzes'} (${filteredQuizzes.length})` },
          { id: 'announcements', label: `${t.announcements || 'Announcements'} (${announcements.length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition ${
              activeTab === tab.id
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className="space-y-6">
        {/* Lessons & Videos */}
        {(activeTab === 'all' || activeTab === 'lessons' || activeTab === 'videos') && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Curriculum Lessons & Video Lectures</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredLessons
                .filter(l => activeTab !== 'videos' || l.contentType === 'video')
                .map(lesson => {
                  const isDownloaded = downloads.some(d => d.materialId === lesson.id);

                  return (
                    <div
                      key={lesson.id}
                      className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                            {lesson.subject} • {lesson.chapter.split('—')[0]}
                          </span>
                          <span className="text-xs text-slate-400">{lesson.duration}</span>
                        </div>

                        <h4 className="font-bold text-slate-900 text-sm mb-1 leading-snug">
                          {lesson.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                          {lesson.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <span className="text-[11px] text-slate-400">By {lesson.teacherName}</span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => downloadResource(lesson)}
                            disabled={isDownloaded}
                            className={`p-2 rounded-xl text-xs font-semibold transition flex items-center gap-1 ${
                              isDownloaded
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                            title="Download for offline studying"
                          >
                            {isDownloaded ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <HardDriveDownload className="w-3.5 h-3.5" />
                            )}
                            <span className="hidden sm:inline">
                              {isDownloaded ? 'Offline ✓' : 'Download'}
                            </span>
                          </button>

                          <button
                            onClick={() => onPlayVideo(lesson)}
                            className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>{lesson.contentType === 'video' ? 'Watch Video' : 'Open Lesson'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Assignments Table / Cards */}
        {(activeTab === 'all' || activeTab === 'assignments') && (
          <div className="space-y-4 pt-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>Homework & Teacher Assignments</span>
            </h3>

            <div className="space-y-3">
              {filteredAssignments.map(asg => {
                const sub = submissions.find(
                  s => s.assignmentId === asg.id && s.studentId === studentProfile.id
                );
                const status = sub ? sub.status : 'Not Started';

                return (
                  <div
                    key={asg.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {asg.subject}
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            status === 'Graded'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : status === 'Submitted'
                              ? 'bg-blue-100 text-blue-800 border border-blue-200'
                              : 'bg-amber-100 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {status}
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-900 text-sm">{asg.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Due: <strong>{asg.dueDate}</strong> • Max Marks: {asg.maxMarks} • Teacher: {asg.teacherName}
                      </p>

                      {sub?.status === 'Graded' && (
                        <div className="mt-2 p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between">
                          <span>
                            <strong>Score:</strong> {sub.marksObtained}/{asg.maxMarks} marks
                          </span>
                          <span className="italic text-emerald-800 font-medium truncate max-w-[280px]">
                            "{sub.feedback}"
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => onOpenAssignment(asg)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition shrink-0 ${
                        status === 'Graded'
                          ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          : status === 'Submitted'
                          ? 'bg-blue-50 text-blue-800 hover:bg-blue-100'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                      }`}
                    >
                      {status === 'Graded'
                        ? 'View Submission & Grade'
                        : status === 'Submitted'
                        ? 'Edit Submission'
                        : 'Submit Homework'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Quizzes */}
        {(activeTab === 'all' || activeTab === 'quizzes') && (
          <div className="space-y-4 pt-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-600" />
              <span>Subject Chapter Quizzes</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredQuizzes.map(quiz => (
                <div
                  key={quiz.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {quiz.subject}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-2">{quiz.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      {quiz.questions.length} Questions • {quiz.timeLimitMinutes} mins timer
                    </p>
                  </div>

                  <button
                    onClick={() => onOpenQuiz(quiz)}
                    className="mt-4 w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow"
                  >
                    Start Quiz Test
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Announcements */}
        {(activeTab === 'all' || activeTab === 'announcements') && (
          <div className="space-y-4 pt-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Bell className="w-4 h-4 text-emerald-600" />
              <span>Official School Notices</span>
            </h3>

            <div className="space-y-3">
              {announcements.map(ann => (
                <div
                  key={ann.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900 text-sm">{ann.title}</span>
                    <span className="text-slate-400 text-[11px]">{ann.date}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{ann.content}</p>
                  <p className="text-slate-500 text-[11px] mt-2 font-medium">
                    Published by: {ann.authorName}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
