/* eslint-disable no-unused-vars */
import {combineReducers} from 'redux'
import * as types from "../constants/ActionTypes"
import createReducer from './reducerTemplate/createReducer'
import createReducerWithState from './reducerTemplate/createReducerWithState'
import createTabsReducer from './reducerTemplate/createTabsReducer'

function createFilteredReducer(reducerFunction, type, reducerPredicate = action => action) {
  return (state, action) => {
    const isInitializationCall = state === undefined
    const shouldRunWrappedReducer = reducerPredicate(action) || isInitializationCall
    return shouldRunWrappedReducer ? reducerFunction(type, action, state) : state
  }
}

const rootReducer = combineReducers({
  tabList: createFilteredReducer(createTabsReducer),
})

export default rootReducer
