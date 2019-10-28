import React from 'react'
import './Row.scss';

export default function Row({children}) {
  return (
    <div className="row">
      {children}
    </div>
  )
}
