'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const STEPS = [
  { icon: '🎭', label: '数字分身克隆' },
  { icon: '✍️', label: '聊天式脚本生成' },
  { icon: '🎬', label: '多模型视频合成' },
  { icon: '🚀', label: '一键多平台分发' },
]

export default function IPToolHero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 10,
      })
    }
    el.addEventListener('mousemove', handleMove)
    return () => el.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-gradient-to-br from-[#1a0533] via-[#2d0a5c] to-[#1a0533] py-28 px-6"
    >
      {/* 星空背景粒子 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.6 + 0.1,
              animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: Math.random() * 3 + 's',
            }}
          />
        ))}
      </div>

      {/* 渐变光晕 */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none transition-transform duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: `translate(calc(-50% + ${mousePos.x}px), calc(-50% + ${mousePos.y}px))`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* 标签 */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/20 border border-violet-400/30 text-violet-300 text-xs font-semibold mb-8 backdrop-blur-sm">
          <span>🌟</span>
          <span>星识OPC · AI自动化IP工具</span>
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
        </div>

        {/* 主标题 */}
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
          疗愈师的
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-400 to-indigo-400">
            AI视频IP
          </span>
          <br />自动化工厂
        </h1>

        <p className="text-lg text-violet-200/80 mb-4 max-w-2xl mx-auto leading-relaxed">
          零门槛 · 数字分身克隆 · 聊天式脚本 · 多模型视频合成 · 一键分发60+平台
        </p>
        <p className="text-sm text-violet-300/60 mb-12">
          专为疗愈师 / 灵性从业者 / 身心灵内容创作者设计
        </p>

        {/* 核心路径流程 */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {STEPS.map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm">
                <span className="text-xl">{step.icon}</span>
                <span className="text-white text-sm font-medium">{step.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <span className="text-violet-400/50 text-lg font-light hidden sm:block">→</span>
              )}
            </div>
          ))}
        </div>

        {/* CTA 按钮 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://sekotalk.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-bold text-base hover:from-violet-400 hover:to-cyan-400 transition-all duration-200 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:-translate-y-0.5 active:scale-95"
          >
            免费试用 →
          </a>
          <a
            href="#modules"
            className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-semibold text-base hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
          >
            查看全部功能
          </a>
        </div>

        {/* 社会证明数字 */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {[
            { num: '6周', label: 'MVP交付' },
            { num: '60+', label: '分发平台' },
            { num: '50%', label: '毛利率' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-2xl font-black text-white mb-1">{item.num}</div>
              <div className="text-xs text-violet-300/60">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </section>
  )
}
