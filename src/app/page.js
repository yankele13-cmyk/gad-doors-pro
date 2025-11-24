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

      {/* Premium Expertise Banner - Overlapping Hero */}
      <div className="container" style={{ position: 'relative', padding: '0 20px' }}>
        <div className="expertise-banner text-center">
          <p className="expertise-text">
            <i className="fas fa-certificate" style={{ color: 'var(--accent-color)', marginRight: '12px' }}></i>
            {t('expertise_banner')}
          </p>
        </div>
      </div>

      {/* Categories Preview - Clean & Modern */}
      <section className="section-padding" style={{ paddingTop: '80px' }}>
        <div className="container">
          <div className="categories-preview" style={{ marginTop: 0, padding: 0 }}>
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
                <span className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>
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
                <span className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>
                  {t('btn_discover')}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Product Ranges - Premium Cards */}
      <section className="section-padding" style={{ background: 'var(--bg-body)' }}>
        <div className="container">
          <div className="text-center">
            <h2 className="section-title-modern">{t('ranges_title')}</h2>
            <p className="section-subtitle-modern">Découvrez nos collections adaptées à tous les besoins</p>
          </div>
          
          <div className="product-grid" style={{ marginTop: '40px', gap: '30px' }}>
            {/* WPC */}
            <div className="premium-card">
              <div className="feature-icon-circle">
                <i className="fas fa-water"></i>
              </div>
              <h3>{t('range_wpc_title')}</h3>
              <p>{t('range_wpc_desc')}</p>
            </div>

            {/* Formica */}
            <div className="premium-card">
              <div className="feature-icon-circle">
                <i className="fas fa-layer-group"></i>
              </div>
              <h3>{t('range_formica_title')}</h3>
              <p>{t('range_formica_desc')}</p>
            </div>

            {/* PVC */}
            <div className="premium-card">
              <div className="feature-icon-circle">
                <i className="fas fa-wallet"></i>
              </div>
              <h3>{t('range_pvc_title')}</h3>
              <p>{t('range_pvc_desc')}</p>
            </div>
          </div>
          
          <div className="text-center" style={{ marginTop: '60px' }}>
            <Link href="/doors" className="btn">
              {t('btn_view_ranges')}
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Clean Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title-modern">{t('why_title')}</h2>
            <p className="section-subtitle-modern">{t('why_subtitle')}</p>
          </div>
          
          <div className="product-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
            {/* Point 1 */}
            <div className="premium-card" style={{ padding: '2rem' }}>
              <i className="fas fa-globe" style={{ fontSize: '2rem', color: 'var(--accent-color)', marginBottom: '1rem' }}></i>
              <h3>{t('why_1_title')}</h3>
              <p>{t('why_1_desc')}</p>
            </div>

            {/* Point 2 */}
            <div className="premium-card" style={{ padding: '2rem' }}>
              <i className="fas fa-key" style={{ fontSize: '2rem', color: 'var(--accent-color)', marginBottom: '1rem' }}></i>
              <h3>{t('why_2_title')}</h3>
              <p>{t('why_2_desc')}</p>
            </div>

            {/* Point 3 */}
            <div className="premium-card" style={{ padding: '2rem' }}>
              <i className="fas fa-shield-alt" style={{ fontSize: '2rem', color: 'var(--accent-color)', marginBottom: '1rem' }}></i>
              <h3>{t('why_3_title')}</h3>
              <p>{t('why_3_desc')}</p>
            </div>

            {/* Point 4 */}
            <div className="premium-card" style={{ padding: '2rem' }}>
              <i className="fas fa-tag" style={{ fontSize: '2rem', color: 'var(--accent-color)', marginBottom: '1rem' }}></i>
              <h3>{t('why_4_title')}</h3>
              <p>{t('why_4_desc')}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
