'use client';

import Image from 'next/image';
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

  // Fallback image if product.image is missing
  const imageSrc = product.image
    ? product.image.startsWith('data:') || product.image.startsWith('http')
      ? product.image
      : `/images/${product.image}`
    : '/images/placeholder.jpg'; // You might want to ensure this placeholder exists or use a generic one

  return (
    <div className="product-card">
      <div className="product-image">
        {product.image ? (
          <Image
            src={imageSrc}
            alt={name || 'Product'}
            width={400}
            height={300}
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
