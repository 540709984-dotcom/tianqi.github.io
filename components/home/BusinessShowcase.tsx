'use client';

import { useState } from 'react';

const BIZ_IMAGES = [
  { src: '/images/business/biz-1.jpg', alt: 'AI商业落地案例1' },
  { src: '/images/business/biz-2.jpg', alt: 'AI商业落地案例2' },
  { src: '/images/business/biz-3.jpg', alt: 'AI商业落地案例3' },
  { src: '/images/business/biz-4.jpg', alt: 'AI商业落地案例4' },
  { src: '/images/business/biz-5.jpg', alt: 'AI商业落地案例5' },
  { src: '/images/business/biz-6.jpg', alt: 'AI商业落地案例6' },
  { src: '/images/business/biz-7.jpg', alt: 'AI商业落地案例7' },
  { src: '/images/business/biz-8.jpg', alt: 'AI商业落地案例8' },
];

export default function BusinessShowcase() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <section className="relative px-6 py-20 overflow-hidden">
      {/* 背景光晕 */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* 标题 */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          <span className="bg-gradient-to-r from-emerald-200 via-blue-200 to-purple-200 bg-clip-text text-transparent">
            AI商业落地 · 实战案例
          </span>
        </h2>
        <p className="text-base text-white/30">降本增效真实数据 · 从方案到落地全链路</p>
      </div>

      {/* 图片网格 - 4列 */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {BIZ_IMAGES.map((img, idx) => (
          <div
            key={idx}
            className="group relative aspect-square rounded-2xl overflow-hidden glass-card cursor-pointer"
            onClick={() => setSelectedIdx(idx)}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
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
              src={BIZ_IMAGES[selectedIdx].src}
              alt={BIZ_IMAGES[selectedIdx].alt}
              className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
            />
            <button
              className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/10 backdrop-blur text-white/70 hover:text-white hover:bg-white/20 flex items-center justify-center transition-all"
              onClick={(e) => { e.stopPropagation(); setSelectedIdx(null); }}
            >
              ✕
            </button>
            {selectedIdx > 0 && (
              <button
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur text-white/70 hover:text-white hover:bg-white/20 flex items-center justify-center transition-all"
                onClick={(e) => { e.stopPropagation(); setSelectedIdx(selectedIdx - 1); }}
              >
                ←
              </button>
            )}
            {selectedIdx < BIZ_IMAGES.length - 1 && (
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
