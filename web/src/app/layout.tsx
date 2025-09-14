import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sikkim Monasteries - Digital Heritage Platform',
  description: 'Explore the rich cultural heritage of Sikkim\'s monasteries through interactive virtual tours, 3D models, and augmented reality experiences.',
  keywords: ['Sikkim', 'monasteries', 'Buddhist heritage', 'virtual tours', '3D models', 'cultural preservation'],
  authors: [{ name: 'Sikkim Digital Heritage Project' }],
  openGraph: {
    title: 'Sikkim Monasteries - Digital Heritage Platform',
    description: 'Discover the spiritual and architectural beauty of Sikkim\'s monasteries',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          {children}
        </div>
      </body>
    </html>
  )
}