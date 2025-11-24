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

        {/* Detailed Ranges */}
        <div className="container" style={{ marginBottom: '80px' }}>
          {/* WPC */}
          <div className="premium-card mb-5" style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ flex: '1 1 300px', paddingInlineEnd: '20px' }}>
              <h2 style={{ color: 'var(--accent-color)', marginBottom: '10px' }}>{t('wpc_title')}</h2>
              <h4 className="mb-3">{t('wpc_subtitle')}</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li className="mb-2"><i className="fas fa-check text-success me-2"></i> {t('wpc_comp')}</li>
                <li className="mb-2"><i className="fas fa-check text-success me-2"></i> {t('wpc_resist')}</li>
                <li className="mb-2"><i className="fas fa-check text-success me-2"></i> {t('wpc_iso')}</li>
                <li className="mb-2"><i className="fas fa-star text-warning me-2"></i> <strong>{t('wpc_warranty')}</strong></li>
              </ul>
            </div>
            <div style={{ flex: '0 0 100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               <i className="fas fa-water" style={{ fontSize: '4rem', color: '#e0e0e0' }}></i>
            </div>
          </div>

          {/* Formica */}
          <div className="premium-card mb-5" style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ flex: '1 1 300px', paddingInlineEnd: '20px' }}>
              <h2 style={{ color: '#333', marginBottom: '10px' }}>{t('formica_title')}</h2>
              <h4 className="mb-3">{t('formica_subtitle')}</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li className="mb-2"><i className="fas fa-check text-success me-2"></i> {t('formica_comp')}</li>
                <li className="mb-2"><i className="fas fa-check text-success me-2"></i> {t('formica_resist')}</li>
                <li className="mb-2"><i className="fas fa-check text-success me-2"></i> {t('formica_design')}</li>
              </ul>
            </div>
            <div style={{ flex: '0 0 100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               <i className="fas fa-layer-group" style={{ fontSize: '4rem', color: '#e0e0e0' }}></i>
            </div>
          </div>

          {/* PVC */}
          <div className="premium-card" style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ flex: '1 1 300px', paddingInlineEnd: '20px' }}>
              <h2 style={{ color: '#666', marginBottom: '10px' }}>{t('pvc_title')}</h2>
              <h4 className="mb-3">{t('pvc_subtitle')}</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li className="mb-2"><i className="fas fa-check text-success me-2"></i> {t('pvc_usage')}</li>
                <li className="mb-2"><i className="fas fa-check text-success me-2"></i> {t('pvc_maint')}</li>
              </ul>
            </div>
            <div style={{ flex: '0 0 100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               <i className="fas fa-wallet" style={{ fontSize: '4rem', color: '#e0e0e0' }}></i>
            </div>
          </div>
        </div>

        {/* Technical Options */}
        <div className="container mb-5">
            <h2 className="text-center mb-4">{t('tech_title')}</h2>
            <div className="product-grid">
                <div className="premium-card">
                    <h3>{t('tech_locks_title')}</h3>
                    <ul style={{ listStyle: 'circle', paddingInlineStart: '20px' }}>
                        <li>{t('lock_mag')}</li>
                        <li>{t('lock_butterfly')}</li>
                        <li>{t('lock_key')}</li>
                        <li>{t('lock_cyl')}</li>
                        <li>{t('lock_lang')}</li>
                    </ul>
                </div>
                <div className="premium-card">
                    <h3>{t('tech_design_title')}</h3>
                    <p>{t('colors_avail')}</p>
                    <p>{t('frames_desc')}</p>
                </div>
            </div>
        </div>

        {/* Comparator Table */}
        <div className="container">
          <h2 className="text-center mb-4">{t('comp_title')}</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <thead>
                <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #eee' }}>
                  <th style={{ padding: '15px', textAlign: 'start' }}></th>
                  <th style={{ padding: '15px', textAlign: 'center', color: 'var(--accent-color)' }}>WPC</th>
                  <th style={{ padding: '15px', textAlign: 'center' }}>Formica</th>
                  <th style={{ padding: '15px', textAlign: 'center' }}>PVC</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px', fontWeight: 'bold' }}>{t('comp_water')}</td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>⭐⭐⭐⭐⭐</td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>⭐⭐⭐</td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>⭐⭐</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px', fontWeight: 'bold' }}>{t('comp_scratch')}</td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>⭐⭐⭐⭐</td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>⭐⭐⭐⭐⭐</td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>⭐⭐⭐</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px', fontWeight: 'bold' }}>{t('comp_price')}</td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>$$$</td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>$$</td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>$</td>
                </tr>
                 <tr>
                  <td style={{ padding: '15px', fontWeight: 'bold' }}>{t('comp_warranty')}</td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>{t('comp_warranty_7')}</td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>{t('comp_warranty_1')}</td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>{t('comp_warranty_1')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </PageSection>
    </main>
  );
}
