import axios from 'axios'
import _ from 'lodash'
const config = require('../config/config')
// ------------------------------------
// Constants
// ------------------------------------
const GET_ALL_PROJECT = 'GET_ALL_PROJECT'
// ------------------------------------
// Actions
// ------------------------------------
export const getAllProjecs = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `http://${config.ums_web.host}:${config.ums_web.port}/project`
      }).then((res) => {
        dispatch({
          type: GET_ALL_PROJECT,
          payload: {
            projects: res.data
          }
        })
        resolve(res.data)
      }).catch((e) => {
        console.log(e)
        reject(e)
      })
    })
  }
}
export const upsertProject = (project) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `http://${config.ums_web.host}:${config.ums_web.port}/project/upsert`,
        data: {
          project: project
        }
      }).then((res) => {
        dispatch({
          type: GET_ALL_PROJECT,
          payload: {
            projects: res.data
          }
        })
        resolve(res.data)
      }).catch((e) => {
        console.log(e)
        reject(e)
      })
    })
  }
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_ALL_PROJECT] : (state, action) => {
    return action.payload
  }
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {projects: []}

export default function staticReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
