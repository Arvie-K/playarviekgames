import React from "react";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";

import logo from "../assets/Ui/ArvieKGamesLogoFull.png";

// Updated socials array structure
const socials = [
  { url: "https://www.instagram.com/arvie_k/", icon: "/icons/instagram.png", alt: "Instagram" },
  { url: "https://www.youtube.com/@ArvieKGames", icon: "/icons/youtube.png", alt: "YouTube" },
  { url: "https://arviek.itch.io/", icon: "/icons/itch.png", alt: "Spotify" },
  { url: "https://discord.gg/tJcNcxsREP", icon: "/icons/discord.png", alt: "TikTok" }
];


const Navbar = () => {
  return (
    <nav className={styles.navbar}>
        <div className={styles.container}>
            <div className={styles.topContent}>
                <div className={styles.icon}>
                    <img src="/icons/search.png" alt="Search" className={styles.img} />
                </div>
                <Link href={`/`}>
                  <div className={styles.logo}>
                      <img src={logo.src} alt="Arvie K Games" className={styles.img} />
                  </div>
                </Link>
                  <div className={styles.icon}>
                      <img src="/icons/home.png" alt="Home" className={styles.img} />
                  </div>
            </div>
            {/* Add socials section */}
            <div className={styles.socialsContainer}>
                {socials.map((social) => (
                    <a key={social.url} href={social.url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                        <img src={social.icon} alt={social.alt} className={styles.socialIcon} />
                    </a>
                ))}
            </div>
        </div>
    </nav>
  );
};

export default Navbar;
