'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Zap,
  Rocket,
  Briefcase,
  Bot,
  Palette,
  BookOpen,
  Trophy,
  Users,
  Phone,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet'

// ─── Nav Data ───────────────────────────────────────────────────────────────

const navGroups = [
  {
    label: '首页概览',
    items: [
      { name: '首页', href: '/', icon: Home },
    ],
  },
  {
    label: '五大课程板块',
    items: [
      { name: '全自动化AI交付', href: '/courses/full-auto', icon: Zap },
      { name: 'OPC一人AI公司', href: '/courses/opc-company', icon: Rocket },
      { name: 'AI商业', href: '/courses/ai-business', icon: Briefcase },
      { name: 'AI编程', href: '/courses/ai-coding', icon: Bot },
      { name: 'AI视觉', href: '/courses/ai-visual', icon: Palette },
    ],
  },
  {
    label: '价格体系',
    items: [
      { name: '课程总览&定价', href: '/courses', icon: BookOpen },
    ],
  },
  {
    label: '成功案例',
    items: [
      { name: '案例与背书', href: '/cases', icon: Trophy },
    ],
  },
  {
    label: '加入我们',
    items: [
      { name: '关于果冻OPC', href: '/about', icon: Users },
      { name: '立即咨询', href: '/contact', icon: Phone, highlight: true },
    ],
  },
]

// ─── Shared Nav Content ──────────────────────────────────────────────────────

function NavContent({
  collapsed,
  onItemClick,
}: {
  collapsed: boolean
  onItemClick?: () => void
}) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(href + '/')
  }

  const openJelly = () => {
    window.dispatchEvent(new CustomEvent('open-jelly'))
    onItemClick?.()
  }

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable nav groups */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-5">
        {navGroups.map((group) => (
          <div key={group.label}>
            {/* Group label — hidden when collapsed */}
            {!collapsed && (
              <div className="px-3 mb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {group.label}
              </div>
            )}

            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)
                const highlight = (item as { highlight?: boolean }).highlight

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onItemClick}
                    title={collapsed ? item.name : undefined}
                    className={[
                      'flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors',
                      collapsed ? 'justify-center' : '',
                      active
                        ? 'bg-green-50 text-green-700 font-semibold'
                        : highlight
                        ? 'bg-green-500 text-white font-semibold hover:bg-green-600'
                        : 'text-gray-700 hover:bg-gray-50',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <Icon
                      size={16}
                      className={[
                        'shrink-0',
                        active ? 'text-green-600' : highlight ? 'text-white' : 'text-gray-400',
                      ].join(' ')}
                    />
                    {!collapsed && <span className="truncate">{item.name}</span>}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom: Jelly AI */}
      <div className="px-2 py-3 border-t border-gray-100">
        <button
          onClick={openJelly}
          title={collapsed ? '果冻AI助手' : undefined}
          className={[
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium',
            'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700',
            'hover:from-green-100 hover:to-emerald-100 transition-colors',
            collapsed ? 'justify-center' : '',
          ].join(' ')}
        >
          <Sparkles size={16} className="shrink-0 text-green-500" />
          {!collapsed && <span>果冻AI助手</span>}
        </button>
      </div>
    </div>
  )
}

// ─── Desktop SideNav ─────────────────────────────────────────────────────────

export function SideNav() {
  const [collapsed, setCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem('sidenav-collapsed')
      if (stored !== null) setCollapsed(stored === 'true')
    } catch {
      // ignore SSR / private-mode errors
    }
  }, [])

  const toggleCollapsed = () => {
    const next = !collapsed
    setCollapsed(next)
    try {
      localStorage.setItem('sidenav-collapsed', String(next))
    } catch {
      // ignore
    }
  }

  // Avoid hydration mismatch — render collapsed=false until mounted
  const effectiveCollapsed = mounted ? collapsed : false

  return (
    <aside
      style={{ width: effectiveCollapsed ? 60 : 220 }}
      className={[
        'hidden md:flex flex-col',
        'sticky top-0 h-screen overflow-hidden',
        'bg-white/95 backdrop-blur-xl border-r border-gray-100',
        'transition-all duration-300 shrink-0',
      ].join(' ')}
    >
      {/* Header: logo + collapse toggle */}
      <div
        className={[
          'flex items-center h-14 px-3 border-b border-gray-100 shrink-0',
          effectiveCollapsed ? 'justify-center' : 'justify-between',
        ].join(' ')}
      >
        {!effectiveCollapsed && (
          <Link
            href="/"
            className="font-bold text-base text-gray-900 tracking-tight hover:opacity-80 transition-opacity"
          >
            <span className="text-green-500">灵犀</span>OPC
          </Link>
        )}
        <button
          onClick={toggleCollapsed}
          className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          aria-label={effectiveCollapsed ? '展开侧边栏' : '收起侧边栏'}
        >
          {effectiveCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Nav content */}
      <NavContent collapsed={effectiveCollapsed} />
    </aside>
  )
}

// ─── Mobile SideNav (Sheet) ──────────────────────────────────────────────────

export function MobileSideNav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('open-sidenav', handler)
    return () => window.removeEventListener('open-sidenav', handler)
  }, [])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left" showCloseButton className="w-[220px] p-0 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-gray-100 shrink-0">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-bold text-base text-gray-900 tracking-tight hover:opacity-80 transition-opacity"
          >
            <span className="text-green-500">灵犀</span>OPC
          </Link>
        </div>

        {/* Nav content */}
        <div className="flex-1 overflow-hidden">
          <NavContent collapsed={false} onItemClick={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  )
}

// Default export = desktop SideNav (layout.tsx uses this)
export default SideNav
