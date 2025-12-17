'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => pathname === path;

  return (
    <header>
      <Link href="/" className="logo">
        <Image
          src="/images/logo.png"
          alt="GadDoors Logo"
          width={180}
          height={52}
          priority
        />
      </Link>

      <div className="mobile-toggle" onClick={toggleMenu}>
        <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </div>

      <nav>
        <ul className={isMenuOpen ? 'active' : ''}>
          <li>
            <Link href="/" className={isActive('/') ? 'active' : ''} onClick={closeMenu}>
              {t('nav_home')}
            </Link>
          </li>
          <li>
            <Link href="/about" className={isActive('/about') ? 'active' : ''} onClick={closeMenu}>
              {t('nav_about')}
            </Link>
          </li>
          <li>
            <Link href="/products-range" className={isActive('/products-range') ? 'active' : ''} onClick={closeMenu}>
              {t('nav_ranges')}
            </Link>
          </li>
          <li>
            <Link href="/services" className={isActive('/services') ? 'active' : ''} onClick={closeMenu}>
              {t('nav_services')}
            </Link>
          </li>
          <li>
            <Link href="/installations" className={isActive('/installations') ? 'active' : ''} onClick={closeMenu}>
              {t('nav_installations')}
            </Link>
          </li>
          <li>
            <Link href="/doors" className={isActive('/doors') ? 'active' : ''} onClick={closeMenu}>
              {t('nav_doors')}
            </Link>
          </li>
          <li>
            <Link
              href="/accessories"
              className={isActive('/accessories') ? 'active' : ''}
              onClick={closeMenu}
            >
              {t('nav_accessories')}
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={isActive('/contact') ? 'active' : ''}
              onClick={closeMenu}
            >
              {t('nav_contact')}
            </Link>
          </li>
          <li>
            <button
              className="language-switcher"
              onClick={toggleLanguage}
              aria-label="Changer de langue"
            >
              <span className={language === 'fr' ? 'active' : ''}>FR</span>
              <span className={language === 'he' ? 'active' : ''}>עב</span>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
