'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  Mail, Phone, MapPin, X, ChevronLeft, ChevronRight, FileText, Menu, ArrowUpRight, Award,
  GraduationCap, Briefcase, Maximize2,
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
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#certificates', label: 'Certificates' },
  { href: '#contact', label: 'Contact' },
];

const SKILLS: { title: string; dot: string; items: string[] }[] = [
  { title: 'Languages', dot: 'bg-sky-400', items: ['Python', 'Java', 'C++', 'C', 'JavaScript', 'TypeScript'] },
  { title: 'AI / ML', dot: 'bg-violet-400', items: ['Machine Learning', 'Deep Learning', 'LLMs', 'RAG', 'FAISS', 'NLP', 'Pandas', 'NumPy'] },
  { title: 'Web', dot: 'bg-emerald-400', items: ['React', 'Next.js', 'Django', 'FastAPI', 'Tailwind CSS', 'HTML / CSS'] },
  { title: 'Data & Cloud', dot: 'bg-amber-400', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Git', 'Linux', 'ServiceNow'] },
];

const EXPERIENCE = [
  {
    role: 'Associate ML Engineer', org: 'Brightcone.ai', date: 'Aug 2026 – Present', current: true,
    text: 'Building machine learning systems, data pipelines and AI/LLM-powered solutions.',
  },
  {
    role: 'Machine Learning Intern', org: 'Brightcone.ai', date: 'Jun – Jul 2026',
    text: 'Machine learning internship focused on AI engineering and production-ready ML workflows.',
  },
  {
    role: 'Machine Learning Intern', org: 'Yanthraa Information Systems', date: 'May 2025',
    text: 'Enterprise LLM infrastructure: data ingestion, privacy-aware masking, FAISS semantic search and GPT-4 integration.',
  },
  {
    role: 'Certified ServiceNow Intern', org: 'ServiceNow Virtual Internship', date: 'May 2025',
    text: 'ITSM fundamentals: incident management, automated workflows, UI policy scripting and instance configuration.',
  },
];

const PROJECTS = [
  {
    name: 'Holocron', tagline: 'Enterprise LLM infrastructure',
    text: 'Secure, customizable LLM platform with ingestion pipelines, HIPAA/GDPR-aware data masking, embeddings, FAISS semantic search and GPT-4 integration.',
    tech: ['Python', 'React', 'TypeScript', 'FAISS', 'GPT-4'],
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
    name: 'siddu-portfolio', tagline: 'This website', href: `${LINKS.github}/siddu-portfolio`,
    text: 'Personal portfolio built with Next.js, TypeScript and Tailwind CSS, deployed on Vercel.',
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
  },
];

const CATEGORY_DOT: Record<CertCategory, string> = {
  'Awards & Research': 'bg-amber-400',
  Internships: 'bg-violet-400',
  Cybersecurity: 'bg-emerald-400',
  Courses: 'bg-sky-400',
  'Events & Community': 'bg-pink-400',
};

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

function Section({ id, label, title, children }: { id?: string; label: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 py-20 md:py-24 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-5">
        <p className="text-sm font-medium tracking-wide text-sky-400">{label}</p>
        <h2 className="mt-2 mb-10 text-3xl md:text-4xl font-semibold tracking-tight text-white">{title}</h2>
        {children}
      </div>
    </section>
  );
}

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
  const paper = certificates.find(c => c.title.includes('IEEE WAMS'));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 antialiased">
      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-slate-950/80 backdrop-blur-lg">
        <div className="max-w-5xl mx-auto px-5 flex h-16 items-center justify-between">
          <a href="#" className="font-semibold text-white tracking-tight">
            Marpu Siddardha<span className="text-sky-400">.</span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map(n => (
              <a key={n.href} href={n.href} className="text-sm text-slate-400 hover:text-white transition-colors">{n.label}</a>
            ))}
          </nav>
          <button className="md:hidden -mr-2 p-2 text-slate-300" onClick={() => setMenuOpen(m => !m)} aria-label="Toggle menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="md:hidden border-t border-white/5 px-5 py-4 flex flex-col gap-4">
            {NAV.map(n => (
              <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="text-slate-300">{n.label}</a>
            ))}
          </nav>
        )}
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 -top-40 h-[30rem] bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.15),transparent_60%)]" aria-hidden="true" />
          <div className="relative max-w-5xl mx-auto px-5 pt-20 pb-24 md:pt-28 md:pb-32 grid md:grid-cols-[1fr_auto] gap-12 items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Associate ML Engineer at Brightcone.ai
              </p>
              <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[1.1]">
                Hi, I&apos;m{' '}
                <span className="bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">Siddardha</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-400">
                Software &amp; ML engineer building practical machine learning systems, data-driven applications and
                AI/LLM-powered products with Python, TypeScript and the cloud.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#contact" className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-slate-200 transition-colors">
                  Get in touch
                </a>
                <a href="#certificates" className="rounded-lg border border-white/15 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/5 transition-colors">
                  View certificates
                </a>
                <div className="flex items-center gap-1 ml-1">
                  <a href={LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2.5 text-slate-400 hover:text-white transition-colors"><GithubIcon /></a>
                  <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2.5 text-slate-400 hover:text-white transition-colors"><LinkedinIcon /></a>
                  <a href={`mailto:${LINKS.email}`} aria-label="Email" className="p-2.5 text-slate-400 hover:text-white transition-colors"><Mail size={18} /></a>
                </div>
              </div>
            </div>
            <div className="mx-auto md:mx-0">
              <div className="rounded-3xl bg-gradient-to-br from-sky-400/60 to-violet-500/60 p-[2px]">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SIDDU_PIC-x5myYHywQdvkjuUzGns7OZzLo3pXQQ.jpg"
                  alt="Marpu Siddardha"
                  width={288}
                  height={288}
                  className="h-56 w-56 md:h-72 md:w-72 rounded-[22px] object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="relative max-w-5xl mx-auto px-5 pb-20">
            <dl className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5 rounded-2xl border border-white/10 bg-white/[0.02]">
              {[
                { v: '9.16', l: 'B.Tech CGPA' },
                { v: String(certificates.length), l: 'Certificates' },
                { v: '1', l: 'IEEE paper presented' },
                { v: '1st', l: 'SQL Competition' },
              ].map((s, i) => (
                <div key={s.l} className={`px-6 py-5 ${i >= 2 ? 'border-t border-white/5 md:border-t-0' : ''}`}>
                  <dt className="text-xs text-slate-500">{s.l}</dt>
                  <dd className="mt-1 text-2xl font-semibold text-white">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* About: education + skills */}
        <Section id="about" label="About" title="Education & skills">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { t: 'B.Tech, Information Technology', s: 'Aditya Institute of Technology and Management', v: 'CGPA 9.16', d: '2022 – 2026' },
              { t: 'Intermediate (MPC)', s: 'Gayatri Junior College', v: '86.7%', d: '2022' },
              { t: 'Secondary School Certificate', s: 'Government High School, Santhabommali', v: '600 / 600', d: '2020' },
            ].map(e => (
              <div key={e.t} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <GraduationCap size={20} className="text-sky-400" />
                <h3 className="mt-4 font-semibold text-white">{e.t}</h3>
                <p className="mt-1 text-sm text-slate-400">{e.s}</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="font-medium text-white">{e.v}</span>
                  <span className="text-slate-500">{e.d}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {SKILLS.map(s => (
              <div key={s.title}>
                <h3 className="flex items-center gap-2 text-sm font-medium text-white">
                  <span className={`h-2 w-2 rounded-full ${s.dot}`} /> {s.title}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.items.map(item => (
                    <span key={item} className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-sm text-slate-300">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Experience */}
        <Section id="experience" label="Experience" title="Where I've worked">
          <div className="divide-y divide-white/5 rounded-2xl border border-white/10 bg-white/[0.02]">
            {EXPERIENCE.map(x => (
              <div key={x.role + x.org} className="grid gap-2 p-6 md:grid-cols-[180px_1fr] md:gap-8">
                <p className="text-sm text-slate-500">
                  {x.date}
                  {x.current && <span className="ml-2 rounded bg-emerald-400/10 px-1.5 py-0.5 text-xs font-medium text-emerald-400">Now</span>}
                </p>
                <div>
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <Briefcase size={15} className="text-slate-500" /> {x.role}
                    <span className="font-normal text-slate-400">· {x.org}</span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{x.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Projects + publication */}
        <Section id="projects" label="Work" title="Projects & research">
          {paper && (
            <button
              onClick={() => { setFilter('All'); setOpen(certificates.indexOf(paper)); }}
              className="group mb-6 w-full text-left rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/10 to-sky-500/5 p-6 md:p-8 hover:border-violet-400/40 transition-colors"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-violet-300">Publication · IEEE WAMS 2026</p>
              <h3 className="mt-3 text-xl md:text-2xl font-semibold text-white">
                Single-Head Attention LSTM for Remaining Useful Life Prediction of Lithium-Ion Batteries
              </h3>
              <p className="mt-3 text-sm text-slate-400">
                Presented at the 5th IEEE Wireless, Antenna, and Microwave Symposium, B V Raju Institute of Technology, June 2026.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-violet-300 group-hover:text-violet-200">
                View certificate <ArrowUpRight size={15} />
              </span>
            </button>
          )}
          <div className="grid gap-4 md:grid-cols-2">
            {PROJECTS.map(p => {
              const inner = (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-white">{p.name}</h3>
                      <p className="text-sm text-slate-500">{p.tagline}</p>
                    </div>
                    {p.href && <ArrowUpRight size={18} className="shrink-0 text-slate-500 group-hover:text-white transition-colors" />}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-400">{p.text}</p>
                  <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                    {p.tech.map(t => <span key={t}>{t}</span>)}
                  </div>
                </>
              );
              const cls = 'group block rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.04]';
              return p.href ? (
                <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
              ) : (
                <div key={p.name} className={cls}>{inner}</div>
              );
            })}
          </div>
        </Section>

        {/* Certificates */}
        <Section id="certificates" label="Certificates" title="Certifications & achievements">
          <div className="-mx-5 px-5 mb-8 overflow-x-auto">
            <div className="flex w-max gap-2">
              {(['All', ...certCategories] as const).map(cat => {
                const count = cat === 'All' ? certificates.length : certificates.filter(c => c.category === cat).length;
                const active = filter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => { setFilter(cat); setShowAll(false); }}
                    className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition-colors ${
                      active ? 'bg-white text-slate-950 font-medium' : 'border border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {cat} <span className={active ? 'text-slate-500' : 'text-slate-600'}>{count}</span>
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
                className="group flex flex-col text-left overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors hover:border-white/25"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cert.image} alt={cert.title} loading="lazy" className="absolute inset-0 h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-[1.03]" />
                  <span className="absolute right-3 top-3 rounded-md bg-slate-950/70 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100">
                    <Maximize2 size={14} />
                  </span>
                  {cert.featured && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-slate-950/80 px-2 py-1 text-xs font-medium text-amber-300">
                      <Award size={12} /> Highlight
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-medium leading-snug text-white">{cert.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">{cert.issuer}</p>
                  <div className="mt-auto pt-4 flex items-center justify-between text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <span className={`h-1.5 w-1.5 rounded-full ${CATEGORY_DOT[cert.category]}`} /> {cert.category}
                    </span>
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
                className="rounded-lg border border-white/15 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/5 transition-colors"
              >
                {showAll ? 'Show less' : `Show all ${filtered.length} certificates`}
              </button>
            </div>
          )}
        </Section>

        {/* Contact */}
        <Section id="contact" label="Contact" title="Let's work together">
          <p className="-mt-4 mb-10 max-w-xl text-slate-400">
            Open to conversations about machine learning, AI/LLMs, full-stack development and ServiceNow.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { href: `mailto:${LINKS.email}`, icon: <Mail size={18} />, t: 'Email', v: LINKS.email },
              { href: `tel:${LINKS.phone}`, icon: <Phone size={18} />, t: 'Phone', v: '+91 70136 02154' },
              { href: LINKS.linkedin, icon: <LinkedinIcon />, t: 'LinkedIn', v: 'in/siddardha-marpu' },
              { href: LINKS.github, icon: <GithubIcon />, t: 'GitHub', v: 'Siddumarpu164498' },
            ].map(x => (
              <a
                key={x.t}
                href={x.href}
                {...(x.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.04]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-sky-400">{x.icon}</span>
                <span className="min-w-0">
                  <span className="block text-xs text-slate-500">{x.t}</span>
                  <span className="block truncate text-sm font-medium text-white">{x.v}</span>
                </span>
                <ArrowUpRight size={16} className="ml-auto shrink-0 text-slate-600 group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>
          <p className="mt-8 flex items-center gap-2 text-sm text-slate-500">
            <MapPin size={15} /> Srikakulam, Andhra Pradesh, India
          </p>
        </Section>
      </main>

      <footer className="border-t border-white/5 py-8">
        <div className="max-w-5xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Marpu Siddardha</p>
          <p>Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </footer>

      {/* Certificate viewer */}
      {current && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-sm p-4"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
        >
          <div className="relative w-full max-w-4xl" onClick={e => e.stopPropagation()}>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
              <div className="flex items-center justify-center bg-slate-100 p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={current.image} alt={current.title} className="max-h-[68vh] w-auto object-contain" />
              </div>
              <div className="flex flex-wrap items-center gap-4 p-5">
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-white">{current.title}</h3>
                  <p className="text-sm text-slate-400">{current.issuer}{current.date && ` · ${current.date}`}</p>
                </div>
                {current.pdf && (
                  <a href={current.pdf} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-950 hover:bg-slate-200">
                    <FileText size={15} /> Open PDF
                  </a>
                )}
                <div className="flex items-center gap-1">
                  <button onClick={() => step(-1)} className="rounded-lg border border-white/10 p-2 text-white hover:bg-white/5" aria-label="Previous"><ChevronLeft size={18} /></button>
                  <span className="w-14 text-center text-xs text-slate-500">{(open ?? 0) + 1} / {filtered.length}</span>
                  <button onClick={() => step(1)} className="rounded-lg border border-white/10 p-2 text-white hover:bg-white/5" aria-label="Next"><ChevronRight size={18} /></button>
                  <button onClick={() => setOpen(null)} className="ml-2 rounded-lg border border-white/10 p-2 text-white hover:bg-white/5" aria-label="Close"><X size={18} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
