import Navbar from './components/navbar.jsx';
import GamesGrp from './components/gamesgroup.jsx';
import Game from './components/game.jsx';
import NewGame from './components/newgame.jsx';
import { Metadata } from 'next'; // Import Metadata type

import styles from './styles/Home.module.css';

// Metadata specific to the Homepage
export async function generateMetadata() {
    // You could potentially fetch some data here if needed for dynamic descriptions
    // e.g., fetch featured games or latest additions.
    // For now, we'll use static text optimized for the homepage.

    const title = "Arvie K Games - Play Free Online Browser Games";
    const description = "Discover and play a wide variety of free online browser games created by Arvie K. Featuring indie games, fan games, parodies, and unique creations. New games added regularly!";
    // Use a specific image for the homepage OG/Twitter card if desired
    const homeImageUrl = "https://www.arviek.games/ArvieKGamesLogoFull.png"; // Replace with your actual homepage OG image URL

    return {
        title: title, // Override default title
        description: description, // Override default description
        openGraph: {
            title: title,
            description: description,
            url: "https://www.arviek.games", // Canonical URL for the homepage
            images: [
                {
                    url: homeImageUrl, // Specific image for homepage sharing
                    width: 1200,
                    height: 630,
                    alt: 'Arvie K Games Homepage',
                },
            ],
            // siteName and type will be inherited from layout unless specified
        },
        twitter: {
            title: title,
            description: description,
            images: [homeImageUrl], // Specific image for homepage sharing
            // card type will be inherited from layout unless specified
        },
        // Keywords can also be more specific here if needed, or inherit from layout
        // keywords: ['homepage keyword 1', 'homepage keyword 2', ...],
    };
}

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

    // Map category titles to subtitles
    const categorySubtitles = {
        "Featured": "The Latest In Arvie K Games",
        "The Arvie K Collection": "Games I've Made Over The Years",
        "Fan Games & Parodies": "Adding A Twist On What Already Exists",
        "Made In Day": "Games That Were Either A Fun Little Project Or For A Game Jam",
        "Meme Games": "\"Yall Talking About Gif Memes, My Memes Are PLAYABLE!\" - Arvie K 2020",
        "OG Arvie K Games": "Games I Made When First Starting Out",
        "Stuff I Worked On": "Games That I Contributed To",
        "Play On Mobile": "Games You Can Play On Your Phone"
    };


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
                    // Get the subtitle for the current category
                    const subtitle = categorySubtitles[category] || ""; // Fallback to empty string if not found

                    return (
                        <GamesGrp key={category} title={category} subtitle={subtitle}>
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
