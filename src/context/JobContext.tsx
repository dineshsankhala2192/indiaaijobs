import React, { createContext, useContext, useState, ReactNode } from 'react';
import { JobCategory, JobListing, DocumentItem, SuccessStoryItem, ExamStrategyItem } from '../types';
import { CATEGORIES, LATEST_NOTIFICATIONS, RESULTS as INITIAL_RESULTS, ADMIT_CARDS as INITIAL_ADMIT_CARDS, INITIAL_SUCCESS_STORIES, INITIAL_STRATEGIES } from '../data';

export interface AlertPreferences {
  state: string;
  degree: string;
  dept: string;
}

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success';
}

interface JobContextType {
  categories: JobCategory[];
  notifications: JobListing[];
  results: DocumentItem[];
  admitCards: DocumentItem[];
  successStories: SuccessStoryItem[];
  strategies: ExamStrategyItem[];
  selectedAcademicFilter: string | null;
  setSelectedAcademicFilter: (filter: string | null) => void;
  addJobAI: (job: {
    title: string;
    organization: string;
    categoryId: string;
    categoryName: string;
    tag: string;
    salary: string;
    deadline: string;
    qualificationCategory: '10th' | '12th' | 'UG' | 'PG' | 'Other';
    processChart: { step: string, desc: string }[];
  }) => void;
  addNotification: (job: JobListing) => void;
  addResult: (result: DocumentItem) => void;
  addAdmitCard: (admitCard: DocumentItem) => void;
  addSuccessStory: (story: SuccessStoryItem) => void;
  addStrategy: (strategy: ExamStrategyItem) => void;
  isAutoSyncEnabled: boolean;
  toggleAutoSync: () => void;
  alertPreferences: AlertPreferences | null;
  setAlertPreferences: (prefs: AlertPreferences | null) => void;
  toasts: ToastNotification[];
  removeToast: (id: string) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export function JobProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<JobCategory[]>(CATEGORIES);
  const [notifications, setNotifications] = useState<JobListing[]>(LATEST_NOTIFICATIONS);
  const [results, setResults] = useState<DocumentItem[]>(INITIAL_RESULTS);
  const [admitCards, setAdmitCards] = useState<DocumentItem[]>(INITIAL_ADMIT_CARDS);
  const [successStories, setSuccessStories] = useState<SuccessStoryItem[]>(INITIAL_SUCCESS_STORIES);
  const [strategies, setStrategies] = useState<ExamStrategyItem[]>(INITIAL_STRATEGIES);
  const [selectedAcademicFilter, setSelectedAcademicFilter] = useState<string | null>(null);
  const [isAutoSyncEnabled, setIsAutoSyncEnabled] = useState(false);
  const [alertPreferences, setAlertPreferences] = useState<AlertPreferences | null>(null);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const toggleAutoSync = () => setIsAutoSyncEnabled(prev => !prev);

  const addToast = (toast: Omit<ToastNotification, 'id'>) => {
    const id = Date.now().toString() + Math.random();
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Implement Background Mock Auto-Sync Worker
  React.useEffect(() => {
    if (!isAutoSyncEnabled) return;

    const interval = setInterval(() => {
      const rand = Math.random();
      const currentYear = new Date().getFullYear();
      
      if (rand > 0.8) {
        addResult({ title: `SSC CGL Tier 3 Latest Result ${Math.floor(Math.random() * 1000)}`, qualificationCategory: 'UG', link: '#' });
      } else if (rand > 0.5) {
        addJobAI({
          title: `Railway Group D (Auto Sync) ${Math.floor(Math.random() * 1000)}`,
          organization: 'RRB Northern Zone',
          categoryId: 'railway',
          categoryName: 'Railway Jobs',
          tag: '10th Pass',
          salary: '₹18,000 - ₹56,900',
          deadline: `30 Aug ${currentYear}`,
          qualificationCategory: '10th',
          processChart: [
            { step: 'CBT Exam', desc: 'Computer Based Test covering general knowledge and aptitude.' },
            { step: 'PET', desc: 'Physical Efficiency Test' },
            { step: 'Doc Verification', desc: 'Original certificates verification.' }
          ]
        });
      } else if (rand > 0.4) {
        addAdmitCard({ title: `IBPS PO Prelims Admit Card ${Math.floor(Math.random() * 1000)}`, qualificationCategory: 'UG', link: '#' });
      } else if (rand > 0.2) {
        addStrategy({
          id: 'auto-str-' + Date.now(),
          examName: 'Bank PO (IBPS/SBI)',
          strategyTitle: '6 महीने में बैंक PO क्लियर करने की AI टिप',
          coreStrategy: 'रीजनिंग और क्वांटिटेटिव एप्टीट्यूड के लिए डेली 3 घंटे। करेंट अफेयर्स के लिए पिछले 6 महीने की मैगजीन। मॉक टेस्ट में स्पीड और एक्यूरेसी पर काम करें।',
          basedOn: 'Top 20 Toppers Interviews',
          tags: ['Banking', 'PO', 'Strategy']
        });
      } else {
        addSuccessStory({
          id: 'auto-' + Date.now(),
          title: 'ऑटो रिक्शा चालक के बेटे ने किया कमाल, बना क्लर्क',
          description: 'रोजगार पोर्टल की मदद से समय पर जानकारी पाकर सरकारी परीक्षा में सफलता हासिल की।',
          source: 'Auto-Sync AI News Tracker',
          tag: 'Inspiring'
        });
      }
    }, 12000); // Simulate an update every 12 seconds in dev environment

    return () => clearInterval(interval);
  }, [isAutoSyncEnabled, alertPreferences]);

  const checkAlerts = (jobInfo: { title: string; qc?: string }) => {
    if (!alertPreferences) return;
    
    // Very basic mock matching logic
    const { degree, dept } = alertPreferences;
    let match = true;

    if (degree !== 'All' && jobInfo.qc && jobInfo.qc !== degree) {
      match = false;
    }
    
    if (dept !== 'All' && dept !== '') {
      const lowerTitle = jobInfo.title.toLowerCase();
      const lowerDept = dept.toLowerCase();
      if (!lowerTitle.includes(lowerDept)) {
        match = false;
      }
    }

    if (match) {
      addToast({
        title: 'New Matching Job Synced!',
        message: `${jobInfo.title} matches your alert criteria.`,
        type: 'success'
      });
    }
  };

  const addNotification = (job: JobListing) => {
    setNotifications(prev => [job, ...prev]);
  };

  const addResult = (result: DocumentItem) => {
    setResults(prev => [result, ...prev]);
  };

  const addAdmitCard = (admitCard: DocumentItem) => {
    setAdmitCards(prev => [admitCard, ...prev]);
  };

  const addSuccessStory = (story: SuccessStoryItem) => {
    setSuccessStories(prev => [story, ...prev]);
  };

  const addStrategy = (strategy: ExamStrategyItem) => {
    setStrategies(prev => [strategy, ...prev]);
  };

  const addJobAI = (parsedJob: {
    title: string;
    organization: string;
    categoryId: string;
    categoryName: string;
    tag: string;
    salary: string;
    deadline: string;
    qualificationCategory: '10th' | '12th' | 'UG' | 'PG' | 'Other';
    processChart: { step: string, desc: string }[];
  }) => {
    // 1. Update the category boards list
    setCategories(prevCategories => {
      return prevCategories.map(cat => {
        if (cat.id === parsedJob.categoryId) {
          const items = [...cat.items];
          // Check if item already exists
          const existingItemIdx = items.findIndex(
            item => item.name.toLowerCase() === parsedJob.categoryName.toLowerCase()
          );

          if (existingItemIdx > -1) {
            // Update exist item with isNew status and increase job count
            const currentCount = items[existingItemIdx].count || 0;
            items[existingItemIdx] = {
              ...items[existingItemIdx],
              count: currentCount + 1,
              isNew: true,
            };
          } else {
            // Prepend new sub-category
            items.unshift({
              name: parsedJob.categoryName,
              count: 1,
              isNew: true,
            });
          }
          return { ...cat, items };
        }
        return cat;
      });
    });

    // 2. Prepend a new live hot job card to the live notification feeds
    const newListing: JobListing = {
      id: `ai-job-${Date.now()}`,
      title: parsedJob.title,
      organization: parsedJob.organization,
      location: parsedJob.categoryName,
      deadline: parsedJob.deadline,
      salary: parsedJob.salary,
      tags: [parsedJob.tag, 'AI Added'],
      isHot: true,
      processChart: parsedJob.processChart
    };

    setNotifications(prev => [newListing, ...prev]);
    checkAlerts({ title: parsedJob.title, qc: parsedJob.qualificationCategory });
  };

  return (
    <JobContext.Provider value={{ 
      categories, 
      notifications, 
      results, 
      admitCards,
      successStories,
      strategies,
      selectedAcademicFilter,
      setSelectedAcademicFilter,
      addJobAI, 
      addNotification, 
      addResult,
      addAdmitCard,
      addSuccessStory,
      addStrategy,
      isAutoSyncEnabled,
      toggleAutoSync,
      alertPreferences,
      setAlertPreferences,
      toasts,
      removeToast
    }}>
      {children}
    </JobContext.Provider>
  );
}

export function useJobs() {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
}

