'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useAdmin } from '@/context/AdminContext';

export default function AdminSidebar() {
  const pathname = usePathname();
  const { t, language } = useLanguage();
  const { logout, isSidebarOpen } = useAdmin();

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
        background: '#2d3436', // Dark clean sidebar
        color: '#dfe6e9',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        boxShadow: isSidebarOpen ? '4px 0 20px rgba(0,0,0,0.1)' : 'none',
        transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Brand Logo */}
      <div
        style={{
          padding: '30px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center',
        }}
      >
        <h2 style={{ margin: 0, color: 'white', fontSize: '1.6rem', fontWeight: 800, letterSpacing: '1px' }}>
          GadDoors<span style={{color: '#eebb99', fontSize: '0.9rem', fontWeight: 500, marginLeft: '5px', background: 'rgba(238,187,153,0.1)', padding: '2px 8px', borderRadius: '4px'}}>PRO</span>
        </h2>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '30px 15px' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {menuItems.map((item) => (
            <li key={item.path} style={{ marginBottom: '8px' }}>
              <Link
                href={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px 20px',
                  color: isActive(item.path)
                    ? 'white'
                    : '#b2bec3',
                  background: isActive(item.path)
                    ? 'linear-gradient(90deg, #eebb99 0%, #d4a373 100%)'
                    : 'transparent',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontWeight: isActive(item.path) ? 600 : 400,
                  transition: 'all 0.3s ease',
                  boxShadow: isActive(item.path) ? '0 4px 15px rgba(224, 172, 137, 0.3)' : 'none',
                  transform: isActive(item.path) ? 'translateX(5px)' : 'translateX(0)'
                }}
              >
                <i
                  className={`fas ${item.icon}`}
                  style={{
                    width: '24px',
                    marginRight: '12px', // Always LTR spacing
                    marginLeft: 0,
                    textAlign: 'center',
                    fontSize: '1.1rem'
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
          borderTop: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(0,0,0,0.1)'
        }}
      >
        <Link 
            href="/" 
            target="_blank"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px',
                width: '100%',
                borderRadius: '8px',
                marginBottom: '10px',
                textDecoration: 'none',
                color: '#b2bec3',
                border: '1px solid rgba(255,255,255,0.1)',
                fontSize: '0.9rem',
                transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.borderColor = 'white';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.color = '#b2bec3';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
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
            borderRadius: '8px',
            background: 'rgba(220, 53, 69, 0.1)',
            color: '#ff7675',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontWeight: 500,
            transition: 'all 0.2s',
          }}
          onMouseOver={(e) => {
              e.currentTarget.style.background = '#d63031';
              e.currentTarget.style.color = 'white';
          }}
          onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(220, 53, 69, 0.1)';
              e.currentTarget.style.color = '#ff7675';
          }}
        >
          <i className="fas fa-sign-out-alt"></i>
          {t('admin_logout')}
        </button>
      </div>
    </div>
  );
}
