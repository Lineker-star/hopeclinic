import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let _pub:   SupabaseClient | null = null;
let _admin: SupabaseClient | null = null;

function pubClient(): SupabaseClient {
  if (!_pub) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
    if (!url.startsWith('https://')) throw new Error('Set NEXT_PUBLIC_SUPABASE_URL in .env.local');
    _pub = createClient(url, key);
  }
  return _pub;
}

function adminClient(): SupabaseClient {
  if (!_admin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
    const svc = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
    if (!url.startsWith('https://')) throw new Error('Set NEXT_PUBLIC_SUPABASE_URL in .env.local');
    _admin = createClient(url, svc);
  }
  return _admin;
}

// Proxy so usage looks like `supabase.from(...)` but client is only created on first call
export const supabase      = new Proxy({} as SupabaseClient, { get(_, p) { return (pubClient()   as unknown as Record<string | symbol, unknown>)[p]; } });
export const supabaseAdmin = new Proxy({} as SupabaseClient, { get(_, p) { return (adminClient() as unknown as Record<string | symbol, unknown>)[p]; } });
