import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { initField, gameCycle } from '../redux/reducers/squares'

const PlayGround = () => {
  const [x, setX] = useState(5)
  const [y, setY] = useState(5)
  const { squares } = useSelector((store) => store.Squares)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initField(x * y))
  }, [dispatch, x, y])

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
      <button type="button" onClick={() => dispatch(gameCycle())}>
        Start game
      </button>
      <div className="flex flex-wrap mx-auto" style={{ width: `${x * 28 * 0.25}rem` }}>
        {Object.values(squares)}
      </div>
    </div>
  )
}

export default PlayGround
