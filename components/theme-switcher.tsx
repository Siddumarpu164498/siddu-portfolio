'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Moon, Palette, Sun } from 'lucide-react';

export const ACCENTS = [
  { id: 'sky', label: 'Sky blue', swatch: '#38bdf8' },
  { id: 'yellow', label: 'Yellow', swatch: '#facc15' },
  { id: 'orange', label: 'Orange', swatch: '#fb923c' },
  { id: 'purple', label: 'Purple', swatch: '#c084fc' },
  { id: 'emerald', label: 'Emerald', swatch: '#34d399' },
] as const;

type Mode = 'dark' | 'light';
type Accent = (typeof ACCENTS)[number]['id'];

function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage can be blocked (private mode); the theme still applies for this visit.
  }
}

export function ThemeSwitcher() {
  const [mode, setMode] = useState<Mode>('dark');
  const [accent, setAccent] = useState<Accent>('sky');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Read what the inline script in layout.tsx already applied.
  useEffect(() => {
    const d = document.documentElement.dataset;
    setMode(d.mode === 'light' ? 'light' : 'dark');
    setAccent((ACCENTS.find(a => a.id === d.accent)?.id ?? 'sky') as Accent);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', esc);
    };
  }, [open]);

  const toggleMode = () => {
    const next = mode === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.mode = next;
    save('mode', next);
    setMode(next);
  };

  const pickAccent = (id: Accent) => {
    document.documentElement.dataset.accent = id;
    save('accent', id);
    setAccent(id);
  };

  const btn = 'flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:text-fg hover:bg-surface-2';

  return (
    <div className="flex items-center gap-2">
      <div className="relative" ref={ref}>
        <button onClick={() => setOpen(o => !o)} className={btn} aria-label="Choose color theme" aria-expanded={open}>
          <Palette size={16} />
        </button>
        {open && (
          <div className="absolute right-0 top-11 z-50 w-48 rounded-xl border border-line bg-surface p-2 shadow-xl shadow-black/20">
            <p className="px-2 pb-2 pt-1 text-xs font-medium text-muted">Color theme</p>
            {ACCENTS.map(a => (
              <button
                key={a.id}
                onClick={() => pickAccent(a.id)}
                className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm text-body hover:bg-surface-2"
              >
                <span className="h-4 w-4 rounded-full ring-1 ring-line" style={{ background: a.swatch }} />
                {a.label}
                {accent === a.id && <Check size={14} className="ml-auto text-accent" />}
              </button>
            ))}
          </div>
        )}
      </div>
      <button onClick={toggleMode} className={btn} aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
        {mode === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    </div>
  );
}
