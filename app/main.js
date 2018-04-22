import React from 'react'
import ReactDOM from 'react-dom'
import App from './routes/App/AppContainer'
import { BrowserRouter, Switch } from 'react-router-dom'
import { configureStore, history } from './store/configureStore'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import axios from 'axios'

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
