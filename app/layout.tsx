import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Marpu Siddardha | Software Developer & AI Enthusiast',
  description: 'B.Tech student specializing in full-stack development, AI/LLM infrastructure, and cloud technologies. Passionate about building scalable solutions.',
  keywords: ['developer', 'portfolio', 'AI', 'full-stack', 'software engineer', 'React', 'Python'],
  authors: [{ name: 'Marpu Siddardha' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://siddardha.dev',
    title: 'Marpu Siddardha | Software Developer',
    description: 'B.Tech student with expertise in full-stack development and AI infrastructure',
    siteName: 'Marpu Siddardha Portfolio',
  },
}

export const viewport: Viewport = {
  themeColor: '#2563eb',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background scroll-smooth">
      <body className={`${inter.className} bg-background text-foreground`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
