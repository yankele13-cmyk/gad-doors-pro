'use client';

import { useLanguage } from '@/context/LanguageContext';
import PageSection from '@/components/PageSection';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <main>
      <PageSection paddingTop>
        <div className="text-center mb-5">
          <h1 className="section-title-modern">{t('about_title')}</h1>
          <p className="section-subtitle-modern">{t('about_subtitle')}</p>
        </div>

        <div className="container">
          <div className="product-grid" style={{ gap: '40px' }}>
            {/* Experience */}
            <div className="premium-card">
              <div className="feature-icon-circle">
                <i className="fas fa-history"></i>
              </div>
              <h3>{t('about_exp_title')}</h3>
              <p>{t('about_exp_desc')}</p>
            </div>

            {/* Direct Import */}
            <div className="premium-card">
              <div className="feature-icon-circle">
                <i className="fas fa-globe-asia"></i>
              </div>
              <h3>{t('about_origin_title')}</h3>
              <p>{t('about_origin_desc')}</p>
            </div>

            {/* Total Control */}
            <div className="premium-card">
              <div className="feature-icon-circle">
                <i className="fas fa-tasks"></i>
              </div>
              <h3>{t('about_force_title')}</h3>
              <p>{t('about_force_desc')}</p>
            </div>
          </div>
        </div>
      </PageSection>
    </main>
  );
}
