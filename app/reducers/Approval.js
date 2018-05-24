import axios from 'axios'
import _ from 'lodash'
const config = require('../config/config')
// ------------------------------------
// Constants
// ------------------------------------
const GET_ALL_APPROVAL = 'GET_ALL_APPROVAL'
// ------------------------------------
// Actions
// ------------------------------------
export const getAllApproval = (approvalId) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {

    })
  }
}
export const createApproval = (schema) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `http://${config.ums_web.host}:${config.ums_web.port}/approval/new`,
        data: {
          approvalSchema: schema
        }
      }).then((res) => {
        dispatch({
          type: GET_ALL_APPROVAL,
          payload: {
            approvals: res.data.approvals
          }
        })
        resolve(res.data.approvalId)
      }).catch((e) => {
        reject(e)
      })
    })
  }
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_ALL_APPROVAL] : (state, action) => {
    return action.payload
  }
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {approvals: []}

export default function approvalReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
