'use client';

import { useState, useRef, useEffect } from 'react';

export default function JellyAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '你好！我是果冻AI助手 👋\n\n我可以帮你学习AI技能、找到数字员工、制定AI投资方案！有什么想了解的吗？' },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!message.trim() || loading) return;
    const userMsg = message.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setMessage('');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });
      if (!response.ok) throw new Error(`服务异常 (${response.status})`);
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || '抱歉，我暂时无法回答。' }]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : '网络异常，请稍后再试';
      setError(msg);
      setMessages(prev => [...prev, { role: 'assistant', content: `⚠️ ${msg}` }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const quickQuestions = [
    '我有10个人的团队，怎么降本？',
    '199元和98000元有什么区别？',
    '哪个板块最适合跨境电商？',
  ];

  return (
    <>
      {/* 悬浮按钮 */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 text-white text-2xl flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] hover:scale-110 active:scale-95 transition-all duration-300 ${isOpen ? 'opacity-0 pointer-events-none scale-90' : 'opacity-100'}`}
        aria-label="打开果冻AI助手"
      >
        🤖
      </button>

      {/* 聊天面板 */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div
            className="w-full max-w-md flex flex-col overflow-hidden rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-[0_0_60px_rgba(139,92,246,0.1)]"
            style={{ maxHeight: '85vh', animation: 'slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1) both' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-lg shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                  🤖
                </div>
                <div>
                  <h3 className="font-semibold text-white/90 text-sm">果冻AI助手</h3>
                  <p className="text-xs text-purple-400/80 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block animate-pulse" />
                    在线
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 text-white/30 hover:text-white/60 transition-all active:scale-90"
              >
                ×
              </button>
            </div>

            {/* 消息区 */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ minHeight: 0 }}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[82%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? 'bg-gradient-to-br from-purple-600/80 to-cyan-500/80 text-white rounded-br-sm shadow-[0_0_15px_rgba(139,92,246,0.15)]' : msg.content.startsWith('⚠️') ? 'bg-red-500/10 text-red-300 border border-red-500/20 rounded-bl-sm' : 'bg-white/[0.04] text-white/70 border border-white/[0.06] rounded-bl-sm'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.04] rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-purple-400/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-cyan-400/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* 快捷问题 */}
            {messages.length <= 1 && !loading && (
              <div className="px-4 pb-2 flex gap-2 flex-wrap">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => { setMessage(q); }}
                    className="text-xs px-3 py-1.5 rounded-full border border-purple-500/20 text-purple-300/70 bg-purple-500/5 hover:bg-purple-500/10 hover:border-purple-500/30 active:scale-95 transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* 输入区 */}
            <div className="px-4 pb-5 pt-2 border-t border-white/[0.06]">
              {error && <p className="text-xs text-red-400/80 mb-2 px-1">⚠️ {error}</p>}
              <div className="flex gap-2 items-end">
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="想学习什么AI技能？"
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-purple-500/40 focus:shadow-[0_0_15px_rgba(139,92,246,0.1)] transition-all duration-300 disabled:opacity-40"
                />
                <button
                  onClick={handleSend}
                  disabled={!message.trim() || loading}
                  className="w-11 h-11 flex items-center justify-center bg-gradient-to-br from-purple-600 to-cyan-500 text-white rounded-xl disabled:opacity-30 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] active:scale-90 transition-all duration-300 flex-shrink-0 text-lg"
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
  );
}
