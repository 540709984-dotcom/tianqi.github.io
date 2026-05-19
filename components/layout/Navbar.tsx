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
  { name: '星识OPC·AI自动化IP', slug: 'ai-ip-tool', icon: '🌟', desc: '数字分身→视频→分发' },
]

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 h-16 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Mobile: SideNav trigger + Logo */}
        <div className="flex items-center gap-2">
          {/* SideNav trigger – mobile only */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-cyan-400 transition-colors"
            onClick={() => window.dispatchEvent(new CustomEvent('open-sidenav'))}
            aria-label="打开侧边栏"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow duration-300">
              <span className="text-white text-lg font-black">灵</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              灵犀<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">OPC</span>
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">

          {/* 五大板块 dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors py-1">
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
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-cyan-500/10 border border-white/5 py-2 transition-all duration-200 ${
                dropdownOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
              }`}
            >
              {courseNav.map((item) => (
                <Link
                  key={item.slug}
                  href={item.slug === 'ai-ip-tool' ? '/ip-tool' : `/courses/${item.slug}`}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition-colors rounded-xl mx-1"
                >
                  <span className="text-xl mt-0.5">{item.icon}</span>
                  <div>
                    <div className="text-sm font-semibold text-white">{item.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Link href="/courses" className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">
            课程总览
          </Link>
          <Link href="/about" className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">
            关于我们
          </Link>
        </nav>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-3">
          <AuthButton />
          <Link
            href="/contact"
            className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-sm font-semibold hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-cyan-500/20"
          >
            立即咨询
          </Link>
        </div>

      </div>

      {/* Mobile menu (fallback — also uses SideNav Sheet) */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0a0f1e]/95 backdrop-blur-xl border-t border-white/5 px-6 py-4 space-y-1">
          {courseNav.map((item) => (
            <Link
              key={item.slug}
              href={item.slug === 'ai-ip-tool' ? '/ip-tool' : `/courses/${item.slug}`}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 py-3 text-slate-300 hover:text-cyan-400 transition-colors font-medium text-sm"
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          ))}
          <Link
            href="/courses"
            onClick={() => setMobileOpen(false)}
            className="block py-3 text-slate-300 hover:text-cyan-400 transition-colors font-medium text-sm"
          >
            课程总览
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            className="block py-3 text-slate-300 hover:text-cyan-400 transition-colors font-medium text-sm"
          >
            关于我们
          </Link>
          <div className="pt-4 flex gap-3">
            <Link
              href="/auth"
              className="flex-1 py-2.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm font-medium text-center"
            >
              登录
            </Link>
            <Link
              href="/contact"
              className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-sm font-semibold text-center"
            >
              立即咨询
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
