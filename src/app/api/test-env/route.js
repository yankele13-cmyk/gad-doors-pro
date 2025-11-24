import { NextResponse } from 'next/server';

export async function GET() {
  const envVars = {
    NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    GOOGLE_SERVICE_ACCOUNT_KEY: !!process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
    GOOGLE_SHEET_ID: !!process.env.GOOGLE_SHEET_ID,
    NODE_ENV: process.env.NODE_ENV,
  };

  // Check if key is valid JSON if present
  let keyValid = false;
  let keyError = null;
  if (envVars.GOOGLE_SERVICE_ACCOUNT_KEY) {
    try {
      JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
      keyValid = true;
    } catch (e) {
      keyError = e.message;
    }
  }

  return NextResponse.json({
    environment: envVars,
    googleKeyValid: keyValid,
    googleKeyError: keyError,
    timestamp: new Date().toISOString()
  });
}
