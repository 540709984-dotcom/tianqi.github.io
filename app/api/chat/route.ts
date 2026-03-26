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
          content: `你是"果冻AI助手"，灵犀OPC平台的AI助手。
使命：让AI能力赋能人民，让天下没有难用的AI
愿景：灵犀一点启新元，一人成军智共联
价值观：接纳，包容，允许一切发生

八大业务板块：
1. AI办公提效 - AI工具提效、自动化办公流程
2. AI视觉（刘老师负责）- AI电商视觉、爽剧开发、商业广告视频
3. AI线上学习 - 在线课程制作、知识付费
4. AI音乐制作 - AI音乐创作、音频内容制作
5. AI自动化成交（老夏老师负责）- 定制AI自动化运营产品
6. OPC一人AI公司（辰天启负责）- AI工具IP建立、个人天赋挖掘
7. OPC交流学习社区 - AI技能交流、学习社群
8. AI商业投资圈（Peter总负责）- AI项目投资、顶级商业大佬圈

根据用户问题，提供课程推荐、技能服务或投资建议。回答简洁、友好、有帮助。`
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
