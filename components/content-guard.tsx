'use client';

import { useEffect, useState } from 'react';
import { ShieldAlert } from 'lucide-react';

// Deterrents against copying the page: blocks right-click, dragging, common save/print/devtools
// shortcuts, and hides the page while printing or when Print Screen is pressed.
// Browsers cannot block OS-level screenshots, so this discourages rather than prevents capture.
const BLOCKED_COMBOS = ['p', 's', 'u', 'c', 'a', 'x'];
// Editing shortcuts that must keep working inside the chat box and contact form.
const FIELD_COMBOS = ['a', 'c', 'x', 'v', 'z', 'y'];

const inField = (t: EventTarget | null) =>
  t instanceof HTMLElement && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);

export function ContentGuard() {
  const [shield, setShield] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const flash = (ms = 1500) => {
      setShield(true);
      clearTimeout(timer);
      timer = setTimeout(() => setShield(false), ms);
    };

    const onContextMenu = (e: MouseEvent) => e.preventDefault();
    const onDragStart = (e: DragEvent) => e.preventDefault();
    const onCopy = (e: ClipboardEvent) => {
      if (!inField(e.target)) e.preventDefault();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const mod = e.ctrlKey || e.metaKey;
      if (mod && !e.shiftKey && FIELD_COMBOS.includes(key) && inField(e.target)) return;
      if (
        key === 'printscreen' ||
        key === 'f12' ||
        (mod && BLOCKED_COMBOS.includes(key)) ||
        (mod && e.shiftKey && ['i', 'j', 'c', 's', '3', '4', '5'].includes(key))
      ) {
        e.preventDefault();
        e.stopPropagation();
        flash();
      }
    };

    // Print Screen often only fires keyup; also wipe the clipboard it may have filled.
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'printscreen') {
        flash();
        navigator.clipboard?.writeText('').catch(() => {});
      }
    };

    // Snipping tools and screen recorders usually take focus away from the page first.
    const onBlur = () => setShield(true);
    const onFocus = () => setShield(false);
    const onVisibility = () => setShield(document.visibilityState !== 'visible');

    document.addEventListener('contextmenu', onContextMenu);
    document.addEventListener('dragstart', onDragStart);
    document.addEventListener('copy', onCopy);
    document.addEventListener('cut', onCopy);
    window.addEventListener('keydown', onKeyDown, true);
    window.addEventListener('keyup', onKeyUp, true);
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('contextmenu', onContextMenu);
      document.removeEventListener('dragstart', onDragStart);
      document.removeEventListener('copy', onCopy);
      document.removeEventListener('cut', onCopy);
      window.removeEventListener('keydown', onKeyDown, true);
      window.removeEventListener('keyup', onKeyUp, true);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  if (!shield) return null;
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-3 bg-bg text-center" aria-hidden="true">
      <ShieldAlert size={36} className="text-accent" />
      <p className="text-lg font-semibold text-fg">Content protected</p>
      <p className="max-w-xs text-sm text-muted">Screenshots, printing and copying are disabled on this site.</p>
    </div>
  );
}
