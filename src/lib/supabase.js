import { createClient } from '@supabase/supabase-js';

const DEBUG_URL = 'https://whstcylkadklvjzfwdmz.supabase.co';
const DEBUG_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indoc3RjeWxrYWRrbHZqemZ3ZG16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2ODg2NjksImV4cCI6MjA3OTI2NDY2OX0.pNi4cRthEiJiccrQEKC3FzH_4T5ZPFRjR6Wiqq8WKrI'; // Legacy Anon Key

console.log('[Supabase] Initializing...');
console.log('[Supabase] URL Type:', typeof DEBUG_URL);
console.log('[Supabase] URL Value:', DEBUG_URL);
console.log('[Supabase] Key Type:', typeof DEBUG_KEY);
console.log('[Supabase] Key Length:', DEBUG_KEY?.length);

let supabaseInstance;

try {
    if (!DEBUG_URL) throw new Error('DEBUG_URL is missing');
    if (!DEBUG_KEY) throw new Error('DEBUG_KEY is missing');
    
    supabaseInstance = createClient(DEBUG_URL, DEBUG_KEY);
    console.log('[Supabase] Client created successfully.');
} catch (error) {
    console.error('[Supabase] CRITICAL INIT ERROR:', error.message);
    console.error('[Supabase] Attempted URL:', DEBUG_URL);
    console.error('[Supabase] Attempted Key Length:', DEBUG_KEY?.length);
    
    // Fallback mock to prevent app crash
    supabaseInstance = {
        from: () => ({
            select: () => Promise.resolve({ data: [], error: { message: 'Supabase Init Failed' } }),
            insert: () => Promise.resolve({ data: [], error: { message: 'Supabase Init Failed' } }),
            update: () => Promise.resolve({ data: [], error: { message: 'Supabase Init Failed' } }),
            delete: () => Promise.resolve({ data: [], error: { message: 'Supabase Init Failed' } }),
        }),
        auth: {
            getSession: () => Promise.resolve({ data: { session: null }, error: null }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        }
    };
}

export const supabase = supabaseInstance;
