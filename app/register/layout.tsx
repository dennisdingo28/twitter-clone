import AuthProvider from '@/providers/AuthProvider'
import QueryProvider from '@/providers/QueryProvider'
import ToasterProivder from '@/providers/ToastProvider'
import type { Metadata } from 'next'

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
            <body className='text-white'>
                {children}
            </body>
          </QueryProvider>
        </AuthProvider>
      </html>
    )
  }
  