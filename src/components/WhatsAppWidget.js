'use client';

import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/config/siteConfig';

export default function WhatsAppWidget() {
  const pathname = usePathname();
  const { language } = useLanguage();

  // Ne pas afficher sur les pages admin
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  // Messages personnalisés selon la page
  const getWhatsAppMessage = () => {
    const messages = {
      fr: {
        '/': "Bonjour ! Je visite votre site Gad-Doors et j'aimerais en savoir plus sur vos portes.",
        '/doors':
          "Bonjour ! Je suis intéressé par vos portes d'intérieur. Pouvez-vous me donner plus d'informations ?",
        '/accessories':
          "Bonjour ! J'aimerais avoir des informations sur vos accessoires et poignées.",
        '/contact':
          'Bonjour ! Je souhaite vous contacter concernant vos produits.',
        '/warranty': "Bonjour ! J'ai une question concernant vos garanties.",
        default: "Bonjour ! J'ai une question sur vos produits Gad-Doors.",
      },
      he: {
        '/': 'שלום! אני מבקר באתר Gad-Doors ורוצה לדעת יותר על הדלתות שלכם.',
        '/doors': 'שלום! אני מעוניין בדלתות הפנים שלכם. אפשר לקבל מידע נוסף?',
        '/accessories': 'שלום! אשמח לקבל מידע על האביזרים והידיות שלכם.',
        '/contact': 'שלום! אני רוצה ליצור קשר לגבי המוצרים שלכם.',
        '/warranty': 'שלום! יש לי שאלה לגבי האחריות.',
        default: 'שלום! יש לי שאלה על המוצרים של Gad-Doors.',
      },
    };

    const langMessages = messages[language] || messages.fr;
    return langMessages[pathname] || langMessages.default;
  };

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(getWhatsAppMessage())}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-widget"
      aria-label="Contactez-nous sur WhatsApp"
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '60px',
        height: '60px',
        backgroundColor: '#25D366',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        textDecoration: 'none',
        cursor: 'pointer',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.4)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      }}
    >
      <i
        className="fab fa-whatsapp"
        style={{
          fontSize: '32px',
          color: 'white',
        }}
      ></i>

      {/* Pulse animation circle */}
      <span
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          opacity: 0.3,
          animation: 'whatsapp-pulse 2s infinite',
        }}
      ></span>
    </a>
  );
}
