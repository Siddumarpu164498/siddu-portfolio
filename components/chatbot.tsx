'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Bot, Send, Sparkles, X } from 'lucide-react';
import { localAnswer, SUGGESTIONS } from '@/lib/assistant';

type Msg = { role: 'user' | 'assistant'; content: string };

const GREETING: Msg = {
  role: 'assistant',
  content: "Hi! I'm Siddardha's AI assistant. Ask me about his work at Brightcone.ai, projects, skills, research or certifications.",
};

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [offline, setOffline] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, busy]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function ask(text: string) {
    const question = text.trim().slice(0, 1000);
    if (!question || busy) return;
    const next = [...messages, { role: 'user' as const, content: question }];
    setMessages(next);
    setInput('');
    setBusy(true);

    let reply: string | null = null;
    if (!offline) {
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // The greeting is UI-only; the conversation sent to the API starts at the first question.
          body: JSON.stringify({ messages: next.slice(1) }),
        });
        if (res.ok) {
          reply = (await res.json()).reply ?? null;
        } else if (res.status === 503) {
          setOffline(true); // No API key configured: answer from the built-in knowledge base from now on.
        }
      } catch {
        // Network failure: fall through to the offline answer.
      }
    }

    setMessages(m => [...m, { role: 'assistant', content: reply ?? localAnswer(question) }]);
    setBusy(false);
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    ask(input);
  };

  return (
    <>
      {open && (
        <div
          className="fixed bottom-24 right-4 z-50 flex h-[min(560px,calc(100vh-8rem))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-black/30 sm:right-6"
          role="dialog"
          aria-label="Chat with Siddardha's AI assistant"
        >
          <div className="flex items-center gap-3 border-b border-line px-4 py-3">
            <Image src="/profile.webp" alt="" width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-fg">Ask Siddardha&apos;s AI</p>
              <p className="flex items-center gap-1.5 text-xs text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Online · answers about his work
              </p>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-lg p-1.5 text-muted hover:bg-surface-2 hover:text-fg" aria-label="Close chat">
              <X size={18} />
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <p
                  className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user' ? 'rounded-br-md bg-accent text-on-accent' : 'rounded-bl-md bg-surface-2 text-body'
                  }`}
                >
                  {m.content}
                </p>
              </div>
            ))}
            {busy && (
              <div className="flex justify-start">
                <p className="flex gap-1 rounded-2xl rounded-bl-md bg-surface-2 px-4 py-3" aria-label="Assistant is typing">
                  {[0, 150, 300].map(d => (
                    <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" style={{ animationDelay: `${d}ms` }} />
                  ))}
                </p>
              </div>
            )}
            {messages.length === 1 && !busy && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => ask(s)}
                    className="rounded-full border border-line px-3 py-1.5 text-left text-xs text-body transition-colors hover:border-accent/50 hover:text-fg"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-line p-3">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              maxLength={1000}
              placeholder="Ask about skills, projects, experience…"
              className="min-w-0 flex-1 rounded-xl border border-line bg-bg px-3.5 py-2.5 text-sm text-fg placeholder:text-muted focus:border-accent/60 focus:outline-none"
              aria-label="Your question"
            />
            <button
              type="submit"
              disabled={!input.trim() || busy}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-on-accent transition-opacity disabled:opacity-40"
              aria-label="Send"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-5 right-4 z-50 flex items-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-on-accent shadow-lg shadow-black/25 transition-transform hover:scale-105 sm:right-6"
        aria-expanded={open}
        aria-label={open ? 'Close chat' : "Ask Siddardha's AI"}
      >
        {open ? <X size={18} /> : <Bot size={18} />}
        <span className="hidden sm:inline">{open ? 'Close' : "Ask Siddardha's AI"}</span>
        {!open && <Sparkles size={14} className="hidden opacity-80 sm:inline" />}
      </button>
    </>
  );
}
