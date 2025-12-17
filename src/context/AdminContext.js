'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  // Sidebar states
  const [isPinned, setIsPinned] = useState(false); // User manually pinned the sidebar
  const [isHovered, setIsHovered] = useState(false); // Mouse is hovering
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false); // For mobile drawer

  // Computed: Sidebar is visible if pinned OR hovered (on desktop)
  const isSidebarVisible = isPinned || isHovered || mobileOpen;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Hover handlers
  const handleMouseEnter = useCallback(() => {
    if (!isMobile) {
      setIsHovered(true);
    }
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setIsHovered(false);
    }
  }, [isMobile]);

  // Pin toggle
  const togglePin = useCallback(() => {
    setIsPinned(prev => !prev);
  }, []);

  // Mobile toggle
  const toggleMobile = useCallback(() => {
    setMobileOpen(prev => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <AdminContext.Provider
      value={{
        isPinned,
        isHovered,
        isMobile,
        mobileOpen,
        isSidebarVisible,
        handleMouseEnter,
        handleMouseLeave,
        togglePin,
        toggleMobile,
        closeMobile,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
}
