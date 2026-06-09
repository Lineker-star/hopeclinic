export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, unknown>;
    const { name, email, phone, subject, message } = body;
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'name, email and message are required' }, { status: 400 });
    }
    const { error } = await supabaseAdmin
      .from('contact_messages')
      .insert({ name, email, phone: phone ?? null, subject: subject ?? 'General Inquiry', message });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
