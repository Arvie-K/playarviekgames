import React from 'react';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.mainText}>Website by <a href="https://natya.is-a.dev" target='_blank'>NatyaCodes</a></p>
          <p className={styles.subText}>Games by Arvie K</p>
          <p className={styles.subText}>© 2025 Arvie K</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
