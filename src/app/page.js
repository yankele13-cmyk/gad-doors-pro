'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content container">
          <h1>{t('hero_title')}</h1>
          <p>{t('hero_subtitle')}</p>
          <Link href="/doors" className="btn">
            {t('hero_cta')}
          </Link>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="categories-preview">
        <Link href="/doors" className="category-card">
          <Image
            src="/images/IMG-20251112-WA0048.jpg"
            alt="Portes"
            width={600}
            height={400}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div className="category-overlay">
            <h3>{t('cat_doors')}</h3>
            <span
              className="btn btn-outline"
              style={{ borderColor: 'white', color: 'white' }}
            >
              {t('btn_discover')}
            </span>
          </div>
        </Link>
        <Link href="/accessories" className="category-card">
          <Image
            src="/images/IMG-20251112-WA0050.jpg"
            alt="Accessoires"
            width={600}
            height={400}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div className="category-overlay">
            <h3>{t('cat_acc')}</h3>
            <span
              className="btn btn-outline"
              style={{ borderColor: 'white', color: 'white' }}
            >
              {t('btn_discover')}
            </span>
          </div>
        </Link>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding text-center">
        <div className="container">
          <h2>
            {t('why_title')
              .split('GadDoors')
              .map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <>
                      Gad
                      <span style={{ color: 'var(--accent-color)' }}>
                        Doors
                      </span>
                    </>
                  )}
                </span>
              ))}
          </h2>
          <p style={{ maxWidth: '700px', margin: '0 auto 40px' }}>
            {t('why_subtitle')}
          </p>
          <div className="product-grid">
            <div
              className="product-card"
              style={{
                padding: '30px',
                boxShadow: 'none',
                background: 'transparent',
              }}
            >
              <i
                className="fas fa-door-open"
                style={{
                  fontSize: '3rem',
                  color: 'var(--accent-color)',
                  marginBottom: '20px',
                }}
              ></i>
              <h3>{t('why_1_title')}</h3>
              <p
                style={{
                  fontWeight: 400,
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                {t('why_1_desc')}
              </p>
            </div>
            <div
              className="product-card"
              style={{
                padding: '30px',
                boxShadow: 'none',
                background: 'transparent',
              }}
            >
              <i
                className="fas fa-shield-alt"
                style={{
                  fontSize: '3rem',
                  color: 'var(--accent-color)',
                  marginBottom: '20px',
                }}
              ></i>
              <h3>{t('why_2_title')}</h3>
              <p
                style={{
                  fontWeight: 400,
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                {t('why_2_desc')}
              </p>
            </div>
            <div
              className="product-card"
              style={{
                padding: '30px',
                boxShadow: 'none',
                background: 'transparent',
              }}
            >
              <i
                className="fas fa-tools"
                style={{
                  fontSize: '3rem',
                  color: 'var(--accent-color)',
                  marginBottom: '20px',
                }}
              ></i>
              <h3>{t('why_3_title')}</h3>
              <p
                style={{
                  fontWeight: 400,
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                {t('why_3_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
