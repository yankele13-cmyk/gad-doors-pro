import { getInstallations } from '@/services/business/installationStore';
import InstallationGrid from '@/components/features/InstallationGrid';
import PageSection from '@/components/layout/PageSection';
import './installations.css';

export const metadata = {
  title: 'GadDoors | Nos Réalisations - דלתות פנים',
  description: 'Découvrez nos installations de portes intérieures et accessoires. Galerie photos de nos projets récents à Jérusalem et en Israël.',
};

export default async function InstallationsPage() {
  // Fetch data on the server
  // This runs at request time (dynamic) or build time (static) depending on config
  // Since we use Firebase fetch, unless we cache it, it might be dynamic.
  // Next.js 13+ usually caches fetch requests.
  // getInstallations uses Firestore SDK.
  
  const images = await getInstallations();

  return (
    <main>
      <PageSection paddingTop>
        <InstallationGrid initialImages={images} />
      </PageSection>
    </main>
  );
}
