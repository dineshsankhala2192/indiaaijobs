import React from 'react';
import { useJobs } from '../context/JobContext';
import { BrainCircuit, Target, Users, BookOpen, Star } from 'lucide-react';
import { motion } from 'motion/react';

export default function ExamStrategies() {
  const { strategies } = useJobs();

  if (strategies.length === 0) return null;

  return (
    <div className="mt-12 mb-12">
      <div className="flex items-center gap-2 mb-6">
        <BrainCircuit className="w-7 h-7 text-indigo-600" />
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">AI Exam Strategies <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full ml-2">Toppers Analyzed</span></h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {strategies.map((str, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            key={str.id} 
            className="bg-white rounded-2xl border border-indigo-100 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all p-6 group flex flex-col relative overflow-hidden"
          >
            {/* Background pattern */}
            <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-50/50 rounded-bl-full -z-10 group-hover:bg-indigo-100/50 transition-colors"></div>

            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Target className="w-5 h-5" />
                </div>
                <span className="font-bold text-gray-900">{str.examName}</span>
              </div>
              
            </div>

            <h3 className="text-lg font-bold text-indigo-900 mb-3 leading-snug group-hover:text-indigo-600 transition-colors">
              {str.strategyTitle}
            </h3>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-4 flex-1">
              <div className="flex items-center gap-1.5 mb-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Core Strategy</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {str.coreStrategy}
              </p>
            </div>

            <div className="flex flex-col gap-3 mt-auto">
              <div className="flex flex-wrap gap-1.5">
                {str.tags.map(t => (
                  <span key={t} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase rounded border border-indigo-100">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                <Users className="w-4 h-4 text-slate-400" />
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Based on: <span className="text-slate-800">{str.basedOn}</span></span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
