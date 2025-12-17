'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useAdmin } from '@/context/AdminContext';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({ children, title, action }) {
  const { language } = useLanguage();
  const { toggleMobile, isMobile } = useAdmin();
  const { user } = useAuth();

  const getInitials = (email) => {
    if (!email) return 'A';
    return email.charAt(0).toUpperCase();
  };

  return (
    <div dir={language === 'he' ? 'rtl' : 'ltr'} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-left">
          {/* Mobile menu button */}
          {isMobile && (
            <button onClick={toggleMobile} className="admin-menu-btn" aria-label="Menu">
              <i className="fas fa-bars"></i>
            </button>
          )}
          <h1 className="admin-page-title">{title}</h1>
        </div>
        
        <div className="admin-header-right">
          {action && <div>{action}</div>}
          <div className="admin-user-info">
            <div className="admin-user-avatar">
              {getInitials(user?.email)}
            </div>
            <span className="admin-user-name">
              {user?.email?.split('@')[0] || 'Admin'}
            </span>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="admin-content">
        {children}
      </main>
    </div>
  );
}
