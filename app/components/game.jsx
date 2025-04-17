import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/Games.module.css'
import Link from 'next/link'

const Game = props => {
  return (
    <Link className={styles.gameCard} href={`/${props.slug}`}>
      <div className={styles.gameImageContainer}>
        <img 
          className={styles.gameImg} 
          src={props.meta.image} 
          alt={props.meta.title}
          loading="lazy"
        />
        <div className={styles.gameOverlay}>
          <h3 className={styles.gameTitle}>{props.meta.title}</h3>
        </div>
      </div>
    </Link>
  )
}

Game.propTypes = {
    meta: PropTypes.object,
    slug: PropTypes.string
}

export default Game