import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/Games.module.css'

import Link from 'next/link'

const Game = props => {
  return (
    <Link className={styles.game} href={`/${props.slug}`}>
      {/* <div> */}
          <img className={styles.gameImg} src={props.meta.image} alt={props.meta.title} />
          <div className={styles.gameTitleOverlay}>
            <h3 className={styles.gameTitleText}>{props.meta.title}</h3>
          </div>
      {/* </div> */}
    </Link>
  )
}

Game.propTypes = {
    meta: PropTypes.object,
    slug: PropTypes.string
}

export default Game