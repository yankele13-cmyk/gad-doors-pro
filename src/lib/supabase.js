import { createClient } from '@supabase/supabase-js';

console.log('✅ Supabase Client v4.0 (Minimal) Initializing...');

const SUPABASE_URL = 'https://whstcylkadklvjzfwdmz.supabase.co';
const SUPABASE_KEY = 'sb_publishable_jdiWtjeNc5HM9tgs6_VaRQ_Dt6fdFCo';

console.log('Debug: typeof createClient =', typeof createClient);

// Direct call, no logic, no variables from env.
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
