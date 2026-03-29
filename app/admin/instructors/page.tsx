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

interface Instructor {
  id: string
  name: string
  title: string
  bio: string
  avatar_url: string | null
  specialties: string[]
  sort_order: number
  is_published: boolean
  created_at: string
}

const EMPTY_FORM = {
  name: '',
  title: '',
  bio: '',
  avatar_url: '',
  specialties: '',
  sort_order: 0,
  is_published: true,
}

export default function InstructorsPage() {
  const [instructors, setInstructors] = useState<Instructor[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editingInstructor, setEditingInstructor] = useState<Instructor | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  useEffect(() => {
    fetchInstructors()
  }, [])

  async function fetchInstructors() {
    setLoading(true)
    const { data, error } = await supabase
      .from('instructors')
      .select('*')
      .order('sort_order', { ascending: true })
    if (error) {
      showToast('error', '加载失败：' + error.message)
    } else {
      setInstructors(data ?? [])
    }
    setLoading(false)
  }

  function showToast(type: 'success' | 'error', message: string) {
    setToast({ type, message })
    setTimeout(() => setToast(null), 3000)
  }

  function openAdd() {
    setEditingInstructor(null)
    setForm(EMPTY_FORM)
    setDialogOpen(true)
  }

  function openEdit(ins: Instructor) {
    setEditingInstructor(ins)
    setForm({
      name: ins.name,
      title: ins.title,
      bio: ins.bio,
      avatar_url: ins.avatar_url ?? '',
      specialties: ins.specialties?.join(',') ?? '',
      sort_order: ins.sort_order,
      is_published: ins.is_published,
    })
    setDialogOpen(true)
  }

  function openDelete(id: string) {
    setDeletingId(id)
    setDeleteDialogOpen(true)
  }

  async function handleSubmit() {
    setSubmitting(true)
    const payload = {
      name: form.name,
      title: form.title,
      bio: form.bio,
      avatar_url: form.avatar_url || null,
      specialties: form.specialties
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      sort_order: form.sort_order,
      is_published: form.is_published,
    }
    try {
      if (editingInstructor) {
        const { error } = await supabase
          .from('instructors')
          .update(payload)
          .eq('id', editingInstructor.id)
        if (error) throw error
        showToast('success', '✅ 导师信息已更新')
      } else {
        const { error } = await supabase.from('instructors').insert(payload)
        if (error) throw error
        showToast('success', '✅ 导师已添加')
      }
      setDialogOpen(false)
      await fetchInstructors()
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
      const { error } = await supabase.from('instructors').delete().eq('id', deletingId)
      if (error) throw error
      showToast('success', '✅ 已删除')
      setDeleteDialogOpen(false)
      await fetchInstructors()
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : '删除失败'
      showToast('error', msg)
    } finally {
      setSubmitting(false)
    }
  }

  async function togglePublish(ins: Instructor) {
    const { error } = await supabase
      .from('instructors')
      .update({ is_published: !ins.is_published })
      .eq('id', ins.id)
    if (error) {
      showToast('error', '更新失败')
    } else {
      setInstructors((prev) =>
        prev.map((item) =>
          item.id === ins.id ? { ...item, is_published: !item.is_published } : item
        )
      )
    }
  }

  const inputClass =
    'border border-gray-200 rounded-xl px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-400'

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
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
        <h1 className="text-xl font-bold text-gray-900">导师管理</h1>
        <button
          onClick={openAdd}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          + 添加导师
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full" />
                <div className="space-y-1.5">
                  <div className="h-4 bg-gray-200 rounded w-24" />
                  <div className="h-3 bg-gray-100 rounded w-32" />
                </div>
              </div>
              <div className="h-4 bg-gray-100 rounded" />
              <div className="h-4 bg-gray-100 rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : instructors.length === 0 ? (
        <div className="text-center text-gray-400 py-20">暂无导师，点击「+ 添加导师」创建</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {instructors.map((ins) => (
            <div key={ins.id} className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
              {/* Avatar + name */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-xl">
                  {ins.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={ins.avatar_url} alt={ins.name} className="w-full h-full object-cover" />
                  ) : (
                    <span>👤</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900">{ins.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{ins.title}</div>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                    ins.is_published
                      ? 'bg-green-50 text-green-600'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {ins.is_published ? '已发布' : '草稿'}
                </span>
              </div>

              {/* Bio */}
              <p className="text-sm text-gray-500 line-clamp-2">{ins.bio}</p>

              {/* Specialties */}
              {ins.specialties && ins.specialties.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {ins.specialties.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => togglePublish(ins)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    ins.is_published ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                      ins.is_published ? 'translate-x-4' : 'translate-x-1'
                    }`}
                  />
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEdit(ins)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm transition-colors"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => openDelete(ins.id)}
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
            <DialogTitle>{editingInstructor ? '编辑导师' : '添加导师'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-gray-500">姓名</label>
                <input
                  className={inputClass}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="导师姓名"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500">职称</label>
                <input
                  className={inputClass}
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="AI商业战略专家"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-500">简介</label>
              <textarea
                className={`${inputClass} resize-none`}
                rows={3}
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                placeholder="导师个人简介"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-500">头像 URL</label>
              <input
                className={inputClass}
                value={form.avatar_url}
                onChange={(e) => setForm({ ...form, avatar_url: e.target.value })}
                placeholder="请输入图片URL或留空使用emoji占位"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-500">特长标签（逗号分隔）</label>
              <input
                className={inputClass}
                value={form.specialties}
                onChange={(e) => setForm({ ...form, specialties: e.target.value })}
                placeholder="华为BLM,AI战略,降本增效"
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
          <p className="text-sm text-gray-500 py-2">此操作不可撤销，确定要删除该导师吗？</p>
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
