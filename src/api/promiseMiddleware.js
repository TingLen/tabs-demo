export default store => next => action => {
  const {promise, type, ...rest} = action

  if (!promise) return next(action)

  const SUCCESS = type + '_SUCCESS'
  const REQUEST = type + '_REQUEST'
  const FAILURE = type + '_FAILURE'
  next({...rest, type: REQUEST})

  return promise
    .then(response => response.data)
    .then(json => {
      if(json.code === 0) {
        return store.dispatch({...rest, json, type: SUCCESS})
      }else {
        return store.dispatch({...rest, json, type: FAILURE})
      }
    })
    .catch(error => {
      return store.dispatch({...rest, error, type: FAILURE})
    })
}
