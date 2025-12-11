'use client';

import Image from 'next/image';
import PropTypes from 'prop-types';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/lib/supabase';

export default function ProductCard({ product }) {
  const { language } = useLanguage();

  if (!product) return null;

  const name =
    language === 'he' && product.name_he ? product.name_he : product.name;
  const description =
    language === 'he' && product.description_he
      ? product.description_he
      : product.description;

  // Build the public URL for local images
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/images/placeholder.jpg'; // Fallback
    if (imagePath.startsWith('http')) return imagePath; // Already a full URL
    // Image paths already include the folder (studioDoors/, studioAccessories/)
    if (imagePath.startsWith('studio')) return `/images/${imagePath}`;
    
    // If not a local studio path, assume it's hosted on Supabase Storage
    const { data } = supabase.storage.from('product-images').getPublicUrl(imagePath);
    return data.publicUrl;
  };
  
  const imageSrc = getImageUrl(product.image);

  return (
    <div className="product-card" style={{ pointerEvents: 'none' }}>
      <div className="product-image">
        {product.image ? (
          <Image
            src={imageSrc}
            alt={name || 'Product'}
            width={400}
            height={300}
            loading="eager"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: '#ccc' }}>No Image</span>
          </div>
        )}
      </div>
      <div className="product-info">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    name_he: PropTypes.string.isRequired,
    description: PropTypes.string,
    description_he: PropTypes.string,
    category: PropTypes.oneOf(['doors', 'accessories']).isRequired,
    image: PropTypes.string.isRequired,
    isHidden: PropTypes.bool,
  }).isRequired,
};
