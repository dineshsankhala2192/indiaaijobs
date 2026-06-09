import { useState } from 'react';
import { Brain, FileText, Bell, GraduationCap, Compass, Briefcase, FileSignature, Sparkles, IndianRupee, Scale, Shield, Route, BookOpen } from 'lucide-react';
import JobSalaryCalculator from './JobSalaryCalculator';
import JobComparisonTool from './JobComparisonTool';
import AIAlertSubscriptionTool from './AIAlertSubscriptionTool';
import ServiceProfilesTool from './ServiceProfilesTool';
import CareerRoadmapsTool from './CareerRoadmapsTool';
import AIStudyPathGenerator from './AIStudyPathGenerator';

const tools = [
  { id: 'resume', icon: FileText, title: 'Resume Builder', desc: 'AI optimized parsing', color: 'bg-emerald-100 text-emerald-700' },
  { id: 'alerts', icon: Bell, title: 'Smart Alerts', desc: 'Instant WhatsApp updates', color: 'bg-blue-100 text-blue-700' },
  { id: 'salary', icon: IndianRupee, title: 'Salary Calculator', desc: '7th Pay Commission in-hand', color: 'bg-green-100 text-green-700' },
  { id: 'compare', icon: Scale, title: 'Job Compare', desc: 'Side-by-side analysis', color: 'bg-indigo-100 text-indigo-700' },
  { id: 'profiles', icon: Shield, title: 'Service Profiles', desc: 'IAS, IPS, RAS Details', color: 'bg-red-100 text-red-700' },
  { id: 'roadmap', icon: Route, title: 'Exam Roadmaps', desc: 'Step-by-step prep flow', color: 'bg-amber-100 text-amber-700' },
  { id: 'study', icon: BookOpen, title: 'AI Study Path', desc: 'Generate day-by-day plan', color: 'bg-teal-100 text-teal-700' },
  { id: 'mock', icon: GraduationCap, title: 'AI Mock Tests', desc: 'Predictive scoring', color: 'bg-purple-100 text-purple-700' },
  { id: 'career', icon: Compass, title: 'Career Guide', desc: 'Data-driven pathways', color: 'bg-orange-100 text-orange-700' }
];

export default function QuickAITools() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  return (
    <section className="mb-10">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-6 h-6 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-900">AI Career Toolkit</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-9 gap-4">
        {tools.map((tool, idx) => (
          <div 
            key={idx} 
            onClick={() => setActiveTool(tool.id)}
            className="group relative bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden flex flex-col items-center text-center"
          >
            <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${tool.color}`}>
              <tool.icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1 text-sm">{tool.title}</h3>
            <p className="text-[10px] text-gray-500">{tool.desc}</p>
          </div>
        ))}
      </div>

      {activeTool === 'salary' && (
        <JobSalaryCalculator onClose={() => setActiveTool(null)} />
      )}
      
      {activeTool === 'compare' && (
        <JobComparisonTool onClose={() => setActiveTool(null)} />
      )}

      {activeTool === 'alerts' && (
        <AIAlertSubscriptionTool onClose={() => setActiveTool(null)} />
      )}

      {activeTool === 'profiles' && (
        <ServiceProfilesTool onClose={() => setActiveTool(null)} />
      )}

      {activeTool === 'roadmap' && (
        <CareerRoadmapsTool onClose={() => setActiveTool(null)} />
      )}

      {activeTool === 'study' && (
        <AIStudyPathGenerator onClose={() => setActiveTool(null)} />
      )}
    </section>
  );
}
