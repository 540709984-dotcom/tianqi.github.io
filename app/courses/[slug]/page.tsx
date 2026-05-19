import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { coursesData } from '@/lib/courses-data'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

// 辰天启导师的小红书链接
const CHENTIANQI_XHS_URL = 'https://xhslink.com/m/1Ebrd5Ef9y2'
// 其他导师的微信群二维码
const OTHER_MENTOR_QR = '/images/qr/group-qr.png'

export async function generateStaticParams() {
  return coursesData.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const course = coursesData.find((c) => c.slug === slug)
  if (!course) return {}
  return {
    title: `${course.name} · 灵犀OPC`,
    description: course.heroDesc,
  }
}

function isChentianqi(mentorName: string) {
  return mentorName.includes('辰天启')
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params
  const course = coursesData.find((c) => c.slug === slug)
  if (!course) notFound()

  const parsePrice = (p: string) => {
    const n = parseFloat(p.replace(/[^0-9.]/g, ''))
    return isNaN(n) ? 0 : n
  }
  const maxPrice = Math.max(...course.prices.map((p) => parsePrice(p.price)))

  const mentorIsChentianqi = isChentianqi(course.mentor.name)
  const mentorLink = mentorIsChentianqi ? CHENTIANQI_XHS_URL : OTHER_MENTOR_QR
  const mentorLinkIsExternal = mentorIsChentianqi

  return (
    <main className="min-h-screen bg-black text-white">
      {/* ── Hero ── */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${course.color} px-4 pt-20 pb-16`}>
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <Link href="/courses" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-sm mb-8">
            ← 所有板块
          </Link>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-5xl">{course.icon}</span>
          </div>
          <p className="text-white/80 text-sm font-medium tracking-widest uppercase mb-4">{course.tagline}</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight whitespace-pre-line mb-6">{course.heroTitle}</h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">{course.heroDesc}</p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {course.prices.map((p) => (
              <span key={p.name} className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur text-white text-sm font-semibold">
                {p.name}：{p.price}
              </span>
            ))}
          </div>
          {/* CTA button - 辰天启跳小红书，其他跳二维码 */}
          {mentorIsChentianqi ? (
            <a
              href={CHENTIANQI_XHS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-white/90 active:scale-95 transition-all shadow-2xl"
            >
              {course.cta}
            </a>
          ) : (
            <a
              href={OTHER_MENTOR_QR}
              target="_blank"
              className="inline-block px-10 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-white/90 active:scale-95 transition-all shadow-2xl"
            >
              {course.cta}
            </a>
          )}
        </div>
      </section>

      {/* ── Mentor ── */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-6 text-center">负责导师</h2>
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6 md:p-8 flex gap-5 items-center">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center text-3xl shrink-0 shadow-lg`}>
            {course.mentor.avatar}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">{course.mentor.name}</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-3">{course.mentor.title}</p>
            {/* 导师链接 */}
            {mentorIsChentianqi ? (
              <a
                href={CHENTIANQI_XHS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-medium hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all"
              >
                📕 小红书主页 →
              </a>
            ) : (
              <a
                href={OTHER_MENTOR_QR}
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-medium hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all"
              >
                💬 扫码进群咨询 →
              </a>
            )}
          </div>
        </div>
        {/* 非辰天启导师显示二维码 */}
        {!mentorIsChentianqi && (
          <div className="mt-6 flex justify-center">
            <div className="glass-card rounded-2xl p-6 text-center">
              <p className="text-white/50 text-sm mb-3">微信扫码进群 · 预约咨询</p>
              <img src={OTHER_MENTOR_QR} alt="微信群二维码" className="w-48 h-48 mx-auto rounded-xl" />
            </div>
          </div>
        )}
      </section>

      {/* ── Target User ── */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-6 text-center">这门课适合谁？</h2>
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6 md:p-8 flex gap-4 items-start">
          <span className="text-3xl shrink-0">🎯</span>
          <p className="text-white/80 text-base md:text-lg leading-relaxed">{course.targetUser}</p>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">核心特点</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {course.features.map((f) => (
            <div key={f.title} className="rounded-2xl bg-white/5 border border-white/10 p-5 hover:border-white/20 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{f.icon}</span>
                <h3 className="font-semibold text-white">{f.title}</h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">价格方案</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {course.prices.map((p) => {
            const isHighlight = parsePrice(p.price) === maxPrice
            return (
              <div
                key={p.name}
                className={`relative rounded-2xl border p-6 transition-all ${isHighlight ? `border-transparent bg-gradient-to-br ${course.color} shadow-2xl` : 'border-white/10 bg-white/5'}`}
              >
                {isHighlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-3 py-1 rounded-full">旗舰方案</span>
                )}
                <h3 className="font-bold text-lg mb-1 text-white">{p.name}</h3>
                <p className="text-3xl font-black mb-3 text-white">{p.price}</p>
                <p className={`text-sm leading-relaxed ${isHighlight ? 'text-white/80' : 'text-white/60'}`}>{p.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Deliverables ── */}
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">学完你能得到什么</h2>
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6 md:p-8 space-y-4">
          {course.deliverables.map((d) => (
            <div key={d} className="flex items-start gap-3">
              <span className={`mt-0.5 shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${course.color} flex items-center justify-center text-white text-xs font-bold`}>✓</span>
              <p className="text-white/80 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="max-w-3xl mx-auto px-4 pb-24 text-center">
        <div className={`rounded-3xl bg-gradient-to-br ${course.color} p-10 md:p-14`}>
          <div className="text-5xl mb-4">{course.icon}</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">准备好了吗？</h2>
          <p className="text-white/80 mb-8 text-base md:text-lg">{course.heroDesc}</p>
          {mentorIsChentianqi ? (
            <a
              href={CHENTIANQI_XHS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-white/90 active:scale-95 transition-all shadow-2xl mb-4"
            >
              {course.cta}
            </a>
          ) : (
            <a
              href={OTHER_MENTOR_QR}
              target="_blank"
              className="inline-block px-10 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-white/90 active:scale-95 transition-all shadow-2xl mb-4"
            >
              {course.cta}
            </a>
          )}
          <div className="mt-4">
            <Link href="/courses" className="text-white/60 hover:text-white transition-colors text-sm underline underline-offset-4">查看其他板块</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
