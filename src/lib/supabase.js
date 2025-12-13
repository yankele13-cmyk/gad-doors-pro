import { createClient } from '@supabase/supabase-js';



let supabaseInstance;

try {
    const url = 'https://whstcylkadklvjzfwdmz.supabase.co';
    const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indoc3RjeWxrYWRrbHZqemZ3ZG16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2ODg2NjksImV4cCI6MjA3OTI2NDY2OX0.pNi4cRthEiJiccrQEKC3FzH_4T5ZPFRjR6Wiqq8WKrI';

    console.log('[Supabase] Initializing with inlined credentials...');
    console.log('[Supabase] URL Length:', url?.length);
    console.log('[Supabase] Key Length:', key?.length);

    if (!url || url.length < 10) throw new Error('URL is invalid/empty');

    supabaseInstance = createClient(url, key);
    console.log('[Supabase] Client created successfully.');
} catch (error) {
    console.error('[Supabase] CRITICAL INIT ERROR:', error.message);
    
    // Chainable fallback mock to prevent app crash
    const mockBuilder = {
        select: () => mockBuilder,
        order: () => mockBuilder,
        eq: () => mockBuilder,
        match: () => mockBuilder,
        limit: () => mockBuilder,
        single: () => Promise.resolve({ data: null, error: { message: 'Supabase Init Failed' } }),
        then: (resolve) => resolve({ data: [], error: { message: 'Supabase Init Failed' } }) // Makes it awaitable
    };

    supabaseInstance = {
        from: () => mockBuilder,
        auth: {
            getSession: () => Promise.resolve({ data: { session: null }, error: null }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        }
    };
}

export const supabase = supabaseInstance;
