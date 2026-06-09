import Navbar from './components/Navbar';
import HeroSearch from './components/HeroSearch';
import QuickAITools from './components/QuickAITools';
import DashboardGrid from './components/DashboardGrid';
import SidebarBlocks from './components/SidebarBlocks';
import Chatbot from './components/Chatbot';
import AIPostingAssistant from './components/AIPostingAssistant';
import AdminPanel from './components/AdminPanel';
import ViralStudentTools from './components/ViralStudentTools';
import SuccessStories from './components/SuccessStories';
import ExamStrategies from './components/ExamStrategies';
import GlobalToasts from './components/GlobalToasts';
import { JobProvider } from './context/JobContext';
import { useState } from 'react';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <JobProvider>
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 font-sans overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900 transition-colors">
        <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <HeroSearch />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-8">
              <DashboardGrid />
              <ViralStudentTools />
              <AIPostingAssistant />
              <QuickAITools />
            </div>
            
            {/* Right Sidebar */}
            <div className="lg:col-span-4 self-start sticky top-24">
              <SidebarBlocks />
            </div>
          </div>
          
          <SuccessStories />
          <ExamStrategies />
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-12 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
            <p className="mb-2 flex items-center justify-center gap-2">
              <span className="font-bold text-gray-800 text-lg">India<span className="text-indigo-600">AI</span>Jobs</span>
            </p>
            <p>© 2026 IndiaAIJobs. All rights reserved.</p>
            <p className="mt-2 text-xs">Making Sarkari Naukri searches smarter for every Indian.</p>
          </div>
        </footer>

        <Chatbot />
        {isAdminOpen && <AdminPanel onClose={() => setIsAdminOpen(false)} />}
        <GlobalToasts />
      </div>
    </JobProvider>
  );
}
