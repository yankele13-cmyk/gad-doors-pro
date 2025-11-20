'use client';

import { useState } from 'react';
import AuthGuard from '@/components/admin/AuthGuard';
import ProductTable from '@/components/admin/ProductTable';
import ProductModal from '@/components/admin/ProductModal';
import { useAdmin } from '@/context/AdminContext';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const { logout } = useAdmin();
  const { t, language, toggleLanguage } = useLanguage();
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/admin';
  };

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

  return (
    <AuthGuard>
      <div
        style={{
          minHeight: '100vh',
          background: 'var(--bg-body)',
          paddingTop: '80px',
        }}
      >
        {/* Admin Header */}
        <div
          style={{
            background: 'var(--bg-surface)',
            borderBottom: '1px solid #eee',
            padding: '20px 0',
            position: 'sticky',
            top: '80px',
            zIndex: 100,
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}
        >
          <div
            className="container"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <h1
                style={{
                  margin: 0,
                  fontSize: '1.8rem',
                  color: 'var(--text-main)',
                }}
              >
                <i
                  className="fas fa-tools"
                  style={{ marginRight: '12px', color: 'var(--accent-color)' }}
                ></i>
                {t('admin_dashboard')}
              </h1>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="btn-outline"
                style={{
                  padding: '8px 16px',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                title={
                  language === 'fr' ? 'Switch to Hebrew' : 'Passer en Français'
                }
              >
                <i className="fas fa-language"></i>
                {language === 'fr' ? 'עברית' : 'Français'}
              </button>

              {/* View Site Button */}
              <Link
                href="/"
                className="btn-outline"
                style={{
                  padding: '8px 16px',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                }}
              >
                <i className="fas fa-external-link-alt"></i>
                {t('admin_view_site')}
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="btn"
                style={{
                  border: 'none',
                  padding: '8px 16px',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#dc3545',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = '#c82333')
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = '#dc3545')
                }
              >
                <i className="fas fa-sign-out-alt"></i>
                {t('admin_logout')}
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="container section-padding">
          <div
            style={{
              marginBottom: '30px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h2>Gestion des Produits</h2>
            <button
              onClick={handleAddProduct}
              className="btn"
              style={{ border: 'none' }}
            >
              <i className="fas fa-plus" style={{ marginRight: '8px' }}></i>
              {t('admin_add')}
            </button>
          </div>

          <ProductTable onEdit={handleEditProduct} />
        </div>

        {/* Product Modal */}
        {isModalOpen && (
          <ProductModal
            product={editingProduct}
            onClose={handleCloseModal}
            onSave={handleSave}
          />
        )}
      </div>
    </AuthGuard>
  );
}
