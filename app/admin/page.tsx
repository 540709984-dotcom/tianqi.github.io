'use client'

import Link from 'next/link'

const stats = [
  { label: '课程数', value: '6', icon: '🎓', color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: '导师数', value: '3', icon: '👨‍🏫', color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: '成功案例', value: '8', icon: '🏆', color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: '首页配置项', value: '15', icon: '⚙️', color: 'text-green-600', bg: 'bg-green-50' },
]

const quickLinks = [
  {
    href: '/admin/homepage',
    icon: '🏠',
    title: '首页配置',
    desc: '修改首页标题、副标题、统计数据等文案',
    color: 'hover:border-blue-200 hover:bg-blue-50/30',
    iconBg: 'bg-blue-50',
  },
  {
    href: '/admin/courses',
    icon: '🎓',
    title: '课程管理',
    desc: '添加、编辑、排序课程及价格方案',
    color: 'hover:border-purple-200 hover:bg-purple-50/30',
    iconBg: 'bg-purple-50',
  },
  {
    href: '/admin/instructors',
    icon: '👨‍🏫',
    title: '导师管理',
    desc: '管理导师资料、擅长方向和简介',
    color: 'hover:border-amber-200 hover:bg-amber-50/30',
    iconBg: 'bg-amber-50',
  },
  {
    href: '/admin/cases',
    icon: '🏆',
    title: '案例管理',
    desc: '发布客户成功案例，展示真实成果数据',
    color: 'hover:border-green-200 hover:bg-green-50/30',
    iconBg: 'bg-green-50',
  },
  {
    href: '/',
    icon: '🌐',
    title: '查看前台',
    desc: '在新标签页中预览用户端网站效果',
    color: 'hover:border-gray-200 hover:bg-gray-50/50',
    iconBg: 'bg-gray-50',
    external: true,
  },
]

export default function AdminPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          管理后台 · <span className="text-green-500">灵犀</span>OPC
        </h1>
        <p className="mt-1 text-sm text-gray-500">欢迎回来，从这里管理网站的所有内容。</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-3 shadow-sm"
          >
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center text-xl`}>
              {stat.icon}
            </div>
            <div>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="mb-3">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">功能入口</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {quickLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noopener noreferrer' : undefined}
            className={`group bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 shadow-sm transition-all duration-200 ${item.color}`}
          >
            <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center text-2xl shrink-0`}>
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 text-sm">{item.title}</div>
              <div className="text-xs text-gray-400 mt-0.5 truncate">{item.desc}</div>
            </div>
            <div className="text-gray-300 group-hover:text-gray-400 transition-colors shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer tip */}
      <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-2xl px-5 py-4">
        <span className="text-green-500 text-lg">✅</span>
        <p className="text-sm text-green-700 font-medium">所有修改实时生效，无需重新部署</p>
      </div>
    </div>
  )
}
