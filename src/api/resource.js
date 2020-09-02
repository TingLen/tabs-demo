import axios from 'axios'
import cookies from 'react-cookies'
import {utils} from 'dtchain-fe'

axios.defaults.timeout = 20000
axios.defaults.headers.get['Cache-Control'] = 'no-cache'
axios.defaults.headers.get['Pragma'] = 'no-cache'

// 在所有发送请求之前统一设置请求信息
axios.interceptors.request.use(function (config) {
  config.headers = config.headers || {}
  const apiToken = cookies.load("dtchain-web")
  if (apiToken) {
    config.headers.Authorization = apiToken.replace(/(^\\")|(\\"$)/g, '')
  }

  return config
}, function (error) {
  return Promise.reject(error)
})
// 在所有接到响应之后，统一处理响应信息
axios.interceptors.response.use(function (response) {
  const code = response.data.code
  const message = response.data.message
  if (code !== 0) {
    if (code === 10000) {
      utils.Message('error', message)
    } else {
      utils.Message('warn', message)
    }
  }
  return response
}, function (error) {
  const str = error + ''
  if (str.search('timeout') !== -1) {
    utils.Message('error', "模块正在维护中，请稍后再试")
  }else if (str.search('Network Error') !== -1) {
    utils.Message('error', "网络错误，请稍后再试")
  }else {
    utils.Message()
  }
  return Promise.reject(error)
})

const param = {
  transformRequest: [function (data) {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }]
}

export const fetchData = (method, url, options={}) => {
  const {data, params, transform} = options
  const config = {
    method,
    url,
  }

  data && (config.data = data)
  params && (config.params = params)
  transform && (config.transformRequest = param.transformRequest)
  return axios({...config})
} 
