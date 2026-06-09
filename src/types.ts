export type CategoryItem = {
  name: string;
  count?: number;
  isNew?: boolean;
};

export type JobCategory = {
  id: string;
  title: string;
  icon: string;
  items: CategoryItem[];
};

export type DocumentItem = {
  title: string;
  qualificationCategory: '10th' | '12th' | 'UG' | 'PG' | 'Other';
  link: string;
};

export type JobListing = {
  id: string;
  title: string;
  organization: string;
  location: string;
  deadline: string;
  salary?: string;
  tags: string[];
  isHot?: boolean;
  processChart?: { step: string, desc: string }[];
};

export type SuccessStoryItem = {
  id: string;
  title: string;
  description: string;
  source: string;
  tag: string;
};

export type ExamStrategyItem = {
  id: string;
  examName: string;
  strategyTitle: string;
  coreStrategy: string;
  basedOn: string;
  tags: string[];
};

export type NavItem = {
  label: string;
  href: string;
};
