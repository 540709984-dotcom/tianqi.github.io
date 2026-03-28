import Link from 'next/link'

const courseNav = [
  { name: '全自动化AI产品交付', slug: 'full-auto', icon: '⚡' },
  { name: 'OPC一人AI公司', slug: 'opc-company', icon: '🚀' },
  { name: 'AI商业', slug: 'ai-business', icon: '💼' },
  { name: 'AI编程', slug: 'ai-coding', icon: '🤖' },
  { name: 'AI视觉', slug: 'ai-visual', icon: '🎨' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

          {/* Left — Brand */}
          <div className="flex flex-col gap-3">
            <div className="text-white text-xl font-bold tracking-tight">
              <span className="text-green-400">灵犀</span>OPC
            </div>
            <p className="text-sm leading-relaxed">
              一人干掉一个团队，AI效率杠杆平台
            </p>
            <p className="text-xs text-gray-600 mt-2">
              © 2026 灵犀OPC · 浙ICP备XXXXXXXX号
            </p>
          </div>

          {/* Middle — Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider">五大板块</h3>
            <ul className="flex flex-col gap-2">
              {courseNav.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/courses/${item.slug}`}
                    className="text-sm hover:text-white transition-colors flex items-center gap-2"
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
                <Link href="/contact" className="text-green-400 hover:text-green-300 transition-colors ml-1">
                  预约
                </Link>
              </li>
              <li>
                商务合作：
                <a href="mailto:business@lingxiopc.com" className="hover:text-white transition-colors">
                  business@lingxiopc.com
                </a>
              </li>
              <li>
                关注公众号：<span className="text-gray-300">灵犀OPC</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  )
}
