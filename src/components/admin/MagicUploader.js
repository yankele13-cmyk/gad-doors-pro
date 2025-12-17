'use client';

import { useState } from 'react';

export default function MagicUploader({ onImageUpload, currentImage }) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(currentImage || null);
  const [error, setError] = useState(null);
  const [prompt, setPrompt] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Local preview immediately
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setError(null);
  };

  const processImage = async (file) => {
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    if (prompt.trim()) {
        formData.append('prompt', prompt.trim());
    }

    try {
      const response = await fetch('/api/admin/remove-bg', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log("✂️ Cloudinary Response:", data);

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors du détourage');
      }

      // Success! Update parent
      if (onImageUpload) {
        onImageUpload(data.url);
      }
      setPreview(data.url);

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="magic-uploader" style={{ border: '2px dashed #ddd', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
      
      {/* Prompt Input */}
      <div style={{ marginBottom: '15px', textAlign: 'left' }}>
        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#666', marginBottom: '5px', display: 'block' }}>
           <i className="fas fa-magic" style={{ color: 'var(--accent-color)' }}></i> Prompt IA (Optionnel)
        </label>
        <div style={{ display: 'flex', gap: '8px' }}>
            <input 
                type="text" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ex: Luxurious living room with sunlight..."
                style={{ 
                    flex: 1, 
                    padding: '8px 12px', 
                    borderRadius: '6px', 
                    border: '1px solid #ddd',
                    fontSize: '0.9rem'
                }}
            />
        </div>
        <small style={{ color: '#999', fontSize: '0.75rem' }}>Laisser vide pour juste détourer (fond transparent).</small>
      </div>

      {/* Preview Area */}
      <div style={{ marginBottom: '15px', minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9f9f9', borderRadius: '4px', position: 'relative' }}>
        {loading && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className="spinner" style={{ width: '30px', height: '30px', border: '3px solid #f3f3f3', borderTop: '3px solid var(--accent-color)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#666' }}>IA en cours de travail...</p>
          </div>
        )}
        
        {preview ? (
          <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} />
        ) : (
          <span style={{ color: '#aaa' }}>Aucune image sélectionnée</span>
        )}
      </div>

      {/* Inputs */}
      <input 
        type="file" 
        id="magic-upload" 
        accept="image/*" 
        style={{ display: 'none' }} 
        onChange={(e) => {
           handleFileChange(e);
           // We store the file in a temp variable or state if we want to confirm before upload
           // For MVP speed: let's pass the file to a helper state to allow upload
           const file = e.target.files[0];
           if(file) document.getElementById('magic-upload').file = file;
        }}
      />

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button 
          type="button"
          className="btn btn-outline" 
          onClick={() => document.getElementById('magic-upload').click()}
          disabled={loading}
        >
          {preview ? 'Changer la photo' : 'Choisir une photo'}
        </button>

        {preview && !loading && (
          <button 
            type="button"
            className="btn" 
            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none' }}
            onClick={() => {
               const input = document.getElementById('magic-upload');
               if (input && input.files[0]) {
                 processImage(input.files[0]);
               } else {
                 // If preview is set but no new file (e.g. existing url), we can't magic remove without source file usually
                 // unless we send URL to cloudinary. For MVP, assume new file.
                 setError("Veuillez sélectionner une nouvelle image locale pour le détourage.");
               }
            }}
          >
            ✨ Détourage Magique
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p style={{ color: '#ff4d4f', marginTop: '10px', fontSize: '0.9rem' }}>
          <i className="fas fa-exclamation-circle"></i> {error}
        </p>
      )}

      {/* CSS for spinner */}
      <style jsx>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
