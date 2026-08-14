import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  UserCheck,
  BookOpen,
  FileCheck,
  Users,
  Sparkles,
  ArrowRight,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  TrendingUp,
  Award,
  School,
  Building2,
  RefreshCw,
  Home
} from 'lucide-react';
import { TeacherAuthModal } from './TeacherAuthModal';

export const TeacherDashboard: React.FC<{
  onSelectLessons: () => void;
  onSelectAssignments: () => void;
  onSelectGrading: () => void;
  onSelectClasses: () => void;
}> = ({
  onSelectLessons,
  onSelectAssignments,
  onSelectGrading,
  onSelectClasses
}) => {
  const { teacherProfile, classes, lessons, assignments, submissions, logout } = useApp();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const pendingSubmissions = submissions.filter(s => s.status === 'Submitted');
  const gradedSubmissions = submissions.filter(s => s.status === 'Graded');

  return (
    <div className="space-y-6 animate-in fade-in pb-12">
      {/* Top Quick Nav Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700 flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
            <School className="w-3.5 h-3.5 text-blue-600" />
            <span>Teacher Workspace Hub</span>
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

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30">
                <UserCheck className="w-3.5 h-3.5" />
                <span>{teacherProfile.designation}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                <School className="w-3.5 h-3.5" />
                <span>Affiliated to: {teacherProfile.schoolName}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Welcome, {teacherProfile.name} 👩‍🏫
            </h1>
            <p className="text-sm sm:text-base text-blue-100/90 mt-2 font-normal">
              Assigned Classes: <strong>{teacherProfile.assignedClasses.join(', ')}</strong> • Subjects: <strong>{teacherProfile.subjectsTaught.join(', ')}</strong>
            </p>

            <div className="mt-5 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-start gap-3.5 text-xs sm:text-sm">
              <div className="p-2.5 rounded-xl bg-blue-400 text-slate-950 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white">Teaching Workspace Overview:</p>
                <p className="text-blue-100/90 text-xs mt-0.5">
                  You have <strong>{pendingSubmissions.length} student submission</strong> waiting for review from Class 8A (Rahul Sharma). Class average mastery is at <strong>78%</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Switch / Sign In with Another School */}
          <div className="shrink-0 flex flex-col gap-2">
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-white text-blue-950 font-extrabold text-xs sm:text-sm shadow-md hover:bg-blue-50 transition flex items-center gap-2 border border-blue-200"
            >
              <RefreshCw className="w-4 h-4 text-blue-700" />
              <span>Change School Affiliation</span>
            </button>
            <span className="text-[11px] text-blue-300 text-center font-medium">
              Link to another school management
            </span>
          </div>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-blue-500/20 to-transparent blur-2xl pointer-events-none" />
      </div>

      {/* 4 Quick Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={onSelectClasses}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-500 transition cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Active Students</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">42</span>
            <span className="text-xs font-bold text-emerald-600">Class 8A</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">94% Digital Attendance</p>
        </div>

        <div
          onClick={onSelectLessons}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-500 transition cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Lessons Published</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{lessons.length}</span>
            <span className="text-xs text-slate-500">Science & CS</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Low-data optimized</p>
        </div>

        <div
          onClick={onSelectGrading}
          className="bg-white p-5 rounded-2xl border-2 border-amber-400/80 shadow-xs hover:border-amber-500 transition cursor-pointer bg-amber-50/20"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-900">Needs Review</span>
            <div className="p-2 rounded-lg bg-amber-100 text-amber-800 animate-pulse">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-950">{pendingSubmissions.length}</span>
            <span className="text-xs font-bold text-amber-700">Pending</span>
          </div>
          <p className="text-[11px] text-amber-700 mt-1">Rahul Sharma's Science Homework</p>
        </div>

        <div
          onClick={onSelectAssignments}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-500 transition cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Assignments</span>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-700">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{assignments.length}</span>
            <span className="text-xs text-slate-500">Active</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">PSEB aligned</p>
        </div>
      </div>

      {/* Primary Action Modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Module 1: Lesson Delivery */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Publish Digital Lessons</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Upload notes, chapter summaries, and video lectures formatted for low-bandwidth rural networks.
            </p>
          </div>
          <button
            onClick={onSelectLessons}
            className="mt-6 w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center justify-center gap-2"
          >
            <span>Manage Lessons & Notes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Module 2: Homework & Quizzes */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center mb-4">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Create Assignments & Quizzes</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Assign curriculum tasks with due dates, attachments, and automatic AI practice checks.
            </p>
          </div>
          <button
            onClick={onSelectAssignments}
            className="mt-6 w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition flex items-center justify-center gap-2"
          >
            <span>Create & Manage Tasks</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Module 3: Grading & Feedback */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Grading & Feedback</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Review student answer sheets, give marks and personalized feedback to guide rural students.
            </p>
          </div>
          <button
            onClick={onSelectGrading}
            className="mt-6 w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition flex items-center justify-center gap-2"
          >
            <span>Review Submissions ({pendingSubmissions.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Submissions Waiting for Review */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Recent Student Homework Submissions</h2>
            <p className="text-xs text-slate-500 mt-0.5">Students who turned in assignments from Class 8A.</p>
          </div>
          <button
            onClick={onSelectGrading}
            className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
          >
            <span>Open Grading Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {submissions.map(sub => {
            const asg = assignments.find(a => a.id === sub.assignmentId);
            return (
              <div
                key={sub.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{sub.studentName}</span>
                    <span className="text-xs text-slate-500 font-medium">(Class {sub.classSection})</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        sub.status === 'Graded'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {sub.status === 'Graded' ? `Graded: ${sub.marksObtained}/${sub.maxMarks}` : 'Pending Grade'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 font-medium">
                    Task: <strong>{asg?.title || 'Science Assignment'}</strong> ({asg?.subject})
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1 italic">
                    "{sub.answerText}"
                  </p>
                </div>

                <button
                  onClick={onSelectGrading}
                  className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition flex items-center justify-center gap-1.5 self-start sm:self-center"
                >
                  <span>{sub.status === 'Graded' ? 'Edit Grade & Feedback' : 'Grade Submission'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Teacher School Affiliation Modal */}
      <TeacherAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};
