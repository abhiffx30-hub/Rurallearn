import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { OfflineBanner } from './components/common/OfflineBanner';
import { HackathonDemoGuide } from './components/common/HackathonDemoGuide';
import { LandingPage } from './components/landing/LandingPage';

// Student views
import { StudentDashboard } from './components/student/StudentDashboard';
import { SchoolLearningView } from './components/student/SchoolLearningView';
import { PersonalLearningView } from './components/student/PersonalLearningView';
import { OfflineDownloadsView } from './components/student/OfflineDownloadsView';
import { StudentAnalyticsView } from './components/student/StudentAnalyticsView';

// Teacher views
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { TeacherLessonsView } from './components/teacher/TeacherLessonsView';
import { TeacherAssignmentsView } from './components/teacher/TeacherAssignmentsView';
import { TeacherGradingView } from './components/teacher/TeacherGradingView';
import { TeacherClassesView } from './components/teacher/TeacherClassesView';

// Management views
import { ManagementDashboard } from './components/management/ManagementDashboard';

// Modals
import { AITutorModal } from './components/student/AITutorModal';
import { InteractiveQuizModal } from './components/common/InteractiveQuizModal';
import { VideoPlayerModal } from './components/common/VideoPlayerModal';
import { AssignmentSubmitModal } from './components/student/AssignmentSubmitModal';

import { LessonMaterial, Assignment, Quiz } from './types';
import { Bot, Sparkles } from 'lucide-react';

export default function App() {
  const {
    currentUser,
    role,
    activeView,
    setActiveView,
    login,
    simulatedOffline,
    quizzes,
    lessons
  } = useApp();

  // Modals state
  const [isAITutorOpen, setIsAITutorOpen] = useState(false);
  const [activeQuizModal, setActiveQuizModal] = useState<Quiz | null>(null);
  const [activeVideoLesson, setActiveVideoLesson] = useState<LessonMaterial | null>(null);
  const [activeAssignmentModal, setActiveAssignmentModal] = useState<Assignment | null>(null);

  // If user is not logged in, render the interactive Landing Page
  if (!currentUser) {
    return <LandingPage onLoginDirect={role => login(role)} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-900">
      {/* Top Offline / Low Data Warning Ribbon */}
      <OfflineBanner />

      {/* Main Sticky Header */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
        {/* STUDENT VIEWS */}
        {role === 'STUDENT' && (
          <>
            {activeView === 'dashboard' && (
              <StudentDashboard
                onSelectSchoolLearning={() => setActiveView('school')}
                onSelectPersonalLearning={() => setActiveView('personal')}
                onSelectDownloads={() => setActiveView('downloads')}
                onSelectAnalytics={() => setActiveView('analytics')}
                onOpenAITutor={() => setIsAITutorOpen(true)}
                onPlayVideo={lesson => setActiveVideoLesson(lesson)}
                onOpenAssignment={asg => setActiveAssignmentModal(asg)}
                onOpenQuiz={quiz => setActiveQuizModal(quiz)}
              />
            )}

            {activeView === 'school' && (
              <SchoolLearningView
                onPlayVideo={lesson => setActiveVideoLesson(lesson)}
                onOpenAssignment={asg => setActiveAssignmentModal(asg)}
                onOpenQuiz={quiz => setActiveQuizModal(quiz)}
              />
            )}

            {activeView === 'personal' && (
              <PersonalLearningView onOpenAITutor={() => setIsAITutorOpen(true)} />
            )}

            {activeView === 'downloads' && (
              <OfflineDownloadsView
                onPlayDownloadedVideo={item => {
                  const matchingLesson = lessons.find(l => l.id === item.materialId) || {
                    id: item.materialId,
                    title: item.title,
                    subject: item.subject,
                    classSection: '8A',
                    chapter: item.chapter,
                    topic: item.title,
                    contentType: 'video' as const,
                    description: item.title,
                    videoUrl: item.videoUrl,
                    duration: item.duration,
                    fileSizeMb: item.fileSizeMb,
                    teacherId: 'tch-101',
                    teacherName: 'Priya Sharma',
                    datePublished: 'Downloaded',
                    keyTakeaways: [],
                    tags: ['Offline', 'Downloaded']
                  };
                  setActiveVideoLesson(matchingLesson);
                }}
              />
            )}

            {activeView === 'analytics' && (
              <StudentAnalyticsView onOpenAITutor={() => setIsAITutorOpen(true)} />
            )}
          </>
        )}

        {/* TEACHER VIEWS */}
        {role === 'TEACHER' && (
          <>
            {activeView === 'dashboard' && (
              <TeacherDashboard
                onSelectLessons={() => setActiveView('lessons')}
                onSelectAssignments={() => setActiveView('assignments')}
                onSelectGrading={() => setActiveView('grading')}
                onSelectClasses={() => setActiveView('classes')}
              />
            )}

            {activeView === 'lessons' && <TeacherLessonsView />}

            {activeView === 'assignments' && (
              <TeacherAssignmentsView onOpenGrading={() => setActiveView('grading')} />
            )}

            {activeView === 'grading' && <TeacherGradingView />}

            {activeView === 'classes' && <TeacherClassesView />}
          </>
        )}

        {/* MANAGEMENT VIEWS */}
        {role === 'MANAGEMENT' && <ManagementDashboard />}
      </main>

      {/* Floating AI Tutor Quick Button (Always handy for student) */}
      {role === 'STUDENT' && !isAITutorOpen && (
        <button
          onClick={() => setIsAITutorOpen(true)}
          className="fixed bottom-6 right-6 z-40 px-4 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl hover:shadow-2xl transition-all flex items-center gap-2.5 group hover:scale-105 border border-emerald-400/40"
        >
          <div className="p-1 rounded-full bg-white/20">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
          </div>
          <span>Ask AI Tutor</span>
        </button>
      )}

      {/* Scripted Hackathon Interactive Demo Guide (Expandable Bar) */}
      <HackathonDemoGuide
        onOpenAITutor={() => setIsAITutorOpen(true)}
        onOpenQuiz={() => setActiveQuizModal(quizzes[0])}
        onOpenVideo={() => setActiveVideoLesson(lessons[0])}
      />

      {/* ALL MODALS */}
      <AITutorModal
        isOpen={isAITutorOpen}
        onClose={() => setIsAITutorOpen(false)}
        onLaunchQuiz={quiz => {
          setIsAITutorOpen(false);
          setActiveQuizModal(quiz);
        }}
      />

      {activeQuizModal && (
        <InteractiveQuizModal
          quiz={activeQuizModal}
          onClose={() => setActiveQuizModal(null)}
        />
      )}

      {activeVideoLesson && (
        <VideoPlayerModal
          lesson={activeVideoLesson}
          onClose={() => setActiveVideoLesson(null)}
        />
      )}

      {activeAssignmentModal && (
        <AssignmentSubmitModal
          assignment={activeAssignmentModal}
          onClose={() => setActiveAssignmentModal(null)}
        />
      )}
    </div>
  );
}
