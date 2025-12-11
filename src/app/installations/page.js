// src/app/installations/page.js
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import PageSection from '@/components/PageSection';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import './installations.css'; // Nous créerons ce fichier CSS

export default function InstallationsPage() {
  const { t } = useLanguage();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('/api/images/atkanot');
        const data = await response.json();
        setImages(data.images || []);
      } catch (error) {
        console.error('Failed to fetch installation images:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, []);

  const openLightbox = (image) => {
    setSelectedImage(`/images/atkanot/${image}`);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <main>
      <PageSection paddingTop>
        <div className="text-center">
          <h1 className="section-title-modern">{t('installations_title')}</h1>
          <p className="section-subtitle-modern">{t('installations_subtitle')}</p>
        </div>

        {loading ? (
          <div className="masonry-grid">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="skeleton-image masonry-item" style={{ height: '300px' }} />
            ))}
          </div>
        ) : (
          <div className="masonry-grid">
            {images.map((image, index) => (
              <div key={index} className="masonry-item" onClick={() => openLightbox(image)}>
                <Image
                  src={`/images/atkanot/${image}`}
                  alt={`${t('installations_alt')} ${index + 1}`}
                  width={500}
                  height={700} // Hauteur indicative, sera ajustée par CSS
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            ))}
          </div>
        )}
      </PageSection>

      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <span className="close-btn">&times;</span>
          <div className="lightbox-content">
            <Image
              src={selectedImage}
              alt="Installation en gros plan"
              width={1200}
              height={800}
              style={{ maxHeight: '90vh', maxWidth: '90vw', objectFit: 'contain' }}
            />
          </div>
        </div>
      )}
    </main>
  );
}
