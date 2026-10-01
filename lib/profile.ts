// Single source of truth for portfolio content. The page renders it and the chatbot answers from it,
// so anything private (phone, address, date of birth, family details) must never be added here.

export const LINKS = {
  github: 'https://github.com/Siddumarpu164498',
  githubUser: 'Siddumarpu164498',
  linkedin: 'https://linkedin.com/in/siddardha-marpu',
  email: 'siddumarpu123@gmail.com',
};

export const PROFILE = {
  name: 'Marpu Siddardha',
  firstName: 'Siddardha',
  role: 'Associate ML Engineer at Brightcone.ai',
  headline: 'Associate ML Engineer · ML, LLM & Full-Stack Developer',
  location: 'Srikakulam, Andhra Pradesh, India',
  summary:
    'Associate ML Engineer at Brightcone.ai and B.Tech Information Technology student (CGPA 9.16) at Aditya Institute of Technology and Management. Builds machine learning systems, enterprise LLM infrastructure and full-stack applications with Python, TypeScript and the cloud.',
  languages: ['English', 'Telugu', 'Hindi'],
  interests: ['Music', 'Reading books'],
  stack: ['Python', 'TypeScript', 'React', 'Next.js', 'FastAPI', 'FAISS', 'PostgreSQL', 'AWS'],
};

export const FOCUS = [
  { title: 'Production ML', text: 'Turning models into reliable services: data ingestion, embeddings, evaluation and monitoring.' },
  { title: 'LLM & RAG Systems', text: 'Semantic search with FAISS, cross-encoder re-ranking and GPT-4 integration for context-aware answers.' },
  { title: 'Privacy by Design', text: 'Sensitive-data masking for HIPAA/GDPR compliance and secure enterprise integration.' },
  { title: 'Full-Stack Delivery', text: 'Typed React/Next.js front ends on FastAPI and PostgreSQL back ends, shipped to the cloud.' },
];

export type Role = { title: string; date: string; mode: string; current?: boolean; points: string[]; tags: string[] };
export type Job = { company: string; logo: string; site: string; roles: Role[] };

export const EXPERIENCE: Job[] = [
  {
    company: 'Brightcone.ai', logo: '/logos/brightcone.png', site: 'https://brightcone.ai',
    roles: [
      {
        title: 'Associate ML Engineer', date: 'Aug 2026 – Present', mode: 'Full-time', current: true,
        points: ['Building machine learning systems, data pipelines and AI/LLM-powered solutions.'],
        tags: ['Machine Learning', 'LLMs', 'Python'],
      },
      {
        title: 'Machine Learning Intern', date: 'Jun 2026 – Jul 2026', mode: 'Internship',
        points: ['Machine learning internship focused on AI engineering and production-ready ML workflows.'],
        tags: ['Machine Learning', 'Python'],
      },
    ],
  },
  {
    company: 'Yanthraa Information Systems Pvt Ltd', logo: '/logos/yanthraa.png', site: 'https://www.yanthraa.com',
    roles: [
      {
        title: 'Machine Learning Intern', date: 'May 2025 – Aug 2025', mode: 'Offline · Paid internship',
        points: [
          'Contributed to Holocron, a proprietary enterprise LLM infrastructure platform.',
          'Built data ingestion and sensitive-data masking for HIPAA/GDPR compliance.',
          'Generated embeddings with all-MiniLM-L6-v2 and indexed them with FAISS for fast semantic search.',
          'Optimized query ranking with ms-marco-MiniLM-L-6-v2 and integrated GPT-4 for AI-driven responses.',
          'Received a stipend in recognition of contributions to AI solution development.',
        ],
        tags: ['Python', 'React', 'TypeScript', 'FAISS', 'GPT-4'],
      },
    ],
  },
  {
    company: 'ServiceNow', logo: '/logos/servicenow.png', site: 'https://www.servicenow.com',
    roles: [
      {
        title: 'Certified ServiceNow Intern', date: 'May 2025', mode: 'Online · Virtual internship',
        points: [
          'Hands-on ITSM fundamentals: incident management, automated workflows and UI policy scripting.',
          'Configured ServiceNow instances supporting enterprise operations; earned Certified System Administrator.',
        ],
        tags: ['ServiceNow', 'ITSM', 'JavaScript'],
      },
    ],
  },
];

export const EDUCATION = [
  { t: 'B.Tech, Information Technology', s: 'Aditya Institute of Technology and Management, Tekkali', b: 'JNTU-GV, Vizianagaram', v: 'CGPA 9.16', d: '2022 – 2026',
    points: ['Focus on machine learning, web technologies and cloud', 'Internship coordinator & anti-ragging committee member, Dept. of IT'] },
  { t: 'Intermediate (MPC)', s: 'Gayatri Junior College, Munasabpeta', b: 'BIE, Andhra Pradesh', v: '86.7%', d: '2020 – 2022', points: [] },
  { t: 'Secondary School Certificate', s: 'Government High School, Santhabommali', b: 'BSE, Andhra Pradesh', v: '600 / 600 (100%)', d: '2020', points: [] },
];

export type ProjectCategory = 'AI & ML' | 'Full Stack' | 'Platforms';
export const PROJECTS: { name: string; tagline: string; category: ProjectCategory; text: string; tech: string[]; href?: string }[] = [
  {
    name: 'Holocron', tagline: 'Enterprise LLM infrastructure · Yanthraa', category: 'AI & ML',
    text: 'Secure, customizable LLM platform for enterprises: ingestion pipelines, HIPAA/GDPR-aware data masking, MiniLM embeddings, FAISS semantic search, cross-encoder re-ranking and GPT-4 responses.',
    tech: ['Python', 'React', 'TypeScript', 'Tailwind', 'FAISS', 'GPT-4'],
  },
  {
    name: 'Battery RUL Prediction', tagline: 'IEEE WAMS 2026 research', category: 'AI & ML',
    text: 'Single-head attention LSTM that predicts the remaining useful life of lithium-ion batteries; presented at the 5th IEEE Wireless, Antenna, and Microwave Symposium.',
    tech: ['Python', 'Deep Learning', 'LSTM', 'Attention'],
  },
  {
    name: 'Multiverse of 100 DS Projects', tagline: 'Data science series', category: 'AI & ML',
    href: `${LINKS.github}/Multiverse_of_100-_data_science_project_series`,
    text: 'A 100-project learning series covering EDA, machine learning and deep learning in Python and Jupyter.',
    tech: ['Python', 'Jupyter', 'Pandas', 'scikit-learn'],
  },
  {
    name: 'Budget-bee', tagline: 'Full-stack expense tracker', category: 'Full Stack',
    text: 'Expense tracker with OTP authentication and admin approval workflows.',
    tech: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL'],
  },
  {
    name: 'siddu-portfolio', tagline: 'This website', category: 'Full Stack', href: `${LINKS.github}/siddu-portfolio`,
    text: 'Themeable portfolio with an AI assistant, built with Next.js, TypeScript and Tailwind CSS on Vercel.',
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'Claude API'],
  },
  {
    name: 'Calculating Family Expenses', tagline: 'ServiceNow project · SmartBridge', category: 'Platforms',
    text: 'A ServiceNow application for calculating and tracking family expenses with tables, forms and automated workflows.',
    tech: ['ServiceNow', 'JavaScript', 'ITSM'],
  },
];

export type SkillCategory = 'AI & Machine Learning' | 'Full Stack & Web' | 'Data & Cloud' | 'Languages & Tools';
export const SKILLS: { name: string; category: SkillCategory; note: string }[] = [
  { name: 'Python, NumPy, Pandas', category: 'AI & Machine Learning', note: 'Data preprocessing, feature engineering, pipelines' },
  { name: 'Machine & Deep Learning', category: 'AI & Machine Learning', note: 'scikit-learn models, LSTMs, attention' },
  { name: 'LLMs & RAG', category: 'AI & Machine Learning', note: 'GPT-4 integration, retrieval-augmented generation' },
  { name: 'FAISS & Sentence Transformers', category: 'AI & Machine Learning', note: 'Embeddings, semantic search, re-ranking' },
  { name: 'React & Next.js', category: 'Full Stack & Web', note: 'Component-driven, responsive UIs' },
  { name: 'TypeScript & JavaScript', category: 'Full Stack & Web', note: 'Typed, maintainable front-end code' },
  { name: 'FastAPI & Django', category: 'Full Stack & Web', note: 'REST APIs and Python back ends' },
  { name: 'Tailwind CSS & Bootstrap', category: 'Full Stack & Web', note: 'Utility-first styling and layouts' },
  { name: 'MySQL, PostgreSQL, Oracle', category: 'Data & Cloud', note: 'Relational modelling and SQL (SQL Competition winner)' },
  { name: 'MongoDB', category: 'Data & Cloud', note: 'Document databases' },
  { name: 'AWS', category: 'Data & Cloud', note: 'Cloud computing fundamentals (APSSDC certified)' },
  { name: 'Docker & Vercel', category: 'Data & Cloud', note: 'Containers and deployment' },
  { name: 'Java, C, C++', category: 'Languages & Tools', note: 'OOP, data structures and algorithms' },
  { name: 'Git & GitHub', category: 'Languages & Tools', note: 'Version control and collaboration' },
  { name: 'ServiceNow', category: 'Languages & Tools', note: 'ITSM, workflows, UI policies (CSA certified)' },
  { name: 'Linux & Windows', category: 'Languages & Tools', note: 'Development environments' },
];
export const SKILL_CATEGORIES: SkillCategory[] = ['AI & Machine Learning', 'Full Stack & Web', 'Data & Cloud', 'Languages & Tools'];

export const ACHIEVEMENTS = [
  'Presented an IEEE paper at WAMS 2026 on attention-based LSTMs for battery life prediction',
  '1st Prize, SQL Competition 1.0 (Dept. of IT, AITAM, Jun 2024)',
  'Best Student, Level-1 Ethical Hacking Hackathon (Supraja Technologies, Oct 2024)',
  '3rd Place, Model G20 Summit (AITAM, Nov 2023)',
  'Participant, YUGMA National Level Oratory Contest (ASTHA School of Management, Feb 2025)',
];

export const LEADERSHIP = [
  'Internship coordinator for the Department of IT',
  'Member of the anti-ragging committee, Department of IT',
  'Active NSS volunteer; community internship at Marripadu Grama Sachivalayam (2024)',
  'March Past at JNTU-GV for Independence Day 2024 and Republic Day 2025',
];

// Certifications without a scanned certificate on the site
export const MORE_CERTS = [
  { t: 'Data Science for Engineers', i: 'NPTEL · IIT Madras', d: 'Mar 2024' },
  { t: 'Business Analytics & Text Mining Modeling using Python', i: 'NPTEL · IIT Kharagpur', d: 'Jul 2024' },
  { t: 'Introduction to Machine Learning', i: 'NPTEL · IIT Madras', d: 'Apr 2025' },
  { t: 'Certified System Administrator', i: 'ServiceNow', d: 'May 2025' },
  { t: 'Full Stack Developer', i: 'GeeksforGeeks', d: 'Sep 2024' },
  { t: 'Data Analysis using Python', i: 'APSSDC', d: '2024' },
];
