'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    const adminSession = sessionStorage.getItem('gadAdminAuth');
    if (adminSession === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
    
    // Auto-close sidebar on mobile on initial load
    if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (data.success) {
            sessionStorage.setItem('gadAdminAuth', 'true');
            setIsAuthenticated(true);
            return { success: true };
        } else {
            return { success: false, error: data.error };
        }
    } catch (error) {
        return { success: false, error: 'Erreur de connexion' };
    }
  };

  const logout = () => {
    sessionStorage.removeItem('gadAdminAuth');
    setIsAuthenticated(false);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <AdminContext.Provider
      value={{ isAuthenticated, isLoading, login, logout, isSidebarOpen, toggleSidebar, setIsSidebarOpen }}
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
