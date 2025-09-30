import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export const SUPABASE_URL = window.env?.SUPABASE_URL ?? 'https://qxaopcsdfytwlxnjfoeo.supabase.co';
export const SUPABASE_ANON_KEY = window.env?.SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4YW9wY3NkZnl0d2x4bmpmb2VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4NjcyMDUsImV4cCI6MjA3MjQ0MzIwNX0.YrPshZ8VUe-ag-jUhRD1a4uohrBqH_zrfEzOoytenr4';

if (!SUPABASE_URL || !SUPABASE_URL.startsWith('http')) {
  console.warn('[supabaseClient] Please configure SUPABASE_URL');
}

if (!SUPABASE_ANON_KEY || SUPABASE_ANON_KEY.includes('YOUR_SUPABASE_ANON_KEY')) {
  console.warn('[supabaseClient] Please configure SUPABASE_ANON_KEY');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
