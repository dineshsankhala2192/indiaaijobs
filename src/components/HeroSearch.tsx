import { Search, Mic, Briefcase, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export default function HeroSearch() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-blue-800 to-indigo-900 text-white p-8 md:p-12 mb-8 shadow-xl">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-saffron-500 opacity-10 blur-3xl pointer-events-none"></div>
      
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium text-blue-100"
        >
          <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
          AI Powered Sarkari Job Updates
        </motion.div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          India's Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-yellow-300">Government</span> Jobs Portal
        </h1>
        
        <p className="text-lg text-blue-100/80 max-w-2xl mx-auto">
          One Platform for All Government Jobs. Find your dream role with our smart recommendation engine and personalized alerts.
        </p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="relative max-w-2xl mx-auto mt-8 flex items-center bg-white rounded-2xl p-2 shadow-2xl"
        >
          <Search className="w-6 h-6 text-gray-400 ml-4" />
          <input 
            type="text" 
            placeholder="Search by state, department (e.g. RRB NTPC, UP Police)..." 
            className="flex-1 px-4 py-3 text-gray-900 bg-transparent border-none focus:outline-none focus:ring-0 text-base md:text-lg"
          />
          <button className="p-3 text-gray-400 hover:text-indigo-600 transition-colors border-r border-gray-200">
            <Mic className="w-5 h-5" />
          </button>
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl ml-2 transition-all shadow-md hover:shadow-lg flex items-center gap-2">
            Smart Search <Briefcase className="w-4 h-4 hidden sm:block" />
          </button>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-3 pt-6 text-sm text-blue-200">
          <span className="flex items-center gap-1 font-medium"><TrendingUp className="w-4 h-4" /> Trending:</span>
          {['UPSC Prelims', 'RRB NTPC', 'SSC CGL', 'SBI PO'].map((tag) => (
            <a key={tag} href="#" className="px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 transition-colors">
              {tag}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
