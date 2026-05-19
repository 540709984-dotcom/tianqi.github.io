'use client'
import { useState } from 'react'

const TEMPLATES = [
  {
    id: 'sleep-meditation',
    name: '睡前冥想',
    duration: '5-10分钟',
    scene: '助眠',
    icon: '🌙',
    color: 'from-indigo-900 to-purple-900',
    elements: ['星空背景', '颂钵音乐', '引导词'],
    desc: '温柔的星空氛围，搭配颂钵共鸣，引导听者放松入眠',
  },
  {
    id: 'morning-awakening',
    name: '晨间唤醒',
    duration: '3-5分钟',
    scene: '能量启动',
    icon: '☀️',
    color: 'from-amber-500 to-orange-600',
    elements: ['阳光背景', '鸟鸣', '正念引导'],
    desc: '阳光与自然声响，为新的一天注入正向能量与意图',
  },
  {
    id: 'emotional-release',
    name: '情绪疏导',
    duration: '8-15分钟',
    scene: '焦虑缓解',
    icon: '💚',
    color: 'from-emerald-600 to-teal-700',
    elements: ['森林背景', '溪流声', '呼吸练习'],
    desc: '沉浸式森林场景，通过呼吸引导释放压力与情绪积压',
  },
  {
    id: 'singing-bowl',
    name: '颂钵疗愈',
    duration: '10-20分钟',
    scene: '深度放松',
    icon: '🔔',
    color: 'from-yellow-600 to-amber-700',
    elements: ['颂钵实拍', '共振音效'],
    desc: '颂钵实拍影像配合精准共振音效，触发深层身体放松',
  },
  {
    id: 'aromatherapy',
    name: '芳疗引导',
    duration: '5-8分钟',
    scene: '精油使用教学',
    icon: '🌿',
    color: 'from-lime-600 to-green-700',
    elements: ['自然背景', '精油特写', '使用步骤'],
    desc: '手把手展示精油调配与使用方法，建立专业信任感',
  },
]

export default function IPToolTemplates() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section className="py-20 px-6 bg-[#0a0a1a]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-widest text-violet-400 uppercase mb-3">Healing Templates</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">疗愈场景专属模板库</h2>
          <p className="text-slate-400 text-lg">MVP阶段5大场景模板，零门槛开始创作</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {TEMPLATES.map((t) => (
            <div
              key={t.id}
              onMouseEnter={() => setHovered(t.id)}
              onMouseLeave={() => setHovered(null)}
              className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 ${
                hovered === t.id ? 'shadow-2xl shadow-violet-500/20 -translate-y-1 scale-[1.03]' : 'shadow-md'
              }`}
            >
              {/* 背景渐变 */}
              <div className={`bg-gradient-to-br ${t.color} p-6 h-full`}>
                <div className="text-4xl mb-3">{t.icon}</div>
                <h3 className="font-bold text-white text-base mb-1">{t.name}</h3>
                <div className="inline-block px-2 py-0.5 rounded-full bg-white/20 text-white/90 text-xs font-medium mb-3">
                  {t.scene}
                </div>
                <p className="text-white/70 text-xs leading-relaxed mb-4">{t.desc}</p>

                {/* 元素标签 */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {t.elements.map((el) => (
                    <span key={el} className="px-2 py-0.5 rounded-full bg-white/15 text-white/80 text-xs">
                      {el}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-xs">{t.duration}</span>
                  <span className={`text-white/80 text-xs transition-transform duration-200 ${hovered === t.id ? 'translate-x-1' : ''}`}>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-slate-500 text-sm mt-8">
          更多模板持续更新中 · 支持自定义场景模板 · <span className="text-violet-400 cursor-pointer hover:underline">提交你的场景需求 →</span>
        </p>
      </div>
    </section>
  )
}
