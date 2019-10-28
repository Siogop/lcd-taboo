import React from 'react'
import './Tile.scss';

export default function Tile({text}) {
  return (
    <div className="tile nes-container is-rounded is-centered">
      {text}
    </div>
  )
}
