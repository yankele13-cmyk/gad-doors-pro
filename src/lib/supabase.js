console.log('✅ Supabase Client v3.0 (Bulletproof) Initializing...');

// FALLBACK CREDENTIALS
// Ensures the app works even if Vercel process.env injection fails
const FALLBACK_URL = 'https://whstcylkadklvjzfwdmz.supabase.co';
const FALLBACK_KEY = 'sb_publishable_jdiWtjeNc5HM9tgs6_VaRQ_Dt6fdFCo';

const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

const supabaseUrl = (envUrl && envUrl.length > 0) ? envUrl : FALLBACK_URL;
const supabaseKey = (envKey && envKey.length > 0) ? envKey : FALLBACK_KEY;

console.log('Supabase Connection Info:', {
  usingFallback: supabaseUrl === FALLBACK_URL,
  urlLength: supabaseUrl?.length,
  keyLength: supabaseKey?.length
});

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ CRITICAL: Supabase Creds Missing Even with Fallback!');
}

export const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey)
  : null;
