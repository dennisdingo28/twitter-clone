import QueryProvider from '@/providers/QueryProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ToasterProivder from '@/providers/ToastProvider'
import AuthProvider from '@/providers/AuthProvider'
import Container from '@/components/ui/container'
import PanelSide from '@/components/HomePage/PanelSide'
import InfoPanel from '@/components/HomePage/InfoPanel'
import { getAuthSession } from '@/lib/authOptions'
import '../../globals.css';

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Twitter Clone',
  description: 'Twitter Clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getAuthSession();
  if(session)
    return (
      <html lang="en">
        <AuthProvider>
          <QueryProvider>
            <ToasterProivder/>
            <body className="bg-black text-white">
              <Container>
                <div className="flex h-screen">
                  <div className="min-w-[100px] ml-0 xs:ml-[5%] md:ml-[10%] max-w-[100%]">
                    <PanelSide/>
                  </div>
                  <div className="flex-1 h-screen overflow-y-scroll contentScroll">
                    {children}
                  </div>
                  <div className="hidden lg:flex flex-1 h-screen overflow-y-hidden">
                    <div className="hidden lg:flex flex-1 justify-center ">
                      <InfoPanel/>
                    </div>
                  </div>
                </div>
              </Container>
            </body>
          </QueryProvider>
        </AuthProvider>
      </html>
    )
  return (
    <html lang="en">
        <AuthProvider>
          <QueryProvider>
            <body>{children}</body>
          </QueryProvider>
        </AuthProvider>
    </html>
  )
}
