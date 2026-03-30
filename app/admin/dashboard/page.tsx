'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Treemap, RadialBarChart, RadialBar,
} from 'recharts'

// ─── 类型 ───────────────────────────────────────────────────────────────────
interface StatsData {
  overview: {
    views: { total: number; today: number; week: number; month: number }
    registrations: { total: number; today: number; week: number; month: number }
    logins: { total: number; today: number; week: number; month: number }
    aiUsage: { totalTokens: number; totalCostUsd: number; month: number }
  }
  charts: {
    dailyTrend: { date: string; views: number; regs: number; logins: number }[]
    pathDistribution: { name: string; value: number }[]
    byModel: { name: string; tokens: number; cost: number }[]
  }
}

// ─── 色盘 ────────────────────────────────────────────────────────────────────
const PIE_COLORS = ['#6366f1', '#22d3ee', '#f59e0b', '#10b981', '#f43f5e', '#8b5cf6', '#84cc16', '#fb923c']
const GAUGE_COLORS = [
  { fill: '#6366f1' },
  { fill: '#22d3ee' },
  { fill: '#10b981' },
  { fill: '#f59e0b' },
]

// ─── 仪表图（RadialBar模拟） ─────────────────────────────────────────────────
function GaugeCard({
  label, value, max, color, icon, sub,
}: {
  label: string; value: number; max: number; color: string; icon: string; sub: string
}) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0
  const gaugeData = [{ name: label, value: pct, fill: color }]
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-center gap-2">
      <div className="text-2xl">{icon}</div>
      <div className="relative w-32 h-32">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%" cy="50%"
            innerRadius="60%" outerRadius="90%"
            startAngle={210} endAngle={-30}
            data={gaugeData}
            barSize={12}
          >
            <RadialBar dataKey="value" cornerRadius={8} background={{ fill: '#f3f4f6' }} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</span>
          <span className="text-xs text-gray-400">{pct.toFixed(0)}%</span>
        </div>
      </div>
      <div className="text-sm font-semibold text-gray-700">{label}</div>
      <div className="text-xs text-gray-400">{sub}</div>
    </div>
  )
}

// ─── 数字卡片 ────────────────────────────────────────────────────────────────
function StatCard({
  icon, label, total, today, week, color,
}: {
  icon: string; label: string; total: number; today: number; week: number; color: string
}) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center text-xl`}>{icon}</div>
        <span className="font-semibold text-gray-700 text-sm">{label}</span>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-2">{total.toLocaleString()}</div>
      <div className="flex gap-4 text-xs text-gray-400">
        <span>今日 <b className="text-gray-600">{today}</b></span>
        <span>近7天 <b className="text-gray-600">{week}</b></span>
      </div>
    </div>
  )
}

// ─── 自定义 Treemap 内容 ─────────────────────────────────────────────────────
function TreemapContent(props: {
  x?: number; y?: number; width?: number; height?: number
  name?: string; value?: number; depth?: number; index?: number
}) {
  const { x = 0, y = 0, width = 0, height = 0, name, value, index = 0 } = props
  if (width < 20 || height < 20) return null
  return (
    <g>
      <rect
        x={x + 2} y={y + 2}
        width={width - 4} height={height - 4}
        rx={8} ry={8}
        fill={PIE_COLORS[index % PIE_COLORS.length]}
        fillOpacity={0.85}
      />
      {width > 60 && height > 40 && (
        <>
          <text x={x + 12} y={y + 22} fill="#fff" fontSize={12} fontWeight={600}>{name}</text>
          <text x={x + 12} y={y + 38} fill="rgba(255,255,255,0.8)" fontSize={11}>{value} tokens</text>
        </>
      )}
    </g>
  )
}

// ─── 主组件 ──────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [data, setData] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [range, setRange] = useState<'today' | 'week' | 'month'>('week')

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/stats')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      setData(json)
    } catch (e) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchStats() }, [fetchStats])

  // ── 加载 / 错误态 ──────────────────────────────────────────────────────────
  if (loading) return (
    <div className="flex flex-col items-center justify-center h-96 gap-4">
      <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-gray-400 text-sm">正在加载数据统计…</p>
    </div>
  )

  if (error) return (
    <div className="flex flex-col items-center justify-center h-96 gap-3">
      <div className="text-4xl">⚠️</div>
      <p className="text-red-500 font-semibold">数据加载失败</p>
      <p className="text-gray-400 text-xs max-w-sm text-center">{error}</p>
      <button onClick={fetchStats} className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm">重试</button>
    </div>
  )

  if (!data) return null

  const { overview, charts } = data
  const rangeKey = range === 'today' ? 'today' : range === 'week' ? 'week' : 'month'

  // 扇形图数据（访问/注册/登录 占比）
  const pieData = [
    { name: '页面访问', value: overview.views[rangeKey] },
    { name: '用户注册', value: overview.registrations[rangeKey] },
    { name: '用户登录', value: overview.logins[rangeKey] },
  ].filter(d => d.value > 0)

  // 仪表图 max 取 total
  const maxViews = Math.max(overview.views.total, 1)
  const maxRegs = Math.max(overview.registrations.total, 1)
  const maxLogins = Math.max(overview.logins.total, 1)
  const maxTokens = Math.max(overview.aiUsage.totalTokens, 1)

  // Treemap：算力按模型分布
  const treemapData = charts.byModel.length > 0
    ? charts.byModel.map(m => ({ name: m.name.replace('claude-', '').replace('-thinking', '★'), value: m.tokens }))
    : [{ name: '暂无数据', value: 1 }]

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* ── 标题栏 ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">📊 数据仪表盘</h1>
          <p className="text-sm text-gray-400 mt-1">实时监控访问、注册、登录与算力消耗</p>
        </div>
        <div className="flex items-center gap-2">
          {(['today', 'week', 'month'] as const).map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                range === r ? 'bg-indigo-500 text-white shadow-sm' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {r === 'today' ? '今日' : r === 'week' ? '近7天' : '近30天'}
            </button>
          ))}
          <button onClick={fetchStats} className="ml-2 w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-all" title="刷新">
            🔄
          </button>
        </div>
      </div>

      {/* ── 数字概览卡片 ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="👁️" label="页面访问量" total={overview.views.total} today={overview.views.today} week={overview.views.week} color="bg-indigo-50" />
        <StatCard icon="📝" label="用户注册量" total={overview.registrations.total} today={overview.registrations.today} week={overview.registrations.week} color="bg-cyan-50" />
        <StatCard icon="🔑" label="用户登录量" total={overview.logins.total} today={overview.logins.today} week={overview.logins.week} color="bg-emerald-50" />
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-xl">⚡</div>
            <span className="font-semibold text-gray-700 text-sm">算力消耗</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{(overview.aiUsage.totalTokens / 1000).toFixed(1)}K</div>
          <div className="flex gap-4 text-xs text-gray-400">
            <span>Tokens</span>
            <span>≈ <b className="text-gray-600">${overview.aiUsage.totalCostUsd.toFixed(3)}</b></span>
          </div>
        </div>
      </div>

      {/* ── 仪表图区 ── */}
      <div>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">📍 仪表盘（累计占比）</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <GaugeCard icon="👁️" label="访问量" value={overview.views[rangeKey]} max={maxViews} color="#6366f1" sub={`总计 ${overview.views.total.toLocaleString()}`} />
          <GaugeCard icon="📝" label="注册量" value={overview.registrations[rangeKey]} max={maxRegs} color="#22d3ee" sub={`总计 ${overview.registrations.total.toLocaleString()}`} />
          <GaugeCard icon="🔑" label="登录量" value={overview.logins[rangeKey]} max={maxLogins} color="#10b981" sub={`总计 ${overview.logins.total.toLocaleString()}`} />
          <GaugeCard icon="⚡" label="算力Token" value={overview.aiUsage.totalTokens} max={maxTokens} color="#f59e0b" sub={`≈ $${overview.aiUsage.totalCostUsd.toFixed(4)}`} />
        </div>
      </div>

      {/* ── 扇形图 + 柱状图 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 扇形图：访问/注册/登录 占比 */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">🥧 流量结构（{range === 'today' ? '今日' : range === 'week' ? '近7天' : '近30天'}）</h3>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%" cy="50%"
                  innerRadius={60} outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => (Number(v) || 0).toLocaleString()} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-52 text-gray-300 text-sm">暂无数据（Supabase 建表后自动填充）</div>
          )}
        </div>

        {/* 柱状图：近7天趋势 */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">📈 近7天趋势</h3>
          {charts.dailyTrend.some(d => d.views + d.regs + d.logins > 0) ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={charts.dailyTrend} barGap={2} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="views" name="访问" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="regs" name="注册" fill="#22d3ee" radius={[4, 4, 0, 0]} />
                <Bar dataKey="logins" name="登录" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-52 text-gray-300 text-sm">暂无数据（Supabase 建表后自动填充）</div>
          )}
        </div>
      </div>

      {/* ── 树状图 + 页面路径扇形图 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 树状图：算力按模型分布 */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">🌳 算力消耗·模型分布（树状图）</h3>
          <ResponsiveContainer width="100%" height={260}>
            <Treemap
              data={treemapData}
              dataKey="value"
              aspectRatio={4 / 3}
              content={<TreemapContent />}
            />
          </ResponsiveContainer>
        </div>

        {/* 扇形图：页面路径分布 */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">🗺️ 页面路径分布（近30天）</h3>
          {charts.pathDistribution.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={charts.pathDistribution}
                  cx="50%" cy="50%"
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {charts.pathDistribution.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `${Number(v) || 0} 次`} />
                <Legend
                  formatter={(value) => <span style={{ fontSize: 11 }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-52 text-gray-300 text-sm">暂无数据（接入埋点后自动显示）</div>
          )}
        </div>
      </div>

      {/* ── 底部提示 ── */}
      <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-2xl px-5 py-4">
        <span className="text-indigo-500 text-lg">💡</span>
        <p className="text-sm text-indigo-700">
          数据来自 Supabase 四张埋点表：
          <code className="mx-1 bg-indigo-100 px-1 rounded text-xs">page_views</code>
          <code className="mx-1 bg-indigo-100 px-1 rounded text-xs">user_registrations</code>
          <code className="mx-1 bg-indigo-100 px-1 rounded text-xs">user_logins</code>
          <code className="mx-1 bg-indigo-100 px-1 rounded text-xs">ai_usage_logs</code>
          · 建表后数据自动填充
        </p>
      </div>
    </div>
  )
}
