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
                url: game.url,
                release_date: game.release_date // Include release_date
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
                const filteredGamesEntries = Object.entries(games)
                    .filter(([slug, meta]) => meta.categories && meta.categories.includes(category));

                // Sort the filtered games by release_date (descending - latest first)
                const sortedGamesEntries = filteredGamesEntries.sort(([slugA, metaA], [slugB, metaB]) => {
                    // Handle cases where release_date might be missing or invalid
                    const dateA = metaA.release_date ? new Date(metaA.release_date) : new Date(0);
                    const dateB = metaB.release_date ? new Date(metaB.release_date) : new Date(0);
                    return dateB - dateA; // Descending order
                });

                // Render GamesGrp only if there are games in this category
                if (sortedGamesEntries.length > 0) {
                    return (
                        <GamesGrp key={category} title={category}>
                            {
                                // Map over the *sorted* entries
                                sortedGamesEntries.map(([slug, meta]) => {
                                    // Pass slug (key) and the transformed meta object
                                    return <Game key={slug} slug={slug} meta={meta} />
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
