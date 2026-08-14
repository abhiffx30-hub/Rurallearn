import {
  StudentProfile,
  TeacherProfile,
  ManagementProfile,
  SchoolClass,
  LessonMaterial,
  Assignment,
  Submission,
  Quiz,
  Announcement,
  NotificationItem,
  LearningGoal,
  DownloadedResource,
  StudentAnalytics,
  PersonalLearningTopic
} from '../types';

export const DEMO_STUDENT: StudentProfile = {
  id: 'std-101',
  email: 'student@demo.com',
  name: 'Rahul Sharma',
  role: 'STUDENT',
  avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
  schoolId: 'sch-nabha-01',
  schoolName: 'Government Model Senior Secondary School — Nabha',
  preferredLanguage: 'en',
  onboardingCompleted: true,
  grade: '8th',
  classSection: '8A',
  rollNumber: '8A-14',
  favoriteSubjects: ['Science', 'Mathematics', 'Computer Science'],
  interests: ['Space Exploration', 'Robotics', 'Clean Energy', 'Cricket'],
  learningGoals: ['Master Human Circulatory System', 'Score 85%+ in Science', 'Complete Math Fractions'],
  learningStyle: 'Video',
  attendanceRate: 94
};

export const DEMO_TEACHER: TeacherProfile = {
  id: 'tch-201',
  email: 'teacher@demo.com',
  name: 'Priya Sharma',
  role: 'TEACHER',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  schoolId: 'sch-nabha-01',
  schoolName: 'Government Model Senior Secondary School — Nabha',
  preferredLanguage: 'en',
  onboardingCompleted: true,
  designation: 'Senior Science & STEM Educator',
  subjectsTaught: ['Science', 'Computer Science'],
  assignedClasses: ['8A', '8B', '9A'],
  experienceYears: 8
};

export const DEMO_MANAGEMENT: ManagementProfile = {
  id: 'adm-301',
  email: 'admin@demo.com',
  name: 'S. Harpreet Singh',
  role: 'MANAGEMENT',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  schoolId: 'sch-nabha-01',
  schoolName: 'Government Model Senior Secondary School — Nabha',
  preferredLanguage: 'en',
  onboardingCompleted: true,
  designation: 'Principal & Cluster Academic Coordinator',
  schoolLocation: 'Nabha Block, Patiala District, Punjab',
  curriculum: 'PSEB & National Digital Education Framework',
  academicYear: '2026-2027'
};

export const INITIAL_CLASSES: SchoolClass[] = [
  {
    id: 'cls-6a',
    grade: '6',
    section: 'A',
    name: 'Class 6A',
    totalStudents: 28,
    classTeacher: 'Gurmeet Kaur',
    avgPerformance: 76,
    subjects: [
      { name: 'Science', teacherName: 'Priya Sharma', teacherId: 'tch-201' },
      { name: 'Mathematics', teacherName: 'Ravi Kumar', teacherId: 'tch-202' },
      { name: 'English', teacherName: 'Neelam Verma', teacherId: 'tch-203' }
    ]
  },
  {
    id: 'cls-6b',
    grade: '6',
    section: 'B',
    name: 'Class 6B',
    totalStudents: 27,
    classTeacher: 'Ravi Kumar',
    avgPerformance: 74,
    subjects: [
      { name: 'Science', teacherName: 'Priya Sharma', teacherId: 'tch-201' },
      { name: 'Mathematics', teacherName: 'Ravi Kumar', teacherId: 'tch-202' }
    ]
  },
  {
    id: 'cls-7a',
    grade: '7',
    section: 'A',
    name: 'Class 7A',
    totalStudents: 30,
    classTeacher: 'Amanpreet Singh',
    avgPerformance: 81,
    subjects: [
      { name: 'Science', teacherName: 'Priya Sharma', teacherId: 'tch-201' },
      { name: 'Mathematics', teacherName: 'Ravi Kumar', teacherId: 'tch-202' }
    ]
  },
  {
    id: 'cls-7b',
    grade: '7',
    section: 'B',
    name: 'Class 7B',
    totalStudents: 29,
    classTeacher: 'Simranjeet Kaur',
    avgPerformance: 77,
    subjects: [
      { name: 'Science', teacherName: 'Priya Sharma', teacherId: 'tch-201' }
    ]
  },
  {
    id: 'cls-8a',
    grade: '8',
    section: 'A',
    name: 'Class 8A',
    totalStudents: 32,
    classTeacher: 'Priya Sharma',
    avgPerformance: 79,
    subjects: [
      { name: 'Science', teacherName: 'Priya Sharma', teacherId: 'tch-201' },
      { name: 'Mathematics', teacherName: 'Ravi Kumar', teacherId: 'tch-202' },
      { name: 'English', teacherName: 'Neelam Verma', teacherId: 'tch-203' },
      { name: 'Social Studies', teacherName: 'Jaswinder Singh', teacherId: 'tch-204' },
      { name: 'Computer Science', teacherName: 'Priya Sharma', teacherId: 'tch-201' }
    ]
  },
  {
    id: 'cls-8b',
    grade: '8',
    section: 'B',
    name: 'Class 8B',
    totalStudents: 30,
    classTeacher: 'Jaswinder Singh',
    avgPerformance: 75,
    subjects: [
      { name: 'Science', teacherName: 'Priya Sharma', teacherId: 'tch-201' },
      { name: 'Mathematics', teacherName: 'Ravi Kumar', teacherId: 'tch-202' }
    ]
  },
  {
    id: 'cls-9a',
    grade: '9',
    section: 'A',
    name: 'Class 9A',
    totalStudents: 35,
    classTeacher: 'Balwinder Kaur',
    avgPerformance: 82,
    subjects: [
      { name: 'Science', teacherName: 'Priya Sharma', teacherId: 'tch-201' },
      { name: 'Mathematics', teacherName: 'Ravi Kumar', teacherId: 'tch-202' }
    ]
  },
  {
    id: 'cls-9b',
    grade: '9',
    section: 'B',
    name: 'Class 9B',
    totalStudents: 33,
    classTeacher: 'Manish Gupta',
    avgPerformance: 78,
    subjects: [
      { name: 'Science', teacherName: 'Priya Sharma', teacherId: 'tch-201' }
    ]
  },
  {
    id: 'cls-10a',
    grade: '10',
    section: 'A',
    name: 'Class 10A',
    totalStudents: 36,
    classTeacher: 'Davinder Singh',
    avgPerformance: 84,
    subjects: [
      { name: 'Science', teacherName: 'Priya Sharma', teacherId: 'tch-201' },
      { name: 'Mathematics', teacherName: 'Ravi Kumar', teacherId: 'tch-202' }
    ]
  },
  {
    id: 'cls-10b',
    grade: '10',
    section: 'B',
    name: 'Class 10B',
    totalStudents: 34,
    classTeacher: 'Kiran Bala',
    avgPerformance: 76,
    subjects: [
      { name: 'Science', teacherName: 'Priya Sharma', teacherId: 'tch-201' }
    ]
  }
];

export const INITIAL_STUDENTS_ROSTER = [
  { id: 'std-101', name: 'Rahul Sharma', classSection: '8A', avgPerformance: 79, status: 'Improving' as const, assignmentAvg: 80, quizAvg: 78, attendance: 94 },
  { id: 'std-102', name: 'Aman Deep', classSection: '8A', avgPerformance: 64, status: 'Needs Support' as const, assignmentAvg: 62, quizAvg: 66, attendance: 82 },
  { id: 'std-103', name: 'Priya Kaur', classSection: '8A', avgPerformance: 91, status: 'Improving' as const, assignmentAvg: 94, quizAvg: 88, attendance: 98 },
  { id: 'std-104', name: 'Gurpreet Singh', classSection: '8A', avgPerformance: 76, status: 'Stable' as const, assignmentAvg: 75, quizAvg: 77, attendance: 90 },
  { id: 'std-105', name: 'Simran Kaur', classSection: '8A', avgPerformance: 88, status: 'Improving' as const, assignmentAvg: 90, quizAvg: 86, attendance: 96 },
  { id: 'std-106', name: 'Harman Preet', classSection: '8A', avgPerformance: 59, status: 'Needs Support' as const, assignmentAvg: 58, quizAvg: 60, attendance: 78 },
  { id: 'std-107', name: 'Jaspreet Singh', classSection: '8A', avgPerformance: 83, status: 'Stable' as const, assignmentAvg: 82, quizAvg: 84, attendance: 92 },
  { id: 'std-108', name: 'Navneet Kaur', classSection: '8A', avgPerformance: 72, status: 'Stable' as const, assignmentAvg: 70, quizAvg: 74, attendance: 88 }
];

export const INITIAL_LESSONS: LessonMaterial[] = [
  {
    id: 'les-01',
    title: 'Introduction to the Human Heart & Circulatory System',
    subject: 'Science',
    classSection: '8A',
    chapter: 'Chapter 5 — Human Body & Organ Systems',
    topic: 'Heart Structure, Oxygenation, and Double Circulation',
    contentType: 'video',
    description: 'A comprehensive visual lesson explaining how the human heart pumps blood, the role of atria and ventricles, and oxygen exchange in rural health contexts.',
    contentBody: `### Key Principles of the Human Heart:
1. **Four Chambers**: Two upper chambers called *Atria* (receive blood) and two lower muscular chambers called *Ventricles* (pump blood out).
2. **Double Circulation**:
   - **Pulmonary Circulation**: Deoxygenated blood travels from the right ventricle to the lungs to pick up fresh oxygen.
   - **Systemic Circulation**: Oxygen-rich blood returns to the left side and is pumped through the Aorta to muscles and organs.
3. **Valves**: Prevent backflow of blood, ensuring one-directional flow.
4. **Pulse Rate**: In healthy resting adolescents, heart beats approximately 70-80 times per minute.`,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: '12 mins',
    fileSizeMb: 14.2,
    teacherId: 'tch-201',
    teacherName: 'Priya Sharma',
    datePublished: 'Yesterday',
    isAvailableOffline: true,
    keyTakeaways: [
      'Heart acts as a continuous muscular pump with 4 distinct chambers',
      'Arteries carry oxygenated blood away from heart; veins return deoxygenated blood',
      'Valves prevent blood from flowing backward'
    ],
    tags: ['Biology', 'Class 8', 'Human Body', 'Vital Organs']
  },
  {
    id: 'les-02',
    title: 'Fractions & Decimals Applied to Real-life Farm Measurements',
    subject: 'Mathematics',
    classSection: '8A',
    chapter: 'Chapter 4 — Practical Fractions & Ratio',
    topic: 'Adding, Subtracting and Scaling Mixed Fractions',
    contentType: 'notes',
    description: 'Learn how to split land areas, calculate crop seed ratios, and divide irrigation supplies using fractions.',
    contentBody: `### Practical Math:
- Converting mixed numbers: $2 \\frac{1}{2} = \\frac{5}{2}$
- Finding Common Denominators: $\\frac{1}{4} + \\frac{2}{3} = \\frac{3}{12} + \\frac{8}{12} = \\frac{11}{12}$
- Ratio calculations for natural organic fertilizers: 3 parts soil to 1 part compost means a $\\frac{3}{4}$ to $\\frac{1}{4}$ ratio.`,
    duration: '15 mins read',
    fileSizeMb: 2.1,
    teacherId: 'tch-202',
    teacherName: 'Ravi Kumar',
    datePublished: '3 days ago',
    isAvailableOffline: true,
    keyTakeaways: [
      'Equivalent fractions simplify real-world measurements',
      'Cross-multiplication helps quick comparisons of yields'
    ],
    tags: ['Math', 'Fractions', 'Class 8', 'Practical Calculations']
  },
  {
    id: 'les-03',
    title: 'Digital Tools & Internet Safety in Rural Communities',
    subject: 'Computer Science',
    classSection: '8A',
    chapter: 'Chapter 2 — Digital Literacy & Cyber Hygiene',
    topic: 'Offline Apps, Cloud Storage, and Secure Passwords',
    contentType: 'pdf',
    description: 'Understanding how local caching helps study without continuous internet and keeping accounts secure.',
    contentBody: `### Offline Learning & Digital Safety Guide:
- How web apps save notes locally in browser storage
- Why OTPs and passwords must never be shared with strangers
- Verifying educational sources vs misinformation`,
    duration: '8 mins read',
    fileSizeMb: 3.5,
    teacherId: 'tch-201',
    teacherName: 'Priya Sharma',
    datePublished: '5 days ago',
    isAvailableOffline: false,
    keyTakeaways: [
      'Local caching allows continuous study even during power cuts',
      'Strong passphrases combine words and symbols'
    ],
    tags: ['Computer Literacy', 'Cyber Safety', 'Offline Technology']
  },
  {
    id: 'les-04',
    title: 'Water Resources & Rivers of Northern India',
    subject: 'Social Studies',
    classSection: '8A',
    chapter: 'Chapter 6 — Geography & Natural Ecology',
    topic: 'Canals, Ground Water Tables & Monsoon Rhythms',
    contentType: 'video',
    description: 'Explore the Sutlej and Beas river systems, canal irrigation networks in Malwa and Nabha regions, and conservation.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: '14 mins',
    fileSizeMb: 16.8,
    teacherId: 'tch-204',
    teacherName: 'Jaswinder Singh',
    datePublished: '1 week ago',
    isAvailableOffline: false,
    keyTakeaways: [
      'Monsoons recharge underground aquifers',
      'Canal lining reduces water seepage and protects soil'
    ],
    tags: ['Geography', 'Social Studies', 'Water Conservation']
  }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-01',
    title: 'Human Body — Assignment 1: Functions of the Heart',
    subject: 'Science',
    classSection: '8A',
    chapter: 'Chapter 5 — Human Body',
    description: 'Explain the four chambers of the human heart and describe how oxygenated blood travels to the rest of the body.',
    instructions: '1. List all 4 chambers.\n2. Explain difference between arteries and veins.\n3. Mention what happens during physical exercise.',
    teacherId: 'tch-201',
    teacherName: 'Priya Sharma',
    dueDate: 'Tomorrow, 5:00 PM',
    maxMarks: 10,
    attachmentName: 'Human_Heart_Diagram_Guide.pdf',
    createdDate: 'Yesterday'
  },
  {
    id: 'asg-02',
    title: 'Fractions & Practical Measurements Problem Set',
    subject: 'Mathematics',
    classSection: '8A',
    chapter: 'Chapter 4 — Fractions',
    description: 'Solve the 5 fraction calculation problems based on farm plot divisions and irrigation timing.',
    instructions: 'Show step-by-step calculations with common denominators.',
    teacherId: 'tch-202',
    teacherName: 'Ravi Kumar',
    dueDate: 'In 3 days',
    maxMarks: 15,
    attachmentName: 'Fractions_Worksheet_8A.pdf',
    createdDate: '2 days ago'
  },
  {
    id: 'asg-03',
    title: 'Essay: The Importance of Clean Energy in My Village',
    subject: 'English',
    classSection: '8A',
    chapter: 'Chapter 3 — Descriptive Writing',
    description: 'Write a 150-word paragraph describing solar power adoption and clean lighting in rural areas.',
    instructions: 'Focus on clear paragraph structure, correct tenses, and relevant vocabulary.',
    teacherId: 'tch-203',
    teacherName: 'Neelam Verma',
    dueDate: 'In 5 days',
    maxMarks: 10,
    attachmentName: 'Writing_Rubric.pdf',
    createdDate: '4 days ago'
  }
];

export const INITIAL_SUBMISSIONS: Submission[] = [
  {
    id: 'sub-01',
    assignmentId: 'asg-01',
    studentId: 'std-101',
    studentName: 'Rahul Sharma',
    classSection: '8A',
    submissionDate: 'Today, 9:30 AM',
    answerText: `1. The four chambers of the heart are: Left Atrium, Right Atrium, Left Ventricle, and Right Ventricle.
2. Arteries carry oxygen-rich blood from the heart to all parts of the body under high pressure, while veins carry deoxygenated blood back to the heart with the help of valves.
3. During exercise, our working muscles require more oxygen and glucose, so the heart pumps faster to supply extra oxygenated blood.`,
    attachmentName: 'heart_labeled_diagram_rahul.jpg',
    status: 'Submitted',
    maxMarks: 10
  },
  {
    id: 'sub-02',
    assignmentId: 'asg-02',
    studentId: 'std-101',
    studentName: 'Rahul Sharma',
    classSection: '8A',
    submissionDate: 'Yesterday',
    answerText: `Calculations for Plot A and B:
Problem 1: 3/4 + 2/3 = (9 + 8)/12 = 17/12 = 1 and 5/12 acres.
Problem 2: 5/6 - 1/3 = (5 - 2)/6 = 3/6 = 1/2 tank capacity left.`,
    status: 'Graded',
    marksObtained: 13,
    maxMarks: 15,
    feedback: 'Excellent work with common denominators! Minor neatness tip for step 3.',
    gradedBy: 'Ravi Kumar',
    gradedDate: 'Yesterday'
  },
  {
    id: 'sub-03',
    assignmentId: 'asg-01',
    studentId: 'std-102',
    studentName: 'Aman Deep',
    classSection: '8A',
    submissionDate: 'Today, 8:15 AM',
    answerText: `Heart pumps blood. There are 4 rooms inside heart. Blood goes to lungs and then everywhere.`,
    status: 'Submitted',
    maxMarks: 10
  }
];

export const INITIAL_QUIZZES: Quiz[] = [
  {
    id: 'qz-01',
    title: 'Human Heart & Circulation Quick Quiz',
    subject: 'Science',
    classSection: '8A',
    chapter: 'Chapter 5 — Human Body',
    timeLimitMinutes: 5,
    createdBy: 'TEACHER',
    questions: [
      {
        id: 'q1',
        question: 'Which chamber of the human heart receives oxygen-rich blood directly from the lungs?',
        options: ['Right Atrium', 'Left Atrium', 'Right Ventricle', 'Left Ventricle'],
        correctAnswerIndex: 1,
        explanation: 'The Left Atrium receives oxygenated blood from the pulmonary veins coming straight from the lungs.'
      },
      {
        id: 'q2',
        question: 'What is the primary function of valves in the heart and veins?',
        options: ['To speed up blood flow', 'To prevent backward flow of blood', 'To produce white blood cells', 'To filter waste chemicals'],
        correctAnswerIndex: 1,
        explanation: 'Valves act as one-way gates, preventing backflow and ensuring blood moves strictly forward.'
      },
      {
        id: 'q3',
        question: 'Which major blood vessel carries oxygenated blood out from the heart to the entire body?',
        options: ['Vena Cava', 'Pulmonary Artery', 'Aorta', 'Capillary Tube'],
        correctAnswerIndex: 2,
        explanation: 'The Aorta is the largest artery in the human body, pumping oxygenated blood to all systemic organs.'
      },
      {
        id: 'q4',
        question: 'What is the approximate resting pulse rate for a healthy teenager?',
        options: ['30–40 bpm', '70–85 bpm', '120–150 bpm', '200 bpm'],
        correctAnswerIndex: 1,
        explanation: 'A normal resting heart rate for older children and adolescents is typically between 70 and 85 beats per minute.'
      },
      {
        id: 'q5',
        question: 'Deoxygenated blood travels from the heart to the lungs through the:',
        options: ['Pulmonary Artery', 'Pulmonary Vein', 'Carotid Artery', 'Renal Vein'],
        correctAnswerIndex: 0,
        explanation: 'The Pulmonary Artery is unique as it is the only artery that carries deoxygenated blood away from heart to lungs.'
      }
    ]
  },
  {
    id: 'qz-02',
    title: 'Fractions & Practical Ratios Quiz',
    subject: 'Mathematics',
    classSection: '8A',
    chapter: 'Chapter 4 — Fractions',
    timeLimitMinutes: 6,
    createdBy: 'TEACHER',
    questions: [
      {
        id: 'mq1',
        question: 'What is 3/4 + 1/8 in simplest form?',
        options: ['4/12', '7/8', '5/8', '1/2'],
        correctAnswerIndex: 1,
        explanation: 'Convert 3/4 to 6/8. Then 6/8 + 1/8 = 7/8.'
      },
      {
        id: 'mq2',
        question: 'If 2/5 of a field is sown with wheat and 1/5 with mustard, what fraction is left unplanted?',
        options: ['3/5', '2/5', '1/5', '4/5'],
        correctAnswerIndex: 1,
        explanation: 'Total planted = 2/5 + 1/5 = 3/5. Remaining = 1 - 3/5 = 2/5.'
      },
      {
        id: 'mq3',
        question: 'Which of the following fractions is the largest?',
        options: ['2/3', '3/5', '7/10', '1/2'],
        correctAnswerIndex: 2,
        explanation: 'Decimals: 2/3 ≈ 0.66, 3/5 = 0.60, 7/10 = 0.70, 1/2 = 0.50. Thus 7/10 is largest.'
      }
    ]
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-01',
    title: 'Science Practical Demonstration Tomorrow at 10:00 AM',
    content: 'All Class 8A and 8B students are requested to bring their science notebooks. We will demonstrate stethoscope sound amplification and double circulation models.',
    authorName: 'Priya Sharma (Science Educator)',
    authorRole: 'TEACHER',
    targetClasses: ['8A', '8B'],
    date: 'Today, 8:00 AM',
    priority: 'high'
  },
  {
    id: 'ann-02',
    title: 'Solar Powered Digital Learning Lab Access Open',
    content: 'The school computer lab with offline content mirrors is now open after school hours (3:30 PM to 5:00 PM) for all students needing high-speed offline downloads.',
    authorName: 'S. Harpreet Singh (Principal)',
    authorRole: 'MANAGEMENT',
    targetClasses: ['All'],
    date: 'Yesterday',
    priority: 'normal'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-01',
    userId: 'std-101',
    title: 'New Video Lesson Available',
    message: 'Priya Sharma uploaded "Human Heart & Circulatory System" video.',
    timestamp: '2 hours ago',
    read: false,
    type: 'lesson',
    actionLink: 'lessons'
  },
  {
    id: 'notif-02',
    userId: 'std-101',
    title: 'Assignment Reminder',
    message: 'Human Body — Assignment 1 is due tomorrow at 5:00 PM.',
    timestamp: '5 hours ago',
    read: false,
    type: 'assignment',
    actionLink: 'assignments'
  },
  {
    id: 'notif-03',
    userId: 'std-101',
    title: 'Math Assignment Graded',
    message: 'Ravi Kumar evaluated your Fractions assignment (13/15).',
    timestamp: 'Yesterday',
    read: true,
    type: 'grade',
    actionLink: 'assignments'
  }
];

export const INITIAL_GOALS: LearningGoal[] = [
  {
    id: 'gl-01',
    studentId: 'std-101',
    subject: 'Science',
    title: 'Master Class 8 Science Chapters 1 to 5',
    targetScore: 90,
    currentScore: 78,
    deadlineDays: 24,
    progressPercentage: 72,
    status: 'active'
  },
  {
    id: 'gl-02',
    studentId: 'std-101',
    subject: 'Mathematics',
    title: 'Score 85%+ in Fractions & Algebra Unit Tests',
    targetScore: 85,
    currentScore: 82,
    deadlineDays: 14,
    progressPercentage: 88,
    status: 'active'
  },
  {
    id: 'gl-03',
    studentId: 'std-101',
    subject: 'Space & Astronomy',
    title: 'Complete Solar System & Satellite Module in Personal Learning',
    targetScore: 100,
    currentScore: 65,
    deadlineDays: 10,
    progressPercentage: 65,
    status: 'active'
  }
];

export const INITIAL_DOWNLOADS: DownloadedResource[] = [
  {
    id: 'dn-01',
    materialId: 'les-01',
    title: 'Human Body — Chapter 5 Video Lesson',
    subject: 'Science',
    type: 'video',
    fileSizeMb: 14.2,
    downloadedAt: 'Yesterday, 4:15 PM',
    chapter: 'Chapter 5 — Human Body',
    duration: '12 mins',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  {
    id: 'dn-02',
    materialId: 'les-02',
    title: 'Fractions & Ratios Study Notes & Practice Sheet',
    subject: 'Mathematics',
    type: 'notes',
    fileSizeMb: 2.1,
    downloadedAt: '2 days ago',
    chapter: 'Chapter 4 — Fractions',
    duration: '15 mins read',
    contentBody: `### Offline Notes: Fractions and Decimals
- To add fractions with different denominators, always find the Lowest Common Multiple (LCM).
- Example: 1/3 + 1/4 = 4/12 + 3/12 = 7/12.
- Practical problem: Splitting irrigation hours across 3 equal farm sections.`
  }
];

export const INITIAL_STUDENT_ANALYTICS: StudentAnalytics = {
  studentId: 'std-101',
  overallScore: 79,
  performanceTrend: 'Improving',
  subjectScores: [
    { subject: 'Mathematics', score: 85, trend: 'up', assignmentsDone: 4, quizzesDone: 3 },
    { subject: 'Science', score: 72, trend: 'up', assignmentsDone: 3, quizzesDone: 2 },
    { subject: 'English', score: 91, trend: 'stable', assignmentsDone: 4, quizzesDone: 3 },
    { subject: 'Social Studies', score: 78, trend: 'up', assignmentsDone: 3, quizzesDone: 2 },
    { subject: 'Computer Science', score: 68, trend: 'down', assignmentsDone: 2, quizzesDone: 1 }
  ],
  assignmentAverage: 81,
  quizAverage: 77,
  lessonsCompletedCount: 14,
  videosWatchedCount: 9,
  weeklyActivityHours: [3.5, 4.2, 5.0, 4.8, 6.2, 5.5, 7.0],
  aiInsightText: 'Your Mathematics performance is very strong (85%). Science has improved from 65% to 72% with consistent video completions.',
  aiRecommendation: 'Review Chapter 5 Heart Chamber diagrams and submit Assignment 1 to push Science score above 80%.'
};

export const PERSONAL_LEARNING_TOPICS: PersonalLearningTopic[] = [
  {
    id: 'plt-space-01',
    title: 'Solar System, Planetary Orbits & Moon Phases',
    subject: 'Space Science',
    category: 'Space',
    difficulty: 'Beginner',
    summary: 'Discover how planets orbit the Sun, why we have day and night, and how lunar eclipses happen.',
    modulesCount: 4,
    estimatedMinutes: 25,
    lessons: [
      {
        id: 'space-les-1',
        title: 'The Sun and the 8 Major Planets',
        type: 'video',
        duration: '6 mins',
        content: 'Overview of Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.'
      },
      {
        id: 'space-les-2',
        title: 'Gravity and Orbital Motion Explained Simply',
        type: 'notes',
        duration: '8 mins read',
        content: 'Why planets stay in predictable ellipses instead of floating away.'
      },
      {
        id: 'space-les-3',
        title: 'Indian Space Journey: ISRO Chandrayaan & Aditya-L1',
        type: 'interactive',
        duration: '11 mins',
        content: 'How Indian scientists built cost-effective missions to explore the Moon and study solar flares.'
      }
    ]
  },
  {
    id: 'plt-agri-02',
    title: 'Smart Soil Health, Moisture Sensors & Organic Composting',
    subject: 'Applied Agriculture STEM',
    category: 'Agriculture',
    difficulty: 'Beginner',
    summary: 'Learn the biology of nitrogen-fixing bacteria, soil pH testing, and how simple moisture sensors save ground water in Nabha.',
    modulesCount: 3,
    estimatedMinutes: 20,
    lessons: [
      {
        id: 'agri-les-1',
        title: 'Understanding Soil Nutrients: N-P-K and Organic Humus',
        type: 'notes',
        duration: '7 mins read',
        content: 'Healthy soil contains millions of beneficial microbes that nourish wheat, rice, and vegetable crops.'
      },
      {
        id: 'agri-les-2',
        title: 'Drip Irrigation & Automated Water Valves',
        type: 'video',
        duration: '8 mins',
        content: 'How micro-irrigation delivers water directly to plant roots with zero evaporation waste.'
      }
    ]
  },
  {
    id: 'plt-robot-03',
    title: 'Basic Robotics, Electric Motors & Solar Circuits',
    subject: 'STEM & Robotics',
    category: 'Robotics',
    difficulty: 'Intermediate',
    summary: 'Hands-on understanding of switches, battery cells, DC motors, and building simple toy buggies.',
    modulesCount: 4,
    estimatedMinutes: 30,
    lessons: [
      {
        id: 'rob-les-1',
        title: 'How Electric Circuits Work: Volts, Amps & Resistance',
        type: 'interactive',
        duration: '10 mins',
        content: 'Visual flow of electrons through copper wire, resistor, LED, and push button.'
      },
      {
        id: 'rob-les-2',
        title: 'Mini Solar Panels: Converting Sunlight to Motion',
        type: 'video',
        duration: '7 mins',
        content: 'Building a miniature solar fan using recycled materials.'
      }
    ]
  },
  {
    id: 'plt-math-04',
    title: 'Vedic Math & Rapid Mental Calculation Tricks',
    subject: 'Mental Mathematics',
    category: 'Mental Math',
    difficulty: 'Beginner',
    summary: 'Master rapid multiplication, square roots, and fast addition techniques without pencil and paper.',
    modulesCount: 3,
    estimatedMinutes: 18,
    lessons: [
      {
        id: 'vm-les-1',
        title: 'Multiplying Any Two-Digit Number by 11 in 2 Seconds',
        type: 'notes',
        duration: '5 mins read',
        content: 'Rule: Add the two digits together and put the sum in the middle! E.g., 35 x 11 = 3 [3+5] 5 = 385.'
      },
      {
        id: 'vm-les-2',
        title: 'Base 100 Multiplication Shortcuts',
        type: 'interactive',
        duration: '8 mins',
        content: 'Calculate 98 x 97 instantly using deviations from 100.'
      }
    ]
  }
];
