'use client';

interface PricingTier {
  name: string;
  price: string;
  period: string;
  desc: string;
  features: string[];
  highlight: boolean;
  cta: string;
}

const TIERS: PricingTier[] = [
  {
    name: '录播引流课',
    price: '¥199',
    period: '一次性',
    desc: '入门首选，快速了解AI自动化商业全貌',
    features: ['5小时录播课程', 'AI工具使用指南', '社群答疑30天', '1次AI诊断'],
    highlight: false,
    cta: '立即报名',
  },
  {
    name: '年度轻会员',
    price: '¥9,800',
    period: '/年',
    desc: '持续学习+实操陪跑，AI落地不走弯路',
    features: ['全部录播课程', '月度直播答疑', '专属社群1年', '4次1对1诊断', '工具折扣权益'],
    highlight: false,
    cta: '加入会员',
  },
  {
    name: '企业年度陪跑',
    price: '¥98,000',
    period: '/年',
    desc: '最高变现，全流程AI改造+持续陪跑',
    features: ['全部课程+直播', '专属顾问1对1', '定制AI方案', '季度复盘4次', '工具全量授权', '优先新功能体验'],
    highlight: true,
    cta: '预约咨询',
  },
  {
    name: '线下私房定制',
    price: '¥19,800',
    period: '/天',
    desc: '深度定制，面对面解决你的AI落地难题',
    features: ['1天线下实训', '定制课程内容', '现场方案设计', '30天线上跟进'],
    highlight: false,
    cta: '预约档期',
  },
];

export default function PricingFunnel() {
  return (
    <section id="pricing" className="relative px-6 py-20">
      {/* 背景光晕 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none" />

      {/* 标题区 */}
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            定价体系
          </span>
        </h2>
        <p className="text-lg text-white/30">从入门到陪跑，选择适合你的AI落地路径</p>
      </div>

      {/* 定价卡片 */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className={`relative rounded-2xl p-7 flex flex-col transition-all duration-500 ${
              tier.highlight
                ? 'bg-gradient-to-b from-purple-600/10 to-cyan-500/5 border border-purple-500/30 shadow-[0_0_40px_rgba(139,92,246,0.15)]'
                : 'glass-card'
            }`}
          >
            {/* 推荐标签 */}
            {tier.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-xs font-semibold text-white">
                最受欢迎
              </div>
            )}

            {/* 名称 */}
            <h3 className={`text-lg font-semibold mb-2 ${tier.highlight ? 'text-white' : 'text-white/80'}`}>
              {tier.name}
            </h3>

            {/* 价格 */}
            <div className="mb-4">
              <span className={`text-4xl font-bold ${
                tier.highlight
                  ? 'bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent'
                  : 'text-white/90'
              }`}>
                {tier.price}
              </span>
              <span className="text-sm text-white/30 ml-1">{tier.period}</span>
            </div>

            {/* 描述 */}
            <p className="text-sm text-white/35 mb-6 leading-relaxed">{tier.desc}</p>

            {/* 功能列表 */}
            <ul className="flex-1 space-y-3 mb-7">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-white/45">
                  <span className={`mt-0.5 ${tier.highlight ? 'text-purple-400' : 'text-cyan-500/60'}`}>✓</span>
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA按钮 */}
            {tier.highlight ? (
              <a
                href="https://xhslink.com/m/1Ebrd5Ef9y2"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block py-3 rounded-xl font-medium text-sm text-center bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all duration-300"
              >
                {tier.cta}
              </a>
            ) : (
              <a
                href="/images/qr/group-qr.png"
                target="_blank"
                className="w-full block py-3 rounded-xl font-medium text-sm text-center border border-white/10 text-white/50 hover:border-purple-500/30 hover:text-white/70 transition-all duration-300"
              >
                {tier.cta}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
