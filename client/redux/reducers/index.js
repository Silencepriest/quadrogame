import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import Squares from './squares'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    Squares
  })

export default createRootReducer
