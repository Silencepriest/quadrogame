import React from 'react'
import uuid from 'react-uuid'

import Square from '../../components/square'

const INIT_FIELD = 'INIT_FIELD'
const SET_STATUS = 'SET_STATUS'
const SET_CURRENT = 'SET_CURRENT'

const initialState = {
  status: {},
  squares: {},
  current: -1
}

const Squares = (store = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT: {
      return {
        ...store,
        current: +action.payload
      }
    }
    case SET_STATUS: {
      return {
        ...store,
        status: { ...store.status, [action.payload.id]: action.payload.status }
      }
    }
    case INIT_FIELD: {
      const squares = {}
      const status = {}
      for (let i = 0; i < action.payload; i += 1) {
        status[i] = 0
        squares[i] = <Square key={uuid()} id={i} />
      }
      return { ...store, status, squares }
    }
    default: {
      return { ...store }
    }
  }
}

export function initField(count) {
  return {
    type: INIT_FIELD,
    payload: count
  }
}

export function setCurrent(id) {
  return {
    type: SET_CURRENT,
    payload: id
  }
}

export function setStatus(id, status) {
  return { type: SET_STATUS, payload: { id, status } }
}

function getRandom(data) {
  const availableSquares = Object.keys(data.status).filter((item) => data.status[item] === 0)
  const random = availableSquares[Math.floor(Math.random() * availableSquares.length)]
  return random
}

export function gameCycle() {
  return (dispatch, getState) => {
    setTimeout(() => {
      dispatch(gameCycle())
    }, 1000)
    const { Squares: data } = getState()
    if (data.status[data.current] === 0) {
      dispatch(setStatus(data.current, -1))
    }
    const updatedData = getState()
    dispatch(setCurrent(getRandom(updatedData.Squares)))
  }
}

export default Squares
