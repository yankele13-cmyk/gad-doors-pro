'use client';

import { AdminProvider } from '@/context/AdminContext';
// Nous n'avons plus besoin de outfit ni de globals.css ici,
// car ils sont déjà chargés par le layout principal.

export default function AdminLayout({ children }) {
  // Ce layout n'a plus besoin de retourner <html> ou <body>.
  // Il ne fait que fournir le contexte d'administration.
  return <AdminProvider>{children}</AdminProvider>;
}
