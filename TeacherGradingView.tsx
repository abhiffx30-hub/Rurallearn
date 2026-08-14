import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Award,
  CheckCircle2,
  Clock,
  User,
  FileText,
  Send,
  Sparkles,
  ArrowRight,
  Filter,
  Check,
  Home,
  ArrowLeft
} from 'lucide-react';
import { Submission } from '../../types';

export const TeacherGradingView: React.FC = () => {
  const { submissions, assignments, gradeSubmission, teacherProfile, setActiveView, logout } = useApp();

  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string>(
    submissions.length > 0 ? submissions[0].id : ''
  );
  const [marksInput, setMarksInput] = useState<number>(8);
  const [feedbackInput, setFeedbackInput] = useState<string>(
    'Very well explained! Good description of atria and ventricles. Next time make sure to also mention pulmonary veins.'
  );
  const [successToast, setSuccessToast] = useState(false);

  const activeSubmission = submissions.find(s => s.id === selectedSubmissionId) || submissions[0];
  const activeAssignment = assignments.find(a => a.id === activeSubmission?.assignmentId);

  const handleSelectSubmission = (sub: Submission) => {
    setSelectedSubmissionId(sub.id);
    setMarksInput(sub.marksObtained !== undefined ? sub.marksObtained : 8);
    setFeedbackInput(
      sub.feedback ||
        'Very well explained! Good description of atria and ventricles. Next time make sure to also mention pulmonary veins.'
    );
  };

  const handleGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSubmission) return;

    gradeSubmission(activeSubmission.id, Number(marksInput), feedbackInput.trim());
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 4000);
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
            <span>Back to Teacher Dashboard</span>
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500 font-medium">Grading & Feedback</span>
        </div>

        <button
          onClick={logout}
          className="px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-slate-600 hover:text-emerald-800 font-semibold border border-slate-200 transition flex items-center gap-1.5 shadow-2xs"
          title="Directly return to Landing Homepage"
        >
          <Home className="w-3.5 h-3.5 text-emerald-600" />
          <span>Back to Homepage</span>
        </button>
      </div>

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
              Evaluation & Formative Assessment
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Teacher Grading Workspace ✍️
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review student answers, assign marks, and provide feedback that triggers instant student performance tracking.
          </p>
        </div>

        {successToast && (
          <div className="px-4 py-2.5 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Grade & feedback saved! Student profile and AI trajectory updated.</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Submissions List */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-sm font-bold text-slate-700 px-1">Submissions Roster ({submissions.length})</h2>

          {submissions.map(sub => {
            const asg = assignments.find(a => a.id === sub.assignmentId);
            const isSelected = sub.id === activeSubmission?.id;

            return (
              <div
                key={sub.id}
                onClick={() => handleSelectSubmission(sub)}
                className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col justify-between gap-2 ${
                  isSelected
                    ? 'bg-amber-50/70 border-amber-400 shadow-xs ring-2 ring-amber-400/20'
                    : 'bg-white hover:bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                      {sub.studentName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm leading-none">{sub.studentName}</h4>
                      <span className="text-[11px] text-slate-500">Class {sub.classSection}</span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      sub.status === 'Graded'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800 animate-pulse'
                    }`}
                  >
                    {sub.status === 'Graded' ? `Graded: ${sub.marksObtained}/${sub.maxMarks}` : 'Needs Review'}
                  </span>
                </div>

                <div className="mt-1">
                  <p className="text-xs font-semibold text-slate-700">{asg?.title || 'Homework'}</p>
                  <p className="text-xs text-slate-500 line-clamp-1 italic mt-0.5">"{sub.answerText}"</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Active Submission Grading Panel */}
        <div className="lg:col-span-7">
          {activeSubmission ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              {/* Submission Meta Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{activeSubmission.studentName}</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-600 font-medium">Class {activeSubmission.classSection}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 mt-1">
                    {activeAssignment?.title || 'Assignment Response'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">{activeAssignment?.chapter}</p>
                </div>

                <div className="text-right sm:text-right">
                  <span className="text-[11px] text-slate-400">Turned in: {activeSubmission.submissionDate}</span>
                  <div className="mt-1">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                      Max: {activeSubmission.maxMarks} Marks
                    </span>
                  </div>
                </div>
              </div>

              {/* Student's Answer Box */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Student's Submitted Answer:</label>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans">
                  {activeSubmission.answerText}
                </div>
                {activeSubmission.attachmentName && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-600">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span>Attached Document: <strong>{activeSubmission.attachmentName}</strong></span>
                  </div>
                )}
              </div>

              {/* Teacher Evaluation Form */}
              <form onSubmit={handleGrade} className="pt-4 border-t border-slate-100 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Marks Awarded (out of {activeSubmission.maxMarks})
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={activeSubmission.maxMarks}
                      required
                      value={marksInput}
                      onChange={e => setMarksInput(Number(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-lg text-slate-900 text-center bg-amber-50/50 focus:bg-white focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <p className="text-xs text-slate-500">
                      Calculated Score: <strong>{Math.round((marksInput / activeSubmission.maxMarks) * 100)}%</strong>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Submitting updates the student's mastery tracker & AI learning recommendations automatically.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Teacher's Feedback & Constructive Remarks:
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={feedbackInput}
                    onChange={e => setFeedbackInput(e.target.value)}
                    placeholder="Enter positive remarks, corrections, and next study steps..."
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Instant notification delivered to student</span>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-sm transition flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Save Grade & Send Feedback</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
              <p className="text-slate-500">No submissions available for review.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
