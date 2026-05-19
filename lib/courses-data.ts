export type Course = {
  slug: string
  name: string
  icon: string
  color: string        // Tailwind gradient class
  tagline: string      // 一句话定位
  heroTitle: string    // 大标题
  heroDesc: string     // 副标题
  prices: {
    name: string
    price: string
    desc: string
  }[]
  features: {          // 核心特点（4-6条）
    title: string
    desc: string
    icon: string
  }[]
  deliverables: string[]  // 学完能做什么
  targetUser: string   // 目标用户画像
  mentor: {            // 负责导师
    name: string
    title: string
    avatar: string      // emoji or icon
  }
  cta: string          // CTA按钮文字
}

export const coursesData: Course[] = [
  {
    slug: 'full-auto',
    name: '全自动化AI产品交付',
    icon: '⚡',
    color: 'from-amber-500 to-orange-600',
    tagline: '终极变现 · 企业年度陪跑',
    heroTitle: '让企业真正跑起来\n不再依赖人海战术',
    heroDesc: '高频1对1业务诊断 · 定制自动化工作流 · 全年技术迭代兜底',
    prices: [
      { name: '企业年度陪跑', price: '¥98,000/年', desc: '1v1诊断+定制工作流+全年技术兜底' },
    ],
    features: [
      { title: '业务流全链路自动化', desc: '从销售到交付，AI驱动全流程', icon: '🔄' },
      { title: '定制OpenClaw+n8n工作流', desc: '专属企业的自动化解决方案', icon: '⚙️' },
      { title: '全年技术迭代兜底', desc: '新工具、新模型第一时间接入', icon: '🛡️' },
      { title: '高频1对1业务诊断', desc: '专属顾问，持续优化', icon: '🎯' },
      { title: '温州案例复制', desc: '50人→30人降本方法论落地', icon: '📊' },
      { title: '年省人力成本目标', desc: '典型案例年省120万+', icon: '💰' },
    ],
    deliverables: [
      '企业AI转型诊断报告',
      '定制化自动化工作流系统',
      '全年技术支持与迭代',
      'ROI计算报告（投资回报分析）',
    ],
    targetUser: '25-40岁跨境电商老板 & 中小工作室创始人，团队10人以上，有明确降本增效需求',
    mentor: {
      name: '辰天启导师',
      title: '工信部第一批AI导师 · AI基因锁哲学创始人 · 20万IP博主',
      avatar: '🌟',
    },
    cta: '预约企业诊断（免费）',
  },
  {
    slug: 'opc-company',
    name: 'OPC一人AI公司',
    icon: '🚀',
    color: 'from-emerald-500 to-teal-600',
    tagline: '核心心智 · 一人成军',
    heroTitle: '一个人\n干掉一个团队',
    heroDesc: '找到适合你的商业模式 · AI替代4类岗位 · 建立可持续增长系统',
    prices: [
      { name: '录播课', price: '¥5,999', desc: '思维框架+案例拆解+能力组合' },
      { name: '私教+3月陪跑', price: '¥49,800', desc: '极度定制，2天1夜+3个月陪跑' },
    ],
    features: [
      { title: '商业模式设计', desc: '产品+服务+课程+版权四位一体', icon: '🗺️' },
      { title: 'AI替代设计岗', desc: '成本降低80%，效率提升5-10倍', icon: '🎨' },
      { title: 'AI替代运营岗', desc: 'n8n+OpenClaw，成本降低70%', icon: '⚡' },
      { title: 'AI替代客服岗', desc: 'AI客服Agent，成本降低80%', icon: '💬' },
      { title: 'AI替代开发岗', desc: 'Cursor+OpenClaw，成本降低75%', icon: '💻' },
      { title: '收入增长系统', desc: '客户获取+留存+产品标准化', icon: '📈' },
    ],
    deliverables: [
      '能力盘点报告（你适合做什么一人公司）',
      '一人公司商业模式画布',
      'AI工具替代方案（针对你的团队）',
      '月营收增长路径图',
    ],
    targetUser: '35-45岁创业者/企业主，有一定商业经验，想建立一人公司或改造现有业务',
    mentor: {
      name: '辰天启导师',
      title: '工信部第一批AI导师 · AI基因锁哲学创始人 · 20万IP博主',
      avatar: '🌟',
    },
    cta: '立即加入',
  },
  {
    slug: 'ai-business',
    name: 'AI商业',
    icon: '💼',
    color: 'from-blue-500 to-indigo-600',
    tagline: '现金流主力 · 降本增效实战',
    heroTitle: '算清一笔账\n老板你就下单了',
    heroDesc: 'AI降本增效实战模型 · 跨境电商全链路SOP · 温州老板案例完整拆解',
    prices: [
      { name: '录播课', price: '¥3,999', desc: '华为体系+AI工具包，自学完整课程' },
      { name: '线下私房课', price: '¥19,800/天', desc: '2天1夜，小班8-12人，离开时拿到落地方案' },
      { name: '年度会员', price: '¥9,800/年', desc: 'AI工具前沿更新+圈子人脉+社群答疑' },
    ],
    features: [
      { title: '华为BLM战略模型', desc: 'AI辅助生成企业战略分析报告', icon: '🏢' },
      { title: '铁三角销售体系', desc: 'AI自动化驱动销售跟进流程', icon: '🎯' },
      { title: '私域自动化SOP', desc: 'n8n+企微，自动管理客户', icon: '🤖' },
      { title: '数据看板搭建', desc: '经营数据自动采集+AI分析', icon: '📊' },
      { title: '温州案例完整方法论', desc: '50人→30人，降本1/3的完整打法', icon: '⭐' },
      { title: '2天出可用系统', desc: '私房课离开时拿到跑通的Demo', icon: '✅' },
    ],
    deliverables: [
      '企业AI转型诊断报告（AI生成+人工确认）',
      '私域自动化SOP（已配置测试）',
      '商业模式画布（AI辅助优化版）',
      'OpenClaw商业自动化工作流配置文件',
    ],
    targetUser: '中小企业主、创业公司CEO，35-45岁，有团队但人效低、成本高，看到别人用AI赚钱自己不知从何下手',
    mentor: {
      name: '皮特导师',
      title: '原华某为老总 · 擅长商业架构开发',
      avatar: '💼',
    },
    cta: '了解详情',
  },
  {
    slug: 'ai-coding',
    name: 'AI编程',
    icon: '🤖',
    color: 'from-violet-500 to-purple-600',
    tagline: '技术壁垒 · 不需要会写代码',
    heroTitle: '不会写代码\n也能建系统',
    heroDesc: 'OpenClaw + n8n 组合拳 · 用自然语言驱动AI搭建商业工具',
    prices: [
      { name: '录播课', price: '¥4,999', desc: '工具入门+场景演示，3个标准项目' },
      { name: '线下私房课', price: '¥24,800/天', desc: '2天1夜，手把手完成真实项目' },
    ],
    features: [
      { title: 'OpenClaw专家级应用', desc: '市场稀缺，别人没有的深度', icon: '🔑' },
      { title: 'n8n无代码自动化', desc: '拖拽搭建，无需写代码', icon: '🧩' },
      { title: '自然语言编程', desc: '用中文描述需求，AI生成代码', icon: '💬' },
      { title: '私域自动化系统', desc: '企微自动回复+标签+数据统计', icon: '📱' },
      { title: '数据看板自动化', desc: 'Python+OpenClaw，节省半天人工/天', icon: '📈' },
      { title: '商业变现导向', desc: '别人教工具，我们教用工具赚钱', icon: '💰' },
    ],
    deliverables: [
      '私域自动化系统（可直接部署）',
      'AI内容采集与分析系统',
      '数据看板自动化（基础版）',
      'OpenClaw+n8n工作流模板库',
    ],
    targetUser: '企业主/运营/创业者，不会写代码，想用AI工具解决80%的商业自动化需求',
    mentor: {
      name: '老夏导师',
      title: '原谷歌工程师',
      avatar: '🤖',
    },
    cta: '立即开课',
  },
  {
    slug: 'ai-visual',
    name: 'AI视觉',
    icon: '🎨',
    color: 'from-pink-500 to-rose-600',
    tagline: '流量入口 · 工具+变现+品牌三合一',
    heroTitle: '从会用工具\n到用工具赚钱',
    heroDesc: 'Lovart.ai + 即梦/可灵 · 电商产品图·短视频·品牌视觉全覆盖',
    prices: [
      { name: '录播引流课', price: '¥199', desc: 'Lovart.ai+即梦/可灵完整教程，导演思维' },
      { name: '线下私房课', price: '¥16,800/天', desc: '1天，当场出10张商业作品+完整变现系统' },
    ],
    features: [
      { title: 'Lovart.ai专家级实战', desc: '最强AI视觉工具，系统完整讲解', icon: '🖼️' },
      { title: '即梦/可灵/海螺三件套', desc: '国内最强视频生成工具组合', icon: '🎬' },
      { title: '电商产品图全链路', desc: '多SKU+多尺寸批量生成', icon: '🛍️' },
      { title: '短视频视觉制作', desc: '抖音/小红书爆款封面+视频', icon: '📱' },
      { title: '商业接单系统', desc: '如何报价·接单·交付，副业月入8K+', icon: '💼' },
      { title: '动态视频接单', desc: '30-700元/秒，取决于资源池', icon: '💰' },
    ],
    deliverables: [
      '当天出10张高质量商业作品',
      '完整接单流程+报价体系',
      '批量生产工作流（可复用）',
      '工具测评联盟推广渠道（被动收入）',
    ],
    targetUser: '设计师/电商运营/内容创作者/自由职业者，想用AI视觉增加收入或降低设计成本',
    mentor: {
      name: '老刘导师',
      title: '深耕10年的跨境电商老板',
      avatar: '🎨',
    },
    cta: '199元立即开始',
  },
]
