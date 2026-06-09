import React, { useState } from 'react';
import { Route, X, ChevronRight, CheckCircle2, CircleDashed } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ROADMAPS = [
  {
    id: 'upsc_ias',
    title: 'IAS (UPSC CSE)',
    duration: '1.5 - 2 Years',
    phases: [
      { name: 'Phase 1: Foundation (M1-M4)', desc: 'NCERTs (Class 6-12), The Hindu newspaper reading habit, Optional subject selection.' },
      { name: 'Phase 2: Core Prep (M5-M10)', desc: 'Standard Books (Polity by Laxmikanth, Spectrum), Notes making, weekly answer writing practice.' },
      { name: 'Phase 3: Prelims Mode (M11-M12)', desc: 'Exclusive Prelims focus, 50+ Mock tests, CSAT practice, Current Affairs revision.' },
      { name: 'Phase 4: Mains Mode (M13-M15)', desc: 'Daily answer writing, Optional subject revision, GS Paper IV (Ethics) case studies, Essay practice.' },
      { name: 'Phase 5: Interview Prep', desc: 'Mock interviews, DAF (Detailed Application Form) preparation, communication skills enhancement.' }
    ]
  },
  {
    id: 'ssc_cgl',
    title: 'SSC CGL',
    duration: '8 - 10 Months',
    phases: [
      { name: 'Phase 1: Syllabus Coverage (M1-M3)', desc: 'Maths formulas & basic concepts, Grammar rules, basic Reasoning topics.' },
      { name: 'Phase 2: Speed & Tricky Questions (M4-M6)', desc: 'Short-tricks for Maths, Vocabulary building (Blackbook), Advanced Reasoning.' },
      { name: 'Phase 3: Sectional Mocks (M7-M8)', desc: 'Daily sectional tests for time management, error analysis.' },
      { name: 'Phase 4: Full Length Mocks (M9-M10)', desc: 'Tier 1 & Tier 2 integrated mocks, revision of wrong questions.' }
    ]
  },
  {
    id: 'sbi_po',
    title: 'Banking (SBI PO / IBPS PO)',
    duration: '6 - 8 Months',
    phases: [
      { name: 'Phase 1: Basics (M1-M2)', desc: 'Vedic Maths, Percentage to Fraction, Reading Comprehension habits.' },
      { name: 'Phase 2: Topic Mastery (M3-M4)', desc: 'Puzzles, Seating Arrangements, Data Interpretation (DI) mastery.' },
      { name: 'Phase 3: Speed Building (M5-M6)', desc: 'Daily targets: 5 Puzzles, 5 DIs, 2 Mocks. Focus on accuracy.' },
      { name: 'Phase 4: Mains & GA (M7-M8)', desc: 'High-level DI, Current Affairs (last 6 months), Computer Awareness.' }
    ]
  }
];

export default function CareerRoadmapsTool({ onClose }: { onClose: () => void }) {
  const [selectedId, setSelectedId] = useState(ROADMAPS[0].id);
  const activeRoadmap = ROADMAPS.find(r => r.id === selectedId) || ROADMAPS[0];

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
      >
        <div className="bg-orange-600 px-6 py-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <Route className="w-5 h-5" />
            <h2 className="font-bold">AI Career Roadmaps (Preparation Pathway)</h2>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-md transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-slate-50 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 overflow-y-auto p-3 space-y-1">
             {ROADMAPS.map(roadmap => (
               <button
                 key={roadmap.id}
                 onClick={() => setSelectedId(roadmap.id)}
                 className={`w-full text-left px-4 py-3 rounded-xl transition-all font-bold text-sm flex items-center justify-between ${
                   selectedId === roadmap.id 
                    ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 shadow-sm border border-orange-200 dark:border-orange-800' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                 }`}
               >
                 <span>{roadmap.title}</span>
               </button>
             ))}
          </div>

          {/* Timeline View */}
          <div className="flex-1 overflow-y-auto p-6 lg:p-8 bg-white dark:bg-slate-900">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRoadmap.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-8 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-1">{activeRoadmap.title} Preparation Plan</h3>
                  <p className="text-sm font-bold text-orange-600 dark:text-orange-400">Estimated Duration: {activeRoadmap.duration}</p>
                </div>
                
                <div className="relative">
                  <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-orange-100 dark:bg-orange-900/40"></div>
                  <div className="space-y-6">
                    {activeRoadmap.phases.map((phase, idx) => (
                       <div key={idx} className="flex relative pl-10 group">
                          <div className="absolute left-2.5 top-1 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-orange-500 bg-white dark:bg-slate-900 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                              {/* Circle internal element for effect */}
                              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 group-hover:bg-white transition-colors"></div>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-100 dark:border-slate-800 flex-1 hover:border-orange-200 dark:hover:border-orange-800 hover:shadow-sm transition-all">
                             <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">{phase.name}</h4>
                             <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{phase.desc}</p>
                          </div>
                       </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
