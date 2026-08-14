import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy initialize Gemini client
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!genAIClient && process.env.GEMINI_API_KEY) {
    try {
      genAIClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });
    } catch (e) {
      console.warn('Could not initialize GoogleGenAI client:', e);
    }
  }
  return genAIClient;
}

const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  hi: 'Hindi (हिन्दी)',
  pa: 'Punjabi (ਪੰਜਾਬੀ)',
  te: 'Telugu (తెలుగు)',
  ta: 'Tamil (தமிழ்)',
  bn: 'Bengali (বাংলা)',
  mr: 'Marathi (मराठी)',
  gu: 'Gujarati (ગુજરાતી)',
  kn: 'Kannada (ಕನ್ನಡ)',
  ml: 'Malayalam (മലയാളം)',
  or: 'Odia (ଓଡ଼ିଆ)',
  as: 'Assamese (অসমীয়া)',
  ur: 'Urdu (اردو)',
  sa: 'Sanskrit (संस्कृतम्)',
  mai: 'Maithili (मैथिली)',
  sat: 'Santali (ᱥᱟᱱᱛᱟᱲᱤ)',
  ks: 'Kashmiri (کٲشُر / कॉशुर)',
  ne: 'Nepali (नेपाली)',
  kok: 'Konkani (कोंकणी)',
  sd: 'Sindhi (سنڌي / सिन्धी)',
  doi: 'Dogri (डोगरी)',
  mni: 'Manipuri (মৈতৈলোন্)',
  brx: 'Bodo (बड़ो)'
};

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    appName: 'RuralLearn',
    hasApiKey: !!process.env.GEMINI_API_KEY,
    time: new Date().toISOString()
  });
});

// 2. AI Tutor Chat Endpoint
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, classGrade, subject, currentChapter, mode, language } = req.body;

    const userQuery = message || 'Explain photosynthesis in simple words';
    const lang = language || 'en';
    const langName = LANGUAGE_NAMES[lang] || 'English';
    const studentClass = classGrade || '8th Grade';
    const subj = subject || 'Science';
    const chapter = currentChapter || 'Chapter 5 — Human Body';

    const systemPrompt = `You are "RuralLearn AI Tutor", an encouraging, pedagogically sound, rural-first AI learning tutor for rural school students across India.
Target Student Context:
- Grade: ${studentClass}
- Subject: ${subj}
- Current Teacher Material / Chapter: ${chapter}
- Target Language: ${langName} (Language code: "${lang}")
- Mode requested: ${mode || 'simple_concept'}

Educational Rules:
1. Respond fluently and naturally in ${langName}. If explaining scientific or mathematical terms, you may provide the English equivalent in parentheses next to the native translation for clarity.
2. Explain concepts in clear, intuitive, friendly language suitable for a middle/high school rural student.
3. Use relatable rural or daily-life analogies (e.g. comparing water flow in canals or drip irrigation to blood vessels, comparing solar cells to plant leaves, bicycle gears to ratios).
4. If requested "explain simply" or "step by step", format with bullet points and bold key terms.
5. If asked about teacher materials (e.g. Heart, Fractions, Soil), directly refer to Chapter 5 / Chapter 4 concepts.
6. Provide 2-3 quick follow-up practice questions or hints at the end.
7. Keep tone uplifting, positive, and non-intimidating.`;

    const ai = getGenAI();
    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: userQuery,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        }
      });

      const responseText = response.text || 'I am here to help you learn! What would you like to explore next?';
      return res.json({
        text: responseText,
        sourceIndicator: `Based on your ${subj} ${chapter} curriculum material.`
      });
    } else {
      // Fallback pedagogical responses if API key is not configured
      let fallbackText = '';
      const lower = userQuery.toLowerCase();
      if (lower.includes('heart') || lower.includes('blood') || lower.includes('circulation')) {
        fallbackText = `### 🫀 The Human Heart Explained Simply:

Think of your heart as a **tireless water pump** in a farm field that never stops working!

1. **4 Special Rooms (Chambers)**:
   - **Top 2 Rooms (Atria)**: Like collection tanks that receive incoming blood.
   - **Bottom 2 Rooms (Ventricles)**: Strong muscular pumps that push blood forward with force.

2. **Double Circulation**:
   - **Trip 1 (To the Lungs)**: Blood goes to the lungs to breathe in fresh Oxygen 🫁.
   - **Trip 2 (To the Body)**: Oxygen-rich blood is delivered through arteries to your brain, muscles, and organs so you can run, think, and play!

3. **One-Way Valves**: Like one-way canal gates, they prevent blood from leaking backwards.

💡 **Quick Question**: Can you name the largest artery that carries oxygen-rich blood out from the heart? *(Hint: starts with 'A')*`;
      } else if (lower.includes('fraction') || lower.includes('math')) {
        fallbackText = `### ➗ Fractions Made Simple:

Imagine dividing a **gur (jaggery) roti** or an **acre of land** among friends!

- **Numerator (Top Number)**: How many slices you have.
- **Denominator (Bottom Number)**: Total number of equal slices.
- **Example**: If you divide a farm plot into 4 equal sections and sow wheat in 3 of them, you have sown **3/4** of the land!

To add fractions like **1/4 + 1/2**:
1. Make denominators equal: 1/2 = 2/4.
2. Add tops: 1/4 + 2/4 = **3/4**.`;
      } else {
        fallbackText = `### 📚 AI Learning Assistance:

Great question! Here is a simple breakdown:

1. **Core Concept**: Every natural process follows scientific rules and balance.
2. **Rural Application**: Connecting what you study in books to the crops, soil, water systems, and technology around you.
3. **Step-by-step**: Break big problems into smaller, manageable chunks.

Ask me: *"Explain with an example"* or *"Give me 5 practice questions"* anytime!`;
      }

      return res.json({
        text: fallbackText,
        sourceIndicator: `Based on your ${subj} ${chapter} curriculum material.`
      });
    }
  } catch (error: any) {
    console.error('Error in /api/ai/chat:', error);
    res.status(500).json({
      error: 'Failed to process AI Tutor query',
      text: 'The AI Tutor encountered a momentary delay. Here is a key insight: Focus on your core chapter notes and review the interactive diagrams in your school space.'
    });
  }
});

// 3. AI Quiz Generation Endpoint
app.post('/api/ai/quiz', async (req, res) => {
  try {
    const { subject, chapter, count, language } = req.body;
    const numQuestions = count === 10 ? 10 : 5;
    const subj = subject || 'Science';
    const chap = chapter || 'Chapter 5 — Human Body';
    const lang = language || 'en';
    const langName = LANGUAGE_NAMES[lang] || 'English';

    const ai = getGenAI();
    if (ai) {
      const prompt = `Generate a ${numQuestions}-question multiple choice quiz in the ${langName} language for an 8th-grade rural student studying ${subj}, specifically topic: "${chap}".
Write all questions, options, and explanations fluently in ${langName}.
Return the output in clean JSON format matching the schema.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    question: { type: Type.STRING },
                    options: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    },
                    correctAnswerIndex: { type: Type.INTEGER },
                    explanation: { type: Type.STRING }
                  },
                  required: ['id', 'question', 'options', 'correctAnswerIndex', 'explanation']
                }
              }
            },
            required: ['title', 'questions']
          }
        }
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({
        id: `ai-qz-${Date.now()}`,
        title: parsed.title || `${subj} Practice Quiz`,
        subject: subj,
        chapter: chap,
        classSection: '8A',
        timeLimitMinutes: numQuestions,
        createdBy: 'AI_TUTOR',
        questions: parsed.questions || []
      });
    } else {
      // Fallback quiz generator
      return res.json({
        id: `ai-qz-${Date.now()}`,
        title: `${subj}: ${chap} Practice Quiz`,
        subject: subj,
        chapter: chap,
        classSection: '8A',
        timeLimitMinutes: 5,
        createdBy: 'AI_TUTOR',
        questions: [
          {
            id: 'aq1',
            question: 'What is the main function of the left ventricle in the human heart?',
            options: ['Pumping oxygenated blood into the aorta', 'Receiving blood from the vena cava', 'Filtering carbon dioxide', 'Generating pulse electrical signals'],
            correctAnswerIndex: 0,
            explanation: 'The left ventricle has the thickest muscle wall to pump oxygen-rich blood through the aorta to the whole body.'
          },
          {
            id: 'aq2',
            question: 'Why do veins have valves whereas arteries do not?',
            options: ['Veins carry blood under higher pressure', 'To prevent backward flow under low venous pressure', 'To absorb oxygen from surrounding cells', 'To create the heartbeat sound'],
            correctAnswerIndex: 1,
            explanation: 'Veins return blood against gravity at lower pressure, so one-way valves keep blood moving towards the heart.'
          },
          {
            id: 'aq3',
            question: 'Which gas is picked up by blood when it passes through the capillaries of the lungs?',
            options: ['Nitrogen', 'Carbon Dioxide', 'Oxygen', 'Hydrogen'],
            correctAnswerIndex: 2,
            explanation: 'In the lungs (alveoli), red blood cells release carbon dioxide and absorb fresh oxygen.'
          },
          {
            id: 'aq4',
            question: 'In fractions, what is 2/3 of 12 acres of wheat field?',
            options: ['6 acres', '8 acres', '9 acres', '4 acres'],
            correctAnswerIndex: 1,
            explanation: '(2/3) * 12 = (2 * 12) / 3 = 24 / 3 = 8 acres.'
          },
          {
            id: 'aq5',
            question: 'How does Low Data Mode help rural students studying online?',
            options: ['Increases battery drain', 'Compresses images & prioritizes text and offline downloads', 'Requires 5G connectivity', 'Blocks teacher assignments'],
            correctAnswerIndex: 1,
            explanation: 'Low Data Mode reduces unnecessary media and loads lightweight content so students can study even with 2G/weak internet.'
          }
        ]
      });
    }
  } catch (error: any) {
    console.error('Error in /api/ai/quiz:', error);
    res.status(500).json({ error: 'Quiz generation failed' });
  }
});

// 4. AI Student Performance Insight Generator
app.post('/api/ai/insights', async (req, res) => {
  try {
    const { studentName, subjectScores, recentAssignmentScore } = req.body;
    const ai = getGenAI();

    if (ai) {
      const prompt = `Analyze the student learning profile for ${studentName || 'Student'}:
Scores: ${JSON.stringify(subjectScores || [])}
Recent Assignment Score: ${recentAssignmentScore || '8/10'}
Provide:
1. A concise, encouraging diagnostic summary (max 2 sentences).
2. One specific actionable study recommendation (1 sentence).`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt
      });

      return res.json({
        analysis: response.text || 'You are demonstrating consistent improvement in core STEM subjects.'
      });
    } else {
      return res.json({
        analysis: `Your Mathematics performance is very strong (85%). Science has climbed to 80% following your recent Chapter 5 assignment on the Circulatory System. Recommendation: Practice Science Chapter 4 worksheets and attempt the practice quiz to solidify your understanding.`
      });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate insights' });
  }
});

// Vite middleware & Static server setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`RuralLearn server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
