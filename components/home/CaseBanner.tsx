'use client';

interface CaseData {
  industry: string;
  metric: string;
  value: string;
  desc: string;
}

const CASES: CaseData[] = [
  {
    industry: '制造业',
    metric: '人力缩减',
    value: '1/3',
    desc: '50人→30人，年省120万+',
  },
  {
    industry: '跨境电商',
    metric: 'GMV提升',
    value: '87%',
    desc: '200万→374万，AI驱动增长',
  },
  {
    industry: '企业咨询',
    metric: '单笔成交',
    value: '1000万',
    desc: 'AI+铁三角方法论，大单突破',
  },
];

export default function CaseBanner() {
  return (
    <section className="relative px-6 py-20 overflow-hidden">
      {/* 背景微光 */}
      <div className="absolute inset-0 particle-bg opacity-50 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      {/* 标题区 */}
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            真实案例
          </span>
        </h2>
        <p className="text-lg text-white/30">不卖焦虑只卖结果，数据说话</p>
      </div>

      {/* 案例卡片 */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {CASES.map((c) => (
          <div key={c.industry} className="glass-card rounded-2xl p-8 text-center group">
            {/* 行业标签 */}
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium text-purple-300/80 bg-purple-500/10 border border-purple-500/20 mb-5">
              {c.industry}
            </span>

            {/* 指标名 */}
            <p className="text-sm text-white/30 mb-3">{c.metric}</p>

            {/* 大号渐变数字 */}
            <p className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent glow-text">
              {c.value}
            </p>

            {/* 描述 */}
            <p className="text-sm text-white/35 leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
