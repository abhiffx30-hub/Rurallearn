import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PERSONAL_LEARNING_TOPICS } from '../../data/initialData';
import { PersonalLearningTopic, LearningGoal } from '../../types';
import {
  Compass,
  Sparkles,
  Target,
  Plus,
  Trash2,
  BookOpen,
  Play,
  CheckCircle2,
  Filter,
  X,
  Bot,
  Home,
  ArrowLeft
} from 'lucide-react';

export const PersonalLearningView: React.FC<{
  onOpenAITutor: () => void;
}> = ({ onOpenAITutor }) => {
  const { goals, addGoal, deleteGoal, setActiveView, logout, t } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [activeTopicModal, setActiveTopicModal] = useState<PersonalLearningTopic | null>(null);

  // New Goal modal
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [goalTitle, setGoalTitle] = useState('');
  const [goalSubject, setGoalSubject] = useState('Science');
  const [goalTarget, setGoalTarget] = useState(85);
  const [goalDays, setGoalDays] = useState(30);

  const categories = ['All', 'Space', 'Agriculture', 'Robotics', 'Mental Math'];

  const filteredTopics = PERSONAL_LEARNING_TOPICS.filter(
    topic =>
      (selectedCategory === 'All' || topic.category === selectedCategory) &&
      (selectedDifficulty === 'All' || topic.difficulty === selectedDifficulty)
  );

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalTitle.trim()) return;

    addGoal({
      subject: goalSubject,
      title: goalTitle,
      targetScore: goalTarget,
      deadlineDays: goalDays
    });

    setGoalTitle('');
    setShowGoalModal(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in pb-12">
      {/* Navigation Breadcrumb Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('dashboard')}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold border border-slate-200 shadow-2xs flex items-center gap-1.5 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
            <span>{t.dashboard || 'Back to Student Hub'}</span>
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500 font-medium">{t.personalLearning || 'Personal Learning Space'}</span>
        </div>

        <button
          onClick={logout}
          className="px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-slate-600 hover:text-emerald-800 font-semibold border border-slate-200 transition flex items-center gap-1.5 shadow-2xs"
          title="Directly return to Landing Homepage"
        >
          <Home className="w-3.5 h-3.5 text-emerald-600" />
          <span>{t.backToHomepage || 'Homepage'}</span>
        </button>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold mb-2 border border-teal-500/30">
            <Compass className="w-3.5 h-3.5" />
            <span>{t.personalLearning || 'Independent Exploration'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            🚀 {t.personalLearning || 'My Personal Learning Space'}
          </h1>
          <p className="text-xs sm:text-sm text-teal-100/90 mt-1">
            "{t.personalLearningDesc || 'Learn what you want, at your own pace, based on your interests and curiosities.'}"
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowGoalModal(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Create Learning Goal</span>
          </button>

          <button
            onClick={onOpenAITutor}
            className="px-4 py-2 bg-teal-700 hover:bg-teal-600 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5 transition"
          >
            <Bot className="w-4 h-4" />
            <span>{t.askAiTutor || 'Ask AI Tutor'}</span>
          </button>
        </div>
      </div>

      {/* Student Personal Goals Section */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-600" />
            <span>My Active Learning Targets & Deadlines</span>
          </h3>
          <span className="text-xs text-slate-400">{goals.length} Goals Tracked</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {goals.map(g => (
            <div
              key={g.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                    {g.subject}
                  </span>
                  <button
                    onClick={() => deleteGoal(g.id)}
                    className="text-slate-400 hover:text-rose-600 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">{g.title}</h4>
                <p className="text-slate-500 text-[11px] mb-3">
                  Target: <strong>{g.targetScore}%</strong> • {g.deadlineDays} days remaining
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
                  <span>Current Mastery</span>
                  <span>{g.progressPercentage}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-teal-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${g.progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Discovery Filters: Category & Difficulty */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
            Interest:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-semibold rounded-xl transition ${
                selectedCategory === cat
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
            Level:
          </span>
          {['All', 'Beginner', 'Intermediate'].map(diff => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-2.5 py-0.5 text-xs font-medium rounded-lg transition ${
                selectedDifficulty === diff
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Recommended Curiosity Tracks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTopics.map(topic => (
          <div
            key={topic.id}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                  {topic.category} • {topic.difficulty}
                </span>
                <span className="text-xs text-slate-400">{topic.estimatedMinutes} mins</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition">
                {topic.title}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{topic.summary}</p>

              {/* Sub-lessons overview */}
              <div className="mt-4 space-y-1.5">
                {topic.lessons.map((les, idx) => (
                  <div
                    key={les.id}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                  >
                    <span className="font-medium text-slate-800 truncate">
                      {idx + 1}. {les.title}
                    </span>
                    <span className="text-slate-400 text-[10px] shrink-0 ml-2">{les.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setActiveTopicModal(topic)}
              className="mt-6 w-full py-2.5 bg-teal-700 hover:bg-teal-600 text-white rounded-xl text-xs font-bold shadow transition flex items-center justify-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Start Independent Module</span>
            </button>
          </div>
        ))}
      </div>

      {/* Active Topic Lesson Modal */}
      {activeTopicModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 flex flex-col max-h-[85vh]">
            <div className="px-6 py-4 bg-teal-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-teal-800 text-teal-200">
                  {activeTopicModal.category} Track
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{activeTopicModal.title}</h3>
              </div>
              <button
                onClick={() => setActiveTopicModal(null)}
                className="p-1.5 rounded-xl text-teal-200 hover:text-white hover:bg-teal-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">{activeTopicModal.summary}</p>

              <div className="space-y-4 pt-2">
                {activeTopicModal.lessons.map((les, idx) => (
                  <div
                    key={les.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 text-sm">
                        Lesson {idx + 1}: {les.title}
                      </h4>
                      <span className="text-[11px] text-teal-700 font-semibold">{les.duration}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed bg-white p-3 rounded-xl border border-slate-100 font-sans">
                      {les.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setActiveTopicModal(null)}
                className="px-6 py-2 bg-teal-700 hover:bg-teal-600 text-white rounded-xl text-xs font-bold transition shadow"
              >
                Mark Module Complete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Goal Creator Modal */}
      {showGoalModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-emerald-600" />
                <span>Create Personal Learning Goal</span>
              </h3>
              <button
                onClick={() => setShowGoalModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateGoal} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Goal Title:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Solar System & Orbital Mechanics"
                  value={goalTitle}
                  onChange={e => setGoalTitle(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Subject Area:
                </label>
                <select
                  value={goalSubject}
                  onChange={e => setGoalSubject(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900 bg-white"
                >
                  <option value="Science">Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Space Science">Space Science</option>
                  <option value="Agriculture STEM">Applied Agriculture</option>
                  <option value="Robotics">Robotics & Electronics</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Target Score (%):
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="100"
                    value={goalTarget}
                    onChange={e => setGoalTarget(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border border-slate-300 outline-none text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Deadline (Days):
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="90"
                    value={goalDays}
                    onChange={e => setGoalDays(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border border-slate-300 outline-none text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowGoalModal(false)}
                  className="px-4 py-2 text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-teal-700 hover:bg-teal-600 text-white rounded-xl font-bold shadow"
                >
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
