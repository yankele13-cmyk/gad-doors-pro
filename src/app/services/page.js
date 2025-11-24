'use client';

import { useLanguage } from '@/context/LanguageContext';
import PageSection from '@/components/PageSection';

export default function ServicesPage() {
  const { t } = useLanguage();

  return (
    <main>
      <PageSection paddingTop>
        <div className="text-center mb-5">
          <h1 className="section-title-modern">{t('services_title')}</h1>
          <p className="section-subtitle-modern">{t('services_subtitle')}</p>
        </div>

        <div className="container">
          <div className="product-grid" style={{ gap: '30px' }}>
            {/* Consultation */}
            <div className="premium-card">
              <div className="feature-icon-circle">
                <i className="fas fa-comments"></i>
              </div>
              <h3>{t('service_consult_title')}</h3>
              <p>{t('service_consult_desc')}</p>
            </div>

            {/* Measurement */}
            <div className="premium-card">
              <div className="feature-icon-circle">
                <i className="fas fa-ruler-combined"></i>
              </div>
              <h3>{t('service_measure_title')}</h3>
              <p>{t('service_measure_desc')}</p>
            </div>

            {/* Removal - Highlighted */}
            <div className="premium-card" style={{ border: '2px solid var(--accent-color)' }}>
              <div className="feature-icon-circle" style={{ background: 'var(--accent-color)', color: 'white' }}>
                <i className="fas fa-trash-alt"></i>
              </div>
              <h3 style={{ color: 'var(--accent-color)' }}>{t('service_removal_title')}</h3>
              <p>{t('service_removal_desc')}</p>
            </div>

            {/* Installation */}
            <div className="premium-card">
              <div className="feature-icon-circle">
                <i className="fas fa-tools"></i>
              </div>
              <h3>{t('service_install_title')}</h3>
              <p>{t('service_install_desc')}</p>
            </div>
          </div>
        </div>
      </PageSection>
    </main>
  );
}
