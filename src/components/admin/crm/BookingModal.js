'use client';

import { useState, useEffect } from 'react';

/**
 * Modal optimisée pour la prise de RDV rapide (Vente)
 * Pas de react-hook-form pour l'instant pour garder simple et sans dépendance extra (sauf si déjà dans projet)
 */
export default function BookingModal({ isOpen, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    customer: { name: '', phone: '', address: '', city: '' },
    start: '', // YYYY-MM-DDTHH:mm
    access: { floor: '', digicode: '', elevator: false },
    technical: { notes: '', tags: [] },
  });

  const [loading, setLoading] = useState(false);

  // Reset form when opening/initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // Mode Edition ou Création depuis un Lead
        const startDate = initialData.start instanceof Date 
            ? initialData.start.toISOString().slice(0, 16) 
            : new Date().toISOString().slice(0, 16);

        setFormData({
            customer: { ...formData.customer, ...initialData.customer },
            start: startDate,
            access: { ...formData.access, ...initialData.access },
            technical: { ...formData.technical, ...initialData.technical },
        });
      } else {
        // Reset à neuf
        setFormData({
            customer: { name: '', phone: '', address: '', city: '' },
            start: new Date().toISOString().slice(0, 16),
            access: { floor: '', digicode: '', elevator: false },
            technical: { notes: '', tags: [] },
        });
      }
    }
  }, [isOpen, initialData]);

  const handleChange = (section, field, value) => {
    if (section === 'root') {
        setFormData(prev => ({ ...prev, [field]: value }));
    } else {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    }
  };

  const toggleTag = (tag) => {
      const currentTags = formData.technical.tags || [];
      const newTags = currentTags.includes(tag) 
        ? currentTags.filter(t => t !== tag)
        : [...currentTags, tag];
      handleChange('technical', 'tags', newTags);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        // Calcul date de fin (1h par défaut)
        const startDate = new Date(formData.start);
        const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

        const appointmentData = {
            ...formData,
            start: startDate,
            end: endDate,
        };

        await onSave(appointmentData);
        onClose();
    } catch (err) {
        console.error(err);
        alert("Erreur lors de la sauvegarde");
    } finally {
        setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1100,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
          background: 'white', width: '90%', maxWidth: '600px', borderRadius: '16px',
          maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        {/* Header */}
        <div style={{ padding: '20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#2d3436' }}>
              {initialData?.id ? '✏️ Modifier RDV' : '📅 Nouveau Rendez-vous'}
          </h2>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
          
          {/* Section 1: Qui & Quand */}
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: '#b2bec3', margin: '0 0 10px 0', letterSpacing: '1px' }}>
                Info Contact
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
               <input 
                 className="form-input"
                 placeholder="Nom Client" 
                 value={formData.customer.name}
                 onChange={(e) => handleChange('customer', 'name', e.target.value)}
                 required 
                 style={inputStyle}
               />
               <input 
                 className="form-input"
                 placeholder="Téléphone" 
                 value={formData.customer.phone}
                 onChange={(e) => handleChange('customer', 'phone', e.target.value)}
                 required 
                 style={inputStyle}
               />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
               <label style={{ fontSize: '0.9rem', display: 'block', marginBottom: '-10px', color: '#636e72' }}>Date & Heure du RDV</label>
               <input 
                 type="datetime-local" 
                 value={formData.start}
                 onChange={(e) => handleChange('root', 'start', e.target.value)}
                 required 
                 style={inputStyle}
               />
            </div>
          </div>

          {/* Section 2: Logistique (Le Terrain) */}
          <div style={{ marginBottom: '25px', background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: '#b2bec3', margin: '0 0 10px 0', letterSpacing: '1px' }}>
                📍 Accès & Logistique
            </h3>
            <div style={{ marginBottom: '10px' }}>
               <input 
                 placeholder="Adresse complète" 
                 value={formData.customer.address}
                 onChange={(e) => handleChange('customer', 'address', e.target.value)}
                 style={inputStyle} 
               />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
               <input 
                 type="number" 
                 placeholder="Étage" 
                 value={formData.access.floor}
                 onChange={(e) => handleChange('access', 'floor', e.target.value)}
                 style={inputStyle} 
               />
               <input 
                 placeholder="Code Porte" 
                 value={formData.access.digicode}
                 onChange={(e) => handleChange('access', 'digicode', e.target.value)}
                 style={inputStyle} 
               />
               <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={formData.access.elevator}
                    onChange={(e) => handleChange('access', 'elevator', e.target.checked)}
                  />
                  Ascenseur
               </label>
            </div>
          </div>

          {/* Section 3: Radar Technique */}
          <div style={{ marginBottom: '25px' }}>
             <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: '#b2bec3', margin: '0 0 10px 0', letterSpacing: '1px' }}>
                🛠️ Brief Technique
             </h3>
             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '15px' }}>
                {['Porte Blindée', 'Intérieur', 'Mamad', 'Démontage', 'Urgent'].map(tag => (
                   <span 
                    key={tag} 
                    onClick={() => toggleTag(tag)}
                    style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        background: formData.technical.tags?.includes(tag) ? '#0984e3' : '#dfe6e9',
                        color: formData.technical.tags?.includes(tag) ? 'white' : '#636e72',
                        transition: 'all 0.2s'
                    }}
                   >
                       {tag}
                   </span>
                ))}
            </div>
            <textarea 
              placeholder="Notes techniques (ex: Linteau bas, porte très large...)"
              rows={3}
              value={formData.technical.notes}
              onChange={(e) => handleChange('technical', 'notes', e.target.value)}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
             {/* Delete Button - Only in Edit Mode */}
             {initialData?.id && (
                 <button 
                    type="button" 
                    onClick={() => {
                        if(window.confirm('Voulez-vous vraiment supprimer ce RDV ?')) {
                            onSave({ ...formData, id: initialData.id }, true); // true param means delete
                            onClose();
                        }
                    }}
                    style={{ flex: 0.5, padding: '12px', borderRadius: '8px', border: 'none', background: '#e74c3c', color: 'white', cursor: 'pointer', fontSize: '1.2rem' }}
                    title="Supprimer le RDV"
                 >
                     🗑️
                 </button>
             )}

             <button 
                type="button" 
                onClick={onClose} 
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #dfe6e9', background: 'white', cursor: 'pointer' }}
             >
                 Annuler
             </button>
             <button 
                type="submit" 
                disabled={loading}
                style={{ 
                    flex: 2, padding: '12px', borderRadius: '8px', border: 'none', 
                    background: 'linear-gradient(135deg, #00b894 0%, #00cec9 100%)', 
                    color: 'white', fontWeight: 'bold', cursor: loading ? 'wait' : 'pointer',
                    boxShadow: '0 4px 6px rgba(0, 184, 148, 0.2)'
                }}
             >
                 {loading ? 'Validation...' : '✅ Valider le RDV'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #dfe6e9',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border 0.2s',
};
