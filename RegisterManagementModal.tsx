import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  School,
  UserCheck,
  MapPin,
  BookOpen,
  Users,
  Sparkles,
  X,
  CheckCircle2,
  Building2,
  Phone,
  Mail,
  ShieldCheck,
  Award,
  Wifi,
  ChevronRight
} from 'lucide-react';

interface RegisterManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const RegisterManagementModal: React.FC<RegisterManagementModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { registerManagement } = useApp();

  const [formData, setFormData] = useState({
    name: 'Dr. Gurpreet Singh',
    email: 'principal.gurpreet@nabha-edu.gov.in',
    phone: '+91 98721-54321',
    designation: 'Principal',
    schoolName: 'Govt Smart Senior Secondary School, Nabha',
    schoolLocation: 'Nabha Tehsil, Patiala District, Punjab',
    curriculum: 'Punjab School Education Board (PSEB)',
    academicYear: '2026–2027',
    totalStudentsCount: 520,
    totalFacultyCount: 14,
    gradeRange: 'Grades 6th to 12th'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  if (!isOpen) return null;

  const handlePresetSelect = (preset: 'nabha_govt' | 'malwa_academy' | 'rural_trust') => {
    if (preset === 'nabha_govt') {
      setFormData({
        name: 'Dr. Gurpreet Singh',
        email: 'principal.gurpreet@nabha-edu.gov.in',
        phone: '+91 98721-54321',
        designation: 'Principal',
        schoolName: 'Govt Smart Senior Secondary School, Nabha',
        schoolLocation: 'Nabha Tehsil, Patiala District, Punjab',
        curriculum: 'Punjab School Education Board (PSEB)',
        academicYear: '2026–2027',
        totalStudentsCount: 540,
        totalFacultyCount: 16,
        gradeRange: 'Grades 6th to 12th'
      });
    } else if (preset === 'malwa_academy') {
      setFormData({
        name: 'Harvinder Kaur Dhillon',
        email: 'h.dhillon@malwaschool.org',
        phone: '+91 98144-88990',
        designation: 'Headmistress & ICT Lead',
        schoolName: 'Malwa Rural Model Senior Secondary School',
        schoolLocation: 'Bhadson Road, Nabha Cluster, Punjab',
        curriculum: 'CBSE & Punjab Digital Curriculum',
        academicYear: '2026–2027',
        totalStudentsCount: 680,
        totalFacultyCount: 22,
        gradeRange: 'Grades 1st to 10th'
      });
    } else {
      setFormData({
        name: 'Prof. Amrik Singh Sandhu',
        email: 'director@khalsaruraltrust.edu',
        phone: '+91 94172-33445',
        designation: 'Managing Director',
        schoolName: 'Nabha Rural Educational Community Trust',
        schoolLocation: 'Patiala-Nabha Highway, Punjab',
        curriculum: 'PSEB & State Open Schooling',
        academicYear: '2026–2027',
        totalStudentsCount: 920,
        totalFacultyCount: 28,
        gradeRange: 'Grades 6th to 12th'
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.schoolName.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      registerManagement({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        designation: formData.designation,
        schoolName: formData.schoolName.trim(),
        schoolLocation: formData.schoolLocation.trim(),
        curriculum: formData.curriculum,
        academicYear: formData.academicYear,
        totalStudentsCount: Number(formData.totalStudentsCount) || 500,
        totalFacultyCount: Number(formData.totalFacultyCount) || 15,
        gradeRange: formData.gradeRange
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
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 px-6 py-5 text-white flex items-center justify-between relative overflow-hidden">
          <div className="relative z-10 flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-purple-500/30 border border-purple-400/40 text-purple-200">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-400/20 text-purple-200 border border-purple-400/30">
                  New School Onboarding
                </span>
                <span className="text-[11px] text-purple-300">Nabha Digital Pilot</span>
              </div>
              <h2 className="text-xl font-bold text-white mt-0.5">
                Register School Management & Admin
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="relative z-10 p-2 rounded-xl text-purple-200 hover:text-white hover:bg-white/10 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 text-slate-800">
          {/* Quick Presets for Demo / Hackathon Ease */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              ⚡ Quick Template Pre-fills (One-Click Setup):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handlePresetSelect('nabha_govt')}
                className="p-2.5 rounded-xl border border-purple-200 bg-purple-50/60 hover:bg-purple-100/70 text-left transition text-xs font-semibold text-purple-950 flex flex-col justify-between"
              >
                <span>🏛️ Govt Smart School</span>
                <span className="text-[10px] text-purple-700 font-normal mt-1">Nabha Tehsil (540 Students)</span>
              </button>

              <button
                type="button"
                onClick={() => handlePresetSelect('malwa_academy')}
                className="p-2.5 rounded-xl border border-blue-200 bg-blue-50/60 hover:bg-blue-100/70 text-left transition text-xs font-semibold text-blue-950 flex flex-col justify-between"
              >
                <span>🏫 Malwa Rural Academy</span>
                <span className="text-[10px] text-blue-700 font-normal mt-1">Bhadson Cluster (680 Students)</span>
              </button>

              <button
                type="button"
                onClick={() => handlePresetSelect('rural_trust')}
                className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100/70 text-left transition text-xs font-semibold text-emerald-950 flex flex-col justify-between"
              >
                <span>🌾 Educational Trust</span>
                <span className="text-[10px] text-emerald-700 font-normal mt-1">Patiala Rural (920 Students)</span>
              </button>
            </div>
          </div>

          {/* Section 1: Administrator Details */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-800 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-purple-600" />
              <span>1. Administrator / Leadership Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name of Administrator / Principal *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Harpreet Kaur"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white focus:outline-hidden transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Official Designation / Role *
                </label>
                <select
                  value={formData.designation}
                  onChange={e => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white focus:outline-hidden transition"
                >
                  <option value="Principal">Principal / Head of Institution</option>
                  <option value="Vice Principal">Vice Principal</option>
                  <option value="Headmistress">Headmistress / Headmaster</option>
                  <option value="Block Education Officer (BEO)">Block Education Officer (BEO)</option>
                  <option value="Managing Director">Managing Director / Trustee</option>
                  <option value="ICT & Digital Nodal Officer">ICT & Digital Nodal Officer</option>
                </select>
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
                    placeholder="principal@school.edu.in"
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white focus:outline-hidden transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Official Phone / WhatsApp Contact
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765-43210"
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white focus:outline-hidden transition"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: School / Institution Details */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-800 flex items-center gap-1.5">
              <School className="w-4 h-4 text-purple-600" />
              <span>2. School / Organization Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  School / Institution Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.schoolName}
                  onChange={e => setFormData({ ...formData, schoolName: e.target.value })}
                  placeholder="e.g. Government Senior Secondary Smart School, Nabha"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white focus:outline-hidden transition font-medium"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  School Location & District *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.schoolLocation}
                    onChange={e => setFormData({ ...formData, schoolLocation: e.target.value })}
                    placeholder="e.g. Nabha Block, Patiala District, Punjab"
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white focus:outline-hidden transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Curriculum & Affiliation Board *
                </label>
                <select
                  value={formData.curriculum}
                  onChange={e => setFormData({ ...formData, curriculum: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white focus:outline-hidden transition"
                >
                  <option value="Punjab School Education Board (PSEB)">Punjab School Education Board (PSEB)</option>
                  <option value="Central Board of Secondary Education (CBSE)">Central Board of Secondary Education (CBSE)</option>
                  <option value="State Digital Curriculum & SCERT">State Digital Curriculum & SCERT</option>
                  <option value="National Open Schooling (NIOS)">National Open Schooling (NIOS)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Academic Session Year *
                </label>
                <select
                  value={formData.academicYear}
                  onChange={e => setFormData({ ...formData, academicYear: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white focus:outline-hidden transition"
                >
                  <option value="2026–2027">2026–2027 (Current)</option>
                  <option value="2025–2026">2025–2026</option>
                  <option value="2027–2028">2027–2028</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Institutional Scale & Infrastructure */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-800 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-purple-600" />
              <span>3. Student Strength & Faculty Scale</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Total Student Strength
                </label>
                <input
                  type="number"
                  min="20"
                  max="5000"
                  value={formData.totalStudentsCount}
                  onChange={e => setFormData({ ...formData, totalStudentsCount: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white focus:outline-hidden transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Teaching Faculty Count
                </label>
                <input
                  type="number"
                  min="2"
                  max="200"
                  value={formData.totalFacultyCount}
                  onChange={e => setFormData({ ...formData, totalFacultyCount: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white focus:outline-hidden transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Grades Managed
                </label>
                <select
                  value={formData.gradeRange}
                  onChange={e => setFormData({ ...formData, gradeRange: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white focus:outline-hidden transition"
                >
                  <option value="Grades 6th to 10th">Grades 6th to 10th (High School)</option>
                  <option value="Grades 6th to 12th">Grades 6th to 12th (Sr. Secondary)</option>
                  <option value="Grades 1st to 8th">Grades 1st to 8th (Middle School)</option>
                  <option value="Grades 1st to 12th">Grades 1st to 12th (Composite)</option>
                </select>
              </div>
            </div>

            {/* Rural Feature Callout */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800">Automatic Rural Optimization Enabled:</span>
                <p className="mt-0.5 text-slate-500">
                  New school registrations are automatically pre-configured with <strong>Low-Bandwidth Compression</strong>, <strong>Offline Caching Sync</strong>, and <strong>Multi-Language (English / Punjabi / Hindi)</strong> support.
                </p>
              </div>
            </div>
          </div>

          {/* Submission Feedback */}
          {successMessage && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-3 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold text-sm">School Registered Successfully!</p>
                <p className="text-xs text-emerald-700">Opening customized Management Dashboard for {formData.schoolName}...</p>
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
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 hover:from-purple-600 hover:to-indigo-600 text-white text-sm font-bold shadow-md hover:shadow-lg transition flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Registering School...</span>
              ) : (
                <>
                  <span>Register & Launch Management Dashboard</span>
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
