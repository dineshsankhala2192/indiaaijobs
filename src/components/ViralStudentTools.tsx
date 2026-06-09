import React, { useState } from 'react';
import { Calculator, Image as ImageIcon, MessageCircle, Trophy, Sparkles, Send, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ViralStudentTools() {
  const [activeTab, setActiveTab] = useState<'age' | 'image' | 'quiz'>('age');
  
  // Age Calculator State
  const [dob, setDob] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [ageResult, setAgeResult] = useState('');

  const calculateAge = () => {
    if (!dob || !targetDate) return;
    const d1 = new Date(dob);
    const d2 = new Date(targetDate);
    
    let years = d2.getFullYear() - d1.getFullYear();
    let months = d2.getMonth() - d1.getMonth();
    let days = d2.getDate() - d1.getDate();

    if (days < 0) {
      months -= 1;
      days += new Date(d2.getFullYear(), d2.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    
    if (years < 0) {
      setAgeResult('Target date must be after Date of Birth');
      return;
    }
    
    setAgeResult(`${years} Years, ${months} Months, ${days} Days`);
  };

  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-orange-500" />
        <h2 className="text-xl font-bold text-gray-900">Student Utility Tools <span className="text-sm font-medium text-gray-500 font-normal ml-2">(High Traffic Generators)</span></h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Tool 1: Interactive Tool Box (Age / Photo) */}
        <div className="col-span-1 lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="flex border-b border-gray-100 bg-gray-50/50">
            <button 
              onClick={() => setActiveTab('age')}
              className={`flex-1 py-3.5 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'age' ? 'bg-white text-indigo-700 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <Calculator className="w-4 h-4" /> Sarkari Age Calculator
            </button>
            <button 
              onClick={() => setActiveTab('image')}
              className={`flex-1 py-3.5 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'image' ? 'bg-white text-indigo-700 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <ImageIcon className="w-4 h-4" /> Photo & Sign Resizer
            </button>
          </div>

          <div className="p-6 flex-1 bg-white">
            <AnimatePresence mode="wait">
              {activeTab === 'age' ? (
                <motion.div 
                  key="age"
                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                  className="space-y-4"
                >
                  <p className="text-sm text-gray-500 mb-4">Calculate exact age for application forms. This is the #1 most searched tool by candidates filling Govt forms.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Date of Birth</label>
                      <input type="date" value={dob} onChange={e => setDob(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-indigo-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Age as on (Notification Date)</label>
                      <input type="date" value={targetDate} onChange={e => setTargetDate(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-indigo-500" />
                    </div>
                  </div>
                  <button onClick={calculateAge} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl transition-colors">
                    Calculate Age
                  </button>
                  {ageResult && (
                    <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="mt-4 p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-center">
                      <span className="block text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">Exact Age</span>
                      <span className="text-xl font-black text-indigo-700">{ageResult}</span>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  key="image"
                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                  className="space-y-4 text-center py-2"
                >
                  <div className="w-16 h-16 bg-slate-50 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <ImageIcon className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="font-bold text-gray-900">Upload Photo to Compress (20KB - 50KB)</h3>
                  <p className="text-sm text-gray-500 max-w-sm mx-auto">Instantly resize your passport photo and signature to exact dimensions required for SSC, UPSC, and Railway forms.</p>
                  <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-sm transition-all text-sm inline-flex items-center gap-2">
                    Select Image <Share2 className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Tool 2: Viral Triggers (WhatsApp / Daily Quiz) */}
        <div className="col-span-1 space-y-4">
          
          {/* WhatsApp / Telegram CTA */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-5 text-white shadow-sm relative overflow-hidden group cursor-pointer hover:shadow-md transition-all">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
            <MessageCircle className="w-8 h-8 text-white/90 mb-3" />
            <h3 className="font-bold text-lg leading-tight mb-1">Get Free Alerts on WhatsApp</h3>
            <p className="text-emerald-100 text-sm mb-4">Join 2M+ students getting fastest Sarkari Job updates directly.</p>
            <button className="w-full bg-white text-emerald-700 font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors">
              <Send className="w-4 h-4" /> Join Channel Now
            </button>
          </div>

          {/* Daily Quiz App Block */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:border-indigo-200 transition-colors cursor-pointer group">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-orange-100 p-2 rounded-xl text-orange-600">
                <Trophy className="w-5 h-5" />
              </div>
              <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">Live Now</span>
            </div>
            <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">Daily GK & Current Affairs</h3>
            <p className="text-xs text-gray-500 mb-3 mt-1">Take the 5-min daily mock test. Compete with 50,000+ students today.</p>
            <div className="flex -space-x-2 mb-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-500 overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="user" />
                </div>
              ))}
              <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[9px] font-bold text-gray-500">
                +4k
              </div>
            </div>
            <button className="w-full py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white font-bold rounded-xl text-xs transition-colors">
              Start Today's Quiz
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
