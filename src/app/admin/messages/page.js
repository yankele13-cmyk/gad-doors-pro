'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { getMessages, deleteMessage, markMessageAsRead } from '@/services/business/messageStore';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all'); // all, unread, read
  const [searchTerm, setSearchTerm] = useState('');

  async function fetchMessages() {
    setIsLoading(true);
    const data = await getMessages();
    setMessages(data);
    setFilteredMessages(data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  // Filtering Logic
  useEffect(() => {
    let result = messages;
    
    // Status Filter
    if (filterStatus === 'unread') {
        result = result.filter(m => !m.is_read);
    } else if (filterStatus === 'read') {
        result = result.filter(m => m.is_read);
    }

    // Search Filter
    if (searchTerm) {
        const lowerTerm = searchTerm.toLowerCase();
        result = result.filter(m => 
            m.name.toLowerCase().includes(lowerTerm) || 
            m.email.toLowerCase().includes(lowerTerm) ||
            m.message.toLowerCase().includes(lowerTerm)
        );
    }
    
    setFilteredMessages(result);
  }, [filterStatus, searchTerm, messages]);

  const handleDelete = async (id) => {
    if (confirm('Voulez-vous vraiment supprimer ce message ?')) {
      await deleteMessage(id);
      const newMessages = messages.filter(m => m.id !== id);
      setMessages(newMessages);
    }
  };

  const handleMarkAsRead = async (id) => {
    await markMessageAsRead(id);
    const newMessages = messages.map(m => m.id === id ? { ...m, is_read: true } : m);
    setMessages(newMessages);
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
      
      {/* Search & Filters */}
      <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '16px', 
          marginBottom: '20px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          alignItems: 'center',
          justifyContent: 'space-between'
      }}>
        {/* Status Tabs */}
        <div style={{ display: 'flex', gap: '5px', background: '#f1f2f6', padding: '5px', borderRadius: '10px' }}>
            {['all', 'unread', 'read'].map(status => (
                <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    style={{
                        padding: '8px 16px',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        background: filterStatus === status ? 'white' : 'transparent',
                        color: filterStatus === status ? '#2d3436' : '#636e72',
                        fontWeight: filterStatus === status ? 600 : 400,
                        boxShadow: filterStatus === status ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                        transition: 'all 0.2s',
                        textTransform: 'capitalize'
                    }}
                >
                    {status === 'all' ? 'Tous' : status === 'unread' ? 'Non lus' : 'Lus'}
                </button>
            ))}
        </div>

        {/* Search */}
        <div style={{ position: 'relative', flex: 1, maxWidth: '300px' }}>
            <i className="fas fa-search" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#b2bec3' }}></i>
            <input 
                type="text" 
                placeholder="Rechercher un message..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    width: '100%',
                    padding: '10px 15px 10px 40px',
                    border: '1px solid #dfe6e9',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    outline: 'none',
                    color: '#2d3436'
                }}
            />
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
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
          vertical-align: top;
          color: #2d3436;
          font-size: 0.95rem;
        }
        .admin-table tr:hover {
            background-color: #fafbfc;
        }
        .btn-icon {
            width: 32px;
            height: 32px;
            border-radius: 8px;
            border: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;
            margin-left: 8px;
        }
        .btn-icon:hover {
            transform: translateY(-2px);
        }
        @media (max-width: 768px) {
            .table-container {
                overflow-x: auto;
            }
        }
      `}</style>
        {isLoading ? (
            <div style={{ padding: '40px', textAlign: 'center' }}>Chargement...</div>
        ) : filteredMessages.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', color: '#e0e0e0', marginBottom: '20px' }}>
                <i className="fas fa-inbox"></i>
            </div>
            <h3 style={{ color: '#2d3436' }}>Aucun message trouvé</h3>
            <p style={{ color: '#636e72' }}>Modifier vos filtres ou attendez de nouveaux leads.</p>
          </div>
        ) : (
          <div className="table-container">
          <table className="admin-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Client</th>
                    <th>Contact</th>
                    <th style={{width: '40%'}}>Message</th>
                    <th style={{textAlign: 'right'}}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {filteredMessages.map((msg) => (
                    <tr 
                        key={msg.id} 
                        style={{ 
                            background: msg.is_read ? 'white' : '#fff8e1',
                            transition: 'background 0.2s'
                        }}
                    >
                        <td style={{ whiteSpace: 'nowrap', fontSize: '0.9rem', color: '#636e72' }}>
                            {formatDate(msg.created_at)}
                            {!msg.is_read && <div style={{ marginTop: '5px', display: 'inline-block', background: '#e17055', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700 }}>NOUVEAU</div>}
                        </td>
                        <td style={{ fontWeight: 600 }}>
                            {msg.name}
                        </td>
                        <td style={{ fontSize: '0.9rem' }}>
                            <div style={{ marginBottom: '6px' }}><i className="fas fa-envelope" style={{width: '20px', color: '#b2bec3'}}></i> {msg.email}</div>
                            <div><i className="fas fa-phone" style={{width: '20px', color: '#b2bec3'}}></i> {msg.phone}</div>
                        </td>
                        <td style={{ color: '#636e72', lineHeight: '1.6' }}>
                            {msg.message}
                        </td>
                        <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                            {!msg.is_read && (
                                <button 
                                    onClick={() => handleMarkAsRead(msg.id)}
                                    title="Marquer comme lu"
                                    className="btn-icon"
                                    style={{ background: '#e1705515', color: '#e17055' }}
                                >
                                    <i className="fas fa-check"></i>
                                </button>
                            )}
                            <button 
                                onClick={() => handleDelete(msg.id)}
                                title="Supprimer"
                                className="btn-icon"
                                style={{ background: '#ff767515', color: '#ff7675' }}
                            >
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
