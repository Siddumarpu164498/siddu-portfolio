import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://siddu-portfolio-sable.vercel.app'),
  title: 'Marpu Siddardha | Associate ML Engineer & Software Engineer',
  description: 'Associate ML Engineer at Brightcone.ai. B.Tech IT student building machine learning systems, AI/LLM infrastructure and full-stack applications.',
  keywords: ['Marpu Siddardha', 'ML engineer', 'portfolio', 'AI', 'LLM', 'full-stack', 'software engineer', 'React', 'Python'],
  authors: [{ name: 'Marpu Siddardha' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://siddu-portfolio-sable.vercel.app',
    title: 'Marpu Siddardha | Associate ML Engineer',
    description: 'Machine learning, AI/LLM infrastructure and full-stack development.',
    siteName: 'Marpu Siddardha Portfolio',
    images: ['/profile.webp'],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#070b14' },
    { media: '(prefers-color-scheme: light)', color: '#f7f8fb' },
  ],
  userScalable: true,
}

// Applies the saved theme before first paint so there is no flash of the wrong colors.
const themeScript = `(function(){try{var d=document.documentElement;var q=new URLSearchParams(location.search);var m=q.get('mode')||localStorage.getItem('mode');if(m!=='light'&&m!=='dark'){m=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}d.dataset.mode=m;d.dataset.accent=q.get('accent')||localStorage.getItem('accent')||'sky'}catch(e){}})()`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={inter.className}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
