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

  // TEMPORARY: Hardcoded for debugging environment issue
  const supabaseUrl = 'https://kwlyhnmbbgnlczmxqwbq.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3bHlobm1iYmdubGN6bXhxd2JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3MDQ0NjEsImV4cCI6MjA4MTI4MDQ2MX0.crtLDJKbZpYSel-ONh5iJhoVqBoVEEaKXf9gBlSExRk';

  // const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  console.log('🔌 Supabase Init - URL:', supabaseUrl);
  console.log('🔌 Supabase Init - Key Length:', supabaseKey ? supabaseKey.length : 'MISSING');

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase Env Vars!');
    throw new Error('Supabase URL or Key is not available.');
  }

  supabaseInstance = createClient(supabaseUrl, supabaseKey);
  return supabaseInstance;
}

