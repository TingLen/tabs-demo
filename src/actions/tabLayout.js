import * as types from '../constants/ActionTypes'

export const addTab = (key) => {
  return {
    type: types.ADD_TAB,
    key
  }
}

export const updateTab = (key, name) => {
  return {
    type: types.UPDATE_TAB,
    key,
    name
  }
}

export const changeTab = key => {
  return {
    type: types.CHANGE_TAB,
    key
  }
}

export const closeTab = (key) => {
  return {
    type: types.CLOSE_TAB,
    key
  }
}