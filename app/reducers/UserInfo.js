import axios from 'axios'
import authService from '../service/authService'
const config = require('../config/config')
// ------------------------------------
// Constants
// ------------------------------------
const USER_LOGIN = 'USER_LOGIN'
// ------------------------------------
// Actions
// ------------------------------------
export const login = (user, pwd) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `http://${config.ums_web.host}:${config.ums_web.port}/login`,
        data: {
          user: user,
          pwd: pwd
        }
      }).then((res) => {
        localStorage.setItem('sessionKey', res.data.sessionKey)
        dispatch({
          type: USER_LOGIN,
          payload: {
            ...res.data
          }
        })
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}
export const loginWithSessionKey = (sessionKey) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `http://${config.ums_web.host}:${config.ums_web.port}/loginSession`,
        data: {
          sessionKey: sessionKey
        }
      }).then((res) => {
        dispatch({
          type: USER_LOGIN,
          payload: {
            ...res.data
          }
        })
        resolve(res.data)
      }).catch((e) => {
        reject(e)
        console.log('session expired', e)
      })
    })
  }
}
export const logOut = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      localStorage.removeItem('sessionKey')
      dispatch({
        type: USER_LOGIN,
        payload: {role: "visitor"}
      })
      resolve('logout succ')
    })
  }
}
export const updateUserInfo = (user) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `http://${config.ums_web.host}:${config.ums_web.port}/user/update`,
        data: {
          user: user
        }
      }).then((res) => {
        dispatch({
          type: USER_LOGIN,
          payload: {
            ...res.data
          }
        })
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [USER_LOGIN] : (state, action) => {
    let newState = {
      ...action.payload,
      isAuthorized: authService.isAuthorized(action.payload.auth)
    }
    console.log(newState)
    return newState
  }
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {role: 'visitor', isAuthorized: () => false}

export default function userInfoReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
