'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';
import { getProducts } from '@/lib/productStore';
import { getMessages } from '@/lib/messageStore';

// --- StatCard Component ---
// This component is defined outside of the main dashboard component
// to prevent re-creation on every render, which is a core React best practice.
const StatCard = ({ title, value, icon, gradient, link, delay }) => (
  <Link href={link} style={{ textDecoration: 'none' }}>
    <div
      style={{
        background: 'white',
        borderRadius: '16px',
        padding: '30px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        border: '1px solid rgba(0,0,0,0.02)',
        position: 'relative',
        overflow: 'hidden',
        animation: `fadeInUp 0.6s ease-out forwards ${delay}s`,
        opacity: 0,
        transform: 'translateY(20px)',
      }}
      className="stat-card"
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.04)';
      }}
    >
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h3
          style={{
            margin: '0 0 8px 0',
            color: '#636e72',
            fontSize: '0.85rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          {title}
        </h3>
        <div
          style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            color: '#2d3436',
            lineHeight: 1,
          }}
        >
          {value}
        </div>
      </div>
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '20px',
          background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.4rem',
          boxShadow: `0 8px 16px -4px ${gradient[0]}80`,
        }}
      >
        <i className={`fas ${icon}`}></i>
      </div>
      {/* Decorative circle */}
      <div
        style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '100px',
          height: '100px',
          background: `radial-gradient(circle, ${gradient[0]}10 0%, transparent 70%)`,
          borderRadius: '50%',
          opacity: 0.5,
        }}
      />
    </div>
  </Link>
);

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    products: 0,
    doors: 0,
    accessories: 0,
    messages: 0,
  });

  useEffect(() => {
    async function loadStats() {
      const products = await getProducts();
      const messages = await getMessages();
      const unreadMessages = messages.filter((m) => !m.is_read).length;

      setStats({
        products: products.length,
        doors: products.filter((p) => p.category === 'doors').length,
        accessories: products.filter((p) => p.category === 'accessories')
          .length,
        messages: unreadMessages,
      });
    }
    loadStats();
  }, []);

  return (
    <AdminLayout title="Tableau de Bord">
      <style jsx global>{`
        @keyframes fadeInUp {
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 900px) {
            .dashboard-grid {
                    grid-template-columns: 1fr !important;
            }
        }
      `}</style>
      
      {/* Welcome Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, #1e272e 0%, #353b48 100%)',
        borderRadius: '20px',
        padding: '40px 50px',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '40px',
        boxShadow: '0 20px 40px -10px rgba(45, 52, 54, 0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>Bienvenue sur GadDoors<span style={{color: '#eebb99'}}>Pro</span></h2>
          <p style={{ margin: 0, opacity: 0.8, fontSize: '1.1rem' }}>Gérez votre catalogue, suivez vos leads et personnalisez votre site.</p>
        </div>
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', gap: '15px' }}>
             <Link href="/admin/products" className="btn" style={{ 
                 background: 'rgba(255,255,255,0.1)', 
                 backdropFilter: 'blur(10px)',
                 color: 'white', 
                 border: '1px solid rgba(255,255,255,0.2)',
                 padding: '12px 25px',
                 borderRadius: '12px'
            }}>
                <i className="fas fa-box" style={{marginRight: '8px'}}></i> Produits
            </Link>
            <Link href="/" target="_blank" className="btn" style={{ 
                background: '#eebb99', 
                color: '#2d3436', 
                border: 'none',
                padding: '12px 25px',
                borderRadius: '12px',
                fontWeight: 600
            }}>
                Voir le site <i className="fas fa-external-link-alt" style={{marginLeft: '10px'}}></i>
            </Link>
        </div>
        
        {/* Abstract shapes */}
        <div style={{ position: 'absolute', right: '-50px', top: '-50px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(238,187,153,0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', left: '-50px', bottom: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)', borderRadius: '50%' }} />
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
        gap: '24px',
        marginBottom: '40px'
      }}>
        <StatCard 
          title="Total Produits" 
          value={stats.products} 
          icon="fa-cubes" 
          gradient={['#0984e3', '#74b9ff']} 
          link="/admin/products"
          delay={0.1}
        />
        <StatCard 
          title="Portes" 
          value={stats.doors} 
          icon="fa-door-open" 
          gradient={['#e17055', '#fab1a0']} 
          link="/admin/products"
          delay={0.2}
        />
        <StatCard 
          title="Accessoires" 
          value={stats.accessories} 
          icon="fa-tools" 
          gradient={['#6c5ce7', '#a29bfe']} 
          link="/admin/products"
          delay={0.3}
        />
        <StatCard 
          title="Messages Non Lus" 
          value={stats.messages} 
          icon="fa-envelope" 
          gradient={['#00b894', '#55efc4']} 
          link="/admin/messages"
          delay={0.4}
        />
      </div>

      {/* Recent Activity Section */}
      <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '24px'
      }} className="dashboard-grid">
         
         {/* Shortcuts / Quick Actions */}
         <div style={{
             background: 'white',
             borderRadius: '16px',
             padding: '25px',
             boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
             border: '1px solid rgba(0,0,0,0.02)'
         }}>
             <h3 style={{ margin: '0 0 20px 0', color: '#2d3436' }}>Actions Rapides</h3>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                 <Link href="/admin/products" style={{ 
                     background: '#74b9ff15', 
                     padding: '20px', 
                     borderRadius: '12px', 
                     textDecoration: 'none', 
                     color: '#0984e3',
                     display: 'flex',
                     alignItems: 'center',
                     gap: '15px',
                     transition: 'transform 0.2s',
                     fontWeight: 600
                 }}
                 onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                 onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                 >
                     <div style={{ fontSize: '1.5rem' }}><i className="fas fa-plus-circle"></i></div>
                     <div>Gérer les Produits</div>
                 </Link>
                 <Link href="/admin/messages" style={{ 
                     background: '#55efc415', 
                     padding: '20px', 
                     borderRadius: '12px', 
                     textDecoration: 'none', 
                     color: '#00b894',
                     display: 'flex',
                     alignItems: 'center',
                     gap: '15px',
                     transition: 'transform 0.2s',
                     fontWeight: 600
                 }}
                 onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                 onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                 >
                     <div style={{ fontSize: '1.5rem' }}><i className="fas fa-comment-alt"></i></div>
                     <div>Voir les Messages</div>
                 </Link>
             </div>
         </div>

         {/* System Status */}
         <div style={{
             background: 'white',
             borderRadius: '16px',
             padding: '25px',
             boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
             border: '1px solid rgba(0,0,0,0.02)'
         }}>
             <h3 style={{ margin: '0 0 20px 0', color: '#2d3436' }}>État du Système</h3>
             <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                 <li style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f2f6' }}>
                     <span style={{ color: '#636e72' }}>Version Admin</span>
                     <span style={{ fontWeight: 600, color: '#2d3436' }}>v2.0 Pro</span>
                 </li>
                 <li style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f2f6' }}>
                     <span style={{ color: '#636e72' }}>Statut Serveur</span>
                     <span style={{ fontWeight: 600, color: '#00b894' }}><i className="fas fa-check-circle"></i> En ligne</span>
                 </li>
                 <li style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
                     <span style={{ color: '#636e72' }}>Dernière Synchro Google</span>
                     <span style={{ fontWeight: 600, color: '#636e72' }}>-</span>
                 </li>
             </ul>
         </div>

      </div>
    </AdminLayout>
  );
}
