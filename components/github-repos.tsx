'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Code2, GitFork, Star } from 'lucide-react';
import { LINKS } from '@/lib/profile';

type Repo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  pushed_at: string;
};

type User = { avatar_url: string; bio: string | null; public_repos: number };

// The profile README repo and an empty scratch repo aren't useful to show.
const HIDDEN = new Set([LINKS.githubUser.toLowerCase(), 'git']);

export function GithubRepos() {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const api = `https://api.github.com/users/${LINKS.githubUser}`;
    Promise.all([fetch(api), fetch(`${api}/repos?per_page=100&sort=pushed`)])
      .then(async ([u, r]) => {
        if (!u.ok || !r.ok) throw new Error('GitHub API error');
        setUser(await u.json());
        const list: Repo[] = await r.json();
        setRepos(list.filter(x => !HIDDEN.has(x.name.toLowerCase())).slice(0, 6));
      })
      .catch(() => setFailed(true));
  }, []);

  const card = 'rounded-2xl border border-line bg-surface';

  return (
    <div>
      <div className={`mx-auto mb-8 flex max-w-2xl flex-wrap items-center gap-4 ${card} px-5 py-4`}>
        {user ? (
          <Image src={user.avatar_url} alt="" width={48} height={48} className="h-12 w-12 rounded-full" unoptimized />
        ) : (
          <span className="h-12 w-12 rounded-full bg-surface-2" />
        )}
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-fg">
            {LINKS.githubUser} <span className="text-xs font-normal text-accent">@{LINKS.githubUser}</span>
          </p>
          <p className="truncate text-sm text-muted">{user?.bio ?? 'Software Engineer · Data Science/ML · Full-stack · ServiceNow'}</p>
        </div>
        {user && <span className="rounded-md bg-surface-2 px-2.5 py-1 text-xs text-muted">{user.public_repos} public repos</span>}
        <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-fg hover:text-accent">
          Visit profile <ArrowUpRight size={15} />
        </a>
      </div>

      {failed ? (
        <p className="text-center text-sm text-muted">
          Couldn&apos;t load repositories right now —{' '}
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">view them on GitHub</a>.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(repos ?? Array.from({ length: 6 }, () => null)).map((r, i) =>
            r ? (
              <a key={r.name} href={r.html_url} target="_blank" rel="noopener noreferrer" className={`group flex flex-col ${card} p-5 transition-colors hover:border-accent/40`}>
                <div className="flex items-start justify-between gap-3">
                  <p className="flex min-w-0 items-center gap-2 font-semibold text-fg">
                    <Code2 size={16} className="shrink-0 text-accent" />
                    <span className="truncate">{r.name}</span>
                  </p>
                  <ArrowUpRight size={16} className="shrink-0 text-muted transition-colors group-hover:text-accent" />
                </div>
                <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted">{r.description ?? 'No description provided.'}</p>
                <div className="mt-4 flex items-center gap-4 border-t border-line pt-3 text-xs text-muted">
                  {r.language && (
                    <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-accent" />{r.language}</span>
                  )}
                  <span className="flex items-center gap-1"><Star size={12} />{r.stargazers_count}</span>
                  <span className="flex items-center gap-1"><GitFork size={12} />{r.forks_count}</span>
                  {r.fork && <span className="ml-auto rounded bg-surface-2 px-1.5 py-0.5">fork</span>}
                </div>
              </a>
            ) : (
              <div key={i} className={`h-36 animate-pulse ${card}`} />
            ),
          )}
        </div>
      )}
    </div>
  );
}
