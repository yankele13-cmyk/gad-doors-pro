'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function AdminNavbar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  
  const isActive = (path) => pathname === path;

  const navItems = [
    { name: 'Tableau de bord', path: '/admin/dashboard', icon: 'fa-tachometer-alt' },
    { name: 'Produits', path: '/admin/products', icon: 'fa-box-open' },
    { name: 'Réalisations', path: '/admin/installations', icon: 'fa-images' },
    { name: 'Messages', path: '/admin/messages', icon: 'fa-envelope' },
  ];

  return (
    <nav 
      style={{
        background: '#fff',
        padding: '15px 30px',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
         <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#2d3436' }}>
            GadDoors<span style={{ color: '#eebb99' }}>PRO</span>
         </div>
         <div style={{ display: 'flex', gap: '10px' }}>
            {navItems.map(item => (
                <Link 
                    key={item.path}
                    href={item.path}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: isActive(item.path) ? '#eebb99' : '#636e72',
                        background: isActive(item.path) ? 'rgba(238, 187, 153, 0.1)' : 'transparent',
                        fontWeight: isActive(item.path) ? 600 : 500,
                        fontSize: '0.95rem',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <i className={`fas ${item.icon}`}></i>
                    {item.name}
                </Link>
            ))}
         </div>
      </div>

      <button
        onClick={() => logout()}
        style={{
            padding: '8px 16px',
            border: '1px solid #fab1a0',
            background: 'transparent',
            color: '#e17055',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s'
        }}
        onMouseOver={(e) => {
            e.currentTarget.style.background = '#e17055';
            e.currentTarget.style.color = 'white';
        }}
        onMouseOut={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#e17055';
        }}
      >
        <i className="fas fa-sign-out-alt"></i>
        Déconnexion
      </button>
    </nav>
  );
}
