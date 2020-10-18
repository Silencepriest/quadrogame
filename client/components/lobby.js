import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Lobby = () => {
  const [x, setX] = useState(5)
  const [y, setY] = useState(5)
  return (
    <div className="flex flex-col justify-center items-center bg-green-400 w-screen h-screen">
      <label className="text-2xl" htmlFor="xInput">
        Set X squares:
      </label>
      <input
        id="xInput"
        className="mx-4 w-10 bg-green-300 p-2 text-xl"
        type="text"
        value={x}
        onChange={(e) => setX(e.target.value)}
      />
      <label className="text-2xl" htmlFor="yInput">
        Set Y squares:
      </label>
      <input
        id="yInput"
        className="mx-4 w-10 bg-green-300 p-2 text-xl"
        type="text"
        value={y}
        onChange={(e) => setY(e.target.value)}
      />
      <Link className="px-8 py-2 mt-6 bg-red-600" to={`/game/${x}/${y}/${false}`}>Play</Link>
    </div>
  )
}

export default Lobby