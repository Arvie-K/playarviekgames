import React, { Children } from 'react'
import PropTypes from 'prop-types'
import stlyes from '../styles/Games.module.css'

const gamesgroup = props => {
  return (
    <div className={stlyes.grp}>
        <h1>{props.title}</h1>
        <div className={stlyes.games}>
            {props.children}
        </div>
    </div>
  )
}

gamesgroup.propTypes = {
    title: PropTypes.string
}

export default gamesgroup