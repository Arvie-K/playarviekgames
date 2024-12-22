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
                    <iframe className={styles.game} src={`/games/${slug}/v3/index.html`} frameborder="0" height="100%" width="100%"></iframe>
                    <div className={styles.bar}>
                        <h3 className={styles.title}>{game.title}</h3>
                        <div className={styles.actions}>
                            <img className={styles.barIcon} src="/icons/share.png" alt="" />
                            <img className={styles.barIcon} src="/icons/full.png" alt="" />
                        </div>
                    </div>
                </div>
                <div className={styles.games}></div>
            </div>
        </div>
    )
}