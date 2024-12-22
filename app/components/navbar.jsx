import React from "react";
import styles from "../styles/Navbar.module.css";

import logo from "../assets/Ui/ArvieKGamesLogoFull.png";

const socials = [
  {
    id: 1,
    icon: "https://cdn-icons-png.flaticon.com/128/174/174848.png",
    link: "https://www.facebook.com/",
  },
  {
    id: 2,
    icon: "https://cdn-icons-png.flaticon.com/128/174/174876.png",
    link: "https://twitter.com/",
  },
  {
    id: 3,
    icon: "https://cdn-icons-png.flaticon.com/128/174/174855.png",
    link: "https://www.instagram.com/",
  },
  {
    id: 4,
    icon: "https://cdn-icons-png.flaticon.com/128/174/174883.png",
    link: "https://www.youtube.com/",
  },
];

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
        <div className={styles.container}>
            <div className={styles.topContent}>
                <div className={styles.icon}>
                    <img src="/icons/search.png" alt="Search" className={styles.img} />
                </div>
                <div className={styles.logo}>
                    <img src={logo.src} alt="Arvie K Games" className={styles.img} />
                </div>
                <div className={styles.icon}>
                    <img src="/icons/home.png" alt="Home" className={styles.img} />
                </div>
            </div>
        </div>
    </nav>
  );
};

export default Navbar;
