import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  School,
  Sparkles,
  WifiOff,
  BookOpen,
  UserCheck,
  TrendingUp,
  Bot,
  HardDriveDownload,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Users,
  Compass,
  Cpu,
  UserPlus,
  Building2,
  Globe,
  ChevronDown
} from 'lucide-react';
import { Role, Language } from '../../types';
import { RegisterManagementModal } from '../management/RegisterManagementModal';
import { TeacherAuthModal } from '../teacher/TeacherAuthModal';
import { LanguageModal } from '../common/LanguageModal';
import { INDIAN_LANGUAGES } from '../../utils/translations';

export const LandingPage: React.FC<{ onLoginDirect: (role: Role) => void }> = ({ onLoginDirect }) => {
  const { switchRole, language, setLanguage, t } = useApp();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showTeacherAuthModal, setShowTeacherAuthModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const handleRoleSelect = (role: Role) => {
    switchRole(role);
    onLoginDirect(role);
  };

  const currentLangMeta = INDIAN_LANGUAGES.find(l => l.code === language) || INDIAN_LANGUAGES[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Nabha Pilot Notice & Multi-Language Switcher */}
      <div className="bg-emerald-900 text-emerald-100 px-4 py-2 text-xs border-b border-emerald-950 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
          <span>🌾</span>
          <span><strong>Hackathon Prototype:</strong> Digital Learning Platform for Rural School Students in Nabha, Punjab</span>
        </div>

        <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
          <Globe className="w-3.5 h-3.5 text-emerald-300" />
          <span className="text-emerald-300 font-semibold">Language:</span>
          <div className="flex items-center gap-1">
            {[
              { code: 'en', label: 'English' },
              { code: 'hi', label: 'हिन्दी' },
              { code: 'pa', label: 'ਪੰਜਾਬੀ' },
              { code: 'te', label: 'తెలుగు' },
              { code: 'ta', label: 'தமிழ்' },
              { code: 'bn', label: 'বাংলা' }
            ].map(item => (
              <button
                key={item.code}
                onClick={() => setLanguage(item.code as Language)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                  language === item.code
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : 'bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => setShowLanguageModal(true)}
              className="px-2 py-0.5 rounded text-[11px] font-bold bg-white/20 hover:bg-white/30 text-white transition flex items-center gap-1"
            >
              <span>More (23)</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Background ambient accents */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-tr from-emerald-100/60 via-teal-50/40 to-blue-100/50 rounded-full blur-3xl -z-10" />

        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-6 shadow-xs">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>{t.schoolConnectedLearning || 'Connected Learning'} + {t.personalLearning || 'Independent Learning'}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            {t.heroHeadline || 'Learning Without Limits.'}
          </h1>

          <p className="mt-5 text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
            {t.heroSubtitle || 'Connecting rural students, teachers and schools through accessible digital learning.'}
          </p>

          <p className="mt-2 text-sm text-slate-500 font-medium italic">
            "{t.tagline || 'Learn With Your School. Learn With Your Teachers. Learn On Your Own.'}"
          </p>

          {/* 3 Primary Role Login Buttons */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <button
              onClick={() => handleRoleSelect('STUDENT')}
              className="group p-5 bg-white hover:bg-emerald-50/50 border-2 border-emerald-600 rounded-2xl shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900">{t.loginAsStudent || "I'm a Student"}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {t.learnWithSchoolDesc || 'Access school classes, AI tutor, offline lessons & personal tracks.'}
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition">
                <span>{t.enterSchoolLearning || 'Enter as Student'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>

            <div className="group p-5 bg-white border-2 border-blue-600 rounded-2xl shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900">{t.loginAsTeacher || "I'm a Teacher"}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Deliver lessons, create assignments, evaluate submissions & track classes.
                </p>
              </div>
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => handleRoleSelect('TEACHER')}
                  className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-xs"
                >
                  <span>{t.teacher || 'Teacher Portal'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setShowTeacherAuthModal(true)}
                  className="w-full py-1.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-xl font-semibold text-[11px] flex items-center justify-center gap-1 transition border border-blue-200"
                >
                  <School className="w-3 h-3 text-blue-600" />
                  <span>Sign In with School Code</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => handleRoleSelect('MANAGEMENT')}
              className="group p-5 bg-white hover:bg-purple-50/50 border-2 border-purple-600 rounded-2xl shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                  <School className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900">{t.loginAsManagement || "I'm School Management"}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Manage school hierarchy, allocate teachers & view macro analytics.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-purple-700 group-hover:translate-x-1 transition">
                <span>{t.management || 'School Management'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          </div>

          {/* Direct School Management Registration Callout */}
          <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50/70 to-purple-50 border border-purple-200/80 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3 text-left">
              <div className="p-2.5 rounded-xl bg-purple-600 text-white shrink-0 shadow-xs">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-purple-950">
                  Are you a School Principal or Administrator?
                </h4>
                <p className="text-xs text-purple-700">
                  Register your school to set up digital classes, manage faculty rosters & view student analytics.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowRegisterModal(true)}
              className="shrink-0 px-4 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5 whitespace-nowrap"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register New School</span>
            </button>
          </div>

          {/* Quick Demo Credentials Info */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200">
            <span className="font-semibold text-slate-700">Demo Accounts:</span>
            <span className="font-mono text-slate-600">student@demo.com</span>
            <span>•</span>
            <span className="font-mono text-slate-600">teacher@demo.com</span>
            <span>•</span>
            <span className="font-mono text-slate-600">admin@demo.com</span>
            <span className="text-slate-400 font-mono">(pwd: demo123)</span>
          </div>
        </div>
      </div>

      {/* 3 Core Pillars */}
      <div className="bg-white py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
              The Three Core Pillars
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Designed For Rural Realities & Aspirations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-emerald-50/50 to-white border border-emerald-200">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-sm">
                <School className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                🏫 School Connected Learning
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Learn directly with your school teachers, classmates, and state curriculum. Receive tailored lessons, homework, and actionable feedback.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Teacher-published video lessons & notes</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Homework submission & teacher grading</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Official school notices and exams</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-50/50 to-white border border-blue-200">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4 shadow-sm">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                🚀 Personal Learning Space
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Empower students to explore topics at their own pace without depending on teacher availability. Driven by individual curiosity and goals.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Space science, smart farming & robotics</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Student-defined target goals & timelines</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Vedic math and independent problem solving</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-amber-50/50 to-white border border-amber-200">
              <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-4 shadow-sm">
                <WifiOff className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                📶 Offline Learning & Low Data
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Weak 2G internet or power cuts never stop education. Download videos and notes when connected, study anytime anywhere.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>1-Click offline download for all media</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Low Data Mode reduces cellular payload</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Zero-internet local storage playback</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Relationship Flow Diagrams */}
      <div className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Platform Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              The Dual-Engine Learning Ecosystem
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl mx-auto mt-2">
              Combining institutional school accountability with self-directed student empowerment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Diagram 1: Connected Learning */}
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
                    Ecosystem 1
                  </span>
                  <span className="text-xs text-slate-400">Continuous 3-Way Loop</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  STUDENT ↔ TEACHER ↔ MANAGEMENT
                </h3>
                <p className="text-xs text-slate-300 mb-6">
                  Structured curriculum delivery, assessment cycle, and institutional governance.
                </p>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-between">
                    <span className="text-purple-400 font-bold">1. School Management</span>
                    <span className="text-slate-400">Allocates Classes & Tracks KPIs</span>
                  </div>
                  <div className="flex justify-center text-slate-500">↓</div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-between">
                    <span className="text-blue-400 font-bold">2. Teachers</span>
                    <span className="text-slate-400">Publishes Lessons & Assigns Homework</span>
                  </div>
                  <div className="flex justify-center text-slate-500">↓</div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-between">
                    <span className="text-emerald-400 font-bold">3. Students</span>
                    <span className="text-slate-400">Submits Answers & Progresses</span>
                  </div>
                  <div className="flex justify-center text-slate-500">↓</div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-between">
                    <span className="text-blue-400 font-bold">4. Teacher Feedback</span>
                    <span className="text-slate-400">Marks + Corrective Coaching</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleRoleSelect('TEACHER')}
                className="mt-6 w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition"
              >
                Experience School Connected Flow
              </button>
            </div>

            {/* Diagram 2: Independent Learning */}
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800">
                    Ecosystem 2
                  </span>
                  <span className="text-xs text-slate-400">24/7 Independent Growth</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  STUDENT → PERSONAL LEARNING → AI TUTOR
                </h3>
                <p className="text-xs text-slate-300 mb-6">
                  Personal curiosity modules, self-paced mastery, and AI tutor doubt solving in local context.
                </p>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-between">
                    <span className="text-emerald-400 font-bold">1. Student Profile</span>
                    <span className="text-slate-400">Passions (Space, Soil, Robotics)</span>
                  </div>
                  <div className="flex justify-center text-slate-500">↓</div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-between">
                    <span className="text-teal-400 font-bold">2. Personal Learning Hub</span>
                    <span className="text-slate-400">Custom Goals & Self-Selected Modules</span>
                  </div>
                  <div className="flex justify-center text-slate-500">↓</div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-between">
                    <span className="text-amber-400 font-bold">3. RuralLearn AI Tutor</span>
                    <span className="text-slate-400">Simple Relatable Explanations</span>
                  </div>
                  <div className="flex justify-center text-slate-500">↓</div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-between">
                    <span className="text-indigo-400 font-bold">4. AI Practice Quizzes</span>
                    <span className="text-slate-400">Instant Diagnostic + Confidence</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleRoleSelect('STUDENT')}
                className="mt-6 w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition"
              >
                Experience Personal Learning & AI Tutor
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards Matrix */}
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Built Specifically For Rural Education Realities
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Solving limited teacher availability, low bandwidth, and lack of personalized coaching.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-emerald-300 transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-1">📚 Digital Learning</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Curated multimedia lessons for Science, Math, Social Studies, English, and Computer Science matching state curricula.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
              <UserCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-1">👨‍🏫 Teacher Guidance</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Direct line from rural educators to assigned classrooms with instant homework distribution and tailored remarks.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-purple-300 transition">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
              <School className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-1">🏫 School Management</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Real-time school performance analytics, teacher allocation, class rosters, and cluster academic coordination.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-amber-300 transition">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
              <Bot className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-1">🤖 AI Student Tutor</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Relatable explanations using everyday rural analogies, step-by-step math breakdowns, and automated practice quizzes.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-rose-300 transition">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-3">
              <HardDriveDownload className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-1">📶 Offline Learning</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Local caching in browser storage ensures students can watch videos and study full text notes completely disconnected.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-indigo-300 transition">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-1">📊 Learning Analytics</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Subject proficiency tracking, assignment averages, and AI educational insights highlighting areas for revision.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 py-8 border-t border-slate-800 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
              R
            </div>
            <span className="text-white font-bold">RURALLEARN</span>
            <span>— Nabha Rural Education Initiative</span>
          </div>
          <p>© 2026 Government Model Senior Secondary School — Nabha Cluster</p>
        </div>
      </footer>
      {/* Register Management Modal */}
      <RegisterManagementModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSuccess={() => onLoginDirect('MANAGEMENT')}
      />
      {/* Teacher School Affiliation Auth Modal */}
      <TeacherAuthModal
        isOpen={showTeacherAuthModal}
        onClose={() => setShowTeacherAuthModal(false)}
        onSuccess={() => onLoginDirect('TEACHER')}
      />
      {/* Indian Languages Selector Modal */}
      <LanguageModal
        isOpen={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
      />
    </div>
  );
};
