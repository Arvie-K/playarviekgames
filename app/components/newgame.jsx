"use client"

import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/Games.module.css'
import Link from 'next/link' // Import Link

const NewGame = props => {
  // Construct YouTube embed URL only if devlogURL exists
  const embedUrl = props.devlogURL ? `https://www.youtube.com/embed/${props.devlogURL}` : null;
  const gameUrl = props.gameSlug ? `/${props.gameSlug}` : '#'; // Construct game link URL

  return (
    <div className={styles.newGameContainer}>
        <h2 className={styles.newGameTitle}>Featured Game</h2>
        <div className={styles.newGameGrid}>
            {/* Left Side: Recreate Thumbnail Link */}
            {props.gameSlug ? (
                <Link href={gameUrl} className={styles.newGameThumbnailContainer}>
                    <img
                        className={styles.newGameThumbnail}
                        src={props.gameImg}
                        alt="New Game Thumbnail"
                    />
                    <img
                        className={styles.newGamePlayButton}
                        src="/icons/PlayButton.png" // Use the same play button icon
                        alt="Play Game"
                    />
                </Link>
            ) : (
                 <div>Error: Latest game data missing.</div> // Fallback/Error display
            )}


            {/* Right Side: Devlog Video */}
            {embedUrl ? (
                <div className={styles.newGameDevlogFrame}>
                    <iframe
                        src={embedUrl}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen>
                    </iframe>
                </div>
            ) : (
                <div className={styles.noDevlog}>
                    {/* Optional: Placeholder if no devlog URL */}
                    <p>No Devlog Available</p>
                </div>
            )}
        </div>
    </div>
  )
}

NewGame.propTypes = {
    gameImg: PropTypes.string, // Expect game image URL
    devlogURL: PropTypes.string, // Can be null or undefined
    gameSlug: PropTypes.string, // Slug for linking to the game page
}

export default NewGame