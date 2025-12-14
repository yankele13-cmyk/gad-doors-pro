import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if the environment variables are set
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or Key is not defined in environment variables.');
}

// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

