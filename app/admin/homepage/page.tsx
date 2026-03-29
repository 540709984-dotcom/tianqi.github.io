'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

interface HomepageConfig {
  id: string
  config_key: string
  config_value: string
  description: string
  updated_at: string
}

const GROUPS: { label: string; keys: string[] }[] = [
  {
    label: 'Hero 区域',
    keys: [
      'hero_title_line1',
      'hero_title_line2',
      'hero_subtitle',
      'hero_badge_text',
      'hero_cta_primary',
      'hero_cta_secondary',
    ],
  },
  {
    label: '数据统计',
    keys: [
      'stat_1_value',
      'stat_2_value',
      'stat_3_value',
      'stat_4_value',
      'stat_1_label',
      'stat_2_label',
      'stat_3_label',
      'stat_4_label',
    ],
  },
  {
    label: '其他',
    keys: ['footer_tagline'],
  },
]

export default function HomepagePage() {
  const [configs, setConfigs] = useState<Record<string, string>>({})
  const [descriptions, setDescriptions] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  useEffect(() => {
    fetchConfigs()
  }, [])

  async function fetchConfigs() {
    setLoading(true)
    const { data, error } = await supabase.from('homepage_config').select('*')
    if (error) {
      showToast('error', '加载失败：' + error.message)
    } else if (data) {
      const vals: Record<string, string> = {}
      const descs: Record<string, string> = {}
      data.forEach((item: HomepageConfig) => {
        vals[item.config_key] = item.config_value
        descs[item.config_key] = item.description
      })
      setConfigs(vals)
      setDescriptions(descs)
    }
    setLoading(false)
  }

  function showToast(type: 'success' | 'error', message: string) {
    setToast({ type, message })
    setTimeout(() => setToast(null), 3000)
  }

  async function handleSave() {
    setSaving(true)
    try {
      const promises = Object.entries(configs).map(([key, value]) =>
        supabase
          .from('homepage_config')
          .update({ config_value: value, updated_at: new Date().toISOString() })
          .eq('config_key', key)
      )
      const results = await Promise.all(promises)
      const failed = results.filter((r) => r.error)
      if (failed.length > 0) {
        showToast('error', `保存失败：${failed[0].error?.message}`)
      } else {
        showToast('success', '✅ 已保存')
      }
    } catch (e) {
      showToast('error', '保存时发生未知错误')
    } finally {
      setSaving(false)
    }
  }

  const SkeletonRow = () => (
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
      <div className="h-9 bg-gray-100 rounded-xl animate-pulse" />
    </div>
  )

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-sm font-medium shadow-lg transition-all ${
            toast.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">首页配置</h1>
          <p className="text-sm text-gray-500 mt-0.5">修改后实时生效</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || loading}
          className={`bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            (saving || loading) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {saving ? '保存中...' : '保存所有更改'}
        </button>
      </div>

      {/* Groups */}
      {loading
        ? GROUPS.map((group) => (
            <div key={group.label} className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
              {group.keys.map((k) => (
                <SkeletonRow key={k} />
              ))}
            </div>
          ))
        : GROUPS.map((group) => (
            <div key={group.label} className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                {group.label}
              </p>
              {group.keys.map((key) => (
                <div key={key} className="space-y-1">
                  <label className="block text-sm text-gray-700">
                    {descriptions[key] || key}
                    <span className="ml-2 text-xs text-gray-400 font-mono">{key}</span>
                  </label>
                  <input
                    type="text"
                    value={configs[key] ?? ''}
                    onChange={(e) =>
                      setConfigs((prev) => ({ ...prev, [key]: e.target.value }))
                    }
                    className="border border-gray-200 rounded-xl px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-400"
                  />
                </div>
              ))}
            </div>
          ))}
    </div>
  )
}
