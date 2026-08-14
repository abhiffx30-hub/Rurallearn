import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Award,
  BookOpen,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Clock,
  Video,
  Target,
  BarChart3,
  Calendar,
  AlertCircle,
  Home,
  ArrowLeft
} from 'lucide-react';

export const StudentAnalyticsView: React.FC<{
  onOpenAITutor: () => void;
}> = ({ onOpenAITutor }) => {
  const { studentProfile, analytics, goals, submissions, quizAttempts, setActiveView, logout } = useApp();

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
          <span className="text-slate-500 font-medium">Progress & Analytics</span>
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
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3 border border-emerald-500/30">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Academic Trajectory & AI Performance Insights</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            {studentProfile.name}'s Learning Progress 📊
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 mt-2">
            Class {studentProfile.classSection} • Attendance Rate: {studentProfile.attendanceRate}% • Status: <span className="font-semibold text-emerald-300">{analytics.performanceTrend}</span>
          </p>

          {/* AI Tutor Summary Card */}
          <div className="mt-5 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-start gap-3.5 text-xs sm:text-sm">
            <div className="p-2.5 rounded-xl bg-amber-400 text-slate-950 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">AI Progress Evaluation:</p>
              <p className="text-emerald-100/95 text-xs mt-1 leading-relaxed">{analytics.aiInsightText}</p>
              <p className="text-amber-300 text-xs mt-1.5 font-medium">
                🎯 <strong>Recommended Next Step:</strong> {analytics.aiRecommendation}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Quick Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Overall Average</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{analytics.overallScore}%</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +6% this month
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Based on quizzes & assignments</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Assignments Done</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{submissions.filter(s => s.status === 'Graded' || s.status === 'Submitted').length}</span>
            <span className="text-xs text-slate-500">Avg {analytics.assignmentAverage}%</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Class 8A submissions</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Quiz Accuracy</span>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-700">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{analytics.quizAverage}%</span>
            <span className="text-xs text-slate-500">{quizAttempts.length} attempts</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Interactive checks</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Class Attendance</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{studentProfile.attendanceRate}%</span>
            <span className="text-xs font-bold text-emerald-600">Excellent</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Government High School, Nabha</p>
        </div>
      </div>

      {/* Subject Performance Breakdown */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Subject-wise Performance & Mastery</h2>
            <p className="text-xs text-slate-500 mt-0.5">Calculated from regular classroom homework, interactive quizzes, and AI tests.</p>
          </div>
        </div>

        <div className="space-y-4">
          {analytics.subjectScores.map(sc => (
            <div key={sc.subject} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="sm:w-1/3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{sc.subject}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    sc.score >= 80 ? 'bg-emerald-100 text-emerald-800' : sc.score >= 70 ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {sc.score >= 80 ? 'Mastery' : sc.score >= 70 ? 'Proficient' : 'Developing'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {sc.assignmentsDone} assignments • {sc.quizzesDone} quizzes taken
                </p>
              </div>

              <div className="sm:w-1/2 flex items-center gap-3">
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      sc.score >= 80 ? 'bg-emerald-600' : sc.score >= 70 ? 'bg-blue-600' : 'bg-amber-500'
                    }`}
                    style={{ width: `${sc.score}%` }}
                  />
                </div>
                <span className="text-sm font-black text-slate-900 w-12 text-right">{sc.score}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Activity & Study Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Study Hours */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Weekly Study Activity (Hours)</h3>
            <p className="text-xs text-slate-500 mt-0.5">Time spent on digital materials, video lessons, and AI tutor.</p>

            <div className="mt-6 flex items-end justify-between h-40 pt-6 px-2 gap-2 border-b border-slate-100">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
                const hours = analytics.weeklyActivityHours[idx] || 1.5;
                const heightPercent = Math.min(100, (hours / 3.5) * 100);
                return (
                  <div key={day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <span className="text-[10px] font-bold text-slate-600">{hours}h</span>
                    <div
                      className="w-full max-w-[28px] bg-emerald-600 rounded-t-lg transition-all"
                      style={{ height: `${heightPercent}%` }}
                    />
                    <span className="text-[11px] text-slate-400 font-medium">{day}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <span>Total: <strong>11.7 hours</strong> this week</span>
            <span className="text-emerald-700 font-bold">Goal on track 🚀</span>
          </div>
        </div>

        {/* Active Learning Goals */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-base">Current Learning Goals</h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                {goals.length} Active
              </span>
            </div>

            <div className="space-y-3">
              {goals.map(g => (
                <div key={g.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{g.title}</span>
                    <span className="text-xs font-bold text-emerald-700">{g.progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-2 overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full"
                      style={{ width: `${g.progressPercentage}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                    <span>Target: {g.targetScore}%</span>
                    <span>{g.deadlineDays} days remaining</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onOpenAITutor}
            className="mt-4 w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Ask AI Tutor for a Custom Improvement Plan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
