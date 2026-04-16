// Per-IP + action rate limiting backed by Supabase `rate_limits` table.
// Only service_role can read/write — called from Edge Function internals.

import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const WINDOW_MINUTES = 60;
const MAX_PER_WINDOW = 3;

export async function checkAndIncrement(
  supabaseAdmin: SupabaseClient,
  ip: string,
  action: string,
): Promise<boolean> {
  const since = new Date(Date.now() - WINDOW_MINUTES * 60_000).toISOString();
  const { count, error: countError } = await supabaseAdmin
    .from('rate_limits')
    .select('id', { count: 'exact', head: true })
    .eq('ip', ip)
    .eq('action', action)
    .gte('created_at', since);
  if (countError) throw countError;
  if ((count ?? 0) >= MAX_PER_WINDOW) return false;
  const { error: insertError } = await supabaseAdmin
    .from('rate_limits')
    .insert({ ip, action });
  if (insertError) throw insertError;
  return true;
}
