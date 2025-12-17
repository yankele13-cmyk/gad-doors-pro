'use client';

import { useState, useEffect } from 'react';
import { getAppointments } from '@/services/business/appointmentStore';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import addDays from 'date-fns/addDays';
import fr from 'date-fns/locale/fr';

export default function TechnicianAgenda() {
    const [appointments, setAppointments] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await getAppointments();
            setAppointments(data);
        } finally {
            setLoading(false);
        }
    };

    const dailyAppointments = appointments.filter(app => 
        isSameDay(app.start, currentDate)
    ).sort((a, b) => a.start - b.start);

    const openWaze = (address) => {
        // Waze Deep Link
        const url = `https://waze.com/ul?q=${encodeURIComponent(address)}`;
        window.open(url, '_blank');
    };

    const callCustomer = (phone) => {
        window.open(`tel:${phone}`);
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', background: '#f8f9fa', minHeight: '80vh', paddingBottom: '80px' }}>
            
            {/* Header Date Navigation */}
            <div style={{ 
                background: 'white', padding: '15px', position: 'sticky', top: 0, zIndex: 10,
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}>
                <button onClick={() => setCurrentDate(d => addDays(d, -1))} style={navBtnStyle}>
                   <i className="fas fa-chevron-left"></i>
                </button>
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '1.2rem', margin: 0, textTransform: 'capitalize' }}>
                        {format(currentDate, 'EEEE d MMMM', { locale: fr })}
                    </h2>
                    <span style={{ fontSize: '0.9rem', color: '#636e72' }}>
                        {dailyAppointments.length} Missions
                    </span>
                </div>
                <button onClick={() => setCurrentDate(d => addDays(d, 1))} style={navBtnStyle}>
                   <i className="fas fa-chevron-right"></i>
                </button>
            </div>

            {/* List */}
            <div style={{ padding: '15px' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#b2bec3' }}>Chargement...</div>
                ) : dailyAppointments.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#b2bec3' }}>
                        <i className="fas fa-coffee" style={{ fontSize: '2rem', marginBottom: '10px' }}></i>
                        <p>Aucun RDV pour ce jour.</p>
                    </div>
                ) : (
                    dailyAppointments.map(app => (
                        <div key={app.id} style={cardStyle}>
                            {/* Time Strip */}
                            <div style={{ 
                                background: '#0984e3', color: 'white', padding: '10px', 
                                borderTopLeftRadius: '12px', borderTopRightRadius: '12px',
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                            }}>
                                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                                    {format(app.start, 'HH:mm')}
                                </span>
                                <span style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                                    {app.technical?.tags?.[0] || 'Visite'}
                                </span>
                            </div>

                            <div style={{ padding: '15px' }}>
                                {/* Customer Info */}
                                <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>{app.customer.name}</h3>
                                <p style={{ margin: '0 0 15px 0', color: '#636e72', fontSize: '0.95rem' }}>
                                    <i className="fas fa-map-marker-alt" style={{ marginRight: '8px', color: '#e17055' }}></i>
                                    {app.customer.city}
                                </p>

                                {/* Action Buttons (BIG for Mobile) */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
                                    <button onClick={() => openWaze(app.customer.address || app.customer.city)} style={actionBtnStyle('#2ecc71')}>
                                        <i className="fab fa-waze" style={{ fontSize: '1.2rem' }}></i> Waze
                                    </button>
                                    <button onClick={() => callCustomer(app.customer.phone)} style={actionBtnStyle('#3498db')}>
                                        <i className="fas fa-phone" style={{ fontSize: '1rem' }}></i> Appeler
                                    </button>
                                </div>

                                {/* Logistics Details */}
                                <div style={{ background: '#f1f2f6', padding: '10px', borderRadius: '8px', fontSize: '0.9rem', color: '#2d3436' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                        <span>🚪 Étage: <strong>{app.access?.floor || 'RDC'}</strong></span>
                                        <span>🔑 Code: <strong>{app.access?.digicode || '-'}</strong></span>
                                    </div>
                                    <div style={{ fontStyle: 'italic', marginTop: '5px', color: '#636e72' }}>
                                        {app.technical?.notes ? `"${app.technical.notes}"` : "Pas de notes techniques."}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

const navBtnStyle = {
    background: 'transparent', border: 'none', fontSize: '1.2rem', padding: '10px', cursor: 'pointer', color: '#2d3436'
};

const cardStyle = {
    background: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '20px'
};

const actionBtnStyle = (color) => ({
    background: color, color: 'white', border: 'none', padding: '12px', borderRadius: '8px',
    fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
});
