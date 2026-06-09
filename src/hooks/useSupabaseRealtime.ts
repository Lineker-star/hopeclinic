'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { RealtimeChannel } from '@supabase/supabase-js'

export function useSupabaseRealtime<T>(
  table: string,
  fetcher: () => Promise<T>,
  initialData: T,
  filter?: string
) {
  const [data, setData]       = useState<T>(initialData)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const result = await fetcher()
      setData(result)
    } catch (e) {
      console.error(`Realtime fetch error for ${table}:`, e)
    } finally {
      setLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    refresh()

    const supabase = createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const channelConfig: any = { event: '*', schema: 'public', table }
    if (filter) channelConfig.filter = filter

    const channel: RealtimeChannel = supabase
      .channel(`realtime_${table}_${Date.now()}`)
      .on('postgres_changes', channelConfig, () => { refresh() })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED')    console.log(`✅ Realtime active for table: ${table}`)
        if (status === 'CHANNEL_ERROR') console.error(`❌ Realtime error for table: ${table}`)
      })

    return () => { supabase.removeChannel(channel) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, filter])

  return { data, loading, refresh }
}
