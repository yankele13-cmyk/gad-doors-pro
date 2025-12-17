'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminInstallationsClient from '@/components/admin/AdminInstallationsClient';
import { getInstallations } from '@/lib/installationStore';

export default function AdminInstallationsPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadImages() {
      try {
        const data = await getInstallations();
        setImages(data || []);
      } catch (error) {
        console.error('Failed to load installations:', error);
      } finally {
        setLoading(false);
      }
    }
    loadImages();
  }, []);

  return (
    <AdminLayout title="Gestion des Réalisations">
      {loading ? (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '300px' 
        }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: '#94a3b8' }}></i>
        </div>
      ) : (
        <AdminInstallationsClient initialImages={images} />
      )}
    </AdminLayout>
  );
}
