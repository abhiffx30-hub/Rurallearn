import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  User,
  Role,
  Language,
  StudentProfile,
  TeacherProfile,
  ManagementProfile,
  SchoolClass,
  LessonMaterial,
  Assignment,
  Submission,
  Quiz,
  QuizAttempt,
  Announcement,
  NotificationItem,
  LearningGoal,
  DownloadedResource,
  StudentAnalytics
} from '../types';
import {
  DEMO_STUDENT,
  DEMO_TEACHER,
  DEMO_MANAGEMENT,
  INITIAL_CLASSES,
  INITIAL_LESSONS,
  INITIAL_ASSIGNMENTS,
  INITIAL_SUBMISSIONS,
  INITIAL_QUIZZES,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_GOALS,
  INITIAL_DOWNLOADS,
  INITIAL_STUDENT_ANALYTICS
} from '../data/initialData';
import { translations } from '../utils/translations';

interface AppContextType {
  currentUser: User | null;
  role: Role;
  language: Language;
  t: Record<string, string>;
  lowDataMode: boolean;
  simulatedOffline: boolean;
  studentProfile: StudentProfile;
  teacherProfile: TeacherProfile;
  managementProfile: ManagementProfile;
  classes: SchoolClass[];
  lessons: LessonMaterial[];
  assignments: Assignment[];
  submissions: Submission[];
  quizzes: Quiz[];
  quizAttempts: QuizAttempt[];
  announcements: Announcement[];
  notifications: NotificationItem[];
  goals: LearningGoal[];
  downloads: DownloadedResource[];
  analytics: StudentAnalytics;
  activeView: string;
  setActiveView: (view: string) => void;
  login: (role: Role) => void;
  logout: () => void;
  switchRole: (role: Role) => void;
  toggleLowDataMode: () => void;
  toggleSimulatedOffline: () => void;
  setLanguage: (lang: Language) => void;
  publishLesson: (lesson: Omit<LessonMaterial, 'id' | 'datePublished' | 'teacherId' | 'teacherName'>) => void;
  createAssignment: (assignment: Omit<Assignment, 'id' | 'createdDate' | 'teacherId' | 'teacherName'>) => void;
  submitAssignment: (assignmentId: string, answerText: string, attachmentName?: string) => void;
  gradeSubmission: (submissionId: string, marks: number, feedback: string) => void;
  publishAnnouncement: (announcement: Omit<Announcement, 'id' | 'date' | 'authorName' | 'authorRole'>) => void;
  downloadResource: (material: LessonMaterial) => void;
  removeDownload: (id: string) => void;
  addGoal: (goal: Omit<LearningGoal, 'id' | 'studentId' | 'currentScore' | 'progressPercentage' | 'status'>) => void;
  deleteGoal: (id: string) => void;
  recordQuizAttempt: (attempt: Omit<QuizAttempt, 'id' | 'studentId' | 'completedDate'>) => void;
  markNotificationAsRead: (id: string) => void;
  resetDemoData: () => void;
  addClass: (cls: Partial<SchoolClass>) => void;
  assignTeacherToClass: (classId: string, subject: string, teacherName: string, teacherId: string) => void;
  registerManagement: (profileData: {
    name: string;
    email: string;
    phone?: string;
    designation: string;
    schoolName: string;
    schoolLocation: string;
    curriculum: string;
    academicYear: string;
    totalStudentsCount?: number;
    totalFacultyCount?: number;
    gradeRange?: string;
  }) => void;
  registerTeacher: (teacherData: {
    name: string;
    email: string;
    phone?: string;
    designation: string;
    schoolName: string;
    schoolId?: string;
    subjectsTaught: string[];
    assignedClasses: string[];
    experienceYears?: number;
  }) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('rl_user');
    return saved ? JSON.parse(saved) : DEMO_STUDENT;
  });

  const [role, setRole] = useState<Role>(() => {
    return currentUser ? currentUser.role : 'STUDENT';
  });

  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('rl_lang') as Language) || 'en';
  });

  const [lowDataMode, setLowDataMode] = useState<boolean>(() => {
    return localStorage.getItem('rl_low_data') === 'true';
  });

  const [simulatedOffline, setSimulatedOffline] = useState<boolean>(false);

  const [studentProfile, setStudentProfile] = useState<StudentProfile>(DEMO_STUDENT);
  const [teacherProfile, setTeacherProfile] = useState<TeacherProfile>(() => {
    const saved = localStorage.getItem('rl_teacher_profile');
    return saved ? JSON.parse(saved) : DEMO_TEACHER;
  });
  const [managementProfile, setManagementProfile] = useState<ManagementProfile>(() => {
    const saved = localStorage.getItem('rl_mgmt_profile');
    return saved ? JSON.parse(saved) : DEMO_MANAGEMENT;
  });

  const [classes, setClasses] = useState<SchoolClass[]>(() => {
    const saved = localStorage.getItem('rl_classes');
    return saved ? JSON.parse(saved) : INITIAL_CLASSES;
  });

  const [lessons, setLessons] = useState<LessonMaterial[]>(() => {
    const saved = localStorage.getItem('rl_lessons');
    return saved ? JSON.parse(saved) : INITIAL_LESSONS;
  });

  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    const saved = localStorage.getItem('rl_assignments');
    return saved ? JSON.parse(saved) : INITIAL_ASSIGNMENTS;
  });

  const [submissions, setSubmissions] = useState<Submission[]>(() => {
    const saved = localStorage.getItem('rl_submissions');
    return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS;
  });

  const [quizzes, setQuizzes] = useState<Quiz[]>(() => {
    const saved = localStorage.getItem('rl_quizzes');
    return saved ? JSON.parse(saved) : INITIAL_QUIZZES;
  });

  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('rl_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('rl_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [goals, setGoals] = useState<LearningGoal[]>(() => {
    const saved = localStorage.getItem('rl_goals');
    return saved ? JSON.parse(saved) : INITIAL_GOALS;
  });

  const [downloads, setDownloads] = useState<DownloadedResource[]>(() => {
    const saved = localStorage.getItem('rl_downloads');
    return saved ? JSON.parse(saved) : INITIAL_DOWNLOADS;
  });

  const [analytics, setAnalytics] = useState<StudentAnalytics>(() => {
    const saved = localStorage.getItem('rl_analytics');
    return saved ? JSON.parse(saved) : INITIAL_STUDENT_ANALYTICS;
  });

  const [activeView, setActiveView] = useState<string>('dashboard');

  // Persistence effects
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('rl_user', JSON.stringify(currentUser));
      setRole(currentUser.role);
    } else {
      localStorage.removeItem('rl_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('rl_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('rl_low_data', lowDataMode.toString());
  }, [lowDataMode]);

  useEffect(() => {
    localStorage.setItem('rl_classes', JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem('rl_lessons', JSON.stringify(lessons));
  }, [lessons]);

  useEffect(() => {
    localStorage.setItem('rl_assignments', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem('rl_submissions', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem('rl_downloads', JSON.stringify(downloads));
  }, [downloads]);

  useEffect(() => {
    localStorage.setItem('rl_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('rl_analytics', JSON.stringify(analytics));
  }, [analytics]);

  const login = (newRole: Role) => {
    if (newRole === 'STUDENT') {
      setCurrentUser(studentProfile);
    } else if (newRole === 'TEACHER') {
      setCurrentUser(teacherProfile);
    } else {
      setCurrentUser(managementProfile);
    }
    setRole(newRole);
    setActiveView('dashboard');
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchRole = (newRole: Role) => {
    login(newRole);
  };

  const toggleLowDataMode = () => {
    setLowDataMode(prev => !prev);
  };

  const toggleSimulatedOffline = () => {
    setSimulatedOffline(prev => !prev);
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('rl_lang', lang);
    } catch {
      // ignore
    }
    if (currentUser) {
      setCurrentUser(prev => prev ? { ...prev, preferredLanguage: lang } : null);
    }
  };

  const publishLesson = (lessonData: Omit<LessonMaterial, 'id' | 'datePublished' | 'teacherId' | 'teacherName'>) => {
    const newLesson: LessonMaterial = {
      ...lessonData,
      id: `les-${Date.now()}`,
      teacherId: teacherProfile.id,
      teacherName: teacherProfile.name,
      datePublished: 'Just now',
      isAvailableOffline: false
    };

    setLessons(prev => [newLesson, ...prev]);

    // Send notification to students
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: studentProfile.id,
      title: `New Lesson in ${lessonData.subject}`,
      message: `${teacherProfile.name} published: "${lessonData.title}"`,
      timestamp: 'Just now',
      read: false,
      type: 'lesson',
      actionLink: 'lessons'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const createAssignment = (asgData: Omit<Assignment, 'id' | 'createdDate' | 'teacherId' | 'teacherName'>) => {
    const newAsg: Assignment = {
      ...asgData,
      id: `asg-${Date.now()}`,
      teacherId: teacherProfile.id,
      teacherName: teacherProfile.name,
      createdDate: 'Just now'
    };

    setAssignments(prev => [newAsg, ...prev]);

    // Push notification to students
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: studentProfile.id,
      title: `New Assignment: ${asgData.subject}`,
      message: `${asgData.title} assigned. Due ${asgData.dueDate}.`,
      timestamp: 'Just now',
      read: false,
      type: 'assignment',
      actionLink: 'assignments'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const submitAssignment = (assignmentId: string, answerText: string, attachmentName?: string) => {
    const targetAsg = assignments.find(a => a.id === assignmentId);
    const existingIndex = submissions.findIndex(s => s.assignmentId === assignmentId && s.studentId === studentProfile.id);

    const newSub: Submission = {
      id: existingIndex >= 0 ? submissions[existingIndex].id : `sub-${Date.now()}`,
      assignmentId,
      studentId: studentProfile.id,
      studentName: studentProfile.name,
      classSection: studentProfile.classSection,
      submissionDate: 'Just now',
      answerText,
      attachmentName: attachmentName || 'student_solution.pdf',
      status: 'Submitted',
      maxMarks: targetAsg ? targetAsg.maxMarks : 10
    };

    if (existingIndex >= 0) {
      setSubmissions(prev => {
        const next = [...prev];
        next[existingIndex] = newSub;
        return next;
      });
    } else {
      setSubmissions(prev => [newSub, ...prev]);
    }

    // Teacher notification
    const teacherNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: teacherProfile.id,
      title: 'New Assignment Submission',
      message: `${studentProfile.name} (Class 8A) submitted "${targetAsg?.title || 'Assignment'}".`,
      timestamp: 'Just now',
      read: false,
      type: 'assignment',
      actionLink: 'grading'
    };
    setNotifications(prev => [teacherNotif, ...prev]);
  };

  const gradeSubmission = (submissionId: string, marks: number, feedback: string) => {
    setSubmissions(prev =>
      prev.map(sub => {
        if (sub.id === submissionId) {
          return {
            ...sub,
            status: 'Graded' as const,
            marksObtained: marks,
            feedback,
            gradedBy: teacherProfile.name,
            gradedDate: 'Just now'
          };
        }
        return sub;
      })
    );

    const sub = submissions.find(s => s.id === submissionId);
    const targetAsg = assignments.find(a => a.id === sub?.assignmentId);

    // Update student performance analytics automatically
    const percentage = sub ? Math.round((marks / sub.maxMarks) * 100) : 80;
    setAnalytics(prev => {
      const updatedSubjectScores = prev.subjectScores.map(sc => {
        if (sc.subject.toLowerCase() === (targetAsg?.subject.toLowerCase() || 'science')) {
          const newScore = Math.min(100, Math.round((sc.score * 0.7) + (percentage * 0.3)));
          return {
            ...sc,
            score: newScore,
            trend: 'up' as const,
            assignmentsDone: sc.assignmentsDone + 1
          };
        }
        return sc;
      });

      const total = updatedSubjectScores.reduce((acc, curr) => acc + curr.score, 0);
      const newOverall = Math.round(total / updatedSubjectScores.length);

      return {
        ...prev,
        overallScore: newOverall,
        performanceTrend: 'Improving',
        subjectScores: updatedSubjectScores,
        assignmentAverage: Math.round((prev.assignmentAverage + percentage) / 2),
        aiInsightText: `You scored ${marks}/${sub?.maxMarks || 10} (${percentage}%) in ${targetAsg?.subject || 'Science'}. Your overall academic trajectory is climbing ↑.`,
        aiRecommendation: `Great job on the Circulatory System! Practice the interactive quiz to retain heart valve & arterial mechanics.`
      };
    });

    // Notify student
    const studentNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: studentProfile.id,
      title: 'Assignment Graded 🌟',
      message: `Your ${targetAsg?.subject || 'Science'} assignment was graded: ${marks}/${sub?.maxMarks || 10} marks. Feedback: "${feedback}"`,
      timestamp: 'Just now',
      read: false,
      type: 'grade',
      actionLink: 'assignments'
    };
    setNotifications(prev => [studentNotif, ...prev]);
  };

  const publishAnnouncement = (annData: Omit<Announcement, 'id' | 'date' | 'authorName' | 'authorRole'>) => {
    const isManagement = role === 'MANAGEMENT';
    const newAnn: Announcement = {
      ...annData,
      id: `ann-${Date.now()}`,
      authorName: isManagement ? managementProfile.name : teacherProfile.name,
      authorRole: isManagement ? 'MANAGEMENT' : 'TEACHER',
      date: 'Just now'
    };
    setAnnouncements(prev => [newAnn, ...prev]);

    // Student notification
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: studentProfile.id,
      title: `Notice: ${newAnn.title}`,
      message: newAnn.content.slice(0, 80) + '...',
      timestamp: 'Just now',
      read: false,
      type: 'announcement',
      actionLink: 'announcements'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const downloadResource = (material: LessonMaterial) => {
    const exists = downloads.some(d => d.materialId === material.id);
    if (!exists) {
      const newDownload: DownloadedResource = {
        id: `dn-${Date.now()}`,
        materialId: material.id,
        title: material.title,
        subject: material.subject,
        type: material.contentType === 'video' ? 'video' : material.contentType === 'pdf' ? 'pdf' : 'notes',
        fileSizeMb: material.fileSizeMb || 4.5,
        downloadedAt: 'Just now',
        chapter: material.chapter,
        duration: material.duration,
        contentBody: material.contentBody,
        videoUrl: material.videoUrl
      };
      setDownloads(prev => [newDownload, ...prev]);
    }
  };

  const removeDownload = (id: string) => {
    setDownloads(prev => prev.filter(d => d.id !== id));
  };

  const addGoal = (goalData: Omit<LearningGoal, 'id' | 'studentId' | 'currentScore' | 'progressPercentage' | 'status'>) => {
    const newGoal: LearningGoal = {
      ...goalData,
      id: `gl-${Date.now()}`,
      studentId: studentProfile.id,
      currentScore: 70,
      progressPercentage: 35,
      status: 'active'
    };
    setGoals(prev => [newGoal, ...prev]);
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  const recordQuizAttempt = (attemptData: Omit<QuizAttempt, 'id' | 'studentId' | 'completedDate'>) => {
    const newAttempt: QuizAttempt = {
      ...attemptData,
      id: `qa-${Date.now()}`,
      studentId: studentProfile.id,
      completedDate: 'Just now'
    };
    setQuizAttempts(prev => [newAttempt, ...prev]);

    // Update analytics
    setAnalytics(prev => ({
      ...prev,
      quizAverage: Math.round((prev.quizAverage + attemptData.percentage) / 2),
      lessonsCompletedCount: prev.lessonsCompletedCount + 1
    }));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const addClass = (cls: Partial<SchoolClass>) => {
    const newCls: SchoolClass = {
      id: `cls-${Date.now()}`,
      grade: cls.grade || '8',
      section: cls.section || 'C',
      name: cls.name || `Class ${cls.grade || '8'}${cls.section || 'C'}`,
      totalStudents: cls.totalStudents || 30,
      classTeacher: cls.classTeacher || teacherProfile.name,
      avgPerformance: 75,
      subjects: cls.subjects || [
        { name: 'Science', teacherName: teacherProfile.name, teacherId: teacherProfile.id },
        { name: 'Mathematics', teacherName: 'Ravi Kumar', teacherId: 'tch-202' }
      ]
    };
    setClasses(prev => [...prev, newCls]);
  };

  const assignTeacherToClass = (classId: string, subject: string, teacherName: string, teacherId: string) => {
    setClasses(prev =>
      prev.map(c => {
        if (c.id === classId) {
          const subjects = [...c.subjects];
          const idx = subjects.findIndex(s => s.name.toLowerCase() === subject.toLowerCase());
          if (idx >= 0) {
            subjects[idx] = { name: subject, teacherName, teacherId };
          } else {
            subjects.push({ name: subject, teacherName, teacherId });
          }
          return { ...c, subjects };
        }
        return c;
      })
    );
  };

  const registerManagement = (profileData: {
    name: string;
    email: string;
    phone?: string;
    designation: string;
    schoolName: string;
    schoolLocation: string;
    curriculum: string;
    academicYear: string;
    totalStudentsCount?: number;
    totalFacultyCount?: number;
    gradeRange?: string;
  }) => {
    const newMgmtProfile: ManagementProfile = {
      id: `mgmt-${Date.now()}`,
      role: 'MANAGEMENT',
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone || '+91 98765-43210',
      designation: profileData.designation,
      schoolId: `sch-${Date.now()}`,
      schoolName: profileData.schoolName,
      schoolLocation: profileData.schoolLocation,
      curriculum: profileData.curriculum,
      academicYear: profileData.academicYear,
      totalStudentsCount: profileData.totalStudentsCount || 520,
      totalFacultyCount: profileData.totalFacultyCount || 14,
      isCustomRegistered: true,
      registrationDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      onboardingCompleted: true,
      preferredLanguage: language
    };

    setManagementProfile(newMgmtProfile);
    localStorage.setItem('rl_mgmt_profile', JSON.stringify(newMgmtProfile));

    // Also provision tailored digital class sections for this school
    const generatedClasses: SchoolClass[] = [
      {
        id: `cls-6a-${Date.now()}`,
        grade: '6',
        section: 'A',
        name: 'Class 6A',
        totalStudents: 42,
        classTeacher: 'Gurpreet Kaur',
        avgPerformance: 82,
        subjects: [
          { name: 'Science', teacherName: 'Priya Sharma', teacherId: 'tch-101' },
          { name: 'Mathematics', teacherName: 'Ravi Kumar', teacherId: 'tch-202' },
          { name: 'English', teacherName: 'Neelam Verma', teacherId: 'tch-303' }
        ]
      },
      {
        id: `cls-7a-${Date.now()}`,
        grade: '7',
        section: 'A',
        name: 'Class 7A',
        totalStudents: 40,
        classTeacher: 'Neelam Verma',
        avgPerformance: 79,
        subjects: [
          { name: 'Science', teacherName: 'Priya Sharma', teacherId: 'tch-101' },
          { name: 'Mathematics', teacherName: 'Ravi Kumar', teacherId: 'tch-202' },
          { name: 'Punjabi', teacherName: 'Jaswinder Singh', teacherId: 'tch-404' }
        ]
      },
      {
        id: `cls-8a-${Date.now()}`,
        grade: '8',
        section: 'A',
        name: 'Class 8A (Pilot Class)',
        totalStudents: 44,
        classTeacher: 'Priya Sharma',
        avgPerformance: 86,
        subjects: [
          { name: 'Science', teacherName: 'Priya Sharma', teacherId: 'tch-101' },
          { name: 'Mathematics', teacherName: 'Ravi Kumar', teacherId: 'tch-202' },
          { name: 'Social Studies', teacherName: 'Jaswinder Singh', teacherId: 'tch-404' }
        ]
      },
      {
        id: `cls-9a-${Date.now()}`,
        grade: '9',
        section: 'A',
        name: 'Class 9A',
        totalStudents: 46,
        classTeacher: 'Jaswinder Singh',
        avgPerformance: 81,
        subjects: [
          { name: 'Science', teacherName: 'Priya Sharma', teacherId: 'tch-101' },
          { name: 'Mathematics', teacherName: 'Ravi Kumar', teacherId: 'tch-202' },
          { name: 'English', teacherName: 'Neelam Verma', teacherId: 'tch-303' }
        ]
      },
      {
        id: `cls-10a-${Date.now()}`,
        grade: '10',
        section: 'A',
        name: 'Class 10A (Board Prep)',
        totalStudents: 48,
        classTeacher: 'Ravi Kumar',
        avgPerformance: 88,
        subjects: [
          { name: 'Science', teacherName: 'Priya Sharma', teacherId: 'tch-101' },
          { name: 'Mathematics', teacherName: 'Ravi Kumar', teacherId: 'tch-202' },
          { name: 'Social Studies', teacherName: 'Jaswinder Singh', teacherId: 'tch-404' }
        ]
      }
    ];
    setClasses(generatedClasses);

    // Add Welcome Announcement from this new management
    const welcomeAnnouncement: Announcement = {
      id: `ann-welcome-${Date.now()}`,
      title: `Welcome to ${profileData.schoolName} Digital Campus`,
      content: `Official digital learning platform is now configured for ${profileData.schoolName} (${profileData.schoolLocation}) under ${profileData.curriculum} for Academic Session ${profileData.academicYear}. Teachers, students, and parents can access low-bandwidth digital lessons, homework evaluation, and offline sync.`,
      targetClasses: ['All'],
      priority: 'high',
      authorName: profileData.name,
      authorRole: 'MANAGEMENT',
      date: 'Today'
    };
    setAnnouncements(prev => [welcomeAnnouncement, ...prev]);

    // Switch to this new management profile immediately
    setCurrentUser(newMgmtProfile);
    setRole('MANAGEMENT');
    setActiveView('dashboard');
  };

  const registerTeacher = (teacherData: {
    name: string;
    email: string;
    phone?: string;
    designation: string;
    schoolName: string;
    schoolId?: string;
    subjectsTaught: string[];
    assignedClasses: string[];
    experienceYears?: number;
  }) => {
    const newTeacherProfile: TeacherProfile = {
      id: `tch-${Date.now()}`,
      role: 'TEACHER',
      name: teacherData.name,
      email: teacherData.email,
      schoolId: teacherData.schoolId || `sch-${Date.now()}`,
      schoolName: teacherData.schoolName,
      designation: teacherData.designation || 'TGT Teacher',
      subjectsTaught: teacherData.subjectsTaught.length > 0 ? teacherData.subjectsTaught : ['Science', 'Mathematics'],
      assignedClasses: teacherData.assignedClasses.length > 0 ? teacherData.assignedClasses : ['8A', '9A'],
      experienceYears: teacherData.experienceYears || 6,
      onboardingCompleted: true,
      preferredLanguage: language
    };

    setTeacherProfile(newTeacherProfile);
    localStorage.setItem('rl_teacher_profile', JSON.stringify(newTeacherProfile));

    // Add faculty notification
    const welcomeNotif: NotificationItem = {
      id: `notif-tch-${Date.now()}`,
      userId: newTeacherProfile.id,
      title: `Signed in to ${teacherData.schoolName}`,
      message: `Welcome to the faculty portal for ${teacherData.schoolName}. You have access to digital lessons, grading, and assignments for classes ${teacherData.assignedClasses.join(', ')}.`,
      timestamp: 'Just now',
      read: false,
      type: 'announcement'
    };
    setNotifications(prev => [welcomeNotif, ...prev]);

    setCurrentUser(newTeacherProfile);
    setRole('TEACHER');
    setActiveView('dashboard');
  };

  const resetDemoData = () => {
    setClasses(INITIAL_CLASSES);
    setLessons(INITIAL_LESSONS);
    setAssignments(INITIAL_ASSIGNMENTS);
    setSubmissions(INITIAL_SUBMISSIONS);
    setQuizzes(INITIAL_QUIZZES);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setGoals(INITIAL_GOALS);
    setDownloads(INITIAL_DOWNLOADS);
    setAnalytics(INITIAL_STUDENT_ANALYTICS);
    setManagementProfile(DEMO_MANAGEMENT);
    localStorage.clear();
  };

  const t = useMemo(() => {
    const activeDict = translations[language] || translations.en;
    return new Proxy(activeDict, {
      get: (target: Record<string, string>, prop: string) => {
        if (target && target[prop] !== undefined && target[prop] !== '') {
          return target[prop];
        }
        if (translations.en && translations.en[prop] !== undefined) {
          return translations.en[prop];
        }
        return prop;
      }
    });
  }, [language]);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        role,
        language,
        t,
        lowDataMode,
        simulatedOffline,
        studentProfile,
        teacherProfile,
        managementProfile,
        classes,
        lessons,
        assignments,
        submissions,
        quizzes,
        quizAttempts,
        announcements,
        notifications,
        goals,
        downloads,
        analytics,
        activeView,
        setActiveView,
        login,
        logout,
        switchRole,
        toggleLowDataMode,
        toggleSimulatedOffline,
        setLanguage,
        publishLesson,
        createAssignment,
        submitAssignment,
        gradeSubmission,
        publishAnnouncement,
        downloadResource,
        removeDownload,
        addGoal,
        deleteGoal,
        recordQuizAttempt,
        markNotificationAsRead,
        resetDemoData,
        addClass,
        assignTeacherToClass,
        registerManagement,
        registerTeacher
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
