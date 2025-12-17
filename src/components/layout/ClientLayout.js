'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useEffect } from 'react';

export default function ClientLayout({ children }) {
  // ClientLayout is now just a client-side wrapper if needed (e.g. for potential contexts)
  // but language attributes are handled in RootLayout since it's a Server Component
  // We keep this component to wrap children in the 'app-root' id if essential for CSS

  return (
    <div id="app-root">
      {children}
    </div>
  );
}
