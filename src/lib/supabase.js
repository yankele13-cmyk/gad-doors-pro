import { createClient } from '@supabase/supabase-js';

// Defensive configuration loading
const getConfiguration = () => {
    // 1. Raw Read
    let envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    let envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    // 2. Aggressive Cleaning (Remove all whitespace, invisible chars)
    // Replace anything that is NOT a visible ascii char with empty string, just to be safe?
    // Let's safe-trim: remove all whitespace
    envUrl = envUrl.replace(/\s/g, '');
    envKey = envKey.replace(/\s/g, '');

    const hardcodedUrl = 'https://whstcylkadklvjzfwdmz.supabase.co';
    const hardcodedKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indoc3RjeWxrYWRrbHZqemZ3ZG16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2ODg2NjksImV4cCI6MjA3OTI2NDY2OX0.pNi4cRthEiJiccrQEKC3FzH_4T5ZPFRjR6Wiqq8WKrI';

    // 3. Validation Logic
    const isValidUrl = (u) => u && u.startsWith('http') && u.includes('supabase');
    const isValidKey = (k) => k && k.length > 20;

    // 4. Selection
    let finalUrl = hardcodedUrl;
    let finalKey = hardcodedKey;
    let usingFallback = true;
    
    // Only use Env if it is strictly valid
    if (isValidUrl(envUrl)) {
        finalUrl = envUrl;
        usingFallback = false;
    }

    if (isValidKey(envKey)) {
        finalKey = envKey;
    }

    // Debug Log for Production (JSON.stringify reveals invisible chars)
    if (process.env.NODE_ENV === 'production') {
       console.log('[Supabase Init Debug] Raw Env URL:', JSON.stringify(process.env.NEXT_PUBLIC_SUPABASE_URL));
       console.log('[Supabase Init Debug] Cleaned URL:', JSON.stringify(envUrl));
       console.log('[Supabase Init Debug] Final Selection:', JSON.stringify(finalUrl));
    }

    return { url: finalUrl, key: finalKey, usingFallback };
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
         if (process.env.NODE_ENV === 'production') {
             console.error('[Supabase] CRITICAL: Running in PRODUCTION with fallback credentials! Images may fail if buckets are different.');
         }
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
