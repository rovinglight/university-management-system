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
const replaceGroupInfo = (oldGroups, groupToReplace) => {
  let newGroups = _.cloneDeep(oldGroups)
  if (groupToReplace) {
    groupToReplace.forEach((group) => {
      let groupId = group._id
      let targetGroup = _.find(newGroups, {'_id': groupId})
      targetGroup = _.assign(targetGroup, group)
    })
  }
  return newGroups
}
const replaceGroupProps = (oldGroups, groupIdList, propsToReplace) => {
  let newGroups = _.cloneDeep(oldGroups)
  groupIdList.forEach((groupId) => {
    let targetGroup = _.find(newGroups, {'_id': groupId})
    targetGroup = _.assign(targetGroup, propsToReplace)
  })
  return newGroups
}
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
        resolve(res.data)
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
        method: 'get',
        url: `http://${config.ums_web.host}:${config.ums_web.port}/sgroups/${groupId}/apply`
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
export const acceptNewMember = (userId, groupId) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `http://${config.ums_web.host}:${config.ums_web.port}/sgroups/${groupId}/accept`,
        data: {
          userId: userId
        }
      }).then((res) => {
        let sgroups = getState().sgroups.groups
        let group = res.data
        let targetGroup = _.find(sgroups, {'_id': group._id.toString()})
        targetGroup.members = group.members
        dispatch({
          type: GET_ALL_GROUPS,
          payload: {
            groups: sgroups
          }
        })
        resolve(group)
      }).catch((e) => {
        reject(e)
      })
    })
  }
}
export const deleteMembers = (userId, groupId) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `http://${config.ums_web.host}:${config.ums_web.port}/sgroups/${groupId}/delete`,
        data: {
          userId: userId
        }
      }).then((res) => {
        let sgroups = getState().sgroups.groups
        let group = res.data
        let targetGroup = _.find(sgroups, {'_id': group._id.toString()})
        targetGroup.members = group.members
        dispatch({
          type: GET_ALL_GROUPS,
          payload: {
            groups: sgroups
          }
        })
        resolve(group)
      }).catch((e) => {
        reject(e)
      })
    })
  }
}
export const rejectMembers = (userId, groupId) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `http://${config.ums_web.host}:${config.ums_web.port}/sgroups/${groupId}/reject`,
        data: {
          userId: userId
        }
      }).then((res) => {
        let sgroups = getState().sgroups.groups
        let group = res.data
        let targetGroup = _.find(sgroups, {'_id': group._id.toString()})
        targetGroup.members = group.members
        dispatch({
          type: GET_ALL_GROUPS,
          payload: {
            groups: sgroups
          }
        })
        resolve(group)
      }).catch((e) => {
        reject(e)
      })
    })
  }
}
export const updateSgroupInfo = (infoToUpdate, groupId) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `http://${config.ums_web.host}:${config.ums_web.port}/sgroups/${groupId}/update`,
        data: {
          infoToUpdate: infoToUpdate
        }
      }).then((res) => {
        let sgroups = getState().sgroups.groups
        let group = res.data
        sgroups = replaceGroupInfo(sgroups, [group])
        dispatch({
          type: GET_ALL_GROUPS,
          payload: {
            groups: sgroups
          }
        })
        resolve(group)
      }).catch((e) => {
        reject(e)
      })
    })
  }
}
export const changeAcceptionStatus = (groupIdList, newStatus) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `http://${config.ums_web.host}:${config.ums_web.port}/sgroups/acceptionStatus`,
        data: {
          groupIdList: groupIdList,
          newStatus: newStatus
        }
      }).then((res) => {
        let sgroups = getState().sgroups.groups
        sgroups = replaceGroupProps(sgroups, groupIdList, {acceptionStatus: newStatus})
        dispatch({
          type: GET_ALL_GROUPS,
          payload: {
            groups: sgroups
          }
        })
        resolve(res.data)
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
