'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { getMessages, deleteMessage, markMessageAsRead } from '@/lib/messageStore';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchMessages() {
    setIsLoading(true);
    const data = await getMessages();
    setMessages(data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Voulez-vous vraiment supprimer ce message ?')) {
      await deleteMessage(id);
      setMessages(messages.filter(m => m.id !== id));
    }
  };

  const handleMarkAsRead = async (id) => {
    await markMessageAsRead(id);
    setMessages(messages.map(m => m.id === id ? { ...m, is_read: true } : m));
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AdminLayout title="Messages & Leads">
      <div style={{ background: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        
        {isLoading ? (
            <div style={{ padding: '40px', textAlign: 'center' }}>Chargement...</div>
        ) : messages.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', color: '#e0e0e0', marginBottom: '20px' }}>
                <i className="fas fa-inbox"></i>
            </div>
            <h3 style={{ color: '#2d3436' }}>Aucun message</h3>
            <p style={{ color: '#636e72' }}>Votre boîte de réception est vide.</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f8f9fa', borderBottom: '1px solid #eee' }}>
                <tr>
                    <th style={{ padding: '15px 20px', textAlign: 'left', fontWeight: 600, color: '#636e72', fontSize: '0.9rem' }}>Date</th>
                    <th style={{ padding: '15px 20px', textAlign: 'left', fontWeight: 600, color: '#636e72', fontSize: '0.9rem' }}>Client</th>
                    <th style={{ padding: '15px 20px', textAlign: 'left', fontWeight: 600, color: '#636e72', fontSize: '0.9rem' }}>Contact</th>
                    <th style={{ padding: '15px 20px', textAlign: 'left', fontWeight: 600, color: '#636e72', fontSize: '0.9rem' }}>Message</th>
                    <th style={{ padding: '15px 20px', textAlign: 'right', fontWeight: 600, color: '#636e72', fontSize: '0.9rem' }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {messages.map((msg) => (
                    <tr 
                        key={msg.id} 
                        style={{ 
                            borderBottom: '1px solid #eee', 
                            background: msg.is_read ? 'white' : '#fff8e1',
                            transition: 'background 0.2s'
                        }}
                    >
                        <td style={{ padding: '15px 20px', fontSize: '0.9rem', color: '#636e72', whiteSpace: 'nowrap' }}>
                            {formatDate(msg.created_at)}
                            {!msg.is_read && <span style={{ marginLeft: '10px', background: '#3498db', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem' }}>NOUVEAU</span>}
                        </td>
                        <td style={{ padding: '15px 20px', fontWeight: 600, color: '#2d3436' }}>
                            {msg.name}
                        </td>
                        <td style={{ padding: '15px 20px', fontSize: '0.9rem' }}>
                            <div style={{ marginBottom: '4px' }}><i className="fas fa-envelope" style={{width: '20px', color: '#b2bec3'}}></i> {msg.email}</div>
                            <div><i className="fas fa-phone" style={{width: '20px', color: '#b2bec3'}}></i> {msg.phone}</div>
                        </td>
                        <td style={{ padding: '15px 20px', color: '#636e72', maxWidth: '400px', lineHeight: '1.5' }}>
                            {msg.message}
                        </td>
                        <td style={{ padding: '15px 20px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                            {!msg.is_read && (
                                <button 
                                    onClick={() => handleMarkAsRead(msg.id)}
                                    title="Marquer comme lu"
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3498db', fontSize: '1.1rem', marginRight: '15px' }}
                                >
                                    <i className="fas fa-check-circle"></i>
                                </button>
                            )}
                            <button 
                                onClick={() => handleDelete(msg.id)}
                                title="Supprimer"
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff7675', fontSize: '1.1rem' }}
                            >
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
