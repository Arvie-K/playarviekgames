'use client'

import { useState, useEffect } from "react";
import Game from "../components/game"; // Assuming Game component is needed for "More Games"
import styles from '../styles/GamePage.module.css';

export default function GameClient({ game, slug, allGames }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        // Simulate loading time - consider if this is still needed
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    function fullScreen() {
        const elem = document.querySelector('#game');
        if (!elem) return;

        setIsFullScreen(true);

        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { // Corrected prefix
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }

        // Listen for fullscreen exit
        document.addEventListener('fullscreenchange', handleFullscreenExit);
        document.addEventListener('webkitfullscreenchange', handleFullscreenExit); // Prefixes for compatibility
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
            // Show a temporary notification
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
            // Use CSS classes for animations if preferred
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s ease';
            notification.textContent = 'Link copied to clipboard!';

            document.body.appendChild(notification);

            // Fade in
            requestAnimationFrame(() => {
                notification.style.opacity = '1';
            });


            setTimeout(() => {
                 // Fade out
                notification.style.opacity = '0';
                notification.addEventListener('transitionend', () => {
                     if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, { once: true });
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            // Optionally show an error notification
        });
    }

    // The main JSX structure moved from the Page component
    return (
        <div className={styles.layout}>
            <div className={styles.ads}></div> {/* Consider ad placement */}
            <div className={styles.gameframe}>
                <div className={styles.box}>
                    {isLoading ? (
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'black',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                border: '5px solid rgba(255, 255, 255, 0.3)',
                                borderTop: '5px solid #0076A8',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite'
                            }}></div>
                            <style jsx>{`
                                @keyframes spin {
                                    0% { transform: rotate(0deg); }
                                    100% { transform: rotate(360deg); }
                                }
                            `}</style>
                        </div>
                    ) : (
                        <iframe
                            id="game"
                            className={styles.game}
                            // Updated srcDoc to point to the correct relative path
                            srcDoc={`<form action='${game.url}' style="display: flex; justify-content: center; align-items: center; height: 90vh; margin: 0; background-color: #000;">
                                <input type="submit" value="" style="padding: 10px 20px; font-size: 16px; cursor: pointer; background: url('/icons/PlayButton.png') no-repeat center; background-size: contain; border: none; width: 100px; height: 100px; transition: transform 0.3s ease; filter: drop-shadow(0 0 10px rgba(0, 118, 168, 0.5));" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'" />
                            </form>`}
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    )}
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
                    {game.devlog && ( // Conditionally render devlog
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
                        {game.description && ( // Conditionally render description
                            <div>
                                <h2 className={styles.text}>Description</h2>
                                <p className={styles.text}>{game.description}</p>
                            </div>
                        )}
                         {game.controls && ( // Conditionally render controls
                            <div>
                                <h2 className={styles.text}>Controls</h2>
                                <p className={styles.text}>{game.controls}</p>
                            </div>
                         )}
                    </div>
                </div>
            </div>
            <div className={styles.games}>
                <h3 className={styles.text}>More Games</h3>
                <div className={styles.gamesGrp}>
                    {allGames && Object.keys(allGames) // Use allGames prop
                        .filter(key => key !== slug) // Exclude current game
                        .slice(0, 6) // Limit number of games shown
                        .map((key) => (
                            <Game key={key} slug={key} meta={allGames[key]} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
