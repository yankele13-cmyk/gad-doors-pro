"use client";

import Image from 'next/image';
import PropTypes from 'prop-types';
import { useLanguage } from '@/context/LanguageContext';

export default function ProductCard({ product }) {
  const { language } = useLanguage();
  
  const name = language === 'he' && product.name_he ? product.name_he : product.name;
  const description = language === 'he' && product.description_he ? product.description_he : product.description;

  return (
    <div className="product-card">
      <div className="product-image">
        <Image
          src={product.image.startsWith('data:') || product.image.startsWith('http') ? product.image : `/images/${product.image}`}
          alt={name}
          width={400}
          height={300}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
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
    isHidden: PropTypes.bool
  }).isRequired
};
