import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  CheckCircle2,
  TrendingUp,
  UserCheck,
  ArrowRight,
  Home,
  ArrowLeft
} from 'lucide-react';

export const TeacherClassesView: React.FC = () => {
  const { classes, teacherProfile, setActiveView, logout } = useApp();

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
          <span className="text-slate-500 font-medium">Class Roster & Allocations</span>
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
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
            Class Roster & Subject Allocations
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Assigned Classes & Students 👨‍🎓
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Government High School, Nabha • Managing Class 8A (Pilot Class) & Subject Coverage.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map(cls => (
          <div
            key={cls.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                  {cls.name}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Avg: {cls.avgPerformance}%
                </span>
              </div>

              <h3 className="font-bold text-lg text-slate-900">{cls.name} (Grade {cls.grade})</h3>
              <p className="text-xs text-slate-500 mt-1">Class Teacher: <strong>{cls.classTeacher}</strong></p>
              <p className="text-xs text-slate-600 mt-0.5">Total Enrolled Students: <strong>{cls.totalStudents}</strong></p>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <p className="text-[11px] font-bold text-slate-700 mb-2">Subject Teachers:</p>
                <div className="space-y-1.5">
                  {cls.subjects.map(s => (
                    <div key={s.name} className="flex items-center justify-between text-xs p-1.5 rounded-lg bg-slate-50">
                      <span className="font-semibold text-slate-800">{s.name}</span>
                      <span className="text-slate-500 text-[11px]">{s.teacherName}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 94% Attendance
              </span>
              <span className="text-slate-400">Nabha Cluster</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
