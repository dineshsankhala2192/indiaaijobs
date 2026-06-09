import { useJobs } from '../context/JobContext';
import { IconMap } from './icons';
import { ChevronRight, ArrowLeft, Flame, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

export default function DashboardGrid() {
  const { categories, notifications, selectedAcademicFilter, setSelectedAcademicFilter } = useJobs();

  if (selectedAcademicFilter) {
    const filteredJobs = notifications.filter(job => {
      const searchStr = selectedAcademicFilter.toLowerCase();
      return (
        job.tags.some(t => t.toLowerCase().includes(searchStr)) ||
        job.title.toLowerCase().includes(searchStr) ||
        // Basic fallback: if no exact match, just show a few recent jobs representing this category
        job.isHot
      );
    });

    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div>
            <div className="text-sm font-semibold text-gray-500 flex items-center gap-1 mb-1">
              <GraduationCap className="w-4 h-4" /> Academic Search Results
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Jobs for <span className="text-indigo-600 border-b-2 border-indigo-400 pb-0.5 underline-offset-4">{selectedAcademicFilter}</span>
            </h2>
          </div>
          <button 
            onClick={() => setSelectedAcademicFilter(null)}
            className="hidden sm:flex items-center gap-1 text-sm font-bold text-gray-600 hover:text-indigo-600 bg-gray-50 hover:bg-indigo-50 px-4 py-2.5 rounded-xl border border-gray-200 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Clear Filter
          </button>
        </div>
        
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredJobs.map(job => (
              <div key={job.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                {job.isHot && <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-bl-full -z-10 group-hover:scale-110 transition-transform opacity-10"></div>}
                
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-indigo-700 transition-colors">
                    {job.title}
                  </h3>
                  {job.isHot && <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider flex items-center gap-1"><Flame className="w-3 h-3" /> Hot</span>}
                </div>
                
                <p className="text-gray-600 font-medium text-sm mb-3">{job.organization} <span className="mx-2 text-gray-300">•</span> <span className="text-gray-500">{job.location}</span></p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.tags.map(t => (
                    <span key={t} className={`px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wide
                      ${t.toLowerCase().includes(selectedAcademicFilter.toLowerCase()) ? 'bg-indigo-100 text-indigo-800 ring-1 ring-indigo-300' : 'bg-gray-100 text-gray-600'}`}>
                      {t}
                    </span>
                  ))}
                  {job.salary && (
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-mono text-xs font-semibold rounded-md">
                      {job.salary}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-2">
                  <div className="text-sm font-semibold">
                    <span className="text-gray-400">Last Date: </span>
                    <span className="text-rose-600">{job.deadline}</span>
                  </div>
                  <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                    View Details <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-1">No active listings found</h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">We couldn't find any live notifications specifically requiring {selectedAcademicFilter} at the moment. Try checking general categories or turn on AI Alerts.</p>
            <button 
              onClick={() => setSelectedAcademicFilter(null)}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors"
            >
              Back to All Jobs
            </button>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {categories.map((category) => {
        const Icon = IconMap[category.icon] || IconMap.Briefcase;
        return (
          <div key={category.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-gray-900">{category.title}</h3>
              </div>
              <button className="text-indigo-600 text-sm font-medium hover:underline flex items-center">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            
            <div className="p-2">
              <ul className="divide-y divide-gray-100">
                {category.items.slice(0, 6).map((item) => (
                  <li key={item.name}>
                    <a href="#" className="flex flex-col sm:flex-row sm:items-center justify-between p-3 hover:bg-indigo-50 rounded-lg transition-colors group">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-700 font-medium group-hover:text-indigo-700 transition-colors">{item.name}</span>
                        {item.isNew && (
                          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white bg-red-500 rounded-full animate-pulse">New</span>
                        )}
                      </div>
                      {item.count && (
                        <span className="text-xs font-medium text-gray-400 bg-white px-2 py-1 rounded-full border border-gray-200 mt-2 sm:mt-0 self-start sm:self-auto">
                          {item.count} Jobs
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
              {category.items.length > 6 && (
                <div className="p-3 text-center">
                  <a href="#" className="text-sm font-medium text-gray-500 hover:text-indigo-600">
                    + {category.items.length - 6} more {category.title.split(' ')[0]}
                  </a>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
