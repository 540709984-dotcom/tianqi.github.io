import Link from 'next/link'
import { notFound } from 'next/navigation'
import { coursesData } from '@/lib/courses-data'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

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

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params
  const course = coursesData.find((c) => c.slug === slug)
  if (!course) notFound()

  // Find highest price plan (by stripping non-numeric chars)
  const parsePrice = (p: string) => {
    const n = parseFloat(p.replace(/[^0-9.]/g, ''))
    return isNaN(n) ? 0 : n
  }
  const maxPrice = Math.max(...course.prices.map((p) => parsePrice(p.price)))

  return (
    <main className="min-h-screen bg-black text-white">
      {/* ── Hero ── */}
      <section
        className={`relative overflow-hidden bg-gradient-to-br ${course.color} px-4 pt-20 pb-16`}
      >
        {/* Subtle radial overlay */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center">
          {/* Back link */}
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-sm mb-8"
          >
            ← 所有板块
          </Link>

          {/* Icon + tagline */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-5xl">{course.icon}</span>
          </div>
          <p className="text-white/80 text-sm font-medium tracking-widest uppercase mb-4">
            {course.tagline}
          </p>

          {/* Hero title */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight whitespace-pre-line mb-6">
            {course.heroTitle}
          </h1>

          {/* Hero desc */}
          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">
            {course.heroDesc}
          </p>

          {/* Price badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {course.prices.map((p) => (
              <span
                key={p.name}
                className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur text-white text-sm font-semibold"
              >
                {p.name}：{p.price}
              </span>
            ))}
          </div>

          {/* CTA button */}
          <button className="px-10 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-white/90 active:scale-95 transition-all shadow-2xl">
            {course.cta}
          </button>
        </div>
      </section>

      {/* ── Target User ── */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-6 text-center">这门课适合谁？</h2>
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6 md:p-8 flex gap-4 items-start">
          <span className="text-3xl shrink-0">🎯</span>
          <p className="text-white/80 text-base md:text-lg leading-relaxed">
            {course.targetUser}
          </p>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">核心特点</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {course.features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl bg-white/5 border border-white/10 p-5 hover:border-white/20 transition-colors"
            >
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
                className={`relative rounded-2xl border p-6 transition-all ${
                  isHighlight
                    ? `border-transparent bg-gradient-to-br ${course.color} shadow-2xl`
                    : 'border-white/10 bg-white/5'
                }`}
              >
                {isHighlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-3 py-1 rounded-full">
                    旗舰方案
                  </span>
                )}
                <h3
                  className={`font-bold text-lg mb-1 ${
                    isHighlight ? 'text-white' : 'text-white'
                  }`}
                >
                  {p.name}
                </h3>
                <p
                  className={`text-3xl font-black mb-3 ${
                    isHighlight ? 'text-white' : 'text-white'
                  }`}
                >
                  {p.price}
                </p>
                <p
                  className={`text-sm leading-relaxed ${
                    isHighlight ? 'text-white/80' : 'text-white/60'
                  }`}
                >
                  {p.desc}
                </p>
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
              <span
                className={`mt-0.5 shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${course.color} flex items-center justify-center text-white text-xs font-bold`}
              >
                ✓
              </span>
              <p className="text-white/80 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="max-w-3xl mx-auto px-4 pb-24 text-center">
        <div className={`rounded-3xl bg-gradient-to-br ${course.color} p-10 md:p-14`}>
          <div className="text-5xl mb-4">{course.icon}</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            准备好了吗？
          </h2>
          <p className="text-white/80 mb-8 text-base md:text-lg">
            {course.heroDesc}
          </p>
          <button className="px-10 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-white/90 active:scale-95 transition-all shadow-2xl mb-4">
            {course.cta}
          </button>
          <div className="mt-4">
            <Link
              href="/courses"
              className="text-white/60 hover:text-white transition-colors text-sm underline underline-offset-4"
            >
              查看其他板块
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
