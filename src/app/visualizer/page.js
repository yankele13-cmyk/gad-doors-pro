'use client';

import PageSection from '@/components/layout/PageSection';
import DoorVisualizer from '@/components/features/DoorVisualizer';
import { useLanguage } from '@/context/LanguageContext';

export default function VisualizerPage() {
  const { t } = useLanguage();

  return (
    <main>
       <PageSection paddingTop>
          <div className="text-center" style={{ marginBottom: '40px' }}>
            <h1>{t('visualizer_title')}</h1>
            <p style={{ fontSize: '1.2rem', color: '#666' }}>
               {t('visualizer_desc')}
            </p>
          </div>
          
          <DoorVisualizer />
       </PageSection>
    </main>
  );
}
