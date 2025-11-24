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
          <div className="timeline-section">
            <div className="timeline-line"></div>

            {/* Step 1: Consultation */}
            <div className="timeline-item">
              <div className="timeline-number">1</div>
              <div className="timeline-content">
                <div className="feature-icon-circle" style={{ margin: '0 auto 1.5rem' }}>
                  <i className="fas fa-comments"></i>
                </div>
                <h3>{t('service_consult_title')}</h3>
                <p>{t('service_consult_desc')}</p>
              </div>
            </div>

            {/* Step 2: Measurement */}
            <div className="timeline-item">
              <div className="timeline-number">2</div>
              <div className="timeline-content">
                <div className="feature-icon-circle" style={{ margin: '0 auto 1.5rem' }}>
                  <i className="fas fa-ruler-combined"></i>
                </div>
                <h3>{t('service_measure_title')}</h3>
                <p>{t('service_measure_desc')}</p>
              </div>
            </div>

            {/* Step 3: Removal */}
            <div className="timeline-item">
              <div className="timeline-number">3</div>
              <div className="timeline-content" style={{ border: '2px solid var(--accent-color)' }}>
                <div className="feature-icon-circle" style={{ margin: '0 auto 1.5rem', background: 'var(--accent-color)', color: 'white' }}>
                  <i className="fas fa-trash-alt"></i>
                </div>
                <h3 style={{ color: 'var(--accent-color)' }}>{t('service_removal_title')}</h3>
                <p>{t('service_removal_desc')}</p>
              </div>
            </div>

            {/* Step 4: Installation */}
            <div className="timeline-item">
              <div className="timeline-number">4</div>
              <div className="timeline-content">
                <div className="feature-icon-circle" style={{ margin: '0 auto 1.5rem' }}>
                  <i className="fas fa-tools"></i>
                </div>
                <h3>{t('service_install_title')}</h3>
                <p>{t('service_install_desc')}</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-5">
            <a href="/contact" className="btn">
              {t('nav_contact')}
            </a>
          </div>
        </div>
      </PageSection>
    </main>
  );
}
