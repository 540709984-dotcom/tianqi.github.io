import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
})

export async function POST(request: Request) {
  try {
    const { message } = await request.json()
    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'claude-sonnet-4-6-thinking',
      max_tokens: 1024,
      messages: [
        {
          role: 'system',
          content: `你是灵犀OPC的智能助手，专门帮用户找到最适合他们的AI课程。

灵犀OPC五大板块：
1. 全自动化AI产品交付（98,000元/年）：企业年度陪跑，定制工作流，全年技术兜底
2. OPC一人AI公司（录播5,999 / 私教49,800）：找商业模式，AI替代团队，建增长系统
3. AI商业（录播3,999 / 私房19,800）：华为体系+AI落地，降本增效实战
4. AI编程（录播4,999 / 私房24,800）：OpenClaw+n8n组合，不需要会写代码
5. AI视觉（录播199 / 私房16,800）：Lovart.ai+即梦/可灵，工具+变现+品牌

核心理念：AI只是效率杠杆，赚钱核心是行业认知和资源。不卖焦虑，卖解决方案。

当用户描述痛点或需求时：
- 先理解他的核心问题
- 推荐最适合的1-2个板块
- 说明推荐理由（为什么这个板块能解决他的问题）
- 提供对应的价格和入口

如果用户说"人力成本高"→ 推荐全自动化或AI商业
如果用户说"想赚钱"→ 先问清楚他的能力，再推荐
如果用户说"不会写代码"→ 推荐AI编程（OpenClaw+n8n不需要写代码）
如果用户说"想做视频/设计"→ 推荐AI视觉
如果用户说"想建一人公司"→ 推荐OPC一人AI公司

回复要简短有力，不要超过200字，用中文回复。
推荐板块时在最后加一行：「👉 [板块名称](/courses/slug)」格式。`
        },
        { role: 'user', content: message }
      ],
    })
    const reply = completion.choices[0]?.message?.content || '抱歉，我暂时无法回答。'
    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ error: '无法连接AI服务' }, { status: 500 })
  }
}
