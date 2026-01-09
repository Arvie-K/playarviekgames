import React from "react";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";

import logo from "../assets/Ui/Arvie_K_Games_Nameplate.png";

// Updated socials array structure
const socials = [
  { url: "https://www.youtube.com/@ArvieK", icon: "/icons/youtube.png", alt: "YouTube" },
  { url: "https://arviek.itch.io/", icon: "/icons/itch.png", alt: "Itch.io" },
  { url: "https://discord.gg/tJcNcxsREP", icon: "/icons/discord.png", alt: "Discord" },
  { url: "https://www.tiktok.com/@arvie_k", icon: "/icons/tiktok.png", alt: "TikTok" },
];


const Navbar = () => {
  return (
    <nav className={styles.navbar}>
        <div className={styles.container}>
            <div className={styles.topContent}>
                <Link href={`/`}>
                  <div className={styles.logo}>
                      <img src={logo.src} alt="Arvie K Games" className={styles.img} />
                  </div>
                </Link>
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
