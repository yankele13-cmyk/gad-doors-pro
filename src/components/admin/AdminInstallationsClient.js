'use client';

import { useState } from 'react';
import Image from 'next/image';
import { addInstallation, deleteInstallation } from '@/services/business/installationStore';
import { installationUploadSchema } from '@/lib/utils/validations';

export default function AdminInstallationsClient({ initialImages = [] }) {
  const [images, setImages] = useState(initialImages);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  // Note: Since we don't have real-time subscriptions set up in this component 
  // (though checking store updates would be ideal), we'll manage local state optimistically
  // or re-fetch if we really needed to. For now, simple state manipulation is faster.

  async function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    // ZOD VALIDATION
    const validation = installationUploadSchema.safeParse({ file });
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    setUploading(true);
    setError('');

    try {
      const newImage = await addInstallation(file);
      // Update local state immediately
      setImages([newImage, ...images]);
    } catch (err) {
      console.error(err);
      setError('Erreur lors de l\'upload. Réessayez.');
    } finally {
      setUploading(false);
      e.target.value = null;
    }
  }

  async function handleDelete(id, storagePath) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) return;

    try {
      // Optimistic update
      const previousImages = [...images];
      setImages(prev => prev.filter(img => img.id !== id));

      await deleteInstallation(id, storagePath);
    } catch (err) {
      console.error(err);
      setError('Erreur lors de la suppression.');
      // Rollback would go here if needed, but for now we just show error
      // Ideally we would re-fetch or revert state
    }
  }

  return (
    <div>
      <div className="admin-page-header" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '30px',
          flexWrap: 'wrap',
          gap: '20px'
      }}>
        <h1 style={{ margin: 0, color: '#2d3436' }}>Nos Réalisations</h1>
        
        {/* Upload Button */}
        <div style={{ position: 'relative' }}>
            <input
                type="file"
                id="file-upload"
                onChange={handleFileUpload}
                accept="image/*"
                style={{ display: 'none' }}
                disabled={uploading}
            />
            <label 
                htmlFor="file-upload"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: uploading ? '#b2bec3' : '#0984e3',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    cursor: uploading ? 'not-allowed' : 'pointer',
                    fontWeight: 600,
                    transition: 'background 0.2s',
                    boxShadow: '0 4px 6px rgba(9, 132, 227, 0.2)'
                }}
            >
                {uploading ? (
                    <><i className="fas fa-spinner fa-spin"></i> Upload en cours...</>
                ) : (
                    <><i className="fas fa-cloud-upload-alt"></i> Ajouter une photo</>
                )}
            </label>
        </div>
      </div>

      {error && (
        <div style={{ 
            background: '#ffeaa7', 
            color: '#d63031', 
            padding: '15px', 
            borderRadius: '8px',
            marginBottom: '20px',
            border: '1px solid #fdcb6e'
        }}>
            <i className="fas fa-exclamation-triangle" style={{marginRight: '8px'}}></i>
            {error}
        </div>
      )}

      {images.length === 0 ? (
        <div style={{ 
            textAlign: 'center', 
            padding: '80px', 
            background: 'white', 
            borderRadius: '16px',
            border: '2px dashed #dfe6e9',
            color: '#b2bec3'
        }}>
            <i className="fas fa-images" style={{ fontSize: '3rem', marginBottom: '20px' }}></i>
            <p>Aucune réalisation pour le moment.</p>
            <p>Utilisez le bouton "Ajouter une photo" pour commencer.</p>
        </div>
      ) : (
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
            gap: '24px' 
        }}>
          {images.map((img) => (
            <div key={img.id} style={{ 
                background: 'white', 
                borderRadius: '12px', 
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                position: 'relative',
                transition: 'transform 0.2s',
                aspectRatio: '4/5'
            }}>
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <Image
                    src={img.imageUrl}
                    alt={img.description || 'Installation'}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  
                  <div className="image-overlay" style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0,0,0,0.4)',
                      opacity: 0,
                      transition: 'opacity 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.opacity = 1}
                  onMouseOut={(e) => e.currentTarget.style.opacity = 0}
                  >
                      <button 
                        onClick={() => handleDelete(img.id, img.storagePath)}
                        style={{
                            background: '#d63031',
                            color: 'white',
                            border: 'none',
                            padding: '12px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            fontSize: '1.2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '48px',
                            height: '48px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                        }}
                        title="Supprimer"
                      >
                          <i className="fas fa-trash-alt"></i>
                      </button>
                  </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
