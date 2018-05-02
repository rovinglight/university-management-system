import axios from 'axios'
const config = require('../config/config')
// ------------------------------------
// Constants
// ------------------------------------
const GET_ALL_COMPETITION = 'GET_ALL_COMPETITION'
// ------------------------------------
// Actions
// ------------------------------------
export const getAllCompetitions = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `http://${config.ums_web.host}:${config.ums_web.port}/competitions`
      }).then((res) => {
        dispatch({
          type: GET_ALL_COMPETITION,
          payload: {
            competitions: res.data
          }
        })
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}
export const upsertCompetition = (competition) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `http://${config.ums_web.host}:${config.ums_web.port}/competitions/upsert`,
        data: {
          competition: competition
        }
      }).then((res) => {
        dispatch({
          type: GET_ALL_COMPETITION,
          payload: {
            competitions: res.data
          }
        })
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}
export const removeCompetition = (competitionId) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `http://${config.ums_web.host}:${config.ums_web.port}/competitions/remove`,
        data: {
          competitionId: competitionId
        }
      }).then((res) => {
        dispatch({
          type: GET_ALL_COMPETITION,
          payload: {
            competitions: res.data
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
  [GET_ALL_COMPETITION] : (state, action) => {
    return action.payload
  }
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {competitions: []}

export default function userInfoReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
