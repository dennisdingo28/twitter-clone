import QueryProvider from '@/providers/QueryProvider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ToasterProivder from '@/providers/ToastProvider'
import AuthProvider from '@/providers/AuthProvider'
import Container from '@/components/ui/container'

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
      <AuthProvider>
        <QueryProvider>
          <ToasterProivder/>
          <body>{children}</body>
        </QueryProvider>
      </AuthProvider>
    </html>
  )
}
