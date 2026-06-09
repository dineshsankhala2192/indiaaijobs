import React from 'react';
import { TrendingUp, Share2, MousePointerClick, Eye, ArrowUp, ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';

const mockData = {
  dailyViews: '124.5K',
  viewsChange: '+14.2%',
  externalCTR: '18.4%',
  ctrChange: '+2.1%',
  socialConversion: '8.7%',
  socialChange: '+4.5%',
  topJobs: [
    { title: 'SSC CGL 2026 Notification', views: '45K', shares: '12K', ctr: '22%' },
    { title: 'UPSC CSE Prelims Result', views: '38K', shares: '15K', ctr: '19%' },
    { title: 'Railway RRB NTPC Apply Online', views: '28K', shares: '8K', ctr: '16%' },
    { title: 'IBPS PO Main Exam Admit Card', views: '15K', shares: '4K', ctr: '25%' },
    { title: 'Indian Army Agniveer Rally', views: '12K', shares: '5K', ctr: '14%' },
  ]
};

export default function ViralGrowthTracker() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Viral Growth Analytics</h3>
          <p className="text-sm text-gray-500">Track views, click-through rates, and social share conversions.</p>
        </div>
        <button className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-100 transition-colors">
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Daily Views */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-50 p-2 rounded-lg">
              <Eye className="w-5 h-5 text-blue-600" />
            </div>
            <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              <ArrowUp className="w-3 h-3 mr-1" /> {mockData.viewsChange}
            </span>
          </div>
          <h4 className="text-gray-500 text-sm font-medium mb-1">Daily Job Views</h4>
          <span className="text-2xl font-black text-gray-900">{mockData.dailyViews}</span>
        </div>

        {/* External CTR */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-50 p-2 rounded-lg">
              <MousePointerClick className="w-5 h-5 text-purple-600" />
            </div>
            <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              <ArrowUp className="w-3 h-3 mr-1" /> {mockData.ctrChange}
            </span>
          </div>
          <h4 className="text-gray-500 text-sm font-medium mb-1">External CTR</h4>
          <span className="text-2xl font-black text-gray-900">{mockData.externalCTR}</span>
        </div>

        {/* Social Share Conversion */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-amber-50 p-2 rounded-lg">
              <Share2 className="w-5 h-5 text-amber-600" />
            </div>
            <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              <ArrowUp className="w-3 h-3 mr-1" /> {mockData.socialChange}
            </span>
          </div>
          <h4 className="text-gray-500 text-sm font-medium mb-1">Social Conversion</h4>
          <span className="text-2xl font-black text-gray-900">{mockData.socialConversion}</span>
        </div>
      </div>

      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b flex justify-between items-center">
          <h4 className="font-bold text-gray-900">Trending Job Posts</h4>
          <TrendingUp className="w-4 h-4 text-gray-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-5 py-3">Job Title</th>
                <th className="px-5 py-3">Total Views</th>
                <th className="px-5 py-3">Social Shares</th>
                <th className="px-5 py-3">Click-through Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockData.topJobs.map((job, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 font-semibold text-gray-800">{job.title}</td>
                  <td className="px-5 py-3 text-gray-600">{job.views}</td>
                  <td className="px-5 py-3 text-gray-600">{job.shares}</td>
                  <td className="px-5 py-3 text-emerald-600 font-bold">{job.ctr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
