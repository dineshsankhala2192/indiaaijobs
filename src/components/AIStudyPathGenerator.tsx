import React, { useState } from 'react';
import { BookOpen, X, Sparkles, Loader2, Calendar, Target, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WeekPlan {
  id: number;
  title: string;
  focus: string;
  tasks: string[];
}

export default function AIStudyPathGenerator({ onClose }: { onClose: () => void }) {
  const [examName, setExamName] = useState('');
  const [duration, setDuration] = useState('30');
  const [step, setStep] = useState<'input' | 'generating' | 'result'>('input');
  const [path, setPath] = useState<WeekPlan[]>([]);

  const handleGenerate = () => {
    if (!examName.trim()) return;
    setStep('generating');

    // Simulate AI generation delay
    setTimeout(() => {
      const generatedPath = generateMockPath(examName, parseInt(duration));
      setPath(generatedPath);
      setStep('result');
    }, 2500);
  };

  const generateMockPath = (exam: string, days: number) => {
    const isUPSC = exam.toLowerCase().includes('upsc') || exam.toLowerCase().includes('ias');
    const isSSC = exam.toLowerCase().includes('ssc') || exam.toLowerCase().includes('cgl');
    
    let subjects = ['General Awareness', 'Quantitative Aptitude', 'Reasoning', 'English'];
    if (isUPSC) subjects = ['History & Art', 'Geography', 'Polity', 'Economics & Environment', 'Current Affairs', 'CSAT'];
    if (isSSC) subjects = ['Advanced Maths', 'Arithmetic', 'English Grammar', 'General Intelligence', 'Static GK'];

    const weeks = Math.ceil(days / 7);
    const plan = [];

    for (let i = 1; i <= weeks; i++) {
        plan.push({
            id: i,
            title: `Week ${i}: ${i <= weeks / 2 ? 'Core Concepts' : 'Advanced & Practice'}`,
            focus: subjects[(i - 1) % subjects.length],
            tasks: [
                `Study basic concepts of ${subjects[(i - 1) % subjects.length]}`,
                `Solve previous 5 year question papers`,
                `Take 2 sectional mock tests`
            ]
        });
    }

    if (days >= 30) {
       plan.push({
          id: weeks + 1,
          title: 'Final Revision Week',
          focus: 'Full Length Mocks & Weak Areas',
          tasks: [
             'Attempt full length mock tests daily',
             'Revise short notes and formulas',
             'Focus on time management and accuracy'
          ]
       });
    }

    return plan;
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
      >
        <div className="bg-indigo-600 px-6 py-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            <h2 className="font-bold">AI Study Path Generator</h2>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-md transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1 text-slate-800 dark:text-slate-200">
          <AnimatePresence mode="wait">
            
            {step === 'input' && (
              <motion.div 
                key="input"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="max-w-xl mx-auto py-8"
              >
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/50 mb-4">
                    <Sparkles className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Create Your Custom Study Plan</h3>
                  <p className="text-slate-600 dark:text-slate-400">Enter your target exam and timeline, and our AI will generate a structured week-by-week study schedule tailored to the syllabus.</p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Target Exam Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. UPSC CSE, SSC CGL, SBI PO"
                      value={examName}
                      onChange={(e) => setExamName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-slate-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Study Duration</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['30', '60', '90'].map(d => (
                        <button
                          key={d}
                          onClick={() => setDuration(d)}
                          className={`py-2 px-4 rounded-xl border text-sm font-bold transition-all ${duration === d ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/50 dark:border-indigo-400 dark:text-indigo-300' : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 text-slate-600 dark:text-slate-400'}`}
                        >
                          {d} Days
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={handleGenerate}
                    disabled={!examName.trim()}
                    className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" /> Generate AI Path
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'generating' && (
              <motion.div 
                key="generating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Analyzing Syllabus...</h3>
                <p className="text-slate-500 dark:text-slate-400">Structuring day-by-day learning milestones for {examName}</p>
              </motion.div>
            )}

            {step === 'result' && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="py-4"
              >
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-1">{examName} Master Plan</h3>
                    <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {duration}-Day Intensive Strategy</p>
                  </div>
                  <button 
                    onClick={() => setStep('input')}
                    className="text-sm font-bold text-slate-500 hover:text-indigo-600 dark:hover:text-amber-400 transition-colors"
                  >
                    Start Over
                  </button>
                </div>

                <div className="space-y-6">
                  {path.map((week, idx) => (
                    <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400 flex items-center justify-center font-black">
                            {idx + 1}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 dark:text-white">{week.title}</h4>
                            <p className="text-sm text-slate-500 flex items-center gap-1"><Target className="w-3.5 h-3.5" /> Focus: {week.focus}</p>
                          </div>
                        </div>
                      </div>

                      <div className="pl-12 hidden sm:block"></div>
                      <div className="space-y-2 sm:pl-12">
                        {week.tasks.map((task: string, tIdx: number) => (
                          <div key={tIdx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                             <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                             <span>{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
