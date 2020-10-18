import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'

import { setStatus } from '../redux/reducers/squares'

const Square = (props) => {
  const data = useSelector((store) => store.Squares.status[props.id])
  const { current } = useSelector((store) => store.Squares)
  const dispatch = useDispatch()
  return (
    <button
      type="button"
      onClick={() => {
        if (+current === props.id) dispatch(setStatus(current, 1))
      }}
    >
      <div
        className={classnames('w-24 h-24  m-2', {
          'bg-gray-700': data === 0,
          'bg-green-700': data === 1,
          'bg-red-700': data === -1,
          'bg-yellow-500': +current === props.id
        })}
      >
        {' '}
      </div>
    </button>
  )
}

export default Square
