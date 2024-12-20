import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/Games.module.css'

const Game = props => {
  return (
    <div className={styles.game}>
        <img className={styles.gameImg} src={props.img} alt={props.title} />
    </div>
  )
}

Game.propTypes = {
    img: PropTypes.string,
    title: PropTypes.string
}

export default Game