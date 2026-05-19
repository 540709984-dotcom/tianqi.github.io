import { NextRequest, NextResponse } from 'next/server';

const DASHSCOPE_API_KEY = process.env.DASHSCOPE_API_KEY || '';
const DASHSCOPE_BASE_URL = process.env.DASHSCOPE_BASE_URL || '';
const DASHSCOPE_MODEL = process.env.DASHSCOPE_MODEL || 'qwen-plus';

// Force Node.js runtime
export const runtime = 'nodejs';

// System prompt for 果冻OPC AI assistant
const SYSTEM_PROMPT = `你是"果冻OPC"的AI助手，一个专业的AI自动化商业顾问。

你的核心身份：
- 你代表"果冻OPC"品牌，专注于帮助中小企业和跨境电商老板用AI降本增效
- 你的语气专业但亲切，像一个懂行的朋友在给建议
- 你擅长用具体数字说话，不卖焦虑只卖结果

你的知识范围：
1. AI全自动化交付：用Hermes+n8n等工具实现业务流程自动化
2. OPC一人公司模式：一个人+AI工具=一个团队的运作方式
3. AI商业落地：跨境电商、制造业等行业的AI应用案例
4. AI编程：用AI辅助编程提升开发效率
5. AI视觉：AI图像生成、视频制作等创意工具
6. 数字分身IP：星识OPC工具，疗愈师专属AI自动化IP

核心案例数据（可引用）：
- 温州制造业老板：50人→30人，裁掉1/3冗余人力，年省120万+
- 跨境电商卖家：GMV从200万增至374万，提升87%
- 企业咨询顾问：用AI+铁三角方法论，完成单笔1000万大单

定价体系（可引用）：
- 录播引流课：¥199（入门首选）
- 年度轻会员：¥9,800/年
- 线下标准实训：¥10,000/天
- 线下私房定制：¥19,800/天
- 企业年度陪跑：¥98,000/年（最高变现）

回答原则：
- 先给结论，再展开说明
- 用具体数字和案例佐证
- 不确定的信息明确告知
- 引导用户到合适的付费层级
- 简洁有力，不啰嗦`;

export async function POST(req: NextRequest) {
  try {
    if (!DASHSCOPE_API_KEY || !DASHSCOPE_BASE_URL) {
      return NextResponse.json(
        { error: '阿里云百炼配置缺失', details: { hasApiKey: !!DASHSCOPE_API_KEY, hasBaseUrl: !!DASHSCOPE_BASE_URL } },
        { status: 500 }
      );
    }

    const body = await req.json();
    const message = body.message || body.query || '';
    const sessionId = body.sessionId || 'default-session';

    if (!message) {
      return NextResponse.json({ error: '请提供message参数' }, { status: 400 });
    }

    console.log('[chat] Calling DashScope OpenAI-compatible:', message.substring(0, 50));

    // Build messages array with conversation history if provided
    const messages: Array<{ role: string; content: string }> = [
      { role: 'system', content: SYSTEM_PROMPT },
    ];

    // Add conversation history if provided
    if (body.history && Array.isArray(body.history)) {
      for (const msg of body.history) {
        if (msg.role === 'user' || msg.role === 'assistant') {
          messages.push({ role: msg.role, content: msg.content });
        }
      }
    }

    messages.push({ role: 'user', content: message });

    // Call DashScope OpenAI-compatible API
    const response = await fetch(`${DASHSCOPE_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DASHSCOPE_API_KEY}`,
      },
      body: JSON.stringify({
        model: DASHSCOPE_MODEL,
        messages,
        temperature: 0.7,
        top_p: 0.9,
        max_tokens: 2048,
        // Enable knowledge base search if available
        extra_body: {
          enable_search: true,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[chat] DashScope API error:', response.status, errorText);
      return NextResponse.json(
        { error: `阿里云API异常 (${response.status})`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('[chat] Response keys:', Object.keys(data));

    // Extract reply from OpenAI-compatible response format
    let replyText = '';

    if (data.choices && data.choices.length > 0) {
      const choice = data.choices[0];
      replyText = choice.message?.content || choice.text || '';
    }

    if (!replyText) {
      console.warn('[chat] Empty reply. Raw:', JSON.stringify(data).substring(0, 500));
      replyText = '抱歉，我暂时无法回答这个问题，请稍后再试或联系人工客服。';
    }

    console.log('[chat] Q:', message.substring(0, 30), '| A:', replyText.substring(0, 60));
    return NextResponse.json({ reply: replyText, sessionId });

  } catch (error: any) {
    console.error('[chat] Error:', error.message || error);
    return NextResponse.json(
      { error: '聊天服务异常', details: error.message || String(error) },
      { status: 500 }
    );
  }
}
