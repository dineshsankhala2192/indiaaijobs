import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Users, Search, Activity, Sparkles, ArrowUpRight, ArrowDownRight, Globe, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';

const trafficData = [
  { name: 'Mon', visits: 42000, organic: 24000 },
  { name: 'Tue', visits: 48000, organic: 29000 },
  { name: 'Wed', visits: 51000, organic: 32000 },
  { name: 'Thu', visits: 45000, organic: 27000 },
  { name: 'Fri', visits: 68000, organic: 45000 },
  { name: 'Sat', visits: 85000, organic: 62000 },
  { name: 'Sun', visits: 92000, organic: 71000 },
];

const keywordsData = [
  { keyword: 'ssc cgl admit card', volume: '1.2M', rank: 2, trend: 'up' },
  { keyword: 'upsc prelims result date', volume: '850K', rank: 1, trend: 'up' },
  { keyword: 'railway alp vacancy 2026', volume: '2.1M', rank: 4, trend: 'down' },
  { keyword: 'sarkari result age calculator', volume: '500K', rank: 1, trend: 'up' },
  { keyword: 'up police constable cut off', volume: '920K', rank: 3, trend: 'flat' },
];

const insights = [
  {
    title: 'Content Gap Opportunity',
    desc: 'High search volume detected for "RRB NTPC Syllabus 2026" with low competition. Create a detailed guide block to capture ~40K daily organic hits.',
    type: 'opportunity',
  },
  {
    title: 'Viral Utility Alert',
    desc: 'The Age Calculator tool traffic surged by 85% this weekend. Add a direct "Share on WhatsApp" floating button to multiply social reach.',
    type: 'action',
  },
  {
    title: 'Bounce Rate Warning',
    desc: 'Users searching for "SSC GD Result" are leaving quickly. Ensure the direct download link is placed above the fold.',
    type: 'warning',
  }
];

export default function SEOAnalyticsDashboard() {
  return (
    <div className="space-y-6">
      
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Daily Visits</p>
            <h3 className="text-2xl font-black text-gray-900">92.4K</h3>
            <p className="text-xs font-bold text-emerald-600 flex items-center mt-1"><ArrowUpRight className="w-3 h-3 mr-0.5" /> +12.5% vs yesterday</p>
          </div>
          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
            <Users className="w-5 h-5" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Organic Search Traffic</p>
            <h3 className="text-2xl font-black text-gray-900">71.0K</h3>
            <p className="text-xs font-bold text-emerald-600 flex items-center mt-1"><ArrowUpRight className="w-3 h-3 mr-0.5" /> +18.2% vs yesterday</p>
          </div>
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
            <Search className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Direct / WhatsApp</p>
            <h3 className="text-2xl font-black text-gray-900">18.1K</h3>
            <p className="text-xs font-bold text-emerald-600 flex items-center mt-1"><ArrowUpRight className="w-3 h-3 mr-0.5" /> +4.1% vs yesterday</p>
          </div>
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <Globe className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Active Now</p>
            <h3 className="text-2xl font-black text-gray-900 pr-4">1,402</h3>
            <p className="text-xs font-bold text-rose-500 animate-pulse flex items-center mt-1">Live updates</p>
          </div>
          <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
            <Activity className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Traffic Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-gray-900">Traffic Volume (7 Days)</h3>
            </div>
            <select className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 font-semibold text-gray-700 outline-none focus:ring-1 focus:ring-indigo-500">
              <option>Past 7 Days</option>
              <option>Past 30 Days</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} tickFormatter={(val) => `${val / 1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="visits" name="Total Visits" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorVisits)" />
                <Area type="monotone" dataKey="organic" name="Organic Search" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorOrganic)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Keywords */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-gray-900">Top Organic Keywords</h3>
          </div>
          <div className="space-y-4">
            {keywordsData.map((kw, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900 hover:text-indigo-600 cursor-pointer transition-colors max-w-[150px] sm:max-w-[180px] truncate">{kw.keyword}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-semibold text-gray-500">Vol: {kw.volume}</span>
                    <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-bold">Rank #{kw.rank}</span>
                  </div>
                </div>
                <div>
                  {kw.trend === 'up' ? <ArrowUpRight className="w-4 h-4 text-emerald-500" /> : kw.trend === 'down' ? <ArrowDownRight className="w-4 h-4 text-rose-500" /> : <div className="w-4 h-0.5 bg-gray-300 rounded"></div>}
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white font-bold rounded-xl text-xs transition-colors">
            View Full Report
          </button>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-6 shadow-md relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-6 h-6 text-indigo-300" />
          <h3 className="text-xl font-bold text-white">AI Traffic Insights & Actions</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
          {insights.map((insight, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl hover:bg-white/15 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                {insight.type === 'opportunity' && <TrendingUp className="w-4 h-4 text-emerald-400" />}
                {insight.type === 'action' && <Users className="w-4 h-4 text-blue-400" />}
                {insight.type === 'warning' && <Activity className="w-4 h-4 text-rose-400" />}
                <h4 className="font-bold text-white text-sm">{insight.title}</h4>
              </div>
              <p className="text-indigo-100/80 text-xs leading-relaxed">
                {insight.desc}
              </p>
              <button className="mt-4 text-xs font-bold text-indigo-300 hover:text-white transition-colors flex items-center gap-1">
                Apply Suggestion <ArrowUpRight className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
