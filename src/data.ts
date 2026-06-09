import { JobCategory, JobListing, NavItem, DocumentItem, ExamStrategyItem } from './types';

export const INITIAL_STRATEGIES: ExamStrategyItem[] = [
  {
    id: "str1",
    examName: "UPSC CSE",
    strategyTitle: "प्रथम प्रयास में UPSC क्रैक करने की AI स्ट्रेटजी",
    coreStrategy: "रोज 8 घंटे पढ़ाई, द हिंदू का विश्लेषण, और कम से कम 50 मॉक टेस्ट। NCERT से बेसिक्स मजबूत करें और आंसर राइटिंग पर फोकस करें।",
    basedOn: "Top 20 Toppers Interviews (AI Analyzed)",
    tags: ["UPSC", "IAS", "Strategy"]
  },
  {
    id: "str2",
    examName: "SSC CGL",
    strategyTitle: "SSC CGL टीयर 1 और 2 के अचूक मास्टरप्लान",
    coreStrategy: "गणित में शॉर्ट ट्रिक्स और अंग्रेजी के लिए 10,000+ वोकैब। पिछले 5 साल के प्रश्न पत्रों (PYQs) को हफ्ते में 3 बार सॉल्व करें।",
    basedOn: "Top 20 Toppers Interviews (AI Analyzed)",
    tags: ["SSC CGL", "Strategy", "Maths"]
  },
  {
    id: "str3",
    examName: "RAS / State PCS",
    strategyTitle: "राजस्थान प्रशासनिक (RAS) की स्मार्ट स्टडी",
    coreStrategy: "राजस्थान के इतिहास और भूगोल पर विशेष ध्यान। आर्थिक समीक्षा का नियमित अध्ययन और मुख्य परीक्षा के लिए फ्लोचार्ट का उपयोग।",
    basedOn: "Top 20 Toppers Interviews (AI Analyzed)",
    tags: ["RAS", "RPSC", "Strategy"]
  }
];

export const INITIAL_SUCCESS_STORIES = [
  {
    id: "s1",
    title: "चूड़ियां बेचने वाली का बेटा बना IAS अफसर",
    description: "कठिन परिस्थितियों का सामना करते हुए, अपनी माँ के संघर्षों से प्रेरणा लेकर रमेश ने UPSC परीक्षा पहले ही प्रयास में पास की।",
    source: "The Hindu / Dainik Jagran",
    tag: "UPSC Success"
  },
  {
    id: "s2",
    title: "20 साल के छात्र ने AI से खड़ी की करोड़ों की कंपनी",
    description: "कॉलेज के दूसरे वर्ष के छात्र ने एक ऐसा AI टूल बनाया जो अब 50 से अधिक देशों में इस्तेमाल हो रहा है।",
    source: "TechCrunch / Google News",
    tag: "AI Startup"
  }
];

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#' },
  { label: 'Latest Jobs', href: '#' },
  { label: 'Results', href: '#' },
  { label: 'Admit Card', href: '#' },
  { label: 'Syllabus', href: '#' },
  { label: 'Answer Key', href: '#' },
  { label: 'Current Affairs', href: '#' },
  { label: 'Free Notes PDF', href: '#' },
];

export const CATEGORIES: JobCategory[] = [
  {
    id: 'state',
    title: 'State Wise Jobs',
    icon: 'Map',
    items: [
      { name: 'Andhra Pradesh' }, { name: 'Bihar' }, { name: 'Delhi' },
      { name: 'Gujarat', count: 120 }, { name: 'Haryana' }, { name: 'Karnataka' },
      { name: 'Kerala' }, { name: 'Madhya Pradesh' }, { name: 'Maharashtra', isNew: true },
      { name: 'Rajasthan' }, { name: 'Uttar Pradesh', count: 350 }, { name: 'West Bengal' }
    ]
  },
  {
    id: 'psu',
    title: 'PSU Wise Jobs',
    icon: 'Building',
    items: [
      { name: 'BHEL' }, { name: 'BPCL' }, { name: 'Coal India', isNew: true },
      { name: 'GAIL' }, { name: 'HAL' }, { name: 'HPCL' },
      { name: 'IOCL', count: 45 }, { name: 'NTPC' }, { name: 'ONGC' }
    ]
  },
  {
    id: 'psc',
    title: 'PSC Wise Jobs',
    icon: 'Landmark',
    items: [
      { name: 'UPSC', isNew: true }, { name: 'BPSC' }, { name: 'MPPSC' },
      { name: 'RPSC' }, { name: 'UPPSC', count: 89 }, { name: 'UKPSC' }
    ]
  },
  {
    id: 'banking',
    title: 'Banking Jobs',
    icon: 'Landmark',
    items: [
      { name: 'SBI PO/Clerk' }, { name: 'RBI Grade B' }, { name: 'IBPS PO' },
      { name: 'NABARD' }, { name: 'LIC AAO' }, { name: 'Bank Apprentice' }
    ]
  },
  {
    id: 'railway',
    title: 'Railway Jobs',
    icon: 'Train',
    items: [
      { name: 'RRB NTPC', count: 1240 }, { name: 'RRB Group D' }, { name: 'Railway Apprentice' },
      { name: 'Metro Rail' }, { name: 'IRCTC' }
    ]
  },
  {
    id: 'defense',
    title: 'Defense Jobs',
    icon: 'Shield',
    items: [
      { name: 'Indian Army' }, { name: 'Indian Navy' }, { name: 'Indian Air Force', isNew: true },
      { name: 'BSF' }, { name: 'CRPF' }, { name: 'Coast Guard' }
    ]
  },
  {
    id: 'department',
    title: 'Department Wise',
    icon: 'Building',
    items: [
      { name: 'Education Dept' }, { name: 'Police Dept', count: 420 }, { name: 'Health Dept' },
      { name: 'Forest Dept' }, { name: 'Agriculture Dept' }, { name: 'Revenue Dept' }
    ]
  },
  {
    id: 'ministry',
    title: 'Ministry Wise Jobs',
    icon: 'Landmark',
    items: [
      { name: 'Min. of Defence', isNew: true }, { name: 'Min. of Railways', count: 120 }, { name: 'Min. of Education' },
      { name: 'Min. of Finance' }, { name: 'Min. of Home Affairs' }, { name: 'Min. of Health' }
    ]
  },
  {
    id: 'other',
    title: 'Other Jobs',
    icon: 'Sparkles',
    items: [
      { name: 'Judiciary' }, { name: 'Contractual' }, { name: 'Private/Tech', isNew: true },
      { name: 'NGO / Trust' }, { name: 'Research / JRF' }, { name: 'Sports Quota' }
    ]
  },
  {
    id: 'qualification',
    title: 'Qualification Wise Jobs',
    icon: 'GraduationCap',
    items: [
      { name: '10th Pass' }, { name: '12th Pass', count: 185 }, { name: 'Diploma' },
      { name: 'ITI Jobs' }, { name: 'UG Level', count: 432 }, { name: 'PG Level', isNew: true }
    ]
  },
  {
    id: 'subject',
    title: 'Subject/Degree Wise Jobs',
    icon: 'BookOpen',
    items: [
      { name: 'M.Sc Chemistry', isNew: true }, { name: 'M.Sc Maths' }, { name: 'M.Sc Physics' },
      { name: 'B.Tech / B.E', count: 64 }, { name: 'B.Sc Jobs' }, { name: 'B.Com Jobs' },
      { name: 'BA Jobs' }, { name: 'LLB (Law)' }, { name: 'MBBS / Nursing' }
    ]
  }
];

export const LATEST_NOTIFICATIONS: JobListing[] = [
  {
    id: 'job1',
    title: 'RRB NTPC Recruitment 2026',
    organization: 'Railway Recruitment Board',
    location: 'All India',
    deadline: '15 Jun 2026',
    salary: '₹35,400 - ₹1,12,400',
    tags: ['UG Level (Graduation)', 'Railway', 'Degree'],
    isHot: true
  },
  {
    id: 'job2',
    title: 'BARC Scientific Officer (OCES)',
    organization: 'Bhabha Atomic Research Centre',
    location: 'Mumbai, Maharashtra',
    deadline: '02 Jul 2026',
    salary: '₹56,100 Basic',
    tags: ['M.Sc Chemistry', 'M.Sc Physics', 'PG Level', 'Science']
  },
  {
    id: 'job3',
    title: 'SBI Probationary Officer (PO)',
    organization: 'State Bank of India',
    location: 'All India',
    deadline: '28 May 2026',
    salary: '₹41,960 Basic',
    tags: ['Bank', 'PO', 'UG Level (Graduation)'],
    isHot: true
  },
  {
    id: 'job4',
    title: 'ISRO Research Scientist',
    organization: 'Indian Space Research Organisation',
    location: 'Bangalore',
    deadline: '19 Jun 2026',
    salary: '₹67,700 - ₹2,08,700',
    tags: ['M.Sc Maths', 'M.Sc Physics', 'PG Level', 'Engineering']
  },
  {
    id: 'job5',
    title: 'SSC CHSL (10+2) Examination',
    organization: 'Staff Selection Commission',
    location: 'All India',
    deadline: '10 Aug 2026',
    salary: '₹19,900 - ₹63,200',
    tags: ['12th Pass', 'Clerk', 'LDC'],
    isHot: true
  },
  {
    id: 'job6',
    title: 'DRDO Scientist \'B\' Recruitment',
    organization: 'Defence Research and Development Organisation',
    location: 'All India',
    deadline: '25 Jul 2026',
    salary: '₹56,100 Basic',
    tags: ['B.Tech / B.E', 'UG Level (Graduation)', 'Engineering']
  },
  {
    id: 'job7',
    title: 'UP Police Constable Recruitment',
    organization: 'UPPRPB',
    location: 'Uttar Pradesh',
    deadline: '10 Jun 2026',
    tags: ['10th Pass', '12th Pass', 'Police']
  },
  {
    id: 'job8',
    title: 'AIIMS Nursing Officer (NORCET)',
    organization: 'All India Institute of Medical Sciences',
    location: 'Multiple Cities',
    deadline: '05 Sep 2026',
    salary: '₹44,900 - ₹1,42,400',
    tags: ['MBBS / Nursing', 'Medical', 'UG Level (Graduation)']
  }
];

export const ADMIT_CARDS: DocumentItem[] = [
  { title: 'UPSC CSE Prelims E-Admit Card 2026', qualificationCategory: 'UG', link: '#' },
  { title: 'RRB NTPC CBT-1 Hall Ticket', qualificationCategory: 'UG', link: '#' },
  { title: 'SBI PO Mains Call Letter', qualificationCategory: 'UG', link: '#' },
  { title: 'SSC CHSL Tier 1 Admit Card', qualificationCategory: '12th', link: '#' },
  { title: 'UP Police Constable Admit Card', qualificationCategory: '10th', link: '#' },
];

export const RESULTS: DocumentItem[] = [
  { title: 'SSC CGL Tier 1 Result 2025', qualificationCategory: 'UG', link: '#' },
  { title: 'UPSC NDA Final Result', qualificationCategory: '12th', link: '#' },
  { title: 'IBPS PO Mains Score Card', qualificationCategory: 'UG', link: '#' },
  { title: 'RRB ALP CBT-1 Result Declared', qualificationCategory: '10th', link: '#' },
  { title: 'UP Board 10th Result', qualificationCategory: '10th', link: '#' }
];
