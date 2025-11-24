import './globals.css';
import './components.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import { ToastContainer } from '@/components/Toast';
import { LanguageProvider } from '@/context/LanguageContext';
import ClientLayout from '@/components/ClientLayout';
import StructuredData from '@/components/StructuredData';

export const metadata = {
  title: "GadDoors | דלתות פנים פרימיום ירושלים - עיצוב ואיכות",
  description:
    "דלתות פנים יוקרתיות בירושלים. עיצוב מודרני, התקנה מקצועית, 5 שנות אחריות. מומחים לדלתות ואביזרים בישראל | Portes d'intérieur premium à Jérusalem",
  keywords:
    'דלתות פנים ירושלים, דלתות פרימיום ישראל, התקנת דלתות ירושלים, דלתות מעוצבות, אביזרים לדלתות, ידיות עיצוב, נגרות ירושלים, portes intérieur Jérusalem, portes premium Israël',
  authors: [{ name: 'GadDoors' }],
  creator: 'GadDoors',
  publisher: 'GadDoors',
  metadataBase: new URL('https://gaddoors.com'),
  alternates: {
    canonical: '/',
    languages: {
      'he-IL': '/',
      fr: '/',
    },
  },
  openGraph: {
    title: "GadDoors | דלתות פנים פרימיום ירושלים",
    description:
      "דלתות פנים יוקרתיות בירושלים. עיצוב מודרני, התקנה מקצועית | Portes premium Jérusalem",
    url: 'https://gaddoors.com',
    siteName: 'GadDoors',
    locale: 'he_IL',
    alternateLocale: ['fr_FR'],
    type: 'website',
    images: [
      {
        url: 'https://gaddoors.com/images/IMG-20251112-WA0048.jpg',
        width: 1200,
        height: 630,
        alt: 'GadDoors - דלתות פרימיום ירושלים | Portes Premium Jérusalem',
      },
    ],
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
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

// Le RootLayout est maintenant beaucoup plus simple.
// Il ne fait que fournir les contextes et délègue l'affichage à ClientLayout.
export default function RootLayout({ children }) {
  return (
    <LanguageProvider>
      <ClientLayout>
        <StructuredData />
        <Header />
        {children}
        <Footer />
        <WhatsAppWidget />
        <ToastContainer />
      </ClientLayout>
    </LanguageProvider>
  );
}
