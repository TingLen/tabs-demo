const initialState = {
  code: null,
  data: {},
  message: '',
  isFetching: false
}

export default function createReducer(type, action, state = initialState) {
  switch (action.type) {
    case `${type}_REQUEST`:
      return {
        ...state,
        isFetching: true
      }
    case `${type}_SUCCESS`:
      const data = action.json && action.json.data
      return {
        ...state,
        code: action.json.code,
        data: (data === undefined || data === null) ? state.data : data,
        message: action.json.message,
        isFetching: false
      }
    case `${type}_FAILURE`:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state
  }
}