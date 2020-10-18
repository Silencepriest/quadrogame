import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'
import { useParams, Link } from 'react-router-dom'

import { initField } from '../redux/reducers/squares'

const PlayGround = () => {
  const { x, y, hard } = useParams()

  const { squares, isOver } = useSelector((store) => store.Squares)
  const dispatch = useDispatch()

  let statusCode = ''
  let buttonText = ''
  let statusBlock = <></>
  if (isOver === 0) {
    statusCode = 'Game over. You lose!'
    buttonText = 'Play again'
  }
  if (isOver === 1) {
    statusCode = 'Game over. You win!'
    buttonText = 'Play again'
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
          className="px-8 py-2 bg-green-600"
          onClick={() => {
            dispatch(initField(x * y, hard === 'true'))
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
      <div className="flex flex-wrap mx-auto" style={{ width: `${x * 28 * 0.25}rem` }}>
        {Object.values(squares)}
      </div>
    </div>
  )
}

export default PlayGround
