'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <main>
      {/* Hero Section - Immersive Showroom Style */}
      <section className="hero">
        <div className="hero-content text-center">
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-2px', marginBottom: '1rem', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            {t('hero_title')}
          </h1>
          <p style={{ fontSize: '1.5rem', fontWeight: 300, maxWidth: '600px', margin: '0 auto 2rem', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
            {t('hero_subtitle')}
          </p>
          <Link href="/doors" className="btn" style={{ padding: '15px 40px', fontSize: '1.1rem', letterSpacing: '1px' }}>
            {t('hero_cta')}
          </Link>
        </div>
      </section>

      {/* Showroom Grid - The Main Attraction */}
      <section className="section-padding" style={{ background: 'var(--bg-body)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <h2 className="section-title-modern" style={{ fontSize: '2.5rem' }}>{t('ranges_title')}</h2>
            <p className="section-subtitle-modern">L'excellence du design italien, la robustesse de la technologie</p>
          </div>

          <div className="showroom-grid">
            {/* WPC Collection */}
            <div className="showroom-card">
              <div className="showroom-image-container">
                <Image
                  src="/images/IMG-20251112-WA0048.jpg"
                  alt="Portes WPC"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h3 className="showroom-title">{t('range_wpc_title')}</h3>
              <p className="showroom-price">Premium Collection</p>
              <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{t('range_wpc_desc')}</p>
              <Link href="/doors" className="btn-showroom">
                {t('btn_discover')}
              </Link>
            </div>

            {/* Formica Collection */}
            <div className="showroom-card">
              <div className="showroom-image-container">
                <Image
                  src="/images/hero-gaddoors.jpg"
                  alt="Portes Formica"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h3 className="showroom-title">{t('range_formica_title')}</h3>
              <p className="showroom-price">High Resistance</p>
              <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{t('range_formica_desc')}</p>
              <Link href="/doors" className="btn-showroom">
                {t('btn_discover')}
              </Link>
            </div>

            {/* PVC Collection */}
            <div className="showroom-card">
              <div className="showroom-image-container">
                <Image
                  src="/images/IMG-20251112-WA0050.jpg"
                  alt="Portes PVC"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h3 className="showroom-title">{t('range_pvc_title')}</h3>
              <p className="showroom-price">Smart Choice</p>
              <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{t('range_pvc_desc')}</p>
              <Link href="/doors" className="btn-showroom">
                {t('btn_discover')}
              </Link>
            </div>

            {/* Accessories */}
            <div className="showroom-card">
              <div className="showroom-image-container">
                <Image
                  src="/images/IMG-20251112-WA0050.jpg"
                  alt="Accessoires"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h3 className="showroom-title">{t('cat_acc')}</h3>
              <p className="showroom-price">Finishing Touch</p>
              <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Poignées, serrures et butoirs design</p>
              <Link href="/accessories" className="btn-showroom">
                {t('btn_discover')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Minimalist Trust Section */}
      <section style={{ padding: '80px 0', background: 'white', borderTop: '1px solid #f0f0f0' }}>
        <div className="container">
          <div className="product-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            <div className="text-center">
              <i className="fas fa-certificate" style={{ fontSize: '2rem', color: 'var(--gold-accent)', marginBottom: '1rem' }}></i>
              <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{t('why_1_title')}</h3>
            </div>
            <div className="text-center">
              <i className="fas fa-tools" style={{ fontSize: '2rem', color: 'var(--gold-accent)', marginBottom: '1rem' }}></i>
              <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{t('why_2_title')}</h3>
            </div>
            <div className="text-center">
              <i className="fas fa-shield-alt" style={{ fontSize: '2rem', color: 'var(--gold-accent)', marginBottom: '1rem' }}></i>
              <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{t('why_3_title')}</h3>
            </div>
            <div className="text-center">
              <i className="fas fa-tag" style={{ fontSize: '2rem', color: 'var(--gold-accent)', marginBottom: '1rem' }}></i>
              <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{t('why_4_title')}</h3>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
