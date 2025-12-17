'use client';

import Image from 'next/image';
import Badge from '@/components/ui/Badge';
import PropTypes from 'prop-types';
import { useLanguage } from '@/context/LanguageContext';

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
    
    // 1. Absolute URL (e.g. external http or already processed)
    if (imagePath.startsWith('http')) return imagePath; 
    
    // 2. Already starts with /images (local path fix)
    if (imagePath.startsWith('/images/')) return imagePath;

    // 3. Local studio paths (legacy data)
    if (imagePath.startsWith('studio')) return `/images/${imagePath}`;
    
    // 4. Fallback to assuming the property holds the full URL (Firebase migration)
    return imagePath;
  };
  
  // Image Url logic
  const imageSrc = getImageUrl(product.image);

  /* 
    Adjust height: 
    - Doors are tall/vertical -> 350px
    - Accessories are smaller -> 250px 
  */
  const isAccessory = product.category === 'accessories';
  const imageHeight = isAccessory ? 250 : 350;

  return (
    <div className="product-card">
      <div className="product-image" style={{ height: `${imageHeight}px`, background: '#f9f9f9' }}>
        {product.image ? (
          <Image
            src={imageSrc}
            alt={name || 'Product'}
            width={400}
            height={300}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain', 
              padding: '15px'
            }}
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
