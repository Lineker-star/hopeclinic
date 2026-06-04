/**
 * Shared CRUD helpers for admin API routes.
 * All operations use supabaseAdmin (service role — bypasses RLS).
 */
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getAdminSession } from './auth';

type Table =
  | 'news_bar'
  | 'departments'
  | 'services'
  | 'doctors'
  | 'staff'
  | 'blog_posts'
  | 'gallery_items'
  | 'hope_clinic_locations'
  | 'appointments'
  | 'contact_messages'
  | 'testimonials'
  | 'partners'
  | 'site_settings';

/** Require a valid admin session — returns null on success, NextResponse on failure */
export async function requireAdmin(): Promise<NextResponse | null> {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return null;
}

/** GET: list all rows from a table */
export async function listRows(
  table: Table,
  options: {
    select?: string;
    filters?: Record<string, unknown>;
    order?: string;
    ascending?: boolean;
  } = {}
) {
  const { select = '*', filters = {}, order = 'order_index', ascending = true } = options;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let q: any = supabaseAdmin.from(table).select(select);
  for (const [k, v] of Object.entries(filters)) {
    q = q.eq(k, v);
  }
  q = q.order(order, { ascending });
  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

/** POST: insert a row */
export async function insertRow(table: Table, body: Record<string, unknown>) {
  const auth = await requireAdmin();
  if (auth) return auth;
  const { data, error } = await supabaseAdmin.from(table).insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

/** PUT: update a row by id */
export async function updateRow(
  table: Table,
  id: string,
  body: Record<string, unknown>
) {
  const auth = await requireAdmin();
  if (auth) return auth;
  const payload = { ...body, updated_at: new Date().toISOString() };
  const { data, error } = await supabaseAdmin.from(table).update(payload).eq('id', id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

/** DELETE: remove a row by id */
export async function deleteRow(table: Table, id: string) {
  const auth = await requireAdmin();
  if (auth) return auth;
  const { error } = await supabaseAdmin.from(table).delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

/** Parse id from params (Next.js 15 params are a Promise) */
export async function parseId(params: Promise<{ id: string }>): Promise<string> {
  const { id } = await params;
  return id;
}
