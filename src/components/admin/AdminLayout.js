import AdminSidebar from './AdminSidebar';
import AuthGuard from './AuthGuard';
import { useLanguage } from '@/context/LanguageContext';
import { useAdmin } from '@/context/AdminContext';

export default function AdminLayout({ children, title, action }) {
  const { language } = useLanguage();
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useAdmin();

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
        
        {/* Mobile Overlay */}
        {isSidebarOpen && (
            <div 
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    zIndex: 990,
                    display: 'none', // Hidden on desktop via CSS if possible, but JS is safer for now
                }}
                className="mobile-overlay"
                onClick={() => setIsSidebarOpen(false)}
            />
        )}

        <div
          style={{
            marginLeft: isSidebarOpen ? '280px' : '0', // Dynamic margin
            transition: 'margin 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            width: isSidebarOpen ? 'calc(100% - 280px)' : '100%'
          }}
          className="admin-content"
        >
          <style jsx global>{`
            @media (max-width: 768px) {
                .admin-content {
                    margin-left: 0 !important;
                    width: 100% !important;
                }
                .mobile-overlay {
                    display: block !important;
                }
            }
          `}</style>
          
          {/* Page Header */}
          <header 
            style={{
                background: 'white',
                padding: '20px 30px',
                borderBottom: '1px solid rgba(0,0,0,0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'sticky',
                top: 0,
                zIndex: 90
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <button
                    onClick={toggleSidebar}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        color: '#2d3436',
                        padding: '8px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#f1f2f6'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                    <i className="fas fa-bars"></i>
                </button>
                <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: '#2d3436' }}>{title}</h1>
            </div>
            {action && <div>{action}</div>}
          </header>

          <main style={{ padding: '30px', flex: 1 }}>
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
