'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import type { User } from '@supabase/supabase-js'

export default function AuthButton() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setLoading(false)
    })

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    setDropdownOpen(false)
    router.refresh()
  }

  if (loading) {
    return (
      <div className="w-20 h-8 rounded-lg bg-gray-100 animate-pulse" />
    )
  }

  if (!user) {
    return (
      <Button
        onClick={() => router.push('/auth')}
        variant="outline"
        size="sm"
        className="h-8 rounded-lg text-xs font-medium border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
      >
        登录 / 注册
      </Button>
    )
  }

  // Logged in: show email prefix + dropdown
  const emailPrefix = user.email ? user.email.split('@')[0] : '用户'

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen((o) => !o)}
        className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors"
      >
        <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs font-semibold">
            {emailPrefix.charAt(0).toUpperCase()}
          </span>
        </div>
        <span className="max-w-[80px] truncate">{emailPrefix}</span>
        <svg
          viewBox="0 0 24 24"
          className={`w-3 h-3 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {dropdownOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setDropdownOpen(false)}
          />
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-1.5 w-36 bg-white rounded-xl shadow-lg shadow-gray-200/60 border border-gray-100 z-50 overflow-hidden">
            <div className="px-3 py-2 border-b border-gray-50">
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full text-left px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              退出登录
            </button>
          </div>
        </>
      )}
    </div>
  )
}
