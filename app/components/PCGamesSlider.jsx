'use client'

import { useState, useEffect } from 'react';
import Game from './game';
import GamesGrp from './gamesgroup';
import styles from '../styles/Games.module.css';

export default function PCGamesSlider({ games, categoriesList, categorySubtitles }) {
    const [isMobile, setIsMobile] = useState(false);
    
    // Detect mobile screen on component mount and window resize
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        // Check on initial load
        checkIfMobile();
        
        // Add event listener for window resize
        window.addEventListener('resize', checkIfMobile);
        
        // Cleanup
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);
    
    // For mobile: Combine all PC games into a single category with horizontal scroll
    if (isMobile) {
        // Get all games except those in "Play On Mobile" category
        const pcGames = Object.entries(games).filter(([slug, meta]) => 
            meta.categories && !meta.categories.includes("Play On Mobile")
        );
        
        // Sort by release date
        const sortedPCGames = pcGames.sort(([slugA, metaA], [slugB, metaB]) => {
            const dateA = metaA.release_date ? new Date(metaA.release_date) : new Date(0);
            const dateB = metaB.release_date ? new Date(metaB.release_date) : new Date(0);
            return dateB - dateA;
        });
        
        return (
            <div className={styles.pcGamesContainer}>
                <h1 style={{textAlign: 'center', marginBottom: '0.1em'}}>Play On PC</h1>
                <h2 style={{
                    textAlign: 'center', 
                    fontSize: '1.2rem', 
                    fontWeight: 'bold', 
                    fontFamily: 'Arial, sans-serif', 
                    marginTop: '0', 
                    marginBottom: '1em'
                }}>
                    Games Best Experienced On Desktop
                </h2>
                <div className={styles.horizontalScroller}>
                    {sortedPCGames.map(([slug, meta]) => (
                        <Game key={slug} slug={slug} meta={meta} />
                    ))}
                </div>
            </div>
        );
    }
    
    // For desktop: Show the normal categories
    return (
        <>
            {categoriesList
                .filter(category => category !== "Play On Mobile")
                .map((category) => {
                    // Filter games based on the 'categories' property
                    const filteredGamesEntries = Object.entries(games)
                        .filter(([slug, meta]) => meta.categories && meta.categories.includes(category));

                    // Sort the filtered games by release_date (descending - latest first)
                    const sortedGamesEntries = filteredGamesEntries.sort(([slugA, metaA], [slugB, metaB]) => {
                        const dateA = metaA.release_date ? new Date(metaA.release_date) : new Date(0);
                        const dateB = metaB.release_date ? new Date(metaB.release_date) : new Date(0);
                        return dateB - dateA;
                    });

                    // Render GamesGrp only if there are games in this category
                    if (sortedGamesEntries.length > 0) {
                        return (
                            <GamesGrp 
                                key={category} 
                                title={category} 
                                subtitle={categorySubtitles[category] || ""}
                            >
                                {sortedGamesEntries.map(([slug, meta]) => (
                                    <Game key={slug} slug={slug} meta={meta} />
                                ))}
                            </GamesGrp>
                        );
                    }
                    return null;
                })}
        </>
    );
}
