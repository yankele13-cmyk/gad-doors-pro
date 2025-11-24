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

      {/* Expertise Banner */}
      <section style={{ background: 'var(--text-main)', color: 'white', padding: '20px 0' }}>
        <div className="container text-center">
          <p style={{ fontSize: '1.2rem', margin: 0, fontWeight: 500 }}>
            <i className="fas fa-star" style={{ color: 'var(--accent-color)', marginRight: '10px' }}></i>
            {t('expertise_banner')}
            <i className="fas fa-star" style={{ color: 'var(--accent-color)', marginLeft: '10px' }}></i>
          </p>
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

      {/* Product Ranges */}
      <section className="section-padding" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <h2 className="text-center" style={{ marginBottom: '50px' }}>{t('ranges_title')}</h2>
          <div className="product-grid" style={{ marginTop: 0 }}>
            {/* WPC */}
            <div className="product-card text-center" style={{ padding: '40px 20px' }}>
              <div style={{ 
                width: '80px', height: '80px', background: 'var(--bg-body)', 
                borderRadius: '50%', margin: '0 auto 20px', display: 'flex', 
                alignItems: 'center', justifyContent: 'center' 
              }}>
                <i className="fas fa-water" style={{ fontSize: '2rem', color: 'var(--accent-color)' }}></i>
              </div>
              <h3>{t('range_wpc_title')}</h3>
              <p>{t('range_wpc_desc')}</p>
            </div>

            {/* Formica */}
            <div className="product-card text-center" style={{ padding: '40px 20px' }}>
              <div style={{ 
                width: '80px', height: '80px', background: 'var(--bg-body)', 
                borderRadius: '50%', margin: '0 auto 20px', display: 'flex', 
                alignItems: 'center', justifyContent: 'center' 
              }}>
                <i className="fas fa-layer-group" style={{ fontSize: '2rem', color: 'var(--accent-color)' }}></i>
              </div>
              <h3>{t('range_formica_title')}</h3>
              <p>{t('range_formica_desc')}</p>
            </div>

            {/* PVC */}
            <div className="product-card text-center" style={{ padding: '40px 20px' }}>
              <div style={{ 
                width: '80px', height: '80px', background: 'var(--bg-body)', 
                borderRadius: '50%', margin: '0 auto 20px', display: 'flex', 
                alignItems: 'center', justifyContent: 'center' 
              }}>
                <i className="fas fa-wallet" style={{ fontSize: '2rem', color: 'var(--accent-color)' }}></i>
              </div>
              <h3>{t('range_pvc_title')}</h3>
              <p>{t('range_pvc_desc')}</p>
            </div>
          </div>
          <div className="text-center" style={{ marginTop: '40px' }}>
            <Link href="/doors" className="btn">
              {t('btn_view_ranges')}
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding text-center" style={{ background: 'var(--bg-body)' }}>
        <div className="container">
          <h2>{t('why_title')}</h2>
          <p style={{ maxWidth: '700px', margin: '0 auto 50px' }}>
            {t('why_subtitle')}
          </p>
          
          <div className="product-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            {/* Point 1 */}
            <div className="product-card" style={{ padding: '30px', boxShadow: 'none', background: 'transparent' }}>
              <i className="fas fa-globe" style={{ fontSize: '2.5rem', color: 'var(--accent-color)', marginBottom: '20px' }}></i>
              <h3>{t('why_1_title')}</h3>
              <p>{t('why_1_desc')}</p>
            </div>

            {/* Point 2 */}
            <div className="product-card" style={{ padding: '30px', boxShadow: 'none', background: 'transparent' }}>
              <i className="fas fa-key" style={{ fontSize: '2.5rem', color: 'var(--accent-color)', marginBottom: '20px' }}></i>
              <h3>{t('why_2_title')}</h3>
              <p>{t('why_2_desc')}</p>
            </div>

            {/* Point 3 */}
            <div className="product-card" style={{ padding: '30px', boxShadow: 'none', background: 'transparent' }}>
              <i className="fas fa-shield-alt" style={{ fontSize: '2.5rem', color: 'var(--accent-color)', marginBottom: '20px' }}></i>
              <h3>{t('why_3_title')}</h3>
              <p>{t('why_3_desc')}</p>
            </div>

            {/* Point 4 */}
            <div className="product-card" style={{ padding: '30px', boxShadow: 'none', background: 'transparent' }}>
              <i className="fas fa-tag" style={{ fontSize: '2.5rem', color: 'var(--accent-color)', marginBottom: '20px' }}></i>
              <h3>{t('why_4_title')}</h3>
              <p>{t('why_4_desc')}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
