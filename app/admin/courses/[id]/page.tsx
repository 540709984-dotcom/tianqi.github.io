'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

interface Course {
  id: string
  slug: string
  name: string
  icon: string
  color: string
  tagline: string
  hero_title: string
  hero_desc: string
  target_user: string
  cta: string
  sort_order: number
  is_published: boolean
  created_at: string
  updated_at: string
}

interface CoursePrice {
  id: string
  course_id: string
  name: string
  price: string
  description: string
  sort_order: number
}

interface CourseFeature {
  id: string
  course_id: string
  title: string
  description: string
  icon: string
  sort_order: number
}

interface CourseDeliverable {
  id: string
  course_id: string
  content: string
  sort_order: number
}

const COLOR_OPTIONS = [
  { value: 'from-amber-500 to-orange-600', label: '橙色（全自动化）' },
  { value: 'from-emerald-500 to-teal-600', label: '绿色（OPC）' },
  { value: 'from-blue-500 to-indigo-600', label: '蓝色（AI商业）' },
  { value: 'from-violet-500 to-purple-600', label: '紫色（AI编程）' },
  { value: 'from-pink-500 to-rose-600', label: '粉色（AI视觉）' },
]

const TABS = [
  { id: 'basic', label: '基本信息' },
  { id: 'intro', label: '课程介绍' },
  { id: 'prices', label: '价格方案' },
  { id: 'features', label: '核心特点' },
  { id: 'deliverables', label: '学员收获' },
]

const inputClass =
  'border border-gray-200 rounded-xl px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-400'

export default function CourseDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const [course, setCourse] = useState<Course | null>(null)
  const [prices, setPrices] = useState<Omit<CoursePrice, 'id' | 'course_id'>[]>([])
  const [features, setFeatures] = useState<Omit<CourseFeature, 'id' | 'course_id'>[]>([])
  const [deliverables, setDeliverables] = useState<Omit<CourseDeliverable, 'id' | 'course_id'>[]>([])

  useEffect(() => {
    if (id) fetchAll()
  }, [id])

  function showToast(type: 'success' | 'error', message: string) {
    setToast({ type, message })
    setTimeout(() => setToast(null), 3000)
  }

  async function fetchAll() {
    setLoading(true)
    const [courseRes, pricesRes, featuresRes, deliverablesRes] = await Promise.all([
      supabase.from('courses').select('*').eq('id', id).single(),
      supabase.from('course_prices').select('*').eq('course_id', id).order('sort_order'),
      supabase.from('course_features').select('*').eq('course_id', id).order('sort_order'),
      supabase.from('course_deliverables').select('*').eq('course_id', id).order('sort_order'),
    ])

    if (courseRes.error) {
      showToast('error', '加载课程失败：' + courseRes.error.message)
    } else {
      setCourse(courseRes.data)
    }

    setPrices(
      (pricesRes.data || []).map((p: CoursePrice) => ({
        name: p.name,
        price: p.price,
        description: p.description,
        sort_order: p.sort_order,
      }))
    )
    setFeatures(
      (featuresRes.data || []).map((f: CourseFeature) => ({
        title: f.title,
        description: f.description,
        icon: f.icon,
        sort_order: f.sort_order,
      }))
    )
    setDeliverables(
      (deliverablesRes.data || []).map((d: CourseDeliverable) => ({
        content: d.content,
        sort_order: d.sort_order,
      }))
    )

    setLoading(false)
  }

  async function handleSave() {
    if (!course) return
    setSaving(true)
    try {
      if (activeTab === 'basic' || activeTab === 'intro') {
        const { error } = await supabase
          .from('courses')
          .update({ ...course, updated_at: new Date().toISOString() })
          .eq('id', id)
        if (error) throw new Error(error.message)
      }

      if (activeTab === 'prices') {
        const { error: delErr } = await supabase.from('course_prices').delete().eq('course_id', id)
        if (delErr) throw new Error(delErr.message)
        if (prices.length > 0) {
          const { error: insErr } = await supabase.from('course_prices').insert(
            prices.map((p, i) => ({ ...p, course_id: id, sort_order: i }))
          )
          if (insErr) throw new Error(insErr.message)
        }
      }

      if (activeTab === 'features') {
        const { error: delErr } = await supabase.from('course_features').delete().eq('course_id', id)
        if (delErr) throw new Error(delErr.message)
        if (features.length > 0) {
          const { error: insErr } = await supabase.from('course_features').insert(
            features.map((f, i) => ({ ...f, course_id: id, sort_order: i }))
          )
          if (insErr) throw new Error(insErr.message)
        }
      }

      if (activeTab === 'deliverables') {
        const { error: delErr } = await supabase.from('course_deliverables').delete().eq('course_id', id)
        if (delErr) throw new Error(delErr.message)
        if (deliverables.length > 0) {
          const { error: insErr } = await supabase.from('course_deliverables').insert(
            deliverables.map((d, i) => ({ ...d, course_id: id, sort_order: i }))
          )
          if (insErr) throw new Error(insErr.message)
        }
      }

      showToast('success', '✅ 保存成功')
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : '未知错误'
      showToast('error', '保存失败：' + msg)
    } finally {
      setSaving(false)
    }
  }

  // ---------- Sub-components ----------

  const TabBasic = () => {
    if (!course) return null
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm text-gray-700 font-medium">课程名称</label>
            <input
              type="text"
              value={course.name}
              onChange={(e) => setCourse({ ...course, name: e.target.value })}
              className={inputClass}
              placeholder="如：AI 自动化实战"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm text-gray-700 font-medium">URL 标识 slug</label>
            <input
              type="text"
              value={course.slug}
              onChange={(e) => setCourse({ ...course, slug: e.target.value })}
              className={inputClass}
              placeholder="如：ai-automation"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm text-gray-700 font-medium">图标 Emoji</label>
            <input
              type="text"
              value={course.icon}
              onChange={(e) => setCourse({ ...course, icon: e.target.value })}
              className={inputClass}
              placeholder="如：🤖"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm text-gray-700 font-medium">渐变颜色</label>
            <select
              value={course.color}
              onChange={(e) => setCourse({ ...course, color: e.target.value })}
              className={inputClass}
            >
              {COLOR_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-sm text-gray-700 font-medium">一句话定位 tagline</label>
          <input
            type="text"
            value={course.tagline}
            onChange={(e) => setCourse({ ...course, tagline: e.target.value })}
            className={inputClass}
            placeholder="如：用 AI 实现全流程自动化"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm text-gray-700 font-medium">目标用户</label>
          <input
            type="text"
            value={course.target_user}
            onChange={(e) => setCourse({ ...course, target_user: e.target.value })}
            className={inputClass}
            placeholder="如：想提升效率的职场人"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm text-gray-700 font-medium">CTA 按钮文字</label>
            <input
              type="text"
              value={course.cta}
              onChange={(e) => setCourse({ ...course, cta: e.target.value })}
              className={inputClass}
              placeholder="立即报名"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm text-gray-700 font-medium">排序</label>
            <input
              type="number"
              value={course.sort_order}
              onChange={(e) => setCourse({ ...course, sort_order: Number(e.target.value) })}
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <input
            type="checkbox"
            id="is_published"
            checked={course.is_published}
            onChange={(e) => setCourse({ ...course, is_published: e.target.checked })}
            className="w-4 h-4 accent-green-500 rounded"
          />
          <label htmlFor="is_published" className="text-sm text-gray-700 font-medium cursor-pointer">
            立即发布
          </label>
          {course.is_published && (
            <span className="text-xs bg-green-50 text-green-600 border border-green-200 px-2 py-0.5 rounded-full">
              已发布
            </span>
          )}
        </div>
      </div>
    )
  }

  const TabIntro = () => {
    if (!course) return null
    return (
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="block text-sm text-gray-700 font-medium">大标题（hero_title）</label>
          <p className="text-xs text-gray-400">支持换行，用于课程页面主视觉标题</p>
          <textarea
            value={course.hero_title}
            onChange={(e) => setCourse({ ...course, hero_title: e.target.value })}
            rows={4}
            className={inputClass}
            placeholder="如：掌握 AI 自动化&#10;让效率提升 10 倍"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm text-gray-700 font-medium">副标题（hero_desc）</label>
          <p className="text-xs text-gray-400">课程页面主视觉下方的描述文字</p>
          <textarea
            value={course.hero_desc}
            onChange={(e) => setCourse({ ...course, hero_desc: e.target.value })}
            rows={4}
            className={inputClass}
            placeholder="如：从零掌握 n8n、Make、Zapier，打造你的专属自动化工作流"
          />
        </div>
      </div>
    )
  }

  const TabPrices = () => (
    <div className="space-y-3">
      {prices.map((price, idx) => (
        <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
          <div className="flex-1 grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="block text-xs text-gray-500">方案名称</label>
              <input
                type="text"
                value={price.name}
                onChange={(e) => {
                  const next = [...prices]
                  next[idx] = { ...next[idx], name: e.target.value }
                  setPrices(next)
                }}
                className={inputClass}
                placeholder="如：基础版"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs text-gray-500">价格</label>
              <input
                type="text"
                value={price.price}
                onChange={(e) => {
                  const next = [...prices]
                  next[idx] = { ...next[idx], price: e.target.value }
                  setPrices(next)
                }}
                className={inputClass}
                placeholder="如：¥999"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs text-gray-500">描述</label>
              <input
                type="text"
                value={price.description}
                onChange={(e) => {
                  const next = [...prices]
                  next[idx] = { ...next[idx], description: e.target.value }
                  setPrices(next)
                }}
                className={inputClass}
                placeholder="如：包含全部课程内容"
              />
            </div>
          </div>
          <button
            onClick={() => setPrices(prices.filter((_, i) => i !== idx))}
            className="text-red-400 hover:text-red-600 text-sm mt-6 flex-shrink-0"
          >
            删除
          </button>
        </div>
      ))}
      <button
        onClick={() => setPrices([...prices, { name: '', price: '', description: '', sort_order: prices.length }])}
        className="w-full border-2 border-dashed border-gray-200 hover:border-green-300 text-gray-400 hover:text-green-500 rounded-xl py-3 text-sm transition-colors"
      >
        + 添加价格方案
      </button>
    </div>
  )

  const TabFeatures = () => (
    <div className="space-y-3">
      {features.length >= 6 && (
        <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 px-3 py-2 rounded-lg">
          已达到最多 6 条限制
        </p>
      )}
      {features.map((feature, idx) => (
        <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
          <div className="flex-1 grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="block text-xs text-gray-500">Emoji 图标</label>
              <input
                type="text"
                value={feature.icon}
                onChange={(e) => {
                  const next = [...features]
                  next[idx] = { ...next[idx], icon: e.target.value }
                  setFeatures(next)
                }}
                className={inputClass}
                placeholder="如：🚀"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs text-gray-500">特点标题</label>
              <input
                type="text"
                value={feature.title}
                onChange={(e) => {
                  const next = [...features]
                  next[idx] = { ...next[idx], title: e.target.value }
                  setFeatures(next)
                }}
                className={inputClass}
                placeholder="如：实战项目"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs text-gray-500">描述</label>
              <input
                type="text"
                value={feature.description}
                onChange={(e) => {
                  const next = [...features]
                  next[idx] = { ...next[idx], description: e.target.value }
                  setFeatures(next)
                }}
                className={inputClass}
                placeholder="如：真实案例全程演示"
              />
            </div>
          </div>
          <button
            onClick={() => setFeatures(features.filter((_, i) => i !== idx))}
            className="text-red-400 hover:text-red-600 text-sm mt-6 flex-shrink-0"
          >
            删除
          </button>
        </div>
      ))}
      {features.length < 6 && (
        <button
          onClick={() =>
            setFeatures([
              ...features,
              { title: '', description: '', icon: '', sort_order: features.length },
            ])
          }
          className="w-full border-2 border-dashed border-gray-200 hover:border-green-300 text-gray-400 hover:text-green-500 rounded-xl py-3 text-sm transition-colors"
        >
          + 添加特点
        </button>
      )}
    </div>
  )

  const TabDeliverables = () => (
    <div className="space-y-3">
      {deliverables.map((item, idx) => (
        <div key={idx} className="flex items-center gap-3">
          <span className="text-gray-300 text-sm w-5 text-center flex-shrink-0">{idx + 1}</span>
          <input
            type="text"
            value={item.content}
            onChange={(e) => {
              const next = [...deliverables]
              next[idx] = { ...next[idx], content: e.target.value }
              setDeliverables(next)
            }}
            className={inputClass}
            placeholder="如：掌握 n8n 自动化工作流搭建"
          />
          <button
            onClick={() => setDeliverables(deliverables.filter((_, i) => i !== idx))}
            className="text-red-400 hover:text-red-600 text-sm flex-shrink-0"
          >
            删除
          </button>
        </div>
      ))}
      <button
        onClick={() =>
          setDeliverables([...deliverables, { content: '', sort_order: deliverables.length }])
        }
        className="w-full border-2 border-dashed border-gray-200 hover:border-green-300 text-gray-400 hover:text-green-500 rounded-xl py-3 text-sm transition-colors"
      >
        + 添加收获
      </button>
    </div>
  )

  // ---------- Render ----------

  if (loading) {
    return (
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <div className="h-8 bg-gray-200 rounded w-48 animate-pulse" />
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
              <div className="h-9 bg-gray-100 rounded-xl animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-center">
        <p className="text-gray-500">课程不存在或加载失败</p>
        <button
          onClick={() => router.push('/admin/courses')}
          className="mt-4 text-green-600 hover:text-green-700 text-sm"
        >
          ← 返回课程列表
        </button>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl text-sm font-medium shadow-lg transition-all ${
            toast.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <button
            onClick={() => router.push('/admin/courses')}
            className="text-sm text-gray-400 hover:text-gray-600 mb-2 flex items-center gap-1 transition-colors"
          >
            ← 课程列表
          </button>
          <h1 className="text-xl font-bold text-gray-900">{course.name || '（未命名课程）'}</h1>
          <p className="text-xs text-gray-400 font-mono mt-0.5">{course.slug}</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-1.5 flex-shrink-0 mt-6 ${
            saving ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {saving ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              保存中...
            </>
          ) : (
            '保存所有更改'
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {/* Tab Bar */}
        <div className="border-b border-gray-100 flex">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? 'text-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 rounded-t" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'basic' && <TabBasic />}
          {activeTab === 'intro' && <TabIntro />}
          {activeTab === 'prices' && <TabPrices />}
          {activeTab === 'features' && <TabFeatures />}
          {activeTab === 'deliverables' && <TabDeliverables />}
        </div>
      </div>
    </div>
  )
}
