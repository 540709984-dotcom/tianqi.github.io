'use client'
import { useState, useEffect } from 'react'

const stats = [
  { label: '活跃用户', value: '52K+' },
  { label: '已交付项目', value: '1,200+' },
  { label: '合作讲师', value: '38位' },
  { label: '学员好评率', value: '98%' },
]

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden bg-[#f5f5f7]">
      {/* Apple-style subtle gradient blobs */}
      <div
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #34d399, #059669)',
          transform: mounted ? `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)` : 'none',
          transition: 'transform 0.8s ease-out',
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #818cf8, #6366f1)',
          transform: mounted ? `translate(${mousePos.x * -0.2}px, ${mousePos.y * -0.2}px)` : 'none',
          transition: 'transform 0.8s ease-out',
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 text-center py-24">
        {/* Meta-style eyebrow tag */}
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur border border-gray-200/60 text-emerald-700 px-5 py-2 rounded-full text-sm font-semibold mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          灵犀OPC平台 · 正式上线
        </div>

        {/* Apple-style large headline */}
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight text-gray-900 mb-6">
          一人公司与小微企业的
          <br />
          <span
            className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600"
            style={{
              transform: mounted ? `translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.05}px)` : 'none',
              display: 'inline-block',
              transition: 'transform 0.6s ease-out',
            }}
          >
            AI赋智中枢
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
          学会AI技能 · 找到数字员工 · AI投资规划
        </p>

        {/* CTA Buttons — Apple pill style */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
          <button className="group relative px-10 py-4 rounded-full bg-gray-900 text-white font-semibold text-lg shadow-xl hover:bg-gray-800 active:scale-95 transition-all duration-200 overflow-hidden">
            <span className="relative z-10">立即开始</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 ml-2 transition-transform duration-200 group-hover:translate-x-1 inline-block">→</span>
          </button>
          <button className="px-10 py-4 rounded-full bg-white/80 backdrop-blur border border-gray-200 text-gray-800 font-semibold text-lg hover:bg-white hover:shadow-md active:scale-95 transition-all duration-200">
            了解更多
          </button>
        </div>

        {/* Meta-style stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white/70 backdrop-blur rounded-2xl p-5 border border-white/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="text-2xl font-bold text-gray-900 mb-1">{s.value}</div>
              <div className="text-xs text-gray-500 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        <p className="mt-12 text-sm text-gray-400 tracking-wide">
          灵犀一点启新元，一人成军智共联 ✨
        </p>
      </div>
    </section>
  )
}
