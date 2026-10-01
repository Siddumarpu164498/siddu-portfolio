'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  Mail, MapPin, X, ChevronLeft, ChevronRight, Menu, ArrowUpRight, Award, GraduationCap, Maximize2,
  Trophy, Users, Mic, Medal, Flag, ShieldCheck, Languages, Heart, Target, BookOpen,
} from 'lucide-react';
import { certificates, certCategories, type CertCategory } from '@/lib/certificates';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { ContentGuard } from '@/components/content-guard';

const LINKS = {
  github: 'https://github.com/Siddumarpu164498',
  linkedin: 'https://linkedin.com/in/siddardha-marpu',
  email: 'siddumarpu123@gmail.com',
};

const NAV = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#certificates', label: 'Certificates' },
  { href: '#contact', label: 'Contact' },
];

const EXPERIENCE = [
  {
    company: 'Brightcone.ai', logo: '/logos/brightcone.png', site: 'https://brightcone.ai',
    roles: [
      {
        title: 'Associate ML Engineer', date: 'Aug 2026 – Present', current: true, mode: 'Full-time',
        points: ['Building machine learning systems, data pipelines and AI/LLM-powered solutions.'],
      },
      {
        title: 'Machine Learning Intern', date: 'Jun 2026 – Jul 2026', mode: 'Internship',
        points: ['Machine learning internship focused on AI engineering and production-ready ML workflows.'],
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
      },
    ],
  },
];

const PROJECTS = [
  {
    name: 'Holocron', tagline: 'Enterprise LLM infrastructure · Yanthraa',
    text: 'Secure, customizable LLM platform for enterprises: ingestion pipelines, HIPAA/GDPR-aware data masking, MiniLM embeddings, FAISS semantic search, cross-encoder re-ranking and GPT-4 responses.',
    tech: ['Python', 'React', 'TypeScript', 'Tailwind', 'FAISS', 'GPT-4'],
  },
  {
    name: 'Budget-bee', tagline: 'Full-stack expense tracker', href: `${LINKS.github}/Budget-bee`,
    text: 'Expense tracker with OTP authentication and admin approval workflows.',
    tech: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL'],
  },
  {
    name: 'Multiverse of 100 DS Projects', tagline: 'Data science series', href: `${LINKS.github}/Multiverse_of_100-_data_science_project_series`,
    text: 'A 100-project learning series covering EDA, machine learning and deep learning.',
    tech: ['Python', 'Jupyter', 'Pandas', 'scikit-learn'],
  },
  {
    name: 'Calculating Family Expenses', tagline: 'ServiceNow project · SmartBridge',
    text: 'A ServiceNow application for calculating and tracking family expenses, completed with SmartInternz / SmartBridge.',
    tech: ['ServiceNow', 'JavaScript', 'ITSM'],
  },
];

const SKILLS: { title: string; items: string[] }[] = [
  { title: 'Languages', items: ['Python', 'Java', 'C', 'C++', 'JavaScript', 'TypeScript'] },
  { title: 'AI / ML', items: ['Machine Learning', 'Deep Learning', 'LLMs', 'RAG', 'FAISS', 'Sentence Transformers', 'NLP', 'Pandas', 'NumPy'] },
  { title: 'Web', items: ['React', 'Next.js', 'Django', 'FastAPI', 'Tailwind CSS', 'Bootstrap', 'HTML / CSS'] },
  { title: 'Databases', items: ['MySQL', 'PostgreSQL', 'Oracle', 'MongoDB'] },
  { title: 'Cloud & Tools', items: ['AWS', 'Docker', 'Git', 'GitHub', 'Linux', 'Windows', 'Vercel'] },
  { title: 'Platforms', items: ['ServiceNow', 'ITSM', 'Jupyter'] },
];

const EDUCATION = [
  { t: 'B.Tech, Information Technology', s: 'Aditya Institute of Technology and Management, Tekkali', b: 'JNTU-GV, Vizianagaram', v: 'CGPA 9.16', d: '2022 – 2026' },
  { t: 'Intermediate (MPC)', s: 'Gayatri Junior College, Munasabpeta', b: 'BIE, Andhra Pradesh', v: '86.7%', d: '2022' },
  { t: 'Secondary School Certificate', s: 'Government High School, Santhabommali', b: 'BSE, Andhra Pradesh', v: '600 / 600 (100%)', d: '2020' },
];

const ACHIEVEMENTS = [
  { icon: BookOpen, title: 'IEEE paper presented', text: 'Single-Head Attention LSTM for battery Remaining Useful Life prediction, IEEE WAMS 2026.' },
  { icon: Trophy, title: '1st Prize, SQL Competition 1.0', text: 'Department of IT & Institution Innovation Council, AITAM (Jun 2024).' },
  { icon: Medal, title: 'Best Student, Level-1 Hackathon', text: 'Certificate of Excellence from Supraja Technologies (Oct 2024).' },
  { icon: Award, title: '3rd Place, Model G20 Summit', text: 'Department of IT, AITAM (Nov 2023).' },
  { icon: Mic, title: 'YUGMA National Oratory Contest', text: 'Participant at ASTHA School of Management, Bhubaneswar (Feb 2025).' },
  { icon: Users, title: 'Internship Coordinator', text: 'Coordinator for internships in the Department of IT.' },
  { icon: ShieldCheck, title: 'Anti-Ragging Committee', text: 'Member representing the Department of IT.' },
  { icon: Heart, title: 'NSS Volunteer', text: 'Active National Service Scheme volunteer; community internship at Marripadu Grama Sachivalayam (2024).' },
  { icon: Flag, title: 'March Past, JNTU-GV', text: 'Independence Day 2024 and Republic Day 2025 celebrations.' },
];

// Certifications without a scanned certificate on this site
const MORE_CERTS = [
  { t: 'Data Science for Engineers', i: 'NPTEL · IIT Madras', d: 'Mar 2024' },
  { t: 'Business Analytics & Text Mining Modeling using Python', i: 'NPTEL · IIT Kharagpur', d: 'Jul 2024' },
  { t: 'Introduction to Machine Learning', i: 'NPTEL · IIT Madras', d: 'Apr 2025' },
  { t: 'Certified System Administrator', i: 'ServiceNow', d: 'May 2025' },
  { t: 'Full Stack Developer', i: 'GeeksforGeeks', d: 'Sep 2024' },
  { t: 'Data Analysis using Python', i: 'APSSDC', d: '2024' },
];

const PAGE_SIZE = 9;

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function Section({ id, label, title, intro, children }: { id?: string; label: string; title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-line py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-5">
        <p className="text-sm font-semibold tracking-wide text-accent">{label}</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-fg md:text-4xl">{title}</h2>
        {intro && <p className="mt-3 max-w-2xl text-muted">{intro}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

const card = 'rounded-2xl border border-line bg-surface';

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<CertCategory | 'All'>('All');
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState<number | null>(null);

  const filtered = useMemo(
    () => (filter === 'All' ? certificates : certificates.filter(c => c.category === filter)),
    [filter],
  );
  const visible = showAll ? filtered : filtered.slice(0, PAGE_SIZE);

  const step = useCallback(
    (d: number) => setOpen(o => (o === null ? o : (o + d + filtered.length) % filtered.length)),
    [filtered.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, step]);

  const current = open === null ? null : filtered[open];
  const paperIndex = certificates.findIndex(c => c.title.includes('IEEE WAMS'));

  return (
    <div className="min-h-screen bg-bg text-body">
      <ContentGuard />

      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-5">
          <a href="#" className="font-semibold tracking-tight text-fg">
            Marpu Siddardha<span className="text-accent">.</span>
          </a>
          <nav className="hidden items-center gap-6 lg:flex">
            {NAV.map(n => (
              <a key={n.href} href={n.href} className="text-sm text-muted transition-colors hover:text-fg">{n.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted lg:hidden"
              onClick={() => setMenuOpen(m => !m)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="flex flex-col gap-4 border-t border-line px-5 py-4 lg:hidden">
            {NAV.map(n => (
              <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="text-body">{n.label}</a>
            ))}
          </nav>
        )}
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-x-0 -top-40 h-[32rem] opacity-60"
            style={{ background: 'radial-gradient(ellipse at top, color-mix(in srgb, var(--accent) 22%, transparent), transparent 60%)' }}
            aria-hidden="true"
          />
          <div className="relative mx-auto grid max-w-5xl items-center gap-12 px-5 pb-16 pt-16 md:grid-cols-[1fr_auto] md:pb-24 md:pt-24">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-body">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Associate ML Engineer at Brightcone.ai
              </p>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-fg sm:text-5xl md:text-6xl">
                Hi, I&apos;m{' '}
                <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">Siddardha</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
                Software &amp; ML engineer building practical machine learning systems, enterprise LLM infrastructure and
                full-stack applications with Python, TypeScript and the cloud.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#contact" className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-opacity hover:opacity-90">
                  Get in touch
                </a>
                <a href="#experience" className="rounded-lg border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:bg-surface-2">
                  View experience
                </a>
                <div className="ml-1 flex items-center gap-1">
                  <a href={LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2.5 text-muted transition-colors hover:text-fg"><GithubIcon /></a>
                  <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2.5 text-muted transition-colors hover:text-fg"><LinkedinIcon /></a>
                  <a href={`mailto:${LINKS.email}`} aria-label="Email" className="p-2.5 text-muted transition-colors hover:text-fg"><Mail size={18} /></a>
                </div>
              </div>
            </div>
            <div className="mx-auto md:mx-0">
              <div className="rounded-full bg-gradient-to-br from-accent to-accent-2 p-1">
                <Image
                  src="/profile.webp"
                  alt="Marpu Siddardha"
                  width={201}
                  height={201}
                  className="h-44 w-44 rounded-full border-4 border-bg object-cover md:h-[201px] md:w-[201px]"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="relative mx-auto max-w-5xl px-5 pb-20">
            <dl className={`grid grid-cols-2 md:grid-cols-4 ${card}`}>
              {[
                { v: '9.16', l: 'B.Tech CGPA' },
                { v: `${certificates.length + MORE_CERTS.length}+`, l: 'Certifications' },
                { v: '4', l: 'Roles & internships' },
                { v: 'IEEE', l: 'Paper presented' },
              ].map((s, i) => (
                <div key={s.l} className={`px-6 py-5 ${i > 0 ? 'md:border-l md:border-line' : ''} ${i % 2 === 1 ? 'border-l border-line' : ''} ${i >= 2 ? 'border-t border-line md:border-t-0' : ''}`}>
                  <dt className="text-xs text-muted">{s.l}</dt>
                  <dd className="mt-1 text-2xl font-semibold text-fg">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* About */}
        <Section id="about" label="About" title="A bit about me">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
            <div className="space-y-4 leading-relaxed">
              <p>
                I&apos;m an <span className="font-medium text-fg">Associate ML Engineer at Brightcone.ai</span> and a final-year
                B.Tech Information Technology student at Aditya Institute of Technology and Management, with a CGPA of 9.16.
              </p>
              <p>
                I enjoy turning machine learning ideas into reliable, production-ready software: data ingestion, embeddings,
                semantic search, LLM integration and the web apps on top. During my internship at Yanthraa Information Systems
                I helped build Holocron, an enterprise LLM platform, and I recently presented an IEEE paper on attention-based
                LSTMs for battery life prediction.
              </p>
              <p>
                Outside of code I volunteer with NSS, coordinate internships for my department and serve on the anti-ragging
                committee.
              </p>
            </div>
            <ul className={`${card} divide-y divide-line text-sm`}>
              {[
                { icon: Target, k: 'Focus', v: 'ML systems · LLMs · RAG · Full-stack' },
                { icon: GraduationCap, k: 'Education', v: 'B.Tech IT, AITAM (2026)' },
                { icon: MapPin, k: 'Location', v: 'Srikakulam, Andhra Pradesh, India' },
                { icon: Languages, k: 'Languages', v: 'English, Telugu, Hindi' },
                { icon: Heart, k: 'Interests', v: 'Music, reading books' },
              ].map(f => (
                <li key={f.k} className="flex items-start gap-3 px-5 py-4">
                  <f.icon size={16} className="mt-0.5 shrink-0 text-accent" />
                  <span className="w-20 shrink-0 text-muted">{f.k}</span>
                  <span className="text-fg">{f.v}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* Experience */}
        <Section id="experience" label="Experience" title="Where I've worked">
          <div className="space-y-5">
            {EXPERIENCE.map(x => (
              <div key={x.company} className={`${card} p-6 md:p-7`}>
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-white p-1.5">
                    <Image src={x.logo} alt={`${x.company} logo`} width={40} height={40} className="h-full w-full object-contain" />
                  </span>
                  <div className="min-w-0">
                    <a href={x.site} target="_blank" rel="noopener noreferrer" className="font-semibold text-fg hover:text-accent">{x.company}</a>
                    <p className="text-sm text-muted">{x.roles.length > 1 ? `${x.roles.length} roles` : x.roles[0].mode}</p>
                  </div>
                </div>
                <div className="mt-5 ml-6 space-y-6 border-l-2 border-line pl-6">
                  {x.roles.map(r => (
                    <div key={r.title + r.date} className="relative">
                      <span className={`absolute -left-[31px] top-1.5 h-3 w-3 rounded-full ring-4 ring-surface ${'current' in r && r.current ? 'bg-accent' : 'bg-muted'}`} />
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className="font-semibold text-fg">{r.title}</h3>
                        <p className="text-sm text-muted">
                          {r.date}
                          {'current' in r && r.current && <span className="ml-2 rounded bg-accent/15 px-1.5 py-0.5 text-xs font-medium text-accent">Now</span>}
                        </p>
                      </div>
                      {x.roles.length > 1 && <p className="text-xs text-muted">{r.mode}</p>}
                      <ul className="mt-3 space-y-1.5 text-sm leading-relaxed">
                        {r.points.map(p => (
                          <li key={p} className="flex gap-2.5"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />{p}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Projects + publication */}
        <Section id="projects" label="Work" title="Projects & research">
          {paperIndex >= 0 && (
            <button
              onClick={() => { setFilter('All'); setOpen(paperIndex); }}
              className="group mb-5 w-full rounded-2xl border border-accent/30 p-6 text-left transition-colors hover:border-accent/60 md:p-8"
              style={{ background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 12%, var(--surface)), var(--surface))' }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">Publication · IEEE WAMS 2026</p>
              <h3 className="mt-3 text-xl font-semibold text-fg md:text-2xl">
                Single-Head Attention LSTM for Remaining Useful Life Prediction of Lithium-Ion Batteries
              </h3>
              <p className="mt-3 text-sm text-muted">
                Presented at the 5th IEEE Wireless, Antenna, and Microwave Symposium, B V Raju Institute of Technology, June 2026.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                View certificate <ArrowUpRight size={15} />
              </span>
            </button>
          )}
          <div className="grid gap-5 md:grid-cols-2">
            {PROJECTS.map(p => {
              const inner = (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-fg">{p.name}</h3>
                      <p className="text-sm text-muted">{p.tagline}</p>
                    </div>
                    {p.href && <ArrowUpRight size={18} className="shrink-0 text-muted transition-colors group-hover:text-accent" />}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed">{p.text}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.tech.map(t => <span key={t} className="rounded-md bg-surface-2 px-2 py-0.5 text-xs text-muted">{t}</span>)}
                  </div>
                </>
              );
              const cls = `group block ${card} p-6 transition-colors hover:border-accent/40`;
              return p.href ? (
                <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
              ) : (
                <div key={p.name} className={cls}>{inner}</div>
              );
            })}
          </div>
        </Section>

        {/* Skills + education */}
        <Section label="Skills" title="Skills & education">
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {SKILLS.map(s => (
              <div key={s.title}>
                <h3 className="text-sm font-semibold text-fg">{s.title}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.items.map(item => (
                    <span key={item} className="rounded-md border border-line bg-surface px-2.5 py-1 text-sm">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {EDUCATION.map(e => (
              <div key={e.t} className={`${card} p-6`}>
                <GraduationCap size={20} className="text-accent" />
                <h3 className="mt-4 font-semibold text-fg">{e.t}</h3>
                <p className="mt-1 text-sm">{e.s}</p>
                <p className="text-sm text-muted">{e.b}</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="font-semibold text-accent">{e.v}</span>
                  <span className="text-muted">{e.d}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Achievements */}
        <Section id="achievements" label="Achievements" title="Awards & leadership">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ACHIEVEMENTS.map(a => (
              <div key={a.title} className={`${card} p-5`}>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent"><a.icon size={18} /></span>
                <h3 className="mt-4 font-semibold text-fg">{a.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{a.text}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Certificates */}
        <Section id="certificates" label="Certificates" title="Certifications" intro="Click any certificate to view it.">
          <div className="-mx-5 mb-8 overflow-x-auto px-5">
            <div className="flex w-max gap-2">
              {(['All', ...certCategories] as const).map(cat => {
                const count = cat === 'All' ? certificates.length : certificates.filter(c => c.category === cat).length;
                const active = filter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => { setFilter(cat); setShowAll(false); }}
                    className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition-colors ${
                      active ? 'bg-accent font-medium text-on-accent' : 'border border-line text-muted hover:text-fg'
                    }`}
                  >
                    {cat} <span className="opacity-60">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((cert, idx) => (
              <button
                key={cert.image}
                onClick={() => setOpen(idx)}
                className={`group flex flex-col overflow-hidden text-left ${card} transition-colors hover:border-accent/50`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-paper">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cert.image} alt={cert.title} loading="lazy" className="absolute inset-0 h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-[1.03]" />
                  <span className="absolute right-3 top-3 rounded-md bg-black/60 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100">
                    <Maximize2 size={14} />
                  </span>
                  {cert.featured && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-accent px-2 py-1 text-xs font-semibold text-on-accent">
                      <Award size={12} /> Highlight
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-medium leading-snug text-fg">{cert.title}</h3>
                  <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
                  <div className="mt-auto flex items-center justify-between pt-4 text-xs text-muted">
                    <span>{cert.category}</span>
                    <span>{cert.date}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filtered.length > PAGE_SIZE && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setShowAll(s => !s)}
                className="rounded-lg border border-line bg-surface px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:bg-surface-2"
              >
                {showAll ? 'Show less' : `Show all ${filtered.length} certificates`}
              </button>
            </div>
          )}

          <h3 className="mt-16 text-lg font-semibold text-fg">More certifications</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {MORE_CERTS.map(m => (
              <li key={m.t} className={`flex items-start gap-3 ${card} px-5 py-4`}>
                <Award size={16} className="mt-0.5 shrink-0 text-accent" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-fg">{m.t}</p>
                  <p className="text-xs text-muted">{m.i}</p>
                </div>
                <span className="shrink-0 text-xs text-muted">{m.d}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Contact */}
        <Section id="contact" label="Contact" title="Let's work together" intro="Open to conversations about machine learning, AI/LLMs, full-stack development and ServiceNow.">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { href: `mailto:${LINKS.email}`, icon: <Mail size={18} />, t: 'Email', v: LINKS.email },
              { href: LINKS.linkedin, icon: <LinkedinIcon />, t: 'LinkedIn', v: 'in/siddardha-marpu' },
              { href: LINKS.github, icon: <GithubIcon />, t: 'GitHub', v: 'Siddumarpu164498' },
            ].map(x => (
              <a
                key={x.t}
                href={x.href}
                {...(x.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`group flex items-center gap-4 ${card} p-5 transition-colors hover:border-accent/40`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">{x.icon}</span>
                <span className="min-w-0">
                  <span className="block text-xs text-muted">{x.t}</span>
                  <span className="block truncate text-sm font-medium text-fg">{x.v}</span>
                </span>
              </a>
            ))}
          </div>
        </Section>
      </main>

      <footer className="border-t border-line py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-5 text-sm text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Marpu Siddardha</p>
          <p>Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </footer>

      {/* Certificate viewer */}
      {current && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
        >
          <div className="relative w-full max-w-4xl" onClick={e => e.stopPropagation()}>
            <div className={`overflow-hidden ${card}`}>
              <div className="flex items-center justify-center bg-paper p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={current.image} alt={current.title} className="max-h-[68vh] w-auto object-contain" />
              </div>
              <div className="flex flex-wrap items-center gap-4 p-5">
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-fg">{current.title}</h3>
                  <p className="text-sm text-muted">{current.issuer}{current.date && ` · ${current.date}`}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => step(-1)} className="rounded-lg border border-line p-2 text-fg hover:bg-surface-2" aria-label="Previous"><ChevronLeft size={18} /></button>
                  <span className="w-14 text-center text-xs text-muted">{(open ?? 0) + 1} / {filtered.length}</span>
                  <button onClick={() => step(1)} className="rounded-lg border border-line p-2 text-fg hover:bg-surface-2" aria-label="Next"><ChevronRight size={18} /></button>
                  <button onClick={() => setOpen(null)} className="ml-2 rounded-lg border border-line p-2 text-fg hover:bg-surface-2" aria-label="Close"><X size={18} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
