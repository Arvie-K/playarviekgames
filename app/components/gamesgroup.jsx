import React, { Children } from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/Games.module.css'

const gamesgroup = props => {
    return (
        <div className={styles.grp}>
            <h1 style={{textAlign: 'center', marginBottom: '0.2em'}}>{props.title}</h1>
            {/* Add subtitle below the title if it exists */}
            {props.subtitle && (
                <h2 style={{textAlign: 'center', fontSize: '1.2rem', fontWeight: 'normal', marginTop: '0', marginBottom: '1em'}}>
                    {props.subtitle}
                </h2>
            )}
            <div className={styles.games}>
                {props.children}
            </div>
        </div>
    )
}

gamesgroup.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string // Add subtitle prop type
}

export default gamesgroup