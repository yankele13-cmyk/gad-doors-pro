"use client";

import { useLanguage } from '@/context/LanguageContext';
import { Outfit } from "next/font/google";

// Initialisation de la police déplacée ici car ce composant gère le body
const outfit = Outfit({ subsets: ["latin"] });

export default function ClientLayout({ children }) {
  const { language, dir } = useLanguage();

  // Ce composant client rend maintenant la structure de base de la page
  // en utilisant les valeurs du contexte dès le premier rendu.
  return (
    <html lang={language} dir={dir} suppressHydrationWarning>
      <body className={outfit.className}>
        {children}
      </body>
    </html>
  );
}
