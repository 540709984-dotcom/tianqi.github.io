'use client'
import { useState } from 'react'

const PLANS = [
  {
    id: 'growth',
    name: '成长版',
    price: '¥99',
    period: '/月',
    quota: '20分钟视频',
    unitCost: '¥4.95/分钟',
    badge: '',
    badgeColor: '',
    color: 'from-violet-400 to-purple-500',
    borderColor: 'border-white/10',
    bgColor: 'bg-white/[0.03]',
    desc: '入门疗愈师',
    features: [
      '每月20分钟视频配额',
      '1个数字分身',
      '疗愈场景模板库（全）',
      '聊天式脚本生成',
      '基础合规检测',
      '抖音/小红书发布',
    ],
    cta: '开始成长',
    ctaStyle: 'bg-white/10 text-white hover:bg-white/20 border border-white/10',
  },
  {
    id: 'pro',
    name: '专业版',
    price: '¥299',
    period: '/月',
    quota: '60分钟视频',
    unitCost: '¥4.98/分钟',
    badge: '🔥 最受欢迎',
    badgeColor: 'bg-gradient-to-r from-violet-500 to-cyan-500 text-white',
    color: 'from-violet-500 to-cyan-500',
    borderColor: 'border-violet-500/30',
    bgColor: 'bg-gradient-to-b from-violet-500/10 to-transparent',
    desc: '成熟疗愈师',
    features: [
      '每月60分钟视频配额',
      '3个数字分身',
      '疗愈场景模板库（全）',
      '聊天式脚本生成',
      '专业合规三级审查',
      '60+平台一键分发',
      '全平台数据看板',
      '知识聚宝盆（无限存储）',
    ],
    cta: '立即升级',
    ctaStyle: 'bg-gradient-to-r from-violet-500 to-cyan-500 text-white hover:from-violet-400 hover:to-cyan-400 shadow-lg shadow-violet-500/20',
  },
  {
    id: 'team',
    name: '团体版',
    price: '¥999',
    period: '/月',
    quota: '150分钟+5账号',
    unitCost: '¥6.66/分钟',
    badge: '',
    badgeColor: '',
    color: 'from-indigo-400 to-blue-500',
    borderColor: 'border-white/10',
    bgColor: 'bg-white/[0.03]',
    desc: '培训机构/团体',
    features: [
      '每月150分钟视频配额',
      '5个子账号',
      '10个数字分身',
      '优先客服支持',
      '自定义模板制作',
      '团队数据共享',
      '60+平台矩阵运营',
      '专属IP孵化顾问',
    ],
    cta: '联系我们',
    ctaStyle: 'bg-white/10 text-white hover:bg-white/20 border border-white/10',
  },
]

const ADD_ONS = [
  { name: '积分充值', price: '¥5/积分', note: '1积分=1分钟视频' },
  { name: '数字人定制', price: '¥3,000/个', note: '高级专属定制' },
  { name: 'IP孵化陪跑', price: '¥9,999/期', note: '3个月全流程指导' },
  { name: '合规审查顾问', price: '¥2,000/时', note: '专家一对一咨询' },
]

export default function IPToolPricing() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)

  return (
    <section id="pricing" className="py-20 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <p className="text-sm font-semibold tracking-widest text-violet-400 uppercase mb-3">Pricing</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">订阅制 + 积分制</h2>
        <p className="text-slate-400 text-lg">按需付费，毛利率约50%，你的内容资产永久保留</p>
      </div>

      {/* 套餐卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            onMouseEnter={() => setHoveredPlan(plan.id)}
            onMouseLeave={() => setHoveredPlan(null)}
            className={`
              relative rounded-3xl border-2 p-8 transition-all duration-300
              ${plan.borderColor} ${plan.bgColor}
              ${hoveredPlan === plan.id ? 'shadow-2xl shadow-violet-500/10 -translate-y-1' : 'shadow-sm'}
            `}
          >
            {plan.badge && (
              <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${plan.badgeColor}`}>
                {plan.badge}
              </div>
            )}

            <div className="mb-6">
              <h3 className="font-bold text-white text-xl mb-1">{plan.name}</h3>
              <p className="text-slate-500 text-sm mb-4">{plan.desc}</p>
              <div className="flex items-end gap-1">
                <span className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${plan.color}`}>
                  {plan.price}
                </span>
                <span className="text-slate-500 text-sm mb-1">{plan.period}</span>
              </div>
              <div className="mt-2 flex gap-3">
                <span className="text-xs text-slate-400 bg-white/5 px-2.5 py-1 rounded-full">{plan.quota}</span>
                <span className="text-xs text-slate-500 bg-white/[0.03] px-2.5 py-1 rounded-full">{plan.unitCost}</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-slate-400">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white text-[10px]">✓</span>
                  </div>
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="https://sekotalk.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`block w-full py-3.5 rounded-full font-semibold text-sm text-center transition-all duration-200 active:scale-95 ${plan.ctaStyle}`}
            >
              {plan.cta}
            </a>
          </div>
        ))}
      </div>

      {/* 增值服务 */}
      <div className="bg-white/[0.03] rounded-3xl border border-white/5 p-8">
        <h3 className="font-bold text-white text-xl mb-6 text-center">增值服务</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ADD_ONS.map((item) => (
            <div key={item.name} className="text-center p-4 rounded-2xl bg-white/[0.03] hover:bg-violet-500/10 transition-colors duration-200 cursor-pointer group border border-white/5 hover:border-violet-500/20">
              <div className="font-bold text-white text-sm mb-1 group-hover:text-violet-300 transition-colors">{item.name}</div>
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 font-black text-lg mb-1">{item.price}</div>
              <div className="text-slate-500 text-xs">{item.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
