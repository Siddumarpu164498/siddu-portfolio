'use client';

import { FormEvent, useState } from 'react';
import { Send } from 'lucide-react';
import { LINKS } from '@/lib/profile';

// No backend: the form composes an email in the visitor's own mail app, so nothing is stored by the site.
export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'Opportunity / Project inquiry', message: '' });
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm(f => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const body = `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ''}`;
    window.location.href = `mailto:${LINKS.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field = 'w-full rounded-xl border border-line bg-bg px-4 py-2.5 text-sm text-fg placeholder:text-muted focus:border-accent/60 focus:outline-none';

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-surface p-6 md:p-7">
      <h3 className="text-lg font-semibold text-fg">Send a message</h3>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-fg">
          Your name
          <input required value={form.name} onChange={set('name')} placeholder="e.g. Hiring Manager" className={`mt-1.5 ${field}`} />
        </label>
        <label className="text-sm font-medium text-fg">
          Your email
          <input type="email" required value={form.email} onChange={set('email')} placeholder="name@company.com" className={`mt-1.5 ${field}`} />
        </label>
      </div>
      <label className="mt-4 block text-sm font-medium text-fg">
        Subject
        <input required value={form.subject} onChange={set('subject')} className={`mt-1.5 ${field}`} />
      </label>
      <label className="mt-4 block text-sm font-medium text-fg">
        Message
        <textarea required rows={5} value={form.message} onChange={set('message')} placeholder="Hi Siddardha, I came across your portfolio…" className={`mt-1.5 resize-none ${field}`} />
      </label>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-opacity hover:opacity-90">
          <Send size={15} /> Send message
        </button>
        <p className="text-xs text-muted">{sent ? 'Your email app should open with the message ready to send.' : 'Opens in your email app — nothing is stored on this site.'}</p>
      </div>
    </form>
  );
}
