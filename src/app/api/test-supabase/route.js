import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  // Check if client exists
  const clientExists = !!supabase;

  // If client doesn't exist, return immediately
  if (!clientExists) {
    return NextResponse.json({
      supabaseClientExists: false,
      error: 'Supabase client not initialized',
      env: {
        url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        key: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      }
    });
  }

  // Try to fetch products
  let productsCount = 0;
  let fetchError = null;
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*', { count: 'exact' });
    
    if (error) {
      fetchError = error.message;
    } else {
      productsCount = data?.length || 0;
    }
  } catch (e) {
    fetchError = e.message;
  }

  return NextResponse.json({
    supabaseClientExists: true,
    productsCount,
    fetchError,
    timestamp: new Date().toISOString()
  });
}
