'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/config/siteConfig';
import { showToast } from '@/components/Toast';

export default function ContactPage() {
  const { t, language } = useLanguage();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telephone: '',
    message: '',
    honeypot: '', // Anti-spam field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setStatusMessage(data.message);
        showToast(data.message || 'Message envoyé avec succès !', 'success');
        // Reset form
        setFormData({ name: '', email: '', telephone: '', message: '', honeypot: '' });
      } else {
        setSubmitStatus('error');
        setStatusMessage(data.error || 'Une erreur est survenue');
        showToast(data.error || 'Une erreur est survenue', 'error');
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage('Erreur de connexion. Veuillez réessayer.');
      showToast('Erreur de connexion. Veuillez réessayer.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <section className="section-padding" style={{ paddingTop: '120px' }}>
        <div className="container">
          <h1 className="text-center">{t('contact_title')}</h1>
          <p className="text-center" style={{ marginBottom: '50px' }}>
            {t('contact_subtitle')}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '50px',
              maxWidth: '1000px',
              margin: '0 auto',
            }}
          >
            {/* Contact Info */}
            <div>
              <div style={{ marginBottom: '30px' }}>
                <h3>
                  <i
                    className="fas fa-map-marker-alt"
                    style={{
                      color: 'var(--accent-color)',
                      marginRight: '10px',
                    }}
                  ></i>{' '}
                  {t('contact_address')}
                </h3>
                <p dir={language === 'he' ? 'rtl' : 'ltr'}>
                  {language === 'he'
                    ? siteConfig.contact.addressHe
                    : siteConfig.contact.address}
                </p>
              </div>
              <div style={{ marginBottom: '30px' }}>
                <h3>
                  <i
                    className="fas fa-phone"
                    style={{
                      color: 'var(--accent-color)',
                      marginRight: '10px',
                    }}
                  ></i>{' '}
                  {t('contact_phone')}
                </h3>
                <p>
                  <span dir="ltr">{siteConfig.contact.phoneDisplay}</span>
                </p>
              </div>
              <div style={{ marginBottom: '30px' }}>
                <h3>
                  <i
                    className="fas fa-envelope"
                    style={{
                      color: 'var(--accent-color)',
                      marginRight: '10px',
                    }}
                  ></i>{' '}
                  {t('contact_email')}
                </h3>
                <p>{siteConfig.contact.email}</p>
              </div>
              {/* Google Maps - Cliquable */}
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=115+Aharon+Eshkoli+Street,+Jerusalem,+Israel"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  width: '100%',
                  height: '300px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  marginTop: '20px',
                  position: 'relative',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.6894422384245!2d35.19889!3d31.78622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDQ3JzEwLjQiTiAzNcKwMTEnNTYuMCJF!5e0!3m2!1sen!2sil!4v1234567890!5m2!1sen!2sil&q=115+Aharon+Eshkoli+Street,+Jerusalem"
                  width="100%"
                  height="300"
                  style={{ border: 0, pointerEvents: 'none' }}
                  loading="lazy"
                  title="Google Maps - Gad-Doors Location"
                ></iframe>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--accent-color)',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '25px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <i className="fas fa-directions"></i>
                  {language === 'he'
                    ? 'פתח בגוגל מפות'
                    : 'Ouvrir dans Google Maps'}
                </div>
              </a>
            </div>

            {/* Contact Form */}
            <form
              onSubmit={handleSubmit}
              style={{
                background: 'var(--bg-surface)',
                padding: '40px',
                borderRadius: '10px',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              {/* Honeypot - Hidden field for spam protection */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                style={{ display: 'none' }}
                tabIndex="-1"
                autoComplete="off"
              />

              <div style={{ marginBottom: '20px' }}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontWeight: 600,
                  }}
                >
                  {t('form_name')} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontWeight: 600,
                  }}
                >
                  {t('form_email')} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontWeight: 600,
                  }}
                >
                  {t('form_phone')} *
                </label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontWeight: 600,
                  }}
                >
                  {t('form_msg')} *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    height: '120px',
                    resize: 'vertical',
                  }}
                ></textarea>
              </div>

              {/* Status Messages */}
              {submitStatus && (
                <div
                  style={{
                    marginBottom: '20px',
                    padding: '12px',
                    borderRadius: '5px',
                    backgroundColor:
                      submitStatus === 'success' ? '#d4edda' : '#f8d7da',
                    color: submitStatus === 'success' ? '#155724' : '#721c24',
                    border: `1px solid ${submitStatus === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
                  }}
                >
                  <i
                    className={`fas ${submitStatus === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}
                    style={{ marginRight: '8px' }}
                  ></i>
                  {statusMessage}
                </div>
              )}

              <button
                type="submit"
                className="btn"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  border: 'none',
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    {language === 'he' ? 'שולח...' : 'Envoi en cours...'}
                  </>
                ) : (
                  <>
                    {language === 'he' ? (
                      // En hébreu: texte à droite, icône à gauche
                      <>
                        {t('form_send')}
                        <i className="fas fa-paper-plane"></i>
                      </>
                    ) : (
                      // En français: icône à gauche, texte à droite
                      <>
                        <i className="fas fa-paper-plane"></i>
                        {t('form_send')}
                      </>
                    )}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
