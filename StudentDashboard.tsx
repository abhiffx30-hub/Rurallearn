import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  School,
  Compass,
  HardDriveDownload,
  TrendingUp,
  Bot,
  User,
  BookOpen,
  Video,
  FileCheck,
  HelpCircle,
  Bell,
  ArrowRight,
  Sparkles,
  Target,
  CheckCircle2,
  Clock,
  Play,
  Home
} from 'lucide-react';
import { LessonMaterial, Assignment, Quiz } from '../../types';

export const StudentDashboard: React.FC<{
  onSelectSchoolLearning: () => void;
  onSelectPersonalLearning: () => void;
  onSelectDownloads: () => void;
  onSelectAnalytics: () => void;
  onOpenAITutor: () => void;
  onPlayVideo: (lesson: LessonMaterial) => void;
  onOpenAssignment: (asg: Assignment) => void;
  onOpenQuiz: (quiz: Quiz) => void;
}> = ({
  onSelectSchoolLearning,
  onSelectPersonalLearning,
  onSelectDownloads,
  onSelectAnalytics,
  onOpenAITutor,
  onPlayVideo,
  onOpenAssignment,
  onOpenQuiz
}) => {
  const {
    studentProfile,
    lessons,
    assignments,
    quizzes,
    announcements,
    goals,
    analytics,
    downloads,
    logout,
    t
  } = useApp();

  const recentVideoLesson = lessons.find(l => l.contentType === 'video');
  const activeAssignment = assignments[0];
  const activeQuiz = quizzes[0];

  return (
    <div className="space-y-6 animate-in fade-in pb-12">
      {/* Top Quick Nav Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700 flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
            <School className="w-3.5 h-3.5 text-emerald-600" />
            <span>Student Learning Hub</span>
          </span>
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

      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3 border border-emerald-500/30">
            <School className="w-3.5 h-3.5" />
            <span>
              {studentProfile.schoolName} • Class {studentProfile.classSection} (Roll #{studentProfile.rollNumber})
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            {t.welcomeBack || 'Welcome back'}, {studentProfile.name} 👋
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 mt-2 font-normal">
            {t.howToLearnToday || 'How do you want to learn today?'}
          </p>

          {/* Quick AI Learning Insight Ribbon */}
          <div className="mt-5 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-start gap-3 text-xs sm:text-sm">
            <div className="p-2 rounded-xl bg-amber-400 text-slate-950 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-white">{t.aiTutor || 'AI Educational Insight'}:</p>
              <p className="text-emerald-100/90 text-xs mt-0.5">{analytics.aiInsightText}</p>
              <p className="text-amber-200 text-xs mt-1 font-medium italic">
                💡 {analytics.aiRecommendation}
              </p>
            </div>
          </div>
        </div>

        {/* Ambient background accent */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-emerald-500/20 to-transparent blur-2xl pointer-events-none" />
      </div>

      {/* THE TWO LARGE PRIMARY CARDS (CORE REQUIREMENT) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CARD 1 — LEARN WITH MY SCHOOL */}
        <div className="group relative bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-600 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-0" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs">
                <School className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                {t.schoolConnectedLearning || 'School Connected'}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              🏫 {t.learnWithMySchool || 'Learn With My School'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              "{t.learnWithSchoolDesc || 'Learn with your teachers, classmates and school.'}"
            </p>

            <div className="mt-6 space-y-2.5 text-xs text-slate-700">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-800">{t.myClasses || 'Current Classes'}:</span>
                <span className="text-emerald-700 font-bold">Class 8A (5 Subjects)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-800">{t.lessons || 'Latest Lesson'}:</span>
                <span className="text-slate-600 truncate max-w-[180px]">Science (Chapter 5)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-800">{t.assignments || 'Assignments Due'}:</span>
                <span className="text-amber-700 font-bold">1 Pending Review</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-800">{t.overallPerformance || 'School Progress'}:</span>
                <span className="text-emerald-700 font-bold">{analytics.overallScore}% Overall</span>
              </div>
            </div>
          </div>

          <button
            onClick={onSelectSchoolLearning}
            className="mt-8 w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition"
          >
            <span>{t.enterSchoolLearning || 'Enter School Learning'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* CARD 2 — MY PERSONAL LEARNING */}
        <div className="group relative bg-white rounded-3xl p-6 sm:p-8 border-2 border-teal-600 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -z-0" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center shadow-xs">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-100 text-teal-800 border border-teal-200">
                {t.personalLearning || 'Independent Curiosity'}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              🚀 {t.personalLearning || 'My Personal Learning'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              "{t.personalLearningDesc || 'Learn at your own pace, based on your interests and goals.'}"
            </p>

            <div className="mt-6 space-y-2.5 text-xs text-slate-700">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-800">Your Interests:</span>
                <span className="text-teal-700 font-bold">Space, Robotics, Clean Tech</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-800">{t.lessons || 'Recommended Topic'}:</span>
                <span className="text-slate-600">Solar System & Orbits</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-800">Active Goals:</span>
                <span className="text-teal-700 font-bold">{goals.length} Active Targets</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-800">{t.overallPerformance || 'Independent Progress'}:</span>
                <span className="text-teal-700 font-bold">67% Self-Paced Mastery</span>
              </div>
            </div>
          </div>

          <button
            onClick={onSelectPersonalLearning}
            className="mt-8 w-full py-3.5 px-4 bg-teal-700 hover:bg-teal-600 text-white rounded-2xl font-bold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition"
          >
            <span>{t.enterPersonalLearning || 'Enter Personal Learning'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating AI Tutor Quick Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl p-6 text-white border border-indigo-800/60 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-inner shrink-0">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              {t.aiTutor || 'RuralLearn AI Tutor'}
              <span className="text-[10px] bg-indigo-500/30 text-indigo-200 px-2 py-0.5 rounded-full font-mono">
                Sync with Chapter 5
              </span>
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Stuck on a concept? Ask for a simple rural analogy or generate an instant practice quiz.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenAITutor}
          className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-bold shadow transition flex items-center gap-2 shrink-0"
        >
          <Bot className="w-4 h-4" />
          <span>{t.askAiTutor || 'Ask AI Tutor Now'}</span>
        </button>
      </div>

      {/* Fast Shortcuts Row: Offline Downloads, Performance Analytics, Goals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Offline Downloads Card */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <HardDriveDownload className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                {downloads.length} {t.availableOffline || 'Saved'}
              </span>
            </div>
            <h4 className="font-bold text-slate-900 text-base">{t.offlineLearning || 'Offline Learning & Notes'}</h4>
            <p className="text-xs text-slate-500 mt-1">
              Watch videos and study notes without using internet data.
            </p>
          </div>

          <button
            onClick={onSelectDownloads}
            className="mt-4 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition"
          >
            {t.downloads || 'Open Downloads'}
          </button>
        </div>

        {/* Analytics Card */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                {analytics.performanceTrend} ↑
              </span>
            </div>
            <h4 className="font-bold text-slate-900 text-base">{t.progress || 'Performance Analytics'}</h4>
            <p className="text-xs text-slate-500 mt-1">
              Subject mastery, assignment scores, and AI diagnostic recommendations.
            </p>
          </div>

          <button
            onClick={onSelectAnalytics}
            className="mt-4 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition"
          >
            {t.progress || 'View Progress Charts'}
          </button>
        </div>

        {/* Goals Card */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                {goals.length} Goals
              </span>
            </div>
            <h4 className="font-bold text-slate-900 text-base">{t.personalLearning || 'Personal Goals'}</h4>
            <p className="text-xs text-slate-500 mt-1">
              Track targets: "Master Science Chapters 1 to 5", "Fractions 85%+".
            </p>
          </div>

          <button
            onClick={onSelectPersonalLearning}
            className="mt-4 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition"
          >
            {t.personalLearning || 'Manage Goals'}
          </button>
        </div>
      </div>
    </div>
  );
};
