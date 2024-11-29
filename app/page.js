import Navbar from './components/navbar.jsx';
import GamesGrp from './components/gamesgroup.jsx';
import Game from './components/game.jsx';
import styles from './styles/Home.module.css';

export default function Home() {
  const games = [
    {
      id: 1,
      title: "Little Larceny",
      image: "https://img.itch.zone/aW1nLzE3OTA2NDYxLnBuZw==/315x250%23c/%2FI7Now.png", // Replace with actual image paths
    },
    {
      id: 2,
      title: "Spider Man: Pigeon City",
      image: "https://img.itch.zone/aW1nLzE0MDE4NTc4LnBuZw==/315x250%23c/wiKdgm.png",
    },
    {
      id: 3,
      title: "Boat Bear",
      image: "https://img.itch.zone/aW1nLzE2Nzk1NzA2LnBuZw==/315x250%23c/mE4Gdw.png",
    },
    {
      id: 4,
      title: "Drinking BOOs",
      image: "https://img.itch.zone/aW1nLzk0MTkwNjkucG5n/315x250%23c/Q%2BS%2BjP.png",
    },
  ];

  return (
    <div className={styles.container}>
      <Navbar />
      <GamesGrp title='Featured'>
        {
          games.map((game) => {
            return <Game key={game.id} title={game.title} img={game.image} />
          })
        }
      </GamesGrp>
    </div>
  );
}
