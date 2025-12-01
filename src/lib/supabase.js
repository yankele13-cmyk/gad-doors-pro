/**
 * Supabase Client Configuration
 * 
 * Connexion active à la base de données Supabase
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isValidUrl = (url) => {
  try {
    return Boolean(new URL(url));
  } catch (e) {
    return false;
  }
};

export const supabase =
  supabaseUrl && supabaseKey && isValidUrl(supabaseUrl)
    ? createClient(supabaseUrl, supabaseKey)
    : null;

if (!supabase) {
  console.warn(
    'Supabase client not initialized. Missing or invalid NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.'
  );
}

// Note: L'export null empêche les erreurs si les variables ne sont pas définies
