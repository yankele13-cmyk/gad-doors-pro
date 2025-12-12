'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';
import { getProducts } from '@/lib/productStore';
import { getMessages } from '@/lib/messageStore';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    products: 0,
    doors: 0,
    accessories: 0,
    messages: 0 
  });

  useEffect(() => {
    async function loadStats() {
      const products = await getProducts();
      const messages = await getMessages();
      const unreadMessages = messages.filter(m => !m.is_read).length;
      
      setStats({
        products: products.length,
        doors: products.filter(p => p.category === 'doors').length,
        accessories: products.filter(p => p.category === 'accessories').length,
        messages: unreadMessages 
      });
    }
    loadStats();
  }, []);

  const StatCard = ({ title, value, icon, color, link }) => (
    <Link href={link} style={{ textDecoration: 'none' }}>
      <div style={{
        background: 'white',
        borderRadius: '10px',
        padding: '25px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'transform 0.2s ease',
        cursor: 'pointer'
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      >
        <div>
          <h3 style={{ margin: '0 0 10px 0', color: '#888', fontSize: '0.9rem', textTransform: 'uppercase' }}>{title}</h3>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#2d3436' }}>{value}</div>
        </div>
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: `${color}20`,
          color: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem'
        }}>
          <i className={`fas ${icon}`}></i>
        </div>
      </div>
    </Link>
  );

  return (
    <AdminLayout title="Tableau de Bord">
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '20px',
        marginBottom: '40px'
      }}>
        <StatCard 
          title="Total Produits" 
          value={stats.products} 
          icon="fa-box" 
          color="#3498db" 
          link="/admin/products"
        />
        <StatCard 
          title="Portes" 
          value={stats.doors} 
          icon="fa-door-open" 
          color="#e67e22" 
          link="/admin/products"
        />
        <StatCard 
          title="Accessoires" 
          value={stats.accessories} 
          icon="fa-tools" 
          color="#9b59b6" 
          link="/admin/products"
        />
        <StatCard 
          title="Messages (Beta)" 
          value={stats.messages} 
          icon="fa-envelope" 
          color="#2ecc71" 
          link="/admin/messages"
        />
      </div>

      <div style={{ 
        background: 'linear-gradient(135deg, var(--accent-color) 0%, #2d3436 100%)',
        borderRadius: '15px',
        padding: '40px',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <h2 style={{ margin: '0 0 10px 0' }}>Bienvenue sur votre espace Pro</h2>
          <p style={{ margin: 0, opacity: 0.9 }}>Gérez votre catalogue et vos clients en toute simplicité.</p>
        </div>
        <Link href="/" target="_blank" className="btn" style={{ background: 'white', color: 'var(--accent-color)', border: 'none' }}>
            Voir le site en live <i className="fas fa-arrow-right" style={{marginLeft: '10px'}}></i>
        </Link>
      </div>
    </AdminLayout>
  );
}
