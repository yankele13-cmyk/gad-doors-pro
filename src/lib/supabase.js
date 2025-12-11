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

// Single instance of Supabase client
export const supabase =
  isValidUrl(supabaseUrl) && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : {
        from: () => {
          console.error(
            'Supabase client not initialized. Missing or invalid NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.'
          );
          return {
            select: async () => ({ data: [], error: { message: 'Supabase not initialized' } }),
            insert: async () => ({ data: [], error: { message: 'Supabase not initialized' } }),
            update: async () => ({ data: [], error: { message: 'Supabase not initialized' } }),
            delete: async () => ({ data: [], error: { message: 'Supabase not initialized' } }),
          };
        },
        storage: {
          from: () => ({
            upload: async () => ({ data: null, error: { message: 'Supabase not initialized' } }),
            getPublicUrl: () => ({ data: { publicUrl: '' } }),
          }),
        },
      };

if (!supabase || !isValidUrl(supabaseUrl) || !supabaseKey) {
  console.warn(
    'Supabase client not initialized. Missing or invalid NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.'
  );
}
