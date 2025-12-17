'use client';

import { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import ProductTable from '@/components/admin/ProductTable';
import ProductModal from '@/components/admin/ProductModal';
import { useLanguage } from '@/context/LanguageContext';

export default function AdminProductsPage() {
  const { t } = useLanguage();
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSave = () => {
    // Le modal fermera automatiquement après sauvegarde
    // La table se mettra à jour via l'événement productsUpdated
  };

  const HeaderAction = (
    <button
      onClick={handleAddProduct}
      className="btn"
      style={{ border: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
    >
      <i className="fas fa-plus"></i>
      {t('admin_add')}
    </button>
  );

  return (
    <AdminLayout title="Gestion des Produits">
      
      {/* Filters Area - Could be expanded later */}
      <div style={{ marginBottom: '20px' }}>
        {/* Placeholder for future search bar logic in ProductTable */}
      </div>

      <div style={{ background: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, color: '#2d3436' }}>Liste des Produits</h2>
            <button
              onClick={handleAddProduct}
              className="btn"
              style={{ 
                border: 'none', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                background: 'linear-gradient(135deg, #0984e3 0%, #74b9ff 100%)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                fontWeight: 600,
                boxShadow: '0 4px 6px rgba(9, 132, 227, 0.2)'
              }}
            >
              <i className="fas fa-plus"></i>
              {t('admin_add') || 'Ajouter'}
            </button>
         </div>
         <ProductTable onEdit={handleEditProduct} />
      </div>

      {isModalOpen && (
        <ProductModal
          product={editingProduct}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </AdminLayout>
  );
}
