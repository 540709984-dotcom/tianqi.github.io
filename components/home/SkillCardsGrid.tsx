'use client';

import { useState } from 'react';

interface Skill {
  id: string;
  icon: string;
  title: string;
  desc: string;
  tag: string;
  tagColor: string;
}

const SKILLS: Skill[] = [
  {
    id: 'automation',
    icon: '⚡',
    title: 'AI全自动化',
    desc: 'Hermes+n8n双引擎，业务流程全自动交付，7×24小时无人值守运行',
    tag: '核心',
    tagColor: 'from-purple-500 to-violet-600',
  },
  {
    id: 'opc',
    icon: '🏢',
    title: 'OPC一人公司',
    desc: '一个人+AI工具=一个团队，从获客到交付全链路AI赋能',
    tag: '模式',
    tagColor: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'business',
    icon: '💰',
    title: 'AI商业落地',
    desc: '跨境电商、制造业、咨询行业AI应用，真实ROI数据验证',
    tag: '变现',
    tagColor: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'coding',
    icon: '💻',
    title: 'AI编程',
    desc: 'AI辅助编程提效5-10倍，从需求到代码一键生成',
    tag: '工具',
    tagColor: 'from-orange-500 to-amber-500',
  },
  {
    id: 'visual',
    icon: '🎨',
    title: 'AI视觉',
    desc: 'AI图像生成、视频制作、数字人IP打造，创意生产力革命',
    tag: '创意',
    tagColor: 'from-pink-500 to-rose-500',
  },
  {
    id: 'digital-human',
    icon: '🧬',
    title: '数字分身IP',
    desc: '星识OPC工具，疗愈师专属AI自动化IP，知识变现新路径',
    tag: 'IP',
    tagColor: 'from-violet-500 to-purple-600',
  },
];

export default function SkillCardsGrid() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="skills" className="relative px-6 py-20">
      {/* 标题区 */}
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            五大核心板块
          </span>
        </h2>
        <p className="text-lg text-white/30">从自动化到商业变现，AI全链路赋能</p>
      </div>

      {/* 卡片网格 */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILLS.map((skill) => (
          <div
            key={skill.id}
            className="group relative glass-card rounded-2xl p-8 cursor-pointer overflow-hidden"
            onMouseEnter={() => setHoveredId(skill.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* 顶部渐变光条 */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* 图标 */}
            <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300"
              style={{ filter: hoveredId === skill.id ? 'drop-shadow(0 0 12px rgba(139,92,246,0.5))' : 'none' }}
            >
              {skill.icon}
            </div>

            {/* 标签 */}
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white mb-4 bg-gradient-to-r ${skill.tagColor} opacity-80`}>
              {skill.tag}
            </span>

            {/* 标题 */}
            <h3 className="text-xl font-semibold text-white/90 mb-3 group-hover:text-white transition-colors">
              {skill.title}
            </h3>

            {/* 描述 */}
            <p className="text-sm text-white/35 leading-relaxed group-hover:text-white/50 transition-colors">
              {skill.desc}
            </p>

            {/* 底部装饰 */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/0 to-transparent group-hover:via-purple-500/20 transition-all duration-500" />
          </div>
        ))}
      </div>
    </section>
  );
}
