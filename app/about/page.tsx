import Link from 'next/link'

const promises = [
  {
    title: '不卖焦虑，卖解决方案',
    desc: '我们只谈落地路径，不制造恐慌。每一套方案都有可验证的结果。',
    icon: '✅',
  },
  {
    title: '不卖工具，卖方法论+工具的组合',
    desc: '工具只是载体，方法论才是核心竞争力。我们把二者打包交付。',
    icon: '🛠️',
  },
  {
    title: '不卖课程，卖陪跑式可落地系统',
    desc: '从入门到变现，全程陪跑。不是看完就结束，而是跑出结果才算完。',
    icon: '🏃',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6">
          关于<span className="text-green-500">灵犀OPC</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
          AI只是省人工的效率杠杆，赚钱的核心永远是行业认知、经验与资源。
          我们不卖暴富神话，只教你用AI建立绝对的效率杠杆。
        </p>
      </section>

      {/* Core Promises */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">三个核心承诺</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promises.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-6 hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-3">{p.icon}</div>
              <h3 className="text-base font-bold text-gray-900 mb-2">{p.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Case Study */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 p-8 md:p-10">
          <div className="text-sm font-semibold text-green-600 mb-2 uppercase tracking-wider">真实案例</div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            温州老板：50人团队用AI压缩至30人
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            某温州跨境电商公司，年营收破亿，却被50人团队的人力成本压得喘不过气。
            接入灵犀OPC全自动化AI产品交付方案后，6个月内将核心岗位从50人精简至30人，
            人力成本降低40%，同期营收增长23%。
          </p>
          <p className="text-sm text-gray-400">
            核心应用：AI选品分析 · 自动化客服 · AI图文生成 · 数据决策系统
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">想知道你的团队能节省多少？</h2>
        <p className="text-gray-500 mb-8">免费企业诊断，30分钟给出AI改造路线图</p>
        <Link
          href="/contact"
          className="inline-block px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full text-base transition-colors shadow-md hover:shadow-lg"
        >
          预约免费企业诊断
        </Link>
      </section>

    </div>
  )
}
