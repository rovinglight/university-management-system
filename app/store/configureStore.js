import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { routerReducer as routing, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import userInfoReducer from '../reducers/UserInfo'
import sgroupsReducer from '../reducers/Sgroups'
import competitionsReducer from '../reducers/Competitions'
import staticReducer from '../reducers/Static'
import approvalReducer from '../reducers/Approval'
import thunk from 'redux-thunk'

export const history = createHistory()
const middleware = routerMiddleware(history)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  userInfo : userInfoReducer,
  sgroups : sgroupsReducer,
  competitions: competitionsReducer,
  static: staticReducer,
  approval: approvalReducer,
  routing
})

export function configureStore (initialState) {
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(middleware, thunk)
    )
  )
}
