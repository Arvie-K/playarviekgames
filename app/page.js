import Navbar from './components/navbar.jsx';
import GamesGrp from './components/gamesgroup.jsx';
import Game from './components/game.jsx';
import NewGame from './components/newgame.jsx';

import styles from './styles/Home.module.css';

export default async function Home() {
    // Fetch data from the API
    const res = await fetch('https://arviek-games-editor.vercel.app/games', { cache: 'no-store' });
    const gamesArray = await res.json();

    // Transform array into an object keyed by _id (slug)
    // and map properties to the structure expected by Game component (meta)
    const games = gamesArray.reduce((acc, game) => {
        if (game._id) { // Ensure game has an _id
            acc[game._id] = {
                title: game.name, // Map name to title
                image: game.image,
                description: game.description,
                controls: game.controls,
                devlog: game.devlog,
                categories: game.category, // Map category to categories
                ads: game.ads,
                url: game.url
                // Add other necessary fields if Game component uses them
            };
        }
        return acc;
    }, {});

    const categoriesList = [
        "Featured", "The Arvie K Collection", "Fan Games & Parodies",
        "Made In Day", "Meme Games", "OG Arvie K Games", "Stuff I Worked On",
        "Play On Mobile"
    ];

    return (
        <div className={styles.container}>
            <Navbar />
            <NewGame
                gameImg="https://img.itch.zone/aW1nLzE3OTA2NDYxLnBuZw==/315x250%23c/%2FI7Now.png"
                devlogURL="https://www.youtube.com/?watch=BNVpt-CTbYg"
                thumbnail="https://i.ytimg.com/vi/BNVpt-CTbYg/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD84ik9nYlnpr1KqD-n4iaulIXjAQ"
            />

            {/* Map over categories and render GamesGrp for each */}
            {games && categoriesList.map((category) => {
                // Filter games based on the 'categories' property in the transformed meta object
                const filteredGames = Object.entries(games)
                    .filter(([slug, meta]) => meta.categories && meta.categories.includes(category))
                    .reduce((obj, [slug, meta]) => {
                        obj[slug] = meta;
                        return obj;
                    }, {});

                // Render GamesGrp only if there are games in this category
                if (Object.keys(filteredGames).length > 0) {
                    return (
                        <GamesGrp key={category} title={category}>
                            {
                                Object.keys(filteredGames).map((key) => { // Removed index as key is unique
                                    // Pass slug (key) and the transformed meta object
                                    return <Game key={key} slug={key} meta={filteredGames[key]} />
                                })
                            }
                        </GamesGrp>
                    );
                }
                return null; // Return null if no games found for this category
            })}
        </div>
    );
}
