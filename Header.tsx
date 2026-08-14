import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Bell,
  Wifi,
  WifiOff,
  Globe,
  UserCheck,
  LogOut,
  ChevronDown,
  Sparkles,
  BookOpen,
  School,
  HardDriveDownload,
  Check,
  UserPlus,
  Building2,
  Home,
  ArrowLeft
} from 'lucide-react';
import { Role, Language } from '../../types';
import { RegisterManagementModal } from '../management/RegisterManagementModal';
import { TeacherAuthModal } from '../teacher/TeacherAuthModal';
import { LanguageModal } from './LanguageModal';
import { INDIAN_LANGUAGES } from '../../utils/translations';

export const Header: React.FC<{
  onOpenNotifications?: () => void;
  onOpenProfile?: () => void;
}> = ({ onOpenNotifications, onOpenProfile }) => {
  const {
    currentUser,
    role,
    language,
    setLanguage,
    switchRole,
    logout,
    lowDataMode,
    toggleLowDataMode,
    simulatedOffline,
    toggleSimulatedOffline,
    notifications,
    markNotificationAsRead,
    setActiveView,
    activeView,
    t
  } = useApp();

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showTeacherAuthModal, setShowTeacherAuthModal] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveView('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm ring-2 ring-emerald-600/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-slate-900 tracking-tight">RURALLEARN</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Nabha Prototype
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Connected + Independent Digital Learning
              </p>
            </div>
          </div>

          {/* Quick Role Switcher Bar (Prominent on all screens) */}
          <div className="flex items-center gap-2">
            <button
              onClick={logout}
              title="Go back to RuralLearn Homepage & Role Selection"
              className="px-2.5 sm:px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-emerald-800 bg-slate-100 hover:bg-emerald-50 rounded-xl transition flex items-center gap-1.5 border border-slate-200 hover:border-emerald-200 shadow-xs group"
            >
              <Home className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition" />
              <span className="hidden md:inline">{t.backToHomepage || 'Back to Homepage'}</span>
              <span className="md:hidden">Home</span>
            </button>

            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 gap-1">
              <button
                onClick={() => switchRole('STUDENT')}
                className={`px-2.5 sm:px-3 py-1 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 ${
                  role === 'STUDENT'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t.student || 'Student'}</span>
              </button>

              <button
                onClick={() => switchRole('TEACHER')}
                className={`px-2.5 sm:px-3 py-1 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 ${
                  role === 'TEACHER'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>{t.teacher || 'Teacher'}</span>
              </button>

              <button
                onClick={() => switchRole('MANAGEMENT')}
                className={`px-2.5 sm:px-3 py-1 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 ${
                  role === 'MANAGEMENT'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <School className="w-3.5 h-3.5" />
                <span>{t.management || 'Management'}</span>
              </button>
            </div>
          </div>

          {/* Right Tools: Low Data, Offline Sim, Language, Notifications, User */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Low Data Mode Toggle */}
            <button
              onClick={toggleLowDataMode}
              title="Toggle Low Data Mode for low-bandwidth rural networks"
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition ${
                lowDataMode
                  ? 'bg-amber-50 text-amber-800 border-amber-300 font-semibold'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Wifi className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">{lowDataMode ? (t.lowDataActive || 'Low Data ON') : (t.lowDataMode || 'Low Data')}</span>
              <span className={`w-2 h-2 rounded-full ${lowDataMode ? 'bg-amber-500 animate-pulse' : 'bg-slate-300'}`} />
            </button>

            {/* Simulated Offline Toggle */}
            <button
              onClick={toggleSimulatedOffline}
              title="Simulate zero-internet offline scenario in rural village"
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition ${
                simulatedOffline
                  ? 'bg-rose-50 text-rose-800 border-rose-300 font-semibold'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {simulatedOffline ? <WifiOff className="w-3.5 h-3.5 text-rose-600" /> : <Wifi className="w-3.5 h-3.5 text-emerald-600" />}
              <span className="hidden sm:inline">{simulatedOffline ? (t.offlineStatus || 'Offline Active') : (t.simulateOffline || 'Simulate Offline')}</span>
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700 bg-white hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs transition"
                title="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-semibold max-w-[80px] sm:max-w-none truncate">
                  {INDIAN_LANGUAGES.find(l => l.code === language)?.name || 'Language'}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showLangDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 border-b border-slate-100 mb-1 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Quick Indian Languages</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">23 Active</span>
                  </div>

                  <div className="max-h-60 overflow-y-auto">
                    {[
                      { code: 'en', name: 'English', sub: 'English' },
                      { code: 'hi', name: 'हिन्दी', sub: 'Hindi' },
                      { code: 'pa', name: 'ਪੰਜਾਬੀ', sub: 'Punjabi' },
                      { code: 'te', name: 'తెలుగు', sub: 'Telugu' },
                      { code: 'ta', name: 'தமிழ்', sub: 'Tamil' },
                      { code: 'bn', name: 'বাংলা', sub: 'Bengali' },
                      { code: 'mr', name: 'मराठी', sub: 'Marathi' },
                      { code: 'gu', name: 'ગુજરાતી', sub: 'Gujarati' },
                      { code: 'kn', name: 'ಕನ್ನಡ', sub: 'Kannada' },
                      { code: 'ml', name: 'മലയാളം', sub: 'Malayalam' },
                      { code: 'or', name: 'ଓଡ଼ିଆ', sub: 'Odia' },
                      { code: 'ur', name: 'اردو', sub: 'Urdu' }
                    ].map(item => (
                      <button
                        key={item.code}
                        onClick={() => { setLanguage(item.code as Language); setShowLangDropdown(false); }}
                        className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 flex items-center justify-between transition"
                      >
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-semibold text-slate-900">{item.name}</span>
                          <span className="text-[11px] text-slate-400">({item.sub})</span>
                        </div>
                        {language === item.code && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                      </button>
                    ))}
                  </div>

                  <div className="p-2 border-t border-slate-100 mt-1">
                    <button
                      onClick={() => {
                        setShowLangDropdown(false);
                        setShowLanguageModal(true);
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold hover:from-emerald-700 hover:to-teal-700 transition flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>All 23 Indian Languages...</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                className="relative p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifDropdown && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 z-50 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Bell className="w-3.5 h-3.5 text-emerald-600" />
                      Live Educational Notifications
                    </span>
                    <span className="text-[10px] text-slate-400">{unreadCount} unread</span>
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-2">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-4">No notifications yet</p>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => {
                            markNotificationAsRead(n.id);
                            if (n.actionLink) setActiveView(n.actionLink);
                            setShowNotifDropdown(false);
                          }}
                          className={`p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                            n.read
                              ? 'bg-slate-50 border-slate-100 text-slate-600'
                              : 'bg-emerald-50/50 border-emerald-200/60 text-slate-900 font-medium'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-slate-800">{n.title}</span>
                            <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                          </div>
                          <p className="text-[11px] text-slate-600">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile & Role Switcher for Mobile */}
            <div className="relative">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition"
              >
                <div className="w-7 h-7 rounded-lg overflow-hidden bg-slate-200">
                  <img
                    src={currentUser?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80'}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-xs font-semibold text-slate-800 leading-tight">{currentUser?.name || 'User'}</p>
                  <p className="text-[10px] text-slate-400 capitalize">{role.toLowerCase()}</p>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showRoleDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-xs font-bold text-slate-900">{currentUser?.name}</p>
                    <p className="text-[11px] text-slate-500">{currentUser?.schoolName}</p>
                    <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {role}
                    </span>
                  </div>

                  <div className="py-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">
                      Switch Role
                    </p>
                    <button
                      onClick={() => { switchRole('STUDENT'); setShowRoleDropdown(false); }}
                      className={`w-full text-left px-3 py-1.5 text-xs rounded-lg flex items-center justify-between ${
                        role === 'STUDENT' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>Student (Rahul)</span>
                      {role === 'STUDENT' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>
                    <button
                      onClick={() => { switchRole('TEACHER'); setShowRoleDropdown(false); }}
                      className={`w-full text-left px-3 py-1.5 text-xs rounded-lg flex items-center justify-between ${
                        role === 'TEACHER' ? 'bg-blue-50 text-blue-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>Teacher (Priya)</span>
                      {role === 'TEACHER' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                    <button
                      onClick={() => { switchRole('MANAGEMENT'); setShowRoleDropdown(false); }}
                      className={`w-full text-left px-3 py-1.5 text-xs rounded-lg flex items-center justify-between ${
                        role === 'MANAGEMENT' ? 'bg-purple-50 text-purple-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>School Admin</span>
                      {role === 'MANAGEMENT' && <Check className="w-3.5 h-3.5 text-purple-600" />}
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-1 mt-1 space-y-1">
                    <button
                      onClick={() => { logout(); setShowRoleDropdown(false); }}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 font-semibold rounded-lg flex items-center gap-2"
                    >
                      <Home className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Back to Homepage</span>
                    </button>

                    <button
                      onClick={() => { setShowRegisterModal(true); setShowRoleDropdown(false); }}
                      className="w-full text-left px-3 py-1.5 text-xs text-purple-700 hover:bg-purple-50 font-semibold rounded-lg flex items-center gap-2"
                    >
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Register New School / Admin</span>
                    </button>

                    <button
                      onClick={() => { logout(); setShowRoleDropdown(false); }}
                      className="w-full text-left px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Secondary Sub-Navigation Bar per Role */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 border-t border-slate-100 no-scrollbar">
          {/* Quick Universal Back to Homepage */}
          <button
            onClick={logout}
            className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 flex items-center gap-1.5 transition whitespace-nowrap border border-slate-200 shadow-2xs group"
            title="Directly return to RuralLearn Landing Homepage"
          >
            <Home className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-600 transition" />
            <span>{t.backToHomepage || 'Homepage'}</span>
          </button>
          <div className="h-4 w-px bg-slate-200 shrink-0 mx-0.5" />

          {role === 'STUDENT' && (
            <>
              <button
                onClick={() => setActiveView('dashboard')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  activeView === 'dashboard'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {t.dashboard || 'Student Hub'}
              </button>
              <button
                onClick={() => setActiveView('school')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  activeView === 'school'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                🏫 {t.schoolConnectedLearning || 'School Learning'}
              </button>
              <button
                onClick={() => setActiveView('personal')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  activeView === 'personal'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                🚀 {t.personalLearning || 'Personal Learning'}
              </button>
              <button
                onClick={() => setActiveView('downloads')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  activeView === 'downloads'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                💾 {t.downloads || 'Offline Downloads'}
              </button>
              <button
                onClick={() => setActiveView('analytics')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  activeView === 'analytics'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                📊 {t.progress || 'Progress & Analytics'}
              </button>
            </>
          )}

          {role === 'TEACHER' && (
            <>
              <button
                onClick={() => setActiveView('dashboard')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  activeView === 'dashboard'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {t.dashboard || 'Teacher Dashboard'}
              </button>
              <button
                onClick={() => setActiveView('lessons')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  activeView === 'lessons'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                📚 {t.lessons || 'Digital Lessons & Notes'}
              </button>
              <button
                onClick={() => setActiveView('assignments')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  activeView === 'assignments'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                📝 {t.assignments || 'Assignments'}
              </button>
              <button
                onClick={() => setActiveView('grading')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
                  activeView === 'grading'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200'
                }`}
              >
                <span>✍️ {t.feedback || 'Grading & Feedback'}</span>
                <span className="px-1.5 py-0.2 bg-amber-200 text-amber-900 rounded-full text-[10px] font-black">1 Pending</span>
              </button>
              <button
                onClick={() => setActiveView('classes')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  activeView === 'classes'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                👥 {t.myClasses || 'Class Roster'}
              </button>

              <button
                onClick={() => setShowTeacherAuthModal(true)}
                className="ml-auto px-3 py-1 rounded-lg text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 whitespace-nowrap transition flex items-center gap-1.5"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>{t.teacher || 'Switch Faculty Login'}</span>
              </button>
            </>
          )}

          {role === 'MANAGEMENT' && (
            <>
              <button
                onClick={() => setActiveView('dashboard')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  activeView === 'dashboard'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                🏛️ {t.management || 'School Administration'}
              </button>

              <button
                onClick={() => setShowRegisterModal(true)}
                className="ml-auto px-3 py-1 rounded-lg text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 whitespace-nowrap transition flex items-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Register School</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Registration Modal Triggered from Header */}
      <RegisterManagementModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
      />
      {/* Teacher Affiliation Auth Modal */}
      <TeacherAuthModal
        isOpen={showTeacherAuthModal}
        onClose={() => setShowTeacherAuthModal(false)}
      />
      {/* Indian Languages Selector Modal */}
      <LanguageModal
        isOpen={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
      />
    </header>
  );
};
