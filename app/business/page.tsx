import Image from 'next/image'
import Link from 'next/link'

export default function BusinessPage() {
  return (
    <main className="min-h-screen bg-[#030712] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="glass-card rounded-3xl p-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors mb-8">
            <span>←</span>
            <span>返回首页</span>
          </Link>

          <div className="mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-500/20">
              <span className="text-3xl">🤝</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">商务合作</h1>
            <p className="text-slate-400 text-sm">扫码添加微信，洽谈合作事宜</p>
          </div>

          <div className="bg-white rounded-2xl p-4 mb-6 inline-block">
            <Image
              src="/images/business-qr.png"
              alt="商务合作微信二维码"
              width={280}
              height={280}
              className="rounded-xl"
            />
          </div>

          <p className="text-slate-500 text-xs">
            长按识别二维码 · 添加商务微信
          </p>
        </div>
      </div>
    </main>
  )
}
