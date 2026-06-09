import React, { useState } from 'react';
import { useJobs } from '../context/JobContext';
import { Settings, Plus, LayoutDashboard, Bell, FileCheck2, X, BarChart3, Database, TrendingUp, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { JobListing } from '../types';
import SEOAnalyticsDashboard from './SEOAnalyticsDashboard';
import AIAutoScraperTool from './AIAutoScraperTool';
import ViralGrowthTracker from './ViralGrowthTracker';
import SocialSyndicationModule from './SocialSyndicationModule';

export default function AdminPanel({ onClose }: { onClose: () => void }) {
  const { addNotification, addResult } = useJobs();
  const [activeTab, setActiveTab] = useState<'crawler' | 'analytics' | 'growth' | 'syndication' | 'notifications' | 'results'>('crawler');

  // Form states for Notifications
  const [title, setTitle] = useState('');
  const [org, setOrg] = useState('');
  const [loc, setLoc] = useState('');
  const [deadline, setDeadline] = useState('');
  const [salary, setSalary] = useState('');
  const [tags, setTags] = useState('');
  const [isHot, setIsHot] = useState(false);

  // Form states for Results
  const [resultName, setResultName] = useState('');

  const [message, setMessage] = useState('');

  const handleAddNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !org || !deadline) return;

    const parsedTags = tags.split(',').map(t => t.trim()).filter(Boolean);

    const newJob: JobListing = {
      id: `manual-${Date.now()}`,
      title,
      organization: org,
      location: loc,
      deadline,
      salary,
      tags: parsedTags,
      isHot
    };

    addNotification(newJob);
    setMessage('Job Update Successfully Added!');
    
    // reset
    setTitle(''); setOrg(''); setLoc(''); setDeadline(''); setSalary(''); setTags(''); setIsHot(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleAddResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resultName) return;
    // Not manually grouping yet, mock for simple UI.
    addResult({ title: resultName, qualificationCategory: 'Other', link: '#' });
    setMessage('Result Successfully Added!');
    setResultName('');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-gray-900/60 backdrop-blur-sm flex justify-center items-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className={`bg-white w-full ${['analytics', 'crawler', 'growth', 'syndication'].includes(activeTab) ? 'max-w-6xl' : 'max-w-2xl'} rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden transition-all duration-300`}
      >
        {/* Header */}
        <div className="bg-indigo-600 px-6 py-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5" />
            <h2 className="font-bold text-lg">Admin Dashboard Portal</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-indigo-500 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('crawler')}
            className={`flex-1 py-3 px-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors whitespace-nowrap ${activeTab === 'crawler' ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
          >
            <Database className="w-4 h-4" /> AI Auto Crawler
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 py-3 px-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors whitespace-nowrap ${activeTab === 'analytics' ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
          >
            <BarChart3 className="w-4 h-4" /> SEO Analytics
          </button>
          <button 
            onClick={() => setActiveTab('growth')}
            className={`flex-1 py-3 px-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors whitespace-nowrap ${activeTab === 'growth' ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
          >
            <TrendingUp className="w-4 h-4" /> Viral Growth
          </button>
          <button 
            onClick={() => setActiveTab('syndication')}
            className={`flex-1 py-3 px-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors whitespace-nowrap ${activeTab === 'syndication' ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
          >
            <Share2 className="w-4 h-4" /> Social Syndication
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`flex-1 py-3 px-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors whitespace-nowrap ${activeTab === 'notifications' ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
          >
            <Bell className="w-4 h-4" /> Add Notification
          </button>
          <button 
            onClick={() => setActiveTab('results')}
            className={`flex-1 py-3 px-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors whitespace-nowrap ${activeTab === 'results' ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
          >
            <FileCheck2 className="w-4 h-4" /> Publish Result
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-gray-50">
          
          <AnimatePresence>
            {message && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mb-6 p-3 bg-green-100 border border-green-200 text-green-700 rounded-xl text-sm font-bold text-center"
              >
                ✓ {message}
              </motion.div>
            )}
          </AnimatePresence>

          {activeTab === 'crawler' ? (
            <AIAutoScraperTool />
          ) : activeTab === 'analytics' ? (
            <SEOAnalyticsDashboard />
          ) : activeTab === 'growth' ? (
            <ViralGrowthTracker />
          ) : activeTab === 'syndication' ? (
            <SocialSyndicationModule />
          ) : activeTab === 'notifications' ? (
            <form onSubmit={handleAddNotification} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Job Title / Exam Name *</label>
                <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g. UPSC NDA II 2026" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Organization / Dept *</label>
                  <input type="text" required value={org} onChange={e => setOrg(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g. Union Public Service Commission" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Location</label>
                  <input type="text" value={loc} onChange={e => setLoc(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g. All India, Delhi" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Last Date to Apply *</label>
                  <input type="text" required value={deadline} onChange={e => setDeadline(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g. 24 June 2026" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Salary / Pay Scale</label>
                  <input type="text" value={salary} onChange={e => setSalary(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g. ₹35,400 Basic" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Tags (Comma Separated)</label>
                <input type="text" value={tags} onChange={e => setTags(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g. Graduation, Army, Officer" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="hotCheck" checked={isHot} onChange={e => setIsHot(e.target.checked)} className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
                <label htmlFor="hotCheck" className="text-sm font-semibold text-gray-700 flex items-center gap-1">Mark as "Trending/Hot" Job 🔥</label>
              </div>

              <button type="submit" className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-colors flex justify-center items-center gap-2">
                <Plus className="w-5 h-5" /> Publish Job Notification
              </button>
            </form>
          ) : (
             <form onSubmit={handleAddResult} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Result Label *</label>
                <input type="text" required value={resultName} onChange={e => setResultName(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g. SSC CHSL Tier 2 Merit List Released" />
              </div>
              
              <button type="submit" className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-colors flex justify-center items-center gap-2">
                <Plus className="w-5 h-5" /> Publish New Result
              </button>
            </form>
          )}

        </div>
      </motion.div>
    </div>
  );
}
