import { createClient } from '@supabase/supabase-js';

let supabaseInstance = null;

/**
 * Gets a Supabase client instance.
 * Implements a singleton pattern to ensure only one instance is created.
 * @returns {import('@supabase/supabase-js').SupabaseClient}
 */
export function getSupabase() {
  if (supabaseInstance) {
    return supabaseInstance;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    // This check is important for the server-side build process
    // where env vars might not be available immediately.
    throw new Error('Supabase URL or Key is not available.');
  }

  supabaseInstance = createClient(supabaseUrl, supabaseKey);
  return supabaseInstance;
}

