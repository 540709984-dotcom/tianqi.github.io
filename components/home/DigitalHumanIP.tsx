'use client';

export default function DigitalHumanIP() {
  return (
    <section className="relative px-6 py-20 overflow-hidden">
      {/* 背景光晕 */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* 左侧：头像区 + 旋转光圈 */}
        <div className="relative flex-shrink-0">
          {/* 外层旋转光圈 */}
          <div className="absolute inset-[-8px] rounded-full spin-glow opacity-40" />
          {/* 内层光圈 */}
          <div className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-purple-500/30 to-cyan-500/30 blur-sm" />
          {/* 头像 */}
          <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-purple-500/30 shadow-[0_0_40px_rgba(139,92,246,0.2)]">
            <div className="w-full h-full bg-gradient-to-br from-purple-900/80 to-cyan-900/60 flex items-center justify-center">
              <span className="text-7xl md:text-8xl">🧬</span>
            </div>
          </div>
          {/* 呼吸光点 */}
          <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_12px_rgba(6,182,212,0.6)]" />
        </div>

        {/* 右侧：信息卡 */}
        <div className="flex-1 space-y-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                数字分身IP
              </span>
            </h2>
            <p className="text-lg text-white/30">星识OPC · 疗愈师专属AI自动化IP</p>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-purple-400 mt-0.5">◆</span>
              <div>
                <p className="text-white/80 font-medium mb-1">知识库自动构建</p>
                <p className="text-sm text-white/35">将你的专业知识自动整理为AI可调用的知识图谱</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-cyan-400 mt-0.5">◆</span>
              <div>
                <p className="text-white/80 font-medium mb-1">7×24小时在线分身</p>
                <p className="text-sm text-white/35">你的AI分身全天候接待客户，不遗漏任何商机</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-violet-400 mt-0.5">◆</span>
              <div>
                <p className="text-white/80 font-medium mb-1">知识变现新路径</p>
                <p className="text-sm text-white/35">从一对一服务升级为一对多AI交付，收入10倍增长</p>
              </div>
            </div>
          </div>

          <a
            href="https://sekotalk.com"
            target="_blank"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-medium text-sm text-white
              bg-gradient-to-r from-purple-600 to-cyan-500
              hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]
              transition-all duration-500"
          >
            了解星识OPC
            <span className="text-white/60">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
