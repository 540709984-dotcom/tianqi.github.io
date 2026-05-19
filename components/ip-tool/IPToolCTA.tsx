'use client'
import Link from 'next/link'

const MILESTONES = [
  { week: 'W1-2', title: '用户系统 + 数字人克隆', desc: '注册登录 · 上传素材 · 创建分身', status: 'active' },
  { week: 'W3-4', title: '聊天式脚本生成', desc: '疗愈场景对话 · 完整脚本输出', status: 'upcoming' },
  { week: 'W5-6', title: '视频合成 + 基础分发', desc: 'Kling生成视频 · 抖音一键发布', status: 'upcoming' },
]

export default function IPToolCTA() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* MVP进度 */}
        <div className="bg-white/[0.03] rounded-3xl border border-white/5 p-8 mb-8">
          <div className="text-center mb-8">
            <p className="text-sm font-semibold tracking-widest text-violet-400 uppercase mb-2">MVP Roadmap</p>
            <h3 className="text-2xl font-bold text-white">6周完成MVP交付</h3>
          </div>
          <div className="space-y-4">
            {MILESTONES.map((m, i) => (
              <div key={i} className={`flex items-start gap-4 p-4 rounded-2xl transition-colors ${m.status === 'active' ? 'bg-violet-500/10 border border-violet-500/20' : 'bg-white/[0.02]'}`}>
                <div className={`flex-shrink-0 w-14 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${m.status === 'active' ? 'bg-gradient-to-r from-violet-500 to-cyan-500 text-white' : 'bg-white/10 text-slate-500'}`}>
                  {m.week}
                </div>
                <div>
                  <div className={`font-semibold text-sm ${m.status === 'active' ? 'text-violet-300' : 'text-slate-400'}`}>{m.title}</div>
                  <div className="text-xs text-slate-600 mt-0.5">{m.desc}</div>
                </div>
                {m.status === 'active' && (
                  <div className="ml-auto flex-shrink-0 flex items-center gap-1 text-xs text-violet-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                    开发中
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 主CTA */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a0533] via-[#2d0a5c] to-[#1a0533] p-10 text-center">
          {/* 星光背景 */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: Math.random() * 2 + 1 + 'px',
                  height: Math.random() * 2 + 1 + 'px',
                  top: Math.random() * 100 + '%',
                  left: Math.random() * 100 + '%',
                  opacity: Math.random() * 0.5 + 0.1,
                }}
              />
            ))}
          </div>

          <div className="relative z-10">
            <div className="text-4xl mb-4">🌟</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              成为第一批疗愈IP创作者
            </h2>
            <p className="text-violet-300/80 text-base mb-8 max-w-lg mx-auto">
              100名种子用户 · 7日留存率 &gt;40% · NPS &gt;30<br />
              抢占疗愈内容创作的AI先机
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://sekotalk.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-bold text-base hover:from-violet-400 hover:to-cyan-400 transition-all duration-200 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:-translate-y-0.5 active:scale-95"
              >
                免费试用 →
              </a>
              <Link
                href="/"
                className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-semibold text-base hover:bg-white/20 transition-all duration-200"
              >
                返回首页
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
