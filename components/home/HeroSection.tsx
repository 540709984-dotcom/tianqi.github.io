'use client';

import { useState, useEffect } from 'react';

const TYPING_TEXTS = [
  'AI全自动化交付',
  '一人公司模式',
  '降本增效利器',
  '数字分身IP',
];

export default function HeroSection() {
  const [currentText, setCurrentText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const text = TYPING_TEXTS[textIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(text.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
        if (charIndex + 1 === text.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(text.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % TYPING_TEXTS.length);
        }
      }
    }, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 overflow-hidden particle-bg">
      {/* 背景光晕 */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[150px] pointer-events-none" />

      {/* 主标题 */}
      <h1 className="relative text-6xl md:text-7xl lg:text-8xl font-bold text-center leading-tight mb-6">
        <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
          果冻OPC
        </span>
      </h1>

      {/* 副标题 + 打字机 */}
      <div className="relative text-xl md:text-2xl text-white/50 text-center mb-4 h-10">
        <span className="text-white/30">你的</span>
        <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-semibold mx-2">
          {currentText}
        </span>
        <span className="inline-block w-[2px] h-6 bg-purple-400 animate-pulse ml-1 align-middle" />
      </div>

      {/* 描述 */}
      <p className="relative text-base md:text-lg text-white/30 text-center max-w-2xl mb-10 leading-relaxed">
        Hermes生态 · AI自动化商业落地 · 一人公司赋能平台
      </p>

      {/* CTA 按钮组 */}
      <div className="relative flex flex-col sm:flex-row gap-4 items-center">
        <a
          href="#skills"
          className="group relative px-10 py-4 rounded-full font-semibold text-white overflow-hidden
            bg-gradient-to-r from-purple-600 to-cyan-500
            hover:shadow-[0_0_40px_rgba(139,92,246,0.4),0_0_80px_rgba(6,182,212,0.2)]
            transition-all duration-500"
        >
          {/* 流光扫过 */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <span className="relative">开始探索</span>
        </a>
        <a
          href="#pricing"
          className="px-10 py-4 rounded-full font-semibold text-white/60 border border-white/10
            hover:border-purple-500/40 hover:text-white/80 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]
            transition-all duration-500"
        >
          查看定价
        </a>
      </div>

      {/* 底部装饰线 */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
    </section>
  );
}
