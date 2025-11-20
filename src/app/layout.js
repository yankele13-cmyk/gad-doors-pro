import './globals.css';
import './components.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import { ToastContainer } from '@/components/Toast';
import { LanguageProvider } from '@/context/LanguageContext';
import ClientLayout from '@/components/ClientLayout'; // Import du nouveau layout client

export const metadata = {
  title: "GadDoors | Portes d'Intérieur Premium - Design & Qualité",
  description:
    "Découvrez notre collection exclusive de portes d'intérieur haut de gamme. Design moderne, qualité supérieure et installation professionnelle en Israël.",
  keywords:
    'portes intérieur, portes premium, design portes, installation portes, Israël, Tel Aviv, accessoires portes, poignées design',
  authors: [{ name: 'Gad-Doors' }],
  creator: 'Gad-Doors',
  publisher: 'Gad-Doors',
  metadataBase: new URL('https://gad-doors.com'),
  alternates: {
    canonical: '/',
    languages: {
      fr: '/',
      'he-IL': '/',
    },
  },
  openGraph: {
    title: "Gad-Doors | Portes d'Intérieur Premium",
    description:
      "Découvrez notre collection exclusive de portes d'intérieur haut de gamme.",
    url: 'https://gad-doors.com',
    siteName: 'Gad-Doors',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

// Le RootLayout est maintenant beaucoup plus simple.
// Il ne fait que fournir les contextes et délègue l'affichage à ClientLayout.
export default function RootLayout({ children }) {
  return (
    <LanguageProvider>
      <ClientLayout>
        <Header />
        {children}
        <Footer />
        <WhatsAppWidget />
        <ToastContainer />
      </ClientLayout>
    </LanguageProvider>
  );
}
