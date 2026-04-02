import React, { useCallback, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

export const Navbar = ({ showLinks = true }) => {
  const { pathname } = useLocation();
  const sectionBase = pathname === '/dev' ? '' : '/dev';
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navLinks = useMemo(
    () => [
      { label: 'About', href: `${sectionBase}#about` },
      { label: 'Projects', href: `${sectionBase}#experience` },
      { label: 'Contact', href: `${sectionBase}#contact` },
    ],
    [sectionBase]
  );

  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);
  const handleDrawerLinkClick = useCallback(
    (href) => (event) => {
      event.preventDefault();
      closeDrawer();
      if (typeof document !== 'undefined') {
        const hashIndex = href.indexOf('#');
        if (hashIndex >= 0) {
          const targetId = href.slice(hashIndex + 1);
          const target = document.getElementById(targetId);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
          }
        }
      }
      window.location.href = href;
    },
    [closeDrawer]
  );

  return (
    <nav className={styles.navbar}>
      <Link className={styles.title} to='/'>{"</"} Rex {">"}</Link>
      {showLinks && (
        <>
          <div className={styles.menu}>
            <ul className={styles.menuItem}>
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <button
            className={`${styles.hamburger} ${isDrawerOpen ? styles.hamburgerOpen : ''}`}
            aria-label={isDrawerOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isDrawerOpen}
            onClick={() => setIsDrawerOpen((prev) => !prev)}
            type='button'
          >
            <span />
            <span />
            <span />
          </button>
          <div className={`${styles.drawer} ${isDrawerOpen ? styles.drawerVisible : ''}`}>
            <ul>
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={handleDrawerLinkClick(link.href)}
                    aria-label={`Go to ${link.label}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div
            className={`${styles.backdrop} ${isDrawerOpen ? styles.backdropVisible : ''}`}
            onClick={closeDrawer}
            role='presentation'
          />
        </>
      )}
    </nav>
  );
}
