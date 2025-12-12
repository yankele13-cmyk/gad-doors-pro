'use client';

import AdminSidebar from './AdminSidebar';
import AuthGuard from './AuthGuard';
import { useLanguage } from '@/context/LanguageContext';

export default function AdminLayout({ children, title, action }) {
  const { language } = useLanguage();

  return (
    <AuthGuard>
      <div 
        style={{ 
            minHeight: '100vh', 
            background: '#f8f9fa',
        }}
        dir={language === 'he' ? 'rtl' : 'ltr'}
      >
        <AdminSidebar />
        
        <div
          style={{
            marginLeft: language === 'he' ? 0 : '280px',
            marginRight: language === 'he' ? '280px' : 0,
            transition: 'margin 0.3s ease',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Top Bar for Mobile could go here later */}
          
          {/* Page Header */}
          <header 
            style={{
                background: 'white',
                padding: '25px 40px',
                borderBottom: '1px solid #eee',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'sticky',
                top: 0,
                zIndex: 90
            }}
          >
            <h1 style={{ margin: 0, fontSize: '1.8rem', color: '#2d3436' }}>{title}</h1>
            {action && <div>{action}</div>}
          </header>

          <main style={{ padding: '40px', flex: 1 }}>
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
