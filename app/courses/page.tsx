import Link from 'next/link'
import { coursesData } from '@/lib/courses-data'

const CHENTIANQI_XHS_URL = 'https://xhslink.com/m/1Ebrd5Ef9y2'
const OTHER_MENTOR_QR = '/images/qr/group-qr.png'

function isChentianqi(mentorName: string) {
  return mentorName.includes('辰天启')
}

export const metadata = {
  title: '五大板块 · 灵犀OPC',
  description: '五大板块，任意入口，通往一人公司',
}

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="pt-20 pb-12 text-center px-4">
        <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm mb-8">
          ← 返回首页
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">五大板块</h1>
        <p className="text-xl text-white/60 max-w-xl mx-auto">任意入口，通往一人公司</p>
      </div>

      {/* Course Cards */}
      <div className="max-w-5xl mx-auto px-4 pb-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {coursesData.map((course) => {
          const mentorIsCTQ = isChentianqi(course.mentor.name)
          const linkHref = mentorIsCTQ ? CHENTIANQI_XHS_URL : `/courses/${course.slug}`

          return (
            <div
              key={course.slug}
              className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
            >
              {/* Gradient top bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${course.color}`} />

              <div className="p-6">
                {/* Icon + name */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{course.icon}</span>
                  <div>
                    <h2 className="text-base font-semibold text-white leading-tight">{course.name}</h2>
                    <p className="text-xs text-white/40 mt-0.5">{course.tagline}</p>
                  </div>
                </div>

                {/* Hero desc */}
                <p className="text-sm text-white/60 mb-4 leading-relaxed">{course.heroDesc}</p>

                {/* Price tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.prices.map((p) => (
                    <span key={p.name} className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">
                      {p.price}
                    </span>
                  ))}
                </div>

                {/* CTA - 辰天启跳小红书，其他跳课程详情 */}
                {mentorIsCTQ ? (
                  <a
                    href={CHENTIANQI_XHS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm font-medium bg-gradient-to-r ${course.color} bg-clip-text text-transparent group-hover:opacity-90 flex items-center gap-1`}
                  >
                    📕 小红书主页 →
                  </a>
                ) : (
                  <Link
                    href={`/courses/${course.slug}`}
                    className={`text-sm font-medium bg-gradient-to-r ${course.color} bg-clip-text text-transparent group-hover:opacity-90 flex items-center gap-1`}
                  >
                    {course.cta} →
                  </Link>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
