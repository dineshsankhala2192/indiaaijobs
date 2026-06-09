import React from 'react';
import { useJobs } from '../context/JobContext';
import { Star, ArrowRight, Quote, Linkedin } from 'lucide-react';

export default function SuccessStories() {
  const { successStories } = useJobs();

  if (successStories.length === 0) return null;

  const handleShareWhatsApp = (title: string, desc: string) => {
    const text = `Inspiring Career Journey: ${title}\n\n${desc}\n\nVia IndiaAIJobs`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShareLinkedIn = (title: string, desc: string) => {
    const url = window.location.href;
    const shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(desc)}&source=IndiaAIJobs`;
    window.open(shareUrl, '_blank');
  };

  return (
    <div className="mt-12 mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-500 fill-current" />
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Success Stories</h2>
        </div>
        <a href="#" className="hidden sm:inline-flex items-center gap-1 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 transition-colors">
          View all stories <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {successStories.map((story) => (
          <div key={story.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-yellow-100 dark:border-slate-800 shadow-sm p-6 hover:shadow-md hover:border-yellow-300 dark:hover:border-yellow-900 transition-all group relative overflow-hidden flex flex-col">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-50 dark:from-yellow-900/20 to-orange-50/20 dark:to-orange-900/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
            
            <Quote className="w-8 h-8 text-yellow-200 dark:text-yellow-900/50 mb-4" />
            
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="bg-yellow-50 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-900/50 px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider">{story.tag}</span>
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center">Via {story.source}</span>
            </div>
            
            <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-tight mb-2 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">{story.title}</h3>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed mb-6 flex-1">
              {story.description}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button className="text-sm font-bold text-yellow-600 dark:text-yellow-500 group-hover:text-yellow-700 dark:group-hover:text-yellow-400 flex items-center gap-1">
                Read Full Story <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </button>
              
              <div className="flex items-center gap-2">
                 <button 
                   onClick={() => handleShareWhatsApp(story.title, story.description)}
                   className="p-1.5 text-gray-400 hover:text-[#25D366] hover:bg-green-50 dark:hover:bg-green-900/30 rounded-full transition-colors"
                   title="Share on WhatsApp"
                 >
                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                   </svg>
                 </button>
                 <button 
                   onClick={() => handleShareLinkedIn(story.title, story.description)}
                   className="p-1.5 text-gray-400 hover:text-[#0077b5] hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full transition-colors"
                   title="Share on LinkedIn"
                 >
                   <Linkedin className="w-4 h-4" />
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
