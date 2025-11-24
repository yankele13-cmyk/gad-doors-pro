'use client';

import { useState, useEffect } from 'react';
import {
  getProducts,
  deleteProduct,
  toggleProductVisibility,
  initializeStore,
} from '@/lib/productStore';
import { products as defaultProducts } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';
import Badge from '@/components/Badge';
import Image from 'next/image';

export default function ProductTable({ onEdit }) {
  const [products, setProducts] = useState([]);
  const { t, language } = useLanguage();

  // Charger les produits
  useEffect(() => {
    async function initialize() {
      await initializeStore(defaultProducts);
      await loadProducts();
    }

    initialize();

    // Écouter les mises à jour
    const handleUpdate = () => loadProducts();
    window.addEventListener('productsUpdated', handleUpdate);
    return () => window.removeEventListener('productsUpdated', handleUpdate);
  }, []);

  const loadProducts = async () => {
    const allProducts = await getProducts();
    setProducts(allProducts);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${name}" ?`)) {
      try {
        await deleteProduct(id);
        await loadProducts();
      } catch (error) {
        alert('Erreur lors de la suppression : ' + error.message);
      }
    }
  };

  const handleToggleVisibility = async (id) => {
    try {
      await toggleProductVisibility(id);
      await loadProducts();
    } catch (error) {
      alert('Erreur : ' + error.message);
    }
  };

  return (
    <div
      style={{
        background: 'var(--bg-surface)',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Nom (FR)</th>
            <th>Nom (HE)</th>
            <th>Catégorie</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                style={{
                  textAlign: 'center',
                  padding: '40px',
                  color: 'var(--text-muted)',
                }}
              >
                Aucun produit. Cliquez sur "Ajouter Produit" pour commencer.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src={`/images/${product.image}`}
                      alt={product.name}
                      width={60}
                      height={60}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                </td>
                <td>{product.name}</td>
                <td dir="rtl">{product.name_he}</td>
                <td>
                  <Badge
                    type={
                      product.category === 'doors'
                        ? 'categoryDoors'
                        : 'categoryAccessories'
                    }
                  >
                    {product.category === 'doors' ? 'Portes' : 'Accessoires'}
                  </Badge>
                </td>
                <td>
                  <Badge
                    type={product.is_hidden ? 'statusHidden' : 'statusVisible'}
                  >
                    {product.is_hidden ? 'Masqué' : 'Visible'}
                  </Badge>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleToggleVisibility(product.id)}
                      className="btn-small"
                      style={{
                        background: product.is_hidden ? '#4caf50' : '#ff9800',
                        color: 'white',
                      }}
                      title={product.is_hidden ? 'Afficher' : 'Masquer'}
                    >
                      <i
                        className={`fas ${product.is_hidden ? 'fa-eye' : 'fa-eye-slash'}`}
                      ></i>
                    </button>
                    <button
                      onClick={() => onEdit(product)}
                      className="btn-small"
                      title={t('admin_edit')}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className="btn-small delete"
                      title={t('admin_delete')}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
