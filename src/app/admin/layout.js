'use client';

import { AdminProvider } from '@/context/AdminContext';
import { AuthProvider } from '@/context/AuthContext';

export default function AdminLayout({ children }) {
  return (
    <AuthProvider>
      <AdminProvider>
        {children}
      </AdminProvider>
    </AuthProvider>
  );
}
