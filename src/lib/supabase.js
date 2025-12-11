/**
 * Supabase Client Configuration
 * 
 * Connexion active à la base de données Supabase
 */

import { createClient } from '@supabase/supabase-js';

console.log('✅ Supabase Client v2.0 Initializing...');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ CRITICAL: Supabase Env Vars missing in v2.0 check!', {
    url: !!supabaseUrl,
    key: !!supabaseKey
  });
}

// We rely on the Diag page proof: The vars ARE there. 
// So we create the client directly.
export const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey)
  : null; 
  // If null, productStore will handle it by checking "if (!supabase)".
  // This avoids the broken mock object causing "order is not a function" errors.
