import React from 'react'
import uuid from 'react-uuid'

import Square from '../../components/square'

const INIT_FIELD = 'INIT_FIELD'
const SET_STATUS = 'SET_STATUS'
const SET_CURRENT = 'SET_CURRENT'
const GAME_OVER = 'GAME_OVER'
const SET_TIME = 'SET_TIME'

const initialState = {
  status: {},
  squares: {},
  current: -1,
  isOver: -2,
  time: 1000,
  hard: false
}

const Squares = (store = initialState, action) => {
  switch (action.type) {
    case SET_TIME: {
      return {
        ...store,
        time: action.payload
      }
    }
    case GAME_OVER: {
      return {
        ...store,
        isOver: action.payload
      }
    }
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
      for (let i = 0; i < action.payload.count; i += 1) {
        status[i] = 0
        squares[i] = <Square key={uuid()} id={i} />
      }
      return { ...store, status, squares, isOver: -1, current: -1, hard: action.payload.hard }
    }
    default: {
      return { ...store }
    }
  }
}

export function setCurrent(id) {
  return {
    type: SET_CURRENT,
    payload: id
  }
}

export function setTime(correct) {
  return (dispatch, getState) => {
    const { Squares: data } = getState()
    const { time, hard } = data
    let newTime = time
    if (hard) newTime = correct ? time - time * 0.05 : time + time * 0.05
    dispatch({ type: SET_TIME, payload: newTime })
  }
}

export function setStatus(id, status) {
  return { type: SET_STATUS, payload: { id, status } }
}

function gameOver(win) {
  return { type: GAME_OVER, payload: win }
}

function getRandom(data) {
  const availableSquares = Object.keys(data.status).filter((item) => data.status[item] === 0)
  const random = availableSquares[Math.floor(Math.random() * availableSquares.length)]
  const redCount = Object.keys(data.status).filter((item) => data.status[item] === -1)
  const greenCount = Object.keys(data.status).filter((item) => data.status[item] === 1)
  if (redCount.length * 2 >= Object.keys(data.status).length) return -2
  if (greenCount.length * 2 >= Object.keys(data.status).length) return -1
  return random
}

export function gameCycle() {
  return (dispatch, getState) => {
    const { Squares: data } = getState()
    if (data.isOver === -1)
      setTimeout(() => {
        dispatch(gameCycle())
      }, data.time)
    if (data.status[data.current] === 0) {
      dispatch(setStatus(data.current, -1))
      dispatch(setTime(false))
    }
    const updatedData = getState()
    const rand = getRandom(updatedData.Squares)
    if (rand === -1) dispatch(gameOver(1))
    if (rand === -2) dispatch(gameOver(0))
    dispatch(setCurrent(rand))
  }
}

export function initField(count, hard) {
  return (dispatch) => {
    dispatch({ type: INIT_FIELD, payload: { count, hard } })
    dispatch(gameCycle())
  }
}

export default Squares
