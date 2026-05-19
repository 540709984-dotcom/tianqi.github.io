'use client'
import Link from 'next/link'
import IPToolHero from '@/components/ip-tool/IPToolHero'
import IPToolModules from '@/components/ip-tool/IPToolModules'
import IPToolPricing from '@/components/ip-tool/IPToolPricing'
import IPToolTemplates from '@/components/ip-tool/IPToolTemplates'
import IPToolCTA from '@/components/ip-tool/IPToolCTA'

export default function IPToolPage() {
  return (
    <main className="min-h-screen bg-[#030712]">
      {/* 顶部导航返回 */}
      <div className="sticky top-0 z-40 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors">
            <span>←</span>
            <span>返回首页</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-lg">🌟</span>
            <span className="font-bold text-white text-sm">星识OPC · AI自动化IP工具</span>
          </div>
          <a
            href="https://sekotalk.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            立即开始 →
          </a>
        </div>
      </div>

      <IPToolHero />

      {/* 负责导师 */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">负责导师</h2>
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6 md:p-8 flex gap-5 items-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-3xl shrink-0 shadow-lg">
            🌟
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-1">辰天启导师</h3>
            <p className="text-slate-400 text-sm leading-relaxed">工信部第一批AI导师 · AI基因锁哲学创始人 · 20万IP博主</p>
          </div>
        </div>
      </section>

      <IPToolModules />
      <IPToolTemplates />
      <IPToolPricing />
      <IPToolCTA />
    </main>
  )
}
