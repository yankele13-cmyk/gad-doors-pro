'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';

export default function AuthGuard({ children }) {
  const { isAuthenticated, isLoading } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/admin');
    }
  }, [isAuthenticated, isLoading, router]);

  // Afficher un loader pendant la vérification
  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <p>Chargement...</p>
      </div>
    );
  }

  // Ne rien afficher si pas authentifié (redirection en cours)
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
