import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  School,
  Users,
  UserCheck,
  TrendingUp,
  Award,
  Plus,
  Send,
  Bell,
  CheckCircle2,
  BookOpen,
  Calendar,
  X,
  Sparkles,
  MapPin,
  Building2,
  ShieldCheck,
  BadgeCheck,
  UserPlus,
  Home,
  ArrowLeft
} from 'lucide-react';
import { SchoolClass, Announcement } from '../../types';
import { RegisterManagementModal } from './RegisterManagementModal';

export const ManagementDashboard: React.FC = () => {
  const {
    managementProfile,
    classes,
    announcements,
    publishAnnouncement,
    addClass,
    lessons,
    assignments,
    logout
  } = useApp();

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showAnnModal, setShowAnnModal] = useState(false);
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annPriority, setAnnPriority] = useState<'normal' | 'high' | 'urgent'>('high');

  const [showClassModal, setShowClassModal] = useState(false);
  const [classGrade, setClassGrade] = useState('8');
  const [classSection, setClassSection] = useState('C');
  const [classTeacher, setClassTeacher] = useState('Jaswinder Singh');
  const [totalStudents, setTotalStudents] = useState(38);

  const totalCalculatedStudents = classes.reduce((sum, c) => sum + (c.totalStudents || 0), 0) || managementProfile.totalStudentsCount || 540;
  const facultyCount = managementProfile.totalFacultyCount || 10;

  const handleAnnounce = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annContent.trim()) return;

    publishAnnouncement({
      title: annTitle,
      content: annContent,
      targetClasses: ['All'],
      priority: annPriority
    });

    setAnnTitle('');
    setAnnContent('');
    setShowAnnModal(false);
  };

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    addClass({
      grade: classGrade,
      section: classSection,
      name: `Class ${classGrade}${classSection}`,
      classTeacher,
      totalStudents: Number(totalStudents) || 35
    });

    setShowClassModal(false);
  };

  const teachersList = [
    { name: 'Priya Sharma', subjects: ['Science', 'Computer Science'], classes: ['8A', '8B', '9A'], exp: '6 years', status: 'Active' },
    { name: 'Ravi Kumar', subjects: ['Mathematics'], classes: ['8A', '8B', '9B'], exp: '8 years', status: 'Active' },
    { name: 'Neelam Verma', subjects: ['English'], classes: ['8A', '7A', '7B'], exp: '5 years', status: 'Active' },
    { name: 'Jaswinder Singh', subjects: ['Social Studies', 'Punjabi'], classes: ['8A', '8B', '9A'], exp: '10 years', status: 'Active' },
    { name: 'Gurpreet Kaur', subjects: ['Environmental Science'], classes: ['6A', '6B', '7A'], exp: '4 years', status: 'Active' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in pb-12">
      {/* Navigation Breadcrumb Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700 flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
            <School className="w-3.5 h-3.5 text-purple-600" />
            <span>School Administration Portal</span>
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

      {/* Top Banner with Registration Indicator */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold border border-purple-500/30">
                <School className="w-3.5 h-3.5" />
                <span>{managementProfile.designation} Portal • {managementProfile.schoolLocation}</span>
              </span>

              {managementProfile.isCustomRegistered && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                  <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Registered School</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              {managementProfile.schoolName} 🏛️
            </h1>
            <p className="text-sm sm:text-base text-purple-100/90 mt-2 font-normal">
              Administrator: <strong>{managementProfile.name}</strong> ({managementProfile.designation}) • Academic Year: <strong>{managementProfile.academicYear}</strong> • Curriculum: <strong>{managementProfile.curriculum}</strong>
            </p>

            <div className="mt-5 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-start gap-3.5 text-xs sm:text-sm">
              <div className="p-2.5 rounded-xl bg-purple-400 text-slate-950 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white">
                  {managementProfile.isCustomRegistered ? 'Newly Registered Campus Active:' : 'Nabha Rural Digital Pilot Summary:'}
                </p>
                <p className="text-purple-100/90 text-xs mt-0.5">
                  <strong>{totalCalculatedStudents} total students</strong> registered across {classes.length} class sections. Faculty directory synced with low-bandwidth offline caching.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Register New School & Return to Home */}
          <div className="shrink-0 flex flex-col gap-2.5">
            <button
              onClick={() => setShowRegisterModal(true)}
              className="px-5 py-3 rounded-2xl bg-white text-purple-950 font-extrabold text-xs sm:text-sm shadow-lg hover:bg-purple-50 transition flex items-center gap-2 border border-purple-200"
            >
              <UserPlus className="w-4 h-4 text-purple-700" />
              <span>Register New School / Admin</span>
            </button>
            <button
              onClick={logout}
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition flex items-center justify-center gap-2 border border-white/20"
            >
              <Home className="w-3.5 h-3.5 text-emerald-400" />
              <span>Back to Homepage</span>
            </button>
          </div>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-purple-500/20 to-transparent blur-2xl pointer-events-none" />
      </div>

      {/* 4 Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Enrolled Students</span>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-700">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{totalCalculatedStudents}</span>
            <span className="text-xs font-bold text-emerald-600">{classes.length} Sections</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Verified on RuralLearn Platform</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Teaching Faculty</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{facultyCount}</span>
            <span className="text-xs font-bold text-blue-600">All Active</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Digital Curriculum Certified</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Digital Attendance</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">93%</span>
            <span className="text-xs font-bold text-emerald-600">+9% vs Baseline</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Low-data enabled participation</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Published Content</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{lessons.length + assignments.length}</span>
            <span className="text-xs text-slate-500">Resources</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Offline enabled for students</p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900">School Administration Controls</h2>
          <p className="text-xs text-slate-500 mt-0.5">Broadcast notices or configure class sections for Nabha students.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowClassModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Class Section</span>
          </button>

          <button
            onClick={() => setShowAnnModal(true)}
            className="px-5 py-2.5 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs sm:text-sm shadow-sm transition flex items-center gap-2"
          >
            <Bell className="w-4 h-4" />
            <span>Broadcast Official Notice</span>
          </button>
        </div>
      </div>

      {/* Class Section Roster */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">School Class Sections & Performance</h2>
            <p className="text-xs text-slate-500 mt-0.5">Class 8A is the pilot testing class for RuralLearn.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {classes.map(cls => (
            <div key={cls.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-base">{cls.name}</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {cls.avgPerformance}% Avg
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Class Teacher: <strong>{cls.classTeacher}</strong></p>
                <p className="text-xs text-slate-600 mt-0.5">{cls.totalStudents} Students Enrolled</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] text-slate-500">
                <span>{cls.subjects.length} Assigned Subjects</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Faculty Directory */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Teaching Faculty Directory (10 Teachers)</h2>
          <p className="text-xs text-slate-500 mt-0.5">Assigned subject specialists for Government High School, Nabha.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="pb-3 px-3">Teacher Name</th>
                <th className="pb-3 px-3">Subjects Taught</th>
                <th className="pb-3 px-3">Assigned Classes</th>
                <th className="pb-3 px-3">Experience</th>
                <th className="pb-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {teachersList.map((tch, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-bold text-slate-900 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                      {tch.name.charAt(0)}
                    </div>
                    <span>{tch.name}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-700 font-medium">{tch.subjects.join(', ')}</td>
                  <td className="py-3 px-3 text-slate-600">{tch.classes.join(', ')}</td>
                  <td className="py-3 px-3 text-slate-500">{tch.exp}</td>
                  <td className="py-3 px-3 text-right">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      {tch.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Broadcast Modal */}
      {showAnnModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-100 text-purple-800">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">Broadcast School Notice</h3>
                  <p className="text-xs text-slate-500">Notifies all students & teachers in Nabha cluster</p>
                </div>
              </div>
              <button
                onClick={() => setShowAnnModal(false)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAnnounce} className="mt-5 space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Notice Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Science Fair & Offline Exam Schedule"
                  value={annTitle}
                  onChange={e => setAnnTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Priority</label>
                <select
                  value={annPriority}
                  onChange={e => setAnnPriority(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-900"
                >
                  <option value="normal">Normal</option>
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent Announcement</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Announcement Body</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write clear instructions for students and teachers..."
                  value={annContent}
                  onChange={e => setAnnContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-900"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAnnModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold shadow-sm transition flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Broadcast Now</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Class Modal */}
      {showClassModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-900">Add New Class Section</h3>
              <button
                onClick={() => setShowClassModal(false)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddClass} className="mt-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Grade</label>
                  <input
                    type="text"
                    required
                    value={classGrade}
                    onChange={e => setClassGrade(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Section</label>
                  <input
                    type="text"
                    required
                    value={classSection}
                    onChange={e => setClassSection(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Class Teacher</label>
                <input
                  type="text"
                  required
                  value={classTeacher}
                  onChange={e => setClassTeacher(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Total Students</label>
                <input
                  type="number"
                  required
                  value={totalStudents}
                  onChange={e => setTotalStudents(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowClassModal(false)}
                  className="px-3 py-2 rounded-xl border border-slate-200 font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-purple-700 text-white font-bold"
                >
                  Create Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Register New School Management Modal */}
      <RegisterManagementModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
      />
    </div>
  );
};
