/**
 * Supabase Client Configuration
 * 
 * Connexion active à la base de données Supabase
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

console.log('Supabase Init Debug:', { 
  urlExists: !!supabaseUrl, 
  keyExists: !!supabaseKey, 
  urlLength: supabaseUrl ? supabaseUrl.length : 0,
  urlValue: supabaseUrl // Safe to log public URL
});

const isValidUrl = (url) => {
  if (!url) return false;
  try {
    return Boolean(new URL(url));
  } catch (e) {
    console.error('Invalid URL format:', url, e);
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
          const mockChain = {
            select: () => mockChain,
            order: () => mockChain,
            eq: () => mockChain,
            single: () => ({ data: null, error: { message: 'Supabase not initialized' } }),
            then: (resolve) => resolve({ data: [], error: { message: 'Supabase not initialized' } }),
            insert: () => mockChain,
            update: () => mockChain,
            delete: () => mockChain,
          };
          return mockChain;
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
