'use client'

import { useState } from "react";
import Game from "../components/game";
import styles from '../styles/GamePage.module.css';

export default function GameClient({ game, slug, allGames }) {
    const [isFullScreen, setIsFullScreen] = useState(false);

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

    return (
        <div className={styles.layout}>
            <div className={styles.ads}></div>
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
                            <div>
                                <h2 className={styles.text}>Description</h2>
                                <p className={styles.text}>{game.description}</p>
                            </div>
                        )}
                        {game.controls && (
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
                    {allGames && Object.keys(allGames)
                        .filter(key => key !== slug)
                        .slice(0, 6)
                        .map((key) => (
                            <Game key={key} slug={key} meta={allGames[key]} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
