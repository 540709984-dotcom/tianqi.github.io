'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: '首页', href: '/', icon: '🏠' },
  { label: '五大板块', href: '/#skills', icon: '⚡' },
  { label: '数字分身IP', href: '/#digital-human', icon: '🧬' },
  { label: '定价体系', href: '/#pricing', icon: '💎' },
  { label: '课程总览', href: '/courses', icon: '📚' },
  { label: '商业合作', href: '/business', icon: '💼' },
  { label: '联系我们', href: '/contact', icon: '📬' },
];

export default function SideNav() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return false;
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <nav className={`fixed top-0 left-0 h-screen z-50 flex flex-col transition-all duration-500 bg-white/[0.02] backdrop-blur-xl border-r border-white/[0.06] ${collapsed ? 'w-16' : 'w-56'}`}>
      {/* Logo区 */}
      <div className="relative p-5 border-b border-white/[0.06]">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600/80 to-cyan-500/80 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.2)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.35)] transition-shadow duration-500">
            <span className="text-lg">🟣</span>
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <span className="text-base font-bold bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent whitespace-nowrap">果冻OPC</span>
            </div>
          )}
        </Link>
      </div>

      {/* 菜单项 */}
      <div className="flex-1 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-indicator relative flex items-center gap-3 mx-3 px-3 py-3 rounded-xl text-sm transition-all duration-300 ${active ? 'bg-purple-500/10 text-white border-l-2 border-purple-500' : 'text-white/40 hover:text-white/70 hover:bg-white/[0.03]'} ${collapsed ? 'justify-center' : ''}`}
            >
              <span className={`text-lg ${active ? 'drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]' : ''}`}>{item.icon}</span>
              {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
            </Link>
          );
        })}
      </div>

      {/* 折叠按钮 */}
      <div className="p-4 border-t border-white/[0.06]">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center py-2 rounded-lg text-white/30 hover:text-white/50 hover:bg-white/[0.03] transition-all duration-300"
        >
          <span className="text-sm">{collapsed ? '→' : '←'}</span>
        </button>
      </div>
    </nav>
  );
}

// Mobile SideNav
export function MobileSideNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-sidenav', handler);
    return () => window.removeEventListener('open-sidenav', handler);
  }, []);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] text-white/50 hover:text-white/80 transition-all"
        aria-label="打开菜单"
      >
        ☰
      </button>
    );
  }

  return (
    <div className="md:hidden fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="absolute left-0 top-0 bottom-0 w-64 bg-[#030712]/95 backdrop-blur-xl border-r border-white/[0.06] flex flex-col">
        <div className="p-5 border-b border-white/[0.06]">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600/80 to-cyan-500/80 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.2)]">
              <span className="text-lg">🟣</span>
            </div>
            <span className="text-base font-bold bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">果冻OPC</span>
          </Link>
        </div>
        <div className="flex-1 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 mx-3 px-3 py-3 rounded-xl text-sm text-white/40 hover:text-white/70 hover:bg-white/[0.03] transition-all duration-300"
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
