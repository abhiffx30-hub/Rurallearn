import React, { useState, useEffect } from 'react';
import { Quiz, QuizAttempt } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle2, AlertCircle, Sparkles, Trophy, RotateCcw, Clock, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const InteractiveQuizModal: React.FC<{
  quiz: Quiz | null;
  onClose: () => void;
}> = ({ quiz, onClose }) => {
  const { recordQuizAttempt } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 mins

  useEffect(() => {
    if (!isSubmitted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [isSubmitted, timeLeft]);

  if (!quiz) return null;

  const currentQuestion = quiz.questions[currentIndex];
  const totalQuestions = quiz.questions.length;

  const handleSelect = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  const handleFinish = () => {
    setIsSubmitted(true);

    let correctCount = 0;
    const answerRecords = quiz.questions.map(q => {
      const selected = selectedAnswers[q.id];
      const isCorrect = selected === q.correctAnswerIndex;
      if (isCorrect) correctCount++;
      return {
        questionId: q.id,
        selectedOptionIndex: selected ?? -1,
        isCorrect
      };
    });

    const percentage = Math.round((correctCount / totalQuestions) * 100);

    recordQuizAttempt({
      quizId: quiz.id,
      score: correctCount,
      totalQuestions,
      percentage,
      answers: answerRecords
    });

    if (percentage >= 70) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const calculateScore = () => {
    let count = 0;
    quiz.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswerIndex) count++;
    });
    return count;
  };

  const score = calculateScore();
  const percentage = Math.round((score / totalQuestions) * 100);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {quiz.subject}
              </span>
              {quiz.createdBy === 'AI_TUTOR' && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> AI Generated
                </span>
              )}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mt-1">{quiz.title}</h3>
          </div>

          <div className="flex items-center gap-3">
            {!isSubmitted && (
              <div className="flex items-center gap-1.5 text-xs font-mono bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 text-emerald-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {!isSubmitted ? (
            <div>
              {/* Question Progress Tracker */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-500">
                  Question {currentIndex + 1} of {totalQuestions}
                </span>
                <div className="flex gap-1.5">
                  {quiz.questions.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-6 h-6 rounded-full text-xs font-semibold flex items-center justify-center transition ${
                        currentIndex === idx
                          ? 'bg-emerald-600 text-white'
                          : selectedAnswers[quiz.questions[idx].id] !== undefined
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Current Question */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
                <p className="text-base font-bold text-slate-900 leading-snug">
                  {currentQuestion.question}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, idx) => {
                  const isChosen = selectedAnswers[currentQuestion.id] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition flex items-center justify-between ${
                        isChosen
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-950 ring-2 ring-emerald-600/20'
                          : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                            isChosen ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Footer Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-30"
                >
                  Previous
                </button>

                {currentIndex < totalQuestions - 1 ? (
                  <button
                    onClick={() => setCurrentIndex(prev => Math.min(totalQuestions - 1, prev + 1))}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleFinish}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition"
                  >
                    Submit Quiz Evaluation
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                <Trophy className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                  Quiz Completed
                </span>
                <h4 className="text-2xl font-extrabold text-slate-900 mt-2">
                  You Scored {score} / {totalQuestions} ({percentage}%)
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  {percentage >= 80
                    ? '🌟 Outstanding mastery of this topic!'
                    : percentage >= 60
                    ? '👍 Good understanding. Review the explanations below.'
                    : '📖 Keep practicing! Review Chapter 5 notes in School Learning.'}
                </p>
              </div>

              {/* Review Breakdown */}
              <div className="text-left space-y-3 pt-4 border-t border-slate-100">
                <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Answers & Explanations:
                </h5>
                {quiz.questions.map((q, idx) => {
                  const studentAns = selectedAnswers[q.id];
                  const isCorrect = studentAns === q.correctAnswerIndex;
                  return (
                    <div
                      key={q.id}
                      className={`p-3.5 rounded-xl border text-xs ${
                        isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'
                      }`}
                    >
                      <div className="flex items-start gap-2 mb-1.5">
                        {isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        )}
                        <p className="font-bold text-slate-900">
                          {idx + 1}. {q.question}
                        </p>
                      </div>
                      <p className="text-slate-600 ml-6 mb-1">
                        <strong>Correct:</strong> {q.options[q.correctAnswerIndex]}
                      </p>
                      <p className="text-slate-500 ml-6 italic bg-white/80 p-2 rounded-lg border border-slate-100">
                        💡 <strong>Explanation:</strong> {q.explanation}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setSelectedAnswers({});
                    setCurrentIndex(0);
                    setTimeLeft(300);
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
