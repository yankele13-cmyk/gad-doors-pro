'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useAdmin } from '@/context/AdminContext';

export default function AdminSidebar() {
  const pathname = usePathname();
  const { t, language } = useLanguage();
  const { logout } = useAdmin();

  const isActive = (path) => pathname === path;

  const menuItems = [
    {
      name: t('admin_dashboard') || 'Tableau de bord',
      path: '/admin/dashboard',
      icon: 'fa-tachometer-alt',
    },
    {
      name: 'Produits',
      path: '/admin/products',
      icon: 'fa-box-open',
    },
    {
      name: 'Messages',
      path: '/admin/messages',
      icon: 'fa-envelope',
    },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = '/admin';
  };

  return (
    <div
      style={{
        width: '280px',
        height: '100vh',
        background: 'var(--bg-surface)',
        borderRight: language === 'he' ? 'none' : '1px solid #eee',
        borderLeft: language === 'he' ? '1px solid #eee' : 'none',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        [language === 'he' ? 'right' : 'left']: 0,
        zIndex: 1000,
        boxShadow: '0 0 15px rgba(0,0,0,0.03)',
      }}
    >
      {/* Brand Logo */}
      <div
        style={{
          padding: '30px',
          borderBottom: '1px solid #eee',
          textAlign: 'center',
        }}
      >
        <h2 style={{ margin: 0, color: 'var(--accent-color)', fontSize: '1.5rem', fontWeight: 800 }}>
          GadDoors<span style={{color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: 400, marginLeft: '5px'}}>Pro</span>
        </h2>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '20px 0' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {menuItems.map((item) => (
            <li key={item.path} style={{ marginBottom: '5px' }}>
              <Link
                href={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 30px',
                  color: isActive(item.path)
                    ? 'var(--accent-color)'
                    : 'var(--text-secondary)',
                  background: isActive(item.path)
                    ? 'rgba(212, 163, 115, 0.1)'
                    : 'transparent',
                  borderRight:
                    isActive(item.path) && language !== 'he'
                      ? '3px solid var(--accent-color)'
                      : 'none',
                  borderLeft:
                    isActive(item.path) && language === 'he'
                      ? '3px solid var(--accent-color)'
                      : 'none',
                  textDecoration: 'none',
                  fontWeight: isActive(item.path) ? 600 : 400,
                  transition: 'all 0.2s ease',
                }}
              >
                <i
                  className={`fas ${item.icon}`}
                  style={{
                    width: '24px',
                    marginRight: language === 'he' ? 0 : '10px',
                    marginLeft: language === 'he' ? '10px' : 0,
                    textAlign: 'center',
                  }}
                ></i>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer / Logout */}
      <div
        style={{
          padding: '20px',
          borderTop: '1px solid #eee',
        }}
      >
        <Link 
            href="/" 
            target="_blank"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px',
                width: '100%',
                borderRadius: '5px',
                marginBottom: '10px',
                textDecoration: 'none',
                color: 'var(--text-secondary)',
                border: '1px solid #eee',
                fontSize: '0.9rem'
            }}
        >
             <i className="fas fa-external-link-alt" style={{marginRight: '8px'}}></i> Voir le site
        </Link>
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '12px',
            border: 'none',
            borderRadius: '5px',
            background: '#ffebee',
            color: '#dc3545',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontWeight: 500,
            transition: 'background 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = '#ffcdd2')}
          onMouseOut={(e) => (e.currentTarget.style.background = '#ffebee')}
        >
          <i className="fas fa-sign-out-alt"></i>
          {t('admin_logout')}
        </button>
      </div>
    </div>
  );
}
