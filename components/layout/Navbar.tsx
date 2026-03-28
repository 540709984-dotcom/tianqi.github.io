'use client'

import { useState } from 'react'
import Link from 'next/link'
import AuthButton from '@/components/auth/AuthButton'

const courseNav = [
  { name: '全自动化AI产品交付', slug: 'full-auto', icon: '⚡', desc: '98,000元/年企业陪跑' },
  { name: 'OPC一人AI公司', slug: 'opc-company', icon: '🚀', desc: '5-10万/月一人成军' },
  { name: 'AI商业', slug: 'ai-business', icon: '💼', desc: '降本增效实战模型' },
  { name: 'AI编程', slug: 'ai-coding', icon: '🤖', desc: 'OpenClaw+n8n组合拳' },
  { name: 'AI视觉', slug: 'ai-visual', icon: '🎨', desc: '199元起，保底月入8K' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 h-16 bg-white/80 backdrop-blur-xl border-b border-gray-100/60 shadow-sm">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 font-bold text-xl text-gray-900 tracking-tight hover:opacity-80 transition-opacity">
          <span className="text-green-500">灵犀</span>OPC
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">

          {/* 五大板块 dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors py-1">
              五大板块
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown panel */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 py-2 transition-all duration-200 ${
                dropdownOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
              }`}
            >
              {courseNav.map((item) => (
                <Link
                  key={item.slug}
                  href={`/courses/${item.slug}`}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors rounded-xl mx-1"
                >
                  <span className="text-xl mt-0.5">{item.icon}</span>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{item.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Link href="/courses" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
            课程总览
          </Link>
          <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
            关于我们
          </Link>
        </nav>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-3">
          <AuthButton />
          <Link
            href="/contact"
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-full transition-colors shadow-sm"
          >
            立即咨询
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-lg z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">

            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">五大板块</div>
            {courseNav.map((item) => (
              <Link
                key={item.slug}
                href={`/courses/${item.slug}`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg">{item.icon}</span>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.desc}</div>
                </div>
              </Link>
            ))}

            <div className="my-2 border-t border-gray-100" />

            <Link href="/courses" onClick={() => setMobileOpen(false)} className="px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
              课程总览
            </Link>
            <Link href="/about" onClick={() => setMobileOpen(false)} className="px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
              关于我们
            </Link>

            <div className="mt-3 pb-2">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-4 py-3 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-2xl transition-colors"
              >
                立即咨询
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
