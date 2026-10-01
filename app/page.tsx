'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  ArrowRight, ArrowUpRight, Award, BadgeCheck, Bot, Brain, Briefcase, CheckCircle2, ChevronLeft, ChevronRight, Code2,
  Cpu, FolderGit2, GitBranch, GraduationCap, Layers, Mail, MapPin, Maximize2, Menu, Search, ShieldCheck, Sparkles,
  Trophy, User, Users, X,
} from 'lucide-react';
import { certificates, certCategories, type CertCategory } from '@/lib/certificates';
import {
  ACHIEVEMENTS, EDUCATION, EXPERIENCE, FOCUS, LEADERSHIP, LINKS, MORE_CERTS, PROFILE, PROJECTS, SKILL_CATEGORIES, SKILLS,
  type ProjectCategory, type SkillCategory,
} from '@/lib/profile';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { ContentGuard } from '@/components/content-guard';
import { Chatbot } from '@/components/chatbot';
import { GithubRepos } from '@/components/github-repos';
import { ContactForm } from '@/components/contact-form';

const NAV = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#certificates', label: 'Certificates' },
  { href: '#github', label: 'GitHub' },
  { href: '#contact', label: 'Contact' },
];

const FOCUS_ICONS = [Cpu, Brain, ShieldCheck, Layers];
const PROJECT_FILTERS: ('All' | ProjectCategory)[] = ['All', 'AI & ML', 'Full Stack', 'Platforms'];
const PROJECT_ICON: Record<ProjectCategory, typeof Brain> = { 'AI & ML': Brain, 'Full Stack': Code2, Platforms: Layers };
const PAGE_SIZE = 9;
const card = 'rounded-2xl border border-line bg-surface';

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

function Section({ id, icon: Icon, label, title, intro, children }: {
  id?: string; icon: typeof User; label: string; title: string; intro?: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-line py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
            <Icon size={13} /> {label}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-fg md:text-4xl">{title}</h2>
          {intro && <p className="mt-3 text-muted">{intro}</p>}
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

function FilterBar<T extends string>({ options, value, onChange, counts }: {
  options: readonly T[]; value: T; onChange: (v: T) => void; counts?: Record<string, number>;
}) {
  return (
    <div className="-mx-5 overflow-x-auto px-5">
      <div className="flex w-max gap-2">
        {options.map(o => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition-colors ${
              value === o ? 'bg-accent font-semibold text-on-accent' : 'border border-line bg-surface text-muted hover:text-fg'
            }`}
          >
            {o}{counts && <span className="ml-1 opacity-60">{counts[o]}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

function SearchBox({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <label className="relative block w-full sm:w-64">
      <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-line bg-surface py-2 pl-10 pr-3 text-sm text-fg placeholder:text-muted focus:border-accent/60 focus:outline-none"
      />
    </label>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [skillCat, setSkillCat] = useState<'All' | SkillCategory>('All');
  const [skillQuery, setSkillQuery] = useState('');
  const skills = SKILLS.filter(
    s => (skillCat === 'All' || s.category === skillCat) &&
      `${s.name} ${s.note}`.toLowerCase().includes(skillQuery.trim().toLowerCase()),
  );

  const [projCat, setProjCat] = useState<'All' | ProjectCategory>('All');
  const [projQuery, setProjQuery] = useState('');
  const projects = PROJECTS.filter(
    p => (projCat === 'All' || p.category === projCat) &&
      `${p.name} ${p.tagline} ${p.text} ${p.tech.join(' ')}`.toLowerCase().includes(projQuery.trim().toLowerCase()),
  );

  const [certCat, setCertCat] = useState<CertCategory | 'All'>('All');
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const filtered = useMemo(
    () => (certCat === 'All' ? certificates : certificates.filter(c => c.category === certCat)),
    [certCat],
  );
  const visible = showAll ? filtered : filtered.slice(0, PAGE_SIZE);
  const certCounts = useMemo(
    () => Object.fromEntries(['All', ...certCategories].map(c => [c, c === 'All' ? certificates.length : certificates.filter(x => x.category === c).length])),
    [],
  );

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
  const totalCerts = certificates.length + MORE_CERTS.length;

  return (
    <div className="min-h-screen bg-bg text-body">
      <ContentGuard />

      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <a href="#" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-sm font-bold text-on-accent">MS</span>
            <span className="leading-tight">
              <span className="block text-sm font-bold text-fg">{PROFILE.name}</span>
              <span className="block font-mono text-[11px] text-accent">Portfolio</span>
            </span>
          </a>
          <nav className="hidden items-center gap-6 lg:flex">
            {NAV.map(n => (
              <a key={n.href} href={n.href} className="text-sm font-medium text-muted transition-colors hover:text-fg">{n.label}</a>
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
          <nav className="grid grid-cols-2 gap-3 border-t border-line px-5 py-4 lg:hidden">
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
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(60% 50% at 20% 0%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 70%), radial-gradient(40% 40% at 90% 30%, color-mix(in srgb, var(--accent-2) 12%, transparent), transparent 70%)' }}
            aria-hidden="true"
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:py-24 lg:grid-cols-[1.25fr_1fr]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {PROFILE.role}
              </p>
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-fg sm:text-5xl md:text-6xl">
                Hi, I&apos;m{' '}
                <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">{PROFILE.name}</span>
              </h1>
              <p className="mt-5 flex items-start gap-2 text-lg font-medium text-fg md:text-xl">
                <Code2 size={20} className="mt-1 shrink-0 text-accent" /> {PROFILE.headline}
              </p>
              <p className="mt-3 flex items-center gap-2 text-sm text-muted">
                <MapPin size={15} className="text-accent" /> {PROFILE.location}
              </p>
              <p className="mt-5 max-w-xl leading-relaxed">
                Building machine learning systems, enterprise LLM infrastructure and full-stack applications — from data
                ingestion and semantic search to the React and FastAPI apps on top.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#projects" className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-on-accent shadow-lg shadow-black/10 transition-opacity hover:opacity-90">
                  Explore projects <ArrowRight size={16} />
                </a>
                <a href="#contact" className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-5 py-3 text-sm font-semibold text-fg transition-colors hover:bg-surface-2">
                  <Mail size={16} /> Contact me
                </a>
              </div>
              <div className="mt-8 flex items-center gap-3 border-t border-line pt-6">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">Connect:</span>
                {[
                  { href: LINKS.linkedin, icon: <LinkedinIcon />, label: 'LinkedIn' },
                  { href: LINKS.github, icon: <GithubIcon />, label: 'GitHub' },
                  { href: `mailto:${LINKS.email}`, icon: <Mail size={18} />, label: 'Email' },
                ].map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-muted transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Profile card */}
            <div className={`${card} mx-auto w-full max-w-md p-6 shadow-xl shadow-black/10`}>
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <div className="rounded-2xl bg-gradient-to-br from-accent to-accent-2 p-[3px]">
                    <Image src="/profile.webp" alt={PROFILE.name} width={84} height={84} className="h-20 w-20 rounded-[13px] object-cover" priority />
                  </div>
                  <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-surface bg-emerald-500 text-white">
                    <BadgeCheck size={13} />
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-fg">{PROFILE.name}</p>
                  <p className="font-mono text-xs text-accent">@{LINKS.githubUser}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> ML Engineer · Brightcone.ai
                  </p>
                </div>
              </div>
              <dl className="mt-6 grid grid-cols-3 divide-x divide-line rounded-xl border border-line bg-bg/50 py-4 text-center">
                {[
                  { v: '9.16', l: 'CGPA' },
                  { v: `${totalCerts}+`, l: 'Certifications' },
                  { v: 'IEEE', l: 'Paper' },
                ].map(s => (
                  <div key={s.l}>
                    <dd className="text-xl font-bold text-accent">{s.v}</dd>
                    <dt className="mt-0.5 text-xs text-muted">{s.l}</dt>
                  </div>
                ))}
              </dl>
              <p className="mt-6 font-mono text-[11px] font-semibold uppercase tracking-wider text-muted">Primary tech stack:</p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {PROFILE.stack.map(t => (
                  <span key={t} className="rounded-md border border-line bg-surface-2 px-2 py-1 font-mono text-xs text-body">{t}</span>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-xs">
                <span className="text-muted">Looking for code?</span>
                <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-accent hover:underline">
                  github.com/{LINKS.githubUser} <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <Section id="about" icon={User} label="About & focus" title="Building software with purpose" intro="A glimpse into my background and what I care about as an engineer.">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div className="space-y-4">
              <div className={`${card} p-6 leading-relaxed`}>
                <p>
                  I&apos;m an <span className="font-semibold text-fg">Associate ML Engineer at Brightcone.ai</span> and a final-year
                  B.Tech Information Technology student at Aditya Institute of Technology and Management (JNTU-GV), with a
                  CGPA of 9.16.
                </p>
                <p className="mt-4">
                  At Yanthraa Information Systems I helped build Holocron, an enterprise LLM platform with privacy-aware
                  ingestion, FAISS semantic search and GPT-4 responses. I recently presented an IEEE paper on attention-based
                  LSTMs for battery life prediction, and I volunteer with NSS and coordinate internships for my department.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { v: '4', l: 'Roles & internships' },
                  { v: `${totalCerts}+`, l: 'Certifications' },
                  { v: '1st', l: 'SQL Competition' },
                ].map(s => (
                  <div key={s.l} className="rounded-xl border border-accent/20 bg-accent/5 p-4">
                    <p className="text-2xl font-bold text-accent">{s.v}</p>
                    <p className="mt-1 text-xs text-muted">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {FOCUS.map((f, i) => {
                const Icon = FOCUS_ICONS[i];
                return (
                  <div key={f.title} className={`${card} flex gap-4 p-5`}>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent"><Icon size={18} /></span>
                    <div>
                      <h3 className="font-semibold text-fg">{f.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{f.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Section>

        {/* Skills */}
        <Section id="skills" icon={Cpu} label="Technical capabilities" title="Skills & expertise" intro="Languages, frameworks, data and cloud tools I work with.">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <FilterBar options={['All', ...SKILL_CATEGORIES] as const} value={skillCat} onChange={setSkillCat} />
            <SearchBox value={skillQuery} onChange={setSkillQuery} placeholder="Search skills…" />
          </div>
          {skills.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {skills.map(s => (
                <div key={s.name} className={`${card} p-5 transition-colors hover:border-accent/40`}>
                  <p className="flex items-start gap-2 font-semibold text-fg">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" /> {s.name}
                  </p>
                  <p className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-accent">{s.category}</p>
                  <p className="mt-3 text-sm text-muted">{s.note}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-muted">No skills match “{skillQuery}”.</p>
          )}
        </Section>

        {/* Experience & education */}
        <Section id="experience" icon={Briefcase} label="Career history" title="Experience & education" intro="Professional journey, key contributions and academic foundation.">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-fg"><Briefcase size={18} className="text-accent" /> Work experience</h3>
              <ol className="relative space-y-6 border-l-2 border-line pl-6">
                {EXPERIENCE.flatMap(job =>
                  job.roles.map(r => (
                    <li key={job.company + r.title + r.date} className="relative">
                      <span className={`absolute -left-[33px] top-6 h-4 w-4 rounded-full border-[3px] border-bg ${r.current ? 'bg-accent' : 'bg-muted'}`} />
                      <div className={`${card} p-5 md:p-6`}>
                        <div className="flex flex-wrap items-start gap-4">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-white p-1.5">
                            <Image src={job.logo} alt={`${job.company} logo`} width={36} height={36} className="h-full w-full object-contain" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-semibold text-fg">{r.title}</h4>
                            <a href={job.site} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
                              {job.company} <ArrowUpRight size={13} />
                            </a>
                          </div>
                          <div className="text-right">
                            <p className="rounded-md border border-line bg-surface-2 px-2 py-1 font-mono text-[11px] text-muted">{r.date}</p>
                            <p className="mt-1 text-[11px] text-muted">{r.mode}</p>
                          </div>
                        </div>
                        <ul className="mt-4 space-y-2 text-sm leading-relaxed">
                          {r.points.map(p => (
                            <li key={p} className="flex gap-2.5"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-500" />{p}</li>
                          ))}
                        </ul>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {r.tags.map(t => <span key={t} className="rounded-md border border-line bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted">{t}</span>)}
                        </div>
                      </div>
                    </li>
                  )),
                )}
              </ol>
            </div>
            <div>
              <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-fg"><GraduationCap size={18} className="text-accent" /> Education</h3>
              <div className="space-y-4">
                {EDUCATION.map(e => (
                  <div key={e.t} className={`${card} p-5`}>
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-semibold text-fg">{e.t}</h4>
                      <span className="shrink-0 rounded-md border border-line bg-surface-2 px-2 py-1 font-mono text-[11px] text-muted">{e.d}</span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-accent">{e.s}</p>
                    <p className="text-xs text-muted">{e.b}</p>
                    <span className="mt-3 inline-block rounded-md bg-accent/10 px-2 py-1 font-mono text-xs font-semibold text-accent">{e.v}</span>
                    {e.points.length > 0 && (
                      <ul className="mt-3 space-y-1 text-sm text-muted">
                        {e.points.map(p => <li key={p} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />{p}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Projects */}
        <Section id="projects" icon={FolderGit2} label="Showcase & research" title="Featured projects" intro="Production AI work, research and full-stack builds.">
          {paperIndex >= 0 && (
            <button
              onClick={() => { setCertCat('All'); setOpen(paperIndex); }}
              className="group mb-8 w-full rounded-2xl border border-accent/30 p-6 text-left transition-colors hover:border-accent/60 md:p-8"
              style={{ background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 14%, var(--surface)), color-mix(in srgb, var(--accent-2) 8%, var(--surface)))' }}
            >
              <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">Publication · IEEE WAMS 2026</p>
              <h3 className="mt-3 text-xl font-bold text-fg md:text-2xl">
                Single-Head Attention LSTM for Remaining Useful Life Prediction of Lithium-Ion Batteries
              </h3>
              <p className="mt-2 text-sm text-muted">
                Presented at the 5th IEEE Wireless, Antenna, and Microwave Symposium, B V Raju Institute of Technology, June 2026.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">View certificate <ArrowUpRight size={15} /></span>
            </button>
          )}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <FilterBar options={PROJECT_FILTERS} value={projCat} onChange={setProjCat} />
            <SearchBox value={projQuery} onChange={setProjQuery} placeholder="Filter by tech or keyword…" />
          </div>
          {projects.length ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {projects.map(p => {
                const Icon = PROJECT_ICON[p.category];
                return (
                  <div key={p.name} className={`group flex flex-col overflow-hidden ${card} transition-colors hover:border-accent/40`}>
                    <div
                      className="relative flex h-28 items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 20%, var(--surface-2)), color-mix(in srgb, var(--accent-2) 14%, var(--surface-2)))' }}
                    >
                      <Icon size={36} className="text-accent opacity-80" />
                      <span className="absolute left-3 top-3 rounded-md bg-surface/90 px-2 py-1 font-mono text-[10px] font-semibold text-fg">{p.category}</span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-bold text-fg">{p.name}</h3>
                      <p className="text-xs font-medium text-accent">{p.tagline}</p>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.text}</p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {p.tech.map(t => <span key={t} className="rounded-md border border-line bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted">{t}</span>)}
                      </div>
                      {p.href && (
                        <a href={p.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 border-t border-line pt-4 text-sm font-semibold text-accent">
                          <GithubIcon size={15} /> View repository <ArrowUpRight size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-sm text-muted">No projects match “{projQuery}”.</p>
          )}
        </Section>

        {/* Certificates */}
        <Section id="certificates" icon={Award} label="Verified credentials" title="Certifications & achievements" intro={`${totalCerts}+ certifications across ML, cybersecurity, cloud and development. Click any certificate to view it.`}>
          <div className="mb-8">
            <FilterBar options={['All', ...certCategories] as const} value={certCat} onChange={v => { setCertCat(v); setShowAll(false); }} counts={certCounts} />
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
                      <Sparkles size={12} /> Highlight
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-semibold leading-snug text-fg">{cert.title}</h3>
                  <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
                  <div className="mt-auto flex items-center justify-between pt-4 text-xs">
                    <span className="flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400"><BadgeCheck size={13} /> {cert.category}</span>
                    <span className="text-muted">{cert.date}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
          {filtered.length > PAGE_SIZE && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setShowAll(s => !s)}
                className="rounded-xl border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:bg-surface-2"
              >
                {showAll ? 'Show less' : `Show all ${filtered.length} certificates`}
              </button>
            </div>
          )}

          <h3 className="mt-16 text-lg font-semibold text-fg">More certifications</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MORE_CERTS.map(m => (
              <div key={m.t} className={`flex items-start gap-3 ${card} px-5 py-4`}>
                <ShieldCheck size={16} className="mt-0.5 shrink-0 text-accent" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-fg">{m.t}</p>
                  <p className="text-xs text-muted">{m.i} · {m.d}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Awards & leadership */}
          <div
            className="mt-14 grid gap-8 rounded-3xl border border-accent/25 p-6 md:p-10 lg:grid-cols-2"
            style={{ background: 'linear-gradient(120deg, color-mix(in srgb, var(--accent) 16%, var(--surface)), color-mix(in srgb, var(--accent-2) 16%, var(--surface)))' }}
          >
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface/70 px-3 py-1 font-mono text-[11px] font-semibold text-accent">
                <Trophy size={13} /> Awards & leadership
              </span>
              <h3 className="mt-4 text-2xl font-bold text-fg md:text-3xl">Beyond the code</h3>
              <p className="mt-2 text-sm text-body">Competitions, research and community work I&apos;m proud of.</p>
              <ul className="mt-6 space-y-2.5">
                {ACHIEVEMENTS.map(a => (
                  <li key={a} className="flex gap-2.5 text-sm text-fg"><Trophy size={15} className="mt-0.5 shrink-0 text-accent" />{a}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              {LEADERSHIP.map(l => (
                <div key={l} className="flex items-start gap-3 rounded-xl border border-line bg-surface/70 px-4 py-3.5 text-sm text-fg">
                  <Users size={16} className="mt-0.5 shrink-0 text-accent" /> {l}
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* GitHub */}
        <Section id="github" icon={GitBranch} label="GitHub sync" title="Live GitHub repositories" intro={`Fetched directly from github.com/${LINKS.githubUser}.`}>
          <GithubRepos />
        </Section>

        {/* Contact */}
        <Section id="contact" icon={Mail} label="Get in touch" title="Let's build something together" intro="Open to ML engineering roles, collaborations and interesting AI/LLM projects.">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
            <div className={`${card} p-6 md:p-7`}>
              <h3 className="text-lg font-semibold text-fg">Contact details</h3>
              <ul className="mt-5 space-y-4">
                <li className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent"><Mail size={18} /></span>
                  <div><p className="text-xs text-muted">Email</p><a href={`mailto:${LINKS.email}`} className="text-sm font-semibold text-fg hover:text-accent">{LINKS.email}</a></div>
                </li>
                <li className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent"><MapPin size={18} /></span>
                  <div><p className="text-xs text-muted">Location</p><p className="text-sm font-semibold text-fg">{PROFILE.location}</p></div>
                </li>
                <li className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent"><Bot size={18} /></span>
                  <div><p className="text-xs text-muted">Quick questions?</p><p className="text-sm font-semibold text-fg">Ask my AI assistant (bottom right)</p></div>
                </li>
              </ul>
              <p className="mt-6 border-t border-line pt-5 font-mono text-[11px] font-semibold uppercase tracking-wider text-muted">Social profiles:</p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-line bg-surface-2 py-2.5 text-sm font-semibold text-fg hover:border-accent/50"><LinkedinIcon size={16} /> LinkedIn</a>
                <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-line bg-surface-2 py-2.5 text-sm font-semibold text-fg hover:border-accent/50"><GithubIcon size={16} /> GitHub</a>
              </div>
            </div>
            <ContactForm />
          </div>
        </Section>
      </main>

      <footer className="border-t border-line py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 text-sm text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {PROFILE.name}</p>
          <p>Built with Next.js, Tailwind CSS &amp; Claude</p>
        </div>
      </footer>

      <Chatbot />

      {/* Certificate viewer */}
      {current && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
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
