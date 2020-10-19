import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'
import { useParams, Link } from 'react-router-dom'

import { initField } from '../redux/reducers/squares'

const PlayGround = () => {
  const { x, y, hard } = useParams()
  const [level, setLevel] = useState(-1)

  const { squares, isOver, cycleEnded } = useSelector((store) => store.Squares)
  const dispatch = useDispatch()

  let statusCode = ''
  let buttonText = ''
  let statusBlock = <></>
  if (isOver === 0) {
    statusCode = 'Game over!'
    buttonText = 'Play again'
  }
  if (isOver === 1) {
    statusCode = 'You win!'
    buttonText = 'Next level'
  }
  if (isOver === -2) {
    statusCode = 'Click play to play'
    buttonText = 'Play'
  }
  if (statusCode !== '')
    statusBlock = (
      <div className="absolute flex flex-col h-screen w-screen justify-center items-center bg-opacity-50 bg-black">
        <p
          className={classnames('text-5xl font-bold bg-white p-4 m-2 rounded-md opacity-75', {
            'text-red-700': isOver === 0,
            'text-green-700': isOver === 1,
            'text-green-600': isOver === -2
          })}
        >
          {statusCode}
        </p>
        <button
          type="button"
          disabled={!cycleEnded}
          className={classnames('px-8 py-2 bg-green-600', { 'cursor-not-allowed': !cycleEnded })}
          onClick={() => {
            if (isOver === 0) {
              setLevel(-1)
              dispatch(initField(x * y, hard === 'true', false))
            } else {
              setLevel(level + 1)
              dispatch(initField(x * y, hard === 'true', true))
            }
          }}
        >
          {buttonText}
        </button>
        <Link className="text-white mt-2" to="/">
          Go to Lobby
        </Link>
      </div>
    )

  return (
    <div>
      {statusBlock}
      <p className="absolute top-0 right-0">level: {level}</p>
      <div className="flex flex-wrap mx-auto" style={{ width: `${x * 28 * 0.25}rem` }}>
        {Object.values(squares)}
      </div>
    </div>
  )
}

export default PlayGround
