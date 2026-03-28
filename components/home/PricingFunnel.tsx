'use client'

interface PricingTier {
  name: string
  price: string
  desc: string
  tag: string
  highlight: boolean
}

const tiers: PricingTier[] = [
  {
    name: '录播引流课',
    price: '¥199',
    desc: '工具认知 + 基础SOP跑通',
    tag: '入门首选',
    highlight: false,
  },
  {
    name: '年度轻会员',
    price: '¥9,800/年',
    desc: 'AI工具前沿更新 + 圈子人脉 + 社群答疑',
    tag: '性价比之选',
    highlight: false,
  },
  {
    name: '线下标准实训',
    price: '¥10,000/天',
    desc: '小班案例实战，通用AI工具链，可落地方案',
    tag: '进阶实战',
    highlight: false,
  },
  {
    name: '线下私房定制',
    price: '¥19,800/天',
    desc: '特定企业业务流现场拆解重构，高度定制',
    tag: '深度定制',
    highlight: true,
  },
  {
    name: '企业年度陪跑',
    price: '¥98,000/年',
    desc: '1v1业务诊断 + 定制工作流 + 全年技术兜底',
    tag: '🔥 最高变现',
    highlight: true,
  },
]

export default function PricingFunnel() {
  return (
    <section className="px-6 py-20 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-widest text-indigo-600 uppercase mb-3">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            从199元到98,000元
          </h2>
          <p className="text-gray-500 text-lg">找到属于你的起点，每一步都有清晰的升级路径</p>
        </div>

        {/* Funnel arrow indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <span className="text-xs text-gray-400 font-medium">入门</span>
          <div className="flex-1 max-w-xs h-px bg-gradient-to-r from-gray-200 via-indigo-300 to-amber-500" />
          <span className="text-xs text-gray-400 font-medium">顶配</span>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`
                relative rounded-3xl p-6 flex flex-col transition-all duration-300
                ${tier.highlight
                  ? 'scale-105 shadow-2xl'
                  : 'bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5'}
              `}
              style={
                tier.highlight
                  ? {
                      background: 'white',
                      border: '2px solid transparent',
                      backgroundClip: 'padding-box',
                      boxShadow: '0 0 0 2px transparent',
                      backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #f59e0b, #f97316, #ec4899)',
                      backgroundOrigin: 'border-box',
                    }
                  : {}
              }
            >
              {/* Recommended badge for highlighted */}
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-bold shadow-lg whitespace-nowrap">
                  推荐
                </div>
              )}

              {/* Step indicator */}
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white ${tier.highlight ? 'bg-gradient-to-br from-amber-500 to-orange-600' : 'bg-gray-200 text-gray-500'}`}>
                  {i + 1}
                </div>
                <span className={`text-xs font-semibold ${tier.highlight ? 'text-orange-600' : 'text-gray-400'}`}>
                  {tier.tag}
                </span>
              </div>

              <h3 className="font-bold text-gray-900 text-base mb-2 leading-snug">{tier.name}</h3>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed flex-1">{tier.desc}</p>

              <div className={`text-2xl font-black tracking-tight ${tier.highlight ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600' : 'text-gray-900'}`}>
                {tier.price}
              </div>

              <button className={`mt-4 w-full py-2.5 rounded-full text-sm font-semibold transition-all duration-200 active:scale-95 ${
                tier.highlight
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:opacity-90 shadow-md shadow-amber-200'
                  : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}>
                {tier.highlight ? '立即咨询' : '了解详情'}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-sm text-gray-400 mt-10">
          所有价格均含税 · 企业定制方案请联系顾问 · 先报199元录播课即可享受升级抵扣
        </p>
      </div>
    </section>
  )
}
