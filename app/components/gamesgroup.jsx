import React, { Children } from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/Games.module.css'

const gamesgroup = props => {
  return (
    <div className={styles.grp}>
        <h1>{props.title}</h1>
        <div className={styles.games}>
            {props.children}
        </div>
    </div>
  )
}

gamesgroup.propTypes = {
    title: PropTypes.string
}

export default gamesgroup