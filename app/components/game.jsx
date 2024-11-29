import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/Games.module.css'

const Game = props => {
  return (
    <div>
        <div className={styles.game}>
            <img className={styles.gameImg} src={props.img} alt={props.title} />
        </div>
        {/* <h3 className={styles.gameName}>{props.title}</h3> */}
    </div>
  )
}

Game.propTypes = {
    img: PropTypes.string,
    title: PropTypes.string
}

export default Game