import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// If env vars are missing, export a tiny stub that mirrors the shape we use
// (.from(table).insert(row) → { error }) so forms fail cleanly in dev without
// crashing the page. Typed as `any` to avoid constraining the stub to the full
// SupabaseClient surface; call sites only destructure `{ error }`.
const stub = {
  from: () => ({
    insert: async () => ({ error: new Error('Supabase not configured') }),
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

export const supabase = url && anonKey ? createClient(url, anonKey) : stub;

export const isSupabaseConfigured = Boolean(url && anonKey);
