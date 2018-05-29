import axios from 'axios'
import config from '../config/config'
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
      axios({ //发起一个post请求
        method: 'post',
        url: `http://${config.ums_web.host}:${config.ums_web.port}/login`,
        data: {
          user: user,
          pwd: pwd
        }
      }).then((res) => {
        localStorage.setItem('sessionKey', res.data.sessionKey) //sessionKey的作用是什么？
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
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [USER_LOGIN] : (state, action) => {
    return action.payload
  }
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {role: 'visitor'}

export default function userInfoReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]   //ACTION_HANDLERS[GET_ALL_GROUPS]
  return handler ? handler(state, action) : state
}
