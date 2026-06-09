import React, { useState } from 'react';
import { useJobs } from '../context/JobContext';
import { BellRing, X, Check, MapPin, GraduationCap, Building2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function AIAlertSubscriptionTool({ onClose }: { onClose: () => void }) {
  const { alertPreferences, setAlertPreferences, isAutoSyncEnabled, toggleAutoSync } = useJobs();
  
  const [state, setState] = useState(alertPreferences?.state || 'All');
  const [degree, setDegree] = useState(alertPreferences?.degree || 'All');
  const [dept, setDept] = useState(alertPreferences?.dept || '');
  const [saved, setSaved] = useState(false);

  const states = ['All', 'Delhi', 'Uttar Pradesh', 'Maharashtra', 'Rajasthan', 'Bihar', 'Haryana'];
  const degrees = ['All', '10th', '12th', 'UG', 'PG', 'Diploma'];

  const handleSave = () => {
    setAlertPreferences({ state, degree, dept });
    setSaved(true);
    if (!isAutoSyncEnabled) {
       toggleAutoSync(); // Enable auto sync so they get mock notifications
    }
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        <div className="bg-blue-600 px-6 py-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <BellRing className="w-5 h-5" />
            <h2 className="font-bold">AI Smart Alerts Setup</h2>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-md transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 text-slate-800 dark:text-slate-200">
          <p className="text-sm mb-6 text-slate-600 dark:text-slate-400">
            Set your preferences below to receive instant automated push notifications whenever matching jobs are synced by our background AI worker.
          </p>

          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                <MapPin className="w-4 h-4 text-blue-500" /> State preference
              </label>
              <select 
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 focus:ring-1 focus:ring-blue-500"
              >
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                <GraduationCap className="w-4 h-4 text-emerald-500" /> Qualification Filter
              </label>
              <select 
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 focus:ring-1 focus:ring-blue-500"
              >
                {degrees.map(d => <option key={d} value={d}>{d === 'All' ? 'Any Qualification' : d}</option>)}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                <Building2 className="w-4 h-4 text-purple-500" /> Department / Keyword (Optional)
              </label>
              <input 
                type="text"
                placeholder="e.g. Railway, SSC, Bank"
                value={dept}
                onChange={(e) => setDept(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 focus:ring-1 focus:ring-blue-500 placeholder-slate-400"
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handleSave}
              disabled={saved}
              className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                saved ? 'bg-emerald-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
              }`}
            >
              {saved ? (
                <>
                  <Check className="w-5 h-5" /> Preferences Saved & Sync Active
                </>
              ) : (
                <>
                  <BellRing className="w-5 h-5" /> Enable Smart Push Alerts
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
