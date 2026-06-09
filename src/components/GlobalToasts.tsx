import React from 'react';
import { useJobs } from '../context/JobContext';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, CheckCircle, X } from 'lucide-react';

export default function GlobalToasts() {
  const { toasts, removeToast } = useJobs();

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border w-80 backdrop-blur-md ${
              toast.type === 'success' 
                ? 'bg-emerald-50/90 border-emerald-200 text-emerald-900 dark:bg-emerald-900/90 dark:border-emerald-700 dark:text-emerald-50'
                : 'bg-blue-50/90 border-blue-200 text-blue-900 dark:bg-blue-900/90 dark:border-blue-700 dark:text-blue-50'
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {toast.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              )}
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold leading-tight">{toast.title}</h4>
              <p className="text-xs mt-1 opacity-90">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
