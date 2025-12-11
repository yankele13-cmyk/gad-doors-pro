'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProductCard from '@/components/ProductCard';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { getProducts, initializeStore } from '@/lib/productStore';
import { products as defaultProducts } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/lib/supabase';
import PageSection from '@/components/PageSection';

/**
 * Reusable Product List Page
 * Consolidates doors and accessories pages
 */
export default function ProductListPage({ category, titleKey }) {
  const { t, language } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    async function initialize() {
      setLoading(true);

      // S'assure que la DB est peuplée si elle est vide
      await initializeStore(defaultProducts);

      // Load products
      await loadProducts();
      setLoading(false);
    }

    initialize();

    // Listen for updates from admin
    const handleUpdate = () => loadProducts();
    window.addEventListener('productsUpdated', handleUpdate);
    return () => window.removeEventListener('productsUpdated', handleUpdate);
  }, [category]); // Re-load if category changes

  const loadProducts = async () => {
    const allProducts = await getProducts();
    const filteredProducts = allProducts.filter(
      (p) => p.category === category && !p.is_hidden
    );
    setProducts(filteredProducts);
  };

  const openModal = (product) => {
    console.log('Opening modal for product:', product);
    setSelectedProduct(product);
  };

  const closeModal = () => {
    console.log('Closing modal');
    setSelectedProduct(null);
  };

  const getProductName = (product) => {
    if (language === 'he' && product.name_he) {
      return product.name_he;
    }
    return product.name;
  };

  const getProductDescription = (product) => {
    if (language === 'he' && product.description_he) {
      return product.description_he;
    }
    return product.description;
  };

  return (
    <main>
      <PageSection paddingTop>
        <h1 className="text-center">{t(titleKey)}</h1>

        <div className="product-grid">
          {loading ? (
            <LoadingSkeleton count={6} />
          ) : products.length === 0 ? (
            <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
              <i className="fas fa-box-open"></i>
              <h3>{t('no_products_title') || 'Aucun produit disponible'}</h3>
              <p>
                {t('no_products_desc') ||
                  'Revenez bientôt pour découvrir nos nouveautés !'}
              </p>
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                onClick={() => openModal(product)}
                style={{
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </PageSection>

      {/* Modal Lightbox */}
      {selectedProduct && (
        <div
          className="product-modal-overlay"
          onClick={closeModal}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
        >
          <div
            className="product-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '40px',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '28px',
                cursor: 'pointer',
                color: '#666',
                padding: '0',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ✕
            </button>

            {/* Product Content */}
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ marginBottom: '10px', fontSize: '28px', marginTop: 0 }}>
                {getProductName(selectedProduct)}
              </h2>
              <p style={{ fontSize: '16px', color: '#666', marginBottom: '30px' }}>
                {getProductDescription(selectedProduct)}
              </p>

              {/* Product Image */}
              <div style={{ marginTop: '30px' }}>
                 <img
                  src={
                    selectedProduct.image.startsWith('http')
                      ? selectedProduct.image
                      : selectedProduct.image.startsWith('studio')
                      ? `/images/${selectedProduct.image}`
                      : supabase.storage
                          .from('product-images')
                          .getPublicUrl(selectedProduct.image).data.publicUrl
                  }
                  alt={getProductName(selectedProduct)}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '500px',
                    objectFit: 'contain',
                    borderRadius: '8px',
                  }}
                  onError={(e) => {
                    console.error('Image failed to load:', e.target.src);
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

ProductListPage.propTypes = {
  category: PropTypes.oneOf(['doors', 'accessories']).isRequired,
  titleKey: PropTypes.string.isRequired,
};
