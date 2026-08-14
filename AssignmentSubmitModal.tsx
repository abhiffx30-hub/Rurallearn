import React, { useState } from 'react';
import { Assignment } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, Send, Paperclip, CheckCircle2, FileText, Calendar, Award } from 'lucide-react';

export const AssignmentSubmitModal: React.FC<{
  assignment: Assignment | null;
  onClose: () => void;
}> = ({ assignment, onClose }) => {
  const { submitAssignment, submissions, studentProfile } = useApp();

  const existingSub = assignment
    ? submissions.find(s => s.assignmentId === assignment.id && s.studentId === studentProfile.id)
    : null;

  const [answerText, setAnswerText] = useState(
    existingSub?.answerText ||
      `1. Four chambers: Left Atrium, Right Atrium, Left Ventricle, Right Ventricle.
2. Arteries carry oxygenated blood under pressure; veins carry deoxygenated blood with valves.
3. During activity, muscles demand more oxygen, causing the heart to pump at higher pulse rates.`
  );
  const [attachmentName, setAttachmentName] = useState(existingSub?.attachmentName || 'heart_diagram_solution_rahul.pdf');
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  if (!assignment) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitAssignment(assignment.id, answerText, attachmentName);
    setIsSubmittedSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {assignment.subject} • {assignment.classSection}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white mt-1">{assignment.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Assignment Brief */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 mb-2">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <strong>Due:</strong> {assignment.dueDate}
              </span>
              <span className="flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <Award className="w-3.5 h-3.5" />
                Max Marks: {assignment.maxMarks}
              </span>
            </div>
            <p className="text-xs text-slate-800 font-medium leading-relaxed mb-2">
              {assignment.description}
            </p>
            <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600">
              <strong className="text-slate-800">Instructions from {assignment.teacherName}:</strong>
              <pre className="mt-1 whitespace-pre-wrap font-sans text-xs text-slate-600">{assignment.instructions}</pre>
            </div>
          </div>

          {/* Submission Form */}
          {isSubmittedSuccess ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Assignment Submitted Successfully!</h4>
              <p className="text-xs text-slate-500">
                Your submission has been delivered to teacher {assignment.teacherName} for evaluation.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Answer / Calculations:
                </label>
                <textarea
                  value={answerText}
                  onChange={e => setAnswerText(e.target.value)}
                  rows={6}
                  required
                  placeholder="Type your answer, step-by-step calculations, or summary here..."
                  className="w-full text-xs p-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-900 font-sans"
                />
              </div>

              {/* Attachment Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Attach Solution File / Diagram (Optional):
                </label>
                <div className="flex items-center gap-3 p-3 rounded-xl border border-dashed border-slate-300 bg-slate-50">
                  <Paperclip className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-600 font-mono truncate">{attachmentName}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded ml-auto">
                    Attached
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg flex items-center gap-1.5 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Assignment to Teacher</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
