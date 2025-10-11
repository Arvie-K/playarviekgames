import Navbar from './components/navbar.jsx';
import GamesGrp from './components/gamesgroup.jsx';
import Game from './components/game.jsx';
import NewGame from './components/newgame.jsx';
import PCGamesSlider from './components/PCGamesSlider.jsx';
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
        const isVisible = game.show === undefined || game.show === true;
        if (game._id && isVisible) { // Ensure game has an _id and is visible
            acc[game._id] = { // Use game._id as the key (slug)
                title: game.name,
                image: game.image,
                description: game.description,
                controls: game.controls,
                devlog: game.devlog,
                categories: game.category,
                ads: game.ads,
                url: game.url,
                release_date: game.release_date
            };
        }
        return acc;
    }, {});


    // Find the latest game based on release_date using the processed 'games' object
    let latestGameSlug = null;
    let latestGameMeta = null;
    if (Object.keys(games).length > 0) {
        latestGameSlug = Object.entries(games).reduce((latestSlug, [currentSlug, currentMeta]) => {
            const latestDate = games[latestSlug]?.release_date ? new Date(games[latestSlug].release_date) : new Date(0);
            const currentDate = currentMeta.release_date ? new Date(currentMeta.release_date) : new Date(0);
            return currentDate > latestDate ? currentSlug : latestSlug;
        }, Object.keys(games)[0]); // Initialize with the first game's slug

        latestGameMeta = games[latestGameSlug];
    }


    // Prepare props for NewGame, with fallbacks
    const newGameProps = {
        gameSlug: latestGameSlug, // Pass the slug for linking
        gameImg: latestGameMeta?.image || "https://via.placeholder.com/315x250?text=N/A", // Pass image URL
        devlogURL: latestGameMeta?.devlog || null, // Keep devlog URL separate
    };


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
            {/* Pass gameSlug, gameImg, and devlogURL to NewGame */}
            <NewGame
                gameSlug={newGameProps.gameSlug}
                gameImg={newGameProps.gameImg}
                devlogURL={newGameProps.devlogURL}
            />

            {/* Mobile-first section - will appear on top on mobile */}
            <div className={styles.mobileFirstSection}>
                {games && renderCategoryGroup(games, "Play On Mobile", categorySubtitles["Play On Mobile"])}
            </div>

            {/* Other categories - will be combined into a horizontal slider on mobile */}
            <div className={styles.otherCategories}>
                <PCGamesSlider 
                    games={games} 
                    categoriesList={categoriesList} 
                    categorySubtitles={categorySubtitles} 
                />
            </div>
        </div>
    );

    // Helper function to render a category group
    function renderCategoryGroup(games, category, subtitle) {
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
                <GamesGrp key={category} title={category} subtitle={subtitle || ""}>
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
    }
}
