'use client'
import { useState } from 'react'

const skillCategories = [
  { id: 'ai-office', name: 'AI办公提效', icon: '💼', kpi: '12.3K+', desc: '提升工作效率10倍', color: 'from-blue-500 to-blue-700' },
  { id: 'ai-visual', name: 'AI视觉', icon: '🎨', manager: '刘老师', kpi: '8.7K+', desc: '电商视觉/爽剧/广告', color: 'from-purple-500 to-purple-700' },
  { id: 'ai-learning', name: 'AI线上学习', icon: '📚', kpi: '5.2K+', desc: '知识付费新模式', color: 'from-orange-500 to-orange-700' },
  { id: 'ai-music', name: 'AI音乐制作', icon: '🎵', kpi: '3.1K+', desc: 'AI音乐创作变现', color: 'from-pink-500 to-pink-700' },
  { id: 'ai-automation', name: 'AI自动化成交', icon: '⚡', manager: '老夏老师', kpi: '6.4K+', desc: '自动化运营产品', color: 'from-yellow-500 to-yellow-700' },
  { id: 'opc-company', name: 'OPC一人AI公司', icon: '🚀', manager: '辰天启', kpi: '9.8K+', desc: '一人成军AI创业', color: 'from-emerald-500 to-emerald-700' },
  { id: 'opc-community', name: 'OPC交流社区', icon: '👥', kpi: '15.2K+', desc: '同频共振共成长', color: 'from-teal-500 to-teal-700' },
  { id: 'ai-investment', name: 'AI商业投资圈', icon: '💰', manager: 'Peter总', kpi: '7.6K+', desc: '顶级商业大佬圈', color: 'from-rose-500 to-rose-700' },
]

const detailContent: Record<string, { title: string; points: string[] }> = {
  'ai-office': { title: 'AI办公提效', points: ['ChatGPT高效提问技巧', '自动化办公流程搭建', 'AI辅助写作与汇报', '数据分析与可视化'] },
  'ai-visual': { title: 'AI视觉创作', points: ['AI电商图片生成', '爽剧/短视频AI拍摄', '商业广告创意策划', 'Midjourney/SD实战'] },
  'ai-learning': { title: 'AI线上学习', points: ['在线课程制作全流程', '知识付费产品设计', 'AI辅助教学工具', '个人IP内容创业'] },
  'ai-music': { title: 'AI音乐制作', points: ['Suno/Udio音乐生成', 'AI配乐商业变现', '音频内容创作', '音乐IP打造'] },
  'ai-automation': { title: 'AI自动化成交', points: ['定制AI自动化运营', 'AI销售机器人搭建', '私域流量自动化', '成交漏斗AI优化'] },
  'opc-company': { title: 'OPC一人AI公司', points: ['AI工具IP建立方法论', '个人天赋挖掘与变现', '一人公司运营体系', 'OpenClaw实战应用'] },
  'opc-community': { title: 'OPC交流社区', points: ['AI技能交流圈子', '同频学习社群', '案例分享与复盘', '合作对接机会'] },
  'ai-investment': { title: 'AI商业投资圈', points: ['AI项目投资逻辑', '顶级商业大佬资源', 'AI赛道前沿洞察', '商业合作对接'] },
}

export default function SkillCardsGrid() {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const openModal = (id: string) => setActiveModal(id)
  const closeModal = () => setActiveModal(null)
  const detail = activeModal ? detailContent[activeModal] : null
  const activeCat = activeModal ? skillCategories.find(c => c.id === activeModal) : null

  return (
    <>
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-widest text-emerald-600 uppercase mb-3">Capabilities</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">八大AI赋能板块</h2>
          <p className="text-gray-500 text-lg">选择你的AI成长赛道，开启智能进化之旅</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => openModal(cat.id)}
              onMouseEnter={() => setHoveredCard(cat.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`
                group relative bg-white rounded-3xl border border-gray-100 p-6 text-left
                transition-all duration-300 ease-out cursor-pointer
                ${hoveredCard === cat.id
                  ? 'shadow-2xl border-transparent -translate-y-1 scale-[1.02]'
                  : 'shadow-sm hover:shadow-lg'}
              `}
            >
              {/* Color accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-3xl bg-gradient-to-r ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="text-4xl mb-4 transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-3">{cat.icon}</div>
              <h3 className="font-bold text-gray-900 text-sm mb-1 leading-snug">{cat.name}</h3>
              {cat.manager && (
                <p className="text-xs text-emerald-600 mb-1 font-medium">👤 {cat.manager}</p>
              )}
              <p className="text-xs text-gray-400 mb-4 leading-relaxed">{cat.desc}</p>
              <div className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${cat.color}`}>
                {cat.kpi}
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs text-gray-400 group-hover:text-emerald-600 transition-colors duration-200">
                <span>了解详情</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Modal — Apple-style sheet */}
      {activeModal && detail && activeCat && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-md bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8 animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${activeCat.color} flex items-center justify-center text-3xl shadow-lg`}>
                {activeCat.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{detail.title}</h3>
                {activeCat.manager && <p className="text-sm text-emerald-600 font-medium">👤 {activeCat.manager}</p>}
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {detail.points.map((p, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 text-sm">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${activeCat.color} flex-shrink-0`} />
                  {p}
                </li>
              ))}
            </ul>

            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className={`flex-1 py-3.5 rounded-full bg-gradient-to-r ${activeCat.color} text-white font-semibold text-sm hover:opacity-90 active:scale-95 transition-all shadow-md`}
              >
                立即加入
              </button>
              <button
                onClick={closeModal}
                className="px-5 py-3.5 rounded-full bg-gray-100 text-gray-600 font-semibold text-sm hover:bg-gray-200 active:scale-95 transition-all"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
      `}</style>
    </>
  )
}
