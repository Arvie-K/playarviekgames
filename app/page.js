import Navbar from './components/navbar.jsx';
import GamesGrp from './components/gamesgroup.jsx';
import Game from './components/game.jsx';
import NewGame from './components/newgame.jsx';

import styles from './styles/Home.module.css';
import games from './api/games.json';

export default function Home() {
  return (
    <div className={styles.container}>
      <Navbar />
      <NewGame 
        gameImg="https://img.itch.zone/aW1nLzE3OTA2NDYxLnBuZw==/315x250%23c/%2FI7Now.png" 
        devlogURL="https://www.youtube.com/?watch=BNVpt-CTbYg" 
        thumbnail="https://i.ytimg.com/vi/BNVpt-CTbYg/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD84ik9nYlnpr1KqD-n4iaulIXjAQ"
      />
      <GamesGrp title='Featured'>
        {
          games.map((game) => {
            return <Game key={game.id} meta={game} />
          })
        }
      </GamesGrp>
    </div>
  );
}
