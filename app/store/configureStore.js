import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { routerReducer as routing, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import userInfoReducer from '../reducers/UserInfo'
import quizListReducer from '../reducers/QuizList'
import thunk from 'redux-thunk'

export const history = createHistory()
const middleware = routerMiddleware(history)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  userInfo : userInfoReducer,
  quizList : quizListReducer,
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
