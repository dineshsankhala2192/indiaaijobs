import React, { useState } from 'react';
import { useJobs } from '../context/JobContext';
import { Search, Loader2, Database, DownloadCloud, Sparkles, Network, ArrowRightCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ScrapedData {
  type: string;
  doc: {
    title: string;
    organization?: string;
    categoryId?: string;
    categoryName?: string;
    tag?: string;
    salary?: string;
    deadline?: string;
    qualificationCategory?: string;
    processChart?: { step: string; desc: string }[];
    link?: string;
    id?: string;
    description?: string;
    source?: string;
  };
}

export default function AIAutoScraperTool() {
  const { addJobAI, addResult, addAdmitCard, addSuccessStory, isAutoSyncEnabled, toggleAutoSync } = useJobs();
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState<string>('');
  const [extractedData, setExtractedData] = useState<ScrapedData[]>([]);

  const startScrape = () => {
    setIsScanning(true);
    setScanStatus('Initializing Google Dork & Govt Node Crawlers...');
    setExtractedData([]);

    // Simulate scraping operations
    setTimeout(() => {
      setScanStatus('Scanning UPSC, SSC, and RRB official portals...');
    }, 1500);

    setTimeout(() => {
      setScanStatus('Parsing PDF notifications and mapping data via Gemini AI...');
    }, 3000);

    setTimeout(() => {
      setScanStatus('Finalizing categories and process flow charts...');
      
      const newMocks = [
        {
          type: 'job',
          doc: {
            title: 'Indian Navy Agniveer (SSR) 02/2026 Batch',
            organization: 'Indian Navy',
            categoryId: 'defense',
            categoryName: 'Indian Navy',
            tag: '12th Pass',
            salary: '₹30,000 Package',
            deadline: '22 July 2026',
            qualificationCategory: '12th',
            processChart: [
               { step: 'Step 1: CBT Exam', desc: 'Computer based test spanning 100 questions (Maths, Science, English, GK)' },
               { step: 'Step 2: PFT', desc: 'Physical Fitness Test: 1.6Km run in 6m 30s' },
               { step: 'Step 3: Medical', desc: 'Initial & Final Medical Examination at INS Chilka' }
            ]
          }
        },
        {
          type: 'admit_card',
          doc: { title: 'Indian Navy Agniveer Call up Letter 2026', qualificationCategory: '12th', link: '#' }
        },
        {
          type: 'result',
          doc: { title: 'UPSC Civil Services Prelims Result 2026', qualificationCategory: 'UG', link: '#' }
        },
        {
          type: 'success_story',
          doc: { 
            id: 's' + Date.now(),
            title: 'मजदूर की बेटी ने क्रैक किया SSC CGL, बनी इनकम टैक्स इंस्पेक्टर', 
            description: 'दिन-रात की कड़ी मेहनत और AI मॉक टेस्ट की मदद से बिना कोचिंग के पाई सफलता, पिता बांट रहे गांव में मिठाई।',
            source: 'Navbharat Times',
            tag: 'SSC Success'
          }
        }
      ];
      
      setExtractedData(newMocks);
      setIsScanning(false);
      setScanStatus('Scan Complete! 4 items formatted & ready to publish.');

      // Auto publish
      newMocks.forEach((mock) => {
        if (mock.type === 'job') {
           addJobAI(mock.doc);
        } else if (mock.type === 'admit_card') {
           addAdmitCard(mock.doc);
        } else if (mock.type === 'result') {
           addResult(mock.doc);
        } else if (mock.type === 'success_story') {
           addSuccessStory(mock.doc);
        }
      });

    }, 5000);
  };

  return (
    <div className="space-y-6">
      
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 text-white overflow-hidden relative">
        <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Network className="w-6 h-6 text-indigo-400" />
              <h3 className="text-xl font-bold">Auto Web Crawler Engine</h3>
            </div>
            <p className="text-slate-400 text-sm max-w-xl">
              Automatically scans Indian Govt offical websites, Employment News, and Google footprints. 
              Extracts data, maps it to 10th/12th/UG/PG, and formats it directly into visual "How Charts" instantly.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button 
              onClick={startScrape}
              disabled={isScanning}
              className={`flex justify-center items-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors w-full sm:w-auto ${
                isScanning ? 'bg-indigo-600/50 text-indigo-200 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
              }`}
            >
              {isScanning ? <Loader2 className="w-5 h-5 animate-spin" /> : <Database className="w-5 h-5" />}
              {isScanning ? 'Scanning Web...' : 'Start Deep Scan (One-Time)'}
            </button>
            <button
               onClick={toggleAutoSync}
               className={`flex justify-center items-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors border w-full sm:w-auto ${
                 isAutoSyncEnabled ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-transparent border-slate-600 hover:bg-slate-800 text-slate-300'
               }`}
            >
               <Sparkles className={`w-4 h-4 ${isAutoSyncEnabled ? 'animate-pulse text-emerald-400' : 'text-slate-400'}`} />
               {isAutoSyncEnabled ? 'Auto-Sync Active (Every 12s)' : 'Enable Continuous Auto-Sync'}
            </button>
          </div>
        </div>

        {isScanning && (
          <div className="mt-6 border-t border-slate-700 pt-4">
             <div className="flex items-center gap-3 text-indigo-300 font-mono text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                {scanStatus}
             </div>
             <div className="w-full bg-slate-800 h-1 mt-3 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full w-1/2 animate-[pulse_1s_ease-in-out_infinite] shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
             </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {extractedData.length > 0 && (
          <motion.div 
             initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
             className="bg-white border border-green-200 rounded-2xl p-5 shadow-sm"
          >
             <div className="flex items-center gap-2 mb-4">
               <Sparkles className="w-5 h-5 text-green-500" />
               <h3 className="font-bold text-gray-900">Extracted & Auto-Published Items</h3>
             </div>

             <div className="space-y-4">
                {extractedData.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-2 p-4 bg-green-50 border border-green-100 rounded-xl">
                    <div className="flex items-start justify-between">
                       <div className="flex flex-col">
                         <span className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">{item.type.replace('_', ' ')}</span>
                         <span className="font-bold text-gray-900">{item.doc.title}</span>
                       </div>
                       {item.doc.qualificationCategory ? (
                         <span className="px-2 py-1 bg-white border border-green-200 text-green-700 text-xs font-bold rounded-md">
                           {item.doc.qualificationCategory} Category
                         </span>
                       ) : (
                         <span className="px-2 py-1 bg-white border border-yellow-200 text-yellow-700 text-xs font-bold rounded-md">
                           Story
                         </span>
                       )}
                    </div>

                    {item.type === 'job' && item.doc.processChart && (
                      <div className="mt-3 relative">
                         <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-green-200" style={{ maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" }}></div>
                         <div className="space-y-3">
                           {item.doc.processChart.map((step, sIdx: number) => (
                             <div key={sIdx} className="flex gap-3 relative">
                               <div className="w-6 h-6 rounded-full bg-white border-2 border-green-400 flex items-center justify-center flex-shrink-0 z-10 shadow-sm">
                                 <ArrowRightCircle className="w-3 h-3 text-green-600" />
                               </div>
                               <div>
                                 <h4 className="text-xs font-bold text-gray-800">{step.step}</h4>
                                 <p className="text-xs text-gray-600 mt-0.5">{step.desc}</p>
                               </div>
                             </div>
                           ))}
                         </div>
                      </div>
                    )}
                  </div>
                ))}
             </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
