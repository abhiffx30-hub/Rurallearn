import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INDIAN_LANGUAGES } from '../../utils/translations';
import { Language } from '../../types';
import {
  X,
  Search,
  Globe,
  Check,
  MapPin,
  Sparkles,
  Layers
} from 'lucide-react';

export const LanguageModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { language, setLanguage } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  if (!isOpen) return null;

  const regions = ['All', 'North', 'South', 'East', 'West', 'Northeast', 'Pan-India'];

  const filteredLanguages = INDIAN_LANGUAGES.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.popularStates.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nativeScript.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRegion = selectedRegion === 'All' || item.region === selectedRegion;

    return matchesSearch && matchesRegion;
  });

  const handleSelectLanguage = (langCode: Language) => {
    setLanguage(langCode);
    onClose();
  };

  const currentLangMeta = INDIAN_LANGUAGES.find(l => l.code === language) || INDIAN_LANGUAGES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-5 sm:p-6 flex items-start justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-semibold mb-2 border border-emerald-700">
              <Globe className="w-3.5 h-3.5" />
              <span>Multilingual India Support (22 Eighth Schedule Languages + English)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
              Select Your Native Language
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-xl">
              Currently using: <strong className="text-emerald-300 font-bold">{currentLangMeta.name} ({currentLangMeta.englishName})</strong>. Choose your mother tongue for a personalized learning experience.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition z-10 shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Region Filter Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/70 flex flex-col gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by language (e.g. Telugu, தமிழ், Marathi, Punjabi, বাংলা) or State..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs font-medium"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
              <Layers className="w-3 h-3" /> Region:
            </span>
            {regions.map(r => (
              <button
                key={r}
                onClick={() => setSelectedRegion(r)}
                className={`px-3 py-1.5 rounded-xl font-medium transition shrink-0 ${
                  selectedRegion === r
                    ? 'bg-emerald-600 text-white font-bold shadow-2xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Languages Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 max-h-[55vh]">
          {filteredLanguages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 font-medium text-sm">No matching Indian language found for "{searchTerm}".</p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedRegion('All'); }}
                className="mt-3 px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-semibold hover:bg-emerald-100"
              >
                Show all 23 languages
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredLanguages.map(item => {
                const isSelected = language === item.code;
                return (
                  <button
                    key={item.code}
                    onClick={() => handleSelectLanguage(item.code)}
                    className={`p-3.5 rounded-2xl border text-left transition-all relative flex flex-col justify-between group ${
                      isSelected
                        ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/20 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-emerald-700 transition">
                            {item.name}
                          </span>
                          <span className="text-xs text-slate-500 font-semibold">
                            {item.englishName}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">
                          Script: {item.nativeScript}
                        </span>
                      </div>

                      {isSelected ? (
                        <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold group-hover:bg-emerald-100 group-hover:text-emerald-800 transition">
                          {item.region}
                        </span>
                      )}
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-1 text-[10px] text-slate-500 truncate">
                      <MapPin className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                      <span className="truncate">{item.popularStates}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>AI Tutor will answer, explain, and generate quizzes in your chosen language!</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-900 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
