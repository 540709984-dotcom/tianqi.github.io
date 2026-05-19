import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const isSupabaseConfigured = !!(supabaseUrl && supabaseKey)

// Create a no-op client that won't crash when Supabase is not configured
function createNoOpClient(): SupabaseClient {
  const noOpPromise = () => Promise.resolve({ data: { user: null, subscription: { unsubscribe: () => {} } }, error: null, session: null })
  return {
    auth: {
      getUser: noOpPromise,
      getSession: noOpPromise,
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: noOpPromise,
      signUp: noOpPromise,
      signOut: noOpPromise,
    } as any,
    from: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
      insert: () => Promise.resolve({ data: null, error: null }),
      delete: () => ({
        eq: () => Promise.resolve({ data: null, error: null }),
      }),
    }),
  } as any
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : createNoOpClient()
