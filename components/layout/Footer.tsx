import Link from 'next/link'

const courseNav = [
  { name: '全自动化AI产品交付', slug: 'full-auto', icon: '⚡' },
  { name: 'OPC一人AI公司', slug: 'opc-company', icon: '🚀' },
  { name: 'AI商业', slug: 'ai-business', icon: '💼' },
  { name: 'AI编程', slug: 'ai-coding', icon: '🤖' },
  { name: 'AI视觉', slug: 'ai-visual', icon: '🎨' },
  { name: '星识OPC·AI自动化IP', slug: 'ai-ip-tool', icon: '🌟' },
]

export default function Footer() {
  return (
    <footer className="bg-[#020617] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

          {/* Left — Brand */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2.5 mb-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <span className="text-white text-lg font-black">灵</span>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                灵犀<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">OPC</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              一人干掉一个团队，AI效率杠杆平台
            </p>
            <div className="flex gap-3 mt-2">
              {['微信', '小红书', '抖音'].map((s) => (
                <div
                  key={s}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs text-slate-500 hover:text-cyan-400 hover:border-cyan-500/30 transition-all cursor-pointer"
                >
                  {s[0]}
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-700 mt-3">
              © 2026 灵犀OPC · 果冻OPC旗下品牌
            </p>
          </div>

          {/* Middle — Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider">五大板块</h3>
            <ul className="flex flex-col gap-2">
              {courseNav.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={item.slug === 'ai-ip-tool' ? '/ip-tool' : `/courses/${item.slug}`}
                    className="text-sm text-slate-500 hover:text-cyan-400 transition-colors flex items-center gap-2"
                  >
                    <span>{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Contact */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider">联系我们</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                企业年度陪跑咨询：
                <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 transition-colors ml-1">
                  预约
                </Link>
              </li>
              <li>
                商务合作：
                <Link href="/business" className="text-cyan-400 hover:text-cyan-300 transition-colors ml-1">
                  扫码咨询
                </Link>
              </li>
              <li>
                关注公众号：<span className="text-slate-400">灵犀OPC</span>
              </li>
              <li>
                数字人IP工具：
                <a
                  href="https://sekotalk.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors ml-1"
                >
                  sekotalk.com →
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-700">
            © 2026 灵犀OPC · 浙ICP备XXXXXXXX号
          </p>
          <p className="text-xs text-slate-700">
            Powered by Hermes + n8n
          </p>
        </div>
      </div>
    </footer>
  )
}
