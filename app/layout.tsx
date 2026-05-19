import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SideNav from '@/components/layout/SideNav'
import { MobileSideNav } from '@/components/layout/SideNav'

const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '灵犀OPC — 一人干掉一个团队',
  description: '用AI把人力成本砍掉80%。温州老板50人→30人，跨境电商GMV提升87%。',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#030712] text-slate-200 min-h-screen flex flex-col`}
      >
        <Navbar />
        <MobileSideNav />
        <div className="flex flex-1">
          <SideNav />
          <main className="flex-1 min-w-0 transition-all duration-300">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  )
}
