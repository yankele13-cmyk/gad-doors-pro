'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';
import { useAuth } from '@/context/AuthContext';

export default function AdminSidebar() {
  const pathname = usePathname();
  const { 
    isPinned, 
    isSidebarVisible, 
    handleMouseEnter, 
    handleMouseLeave, 
    togglePin, 
    closeMobile,
    isMobile 
  } = useAdmin();
  const { logout } = useAuth();

  const isActive = (path) => pathname === path;

  const menuItems = [
    {
      name: 'Tableau de bord',
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
    {
      name: 'Agenda',
      path: '/admin/calendar',
      icon: 'fa-calendar-alt',
    },
    {
      name: 'Planning Tech',
      path: '/admin/agenda',
      icon: 'fa-mobile-alt',
    },
    {
      name: 'Réalisations',
      path: '/admin/installations',
      icon: 'fa-images',
    },
  ];

  const handleLogout = () => {
    logout();
  };

  const handleNavClick = () => {
    if (isMobile) {
      closeMobile();
    }
  };

  return (
    <>
      {/* Hover Trigger Zone (Desktop only) */}
      {!isMobile && (
        <div 
          className="admin-sidebar-trigger"
          onMouseEnter={handleMouseEnter}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`admin-sidebar ${isSidebarVisible ? 'visible' : ''} ${isPinned ? 'pinned' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Header with Logo and Pin Button */}
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-logo">
            GadDoors
            <span className="badge">PRO</span>
          </div>
          
          {/* Pin Button (Desktop only) */}
          {!isMobile && (
            <button 
              onClick={togglePin} 
              className={`admin-pin-btn ${isPinned ? 'active' : ''}`}
              title={isPinned ? 'Désépingler' : 'Épingler'}
            >
              <i className={`fas ${isPinned ? 'fa-thumbtack' : 'fa-thumbtack'}`} 
                 style={{ transform: isPinned ? 'rotate(0deg)' : 'rotate(45deg)' }}
              ></i>
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="admin-sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={handleNavClick}
              className={`admin-nav-item ${isActive(item.path) ? 'active' : ''}`}
            >
              <i className={`fas ${item.icon}`}></i>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="admin-sidebar-footer">
          <Link href="/" target="_blank" className="admin-btn-view-site">
            <i className="fas fa-external-link-alt"></i>
            Voir le site
          </Link>
          <button onClick={handleLogout} className="admin-btn-logout">
            <i className="fas fa-sign-out-alt"></i>
            Déconnexion
          </button>
        </div>
      </aside>
    </>
  );
}
