import React, { useState } from 'react';
import { Share2, Send, MessageCircle, Twitter, Activity, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function SocialSyndicationModule() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [logs, setLogs] = useState([
    { id: 1, platform: 'Telegram', status: 'success', time: '10 mins ago', message: 'Syndicated: SSC CGL 2026 Notification' },
    { id: 2, platform: 'WhatsApp', status: 'success', time: '12 mins ago', message: 'Syndicated: SSC CGL 2026 Notification' },
    { id: 3, platform: 'Twitter', status: 'success', time: '15 mins ago', message: 'Syndicated: SSC CGL 2026 Notification' },
  ]);

  const handleTriggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLogs([
        { id: Date.now() + 1, platform: 'Telegram', status: 'success', time: 'Just now', message: 'Syndicated: High-Performing Alert - UPSC Prelims' },
        { id: Date.now() + 2, platform: 'WhatsApp', status: 'success', time: 'Just now', message: 'Syndicated: High-Performing Alert - UPSC Prelims' },
        { id: Date.now() + 3, platform: 'Twitter', status: 'success', time: 'Just now', message: 'Syndicated: High-Performing Alert - UPSC Prelims' },
        ...logs
      ]);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Social Syndication & Webhooks</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Automatically post viral alerts and major notifications to your social channels.</p>
        </div>
        <button 
          onClick={handleTriggerSync}
          disabled={isSyncing}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {isSyncing ? <Activity className="w-4 h-4 animate-spin" /> : <Share2 className="w-4 h-4" />}
          {isSyncing ? 'Syndicating...' : 'Trigger Manual Sync'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Telegram Config */}
        <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                <Send className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white">Telegram API</h4>
            </div>
            <span className="flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-full">
              <CheckCircle2 className="w-3 h-3 mr-1" /> Active
            </span>
          </div>
          <div className="space-y-3">
             <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1">Bot Token</label>
                <input type="password" value="******************" readOnly className="w-full text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-600 border rounded-md px-3 py-1.5 text-gray-600 dark:text-gray-300" />
             </div>
             <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1">Channel ID</label>
                <input type="text" value="@IndiaAIJobs_Auto" readOnly className="w-full text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-600 border rounded-md px-3 py-1.5 text-gray-600 dark:text-gray-300" />
             </div>
          </div>
        </div>

        {/* WhatsApp Config */}
        <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-lg text-[#25D366]">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white">WhatsApp API</h4>
            </div>
            <span className="flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-full">
              <CheckCircle2 className="w-3 h-3 mr-1" /> Active
            </span>
          </div>
           <div className="space-y-3">
             <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1">Webhook URL</label>
                <input type="text" value="https://api.whatsapp.com/v1/messages" readOnly className="w-full text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-600 border rounded-md px-3 py-1.5 text-gray-600 dark:text-gray-300" />
             </div>
             <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1">Auth Token</label>
                <input type="password" value="******************" readOnly className="w-full text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-600 border rounded-md px-3 py-1.5 text-gray-600 dark:text-gray-300" />
             </div>
          </div>
        </div>

        {/* Twitter Config */}
        <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-3">
                <div className="bg-sky-100 dark:bg-sky-900/50 p-2 rounded-lg text-sky-500">
                  <Twitter className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white">Twitter API</h4>
             </div>
            <span className="flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-full">
              <CheckCircle2 className="w-3 h-3 mr-1" /> Active
            </span>
          </div>
           <div className="space-y-3">
             <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1">API Key</label>
                <input type="password" value="******************" readOnly className="w-full text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-600 border rounded-md px-3 py-1.5 text-gray-600 dark:text-gray-300" />
             </div>
             <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1">API Secret</label>
                <input type="password" value="******************" readOnly className="w-full text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-600 border rounded-md px-3 py-1.5 text-gray-600 dark:text-gray-300" />
             </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b dark:border-slate-700 bg-gray-50 dark:bg-slate-800 flex items-center justify-between">
          <h4 className="font-bold text-gray-900 dark:text-white">Recent Webhook Executions</h4>
          <Activity className="w-4 h-4 text-gray-400" />
        </div>
        <div className="divide-y divide-gray-100 dark:divide-slate-700 max-h-64 overflow-y-auto custom-scrollbar">
          {logs.map((log) => (
             <div key={log.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                <div className="flex items-center gap-4">
                   <div className={`p-2 rounded-full ${log.status === 'success' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                      {log.status === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                   </div>
                   <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{log.message}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" /> {log.time} • via {log.platform} Integration
                      </p>
                   </div>
                </div>
                <div className="text-right">
                   <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block">Status</span>
                   <span className={`text-xs font-semibold ${log.status === 'success' ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                     {log.status === 'success' ? 'POSTED 200 OK' : 'FAILED'}
                   </span>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
