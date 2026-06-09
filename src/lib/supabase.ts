import { createClient as createSupabaseClient, type SupabaseClient } from '@supabase/supabase-js';
import { createClient } from './supabase/client';

let _admin: SupabaseClient | null = null;

function adminClient(): SupabaseClient {
  if (!_admin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
    const svc = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
    if (!url.startsWith('https://')) throw new Error('Set NEXT_PUBLIC_SUPABASE_URL in .env.local');
    _admin = createSupabaseClient(url, svc);
  }
  return _admin;
}

// Anon client — reuses the singleton from ./supabase/client (prevents duplicate GoTrueClient)
export const supabase = createClient();

// Admin client — service-role key, server-side only
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_, p) { return (adminClient() as unknown as Record<string | symbol, unknown>)[p]; },
});
