import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/Games.module.css'

const gamesgroup = props => {
    return (
        <div className={styles.grp}>
            <h2 className={styles.categoryTitle}>{props.title}</h2>
            <div className={styles.gamesGrid}>
                {props.children}
            </div>
        </div>
    )
}

gamesgroup.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node
}

export default gamesgroup