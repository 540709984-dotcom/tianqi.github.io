'use client'
import { useState, useRef, useEffect } from 'react'

export default function JellyAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '你好！我是果冻AI助手 👋\n\n我可以帮你学习AI技能、找到数字员工、制定AI投资方案！有什么想了解的吗？' }
  ])
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

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

  const quickQuestions = ['AI自动化怎么学？', 'OPC一人公司是什么？', '如何加入投资圈？']

  return (
    <>
      {/* Floating button — Apple-style */}
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

      {/* Chat panel */}
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

            {/* Messages */}
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
                    onClick={() => { setMessage(q); setTimeout(handleSend, 0) }}
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
                  className="flex-1 px-4 py-3 bg-gray-100/80 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:bg-white transition-all disabled:opacity-60 resize-none"
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
