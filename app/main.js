import React from 'react'
import ReactDOM from 'react-dom'
import App from './routes/App/AppContainer'
import { BrowserRouter, Switch } from 'react-router-dom'
import { configureStore, history } from './store/configureStore'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import axios from 'axios'
import NProgress from 'nprogress/nprogress.js'
import 'nprogress/nprogress.css'

const store = configureStore({})

ReactDOM.render(
(
  <BrowserRouter>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <App />
        </Switch>
      </ConnectedRouter>
    </Provider>
  </BrowserRouter>
), document.getElementById('app'))

axios.interceptors.request.use((config) => {
  let sessionKey = localStorage.getItem('sessionKey')
  if (sessionKey) {
    config.headers.sessionkey = sessionKey
  }
  return config
})

NProgress.configure({
    easing: 'linear',
    speed: 350
})

axios.defaults.transformRequest.push(function (data, headers) {
    NProgress.start();
    return data;
})

axios.defaults.transformResponse.push(function (data, headers) {
    NProgress.done();
    return data;
})
