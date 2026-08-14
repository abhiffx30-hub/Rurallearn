import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { AIChatMessage, Quiz } from '../../types';
import {
  X,
  Send,
  Bot,
  Sparkles,
  BookOpen,
  HelpCircle,
  RotateCcw,
  Zap,
  CheckCircle,
  Lightbulb,
  FileQuestion,
  Layers,
  Globe
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { LanguageModal } from '../common/LanguageModal';
import { INDIAN_LANGUAGES } from '../../utils/translations';

export const AITutorModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onLaunchQuiz?: (quiz: Quiz) => void;
}> = ({ isOpen, onClose, onLaunchQuiz }) => {
  const { studentProfile, language, t } = useApp();
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const currentLangMeta = INDIAN_LANGUAGES.find(l => l.code === language) || INDIAN_LANGUAGES[0];

  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'ai',
      text: `Hello Rahul! 👋 I am your **RuralLearn AI Tutor**. 

I am in sync with your **Class 8 curriculum** and your teacher Priya Sharma's materials (like *Chapter 5: Human Body & Circulatory System* and *Chapter 4: Fractions*).

What would you like to explore today?`,
      timestamp: 'Just now',
      sourceIndicator: 'Based on Class 8 Science & Mathematics curriculum',
      suggestedQuestions: [
        'Explain the human heart in simple words',
        'How do fractions work in farm land division?',
        'Give me 5 practice questions on blood circulation',
        'Generate a practice quiz for me'
      ]
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMode, setSelectedMode] = useState<string>('simple');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (customText?: string) => {
    const query = customText || inputPrompt.trim();
    if (!query || isLoading) return;

    const userMsg: AIChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      // Check if user is requesting a quiz
      if (query.toLowerCase().includes('quiz') || query.toLowerCase().includes('generate quiz')) {
        const res = await fetch('/api/ai/quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subject: 'Science',
            chapter: 'Chapter 5 — Human Body',
            count: 5,
            language
          })
        });
        const quizData = await res.json();

        const aiMsg: AIChatMessage = {
          id: `msg-ai-${Date.now()}`,
          sender: 'ai',
          text: `🎯 I've generated a 5-question **${quizData.subject} Practice Quiz** on *${quizData.chapter}* based on your current lessons! Click the button below to take the quiz and test your understanding.`,
          timestamp: 'Just now',
          sourceIndicator: 'Based on Science Chapter 5 curriculum',
          quiz: quizData
        };
        setMessages(prev => [...prev, aiMsg]);
      } else {
        const res = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: query,
            classGrade: studentProfile.grade,
            subject: 'Science',
            currentChapter: 'Chapter 5 — Human Body',
            mode: selectedMode,
            language
          })
        });

        const data = await res.json();

        const aiMsg: AIChatMessage = {
          id: `msg-ai-${Date.now()}`,
          sender: 'ai',
          text: data.text || 'Here is a simple summary of that concept.',
          timestamp: 'Just now',
          sourceIndicator: data.sourceIndicator || 'Based on Class 8 Science curriculum',
          suggestedQuestions: [
            'Explain with an example',
            'Give me 5 practice questions',
            'Generate a practice quiz'
          ]
        };
        setMessages(prev => [...prev, aiMsg]);
      }
    } catch (err) {
      console.error(err);
      const fallbackMsg: AIChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'ai',
        text: `### 🫀 The Human Heart & Double Circulation:

Think of your heart as a **continuous water pump** with two separate loops:

1. **Pulmonary Circuit**: Pushes used blood to the lungs to collect oxygen.
2. **Systemic Circuit**: Pushes oxygen-rich blood through the Aorta to all body tissues.

💡 **Key Takeaway**: Arteries move blood away from the heart under high pressure; veins return blood with one-way valves.`,
        timestamp: 'Just now',
        sourceIndicator: 'Based on Science Chapter 5 curriculum'
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full h-[85vh] max-h-[750px] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 border border-slate-200">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-800 to-teal-800 text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-emerald-300">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">RuralLearn AI Tutor</h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-400/30">
                  Class 8 Context
                </span>
              </div>
              <p className="text-xs text-emerald-100/80">
                Ask me about your lessons, subjects or learning goals.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Style mode chips & Language indicator */}
        <div className="px-6 py-2 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between gap-2 overflow-x-auto text-xs shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
              Style:
            </span>
            {[
              { id: 'simple', label: t.explainSimply || 'Explain simply' },
              { id: 'example', label: `🌾 ${t.explainExample || 'Rural Example'}` },
              { id: 'stepbystep', label: t.stepByStep || 'Step by step' },
              { id: 'short', label: 'Short answer' }
            ].map(chip => (
              <button
                key={chip.id}
                onClick={() => setSelectedMode(chip.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                  selectedMode === chip.id
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowLanguageModal(true)}
            className="ml-auto px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 transition flex items-center gap-1.5 shrink-0"
            title="Change AI Tutor Language"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-600" />
            <span>{currentLangMeta.name}</span>
            <span className="text-[10px] text-emerald-600 font-normal">({currentLangMeta.englishName})</span>
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[88%] sm:max-w-[80%] p-4 rounded-2xl shadow-xs text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-xs font-medium'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                }`}
              >
                {msg.sender === 'ai' ? (
                  <div>
                    <div className="prose prose-sm prose-slate max-w-none text-xs sm:text-sm space-y-2">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>

                    {msg.sourceIndicator && (
                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium bg-emerald-50/50 px-2.5 py-1 rounded-lg">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{msg.sourceIndicator}</span>
                      </div>
                    )}

                    {msg.quiz && (
                      <div className="mt-4 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-slate-900">{msg.quiz.title}</p>
                          <p className="text-[11px] text-slate-500">{msg.quiz.questions.length} questions • 5 mins</p>
                        </div>
                        <button
                          onClick={() => {
                            if (onLaunchQuiz && msg.quiz) {
                              onLaunchQuiz(msg.quiz);
                              onClose();
                            }
                          }}
                          className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow transition"
                        >
                          Start Quiz
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <span>{msg.text}</span>
                )}
              </div>

              {/* Quick follow up chips for latest AI message */}
              {msg.sender === 'ai' && msg.suggestedQuestions && (
                <div className="flex flex-wrap gap-1.5 mt-2 ml-1">
                  {msg.suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(q)}
                      className="text-[11px] font-medium bg-white hover:bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200/80 shadow-2xs transition"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-white p-3 rounded-2xl border border-slate-200 w-fit">
              <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
              <span>RuralLearn AI Tutor is formulating simple explanation...</span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200 shrink-0">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={e => setInputPrompt(e.target.value)}
              placeholder="Ask anything (e.g. 'Explain heart double circulation simply')..."
              className="flex-1 text-xs sm:text-sm px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-900 placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={isLoading || !inputPrompt.trim()}
              className="p-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-2xl shadow-md transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      <LanguageModal
        isOpen={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
      />
    </div>
  );
};
