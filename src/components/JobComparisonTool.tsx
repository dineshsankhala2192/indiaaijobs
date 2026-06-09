import React, { useState } from 'react';
import { useJobs } from '../context/JobContext';
import { Scale, X, Check, Calendar, IndianRupee, Building, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

export default function JobComparisonTool({ onClose }: { onClose: () => void }) {
  const { notifications } = useJobs();
  const [job1Id, setJob1Id] = useState<string>(notifications[0]?.id || '');
  const [job2Id, setJob2Id] = useState<string>(notifications[1]?.id || '');

  const job1 = notifications.find(j => j.id === job1Id);
  const job2 = notifications.find(j => j.id === job2Id);

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
      >
        <div className="bg-indigo-600 px-6 py-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5" />
            <h2 className="font-bold">AI Job Comparison Tool</h2>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-md transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar flex flex-col h-full text-black">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-700 mb-2">Select Job 1</label>
              <select 
                value={job1Id} 
                onChange={(e) => setJob1Id(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-indigo-500 bg-white shadow-sm"
              >
                <option value="">-- Select Job --</option>
                {notifications.map(j => (
                  <option key={'1-'+j.id} value={j.id}>{j.title} ({j.organization})</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center justify-center -mb-6 md:mb-0">
               <div className="bg-gray-100 rounded-full p-2 text-gray-400 border border-gray-200">
                  <span className="text-xs font-bold px-2">VS</span>
               </div>
            </div>

            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-700 mb-2">Select Job 2</label>
              <select 
                value={job2Id} 
                onChange={(e) => setJob2Id(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-indigo-500 bg-white shadow-sm"
              >
                <option value="">-- Select Job --</option>
                {notifications.map(j => (
                  <option key={'2-'+j.id} value={j.id}>{j.title} ({j.organization})</option>
                ))}
              </select>
            </div>
          </div>

          {(job1 && job2) ? (
            <div className="border border-gray-200 rounded-xl overflow-hidden flex-1 flex flex-col bg-white">
              <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200 divide-x divide-gray-200 text-sm font-bold text-gray-700">
                <div className="p-4 text-center">Comparison Feature</div>
                <div className="p-4 text-center text-indigo-700">{job1.title}</div>
                <div className="p-4 text-center text-emerald-700">{job2.title}</div>
              </div>
              
              <div className="divide-y divide-gray-100 flex-1 overflow-y-auto">
                 {/* Organization */}
                 <div className="grid grid-cols-3 divide-x divide-gray-100 text-sm hover:bg-gray-50 transition-colors">
                    <div className="p-4 flex items-center justify-center md:justify-start gap-2 text-gray-600 font-medium">
                       <Building className="w-4 h-4" /> <span className="hidden md:inline">Organization</span>
                    </div>
                    <div className="p-4 text-center">{job1.organization}</div>
                    <div className="p-4 text-center">{job2.organization}</div>
                 </div>

                 {/* Salary */}
                 <div className="grid grid-cols-3 divide-x divide-gray-100 text-sm hover:bg-gray-50 transition-colors">
                    <div className="p-4 flex items-center justify-center md:justify-start gap-2 text-gray-600 font-medium">
                       <IndianRupee className="w-4 h-4" /> <span className="hidden md:inline">Expected Salary</span>
                    </div>
                    <div className="p-4 text-center font-semibold text-gray-900">{job1.salary || 'Varies'}</div>
                    <div className="p-4 text-center font-semibold text-gray-900">{job2.salary || 'Varies'}</div>
                 </div>

                 {/* Deadline */}
                 <div className="grid grid-cols-3 divide-x divide-gray-100 text-sm hover:bg-gray-50 transition-colors">
                    <div className="p-4 flex items-center justify-center md:justify-start gap-2 text-gray-600 font-medium">
                       <Calendar className="w-4 h-4" /> <span className="hidden md:inline">Deadline / Exam</span>
                    </div>
                    <div className="p-4 text-center">{job1.deadline || 'Upcoming'}</div>
                    <div className="p-4 text-center">{job2.deadline || 'Upcoming'}</div>
                 </div>
                 
                 {/* Tags / Eligibility */}
                 <div className="grid grid-cols-3 divide-x divide-gray-100 text-sm hover:bg-gray-50 transition-colors">
                    <div className="p-4 flex items-center justify-center md:justify-start gap-2 text-gray-600 font-medium">
                       <GraduationCap className="w-4 h-4" /> <span className="hidden md:inline">Eligibility & Tags</span>
                    </div>
                    <div className="p-4 flex flex-wrap justify-center gap-1">
                       {job1.tags.map(t => <span key={t} className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] rounded uppercase font-bold">{t}</span>)}
                    </div>
                    <div className="p-4 flex flex-wrap justify-center gap-1">
                       {job2.tags.map(t => <span key={t} className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] rounded uppercase font-bold">{t}</span>)}
                    </div>
                 </div>

                 {/* Process Comparison if available via AI */}
                 <div className="grid grid-cols-3 divide-x divide-gray-100 text-sm hover:bg-gray-50 transition-colors">
                    <div className="p-4 flex items-center justify-center md:justify-start gap-2 text-gray-600 font-medium">
                       <Scale className="w-4 h-4" /> <span className="hidden md:inline">Selection Steps</span>
                    </div>
                    <div className="p-4 space-y-2">
                       {job1.processChart ? job1.processChart.map((s, i) => (
                         <div key={i} className="flex gap-1.5 items-start text-xs text-gray-600">
                           <Check className="w-3 h-3 text-indigo-500 mt-0.5 flex-shrink-0" />
                           <span>{s.step}</span>
                         </div>
                       )) : <span className="text-gray-400 text-xs">Standard Process (Written + Interview)</span>}
                    </div>
                    <div className="p-4 space-y-2">
                       {job2.processChart ? job2.processChart.map((s, i) => (
                         <div key={i} className="flex gap-1.5 items-start text-xs text-gray-600">
                           <Check className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                           <span>{s.step}</span>
                         </div>
                       )) : <span className="text-gray-400 text-xs">Standard Process (Written + Interview)</span>}
                    </div>
                 </div>

              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 border-2 border-dashed border-gray-200 rounded-xl">
               <Scale className="w-12 h-12 mb-3 text-gray-300" />
               <p>Please select two jobs to compare side-by-side.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
