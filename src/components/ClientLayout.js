'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useEffect } from 'react';

export default function ClientLayout({ children }) {
  const { language, dir } = useLanguage();

  // Sync language with html attributes
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [language, dir]);

  return (
    <div id="app-root">
      {children}
    </div>
  );
}
