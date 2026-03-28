'use client'
import { useState } from 'react'

interface SkillCategory {
  id: string
  name: string
  icon: string
  tag: string
  kpi: string
  desc: string
  color: string
  badge: string
}

interface DetailItem {
  title: string
  subtitle: string
  price: string
  points: string[]
  cta: string
}

const skillCategories: SkillCategory[] = [
  {
    id: 'full-auto',
    name: '全自动化AI产品交付',
    icon: '⚡',
    tag: '最高变现',
    kpi: '98,000元/年',
    desc: '企业年度陪跑·定制自动化工作流·全年技术兜底',
    color: 'from-amber-500 to-orange-600',
    badge: '🔥 终极变现',
  },
  {
    id: 'opc-company',
    name: 'OPC一人AI公司',
    icon: '🚀',
    tag: '心智核心',
    kpi: '5-10万/月',
    desc: '找到商业模式·AI替代团队·建立增长系统',
    color: 'from-emerald-500 to-teal-600',
    badge: '⭐ 核心灵魂',
  },
  {
    id: 'ai-business',
    name: 'AI商业',
    icon: '💼',
    tag: '现金流主力',
    kpi: '19,800元/天',
    desc: 'AI降本增效实战·跨境全链路SOP·华为体系AI化',
    color: 'from-blue-500 to-indigo-600',
    badge: '💰 变现最快',
  },
  {
    id: 'ai-coding',
    name: 'AI编程',
    icon: '🤖',
    tag: '技术壁垒',
    kpi: 'OpenClaw+n8n',
    desc: '不会代码也能建系统·商业自动化底座',
    color: 'from-violet-500 to-purple-600',
    badge: '🔒 技术护城河',
  },
  {
    id: 'ai-visual',
    name: 'AI视觉',
    icon: '🎨',
    tag: '流量入口',
    kpi: '199元入门',
    desc: 'Lovart.ai+即梦/可灵·商业变现三合一·保底8K/月',
    color: 'from-pink-500 to-rose-600',
    badge: '✨ 流量破圈',
  },
]

const detailContent: Record<string, DetailItem> = {
  'full-auto': {
    title: '全自动化AI产品交付',
    subtitle: '终极变现 · 年度陪跑服务',
    price: '98,000元/年',
    points: [
      '高频1对1业务诊断，专属顾问',
      '企业定制自动化工作流部署',
      '全年技术迭代兜底（新工具第一时间接入）',
      'OpenClaw + n8n 全链路搭建',
      '目标：年省人力成本100万+',
    ],
    cta: '预约企业诊断',
  },
  'opc-company': {
    title: 'OPC一人AI公司',
    subtitle: '核心心智 · 私教+3月陪跑',
    price: '49,800元',
    points: [
      '找到适合你的一人公司商业模式',
      'AI替代设计/运营/客服/开发4类岗位',
      '建立可持续收入增长系统',
      '月营收目标：成熟期5-10万',
      '录播课5,999元 / 私教49,800元',
    ],
    cta: '立即加入',
  },
  'ai-business': {
    title: 'AI商业',
    subtitle: '降本增效实战 · 2天1夜私房课',
    price: '19,800元/天',
    points: [
      '华为BLM战略模型 + AI生成企业战略报告',
      '铁三角销售 + 私域自动化SOP',
      '温州老板案例：50人→30人降本方法论',
      '线下离开时拿到可落地AI转型方案',
      '录播课3,999元 / 私房课19,800元',
    ],
    cta: '了解详情',
  },
  'ai-coding': {
    title: 'AI编程',
    subtitle: '技术壁垒 · 不需要会写代码',
    price: '4,999元录播',
    points: [
      'OpenClaw + n8n 组合拳（市场稀缺）',
      '用自然语言驱动AI搭建商业工具',
      '私域自动化系统·数据看板·内容采集',
      '2天1夜私房课：手把手完成真实项目',
      '录播课4,999元 / 私房课24,800元',
    ],
    cta: '立即开课',
  },
  'ai-visual': {
    title: 'AI视觉',
    subtitle: '流量入口 · 工具+变现+品牌三合一',
    price: '199元起',
    points: [
      'Lovart.ai + 即梦/可灵/海螺专家级实战',
      '电商产品图·短视频·品牌视觉全覆盖',
      '动态视频接单：30-700元/秒',
      '个体学员副业收入保底8,000元/月',
      '录播199元引流 / 私房课16,800元',
    ],
    cta: '199元立即开始',
  },
}

export default function SkillCardsGrid() {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const openModal = (id: string) => setActiveModal(id)
  const closeModal = () => setActiveModal(null)
  const detail = activeModal ? detailContent[activeModal] : null
  const activeCat = activeModal ? skillCategories.find((c) => c.id === activeModal) : null

  return (
    <>
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-widest text-emerald-600 uppercase mb-3">Capabilities</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">五大AI赋能板块</h2>
          <p className="text-gray-500 text-lg">选择你的AI变现赛道，方法论+工具的组合拳</p>
        </div>

        {/* Cards: 2 col on mobile, 3 col on md, then first 2 span on last row for symmetry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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

              {/* Badge */}
              <div className={`inline-block px-2.5 py-1 rounded-full bg-gradient-to-r ${cat.color} text-white text-xs font-semibold mb-4 shadow-sm`}>
                {cat.badge}
              </div>

              <div className="text-4xl mb-3 transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-3">{cat.icon}</div>
              <h3 className="font-bold text-gray-900 text-base mb-1 leading-snug">{cat.name}</h3>
              <p className="text-xs text-gray-400 mb-4 leading-relaxed">{cat.desc}</p>

              <div className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${cat.color}`}>
                {cat.kpi}
              </div>
              <div className="mt-1 text-xs text-gray-400 font-medium">{cat.tag}</div>

              <div className="mt-4 flex items-center gap-1 text-xs text-gray-400 group-hover:text-emerald-600 transition-colors duration-200">
                <span>查看详情</span>
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
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${activeCat.color} flex items-center justify-center text-3xl shadow-lg flex-shrink-0`}>
                {activeCat.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{detail.title}</h3>
                <p className="text-sm text-gray-500">{detail.subtitle}</p>
              </div>
            </div>

            {/* Price highlight */}
            <div className="mb-6">
              <span className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${activeCat.color}`}>
                {detail.price}
              </span>
            </div>

            <ul className="space-y-3 mb-8">
              {detail.points.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${activeCat.color} flex-shrink-0 mt-1.5`} />
                  {p}
                </li>
              ))}
            </ul>

            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className={`flex-1 py-3.5 rounded-full bg-gradient-to-r ${activeCat.color} text-white font-semibold text-sm hover:opacity-90 active:scale-95 transition-all shadow-md`}
              >
                {detail.cta}
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
