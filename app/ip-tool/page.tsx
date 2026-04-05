'use client'
import Link from 'next/link'
import IPToolHero from '@/components/ip-tool/IPToolHero'
import IPToolModules from '@/components/ip-tool/IPToolModules'
import IPToolPricing from '@/components/ip-tool/IPToolPricing'
import IPToolTemplates from '@/components/ip-tool/IPToolTemplates'
import IPToolCTA from '@/components/ip-tool/IPToolCTA'

export default function IPToolPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f7]">
      {/* 顶部导航返回 */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
            <span>←</span>
            <span>返回首页</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-lg">🌟</span>
            <span className="font-bold text-gray-900 text-sm">星识OPC · AI自动化IP工具</span>
          </div>
          <a
            href="#pricing"
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            立即开始
          </a>
        </div>
      </div>

      <IPToolHero />
      <IPToolModules />
      <IPToolTemplates />
      <IPToolPricing />
      <IPToolCTA />
    </main>
  )
}
