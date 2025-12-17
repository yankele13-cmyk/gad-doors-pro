'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import styles from './InstallationGrid.module.css';

export default function InstallationGrid({ initialImages = [] }) {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);

  const openLightbox = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className={styles.container}>
      <div className="text-center mb-10">
        <h1 className="section-title-modern">{t('installations_title')}</h1>
        <p className="section-subtitle-modern">{t('installations_subtitle')}</p>
      </div>

      {initialImages.length === 0 ? (
        <div className="text-center p-12 text-gray-400">
          <p>{t('no_installations') || 'Aucune réalisation disponible pour le moment.'}</p>
        </div>
      ) : (
        <div className="masonry-grid">
          {initialImages.map((img) => (
            <div 
              key={img.id} 
              className="masonry-item cursor-pointer hover:opacity-90 transition-opacity" 
              onClick={() => openLightbox(img.imageUrl)}
            >
              <Image
                src={img.imageUrl}
                alt={img.description || t('installations_alt') || 'Installation Gad Doors'}
                width={500}
                height={700}
                className="w-full h-auto block rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" 
          onClick={closeLightbox}
        >
          <span className="absolute top-5 right-5 text-white text-4xl cursor-pointer">&times;</span>
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex justify-center items-center">
            <Image
              src={selectedImage}
              alt="Installation Fullscreen"
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </div>
  );
}
