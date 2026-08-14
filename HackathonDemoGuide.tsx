import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ChevronDown, ChevronUp, Check, ArrowRight, Play, RefreshCw } from 'lucide-react';

export const HackathonDemoGuide: React.FC<{
  onOpenAITutor?: () => void;
  onOpenQuiz?: () => void;
  onOpenVideo?: () => void;
}> = ({ onOpenAITutor, onOpenQuiz, onOpenVideo }) => {
  const { role, switchRole, setActiveView, simulatedOffline, toggleSimulatedOffline, resetDemoData } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      num: 1,
      title: 'Step 1: School Management',
      role: 'MANAGEMENT' as const,
      view: 'dashboard',
      actionDesc: 'View Class 8A, 10 Teachers, 540 Students, and School-wide Performance Analytics.',
      btnLabel: 'Switch to Admin (Principal Harpreet)',
      onExecute: () => {
        switchRole('MANAGEMENT');
        setActiveView('dashboard');
        setCurrentStep(1);
      }
    },
    {
      num: 2,
      title: 'Step 2: Teacher Content Delivery',
      role: 'TEACHER' as const,
      view: 'lessons',
      actionDesc: 'Teacher Priya Sharma manages Class 8A, publishes "Human Body" lesson & assigns homework.',
      btnLabel: 'Switch to Teacher (Priya Sharma)',
      onExecute: () => {
        switchRole('TEACHER');
        setActiveView('lessons');
        setCurrentStep(2);
      }
    },
    {
      num: 3,
      title: 'Step 3: Student Learns & Submits',
      role: 'STUDENT' as const,
      view: 'school',
      actionDesc: 'Rahul Sharma opens School Learning, watches video, downloads offline & submits assignment.',
      btnLabel: 'Switch to Student (Rahul Sharma)',
      onExecute: () => {
        switchRole('STUDENT');
        setActiveView('school');
        setCurrentStep(3);
      }
    },
    {
      num: 4,
      title: 'Step 4: Teacher Grades & Feedback',
      role: 'TEACHER' as const,
      view: 'grading',
      actionDesc: 'Teacher opens Rahul’s submission, assigns 8/10 marks and leaves constructive feedback.',
      btnLabel: 'Go to Teacher Grading Workspace',
      onExecute: () => {
        switchRole('TEACHER');
        setActiveView('grading');
        setCurrentStep(4);
      }
    },
    {
      num: 5,
      title: 'Step 5: Student AI Learning Insights',
      role: 'STUDENT' as const,
      view: 'analytics',
      actionDesc: 'Rahul receives grade notification, Science score climbs to 80%, AI generates study insight.',
      btnLabel: 'View Student Performance & AI Insights',
      onExecute: () => {
        switchRole('STUDENT');
        setActiveView('analytics');
        setCurrentStep(5);
      }
    },
    {
      num: 6,
      title: 'Step 6: RuralLearn AI Tutor',
      role: 'STUDENT' as const,
      view: 'aitutor',
      actionDesc: 'Rahul asks AI Tutor to explain the heart in simple rural analogies and takes an AI practice quiz.',
      btnLabel: 'Launch AI Student Tutor Chat',
      onExecute: () => {
        switchRole('STUDENT');
        setActiveView('dashboard');
        if (onOpenAITutor) onOpenAITutor();
        setCurrentStep(6);
      }
    },
    {
      num: 7,
      title: 'Step 7: Personal Learning Space',
      role: 'STUDENT' as const,
      view: 'personal',
      actionDesc: 'Rahul explores independent curiosity tracks (Space & Solar System, Agriculture STEM).',
      btnLabel: 'Explore Personal Learning Hub',
      onExecute: () => {
        switchRole('STUDENT');
        setActiveView('personal');
        setCurrentStep(7);
      }
    },
    {
      num: 8,
      title: 'Step 8: Test Offline Mode (Zero Internet)',
      role: 'STUDENT' as const,
      view: 'downloads',
      actionDesc: 'Simulate power/internet loss in rural Nabha and verify offline lessons and notes still run.',
      btnLabel: 'Test Offline Downloads Engine',
      onExecute: () => {
        switchRole('STUDENT');
        setActiveView('downloads');
        if (!simulatedOffline) toggleSimulatedOffline();
        setCurrentStep(8);
      }
    }
  ];

  return (
    <div className="bg-slate-900 text-slate-100 border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold text-xs md:text-sm text-white tracking-wide flex items-center gap-2">
              🏆 Hackathon Live Demonstration Assistant
              <span className="text-[10px] uppercase tracking-wider bg-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                8-Step Flow
              </span>
            </span>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Click any step below for an instant, scripted end-to-end evaluation flow.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetDemoData}
            title="Reset to fresh demo state"
            className="flex items-center gap-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded border border-slate-700 transition"
          >
            <RefreshCw className="w-3 h-3" />
            <span className="hidden md:inline">Reset Demo Data</span>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-3 py-1.5 rounded-lg transition shadow"
          >
            <span>{isOpen ? 'Hide Demo Guide' : 'Open 8-Step Walkthrough'}</span>
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="max-w-7xl mx-auto px-4 pb-4 pt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-2">
            {steps.map(step => {
              const isCurrent = currentStep === step.num;
              return (
                <div
                  key={step.num}
                  className={`p-3 rounded-xl border transition-all text-left flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-emerald-950/60 border-emerald-500 ring-1 ring-emerald-500'
                      : 'bg-slate-800/80 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <span className="w-5 h-5 rounded-full bg-slate-900 border border-emerald-500/40 flex items-center justify-center text-[10px]">
                          {step.num}
                        </span>
                        {step.title.split(':')[1] || step.title}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900/80 text-slate-300 border border-slate-700 font-mono">
                        {step.role}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                      {step.actionDesc}
                    </p>
                  </div>

                  <button
                    onClick={step.onExecute}
                    className={`w-full text-xs font-medium py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition ${
                      isCurrent
                        ? 'bg-emerald-600 text-white hover:bg-emerald-500 font-semibold'
                        : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                    }`}
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Run Step {step.num}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
