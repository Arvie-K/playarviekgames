import React from 'react';
import styles from '../styles/Navbar.module.css';

import searchIcon from "../assets/Ui/search.png"
import homeIcon from "../assets/Ui/home.png"
import logo from "../assets/Ui/ArvieKGamesLogoFull.png"

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.content}>
        <div className={styles.icon}>
          <img src={searchIcon.src} alt="Search" className={styles.img}/>
        </div>

        <div className={styles.logo}>
          <img src={logo.src} alt="Arvie K Games" className={styles.img} />
        </div>

        <div className={styles.icon}>
          <img src={homeIcon.src} alt="Home" className={styles.img} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
