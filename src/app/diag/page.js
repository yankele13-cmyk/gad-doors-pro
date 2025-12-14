'use client';

import { useEffect, useState } from 'react';

export default function DiagPage() {
  const [url, setUrl] = useState('');
  const [key, setKey] = useState('');

  useEffect(() => {
    // This code runs in the browser, so it will show us
    // what Vercel has sent to the client.
    setUrl(process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT FOUND');
    setKey(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'NOT FOUND');
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace', fontSize: '16px' }}>
      <h1>Vercel Environment Variable Diagnostics</h1>
      <p>This page shows the values of the environment variables as seen by the browser.</p>
      <hr style={{ margin: '1rem 0' }} />
      <div>
        <h2>NEXT_PUBLIC_SUPABASE_URL:</h2>
        <p style={{ color: url === 'NOT FOUND' ? 'red' : 'green', fontWeight: 'bold' }}>
          {url}
        </p>
      </div>
      <hr style={{ margin: '1rem 0' }} />
      <div>
        <h2>NEXT_PUBLIC_SUPABASE_ANON_KEY:</h2>
        <p style={{ color: key === 'NOT FOUND' ? 'red' : 'green', fontWeight: 'bold' }}>
          {key ? `${key.substring(0, 15)}...` : 'NOT FOUND'}
        </p>
      </div>
      <hr style={{ margin: '1rem 0' }} />
      <h2>Conclusion:</h2>
      {url === 'NOT FOUND' || key === 'NOT FOUND' ? (
        <p style={{ color: 'red' }}>
          The environment variables are NOT correctly configured on Vercel. Please go to your project settings on Vercel, then "Environment Variables", and add them. Remember to redeploy after adding them.
        </p>
      ) : (
        <p style={{ color: 'green' }}>
          The environment variables seem to be correctly loaded. If the error persists, the issue might be with the Supabase connection itself.
        </p>
      )}
    </div>
  );
}

