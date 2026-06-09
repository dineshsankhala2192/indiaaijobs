import { RESULTS } from '../data';
import { useJobs } from '../context/JobContext';
import { Bell, Award, Calendar, Flame, ChevronRight, FileText, GraduationCap, BookOpen, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export default function SidebarBlocks() {
  const { notifications, categories, results, admitCards, selectedAcademicFilter, setSelectedAcademicFilter } = useJobs();
  const [timeLeft, setTimeLeft] = useState(86400 * 3); // 3 days in seconds
  const [expandedAcademic, setExpandedAcademic] = useState<string | null>('ug');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const days = Math.floor(timeLeft / (3600 * 24));
  const hours = Math.floor((timeLeft % (3600 * 24)) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  // Extract qualification and subject categories from context
  const academicCategories = [
    {
      id: 'general',
      title: 'General Qualifications',
      items: categories.find(c => c.id === 'qualification')?.items || []
    },
    {
      id: 'ug',
      title: 'UG Level Degrees',
      items: categories.find(c => c.id === 'subject')?.items.filter(i => i.name.includes('B.') || i.name.includes('BA') || i.name.includes('LLB') || i.name.includes('MBBS')) || []
    },
    {
      id: 'pg',
      title: 'PG Level Degrees',
      items: categories.find(c => c.id === 'subject')?.items.filter(i => i.name.includes('M.')) || []
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Exam Countdown Widget */}
      <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <Calendar className="w-24 h-24" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 bg-white/20 rounded-md text-xs font-bold uppercase tracking-wider backdrop-blur-sm">Upcoming</span>
          </div>
          <h3 className="font-bold text-lg mb-4 text-white shadow-sm">UPSC Prelims 2026</h3>
          <div className="flex gap-2 text-center">
            {[ 
              { label: 'Days', val: days },
              { label: 'Hrs', val: hours },
              { label: 'Min', val: minutes },
              { label: 'Sec', val: seconds }
            ].map((unit) => (
              <div key={unit.label} className="flex-1 bg-white/20 backdrop-blur-md rounded-xl p-2 border border-white/10">
                <div className="text-xl font-bold font-mono">{unit.val.toString().padStart(2, '0')}</div>
                <div className="text-[10px] uppercase font-semibold text-orange-100">{unit.label}</div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 bg-white text-red-600 font-bold py-2 rounded-xl text-sm shadow hover:bg-orange-50 transition-colors">
            Download Admit Card
          </button>
        </div>
      </div>

      {/* Academic Filter Panel */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-100 p-1.5 rounded-lg text-indigo-700">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-gray-900">Academic Filter</h3>
          </div>
        </div>
        <div className="p-2 space-y-1">
          {academicCategories.map((group) => (
            <div key={group.id} className="border border-gray-100 rounded-xl overflow-hidden mb-2 last:mb-0">
              <button 
                onClick={() => setExpandedAcademic(expandedAcademic === group.id ? null : group.id)}
                className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-indigo-50 transition-colors text-sm font-semibold text-gray-800"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                  {group.title}
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedAcademic === group.id ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {expandedAcademic === group.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-2 bg-white flex flex-wrap gap-2">
                      {group.items.map((item) => {
                        const isSelected = selectedAcademicFilter === item.name;
                        return (
                          <button 
                            key={item.name} 
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedAcademicFilter(isSelected ? null : item.name);
                            }}
                            className={`px-3 py-1.5 border rounded-lg text-xs font-medium transition-all flex items-center gap-1 group active:scale-95 ${
                              isSelected 
                                ? 'bg-indigo-50 border-indigo-400 text-indigo-800 shadow-sm' 
                                : 'bg-white border-gray-200 text-gray-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/50'
                            }`}
                          >
                            {item.name}
                            {item.count && <span className={`text-[10px] ${isSelected ? 'text-indigo-500' : 'text-gray-400 group-hover:text-indigo-400'}`}>({item.count})</span>}
                            {item.isNew && <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse ml-0.5"></span>}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications Panel */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 p-1.5 rounded-lg text-blue-700 relative">
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 text-white rounded-full translate-x-1 -translate-y-1 animate-pulse"></span>
              <Bell className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-gray-900">Latest Live Updates</h3>
          </div>
          <a href="#" className="p-1 text-gray-400 hover:text-indigo-600"><ChevronRight className="w-5 h-5"/></a>
        </div>
        <div className="p-2 space-y-2 h-[450px] overflow-y-auto custom-scrollbar">
          {notifications.map((job) => (
            <div key={job.id} className="p-3 hover:bg-gray-50 rounded-xl transition-colors border border-gray-100 hover:border-gray-200 cursor-pointer group shadow-sm hover:shadow-md">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-semibold text-sm text-gray-900 group-hover:text-indigo-700 transition-colors flex items-center gap-1">
                  {job.title}
                  {job.isHot && <Flame className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />}
                </h4>
              </div>
              <p className="text-xs text-gray-500 mb-2 truncate">{job.organization}</p>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {job.tags.map(t => (
                  <span key={t} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-sm text-[10px] font-medium uppercase">{t}</span>
                ))}
                {job.salary && (
                  <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded-sm text-[10px] font-medium uppercase font-mono">{job.salary}</span>
                )}
              </div>
              
              {/* Process Chart Display */}
              {job.processChart && (
                <div className="mt-3 bg-indigo-50/50 rounded-lg p-2.5 border border-indigo-100/50">
                  <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider mb-2 block">Direct How Chart (Summary)</span>
                  <div className="relative">
                     <div className="absolute left-2.5 top-1 bottom-1 w-0.5 bg-indigo-200" style={{ maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" }}></div>
                     <div className="space-y-2">
                       {job.processChart.map((step, sIdx) => (
                         <div key={step.step} className="flex gap-2.5 relative">
                           <div className="w-5 h-5 rounded-full bg-white border-2 border-indigo-300 flex items-center justify-center flex-shrink-0 z-10">
                              <span className="text-[8px] font-black text-indigo-600">{sIdx + 1}</span>
                           </div>
                           <div>
                             <h4 className="text-[11px] font-bold text-gray-800 leading-tight">{step.step}</h4>
                             <p className="text-[10px] text-gray-500 leading-tight mt-0.5">{step.desc}</p>
                           </div>
                         </div>
                       ))}
                     </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          <a href="#" className="block p-3 text-center text-sm font-medium text-indigo-600 hover:underline">
            View All Notifications
          </a>
        </div>
      </div>

       {/* Results Panel */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mt-6">
        <div className="p-4 border-b border-gray-100 flex items-center gap-2">
          <div className="bg-green-100 p-1.5 rounded-lg text-green-700">
            <Award className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-gray-900">Results Declared</h3>
        </div>
        <div className="p-2">
           <ul className="space-y-1">
             {results.map((res) => (
               <li key={res.title}>
                 <a href={res.link} className="flex flex-col gap-1 p-3 hover:bg-gray-50 rounded-lg group transition-colors">
                   <div className="flex items-center gap-3">
                     <div className="bg-gray-100 p-1.5 rounded-md group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                       <FileText className="w-4 h-4 text-gray-500 group-hover:text-indigo-600" />
                     </div>
                     <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 flex-1">{res.title}</span>
                     <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-400" />
                   </div>
                   <div className="pl-10">
                     <span className="text-[10px] font-bold bg-green-50 text-green-700 px-1.5 py-0.5 rounded">{res.qualificationCategory}</span>
                   </div>
                 </a>
               </li>
             ))}
           </ul>
        </div>
      </div>

      {/* Admit Cards Panel */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mt-6">
        <div className="p-4 border-b border-gray-100 flex items-center gap-2">
          <div className="bg-orange-100 p-1.5 rounded-lg text-orange-700">
            <Calendar className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-gray-900">Admit Cards</h3>
        </div>
        <div className="p-2">
           <ul className="space-y-1">
             {admitCards.map((ac) => (
               <li key={ac.title}>
                 <a href={ac.link} className="flex flex-col gap-1 p-3 hover:bg-gray-50 rounded-lg group transition-colors">
                   <div className="flex items-center gap-3">
                     <div className="bg-gray-100 p-1.5 rounded-md group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                       <FileText className="w-4 h-4 text-gray-500 group-hover:text-indigo-600" />
                     </div>
                     <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 flex-1">{ac.title}</span>
                     <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-400" />
                   </div>
                   <div className="pl-10">
                     <span className="text-[10px] font-bold bg-orange-50 text-orange-700 px-1.5 py-0.5 rounded">{ac.qualificationCategory}</span>
                   </div>
                 </a>
               </li>
             ))}
           </ul>
        </div>
      </div>
    </div>
  );
}
