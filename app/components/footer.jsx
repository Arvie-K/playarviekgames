import React from 'react';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.mainText}>Games by Arvie K</p>
          <p className={styles.subText}>Website by NatyaCodes</p>
          <p className={styles.copyright}>© 2025 Arvie K</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
