import axios from 'axios'
import _ from 'lodash'
const config = require('../config/config')
// ------------------------------------
// Constants
// ------------------------------------
const GET_ALL_GROUPS = 'GET_ALL_GROUPS'
// ------------------------------------
// Actions
// ------------------------------------
export const getAllGroups = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `http://${config.ums_web.host}:${config.ums_web.port}/sgroups`
      }).then((res) => {
        dispatch({
          type: GET_ALL_GROUPS,
          payload: {
            groups: res.data
          }
        })
        resolve(res)
      }).catch((e) => {
        console.log(e)
        reject(e)
      })
    })
  }
}
export const applyForSgroup = (userId, groupId) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `http://${config.ums_web.host}:${config.ums_web.port}/sgroups/${groupId}/apply`,
        data: {
          userId: userId
        }
      }).then((res) => {
        let sgroups = getState().sgroups.groups
        let members = res.data.members
        sgroups = sgroups.map((sgroup, index) => {
          if (sgroup._id === groupId) {
            sgroup.members = members
            return sgroup
          }
          return sgroup
        })
        dispatch({
          type: GET_ALL_GROUPS,
          payload: {
            groups: sgroups
          }
        })
        resolve(res)
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
  [GET_ALL_GROUPS] : (state, action) => {
    return action.payload
  }
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {groups: []}

export default function sgroupsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
