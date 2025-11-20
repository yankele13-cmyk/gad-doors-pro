'use client';

import { AdminProvider } from '@/context/AdminContext';
import { Outfit } from 'next/font/google';
import '@/app/globals.css';

const outfit = Outfit({ subsets: ['latin'] });

export default function AdminRootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={outfit.className}>
        <AdminProvider>{children}</AdminProvider>
      </body>
    </html>
  );
}
