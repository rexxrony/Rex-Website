import React, {useState} from 'react';
import styles from './Navbar.module.css';


export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <a className={styles.title} href='/'>{"</"} Rex {">"}</a>
      <div className={styles.menu}>
        <ul className={styles.menuItem}>
          <li><a href='#about'>About</a></li>
          <li><a href='#experience'>Projects</a></li>
          <li><a href='#contact'>Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}