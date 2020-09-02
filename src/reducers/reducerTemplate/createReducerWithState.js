const initialState = {
  isFetching: false,
  code: null,
  message: '',
  data: {},
  page_size: 20,
  total_page: 0,
  total_records: 0,
}

export default function createReducerWithState(type, action, state = initialState) {
  switch (action.type) {
  case `${type}_REQUEST`:
    return {
      ...state,
      isFetching: true,
    }
  case `${type}_SUCCESS`:
    const data = action.json ? action.json.data : {}
    return {
      ...state,
      isFetching: false,
      code: action.json.code,
      message: action.json.message,
      data: action.loadType ? {
        ...state.data,
        [data.current_page] : data.items,
      } : {
        [data.current_page] : data.items,
      },
      page_size: data.page_size,
      total_page: data.total_page,
      total_records: data.total_records,
    }
  case `${type}_FAILURE`:
    return {
      ...state,
      isFetching: false,
    }
  case `${type}_CLEAR`:
    return initialState
  default:
    return state
  }
}