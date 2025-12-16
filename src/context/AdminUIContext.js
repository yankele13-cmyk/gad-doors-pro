'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AdminUIContext = createContext();

export function AdminUIProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Auto-close sidebar on mobile on initial load
  useEffect(() => {
    if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
    }
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <AdminUIContext.Provider
      value={{ isSidebarOpen, toggleSidebar, setIsSidebarOpen }}
    >
      {children}
    </AdminUIContext.Provider>
  );
}

export function useAdminUI() {
  const context = useContext(AdminUIContext);
  if (!context) {
    throw new Error('useAdminUI must be used within AdminUIProvider');
  }
  return context;
}
