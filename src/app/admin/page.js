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

    // Simulate network delay for better UX feel
    setTimeout(async () => {
        const result = login(email, password);
        if (result.success) {
            router.push('/admin/dashboard');
        } else {
            setError(result.error);
            setIsLoading(false);
        }
    }, 800);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at top right, #2d3436 0%, #000000 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Abstract Background Shapes */}
      <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(238,187,153,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 20s infinite ease-in-out'
      }} />
      <div style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(116, 185, 255, 0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 15s infinite ease-in-out reverse'
      }} />

      <style jsx global>{`
        @keyframes float {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(20px, 30px); }
        }
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .login-input:focus {
            border-color: #eebb99 !important;
            box-shadow: 0 0 0 4px rgba(238, 187, 153, 0.1);
        }
      `}</style>

      <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '50px 40px',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '420px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          zIndex: 10,
          animation: 'slideUp 0.6s ease-out'
      }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  background: 'linear-gradient(135deg, #eebb99 0%, #d4a373 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px auto',
                  fontSize: '1.5rem',
                  color: '#2d3436',
                  boxShadow: '0 10px 20px rgba(238, 187, 153, 0.3)'
              }}>
                  <i className="fas fa-user-shield"></i>
              </div>
              <h2 style={{ color: 'white', margin: '0 0 10px 0', fontSize: '1.8rem' }}>Admin Access</h2>
              <p style={{ color: '#b2bec3', margin: 0 }}>GadDoors Pro Dashboard</p>
          </div>

          <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                  <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="login-input"
                      style={{
                          width: '100%',
                          padding: '16px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '12px',
                          color: 'white',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'all 0.3s'
                      }}
                  />
              </div>

              <div style={{ marginBottom: '30px' }}>
                  <input
                      type="password"
                      placeholder="Mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="login-input"
                      style={{
                          width: '100%',
                          padding: '16px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '12px',
                          color: 'white',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'all 0.3s'
                      }}
                  />
              </div>

              {error && (
                  <div style={{ 
                      background: 'rgba(255, 118, 117, 0.1)', 
                      color: '#ff7675', 
                      padding: '12px', 
                      borderRadius: '8px', 
                      marginBottom: '20px', 
                      textAlign: 'center',
                      fontSize: '0.9rem',
                      border: '1px solid rgba(255, 118, 117, 0.2)'
                  }}>
                      <i className="fas fa-exclamation-circle" style={{ marginRight: '8px' }}></i>
                      {error}
                  </div>
              )}

              <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                      width: '100%',
                      padding: '16px',
                      background: isLoading ? '#636e72' : 'linear-gradient(135deg, #eebb99 0%, #d4a373 100%)',
                      border: 'none',
                      borderRadius: '12px',
                      color: '#2d3436',
                      fontSize: '1rem',
                      fontWeight: 700,
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s',
                      transform: isLoading ? 'none' : 'translateY(0)',
                      boxShadow: isLoading ? 'none' : '0 10px 20px rgba(238, 187, 153, 0.2)'
                  }}
                  onMouseOver={(e) => !isLoading && (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseOut={(e) => !isLoading && (e.currentTarget.style.transform = 'translateY(0)')}
              >
                  {isLoading ? (
                      <span><i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i> Connexion...</span>
                  ) : (
                      'Se connecter'
                  )}
              </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <Link href="/" style={{ color: '#636e72', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#dfe6e9'} onMouseOut={(e) => e.target.style.color = '#636e72'}>
                  <i className="fas fa-arrow-left" style={{ marginRight: '8px' }}></i> Retour au site
              </Link>
          </div>
      </div>
    </div>
  );
}
