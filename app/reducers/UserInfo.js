import axios from 'axios'
const config = require('../config/config')
// ------------------------------------
// Constants
// ------------------------------------
const USER_LOGIN = 'USER_LOGIN'
const FINISH_QUIZ = 'FINISH_QUIZ'
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
export const visitorLogin = () => {
  return (dispatch, getState) => {
    return dispatch({
      type : USER_LOGIN,
      payload: {
        user: 'visitor',
        total: 0,
        correct: 0,
        local: true
      }
    })
  }
}
export const register = (userName, pwd) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: 'http://tupulin.com:3000/register',
        data: {
          user: userName,
          pwd: pwd
        }
      }).then((res) => {
        dispatch({
          type: USER_LOGIN,
          payload: {
            ...res.data,
            user:userName,
            total: 0,
            correct: 0
          }
        })
        resolve('success')
      }).catch((err) => {
        reject('duplicated user name')
      })
    })
  }
}
// export const login = (userName, pwd) => {
//   return (dispatch, getState) => {
//     return new Promise((resolve, reject) => {
//       axios({
//         method: 'post',
//         url: 'http://tupulin.com:3000/login',
//         data: {
//           user: userName,
//           pwd: pwd
//         }
//       }).then((res) => {
//         if (res.data.results.length === 0 || res.data.results[0].pwd !== pwd) {
//           return reject('login fail')
//         }
//         dispatch({
//           type: USER_LOGIN,
//           payload: {
//             ...res.data.results[0],
//             local: false
//           }
//         })
//         resolve(res.data.results[0])
//       }).catch((err) => {
//         reject('login fail')
//       })
//     })
//   }
// }
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [USER_LOGIN] : (state, action) => {
    return action.payload
  },
  [FINISH_QUIZ] : (state, action) => {
    return {
      ...state,
      total: state.total + action.payload.total,
      correct: state.correct + action.payload.correct
    }
  }
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {role: 'visitor'}

export default function userInfoReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
