import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from '../api/promiseMiddleware'
import rootReducer from '../reducers'

const ConfigStoreProd = () => createStore(
  rootReducer,
  applyMiddleware(thunk, promiseMiddleware)
)
export default ConfigStoreProd
