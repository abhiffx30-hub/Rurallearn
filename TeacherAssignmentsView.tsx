import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileCheck,
  Plus,
  Calendar,
  Clock,
  CheckCircle2,
  Users,
  X,
  Send,
  Sparkles,
  HelpCircle,
  Home,
  ArrowLeft
} from 'lucide-react';
import { Assignment } from '../../types';

export const TeacherAssignmentsView: React.FC<{
  onOpenGrading: () => void;
}> = ({ onOpenGrading }) => {
  const { assignments, createAssignment, submissions, teacherProfile, setActiveView, logout } = useApp();

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Science');
  const [classSection, setClassSection] = useState('8A');
  const [chapter, setChapter] = useState('Chapter 5 — Human Body');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [dueDate, setDueDate] = useState('Tomorrow, 5:00 PM');
  const [maxMarks, setMaxMarks] = useState(10);
  const [attachmentName, setAttachmentName] = useState('chapter_worksheet_nabha.pdf');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createAssignment({
      title,
      subject,
      classSection,
      chapter,
      description,
      instructions: instructions || 'Read Chapter notes, write answers clearly, and upload your worksheet response.',
      dueDate,
      maxMarks: Number(maxMarks) || 10,
      attachmentName: attachmentName.trim() || undefined
    });

    setTitle('');
    setDescription('');
    setInstructions('');
    setShowModal(false);
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
          <span className="text-slate-500 font-medium">Curriculum Assignments</span>
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
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
              Assignments & Assessments
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Curriculum Assignments 📝
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Create homework, set deadlines, provide structured instructions, and collect student solutions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenGrading}
            className="px-4 py-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs sm:text-sm border border-amber-200 transition"
          >
            Review Submissions ({submissions.filter(s => s.status === 'Submitted').length} Pending)
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-sm transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Assignment</span>
          </button>
        </div>
      </div>

      {/* Assignment List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assignments.map(asg => {
          const asgSubmissions = submissions.filter(s => s.assignmentId === asg.id);
          const gradedCount = asgSubmissions.filter(s => s.status === 'Graded').length;

          return (
            <div
              key={asg.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                    {asg.subject} • Class {asg.classSection}
                  </span>
                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    Max Marks: {asg.maxMarks}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 leading-snug">{asg.title}</h3>
                <p className="text-xs font-semibold text-blue-700 mt-1">{asg.chapter}</p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{asg.description}</p>

                <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                  <p className="font-bold text-slate-800 mb-1">Student Instructions:</p>
                  <p className="text-slate-600">{asg.instructions}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Due: <strong>{asg.dueDate}</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-600">
                    {asgSubmissions.length} Turned In ({gradedCount} Graded)
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-100 text-blue-800">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">Create New Assignment</h3>
                  <p className="text-xs text-slate-500">Post homework directly to student accounts</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subject</label>
                  <select
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-900"
                  >
                    <option value="Science">Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="English">English</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Social Studies">Social Studies</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Class</label>
                  <select
                    value={classSection}
                    onChange={e => setClassSection(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-900"
                  >
                    <option value="8A">Class 8A (Nabha Pilot)</option>
                    <option value="8B">Class 8B</option>
                    <option value="9A">Class 9A</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assignment Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Draw & Label Heart Chambers and Blood Circulation Path"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Chapter</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chapter 5 — Human Body"
                    value={chapter}
                    onChange={e => setChapter(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Max Marks</label>
                  <input
                    type="number"
                    value={maxMarks}
                    onChange={e => setMaxMarks(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Due Date</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tomorrow, 5:00 PM"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Attachment Worksheet (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. worksheet_heart_8a.pdf"
                    value={attachmentName}
                    onChange={e => setAttachmentName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Summary of what the homework covers..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Detailed Instructions for Students</label>
                <textarea
                  rows={3}
                  placeholder="1. Write answers in notebook&#10;2. Clearly label Atria and Ventricles&#10;3. Explain double circulation in 3 bullet points"
                  value={instructions}
                  onChange={e => setInstructions(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-900"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm transition flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Assign to Class 8A</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
