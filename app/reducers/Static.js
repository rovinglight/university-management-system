import axios from 'axios'
import _ from 'lodash'
const config = require('../config/config')
// ------------------------------------
// Constants
// ------------------------------------
const GET_ALL_STATIC = 'GET_ALL_STATIC'
// ------------------------------------
// Actions
// ------------------------------------
export const getAllStatic = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `http://${config.ums_web.host}:${config.ums_web.port}/static`
      }).then((res) => {
        dispatch({
          type: GET_ALL_STATIC,
          payload: res.data
        })
        resolve(res.data)
      }).catch((e) => {
        console.log(e)
        reject(e)
      })
    })
  }
}
export const updateApprovalSchema = (newSchema, updatedSchemaId) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `http://${config.ums_web.host}:${config.ums_web.port}/static/approvalschema/update`,
        data: {
          approvalSchema: newSchema,
          updatedSchemaId: updatedSchemaId
        }
      }).then((res) => {
        let newStatic = getState().static
        dispatch({
          type: GET_ALL_STATIC,
          payload: {
            ...newStatic,
            approvalSchema: newSchema
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
  [GET_ALL_STATIC] : (state, action) => {
    return action.payload
  }
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {allroles: [], approvalSchema: []}

export default function staticReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
