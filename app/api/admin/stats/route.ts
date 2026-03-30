import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// 使用 service_role key 绕过 RLS，仅在服务端调用
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  try {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
    const last7 = new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString()
    const last30 = new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString()

    // 并发拉取所有数据
    const [
      viewsTotal, viewsToday, views7d, views30d,
      regsTotal, regsToday, regs7d, regs30d,
      loginsTotal, loginsToday, logins7d, logins30d,
      aiUsage30d, aiUsageByModel,
      viewsByPath, viewsByDay, regsByDay, loginsByDay,
    ] = await Promise.all([
      // 访问量
      supabaseAdmin.from('page_views').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('page_views').select('id', { count: 'exact', head: true }).gte('created_at', today),
      supabaseAdmin.from('page_views').select('id', { count: 'exact', head: true }).gte('created_at', last7),
      supabaseAdmin.from('page_views').select('id', { count: 'exact', head: true }).gte('created_at', last30),
      // 注册量
      supabaseAdmin.from('user_registrations').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('user_registrations').select('id', { count: 'exact', head: true }).gte('created_at', today),
      supabaseAdmin.from('user_registrations').select('id', { count: 'exact', head: true }).gte('created_at', last7),
      supabaseAdmin.from('user_registrations').select('id', { count: 'exact', head: true }).gte('created_at', last30),
      // 登录量
      supabaseAdmin.from('user_logins').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('user_logins').select('id', { count: 'exact', head: true }).gte('created_at', today),
      supabaseAdmin.from('user_logins').select('id', { count: 'exact', head: true }).gte('created_at', last7),
      supabaseAdmin.from('user_logins').select('id', { count: 'exact', head: true }).gte('created_at', last30),
      // 算力消耗（近30天）
      supabaseAdmin.from('ai_usage_logs').select('total_tokens, cost_usd').gte('created_at', last30),
      supabaseAdmin.from('ai_usage_logs').select('model, total_tokens, cost_usd').gte('created_at', last30),
      // 页面路径分布（扇形图）
      supabaseAdmin.from('page_views').select('path').gte('created_at', last30),
      // 近7天每日访问（折线/柱状）
      supabaseAdmin.from('page_views').select('created_at').gte('created_at', last7),
      // 近7天每日注册
      supabaseAdmin.from('user_registrations').select('created_at').gte('created_at', last7),
      // 近7天每日登录
      supabaseAdmin.from('user_logins').select('created_at').gte('created_at', last7),
    ])

    // 算力汇总
    const totalTokens = (aiUsage30d.data || []).reduce((s, r) => s + (r.total_tokens || 0), 0)
    const totalCost = (aiUsage30d.data || []).reduce((s, r) => s + (r.cost_usd || 0), 0)

    // 按模型汇总（树状图/扇形图用）
    const modelMap: Record<string, { tokens: number; cost: number }> = {}
    for (const r of aiUsageByModel.data || []) {
      if (!modelMap[r.model]) modelMap[r.model] = { tokens: 0, cost: 0 }
      modelMap[r.model].tokens += r.total_tokens || 0
      modelMap[r.model].cost += r.cost_usd || 0
    }
    const byModel = Object.entries(modelMap).map(([name, v]) => ({ name, ...v }))

    // 页面路径分布
    const pathMap: Record<string, number> = {}
    for (const r of viewsByPath.data || []) {
      const p = r.path || '/'
      pathMap[p] = (pathMap[p] || 0) + 1
    }
    const pathDistribution = Object.entries(pathMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, value]) => ({ name, value }))

    // 近7天每日数据（柱状图）
    const dailyMap: Record<string, { views: number; regs: number; logins: number }> = {}
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 24 * 3600 * 1000)
      const key = `${d.getMonth() + 1}/${d.getDate()}`
      dailyMap[key] = { views: 0, regs: 0, logins: 0 }
    }
    for (const r of viewsByDay.data || []) {
      const d = new Date(r.created_at)
      const key = `${d.getMonth() + 1}/${d.getDate()}`
      if (dailyMap[key]) dailyMap[key].views++
    }
    for (const r of regsByDay.data || []) {
      const d = new Date(r.created_at)
      const key = `${d.getMonth() + 1}/${d.getDate()}`
      if (dailyMap[key]) dailyMap[key].regs++
    }
    for (const r of loginsByDay.data || []) {
      const d = new Date(r.created_at)
      const key = `${d.getMonth() + 1}/${d.getDate()}`
      if (dailyMap[key]) dailyMap[key].logins++
    }
    const dailyTrend = Object.entries(dailyMap).map(([date, v]) => ({ date, ...v }))

    return NextResponse.json({
      overview: {
        views: { total: viewsTotal.count || 0, today: viewsToday.count || 0, week: views7d.count || 0, month: views30d.count || 0 },
        registrations: { total: regsTotal.count || 0, today: regsToday.count || 0, week: regs7d.count || 0, month: regs30d.count || 0 },
        logins: { total: loginsTotal.count || 0, today: loginsToday.count || 0, week: logins7d.count || 0, month: logins30d.count || 0 },
        aiUsage: { totalTokens, totalCostUsd: totalCost, month: (aiUsage30d.data || []).length },
      },
      charts: {
        dailyTrend,
        pathDistribution,
        byModel,
      },
    })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
