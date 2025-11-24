'use client';

import { useLanguage } from '@/context/LanguageContext';
import PageSection from '@/components/PageSection';

export default function ProductsRangePage() {
  const { t } = useLanguage();

  return (
    <main>
      <PageSection paddingTop>
        <div className="text-center mb-5">
          <h1 className="section-title-modern">{t('ranges_title')}</h1>
          <p className="section-subtitle-modern">{t('hero_subtitle')}</p>
        </div>

        {/* WPC Section */}
        <section className="range-section">
          <div className="container">
            <div className="range-content">
              <div className="range-text">
                <h2 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>{t('wpc_title')}</h2>
                <h4 className="mb-4" style={{ fontSize: '1.5rem', fontWeight: 300 }}>{t('wpc_subtitle')}</h4>
                <ul className="range-features">
                  <li><i className="fas fa-check-circle"></i> {t('wpc_comp')}</li>
                  <li><i className="fas fa-shield-alt"></i> {t('wpc_resist')}</li>
                  <li><i className="fas fa-volume-mute"></i> {t('wpc_iso')}</li>
                  <li><i className="fas fa-star" style={{ color: '#ffc107' }}></i> <strong>{t('wpc_warranty')}</strong></li>
                </ul>
              </div>
              <div className="range-visual">
                <i className="fas fa-water"></i>
              </div>
            </div>
          </div>
        </section>

        {/* Formica Section */}
        <section className="range-section" style={{ background: '#fff' }}>
          <div className="container">
            <div className="range-content">
              <div className="range-text">
                <h2 style={{ color: '#333', marginBottom: '1rem' }}>{t('formica_title')}</h2>
                <h4 className="mb-4" style={{ fontSize: '1.5rem', fontWeight: 300 }}>{t('formica_subtitle')}</h4>
                <ul className="range-features">
                  <li><i className="fas fa-layer-group"></i> {t('formica_comp')}</li>
                  <li><i className="fas fa-dumbbell"></i> {t('formica_resist')}</li>
                  <li><i className="fas fa-paint-brush"></i> {t('formica_design')}</li>
                </ul>
              </div>
              <div className="range-visual">
                <i className="fas fa-layer-group"></i>
              </div>
            </div>
          </div>
        </section>

        {/* PVC Section */}
        <section className="range-section">
          <div className="container">
            <div className="range-content">
              <div className="range-text">
                <h2 style={{ color: '#666', marginBottom: '1rem' }}>{t('pvc_title')}</h2>
                <h4 className="mb-4" style={{ fontSize: '1.5rem', fontWeight: 300 }}>{t('pvc_subtitle')}</h4>
                <ul className="range-features">
                  <li><i className="fas fa-home"></i> {t('pvc_usage')}</li>
                  <li><i className="fas fa-broom"></i> {t('pvc_maint')}</li>
                </ul>
              </div>
              <div className="range-visual">
                <i className="fas fa-wallet"></i>
              </div>
            </div>
          </div>
        </section>

        {/* Comparator Table */}
        <div className="container section-padding">
          <h2 className="text-center mb-5">{t('comp_title')}</h2>
          <div className="comparator-wrapper">
            <table className="comparator-table">
              <thead>
                <tr>
                  <th></th>
                  <th style={{ color: 'var(--accent-color)' }}>WPC</th>
                  <th>Formica</th>
                  <th>PVC</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{t('comp_water')}</td>
                  <td>⭐⭐⭐⭐⭐</td>
                  <td>⭐⭐⭐</td>
                  <td>⭐⭐</td>
                </tr>
                <tr>
                  <td>{t('comp_scratch')}</td>
                  <td>⭐⭐⭐⭐</td>
                  <td>⭐⭐⭐⭐⭐</td>
                  <td>⭐⭐⭐</td>
                </tr>
                <tr>
                  <td>{t('comp_price')}</td>
                  <td>$$$</td>
                  <td>$$</td>
                  <td>$</td>
                </tr>
                <tr>
                  <td>{t('comp_warranty')}</td>
                  <td>7 Ans</td>
                  <td>1 An</td>
                  <td>1 An</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Technical Options */}
        <div className="container mb-5">
            <h2 className="text-center mb-5">{t('tech_title')}</h2>
            <div className="tech-grid">
                <div className="tech-card">
                    <div className="feature-icon-circle" style={{ margin: '0 0 1.5rem' }}>
                        <i className="fas fa-lock"></i>
                    </div>
                    <h3>{t('tech_locks_title')}</h3>
                    <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
                        <li className="mb-2"><i className="fas fa-check text-success me-2"></i> {t('lock_mag')}</li>
                        <li className="mb-2"><i className="fas fa-check text-success me-2"></i> {t('lock_butterfly')}</li>
                        <li className="mb-2"><i className="fas fa-check text-success me-2"></i> {t('lock_key')}</li>
                        <li className="mb-2"><i className="fas fa-check text-success me-2"></i> {t('lock_cyl')}</li>
                        <li className="mb-2"><i className="fas fa-check text-success me-2"></i> {t('lock_lang')}</li>
                    </ul>
                </div>
                <div className="tech-card">
                    <div className="feature-icon-circle" style={{ margin: '0 0 1.5rem' }}>
                        <i className="fas fa-palette"></i>
                    </div>
                    <h3>{t('tech_design_title')}</h3>
                    <p className="mb-3">{t('colors_avail')}</p>
                    <p>{t('frames_desc')}</p>
                </div>
            </div>
        </div>
      </PageSection>
    </main>
  );
}
