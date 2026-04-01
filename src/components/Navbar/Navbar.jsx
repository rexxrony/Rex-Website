import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

export const Navbar = ({ showLinks = true }) => {
  const { pathname } = useLocation();
  const sectionBase = pathname === '/dev' ? '' : '/dev';

  return (
    <nav className={styles.navbar}>
      <Link className={styles.title} to='/'>{"</"} Rex {">"}</Link>
      {showLinks && (
        <div className={styles.menu}>
          <ul className={styles.menuItem}>
            <li><a href={`${sectionBase}#about`}>About</a></li>
            <li><a href={`${sectionBase}#experience`}>Projects</a></li>
            <li><a href={`${sectionBase}#contact`}>Contact</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
}
