'use client';
import { useEffect, useState, useCallback } from 'react';

/**
 * Fetch from a Supabase table with automatic fallback to static data.
 * Subscribes to real-time changes when `realtimeTable` is provided.
 */
export function useSupabaseData<T>(
  table: string,
  options: {
    select?: string;
    filter?: Record<string, unknown>;
    orderBy?: string;
    orderAsc?: boolean;
    fallback: T[];
    realtimeTable?: string;
  }
) {
  const { select = '*', filter = {}, orderBy = 'order_index', orderAsc = true, fallback, realtimeTable } = options;
  const [data,    setData]    = useState<T[]>(fallback);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const { supabase } = await import('@/lib/supabase');
      let q = supabase.from(table).select(select);
      Object.entries(filter).forEach(([k, v]) => { q = (q as any).eq(k, v); });
      q = (q as any).order(orderBy, { ascending: orderAsc });
      const { data: rows, error } = await (q as any);
      if (!error && rows && rows.length > 0) setData(rows as T[]);
    } catch {
      // Supabase not configured — keep fallback
    } finally {
      setLoading(false);
    }
  }, [table, select, orderBy, orderAsc]);

  useEffect(() => {
    fetchData();

    if (!realtimeTable) return;
    let channel: ReturnType<typeof import('@/lib/supabase').supabase.channel> | null = null;
    import('@/lib/supabase').then(({ supabase }) => {
      try {
        channel = supabase
          .channel(`${realtimeTable}_realtime`)
          .on('postgres_changes' as any, { event: '*', schema: 'public', table: realtimeTable }, fetchData)
          .subscribe();
      } catch { /* Supabase not configured */ }
    });

    return () => {
      if (channel) {
        import('@/lib/supabase').then(({ supabase }) => supabase.removeChannel(channel!));
      }
    };
  }, [fetchData, realtimeTable]);

  return { data, loading, refetch: fetchData };
}
