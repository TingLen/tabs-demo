/* eslint-disable no-unused-vars */
import {fetchData} from "./resource"

const webApi = process.env.REACT_APP_API_URL
export default {
  
}

export const handleResponse = ({response, resolve=() => {}, reject = () => {}}) => {
  if(response.data.code === 0) {
    resolve(response.data.data)
  } else {
    reject()
  }
}

