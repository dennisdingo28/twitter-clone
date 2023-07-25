import QueryProvider from '@/providers/QueryProvider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Twitter Clone',
  description: 'Twitter Clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <QueryProvider>
        <body className="bg-black text-white">
          {children}
        </body>
      </QueryProvider>
    </html>
  )
}
