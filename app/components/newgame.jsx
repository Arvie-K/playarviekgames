"use client"

import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/Games.module.css'

const NewGame = props => {
  return (
    <div className={styles.newGameContainer}>
        <div className={styles.newGame}>
            <div className={styles.imgGradient}>
                <img className={styles.newGameImg} src={props.gameImg} alt="New Game" />
            </div>
            <div className={styles.devlog}>
                <h2>New game</h2>
                <h4>Watch The Devlog</h4>
                <img src={props.thumbnail} onClick={() => window.location.href = props.devlogURL} alt="Devlog Thumbnail" />
            </div>
        </div>
    </div>
  )
}

NewGame.propTypes = {
    gameImg: PropTypes.string,
    devlogURL: PropTypes.string,
    thumbnail: PropTypes.string
}

export default NewGame