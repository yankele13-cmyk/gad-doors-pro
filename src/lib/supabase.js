import { createClient } from '@supabase/supabase-js';

// Defensive configuration loading
const getConfiguration = () => {
    const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ? process.env.NEXT_PUBLIC_SUPABASE_URL.trim() : '';
    const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.trim() : '';

    const hardcodedUrl = 'https://whstcylkadklvjzfwdmz.supabase.co';
    const hardcodedKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indoc3RjeWxrYWRrbHZqemZ3ZG16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2ODg2NjksImV4cCI6MjA3OTI2NDY2OX0.pNi4cRthEiJiccrQEKC3FzH_4T5ZPFRjR6Wiqq8WKrI';

    // prioritized URL: Env (if valid) > Hardcoded
    let url = (envUrl && envUrl.startsWith('http')) ? envUrl : hardcodedUrl;
    
    // prioritized Key: Env (if valid length) > Hardcoded
    let key = (envKey && envKey.length > 20) ? envKey : hardcodedKey;

    return { url, key, usingFallback: url === hardcodedUrl };
};

const { url: supabaseUrl, key: supabaseKey, usingFallback } = getConfiguration();

let supabaseInstance;

// Helper to create a chainable mock builder that won't crash the app
const createMockBuilder = (errorMessage) => {
    const mockState = {
        data: null,
        error: { message: errorMessage || 'Supabase client not initialized' }
    };

    const builder = {
        select: () => builder,
        insert: () => builder,
        update: () => builder,
        delete: () => builder,
        upsert: () => builder,
        eq: () => builder,
        neq: () => builder,
        gt: () => builder,
        gte: () => builder,
        lt: () => builder,
        lte: () => builder,
        like: () => builder,
        ilike: () => builder,
        is: () => builder,
        in: () => builder,
        contains: () => builder,
        order: () => builder,
        limit: () => builder,
        single: () => Promise.resolve(mockState),
        maybeSingle: () => Promise.resolve(mockState),
        file: () => builder, // storage
        upload: () => Promise.resolve(mockState), // storage
        getPublicUrl: () => ({ data: { publicUrl: '' } }), // storage
        then: (resolve) => resolve(mockState) // Makes the builder awaitable
    };
    return builder;
};

try {
    if (usingFallback) {
         console.warn('[Supabase] Warning: Using hardcoded fallback credentials. Environment variables might be missing or invalid.');
    }

    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase URL or Key is missing internally (variables are empty).');
    }

    // Verify basic format to avoid library crashes
    if (!supabaseUrl.startsWith('http')) {
        throw new Error(`Invalid URL format: "${supabaseUrl}"`);
    }

    supabaseInstance = createClient(supabaseUrl, supabaseKey, {
        auth: {
            persistSession: typeof window !== 'undefined',
            autoRefreshToken: true,
            detectSessionInUrl: true
        }
    });

} catch (error) {
    console.error('[Supabase] CRITICAL INIT ERROR:', error);
    console.warn('[Supabase] Falling back to mock client to prevent crash.');

    supabaseInstance = {
        from: () => createMockBuilder(error.message),
        storage: {
            from: () => createMockBuilder(error.message)
        },
        auth: {
            getSession: () => Promise.resolve({ data: { session: null }, error: null }),
            getUser: () => Promise.resolve({ data: { user: null }, error: null }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
            signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Mock Auth: Init Failed' } }),
            signOut: () => Promise.resolve({ error: null }),
        }
    };
}

export const supabase = supabaseInstance;
