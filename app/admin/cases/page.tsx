'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

interface Case {
  id: string
  emoji: string
  title: string
  metric: string
  description: string
  tag: string
  color: string
  sort_order: number
  is_published: boolean
  created_at: string
}

const COLOR_OPTIONS = [
  { value: 'from-amber-500 to-orange-600', label: '橙色' },
  { value: 'from-blue-500 to-indigo-600', label: '蓝色' },
  { value: 'from-emerald-500 to-teal-600', label: '绿色' },
  { value: 'from-violet-500 to-purple-600', label: '紫色' },
  { value: 'from-pink-500 to-rose-600', label: '粉色' },
]

const EMPTY_FORM: Omit<Case, 'id' | 'created_at'> = {
  emoji: '',
  title: '',
  metric: '',
  description: '',
  tag: '',
  color: COLOR_OPTIONS[0].value,
  sort_order: 0,
  is_published: true,
}

export default function CasesPage() {
  const [cases, setCases] = useState<Case[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editingCase, setEditingCase] = useState<Case | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  useEffect(() => {
    fetchCases()
  }, [])

  async function fetchCases() {
    setLoading(true)
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .order('sort_order', { ascending: true })
    if (error) {
      showToast('error', '加载失败：' + error.message)
    } else {
      setCases(data ?? [])
    }
    setLoading(false)
  }

  function showToast(type: 'success' | 'error', message: string) {
    setToast({ type, message })
    setTimeout(() => setToast(null), 3000)
  }

  function openAdd() {
    setEditingCase(null)
    setForm(EMPTY_FORM)
    setDialogOpen(true)
  }

  function openEdit(c: Case) {
    setEditingCase(c)
    setForm({
      emoji: c.emoji,
      title: c.title,
      metric: c.metric,
      description: c.description,
      tag: c.tag,
      color: c.color,
      sort_order: c.sort_order,
      is_published: c.is_published,
    })
    setDialogOpen(true)
  }

  function openDelete(id: string) {
    setDeletingId(id)
    setDeleteDialogOpen(true)
  }

  async function handleSubmit() {
    setSubmitting(true)
    try {
      if (editingCase) {
        const { error } = await supabase
          .from('cases')
          .update(form)
          .eq('id', editingCase.id)
        if (error) throw error
        showToast('success', '✅ 案例已更新')
      } else {
        const { error } = await supabase.from('cases').insert(form)
        if (error) throw error
        showToast('success', '✅ 案例已添加')
      }
      setDialogOpen(false)
      await fetchCases()
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : '操作失败'
      showToast('error', msg)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete() {
    if (!deletingId) return
    setSubmitting(true)
    try {
      const { error } = await supabase.from('cases').delete().eq('id', deletingId)
      if (error) throw error
      showToast('success', '✅ 已删除')
      setDeleteDialogOpen(false)
      await fetchCases()
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : '删除失败'
      showToast('error', msg)
    } finally {
      setSubmitting(false)
    }
  }

  async function togglePublish(c: Case) {
    const { error } = await supabase
      .from('cases')
      .update({ is_published: !c.is_published })
      .eq('id', c.id)
    if (error) {
      showToast('error', '更新失败')
    } else {
      setCases((prev) =>
        prev.map((item) =>
          item.id === c.id ? { ...item, is_published: !item.is_published } : item
        )
      )
    }
  }

  const inputClass =
    'border border-gray-200 rounded-xl px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-400'

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-sm font-medium shadow-lg ${
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
        <h1 className="text-xl font-bold text-gray-900">成功案例</h1>
        <button
          onClick={openAdd}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          + 添加案例
        </button>
      </div>

      {/* List */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3 animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-2/3" />
              <div className="h-8 bg-gray-100 rounded w-1/3" />
              <div className="h-4 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      ) : cases.length === 0 ? (
        <div className="text-center text-gray-400 py-20">暂无案例，点击「+ 添加案例」创建</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {cases.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{c.emoji}</span>
                  <span className="font-semibold text-gray-900 text-sm">{c.title}</span>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    c.is_published
                      ? 'bg-green-50 text-green-600'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {c.is_published ? '已发布' : '草稿'}
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{c.metric}</div>
              <p className="text-sm text-gray-500 line-clamp-2">{c.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {c.tag}
                </span>
                <div className="flex items-center gap-2">
                  {/* Publish toggle */}
                  <button
                    onClick={() => togglePublish(c)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      c.is_published ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                        c.is_published ? 'translate-x-4' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => openEdit(c)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm transition-colors"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => openDelete(c.id)}
                    className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg text-sm transition-colors"
                  >
                    删除
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit/Add Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingCase ? '编辑案例' : '添加案例'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-gray-500">Emoji</label>
                <input
                  className={inputClass}
                  value={form.emoji}
                  onChange={(e) => setForm({ ...form, emoji: e.target.value })}
                  placeholder="🚀"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500">标题</label>
                <input
                  className={inputClass}
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="案例标题"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-500">指标数字</label>
              <input
                className={inputClass}
                value={form.metric}
                onChange={(e) => setForm({ ...form, metric: e.target.value })}
                placeholder="如：300% 增长"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-500">描述</label>
              <textarea
                className={`${inputClass} resize-none`}
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="案例简介"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-gray-500">标签</label>
                <input
                  className={inputClass}
                  value={form.tag}
                  onChange={(e) => setForm({ ...form, tag: e.target.value })}
                  placeholder="行业标签"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500">排序</label>
                <input
                  type="number"
                  className={inputClass}
                  value={form.sort_order}
                  onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-500">颜色</label>
              <select
                className={inputClass}
                value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
              >
                {COLOR_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <button
              onClick={() => setDialogOpen(false)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className={`bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                submitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {submitting ? '保存中...' : '保存'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500 py-2">此操作不可撤销，确定要删除这个案例吗？</p>
          <DialogFooter>
            <button
              onClick={() => setDeleteDialogOpen(false)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleDelete}
              disabled={submitting}
              className={`bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                submitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {submitting ? '删除中...' : '确认删除'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
