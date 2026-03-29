'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
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

const COLOR_OPTIONS = [
  { value: 'from-amber-500 to-orange-600', label: '橙色（全自动化）' },
  { value: 'from-emerald-500 to-teal-600', label: '绿色（OPC）' },
  { value: 'from-blue-500 to-indigo-600', label: '蓝色（AI商业）' },
  { value: 'from-violet-500 to-purple-600', label: '紫色（AI编程）' },
  { value: 'from-pink-500 to-rose-600', label: '粉色（AI视觉）' },
]

export default function CoursesPage() {
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  useEffect(() => {
    fetchCourses()
  }, [])

  function showToast(type: 'success' | 'error', message: string) {
    setToast({ type, message })
    setTimeout(() => setToast(null), 3000)
  }

  async function fetchCourses() {
    setLoading(true)
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('sort_order', { ascending: true })
    if (error) {
      showToast('error', '加载失败：' + error.message)
    } else {
      setCourses(data || [])
    }
    setLoading(false)
  }

  async function togglePublish(course: Course) {
    const newValue = !course.is_published
    const { error } = await supabase
      .from('courses')
      .update({ is_published: newValue, updated_at: new Date().toISOString() })
      .eq('id', course.id)
    if (error) {
      showToast('error', '更新失败：' + error.message)
    } else {
      setCourses((prev) =>
        prev.map((c) => (c.id === course.id ? { ...c, is_published: newValue } : c))
      )
      showToast('success', newValue ? '✅ 已发布' : '已取消发布')
    }
  }

  async function handleCreate() {
    setCreating(true)
    const { data, error } = await supabase
      .from('courses')
      .insert({
        name: '新课程',
        slug: `course-${Date.now()}`,
        icon: '📚',
        color: 'from-emerald-500 to-teal-600',
        tagline: '',
        hero_title: '',
        hero_desc: '',
        target_user: '',
        cta: '立即报名',
        sort_order: courses.length,
        is_published: false,
      })
      .select()
      .single()
    if (error) {
      showToast('error', '创建失败：' + error.message)
      setCreating(false)
    } else if (data) {
      router.push(`/admin/courses/${data.id}`)
    }
  }

  function getColorClass(color: string) {
    return COLOR_OPTIONS.find((c) => c.value === color)?.value || 'from-emerald-500 to-teal-600'
  }

  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 animate-pulse">
      <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-3 bg-gray-100 rounded w-1/5" />
        <div className="h-3 bg-gray-100 rounded w-1/2" />
      </div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-6 bg-gray-200 rounded-full" />
        <div className="w-20 h-8 bg-gray-100 rounded-xl" />
      </div>
    </div>
  )

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">课程管理</h1>
          <p className="text-sm text-gray-500 mt-0.5">管理所有课程信息与发布状态</p>
        </div>
        <button
          onClick={handleCreate}
          disabled={creating}
          className={`bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-1.5 ${
            creating ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {creating ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              创建中...
            </>
          ) : (
            <>+ 新建课程</>
          )}
        </button>
      </div>

      {/* Course List */}
      <div className="space-y-3">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : courses.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-gray-500 text-sm">暂无课程，点击「+ 新建课程」开始创建</p>
          </div>
        ) : (
          courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 hover:border-gray-200 transition-colors"
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-full bg-gradient-to-br ${getColorClass(course.color)} flex items-center justify-center text-xl flex-shrink-0 shadow-sm`}
              >
                {course.icon || '📚'}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 text-sm truncate">{course.name || '（未命名）'}</p>
                <p className="text-xs text-gray-400 font-mono mt-0.5">{course.slug}</p>
                {course.tagline && (
                  <p className="text-xs text-gray-500 mt-1 truncate">{course.tagline}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 flex-shrink-0">
                {/* Publish Toggle */}
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${course.is_published ? 'text-green-600' : 'text-gray-400'}`}>
                    {course.is_published ? '已发布' : '草稿'}
                  </span>
                  <button
                    onClick={() => togglePublish(course)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                      course.is_published ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                        course.is_published ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => router.push(`/admin/courses/${course.id}`)}
                  className="border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors"
                >
                  编辑详情
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
