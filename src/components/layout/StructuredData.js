'use client';

import { siteConfig } from '@/config/siteConfig';

export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'GadDoors',
    alternateName: 'גד דורס - דלתות פנים',
    image: 'https://gaddoors.com/images/IMG-20251112-WA0048.jpg',
    '@id': 'https://gaddoors.com',
    url: 'https://gaddoors.com',
    telephone: siteConfig.contact.phone,
    priceRange: '$$',
    description: 'דלתות פנים פרימיום בירושלים | Portes intérieur premium à Jérusalem',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '115 Aharon Eshkoli | אהרון אשכולי 115',
      addressLocality: 'Jerusalem',
      addressRegion: 'Jerusalem District',
      postalCode: '',
      addressCountry: 'IL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 31.78622,
      longitude: 35.19889,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Sunday',
        ],
        opens: '08:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '14:00',
      },
    ],
    sameAs: [siteConfig.social.whatsappUrl],
    inLanguage: ['he', 'fr'],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
