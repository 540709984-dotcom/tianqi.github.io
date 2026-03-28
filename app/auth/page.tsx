'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Error message localization
function localizeError(msg: string): string {
  if (msg.includes('Invalid login credentials')) return '邮箱或密码错误'
  if (msg.includes('User already registered')) return '该邮箱已注册，请直接登录'
  if (msg.includes('Password should be at least 6 characters')) return '密码至少6位'
  if (msg.includes('Email not confirmed')) return '邮箱未验证，请检查邮箱'
  if (msg.includes('Unable to validate email address')) return '邮箱格式不正确'
  return msg
}

export default function AuthPage() {
  const router = useRouter()

  // Login state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  // Register state
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regConfirm, setRegConfirm] = useState('')
  const [regError, setRegError] = useState('')
  const [regSuccess, setRegSuccess] = useState('')
  const [regLoading, setRegLoading] = useState(false)

  // Main tab
  const [mainTab, setMainTab] = useState<'login' | 'register'>('login')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoginError('')
    setLoginLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    })
    setLoginLoading(false)
    if (error) {
      setLoginError(localizeError(error.message))
    } else {
      router.push('/')
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setRegError('')
    setRegSuccess('')
    if (regPassword !== regConfirm) {
      setRegError('两次密码不一致')
      return
    }
    if (regPassword.length < 6) {
      setRegError('密码至少6位')
      return
    }
    setRegLoading(true)
    const { error } = await supabase.auth.signUp({
      email: regEmail,
      password: regPassword,
    })
    setRegLoading(false)
    if (error) {
      setRegError(localizeError(error.message))
    } else {
      setRegSuccess('注册成功！请检查邮箱完成验证，然后登录。')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-black mb-4 shadow-lg">
            <span className="text-white text-2xl font-bold">灵</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">灵犀OPC</h1>
          <p className="text-sm text-gray-500 mt-1">一人干掉一个团队</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 overflow-hidden">
          <div className="p-6">
            {/* Main Tabs */}
            <Tabs value={mainTab} onValueChange={(v) => setMainTab(v as 'login' | 'register')}>
              <TabsList className="w-full bg-gray-100 rounded-xl p-1 mb-6">
                <TabsTrigger value="login" className="flex-1 rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">
                  登录
                </TabsTrigger>
                <TabsTrigger value="register" className="flex-1 rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">
                  注册
                </TabsTrigger>
              </TabsList>

              {/* ========== LOGIN ========== */}
              <TabsContent value="login" className="mt-0">
                <Tabs defaultValue="email">
                  <TabsList className="w-full bg-gray-50 rounded-lg p-0.5 mb-5 h-8">
                    <TabsTrigger value="email" className="flex-1 text-xs rounded-md h-7 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      邮箱密码
                    </TabsTrigger>
                    <TabsTrigger value="phone" className="flex-1 text-xs rounded-md h-7 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      手机验证码
                    </TabsTrigger>
                  </TabsList>

                  {/* Email Login */}
                  <TabsContent value="email" className="mt-0">
                    <form onSubmit={handleLogin} className="space-y-3">
                      <div>
                        <Input
                          type="email"
                          placeholder="邮箱地址"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          required
                          className="h-11 rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-colors text-sm"
                        />
                      </div>
                      <div>
                        <Input
                          type="password"
                          placeholder="密码"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          required
                          className="h-11 rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-colors text-sm"
                        />
                      </div>
                      {loginError && (
                        <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">
                          {loginError}
                        </p>
                      )}
                      <Button
                        type="submit"
                        disabled={loginLoading}
                        className="w-full h-11 rounded-xl bg-black hover:bg-gray-800 text-white font-medium text-sm transition-colors"
                      >
                        {loginLoading ? '登录中...' : '登录'}
                      </Button>
                    </form>
                  </TabsContent>

                  {/* Phone Login (placeholder) */}
                  <TabsContent value="phone" className="mt-0">
                    <div className="text-center py-8 space-y-3">
                      <div className="text-3xl">📱</div>
                      <p className="text-sm text-gray-400">手机号登录即将开放</p>
                      <Button
                        disabled
                        className="w-full h-11 rounded-xl bg-gray-100 text-gray-400 font-medium text-sm cursor-not-allowed"
                        variant="ghost"
                      >
                        手机号登录 · 即将开放
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </TabsContent>

              {/* ========== REGISTER ========== */}
              <TabsContent value="register" className="mt-0">
                <Tabs defaultValue="email">
                  <TabsList className="w-full bg-gray-50 rounded-lg p-0.5 mb-5 h-8">
                    <TabsTrigger value="email" className="flex-1 text-xs rounded-md h-7 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      邮箱注册
                    </TabsTrigger>
                    <TabsTrigger value="phone" className="flex-1 text-xs rounded-md h-7 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      手机号注册
                    </TabsTrigger>
                  </TabsList>

                  {/* Email Register */}
                  <TabsContent value="email" className="mt-0">
                    <form onSubmit={handleRegister} className="space-y-3">
                      <div>
                        <Input
                          type="email"
                          placeholder="邮箱地址"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          required
                          className="h-11 rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-colors text-sm"
                        />
                      </div>
                      <div>
                        <Input
                          type="password"
                          placeholder="密码（至少6位）"
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          required
                          className="h-11 rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-colors text-sm"
                        />
                      </div>
                      <div>
                        <Input
                          type="password"
                          placeholder="确认密码"
                          value={regConfirm}
                          onChange={(e) => setRegConfirm(e.target.value)}
                          required
                          className="h-11 rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-colors text-sm"
                        />
                      </div>
                      {regError && (
                        <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">
                          {regError}
                        </p>
                      )}
                      {regSuccess && (
                        <p className="text-xs text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                          {regSuccess}
                        </p>
                      )}
                      <Button
                        type="submit"
                        disabled={regLoading}
                        className="w-full h-11 rounded-xl bg-black hover:bg-gray-800 text-white font-medium text-sm transition-colors"
                      >
                        {regLoading ? '注册中...' : '注册账号'}
                      </Button>
                    </form>
                  </TabsContent>

                  {/* Phone Register (placeholder) */}
                  <TabsContent value="phone" className="mt-0">
                    <div className="text-center py-8 space-y-3">
                      <div className="text-3xl">📱</div>
                      <p className="text-sm text-gray-400">手机号注册即将开放</p>
                      <Button
                        disabled
                        className="w-full h-11 rounded-xl bg-gray-100 text-gray-400 font-medium text-sm cursor-not-allowed"
                        variant="ghost"
                      >
                        手机号注册 · 即将开放
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </TabsContent>
            </Tabs>

            {/* Divider */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-gray-400">或</span>
              </div>
            </div>

            {/* WeChat Login (placeholder) */}
            <Button
              disabled
              className="w-full h-11 rounded-xl bg-gray-100 text-gray-400 font-medium text-sm cursor-not-allowed flex items-center justify-center gap-2"
              variant="ghost"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-gray-400">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.927a.272.272 0 0 0 .14.047c.134 0 .24-.11.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-7.062-6.122zm-3.74 2.470c.535 0 .969.44.969.983a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.543.434-.983.97-.983zm5.813 0c.535 0 .969.44.969.983a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.543.434-.983.97-.983z" />
              </svg>
              微信登录 · 即将开放
            </Button>
          </div>

          {/* Bottom switch */}
          <div className="px-6 pb-6 text-center">
            {mainTab === 'login' ? (
              <p className="text-xs text-gray-400">
                还没有账号？{' '}
                <button
                  onClick={() => setMainTab('register')}
                  className="text-gray-700 font-medium hover:underline"
                >
                  去注册
                </button>
              </p>
            ) : (
              <p className="text-xs text-gray-400">
                已有账号？{' '}
                <button
                  onClick={() => setMainTab('login')}
                  className="text-gray-700 font-medium hover:underline"
                >
                  去登录
                </button>
              </p>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          登录即代表同意{' '}
          <span className="text-gray-500 hover:underline cursor-pointer">服务条款</span>
          {' '}和{' '}
          <span className="text-gray-500 hover:underline cursor-pointer">隐私政策</span>
        </p>
      </div>
    </main>
  )
}
