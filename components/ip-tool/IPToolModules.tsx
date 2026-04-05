'use client'
import { useState } from 'react'

const MODULES = [
  {
    id: 'ip-mirror',
    icon: '🪞',
    name: 'IP定位镜',
    color: 'from-violet-500 to-purple-600',
    bgLight: 'from-violet-50 to-purple-50',
    tagColor: 'bg-violet-100 text-violet-700',
    tag: '智能分析',
    desc: '用AI帮你看清自己的IP方向，赛道差异化定位，30天内容日历自动生成',
    features: [
      { label: '人设分析', detail: '输入你的流派风格，输出完整人设标签报告' },
      { label: '赛道诊断', detail: '竞品数据分析 + SWOT，找到差异化策略' },
      { label: '内容规划', detail: '30天内容日历自动生成，热点追踪同步更新' },
    ],
  },
  {
    id: 'digital-forge',
    icon: '🎭',
    name: '数字分身炉',
    color: 'from-indigo-500 to-blue-600',
    bgLight: 'from-indigo-50 to-blue-50',
    tagColor: 'bg-indigo-100 text-indigo-700',
    tag: '形象克隆',
    desc: '上传3分钟视频+5分钟音频，AI复刻你的形象与声纹，打造1:1数字分身',
    features: [
      { label: '形象克隆', detail: '3分钟视频素材 → 1:1数字人模型（HeyGen/SadTalker）' },
      { label: '声纹复刻', detail: '5分钟音频素材 → 个人专属音色模型（Azure TTS）' },
      { label: '动作定制', detail: '疗愈专属动作库：双手合十、缓慢呼吸等' },
    ],
  },
  {
    id: 'content-pipeline',
    icon: '🎬',
    name: '内容流水线',
    color: 'from-pink-500 to-rose-600',
    bgLight: 'from-pink-50 to-rose-50',
    tagColor: 'bg-pink-100 text-pink-700',
    tag: '全链路生成',
    desc: '聊天式自然语言描述 → 完整脚本 → AI多模型视频合成 → 智能剪辑成片',
    features: [
      { label: '聊天式脚本', detail: '像聊天一样描述需求，Agent多轮对话生成专业脚本' },
      { label: '多模型合成', detail: 'Sora2/Kling/Seedance智能调度，场景最优匹配' },
      { label: '智能剪辑', detail: '输入修改指令即可二次剪辑，无需剪辑技能' },
    ],
  },
  {
    id: 'compliance',
    icon: '🛡️',
    name: '合规护法盾',
    color: 'from-emerald-500 to-teal-600',
    bgLight: 'from-emerald-50 to-teal-50',
    tagColor: 'bg-emerald-100 text-emerald-700',
    tag: '风险防护',
    desc: '发布前自动检测敏感词、医疗宣称风险，三级审查确保合规安全',
    features: [
      { label: '敏感词过滤', detail: '实时替换/标记，疗愈场景专属词库' },
      { label: '医疗宣称识别', detail: 'NLP分类模型评估风险等级，高危内容拦截' },
      { label: '人工复核队列', detail: '高风险内容一键提交审核，保留完整操作记录' },
    ],
  },
  {
    id: 'knowledge-hub',
    icon: '💎',
    name: '知识聚宝盆',
    color: 'from-amber-500 to-orange-600',
    bgLight: 'from-amber-50 to-orange-50',
    tagColor: 'bg-amber-100 text-amber-700',
    tag: '资产沉淀',
    desc: '你创作的每一个脚本、每一个数字形象都沉淀为资产，持续学习你的风格',
    features: [
      { label: '脚本沉淀', detail: '历史创作向量化存储，风格复用+模板推荐' },
      { label: '形象管理', detail: '数字人资产统一管理，多账号共享' },
      { label: '反馈迭代', detail: '平台数据反哺内容策略，越用越懂你' },
    ],
  },
  {
    id: 'distributor',
    icon: '🚀',
    name: '一键分发器',
    color: 'from-cyan-500 to-sky-600',
    bgLight: 'from-cyan-50 to-sky-50',
    tagColor: 'bg-cyan-100 text-cyan-700',
    tag: '60+平台',
    desc: '抖音/小红书/B站/视频号等60+平台一键发布，自动裁剪比例、生成封面、优化标签',
    features: [
      { label: '多平台适配', detail: '自动裁剪比例/封面生成/标签优化，匹配各平台规则' },
      { label: '数据追踪', detail: '全平台播放量/互动率/转化率统一看板' },
      { label: '矩阵运营', detail: '多账号批量发布，统一管理，矩阵放大流量' },
    ],
  },
]

export default function IPToolModules() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section id="modules" className="py-20 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <p className="text-sm font-semibold tracking-widest text-violet-600 uppercase mb-3">Core Modules</p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">六大核心模块</h2>
        <p className="text-gray-500 text-lg">数字人克隆 → 脚本生成 → 视频合成 → 合规发布，全链路闭环</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {MODULES.map((mod) => (
          <button
            key={mod.id}
            onClick={() => setActive(active === mod.id ? null : mod.id)}
            className={`
              group relative bg-white rounded-3xl border text-left p-6 transition-all duration-300 ease-out cursor-pointer
              ${active === mod.id
                ? 'border-transparent shadow-2xl -translate-y-1 scale-[1.02]'
                : 'border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5'}
            `}
          >
            {/* 顶部渐变条 */}
            <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-3xl bg-gradient-to-r ${mod.color} ${active === mod.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300`} />

            <div className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold mb-4 ${mod.tagColor}`}>
              {mod.tag}
            </div>

            <div className="text-3xl mb-3 transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-3">
              {mod.icon}
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-2">{mod.name}</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">{mod.desc}</p>

            {/* 展开详情 */}
            {active === mod.id && (
              <div className={`mt-2 p-4 rounded-2xl bg-gradient-to-br ${mod.bgLight} space-y-3`}>
                {mod.features.map((f) => (
                  <div key={f.label} className="flex items-start gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${mod.color} flex-shrink-0 mt-1.5`} />
                    <div>
                      <span className="text-xs font-semibold text-gray-700">{f.label}：</span>
                      <span className="text-xs text-gray-500">{f.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 flex items-center gap-1 text-xs text-gray-400 group-hover:text-violet-600 transition-colors duration-200">
              <span>{active === mod.id ? '收起' : '展开详情'}</span>
              <span className={`transition-transform duration-200 ${active === mod.id ? 'rotate-90' : 'group-hover:translate-x-1'}`}>→</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
