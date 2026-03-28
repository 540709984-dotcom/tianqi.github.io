'use client'
import { useState, useRef, useEffect } from 'react'

interface CalcResult {
  originalMonthly: number
  afterAIMonthly: number
  monthlySaving: number
  yearlySaving: number
  paybackMonths: number
}

export default function JellyAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'chat' | 'calc'>('chat')

  // ── Chat state ──
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '你好！我是果冻AI助手 👋\n\n我可以帮你学习AI技能、找到数字员工、制定AI投资方案！有什么想了解的吗？' }
  ])
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // ── Calculator state ──
  const [designCount, setDesignCount] = useState(0)
  const [designSalary, setDesignSalary] = useState(10000)
  const [opsCount, setOpsCount] = useState(0)
  const [opsSalary, setOpsSalary] = useState(8000)
  const [serviceCount, setServiceCount] = useState(0)
  const [serviceSalary, setServiceSalary] = useState(6000)
  const [devCount, setDevCount] = useState(0)
  const [devSalary, setDevSalary] = useState(20000)
  const [calcResult, setCalcResult] = useState<CalcResult | null>(null)

  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen, activeTab])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // ── Chat handlers ──
  const handleSend = async () => {
    if (!message.trim() || loading) return
    const userMsg = message.trim()
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setMessage('')
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      })

      if (!response.ok) {
        throw new Error(`服务异常 (${response.status})`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const reply = data.reply || '抱歉，我暂时无法回答。'
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      const msg = err instanceof Error ? err.message : '网络异常，请稍后再试'
      setError(msg)
      setMessages(prev => [...prev, { role: 'assistant', content: `⚠️ ${msg}` }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const quickQuestions = [
    '我有10个人的团队，怎么降本？',
    'OpenClaw+n8n是什么？',
    '199元和98000元有什么区别？',
    '哪个板块最适合跨境电商？',
  ]

  // ── Calculator handler ──
  const calculate = () => {
    const designCost = designCount * designSalary * (1 - 0.80)
    const opsCost = opsCount * opsSalary * (1 - 0.70)
    const serviceCost = serviceCount * serviceSalary * (1 - 0.80)
    const devCost = devCount * devSalary * (1 - 0.75)

    const originalMonthly = designCount * designSalary + opsCount * opsSalary + serviceCount * serviceSalary + devCount * devSalary
    const afterAIMonthly = designCost + opsCost + serviceCost + devCost
    const monthlySaving = originalMonthly - afterAIMonthly
    const yearlySaving = monthlySaving * 12
    const paybackMonths = monthlySaving > 0 ? Math.ceil(98000 / monthlySaving) : 0

    setCalcResult({ originalMonthly, afterAIMonthly, monthlySaving, yearlySaving, paybackMonths })
  }

  const toWan = (n: number) => (n / 10000).toFixed(2)

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`
          fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full shadow-2xl
          bg-gradient-to-br from-emerald-400 to-emerald-600
          text-white text-2xl
          flex items-center justify-center
          hover:scale-110 active:scale-95
          transition-all duration-200
          ${isOpen ? 'opacity-0 pointer-events-none scale-90' : 'opacity-100'}
        `}
        aria-label="打开果冻AI助手"
      >
        🤖
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 backdrop-blur-sm p-4">
          <div
            className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200/50"
            style={{ maxHeight: '85vh', animation: 'slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1) both' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100/80 bg-white/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-xl shadow-sm">
                  🤖
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight">果冻AI助手</h3>
                  <p className="text-xs text-emerald-500 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    在线
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all active:scale-90 text-lg"
              >
                ×
              </button>
            </div>

            {/* Tab switcher */}
            <div className="flex border-b border-gray-100 bg-white/80 px-4 pt-2 gap-2">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-2 text-sm font-medium rounded-t-xl transition-all ${
                  activeTab === 'chat'
                    ? 'text-emerald-600 border-b-2 border-emerald-500 bg-emerald-50/60'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                💬 AI对话
              </button>
              <button
                onClick={() => setActiveTab('calc')}
                className={`flex-1 py-2 text-sm font-medium rounded-t-xl transition-all ${
                  activeTab === 'calc'
                    ? 'text-emerald-600 border-b-2 border-emerald-500 bg-emerald-50/60'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                🧮 成本计算
              </button>
            </div>

            {/* ── Tab: Chat ── */}
            {activeTab === 'chat' && (
              <>
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ minHeight: 0 }}>
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`
                        max-w-[82%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
                        ${msg.role === 'user'
                          ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-br-sm shadow-sm'
                          : msg.content.startsWith('⚠️')
                            ? 'bg-red-50 text-red-700 border border-red-100 rounded-bl-sm'
                            : 'bg-gray-100/80 text-gray-800 rounded-bl-sm'
                        }
                      `}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100/80 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>

                {/* Quick questions */}
                {messages.length <= 1 && !loading && (
                  <div className="px-4 pb-2 flex gap-2 flex-wrap">
                    {quickQuestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setMessage(q)
                          setTimeout(() => {
                            setMessages(prev => [...prev, { role: 'user', content: q }])
                            setMessage('')
                            setLoading(true)
                            setError(null)
                            fetch('/api/chat', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ message: q }),
                            })
                              .then(r => r.json())
                              .then(data => {
                                if (data.error) throw new Error(data.error)
                                setMessages(prev => [...prev, { role: 'assistant', content: data.reply || '抱歉，我暂时无法回答。' }])
                              })
                              .catch(err => {
                                const msg = err instanceof Error ? err.message : '网络异常'
                                setError(msg)
                                setMessages(prev => [...prev, { role: 'assistant', content: `⚠️ ${msg}` }])
                              })
                              .finally(() => setLoading(false))
                          }, 0)
                        }}
                        className="text-xs px-3 py-1.5 rounded-full border border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 active:scale-95 transition-all"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input */}
                <div className="px-4 pb-5 pt-2 border-t border-gray-100/60">
                  {error && (
                    <p className="text-xs text-red-500 mb-2 px-1">⚠️ {error}</p>
                  )}
                  <div className="flex gap-2 items-end">
                    <input
                      ref={inputRef}
                      type="text"
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="想学习什么AI技能？"
                      disabled={loading}
                      className="flex-1 px-4 py-3 bg-gray-100/80 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:bg-white transition-all disabled:opacity-60"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!message.trim() || loading}
                      className="w-11 h-11 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-2xl disabled:opacity-40 hover:opacity-90 active:scale-90 transition-all shadow-sm flex-shrink-0 text-lg"
                    >
                      ↑
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* ── Tab: Calculator ── */}
            {activeTab === 'calc' && (
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4" style={{ minHeight: 0 }}>
                <p className="text-base font-semibold text-gray-800 text-center">算一下，你能省多少？</p>

                {/* Input rows */}
                {[
                  { label: '设计', count: designCount, setCount: setDesignCount, salary: designSalary, setSalary: setDesignSalary, defaultSalary: 10000 },
                  { label: '运营', count: opsCount, setCount: setOpsCount, salary: opsSalary, setSalary: setOpsSalary, defaultSalary: 8000 },
                  { label: '客服', count: serviceCount, setCount: setServiceCount, salary: serviceSalary, setSalary: setServiceSalary, defaultSalary: 6000 },
                  { label: '开发', count: devCount, setCount: setDevCount, salary: devSalary, setSalary: setDevSalary, defaultSalary: 20000 },
                ].map(({ label, count, setCount, salary, setSalary }) => (
                  <div key={label} className="bg-gray-50 rounded-2xl p-3 space-y-2">
                    <p className="text-xs font-medium text-gray-500">{label}岗位</p>
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-gray-500 w-10 shrink-0">人数</label>
                      <input
                        type="number"
                        min={0}
                        value={count}
                        onChange={e => setCount(Math.max(0, Number(e.target.value)))}
                        className="w-20 px-2 py-1.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                      />
                      <span className="text-xs text-gray-400">人</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-gray-500 w-10 shrink-0">均薪</label>
                      <input
                        type="number"
                        min={0}
                        value={salary}
                        onChange={e => setSalary(Math.max(0, Number(e.target.value)))}
                        className="w-24 px-2 py-1.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                      />
                      <span className="text-xs text-gray-400">元/月</span>
                    </div>
                  </div>
                ))}

                {/* Calculate button */}
                <button
                  onClick={calculate}
                  className="w-full py-3 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white text-sm font-semibold rounded-2xl hover:opacity-90 active:scale-95 transition-all shadow-sm"
                >
                  计算
                </button>

                {/* Result */}
                {calcResult && (
                  <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 space-y-2 text-sm">
                    <div className="flex justify-between text-gray-700">
                      <span>当前月均人力成本</span>
                      <span className="font-semibold">{toWan(calcResult.originalMonthly)} 万元</span>
                    </div>
                    <div className="flex justify-between text-gray-500 text-xs">
                      <span>AI替代后月均成本<span className="ml-1 text-gray-400">(设计80%/运营70%/客服80%/开发75%)</span></span>
                      <span className="font-medium">{toWan(calcResult.afterAIMonthly)} 万元</span>
                    </div>
                    <div className="border-t border-emerald-200 pt-2 flex justify-between text-gray-700">
                      <span>每月节省</span>
                      <span className="font-semibold text-emerald-600">{toWan(calcResult.monthlySaving)} 万元</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>每年节省</span>
                      <span className="font-semibold text-emerald-600">{toWan(calcResult.yearlySaving)} 万元</span>
                    </div>
                    {calcResult.monthlySaving > 0 && (
                      <div className="flex justify-between text-gray-700">
                        <span>年度陪跑回收周期</span>
                        <span className="font-semibold text-emerald-600">{calcResult.paybackMonths} 月内回本</span>
                      </div>
                    )}
                    <div className="mt-2 py-2 px-3 bg-emerald-100 rounded-xl text-emerald-700 text-xs font-semibold text-center">
                      年节省 {toWan(calcResult.yearlySaving)} 万元，年度陪跑仅需 9.8万/年
                    </div>
                    <a
                      href="/contact"
                      className="block mt-2 w-full py-2.5 text-center text-sm font-semibold text-white bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-sm"
                    >
                      预约企业诊断，算清这笔账 →
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(50px) scale(0.96); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
      `}</style>
    </>
  )
}
