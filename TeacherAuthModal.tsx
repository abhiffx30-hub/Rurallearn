import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  UserCheck,
  School,
  BookOpen,
  X,
  CheckCircle2,
  Building2,
  Phone,
  Mail,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  GraduationCap,
  KeyRound,
  Layers
} from 'lucide-react';

interface TeacherAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const TeacherAuthModal: React.FC<TeacherAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { managementProfile, registerTeacher } = useApp();

  const [formData, setFormData] = useState({
    name: 'Priya Sharma',
    email: 'priya.sharma@nabha-edu.gov.in',
    phone: '+91 98765-11223',
    schoolName: managementProfile.schoolName || 'Govt Smart Senior Secondary School, Nabha',
    schoolId: managementProfile.schoolId || 'SCH-NABHA-001',
    schoolCode: 'NABHA-PSEB-2026',
    designation: 'TGT Science & Digital ICT Lead',
    subjectsTaught: ['Science', 'Computer Science'],
    assignedClasses: ['8A', '9A'],
    experienceYears: 7
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  if (!isOpen) return null;

  const handlePresetSelect = (preset: 'priya' | 'ravi' | 'jaswinder' | 'new_school') => {
    if (preset === 'priya') {
      setFormData({
        name: 'Priya Sharma',
        email: 'priya.sharma@nabha-edu.gov.in',
        phone: '+91 98765-11223',
        schoolName: managementProfile.schoolName || 'Govt Smart Senior Secondary School, Nabha',
        schoolId: managementProfile.schoolId || 'SCH-NABHA-001',
        schoolCode: 'NABHA-PSEB-2026',
        designation: 'TGT Science & Digital ICT Lead',
        subjectsTaught: ['Science', 'Computer Science'],
        assignedClasses: ['8A', '9A'],
        experienceYears: 7
      });
    } else if (preset === 'ravi') {
      setFormData({
        name: 'Ravi Kumar',
        email: 'ravi.maths@nabha-edu.gov.in',
        phone: '+91 98140-55667',
        schoolName: managementProfile.schoolName || 'Govt Smart Senior Secondary School, Nabha',
        schoolId: managementProfile.schoolId || 'SCH-NABHA-001',
        schoolCode: 'NABHA-PSEB-2026',
        designation: 'PGT Mathematics Senior Faculty',
        subjectsTaught: ['Mathematics'],
        assignedClasses: ['8A', '10A'],
        experienceYears: 11
      });
    } else if (preset === 'jaswinder') {
      setFormData({
        name: 'Jaswinder Singh',
        email: 'jaswinder.punjabi@nabha-edu.gov.in',
        phone: '+91 94178-99001',
        schoolName: managementProfile.schoolName || 'Govt Smart Senior Secondary School, Nabha',
        schoolId: managementProfile.schoolId || 'SCH-NABHA-001',
        schoolCode: 'NABHA-PSEB-2026',
        designation: 'TGT Punjabi & Social Studies Teacher',
        subjectsTaught: ['Punjabi', 'Social Studies'],
        assignedClasses: ['7A', '8A', '9A'],
        experienceYears: 9
      });
    } else {
      setFormData({
        name: 'Harleen Kaur Sandhu',
        email: 'harleen.english@nabha-edu.gov.in',
        phone: '+91 98555-44332',
        schoolName: managementProfile.schoolName || 'Govt Smart Senior Secondary School, Nabha',
        schoolId: managementProfile.schoolId || 'SCH-NABHA-001',
        schoolCode: 'NABHA-PSEB-2026',
        designation: 'English & Communication Faculty',
        subjectsTaught: ['English'],
        assignedClasses: ['6A', '8A'],
        experienceYears: 5
      });
    }
  };

  const handleSubjectToggle = (subj: string) => {
    setFormData(prev => {
      const exists = prev.subjectsTaught.includes(subj);
      return {
        ...prev,
        subjectsTaught: exists
          ? prev.subjectsTaught.filter(s => s !== subj)
          : [...prev.subjectsTaught, subj]
      };
    });
  };

  const handleClassToggle = (cls: string) => {
    setFormData(prev => {
      const exists = prev.assignedClasses.includes(cls);
      return {
        ...prev,
        assignedClasses: exists
          ? prev.assignedClasses.filter(c => c !== cls)
          : [...prev.assignedClasses, cls]
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.schoolName.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      registerTeacher({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        designation: formData.designation,
        schoolName: formData.schoolName.trim(),
        schoolId: formData.schoolId,
        subjectsTaught: formData.subjectsTaught.length > 0 ? formData.subjectsTaught : ['Science'],
        assignedClasses: formData.assignedClasses.length > 0 ? formData.assignedClasses : ['8A'],
        experienceYears: Number(formData.experienceYears) || 5
      });

      setIsSubmitting(false);
      setSuccessMessage(true);

      setTimeout(() => {
        setSuccessMessage(false);
        if (onSuccess) onSuccess();
        onClose();
      }, 1000);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 px-6 py-5 text-white flex items-center justify-between relative overflow-hidden">
          <div className="relative z-10 flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-500/30 border border-blue-400/40 text-blue-200">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-400/20 text-blue-200 border border-blue-400/30">
                  Faculty Access
                </span>
                <span className="text-[11px] text-blue-300">Management Affiliation</span>
              </div>
              <h2 className="text-xl font-bold text-white mt-0.5">
                Teacher Sign-In & School Association
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="relative z-10 p-2 rounded-xl text-blue-200 hover:text-white hover:bg-white/10 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 text-slate-800">
          {/* Presets */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              ⚡ Quick Faculty Sign-in Profiles (1-Click Login):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => handlePresetSelect('priya')}
                className="p-2.5 rounded-xl border border-blue-200 bg-blue-50/60 hover:bg-blue-100 text-left transition text-xs font-semibold text-blue-950 flex flex-col justify-between"
              >
                <span>👩‍🏫 Priya Sharma</span>
                <span className="text-[10px] text-blue-700 font-normal mt-1">Science (Class 8A)</span>
              </button>

              <button
                type="button"
                onClick={() => handlePresetSelect('ravi')}
                className="p-2.5 rounded-xl border border-indigo-200 bg-indigo-50/60 hover:bg-indigo-100 text-left transition text-xs font-semibold text-indigo-950 flex flex-col justify-between"
              >
                <span>👨‍🏫 Ravi Kumar</span>
                <span className="text-[10px] text-indigo-700 font-normal mt-1">Maths (Class 8A & 10A)</span>
              </button>

              <button
                type="button"
                onClick={() => handlePresetSelect('jaswinder')}
                className="p-2.5 rounded-xl border border-amber-200 bg-amber-50/60 hover:bg-amber-100 text-left transition text-xs font-semibold text-amber-950 flex flex-col justify-between"
              >
                <span>👳‍♂️ Jaswinder Singh</span>
                <span className="text-[10px] text-amber-700 font-normal mt-1">Punjabi & SST</span>
              </button>

              <button
                type="button"
                onClick={() => handlePresetSelect('new_school')}
                className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100 text-left transition text-xs font-semibold text-emerald-950 flex flex-col justify-between"
              >
                <span>👩‍🏫 Harleen Kaur</span>
                <span className="text-[10px] text-emerald-700 font-normal mt-1">English Teacher</span>
              </button>
            </div>
          </div>

          {/* Section 1: School & Management Affiliation */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-800 flex items-center gap-1.5">
              <School className="w-4 h-4 text-blue-600" />
              <span>1. School & Management Affiliation (Institution Link)</span>
            </h3>

            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-blue-950">Active Management Institution:</span>
                <span className="text-[11px] font-mono px-2 py-0.5 bg-blue-200/80 text-blue-900 rounded-md font-bold">
                  Code: {formData.schoolCode}
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Affiliated School Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.schoolName}
                  onChange={e => setFormData({ ...formData, schoolName: e.target.value })}
                  placeholder="e.g. Govt Smart Senior Secondary School, Nabha"
                  className="w-full px-3.5 py-2 text-sm bg-white border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>

              <p className="text-[11px] text-blue-800">
                ℹ️ Teachers connect to their management using the verified School Code or Institution ID to automatically receive class rosters, syllabus, and administrative announcements.
              </p>
            </div>
          </div>

          {/* Section 2: Teacher Personal Details */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-800 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-blue-600" />
              <span>2. Teacher Profile & Credentials</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Teacher Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Designation / Role
                </label>
                <input
                  type="text"
                  value={formData.designation}
                  onChange={e => setFormData({ ...formData, designation: e.target.value })}
                  placeholder="e.g. TGT Science Teacher"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Official Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="teacher@school.edu.in"
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contact Phone / WhatsApp
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765-43210"
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Teaching Subjects & Class Assignments */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-800 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>3. Assigned Subjects & Class Sections</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Subjects Taught (Select all that apply):
              </label>
              <div className="flex flex-wrap gap-2">
                {['Science', 'Mathematics', 'English', 'Punjabi', 'Social Studies', 'Computer Science', 'Physical Education'].map(subj => {
                  const active = formData.subjectsTaught.includes(subj);
                  return (
                    <button
                      key={subj}
                      type="button"
                      onClick={() => handleSubjectToggle(subj)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                        active
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {subj}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Assigned Class Sections:
              </label>
              <div className="flex flex-wrap gap-2">
                {['6A', '6B', '7A', '7B', '8A', '8B', '9A', '9B', '10A', '10B'].map(cls => {
                  const active = formData.assignedClasses.includes(cls);
                  return (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => handleClassToggle(cls)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                        active
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Class {cls}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Submission Feedback */}
          {successMessage && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-3 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold text-sm">Authenticated Successfully!</p>
                <p className="text-xs text-emerald-700">Connecting {formData.name} to {formData.schoolName} management portal...</p>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 hover:from-blue-600 hover:to-indigo-600 text-white text-sm font-bold shadow-md hover:shadow-lg transition flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Verifying Affiliation...</span>
              ) : (
                <>
                  <span>Sign In as Faculty</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
