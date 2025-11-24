'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAdmin } from '@/context/AdminContext';
import { useLanguage } from '@/context/LanguageContext';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { login } = useAdmin();
  const { t } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = login(email, password);

    if (result.success) {
      router.push('/admin/dashboard');
    } else {
      setError(result.error);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container" style={{ paddingTop: '100px' }}>
      <div className="login-box">
        <h2 style={{ marginBottom: '30px' }}>{t('admin_title')}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          {error && (
            <p
              style={{ color: 'red', marginBottom: '15px', fontSize: '0.9rem' }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn"
            style={{ width: '100%', border: 'none' }}
            disabled={isLoading}
          >
            {isLoading ? 'Connexion...' : t('admin_login')}
          </button>
        </form>

        <p style={{ marginTop: '20px', fontSize: '0.9rem' }}>
          <Link href="/" style={{ color: '#999' }}>
            Retour au site
          </Link>
        </p>

        {/* Info de debug (à retirer en production) */}

      </div>
    </div>
  );
}
