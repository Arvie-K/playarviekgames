import React from 'react';
import styles from '../styles/Navbar.module.css';

import searchIcon from "../assets/Ui/search.png"
import homeIcon from "../assets/Ui/home.png"
import logo from "../assets/Ui/ArvieKGamesLogoFull.png"

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      {/* Search Icon */}
      <div className={styles.icon}>
        <img src={searchIcon.src} alt="Search" />
      </div>

      {/* Logo */}
      <div className={styles.logo}>
        <img src={logo.src} alt="Arvie K Games" />
      </div>

      {/* Home Icon */}
      <div className={styles.icon}>
        <img src={homeIcon.src} alt="Home" />
      </div>
    </nav>
  );
};

export default Navbar;
