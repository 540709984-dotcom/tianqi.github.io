'use client'

interface DataItem {
  label: string
  value: string
}

interface SideData {
  title: string
  items: DataItem[]
}

const beforeData: SideData = {
  title: '团队50人+',
  items: [
    { label: '人力成本', value: '42万元/年' },
    { label: '管理效率', value: '低（跨部门协调）' },
    { label: '业务增长', value: '瓶颈期' },
  ],
}

const afterData: SideData = {
  title: '团队30人（裁员1/3）',
  items: [
    { label: '人力成本节省', value: '约120万元' },
    { label: 'AI工具替代', value: '设计/运营/客服/开发80%' },
    { label: '业务增长', value: '解放管理层精力' },
  ],
}

export default function CaseBanner() {
  return (
    <section className="py-20 px-6" style={{ background: '#1a1a2e' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-widest text-amber-400 uppercase mb-3">Real Case</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            温州老板的账单
          </h2>
          <p className="text-gray-400 text-lg">AI重构业务流之前 vs 之后</p>
        </div>

        {/* Before / After comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Before */}
          <div className="rounded-3xl p-8 border border-white/10 bg-white/5 backdrop-blur relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-500 to-gray-600" />
            <div className="inline-block px-3 py-1 rounded-full bg-gray-700 text-gray-300 text-xs font-semibold mb-5">
              之前
            </div>
            <h3 className="text-2xl font-bold text-white mb-6">{beforeData.title}</h3>
            <div className="space-y-5">
              {beforeData.items.map((item, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">{item.label}</span>
                  <span className="text-lg font-semibold text-gray-200">{item.value}</span>
                  <div className="h-px bg-white/10 mt-1" />
                </div>
              ))}
            </div>
          </div>

          {/* After */}
          <div className="rounded-3xl p-8 border border-amber-500/30 bg-gradient-to-br from-amber-950/30 to-orange-950/20 backdrop-blur relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
            <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold mb-5 border border-amber-500/30">
              🚀 之后
            </div>
            <h3 className="text-2xl font-bold text-white mb-6">{afterData.title}</h3>
            <div className="space-y-5">
              {afterData.items.map((item, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="text-xs text-amber-400/80 font-medium uppercase tracking-wide">{item.label}</span>
                  <span className="text-lg font-semibold text-amber-100">{item.value}</span>
                  <div className="h-px bg-amber-500/20 mt-1" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key number highlight */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-6 bg-white/5 rounded-3xl px-10 py-6 border border-white/10">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                120万+
              </div>
              <div className="text-sm text-gray-400 mt-1">年节省人力成本</div>
            </div>
            <div className="w-px h-16 bg-white/10" />
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
                80%
              </div>
              <div className="text-sm text-gray-400 mt-1">岗位AI替代率</div>
            </div>
            <div className="w-px h-16 bg-white/10" />
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-500">
                1/3
              </div>
              <div className="text-sm text-gray-400 mt-1">团队规模缩减</div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-gray-300 text-lg mb-6">
            这套方法论，199元课程里有完整拆解 →
          </p>
          <button className="group px-10 py-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-lg shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all duration-200">
            立即开课
            <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}
