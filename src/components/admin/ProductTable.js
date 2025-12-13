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
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const { t } = useLanguage();

  // Charger les produits
  useEffect(() => {
    async function initialize() {
      await initializeStore(defaultProducts);
      await loadProducts();
    }
    initialize();
    const handleUpdate = () => loadProducts();
    window.addEventListener('productsUpdated', handleUpdate);
    return () => window.removeEventListener('productsUpdated', handleUpdate);
  }, []);

  const loadProducts = async () => {
    const allProducts = await getProducts();
    setProducts(allProducts);
    setFilteredProducts(allProducts);
  };

  // Filtrer les produits
  useEffect(() => {
    let result = products;
    if (categoryFilter !== 'all') {
        result = result.filter(p => p.category === categoryFilter);
    }
    if (searchTerm) {
        const lowerTerm = searchTerm.toLowerCase();
        result = result.filter(p => 
            p.name.toLowerCase().includes(lowerTerm) || 
            (p.name_he && p.name_he.includes(lowerTerm))
        );
    }
    setFilteredProducts(result);
  }, [searchTerm, categoryFilter, products]);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${name}" ?`)) {
        try {
            await deleteProduct(id);
            await loadProducts();
        } catch (error) {
            alert('Erreur : ' + error.message);
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
    <div>
        {/* Filters Bar */}
        <div style={{ 
            background: 'white', 
            padding: '20px', 
            borderRadius: '16px', 
            marginBottom: '20px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '15px',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1 }}>
                <div style={{ position: 'relative', flex: 1, maxWidth: '300px' }}>
                    <i className="fas fa-search" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#b2bec3' }}></i>
                    <input 
                        type="text" 
                        placeholder="Rechercher un produit..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px 15px 12px 40px',
                            border: '1px solid #dfe6e9',
                            borderRadius: '10px',
                            fontSize: '0.95rem',
                            outline: 'none',
                            color: '#2d3436'
                        }}
                    />
                </div>
                <select 
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    style={{
                        padding: '12px 20px',
                        border: '1px solid #dfe6e9',
                        borderRadius: '10px',
                        fontSize: '0.95rem',
                        outline: 'none',
                        color: '#2d3436',
                        background: 'white',
                        cursor: 'pointer'
                    }}
                >
                    <option value="all">Toutes catégories</option>
                    <option value="doors">Portes</option>
                    <option value="accessories">Accessoires</option>
                </select>
            </div>
            <div style={{ color: '#636e72', fontSize: '0.9rem' }}>
                <strong>{filteredProducts.length}</strong> produits trouvés
            </div>
        </div>

      <div
        style={{
          background: 'white',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          border: '1px solid rgba(0,0,0,0.05)'
        }}
      >
      <style jsx>{`
        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }
        .admin-table th {
          text-align: left;
          padding: 20px;
          background: #f8f9fa;
          color: #636e72;
          font-weight: 600;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 2px solid #eee;
        }
        .admin-table td {
          padding: 20px;
          border-bottom: 1px solid #f1f2f6;
          vertical-align: middle;
          color: #2d3436;
          font-size: 0.95rem;
        }
        .admin-table tr:hover {
            background-color: #fafbfc;
        }
        .admin-table tr:last-child td {
          border-bottom: none;
        }
        .btn-icon {
            width: 32px;
            height: 32px;
            border-radius: 8px;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;
            margin-right: 8px;
        }
        .btn-icon:hover {
            transform: translateY(-2px);
        }
        .badge {
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            display: inline-block;
        }
        @media (max-width: 768px) {
            .table-container {
                overflow-x: auto;
            }
        }
      `}</style>
      <div className="table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th style={{width: '80px'}}>Image</th>
            <th>Nom</th>
            <th>Catégorie</th>
            <th>Statut</th>
            <th style={{textAlign: 'right'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                style={{
                  textAlign: 'center',
                  padding: '60px',
                  color: '#b2bec3',
                }}
              >
                <div style={{fontSize: '2rem', marginBottom: '10px'}}><i className="fas fa-search"></i></div>
                Aucun produit ne correspond à votre recherche.
              </td>
            </tr>
          ) : (
            filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
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
                <td>
                    <div style={{fontWeight: 600, marginBottom: '4px'}}>{product.name}</div>
                    <div style={{fontSize: '0.85rem', color: '#636e72'}} dir="rtl">{product.name_he}</div>
                </td>
                <td>
                  <span className="badge" style={{
                      background: product.category === 'doors' ? '#e1705520' : '#6c5ce720',
                      color: product.category === 'doors' ? '#e17055' : '#6c5ce7',
                  }}>
                    {product.category === 'doors' ? <><i className="fas fa-door-open"></i> Portes</> : <><i className="fas fa-tools"></i> Acc.</>}
                  </span>
                </td>
                <td>
                  <span className="badge" style={{
                      background: product.is_hidden ? '#636e7220' : '#00b89420',
                      color: product.is_hidden ? '#636e72' : '#00b894',
                  }}>
                    {product.is_hidden ? 'Masqué' : 'Visible'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => handleToggleVisibility(product.id)}
                      className="btn-icon"
                      style={{
                        background: product.is_hidden ? '#0984e3' : '#a4b0be',
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
                      className="btn-icon"
                      style={{ background: '#dfe6e9', color: '#2d3436' }}
                      title={t('admin_edit')}
                    >
                      <i className="fas fa-pen"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className="btn-icon"
                      style={{ background: '#ff767515', color: '#ff7675' }}
                      title={t('admin_delete')}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>
    </div>
    </div>
  );
}
