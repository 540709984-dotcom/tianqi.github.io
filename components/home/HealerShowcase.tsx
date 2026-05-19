'use client';

import { useState } from 'react';

const HEALER_IMAGES = [
  { src: '/images/healer/healer-1.jpg', alt: '疗愈师AI视频IP展示1' },
  { src: '/images/healer/healer-2.jpg', alt: '疗愈师AI视频IP展示2' },
  { src: '/images/healer/healer-3.jpg', alt: '疗愈师AI视频IP展示3' },
  { src: '/images/healer/healer-4.jpg', alt: '疗愈师AI视频IP展示4' },
  { src: '/images/healer/healer-5.jpg', alt: '疗愈师AI视频IP展示5' },
  { src: '/images/healer/healer-6.jpg', alt: '疗愈师AI视频IP展示6' },
];

export default function HealerShowcase() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <section className="relative px-6 py-20 overflow-hidden">
      {/* 背景光晕 */}
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-cyan-600/5 rounded-full blur-[150px] pointer-events-none" />

      {/* 标题 */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          <span className="bg-gradient-to-r from-cyan-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
            疗愈师AI视频IP · 效果展示
          </span>
        </h2>
        <p className="text-base text-white/30">真实案例 · 数字分身驱动内容生产</p>
      </div>

      {/* 图片网格 */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
        {HEALER_IMAGES.map((img, idx) => (
          <div
            key={idx}
            className="group relative aspect-[3/4] rounded-2xl overflow-hidden glass-card cursor-pointer"
            onClick={() => setSelectedIdx(idx)}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* 悬浮遮罩 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>

      {/* 大图预览弹窗 */}
      {selectedIdx !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedIdx(null)}
        >
          <div className="relative max-w-3xl max-h-[85vh] mx-4">
            <img
              src={HEALER_IMAGES[selectedIdx].src}
              alt={HEALER_IMAGES[selectedIdx].alt}
              className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
            />
            {/* 关闭按钮 */}
            <button
              className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/10 backdrop-blur text-white/70 hover:text-white hover:bg-white/20 flex items-center justify-center transition-all"
              onClick={(e) => { e.stopPropagation(); setSelectedIdx(null); }}
            >
              ✕
            </button>
            {/* 左右切换 */}
            {selectedIdx > 0 && (
              <button
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur text-white/70 hover:text-white hover:bg-white/20 flex items-center justify-center transition-all"
                onClick={(e) => { e.stopPropagation(); setSelectedIdx(selectedIdx - 1); }}
              >
                ←
              </button>
            )}
            {selectedIdx < HEALER_IMAGES.length - 1 && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur text-white/70 hover:text-white hover:bg-white/20 flex items-center justify-center transition-all"
                onClick={(e) => { e.stopPropagation(); setSelectedIdx(selectedIdx + 1); }}
              >
                →
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
