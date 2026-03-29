'use client'

interface CaseItem {
  emoji: string
  title: string
  metric: string
  desc: string
  tag: string
  color: string
}

const cases: CaseItem[] = [
  {
    emoji: '🏭',
    title: '温州制造业老板',
    metric: '50人 → 30人',
    desc: '通过AI重构业务流，裁掉1/3冗余人力，节省人力成本超120万/年',
    tag: '降本增效',
    color: 'from-amber-500 to-orange-600',
  },
  {
    emoji: '📦',
    title: '跨境电商卖家',
    metric: 'GMV +87%',
    desc: '用AI+铁三角销售体系，不扩招人员，年GMV从200万增至374万',
    tag: 'AI商业落地',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    emoji: '💼',
    title: '企业咨询顾问',
    metric: '成交 1000万',
    desc: '学员用AI+铁三角方法论，完成单笔1000万大单签约',
    tag: '销售爆破',
    color: 'from-emerald-500 to-teal-600',
  },
]

export default function CaseBanner() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-widest text-orange-600 uppercase mb-3">Real Cases</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            真实案例 · 可验证数据
          </h2>
          <p className="text-gray-500 text-lg">每一个数字背后，都是真实跑通的商业路径</p>
        </div>

        {/* Three-column case cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <div
              key={i}
              className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Gradient icon area */}
              <div className={`bg-gradient-to-br ${c.color} p-8 flex flex-col items-center justify-center`}>
                <div className="text-5xl mb-3">{c.emoji}</div>
                <h3 className="text-white font-bold text-lg text-center">{c.title}</h3>
              </div>

              {/* Card body */}
              <div className="p-6 flex flex-col flex-1">
                {/* Metric — big bold */}
                <div className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${c.color} mb-3`}>
                  {c.metric}
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">{c.desc}</p>

                {/* Tag */}
                <div className="mt-auto">
                  <span className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${c.color} text-white text-xs font-semibold`}>
                    {c.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-sm text-gray-400 mt-10">
          以上案例均为真实学员数据 · 可联系顾问索取完整案例报告
        </p>
      </div>
    </section>
  )
}
