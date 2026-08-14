export type Role = 'STUDENT' | 'TEACHER' | 'MANAGEMENT';

export type Language =
  | 'en' // English
  | 'hi' // Hindi (हिन्दी)
  | 'pa' // Punjabi (ਪੰਜਾਬੀ)
  | 'te' // Telugu (తెలుగు)
  | 'ta' // Tamil (தமிழ்)
  | 'bn' // Bengali (বাংলা)
  | 'mr' // Marathi (मराठी)
  | 'gu' // Gujarati (ગુજરાતી)
  | 'kn' // Kannada (ಕನ್ನಡ)
  | 'ml' // Malayalam (മലയാളം)
  | 'or' // Odia (ଓଡ଼ିଆ)
  | 'as' // Assamese (অসমীয়া)
  | 'ur' // Urdu (اردو)
  | 'sa' // Sanskrit (संस्कृतम्)
  | 'mai' // Maithili (मैथिली)
  | 'sat' // Santali (ᱥᱟᱱᱛᱟᱲᱤ)
  | 'ks' // Kashmiri (کٲشُر / कॉशुर)
  | 'ne' // Nepali (नेपाली)
  | 'kok' // Konkani (कोंकणी)
  | 'sd' // Sindhi (سنڌي / सिन्धी)
  | 'doi' // Dogri (डोगरी)
  | 'mni' // Manipuri / Meitei (মৈতৈলোন্)
  | 'brx'; // Bodo (बड़ो)

export interface LanguageInfo {
  code: Language;
  name: string;
  englishName: string;
  nativeScript: string;
  region: 'North' | 'South' | 'East' | 'West' | 'Northeast' | 'Pan-India';
  popularStates: string;
}

export type StudentLearningStyle = 'Video' | 'Reading' | 'Practice' | 'Mixed';

export type StudentStatus = 'Improving' | 'Stable' | 'Needs Support';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatar?: string;
  schoolId: string;
  schoolName: string;
  preferredLanguage: Language;
  onboardingCompleted: boolean;
}

export interface StudentProfile extends User {
  role: 'STUDENT';
  grade: string; // e.g. "8th"
  classSection: string; // e.g. "8A"
  rollNumber: string;
  favoriteSubjects: string[];
  interests: string[];
  learningGoals: string[];
  learningStyle: StudentLearningStyle;
  attendanceRate: number;
}

export interface TeacherProfile extends User {
  role: 'TEACHER';
  designation: string;
  subjectsTaught: string[];
  assignedClasses: string[]; // ["8A", "8B", "9A"]
  experienceYears: number;
}

export interface ManagementProfile extends User {
  role: 'MANAGEMENT';
  designation: string; // "Principal" / "Administrator"
  schoolLocation: string; // "Nabha, Patiala District, Punjab"
  curriculum: string; // "PSEB & State Digital Curriculum"
  academicYear: string; // "2026-2027"
  phone?: string;
  totalStudentsCount?: number;
  totalFacultyCount?: number;
  isCustomRegistered?: boolean;
  registrationDate?: string;
}

export interface SchoolClass {
  id: string;
  grade: string; // "8"
  section: string; // "A"
  name: string; // "Class 8A"
  totalStudents: number;
  classTeacher: string;
  subjects: {
    name: string;
    teacherName: string;
    teacherId: string;
  }[];
  avgPerformance: number;
}

export interface LessonMaterial {
  id: string;
  title: string;
  subject: string;
  classSection: string;
  chapter: string;
  topic: string;
  contentType: 'video' | 'notes' | 'pdf' | 'interactive';
  description: string;
  contentBody?: string;
  videoUrl?: string;
  duration?: string;
  fileSizeMb: number;
  teacherId: string;
  teacherName: string;
  datePublished: string;
  isAvailableOffline?: boolean;
  keyTakeaways: string[];
  tags: string[];
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  classSection: string;
  chapter: string;
  description: string;
  instructions: string;
  teacherId: string;
  teacherName: string;
  dueDate: string;
  maxMarks: number;
  attachmentName?: string;
  createdDate: string;
}

export type SubmissionStatus = 'Not Started' | 'In Progress' | 'Submitted' | 'Graded';

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  classSection: string;
  submissionDate: string;
  answerText: string;
  attachmentName?: string;
  status: SubmissionStatus;
  marksObtained?: number;
  maxMarks: number;
  feedback?: string;
  gradedBy?: string;
  gradedDate?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  classSection: string;
  chapter: string;
  questions: QuizQuestion[];
  timeLimitMinutes: number;
  createdBy: 'TEACHER' | 'AI_TUTOR';
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedDate: string;
  answers: {
    questionId: string;
    selectedOptionIndex: number;
    isCorrect: boolean;
  }[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorRole: 'TEACHER' | 'MANAGEMENT';
  targetClasses: string[]; // ["8A", "All"]
  date: string;
  priority: 'normal' | 'high' | 'urgent';
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'assignment' | 'grade' | 'lesson' | 'announcement' | 'ai_insight' | 'goal';
  actionLink?: string;
}

export interface LearningGoal {
  id: string;
  studentId: string;
  subject: string;
  title: string;
  targetScore: number;
  currentScore: number;
  deadlineDays: number;
  progressPercentage: number;
  status: 'active' | 'completed';
}

export interface DownloadedResource {
  id: string;
  materialId: string;
  title: string;
  subject: string;
  type: 'video' | 'notes' | 'pdf';
  fileSizeMb: number;
  downloadedAt: string;
  contentBody?: string;
  videoUrl?: string;
  duration?: string;
  chapter: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  sourceIndicator?: string;
  suggestedQuestions?: string[];
  quiz?: Quiz;
}

export interface StudentAnalytics {
  studentId: string;
  overallScore: number;
  performanceTrend: 'Improving' | 'Stable' | 'Needs Support';
  subjectScores: {
    subject: string;
    score: number;
    trend: 'up' | 'stable' | 'down';
    assignmentsDone: number;
    quizzesDone: number;
  }[];
  assignmentAverage: number;
  quizAverage: number;
  lessonsCompletedCount: number;
  videosWatchedCount: number;
  weeklyActivityHours: number[];
  aiInsightText: string;
  aiRecommendation: string;
}

export interface PersonalLearningTopic {
  id: string;
  title: string;
  subject: string;
  category: 'Space' | 'Agriculture' | 'Robotics' | 'Nature & Bio' | 'Mental Math' | 'Coding Basics';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  modulesCount: number;
  estimatedMinutes: number;
  lessons: {
    id: string;
    title: string;
    type: 'video' | 'notes' | 'interactive';
    duration: string;
    content: string;
  }[];
}
