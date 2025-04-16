import Navbar from "../components/navbar";
import Link from 'next/link'; // Import Link
import GameClient from './GameClient'; // Import the new client component

import styles from '../styles/GamePage.module.css';

export default async function Page({ params }) {
    const slug = params.slug;

    // Fetch all games data
    let gameData = null; // Store the raw game object found
    let allGames = null; // Store the transformed object for "More Games"

    try {
        const res = await fetch('https://arviek-games-editor.vercel.app/games', { cache: 'no-store' });
        if (res.ok) {
            const gamesArray = await res.json();

            // Find the specific game object from the array
            gameData = gamesArray.find(game => game._id === slug);

            // Transform the array into an object keyed by _id for the "More Games" section
            allGames = gamesArray.reduce((acc, game) => {
                if (game._id) {
                     acc[game._id] = { // Key is slug (_id)
                        // Value is the meta object expected by Game component
                        title: game.name,
                        image: game.image,
                        // Include other fields if needed by the Game component in "More Games"
                        categories: game.category
                    };
                }
                return acc;
            }, {});

        } else {
            console.error("Failed to fetch games:", res.status);
        }
    } catch (error) {
        console.error("Error fetching games:", error);
    }

    // Handle game not found
    if (!gameData) { // Check if gameData was found
        return (
            <div>
                <Navbar />
                <div className={styles.layout}>
                    <div className={styles.gameframe} style={{ textAlign: 'center', padding: '50px' }}>
                        <h1>Game not found</h1>
                        <p>Sorry, we couldn't find the game "{slug}".</p>
                        <Link href="/">Return to home</Link>
                    </div>
                </div>
            </div>
        );
    }

    // Render the client component with fetched data
    return (
        <div>
            <Navbar />
            {/* Pass the raw gameData object and the transformed allGames object */}
            <GameClient game={gameData} slug={slug} allGames={allGames} />
        </div>
    );
}