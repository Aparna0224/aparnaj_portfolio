export const SITE = {
  name: 'Aparna J',
  role: 'AI Engineer & Backend Developer',
  location: 'Chennai, India',
  email: 'aparna6024@gmail.com',
  github: 'https://github.com/Aparna0224',
  linkedin: 'https://www.linkedin.com/in/aparna-j-a13647297/',
};

export const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Work' },
  { id: 'contact', label: 'Contact' },
];

export interface Stat {
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
}

export const STATS: Stat[] = [
  { value: 3, label: 'Internships' },
  { value: 8.9, decimals: 1, label: 'CGPA' },
  { value: 4, suffix: '+', label: 'Projects shipped' },
];

export const EDUCATION = {
  school: 'Karunya Institute of Technology and Sciences',
  degree: 'B.Tech in Artificial Intelligence and Data Science',
  period: '2023 – 2027',
  grade: 'CGPA 8.9 / 10',
};

export const SKILLS = [
  { category: 'Languages', items: ['Python', 'Java', 'C++', 'C', 'SQL'] },
  { category: 'Backend', items: ['FastAPI', 'REST APIs', 'API Integration', 'Pydantic', 'JSON'] },
  { category: 'AI & ML', items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'RAG & LLMs'] },
  { category: 'Cloud & DevOps', items: ['Docker', 'AWS', 'Azure', 'Git'] },
  { category: 'Databases', items: ['PostgreSQL', 'MongoDB'] },
  { category: 'Frontend', items: ['React'] },
];

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  points: string[];
}

export const EXPERIENCE: Experience[] = [
  {
    role: 'AI Intern',
    company: 'Ford Motor Company',
    location: 'Chennai, India',
    period: 'Jun 2026 – Aug 2026',
    points: [
      'Developed an AI-powered automated pricing system in Python, enabling intelligent pricing decisions and improving pricing efficiency.',
      'Built backend services and REST APIs for pricing workflows and enterprise integration, streamlining data exchange across systems.',
      'Collaborated with cross-functional teams and US clients in an Agile environment.',
    ],
  },
  {
    role: 'AI/ML Intern',
    company: 'HTC Global Services',
    location: 'Chennai, India',
    period: '2025',
    points: [
      'Developed Python-based data processing pipelines for AI applications.',
      'Built reusable automation modules and optimized workflow efficiency.',
    ],
  },
  {
    role: 'Web Development Intern',
    company: 'Safe H2O4',
    location: 'Remote',
    period: '2024',
    points: [
      'Developed a cloud-hosted e-commerce platform on Azure and AWS.',
      'Designed REST APIs and integrated backend services with automated email workflows.',
    ],
  },
];

export interface Project {
  title: string;
  tech: string[];
  description: string;
  year?: string;
  link: string;
}

export const PROJECTS: Project[] = [
  {
    title: 'RULE – AI-Powered Resume Parser',
    tech: ['React', 'FastAPI', 'Python', 'OpenAI', 'Docker'],
    description:
      'End-to-end resume processing system with PDF and OCR support and an advanced job-matching algorithm that scores how well candidates fit a role.',
    year: '2025',
    link: 'https://github.com/MSG-Mutual-Support-to-Grow/rule',
  },
  {
    title: 'Blues – Agentic RAG with Explainable AI',
    tech: ['Python', 'FastAPI', 'LLM APIs', 'RAG'],
    description:
      'Agentic AI system that decomposes complex queries, retrieves relevant knowledge and generates context-aware answers through multi-step reasoning, with explainable AI that exposes its sources and reasoning steps.',
    link: 'https://github.com/Aparna0224/Blues',
  },
  {
    title: 'Flood Alert System',
    tech: ['Python', 'Machine Learning', 'Node.js', 'MongoDB', 'React'],
    description:
      'Real-time flood monitoring, prediction and alert system. Tracks weather in flood-prone Indian cities, predicts flood risk with trained models and emails personalized alerts to registered users.',
    year: '2025',
    link: 'https://github.com/Aparna0224/Flood_Alert',
  },
  {
    title: 'Currency Exchange Data Warehouse Pipeline',
    tech: ['Python', 'PostgreSQL', 'Prefect', 'Power BI', 'ETL'],
    description:
      'End-to-end data engineering pipeline that extracts live exchange rates, stores them in PostgreSQL, schedules ETL runs with Prefect and visualizes insights in Power BI.',
    year: '2024',
    link: 'https://github.com/Aparna0224/Currency-Exchange-Data-Warehouse-Pipeline',
  },
];

export const ACHIEVEMENTS = [
  {
    title: 'Winner, Nexus Hackathon 2024',
    detail: 'Smart attendance system using QR codes and facial recognition.',
  },
  {
    title: 'Intel® Unnati Industrial Training 2025',
    detail: 'Selected from 500+ applicants to build an AI-powered tutor.',
  },
  {
    title: '4th Place, Innovate X Hackathon',
    detail: 'Multi-agent research-paper writing system, among 50+ teams.',
  },
];

export const CERTIFICATIONS = [
  'UI/UX Certification – Woosung University',
  'Machine Learning Fundamentals – Coursera',
  'MongoDB Python Developer',
  'Enterprise-grade AI',
  'Intel® Unnati Industrial Training',
];
