import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// 服务端客户端（用于 API routes 和 Server Components）
export function createServerClient() {
  if (!supabaseUrl || !supabaseKey) {
    console.warn('[supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY, returning null client')
    return null as unknown as ReturnType<typeof createClient>
  }
  return createClient(supabaseUrl, supabaseKey)
}
