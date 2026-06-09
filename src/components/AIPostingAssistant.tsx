import React, { useState } from 'react';
import { useJobs } from '../context/JobContext';
import { Sparkles, Brain, Loader2, Plus, CornerDownRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PRESET_CIRCULARS = [
  {
    label: "HAL Apprentice Notice",
    text: "Hindustan Aeronautics Limited (HAL) has announced official Vacancies for Technical Apprentices. Scale of pay is approx ₹28,500 consolidated. Selected candidates will join the PSU Division. Deadline set is 12 August 2026. Eligibility requirement is UG Level (Graduation)."
  },
  {
    label: "UP Police Constable",
    text: "UPPRPB Police Recruitment cell is active! Pasting notice for 240 Constable positions. Department is Police Dept under standard state-wise or departmental criteria. Last date to register online is 30 September 2026. Salary is ₹21,700 basic. Educational level: 12th Pass."
  },
  {
    label: "BARC M.Sc Chem Jobs",
    text: "Bhabha Atomic Research Centre (BARC) invites applications for Scientific Officers from eligible students holding an M.Sc Chemistry degree. Expected salary ₹56,100 basic. Deadline 20 Nov 2026."
  },
  {
    label: "SSC CGL Result",
    text: "Staff Selection Commission has finally released the Tier 2 results formatting the cutoff levels across regions. Log into portal to check SSC CGL Tier 2 Results now."
  },
  {
    label: "Railways Admit Card",
    text: "RRB has pushed the Hall Ticket downloads for NTPC examination CBT-1. Students can grab their RRB NTPC CBT-1 Hall Tickets from the main site."
  }
];

interface AIPostingPreview {
  documentType: string;
  title?: string;
  organization?: string;
  categoryId?: string;
  categoryName?: string;
  salary?: string;
  deadline?: string;
  tag?: string;
  summaryText?: string;
}

export default function AIPostingAssistant() {
  const { addJobAI, addResult, addAdmitCard } = useJobs();
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [previewData, setPreviewData] = useState<AIPostingPreview | null>(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const runWithPreset = (noticeText: string) => {
    setInputText(noticeText);
  };

  const handleAISearchAndIngest = async () => {
    if (!inputText.trim()) {
      setErrorMessage('Please type or select a sample notification text first.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setPreviewData(null);
    setSuccessMessage(false);

    const steps = [
      "Gemini AI processing the document...",
      "Extracting key details...",
      "Determining document type...",
      "Ready to automatically map and publish!"
    ];

    let currentStep = 0;
    setLoadingStep(steps[currentStep]);
    
    // Smooth step-wise animated loader messages
    const stepInterval = setInterval(() => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        setLoadingStep(steps[currentStep]);
      }
    }, 1100);

    try {
      const response = await fetch('/api/ai-autodetect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      });

      const body = await response.json();
      clearInterval(stepInterval);

      if (!response.ok || !body.success) {
        throw new Error(body.error || 'Failed to analyze text using Gemini.');
      }

      setPreviewData(body.data);
    } catch (err: unknown) {
      clearInterval(stepInterval);
      setErrorMessage(err instanceof Error ? err.message : 'Network error analyzing document.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmAndPublish = () => {
    if (!previewData) return;
    
    if (previewData.documentType === 'result') {
      addResult(previewData.summaryText);
    } else if (previewData.documentType === 'admit_card') {
      addAdmitCard(previewData.summaryText);
    } else {
      addJobAI(previewData);
    }

    setSuccessMessage(true);
    setInputText('');
    
    setTimeout(() => {
      setPreviewData(null);
      setSuccessMessage(false);
    }, 4500);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8 relative overflow-hidden">
      {/* Tricolor corner indicator accent */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-orange-400 via-gray-100 to-green-500"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 px-2.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold font-mono tracking-wide flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> AGENT CAPABILITY
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">AI Job Auto Publisher</h2>
          <p className="text-sm text-gray-500">
            Paste raw notifications or circulars. Our server-side Gemini AI extracts, formats, and publishes jobs directly into State, PSU, PSC, Banking, Railway, Defence, Department, and Ministry categories!
          </p>
        </div>
      </div>

      {/* Preset clickers */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Click to load preset text for sandbox demo:
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESET_CIRCULARS.map((preset, i) => (
            <button
              key={i}
              type="button"
              onClick={() => runWithPreset(preset.text)}
              className="text-xs bg-gray-50 hover:bg-slate-100 text-gray-700 font-medium py-1.5 px-3 rounded-lg border border-gray-200 transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Form Box */}
      <div className="space-y-4">
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Example: Indian Space Research Organisation (ISRO) released scientist recruitment. Last date to register is 24 September 2026. Grade-B scientist positions pay scaled around ₹56,100..."
            className="w-full h-32 p-4 bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:bg-white transition-all text-sm text-gray-800 resize-none"
            disabled={isLoading || successMessage}
          />
        </div>

        {errorMessage && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium">
            ⚠️ {errorMessage}
          </div>
        )}

        {/* Action Button */}
        {!previewData && !successMessage && (
          <button
            onClick={handleAISearchAndIngest}
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-700 via-indigo-600 to-indigo-700 text-white font-bold rounded-xl text-sm shadow hover:shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>{loadingStep}</span>
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 text-orange-200" />
                <span>AI Categorize & Auto-Match</span>
              </>
            )}
          </button>
        )}

        {/* Preview and Confirmation Step */}
        <AnimatePresence>
          {previewData && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="p-5 bg-gradient-to-br from-indigo-50/50 via-slate-50 to-emerald-50/10 rounded-xl border border-indigo-100 space-y-4"
            >
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm border-b border-indigo-100/60 pb-2">
                <Brain className="w-4 h-4" />
                <span>AI Extraction Blueprint</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-xs">
                <div className="flex items-start gap-1">
                  <span className="text-gray-400 font-medium w-24">Type:</span>
                  <span className="text-gray-900 font-bold uppercase">{previewData.documentType.replace('_', ' ')}</span>
                </div>
                {previewData.documentType === 'job' ? (
                  <>
                    <div className="flex items-start gap-1">
                      <span className="text-gray-400 font-medium w-24">Job Title:</span>
                      <span className="text-gray-900 font-bold">{previewData.title}</span>
                    </div>
                    <div className="flex items-start gap-1">
                      <span className="text-gray-400 font-medium w-24">Organization:</span>
                      <span className="text-gray-950 font-semibold">{previewData.organization}</span>
                    </div>
                    <div className="flex items-start gap-1">
                      <span className="text-gray-400 font-medium w-24">Category target:</span>
                      <span className="text-indigo-700 font-semibold uppercase">{previewData.categoryId} board</span>
                    </div>
                    <div className="flex items-start gap-1">
                      <span className="text-gray-400 font-medium w-24">Specific Item:</span>
                      <span className="text-slate-800 font-bold">{previewData.categoryName}</span>
                    </div>
                    <div className="flex items-start gap-1">
                      <span className="text-gray-400 font-medium w-24">Salary scale:</span>
                      <span className="text-gray-900 font-mono font-bold">{previewData.salary || 'Not specified'}</span>
                    </div>
                    <div className="flex items-start gap-1">
                      <span className="text-gray-400 font-medium w-24">Last Date:</span>
                      <span className="text-rose-600 font-semibold">{previewData.deadline}</span>
                    </div>
                    <div className="flex items-start gap-1">
                      <span className="text-gray-400 font-medium w-24">Target Tag:</span>
                      <span className="bg-slate-200/80 px-2 py-0.5 rounded text-gray-700 font-bold tracking-wide uppercase text-[10px]">
                        {previewData.tag}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex items-start gap-1 col-span-1 md:col-span-2">
                    <span className="text-gray-400 font-medium w-24">Display Text:</span>
                    <span className="text-indigo-700 font-bold">{previewData.summaryText}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-indigo-100/60">
                <button
                  type="button"
                  onClick={handleConfirmAndPublish}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Approve & Auto-Publish Live
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewData(null)}
                  className="px-4 py-2 bg-white text-gray-500 hover:text-gray-800 border border-gray-200 hover:bg-gray-50 font-semibold text-xs rounded-lg transition-all"
                >
                  Discard
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Big celebration auto-added message */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2 relative"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-700 mb-1">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-emerald-950 font-bold text-sm">Successfully Categorized & Published Live!</h3>
              <p className="text-xs text-emerald-700 max-w-md mx-auto">
                Gemini automatically mapped this and published it to your main tricolor category dashboards. Look for the glowing <span className="font-bold">"New"</span> badge in lists!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
