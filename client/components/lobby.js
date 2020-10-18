import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Lobby = () => {
  const [x, setX] = useState(5)
  const [y, setY] = useState(5)
  return (
    <div>
      <label htmlFor="xInput">Set X squares:</label>
      <input
        id="xInput"
        className="mx-4 w-10 border-solid border-green-800 border-2"
        type="text"
        value={x}
        onChange={(e) => setX(e.target.value)}
      />
      <label htmlFor="yInput">Set X squares:</label>
      <input
        id="yInput"
        className="mx-4 w-10 border-solid border-green-800 border-2"
        type="text"
        value={y}
        onChange={(e) => setY(e.target.value)}
      />
      <Link to={`/game/${x}/${y}/${false}`}>Play</Link>
    </div>
  )
}

export default Lobby