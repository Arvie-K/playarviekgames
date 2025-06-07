'use client'

import { useState, useEffect } from "react";
import Game from "../components/game";
import styles from '../styles/GamePage.module.css';
import { useRouter } from 'next/navigation';

export default function GameClient({ game, slug, allGames }) {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showNsfwModal, setShowNsfwModal] = useState(false);
    const router = useRouter();

    // Load Google Ads script
    useEffect(() => {
        const scriptId = 'google-ads-script';
        if (document.getElementById(scriptId)) {
            // Script already loaded or loading
            return;
        }
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID'; // Replace with your client ID
        script.async = true;
        script.crossOrigin = 'anonymous';
        document.body.appendChild(script);
    }, []);

    // Push ad request after component mounts/updates
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense error:", e);
        }
    }, [game]);

    // Check if game is NSFW when component mounts
    useEffect(() => {
        if (game && game.nsfw === true) {
            setShowNsfwModal(true);
        }
    }, [game]);

    // Handle user choosing to continue despite NSFW warning
    const handleContinue = () => {
        setShowNsfwModal(false);
    };

    // Handle user choosing to go back to home page
    const handleGoBack = () => {
        router.push('/');
    };

    // NSFW Warning Modal Component
    const NsfwWarningModal = () => {
        if (!showNsfwModal) return null;

        return (
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <h2>Adult Content Warning</h2>
                    <p>This game contains content that is not suitable for users under 18 years old.</p>
                    <p>Please confirm that you are over 18 years of age to continue.</p>
                    <div className={styles.modalButtons}>
                        <button 
                            className={`${styles.modalButton} ${styles.continueButton}`} 
                            onClick={handleContinue}
                        >
                            I am 18+ Continue
                        </button>
                        <button 
                            className={`${styles.modalButton} ${styles.backButton}`} 
                            onClick={handleGoBack}
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    function fullScreen() {
        const elem = document.querySelector('#game');
        if (!elem) return;

        setIsFullScreen(true);

        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }

        document.addEventListener('fullscreenchange', handleFullscreenExit);
        document.addEventListener('webkitfullscreenchange', handleFullscreenExit);
        document.addEventListener('mozfullscreenchange', handleFullscreenExit);
        document.addEventListener('MSFullscreenChange', handleFullscreenExit);
    }

    function handleFullscreenExit() {
        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            setIsFullScreen(false);
            document.removeEventListener('fullscreenchange', handleFullscreenExit);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenExit);
            document.removeEventListener('mozfullscreenchange', handleFullscreenExit);
            document.removeEventListener('MSFullscreenChange', handleFullscreenExit);
        }
    }

    function share() {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            const notification = document.createElement('div');
            notification.style.position = 'fixed';
            notification.style.bottom = '20px';
            notification.style.left = '50%';
            notification.style.transform = 'translateX(-50%)';
            notification.style.backgroundColor = 'rgba(0, 118, 168, 0.9)';
            notification.style.color = 'white';
            notification.style.padding = '10px 20px';
            notification.style.borderRadius = '4px';
            notification.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
            notification.style.zIndex = '1000';
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s ease';
            notification.textContent = 'Link copied to clipboard!';

            document.body.appendChild(notification);

            requestAnimationFrame(() => {
                notification.style.opacity = '1';
            });

            setTimeout(() => {
                notification.style.opacity = '0';
                notification.addEventListener('transitionend', () => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, { once: true });
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }

    function formatDate(dateString) {
        if (!dateString) return null;
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        try {
            return new Date(dateString).toLocaleDateString(undefined, options);
        } catch (e) {
            console.error("Error formatting date:", e);
            return dateString; // Return original string if formatting fails
        }
    }

    return (
        <div className={styles.layout}>
            {/* NSFW Warning Modal */}
            <NsfwWarningModal />
            
            <div className={styles.ads}>
                {/* Google AdSense Ad Unit */}
                {/* Replace ca-pub-YOUR_PUBLISHER_ID with your Publisher ID */}
                {/* Replace YOUR_AD_SLOT_ID with your Ad Unit ID */}
                <ins className="adsbygoogle"
                    style={{ display: 'block', width: '160px', height: '600px' }} // Adjust size as needed
                    data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
                    data-ad-slot="YOUR_AD_SLOT_ID"
                    data-ad-format="auto"
                    data-full-width-responsive="false"></ins>
            </div>
            <div className={styles.gameframe}>
                <div className={styles.box}>
                    <iframe
                        id="game"
                        className={styles.game}
                        srcDoc={`<form action='${game.url}' style="display: flex; justify-content: center; align-items: center; height: 90vh; margin: 0; background-color: #000;">
                            <input type="submit" value="" style="padding: 10px 20px; font-size: 16px; cursor: pointer; background: url('/icons/PlayButton.png') no-repeat center; background-size: contain; border: none; width: 100px; height: 100px; transition: transform 0.3s ease; filter: drop-shadow(0 0 10px rgba(0, 118, 168, 0.5));" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'" />
                        </form>`}
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className={styles.bar}>
                    <div className={styles.title}>
                        <h3 style={{ color: "#000000" }}>{game.name}</h3>
                        <h6 style={{ color: "#555555" }}>By Arvie K</h6>
                    </div>
                    <div className={styles.actions}>
                        <img className={styles.barIcon} src="/icons/share.png" alt="Share" onClick={share} title="Copy Link" />
                        <img className={styles.barIcon} src="/icons/full.png" alt="Fullscreen" onClick={fullScreen} title="Fullscreen" />
                    </div>
                </div>
                <div className={styles.bottomSection}>
                    {game.devlog && (
                        <div className={styles.devlog}>
                            <iframe
                                src={`https://www.youtube.com/embed/${game.devlog}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                    <div className={styles.description}>
                        {game.description && (
                            <div className={styles.descriptionSection}>
                                <h4 className={styles.descriptionTitle}>Description</h4>
                                <p className={styles.descriptionContent}>{game.description}</p>
                            </div>
                        )}
                        {game.controls && (
                            <div className={styles.descriptionSection}>
                                <h4 className={styles.descriptionTitle}>Controls</h4>
                                <p className={styles.descriptionContent}>{game.controls}</p>
                            </div>
                        )}
                        {(game.release_date || game.last_updated) && (
                            <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}> {/* Container for dates */}
                                {game.release_date && (
                                    <div className={styles.descriptionSection}>
                                        <h4 className={styles.descriptionTitle} style={{ fontSize: '0.8em' }}>Released</h4>
                                        <p className={styles.descriptionContent} style={{ fontSize: '0.7em' }}>{formatDate(game.release_date)}</p>
                                    </div>
                                )}
                                {game.last_updated && (
                                    <div className={styles.descriptionSection}>
                                        <h4 className={styles.descriptionTitle} style={{ fontSize: '0.8em' }}>Last Updated</h4>
                                        <p className={styles.descriptionContent} style={{ fontSize: '0.7em' }}>{formatDate(game.last_updated)}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Credits Section */}
                {game.credits && game.credits.length > 0 && (
                    <div className={styles.creditsSection}>
                        <h4 className={styles.creditsTitle}>Credits</h4>
                        <ul className={styles.creditsList}>
                            {game.credits.map((credit, index) => {
                                // Check if the URL is valid using regex
                                const isValidUrl = credit.url && /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(credit.url);
                                
                                return (
                                    <li key={index} className={styles.creditItem}>
                                        {isValidUrl ? (
                                            <a 
                                                href={credit.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className={styles.creditLink}
                                            >
                                                {credit.title}
                                            </a>
                                        ) : (
                                            <span className={styles.creditText}>{credit.title}</span>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
            <div className={styles.games}>
                <h3 className={styles.text}>More Games</h3>
                <div className={styles.gamesGrid}> {/* Use a simplified grid class */}
                    {allGames && Object.keys(allGames)
                        .filter(key => key !== slug)
                        .sort(() => 0.5 - Math.random()) // Shuffle the games randomly
                        .slice(0, 4) // Limit to 4 games
                        .map((key) => (
                            <Game key={key} slug={key} meta={allGames[key]} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
