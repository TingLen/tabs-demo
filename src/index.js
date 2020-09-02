import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React from 'react'
import ReactDOM from 'react-dom'
import {hot} from 'react-hot-loader/root'
import {Provider} from 'react-redux'
import {DTchainProvider} from 'dtchain-fe'
import Page from './Page'
import configStore from './store/config_store'
import contextConfig from './context_config'
import './styles/less/index.less'

export const store = configStore()

const RHLPage = process.env.NODE_ENV === "development" ? hot(Page) : Page

ReactDOM.render(
  <Provider store={store}>
    <DTchainProvider value={contextConfig}>
      <RHLPage />
    </DTchainProvider>
  </Provider>, 
  document.getElementById('root'))


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
