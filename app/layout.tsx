import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Marpu Siddardha | Associate ML Engineer & Software Engineer',
  description: 'B.Tech student specializing in full-stack development, AI/LLM infrastructure, and cloud technologies. Passionate about building scalable solutions.',
  keywords: ['developer', 'portfolio', 'AI', 'full-stack', 'software engineer', 'React', 'Python'],
  authors: [{ name: 'Marpu Siddardha' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://siddu-portfolio-sable.vercel.app',
    title: 'Marpu Siddardha | Software Developer',
    description: 'B.Tech student with expertise in full-stack development and AI infrastructure',
    siteName: 'Marpu Siddardha Portfolio',
  },
}

export const viewport: Viewport = {
  themeColor: '#0f172a',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-slate-950 scroll-smooth">
      <body className={`${inter.className} bg-slate-950 text-slate-100`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
