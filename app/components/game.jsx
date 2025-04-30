import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/Games.module.css'

import Link from 'next/link'

const Game = props => {
  return (
    <Link className={styles.game} href={`/${props.slug}`}>
        {/* Wrap image and add play button */}
        <div className={styles.gameImgContainer}>
            <img className={styles.gameImg} src={props.meta.image} alt={props.meta.title} />
            <img className={styles.playButton} src="/icons/PlayButton.png" alt="Play" /> {/* Added Play Button */}
        </div>
        <h3 className={styles.gameName}>{props.meta.title}</h3>
    </Link>
  )
}

Game.propTypes = {
    meta: PropTypes.object,
    slug: PropTypes.string
}

export default Game