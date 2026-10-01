'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  Mail, Phone, MapPin, Award, BookOpen, Briefcase, Sparkles, X, ChevronLeft, ChevronRight,
  FileText, Menu, ExternalLink, GraduationCap, Trophy, Shield, Cloud, Brain, Code, Database, Wrench, ZoomIn,
} from 'lucide-react';
import { certificates, certCategories, type CertCategory } from '@/lib/certificates';

const LINKS = {
  github: 'https://github.com/Siddumarpu164498',
  linkedin: 'https://linkedin.com/in/siddardha-marpu',
  email: 'siddumarpu123@gmail.com',
  phone: '+917013602154',
};

const NAV = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#certificates', label: 'Certificates' },
  { href: '#contact', label: 'Contact' },
];

const ROLES = [
  'Associate ML Engineer',
  'Software Engineer',
  'Machine Learning | Data | Full-Stack',
  'Building with Python, TypeScript & AI/LLMs',
];

const SKILLS: { title: string; icon: typeof Code; color: string; items: string[] }[] = [
  { title: 'Languages', icon: Code, color: 'from-sky-400 to-blue-500', items: ['Python', 'Java', 'C++', 'C', 'JavaScript', 'TypeScript'] },
  { title: 'Web Development', icon: Sparkles, color: 'from-fuchsia-400 to-purple-500', items: ['React.js', 'Next.js', 'Django', 'FastAPI', 'Tailwind CSS', 'HTML/CSS'] },
  { title: 'AI / ML', icon: Brain, color: 'from-violet-400 to-indigo-500', items: ['Machine Learning', 'LLMs', 'RAG', 'FAISS', 'NLP', 'Pandas', 'NumPy', 'Jupyter'] },
  { title: 'Databases', icon: Database, color: 'from-emerald-400 to-teal-500', items: ['MySQL', 'PostgreSQL', 'MongoDB'] },
  { title: 'Cloud & Tools', icon: Wrench, color: 'from-amber-400 to-orange-500', items: ['AWS', 'Docker', 'Git', 'GitHub', 'Linux', 'Vercel', 'VS Code'] },
  { title: 'Platforms', icon: Cloud, color: 'from-rose-400 to-pink-500', items: ['ServiceNow', 'ITSM', 'Workflows', 'UI Policies'] },
];

const EXPERIENCE = [
  {
    role: 'Associate ML Engineer', org: 'Brightcone.ai', date: 'Aug 2026 – Present', current: true,
    text: 'Working on machine learning and AI/LLM engineering — building ML systems, data pipelines and AI-powered solutions.',
  },
  {
    role: 'Machine Learning Intern', org: 'Brightcone.ai', date: 'Jun 2026 – Jul 2026',
    text: 'Machine learning internship focused on AI engineering and production-ready ML workflows.',
  },
  {
    role: 'Machine Learning Intern', org: 'Yanthraa Information Systems Pvt Ltd', date: 'May 2025',
    text: 'Developed enterprise LLM infrastructure: data ingestion, privacy-aware data masking, FAISS semantic search and GPT-4 integration for scalable, secure, context-aware AI systems.',
  },
  {
    role: 'Certified ServiceNow Intern', org: 'ServiceNow Virtual Internship', date: 'May 2025',
    text: 'Hands-on ITSM fundamentals: incident management, automated workflows, UI policy scripting and ServiceNow instance configuration.',
  },
];

const PROJECTS = [
  {
    emoji: '🧠', name: 'Holocron', tagline: 'Enterprise LLM Infrastructure',
    text: 'Secure, customizable LLM infrastructure with data ingestion pipelines, HIPAA/GDPR-aware masking, embeddings, FAISS indexing for semantic search and GPT-4 integration.',
    tech: ['Python', 'React', 'TypeScript', 'FAISS', 'LLM'], color: 'from-sky-500 to-purple-500',
  },
  {
    emoji: '💰', name: 'Budget-bee', tagline: 'Full-Stack Expense Tracker', href: `${LINKS.github}/Budget-bee`,
    text: 'Expense tracker built with React/TypeScript, FastAPI and PostgreSQL featuring OTP authentication and admin approval workflows.',
    tech: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL'], color: 'from-amber-500 to-pink-500',
  },
  {
    emoji: '📊', name: 'Multiverse of 100 DS Projects', tagline: 'Data Science Series', href: `${LINKS.github}/Multiverse_of_100-_data_science_project_series`,
    text: 'A 100-project learning series covering EDA, machine learning and deep learning with Python and Jupyter.',
    tech: ['Python', 'Jupyter', 'Pandas', 'ML', 'DL'], color: 'from-emerald-500 to-sky-500',
  },
  {
    emoji: '🌐', name: 'siddu-portfolio', tagline: 'This website', href: `${LINKS.github}/siddu-portfolio`,
    text: 'Personal portfolio built with Next.js, TypeScript, Tailwind CSS and shadcn/ui, deployed on Vercel.',
    tech: ['Next.js', 'TypeScript', 'Tailwind'], color: 'from-purple-500 to-fuchsia-500',
  },
];

const CATEGORY_STYLE: Record<CertCategory, { icon: typeof Code; chip: string; ring: string }> = {
  'Cloud & Dev': { icon: Cloud, chip: 'bg-sky-500/15 text-sky-300 border-sky-400/30', ring: 'hover:border-sky-400/60 hover:shadow-sky-500/20' },
  Cybersecurity: { icon: Shield, chip: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30', ring: 'hover:border-emerald-400/60 hover:shadow-emerald-500/20' },
  'AI & Internships': { icon: Brain, chip: 'bg-purple-500/15 text-purple-300 border-purple-400/30', ring: 'hover:border-purple-400/60 hover:shadow-purple-500/20' },
  Competitions: { icon: Trophy, chip: 'bg-amber-500/15 text-amber-300 border-amber-400/30', ring: 'hover:border-amber-400/60 hover:shadow-amber-500/20' },
  'Academic & Community': { icon: GraduationCap, chip: 'bg-pink-500/15 text-pink-300 border-pink-400/30', ring: 'hover:border-pink-400/60 hover:shadow-pink-500/20' },
};

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function Typing() {
  const [i, setI] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = ROLES[i];
    if (!deleting && text === full) {
      const t = setTimeout(() => setDeleting(true), 1600);
      return () => clearTimeout(t);
    }
    if (deleting && text === '') {
      setDeleting(false);
      setI((i + 1) % ROLES.length);
      return;
    }
    const t = setTimeout(
      () => setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1)),
      deleting ? 30 : 60,
    );
    return () => clearTimeout(t);
  }, [text, deleting, i]);

  return (
    <span className="font-mono text-sky-400">
      {text}
      <span className="ml-0.5 inline-block w-[2px] h-[1em] align-middle bg-sky-400 animate-pulse" />
    </span>
  );
}

function Wave({ flip = false }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className={`w-full h-16 md:h-24 ${flip ? 'rotate-180' : ''}`} aria-hidden="true">
      <defs>
        <linearGradient id={flip ? 'wave-b' : 'wave-a'} x1="0" x2="1">
          <stop offset="0" stopColor="#38BDF8" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
      </defs>
      <path
        d="M0,64 C240,120 480,0 720,48 C960,96 1200,16 1440,56 L1440,120 L0,120 Z"
        fill={`url(#${flip ? 'wave-b' : 'wave-a'})`}
        opacity="0.9"
      />
    </svg>
  );
}

function SectionTitle({ emoji, title, subtitle }: { emoji: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-3xl md:text-4xl font-bold">
        <span className="mr-2">{emoji}</span>
        <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">{title}</span>
      </h2>
      {subtitle && <p className="mt-3 text-slate-400 max-w-2xl mx-auto">{subtitle}</p>}
      <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-sky-400 to-purple-500" />
    </div>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<CertCategory | 'All'>('All');
  const [open, setOpen] = useState<number | null>(null);

  const visibleCerts = useMemo(
    () => (filter === 'All' ? certificates : certificates.filter(c => c.category === filter)),
    [filter],
  );

  const step = useCallback(
    (d: number) => setOpen(o => (o === null ? o : (o + d + visibleCerts.length) % visibleCerts.length)),
    [visibleCerts.length],
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

  const current = open === null ? null : visibleCerts[open];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-0" aria-hidden="true">
        <div className="absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[24rem] w-[24rem] rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-slate-950/70 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between h-16">
          <a href="#" className="text-xl font-extrabold bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent">
            &lt;MS /&gt;
          </a>
          <div className="hidden md:flex gap-7">
            {NAV.map(n => (
              <a key={n.href} href={n.href} className="text-sm text-slate-300 hover:text-sky-400 transition-colors">{n.label}</a>
            ))}
          </div>
          <button className="md:hidden p-2 text-slate-300" onClick={() => setMenuOpen(m => !m)} aria-label="Toggle menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 px-4 py-3 flex flex-col gap-3 bg-slate-950/95">
            {NAV.map(n => (
              <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="text-slate-300 hover:text-sky-400">{n.label}</a>
            ))}
          </div>
        )}
      </nav>

      <main className="relative z-10">
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 pt-16 md:pt-24 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1.5 text-sm text-sky-300 mb-6">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Associate ML Engineer @ Brightcone.ai
              </p>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
                Hi, I&apos;m{' '}
                <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">Siddardha</span>{' '}
                <span className="inline-block animate-bounce">👋</span>
              </h1>
              <p className="text-xl md:text-2xl mb-6 min-h-[2.5rem]"><Typing /></p>
              <p className="text-base text-slate-400 mb-8 leading-relaxed">
                Passionate about building practical software, machine learning systems, data-driven applications and AI/LLM-powered
                solutions — from Python and ML pipelines to TypeScript, React, Next.js, APIs and the cloud.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="rounded-xl bg-gradient-to-r from-sky-500 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-500/25 hover:scale-105 transition-transform">
                  Get in Touch
                </a>
                <a href="#certificates" className="rounded-xl border border-sky-400/50 px-6 py-3 font-semibold text-sky-300 hover:bg-sky-400/10 transition-colors">
                  View Certificates
                </a>
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg bg-[#0A66C2] px-4 py-2 text-sm font-bold uppercase tracking-wide text-white hover:opacity-90">
                  <LinkedinIcon size={16} /> LinkedIn
                </a>
                <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg bg-[#181717] border border-white/15 px-4 py-2 text-sm font-bold uppercase tracking-wide text-white hover:opacity-90">
                  <GithubIcon size={16} /> GitHub
                </a>
                <a href={`mailto:${LINKS.email}`} className="flex items-center gap-2 rounded-lg bg-rose-500 px-4 py-2 text-sm font-bold uppercase tracking-wide text-white hover:opacity-90">
                  <Mail size={16} /> Email
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-sky-400 via-violet-500 to-fuchsia-500 blur-lg opacity-70 animate-pulse" />
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden border-4 border-slate-950">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SIDDU_PIC-x5myYHywQdvkjuUzGns7OZzLo3pXQQ.jpg"
                    alt="Marpu Siddardha"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { n: '9.16', l: 'B.Tech CGPA', c: 'from-sky-400 to-blue-500' },
              { n: `${certificates.length}+`, l: 'Certificates', c: 'from-violet-400 to-purple-500' },
              { n: '4', l: 'Roles & Internships', c: 'from-emerald-400 to-teal-500' },
              { n: '🥇', l: 'SQL Competition Winner', c: 'from-amber-400 to-orange-500' },
            ].map(s => (
              <div key={s.l} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm">
                <p className={`text-3xl font-extrabold bg-gradient-to-r ${s.c} bg-clip-text text-transparent`}>{s.n}</p>
                <p className="mt-1 text-sm text-slate-400">{s.l}</p>
              </div>
            ))}
          </div>
        </section>

        <Wave />

        {/* Education */}
        <section id="about" className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionTitle emoji="🎓" title="Education" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: 'B.Tech – Information Technology', school: 'Aditya Institute of Technology and Management', k: 'CGPA', v: '9.16 / 10', meta: ['Graduation: 2026', 'JNTUGV, Vizianagaram'], c: 'from-sky-400 to-blue-500' },
              { icon: Award, title: 'Intermediate (MPC)', school: 'Gayatri Junior College', k: 'Grade', v: 'A (86.7%)', meta: ['2022', 'BIE, Andhra Pradesh'], c: 'from-violet-400 to-purple-500' },
              { icon: Award, title: 'Secondary School Certificate', school: 'Government High School, Santhabommali', k: 'Score', v: '600/600 (100%)', meta: ['2020 – First Division', 'BSE, Andhra Pradesh'], c: 'from-fuchsia-400 to-pink-500' },
            ].map(e => (
              <div key={e.title} className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:-translate-y-1 transition-transform">
                <div className={`absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r ${e.c}`} />
                <div className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${e.c} p-3 text-white`}>
                  <e.icon size={24} />
                </div>
                <h3 className="text-lg font-bold mb-1">{e.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{e.school}</p>
                <p className="font-semibold">{e.k}: <span className={`bg-gradient-to-r ${e.c} bg-clip-text text-transparent`}>{e.v}</span></p>
                {e.meta.map(m => <p key={m} className="text-slate-400 text-sm mt-1">{m}</p>)}
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionTitle emoji="🛠️" title="Tech Stack" />
          <div className="mb-10 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://skillicons.dev/icons?i=python,java,cpp,c,js,ts,react,nextjs,django,html,css,tailwind,mysql,postgres,mongodb,aws,docker,git,github,linux,vscode,vercel&perline=11"
              alt="Tech stack icons"
              className="max-w-full"
              loading="lazy"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS.map(s => (
              <div key={s.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <h3 className="mb-4 flex items-center gap-3 font-bold">
                  <span className={`inline-flex rounded-lg bg-gradient-to-br ${s.color} p-2 text-white`}><s.icon size={18} /></span>
                  {s.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {s.items.map(item => (
                    <span key={item} className={`rounded-full bg-gradient-to-r ${s.color} px-3 py-1 text-xs font-semibold text-white shadow-sm`}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="max-w-4xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionTitle emoji="💼" title="Experience" />
          <ol className="relative border-l-2 border-transparent [border-image:linear-gradient(to_bottom,#38BDF8,#A855F7)_1] ml-3 space-y-10">
            {EXPERIENCE.map(x => (
              <li key={x.role + x.org} className="ml-8">
                <span className="absolute -left-[11px] flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-purple-500 ring-4 ring-slate-950" />
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:border-sky-400/40 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-xl font-bold flex items-center gap-2"><Briefcase size={18} className="text-sky-400" /> {x.role}</h3>
                      <p className="text-purple-300 font-semibold mt-1">{x.org}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${x.current ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10 text-slate-300'}`}>
                      {x.date}
                    </span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">{x.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Projects */}
        <section id="projects" className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionTitle emoji="📌" title="Featured Projects" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map(p => {
              const Card = p.href ? 'a' : 'div';
              return (
                <Card
                  key={p.name}
                  {...(p.href ? { href: p.href, target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm hover:-translate-y-1 transition-all"
                >
                  <div className={`absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${p.color} opacity-30 blur-2xl group-hover:opacity-60 transition-opacity`} />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-2xl font-bold"><span className="mr-2">{p.emoji}</span>{p.name}</h3>
                        <p className={`text-sm font-semibold bg-gradient-to-r ${p.color} bg-clip-text text-transparent`}>{p.tagline}</p>
                      </div>
                      {p.href && <ExternalLink size={20} className="text-slate-400 group-hover:text-sky-400" />}
                    </div>
                    <p className="text-slate-400 mb-5 leading-relaxed">{p.text}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.tech.map(t => (
                        <span key={t} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">{t}</span>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        <Wave />

        {/* Certificates */}
        <section id="certificates" className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionTitle
            emoji="🏆"
            title="Certifications & Achievements"
            subtitle="Certifications, internships, courses, competitions and programs across ML, cybersecurity, cloud, programming, web development and ServiceNow. Click any certificate to view it."
          />

          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {(['All', ...certCategories] as const).map(cat => {
              const count = cat === 'All' ? certificates.length : certificates.filter(c => c.category === cat).length;
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    active
                      ? 'bg-gradient-to-r from-sky-500 to-purple-600 text-white shadow-lg shadow-purple-500/25'
                      : 'border border-white/15 bg-white/5 text-slate-300 hover:border-sky-400/50'
                  }`}
                >
                  {cat} <span className={active ? 'text-white/80' : 'text-slate-500'}>({count})</span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleCerts.map((cert, idx) => {
              const style = CATEGORY_STYLE[cert.category];
              return (
                <button
                  key={cert.image}
                  onClick={() => setOpen(idx)}
                  className={`group text-left overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg transition-all hover:-translate-y-1 ${style.ring}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cert.image}
                      alt={cert.title}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/0 opacity-0 transition-all group-hover:bg-slate-950/50 group-hover:opacity-100">
                      <ZoomIn className="text-white" size={32} />
                    </div>
                    {cert.highlight && (
                      <span className="absolute top-3 left-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1 text-xs font-bold text-white shadow">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${style.chip}`}>
                      <style.icon size={12} /> {cert.category}
                    </span>
                    <h3 className="mt-3 font-bold leading-snug">{cert.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{cert.issuer}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* GitHub stats */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionTitle emoji="📈" title="GitHub" />
          <div className="flex flex-col items-center gap-6">
            {/* eslint-disable @next/next/no-img-element */}
            <img src="https://komarev.com/ghpvc/?username=Siddumarpu164498&style=for-the-badge&color=38BDF8" alt="Profile views" loading="lazy" />
            <div className="flex flex-wrap justify-center gap-6">
              <img
                src="https://github-readme-stats.vercel.app/api?username=Siddumarpu164498&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0f172a&rank_icon=github"
                alt="GitHub stats"
                className="max-w-full rounded-2xl"
                loading="lazy"
              />
              <img
                src="https://github-readme-streak-stats.herokuapp.com/?user=Siddumarpu164498&theme=tokyonight&hide_border=true&background=0f172a"
                alt="GitHub streak"
                className="max-w-full rounded-2xl"
                loading="lazy"
              />
            </div>
            {/* eslint-enable @next/next/no-img-element */}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionTitle emoji="🤝" title="Let's Connect" subtitle="Ask me about Python, Machine Learning, AI/LLMs, TypeScript, Full-Stack Development, Git or ServiceNow." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { href: `mailto:${LINKS.email}`, icon: <Mail size={26} />, t: 'Email', v: LINKS.email, c: 'from-rose-400 to-pink-500' },
              { href: `tel:${LINKS.phone}`, icon: <Phone size={26} />, t: 'Phone', v: '+91 7013 602 154', c: 'from-emerald-400 to-teal-500' },
              { href: LINKS.linkedin, icon: <LinkedinIcon size={26} />, t: 'LinkedIn', v: 'siddardha-marpu', c: 'from-sky-400 to-blue-600' },
              { href: LINKS.github, icon: <GithubIcon size={26} />, t: 'GitHub', v: 'Siddumarpu164498', c: 'from-violet-400 to-purple-600' },
            ].map(x => (
              <a
                key={x.t}
                href={x.href}
                {...(x.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm hover:-translate-y-1 hover:border-white/25 transition-all"
              >
                <div className={`mx-auto mb-4 inline-flex rounded-2xl bg-gradient-to-br ${x.c} p-4 text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  {x.icon}
                </div>
                <h3 className="font-bold mb-1">{x.t}</h3>
                <p className="text-slate-400 text-sm break-all">{x.v}</p>
              </a>
            ))}
          </div>
          <p className="mt-8 flex items-center justify-center gap-2 text-slate-400">
            <MapPin size={18} className="text-pink-400" /> Srikakulam, Andhra Pradesh, India
          </p>
          <p className="mt-6 text-center text-lg font-bold">🚀 Build. Learn. Experiment. Repeat.</p>
        </section>
      </main>

      <footer className="relative z-10">
        <Wave flip />
        <div className="bg-slate-950 py-8 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} Marpu Siddardha. All rights reserved.
        </div>
      </footer>

      {/* Certificate lightbox */}
      {current && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
        >
          <div className="relative w-full max-w-4xl" onClick={e => e.stopPropagation()}>
            <button onClick={() => setOpen(null)} className="absolute -top-12 right-0 rounded-full bg-white/10 p-2 text-white hover:bg-white/20" aria-label="Close">
              <X size={22} />
            </button>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">
              <div className="flex max-h-[70vh] items-center justify-center bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={current.image} alt={current.title} className="max-h-[70vh] w-auto object-contain" />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <div>
                  <h3 className="text-lg font-bold">{current.title}</h3>
                  <p className="text-sm text-slate-400">{current.issuer}</p>
                </div>
                <div className="flex items-center gap-2">
                  {current.pdf && (
                    <a href={current.pdf} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-purple-600 px-3 py-2 text-sm font-semibold text-white">
                      <FileText size={16} /> Open PDF
                    </a>
                  )}
                  <span className="text-sm text-slate-500">{(open ?? 0) + 1} / {visibleCerts.length}</span>
                </div>
              </div>
            </div>
            <button onClick={() => step(-1)} className="absolute left-2 top-[35vh] -translate-y-1/2 rounded-full bg-slate-900/80 p-2 text-white hover:bg-slate-800 md:-left-14" aria-label="Previous">
              <ChevronLeft size={26} />
            </button>
            <button onClick={() => step(1)} className="absolute right-2 top-[35vh] -translate-y-1/2 rounded-full bg-slate-900/80 p-2 text-white hover:bg-slate-800 md:-right-14" aria-label="Next">
              <ChevronRight size={26} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
