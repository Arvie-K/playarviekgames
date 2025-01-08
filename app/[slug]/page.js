import Navbar from "../components/navbar";
import Game from "../components/game";

import styles from '../styles/GamePage.module.css';
import games from '../api/games.json';

export default async function Page({ params }) {
    const slug = (await params).slug
    const game = games[slug]
    return (
        <div>
            <Navbar />
            <div className={styles.layout}>
                <div className={styles.ads}></div>
                <div className={styles.gameframe}>
                    <div className={styles.box}>
                        <iframe className={styles.game} srcDoc={`<form action='/games/${slug}/v3/index.html' style="display: flex; justify-content: center; align-items: center; height: 90vh; margin: 0;">
                            <input type="submit" value="" style="padding: 10px 20px; font-size: 16px; cursor: pointer; background: url('/icons/PlayButton.png') no-repeat center; background-size: contain; border: none; width: 100px; height: 100px;" />
                        </form>`} frameBorder="0" allowFullScreen></iframe>
                    </div>
                    <div className={styles.bar}>
                        <h3 className={styles.title}>{game.title}</h3>
                        <div className={styles.actions}>
                            <img className={styles.barIcon} src="/icons/share.png" alt="" />
                            <img className={styles.barIcon} src="/icons/full.png" alt="" />
                        </div>
                    </div>
                    <div className={styles.bottomSection}>
                        <div className={styles.devlog}>
                            <iframe src={`https://www.youtube.com/embed/${game.devlog}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        </div>
                        <div className={styles.description}>
                            <div>
                                <h2 className={styles.text}>Description</h2>
                                <p className={styles.text}>{game.description}</p><br />
                            </div>
                            <div>
                                <h2 className={styles.text}>Controls</h2>
                                <p className={styles.text}>{game.controls}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.games}>
                    <h3 className={styles.text}>More Games</h3>
                    <div className={styles.gamesGrp}>
                        {
                            Object.keys(games).map((key, index) => {
                                if (key === slug) return null
                                return <Game key={index} slug={key} meta={games[key]} />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}