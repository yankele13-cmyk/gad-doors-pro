'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProductCard from '@/components/ProductCard';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { getProducts, initializeStore } from '@/lib/productStore';
import { products as defaultProducts } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';
import PageSection from '@/components/PageSection';

/**
 * Reusable Product List Page
 * Consolidates doors and accessories pages
 */
export default function ProductListPage({ category, titleKey }) {
  const { t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initialize() {
      setLoading(true);

      // Initialize store with default data
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
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </PageSection>
    </main>
  );
}

ProductListPage.propTypes = {
  category: PropTypes.oneOf(['doors', 'accessories']).isRequired,
  titleKey: PropTypes.string.isRequired,
};
