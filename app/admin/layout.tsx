'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'

const adminNavItems = [
  { href: '/admin', label: '概览', icon: '📊', exact: true },
  { href: '/admin/homepage', label: '首页配置', icon: '🏠' },
  { href: '/admin/courses', label: '课程管理', icon: '🎓' },
  { href: '/admin/instructors', label: '导师管理', icon: '👨‍🏫' },
  { href: '/admin/cases', label: '成功案例', icon: '🏆' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [checking, setChecking] = useState(true)
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace('/auth?redirect=/admin')
      } else {
        setUserEmail(session.user.email ?? '')
        setChecking(false)
      }
    })
  }, [router])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.replace('/auth')
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-400 text-sm">验证身份中...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Admin Sidebar */}
      <aside className="w-56 shrink-0 bg-white border-r border-gray-100 flex flex-col sticky top-0 h-screen">
        {/* Logo */}
        <div className="h-14 px-5 flex items-center border-b border-gray-100">
          <Link href="/admin" className="font-bold text-base text-gray-900">
            <span className="text-green-500">灵犀</span>OPC
            <span className="ml-2 text-xs font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">管理后台</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {adminNavItems.map((item) => {
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  isActive
                    ? 'bg-green-50 text-green-700 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Bottom: user info + logout */}
        <div className="p-3 border-t border-gray-100">
          <div className="px-3 py-2 mb-1">
            <div className="text-xs text-gray-400 truncate">{userEmail}</div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <span>🚪</span>
            退出登录
          </button>
          <Link
            href="/"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <span>🌐</span>
            查看前台
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 p-8">
        {children}
      </main>
    </div>
  )
}
