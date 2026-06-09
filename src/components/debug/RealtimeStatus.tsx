'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function RealtimeStatus() {
  const [status, setStatus] = useState<'connecting' | 'connected' | 'error'>('connecting')

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    const supabase = createClient()
    const channel = supabase
      .channel('debug_connection')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_settings' }, () => {})
      .subscribe((s) => {
        if (s === 'SUBSCRIBED')                      setStatus('connected')
        if (s === 'CHANNEL_ERROR' || s === 'TIMED_OUT') setStatus('error')
      })
    return () => { supabase.removeChannel(channel) }
  }, [])

  if (process.env.NODE_ENV !== 'development') return null

  const colors = { connecting: 'orange', connected: 'green', error: 'red' } as const
  return (
    <div style={{
      position: 'fixed', bottom: 8, left: 8,
      background: colors[status], color: 'white',
      padding: '4px 8px', borderRadius: 4, fontSize: 12, zIndex: 9999,
    }}>
      Supabase Realtime: {status}
    </div>
  )
}
