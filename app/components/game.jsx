import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/Games.module.css'

import Link from 'next/link'

const Game = props => {
  return (
    <Link href={`/${props.slug}`}>
      <div className={styles.game}>
          <img className={styles.gameImg} src={props.meta.image} alt={props.meta.title} />
      </div>
    </Link>
  )
}

Game.propTypes = {
    meta: PropTypes.object
}

export default Game