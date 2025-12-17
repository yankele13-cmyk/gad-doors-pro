'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import AdminSidebar from '@/components/layout/AdminSidebar';
import './admin.css';

// Auth Guard Component
function AdminGuard({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const normalizedPath = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;

    if (normalizedPath === '/admin') {
      return;
    }

    if (!loading && !user) {
      router.push('/admin');
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#1a1d21'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '3px solid rgba(212, 175, 55, 0.2)',
          borderTopColor: '#d4af37',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!user && pathname !== '/admin' && pathname !== '/admin/') {
    return null;
  }

  return children;
}

// Admin Shell - Contains persistent sidebar
function AdminShell({ children }) {
  const { isPinned, isSidebarVisible, mobileOpen, closeMobile, isMobile, toggleMobile } = useAdmin();
  const pathname = usePathname();

  // Check if we're on login page (don't show sidebar there)
  const isLoginPage = pathname === '/admin' || pathname === '/admin/';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="admin-shell">
      {/* Persistent Sidebar - Lives in layout, never unmounts */}
      <AdminSidebar />
      
      {/* Mobile Overlay */}
      <div 
        className={`admin-overlay ${mobileOpen ? 'visible' : ''}`}
        onClick={closeMobile}
      />

      {/* Main Content Wrapper */}
      <div className={`admin-main ${isPinned ? 'shifted' : ''}`}>
        {children}
      </div>
    </div>
  );
}

export default function AdminRootLayout({ children }) {
  return (
    <AuthProvider>
      <AdminProvider>
        <AdminGuard>
          <AdminShell>
            {children}
          </AdminShell>
        </AdminGuard>
      </AdminProvider>
    </AuthProvider>
  );
}
