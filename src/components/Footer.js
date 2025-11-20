"use client";

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/config/siteConfig';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-col">
            <h4>Gad<span style={{ color: 'var(--accent-color)' }}>Doors</span></h4>
            <p>{t('footer_desc')}</p>
          </div>
          <div className="footer-col">
            <h4>{t('footer_links')}</h4>
            <ul>
              <li><Link href="/">{t('nav_home')}</Link></li>
              <li><Link href="/doors">{t('nav_doors')}</Link></li>
              <li><Link href="/accessories">{t('nav_accessories')}</Link></li>
              <li><Link href="/contact">{t('nav_contact')}</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{t('footer_contact')}</h4>
            <ul>
              <li><i className="fas fa-phone"></i> <span dir="ltr">{siteConfig.contact.phoneDisplay}</span></li>
              <li><i className="fas fa-envelope"></i> {siteConfig.contact.email}</li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} GadDoors. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
