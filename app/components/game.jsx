import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/Games.module.css'

import Link from 'next/link'

const Game = props => {
  console.log(typeof(props.meta.key))
  return (
    <Link href={`/${props.meta.key}`}>
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