import { createClient } from '@supabase/supabase-js'

// 服务端客户端（用于 API routes 和 Server Components）
export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
