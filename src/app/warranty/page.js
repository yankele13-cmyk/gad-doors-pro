'use client';

import { useLanguage } from '@/context/LanguageContext';
import PageSection from '@/components/PageSection';

export default function WarrantyPage() {
  const { t } = useLanguage();

  return (
    <main>
      <PageSection paddingTop>
        <h1 className="text-center">{t('warranty_title')}</h1>
        <p className="text-center" style={{ marginBottom: '50px' }}>
          {t('warranty_subtitle')}
        </p>

        <div className="max-width-800">
          <div className="warranty-section">
            <i className="fas fa-certificate warranty-icon"></i>
            <h3>{t('warranty_1_title')}</h3>
            <p>{t('warranty_1_desc')}</p>
          </div>

          <div className="warranty-section">
            <i className="fas fa-water warranty-icon"></i>
            <h3>{t('warranty_2_title')}</h3>
            <p>{t('warranty_2_desc')}</p>
          </div>

          <div className="warranty-section">
            <i className="fas fa-tools warranty-icon"></i>
            <h3>{t('warranty_3_title')}</h3>
            <p>{t('warranty_3_desc')}</p>
          </div>
        </div>
      </PageSection>
    </main>
  );
}
