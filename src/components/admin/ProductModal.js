'use client';

import { useState, useEffect } from 'react';
import { addProduct, updateProduct } from '@/lib/productStore';
import { useLanguage } from '@/context/LanguageContext';

export default function ProductModal({ product, onClose, onSave }) {
  const { t } = useLanguage();
  const isEditMode = product && product.id;

  const [formData, setFormData] = useState({
    name: '',
    name_he: '',
    description: '',
    description_he: '',
    category: 'doors',
    image: '',
  });

  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Charger les données du produit en mode édition
  useEffect(() => {
    if (isEditMode) {
      setFormData({
        name: product.name || '',
        name_he: product.name_he || '',
        description: product.description || '',
        description_he: product.description_he || '',
        category: product.category || 'doors',
        image: product.image || '',
      });
      if (product.image) {
        setImagePreview(`/images/${product.image}`);
      }
    }
  }, [product, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier la taille (max 4.5MB pour localStorage - attention quota!)
    if (file.size > 4.5 * 1024 * 1024) {
      setError('Image trop grande (max 4.5MB)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result;
      setFormData((prev) => ({ ...prev, image: base64 }));
      setImagePreview(base64);
      setError('');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Validation
    if (!formData.name.trim() || !formData.name_he.trim()) {
      setError('Le nom est requis en français et en hébreu');
      setIsSubmitting(false);
      return;
    }

    if (!formData.image) {
      setError('Une image est requise');
      setIsSubmitting(false);
      return;
    }

    try {
      if (isEditMode) {
        await updateProduct(product.id, formData);
      } else {
        await addProduct(formData);
      }

      onSave?.();
      onClose();
    } catch (err) {
      setError(err.message || 'Erreur lors de la sauvegarde');
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="modal"
      style={{ display: 'flex' }}
      onClick={(e) => e.target.className.includes('modal') && onClose()}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginBottom: '20px' }}>
          {isEditMode ? 'Modifier le Produit' : 'Ajouter un Produit'}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Nom Français */}
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{ display: 'block', marginBottom: '5px', fontWeight: 600 }}
            >
              Nom (Français) *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Ex: Modèle Élégance"
            />
          </div>

          {/* Nom Hébreu */}
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{ display: 'block', marginBottom: '5px', fontWeight: 600 }}
            >
              Nom (Hébreu) *
            </label>
            <input
              type="text"
              name="name_he"
              value={formData.name_he}
              onChange={handleChange}
              required
              dir="rtl"
              placeholder="דוגמה: דגם אלגנס"
            />
          </div>

          {/* Description Français */}
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{ display: 'block', marginBottom: '5px', fontWeight: 600 }}
            >
              Description (Français) *
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Ex: Premium"
            />
          </div>

          {/* Description Hébreu */}
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{ display: 'block', marginBottom: '5px', fontWeight: 600 }}
            >
              Description (Hébreu) *
            </label>
            <input
              type="text"
              name="description_he"
              value={formData.description_he}
              onChange={handleChange}
              required
              dir="rtl"
              placeholder="עיצוב פרימיום"
            />
          </div>

          {/* Catégorie */}
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{ display: 'block', marginBottom: '5px', fontWeight: 600 }}
            >
              Catégorie *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="doors">Portes</option>
              <option value="accessories">Accessoires</option>
            </select>
          </div>

          {/* Image */}
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{ display: 'block', marginBottom: '5px', fontWeight: 600 }}
            >
              Image *
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ marginBottom: '10px' }}
            />
            {imagePreview && (
              <div style={{ marginTop: '10px' }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    maxWidth: '200px',
                    maxHeight: '150px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                  }}
                />
              </div>
            )}
            <small
              style={{ color: '#666', display: 'block', marginTop: '5px' }}
            >
              Max 4.5MB - JPG, PNG, WebP
            </small>
          </div>

          {/* Error */}
          {error && (
            <p
              style={{ color: 'red', marginBottom: '15px', fontSize: '0.9rem' }}
            >
              {error}
            </p>
          )}

          {/* Actions */}
          <div
            style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}
          >
            <button
              type="button"
              onClick={onClose}
              className="btn-outline"
              disabled={isSubmitting}
            >
              {t('admin_cancel')}
            </button>
            <button
              type="submit"
              className="btn"
              style={{ border: 'none' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sauvegarde...' : t('admin_save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
