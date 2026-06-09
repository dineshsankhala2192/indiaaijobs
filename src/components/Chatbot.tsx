import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col mb-4"
          >
            {/* Header */}
            <div className="bg-indigo-600 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">AI Career Guide</h3>
                  <div className="flex items-center gap-1 opacity-80 text-xs">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> Online
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Body */}
            <div className="p-4 h-64 overflow-y-auto bg-gray-50 flex flex-col gap-3">
              <div className="bg-white p-3 rounded-lg rounded-tl-none border border-gray-100 shadow-sm max-w-[85%] text-sm text-gray-700">
                Hi! 👋 I'm IndiaAIJobs Assistant. Are you looking for state or central government jobs?
              </div>
              
              <div className="flex flex-col gap-2 max-w-[85%]">
                <button className="bg-indigo-50 border border-indigo-100 text-indigo-700 p-2 rounded-lg text-sm text-left hover:bg-indigo-100 transition-colors">
                  Show railway jobs
                </button>
                <button className="bg-indigo-50 border border-indigo-100 text-indigo-700 p-2 rounded-lg text-sm text-left hover:bg-indigo-100 transition-colors">
                 Help create my resume
                </button>
              </div>
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-3">
              <input 
                type="text" 
                placeholder="Ask anything..." 
                className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-300"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-2.5 shadow-sm transition-colors">
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </button>
    </div>
  );
}
