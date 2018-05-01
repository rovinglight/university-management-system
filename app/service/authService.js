import _ from 'lodash'
import axios from 'axios'
const config = require('../config/config')

const authService = {
  isAuthorized: (userAuths) => {
    return (requiredAuths, shouldAdminAbleToSee = true) => {
      if (_.find(userAuths, {role: 'administrator'})) {
        return shouldAdminAbleToSee
      }
      let result = _.find(requiredAuths, (requiedAuth) => {
        return _.find(userAuths, (userAuth) => {
          let clonedUserAuth = _.cloneDeep(userAuth)
          _.unset(clonedUserAuth, '_id')
          return _.isEqual(clonedUserAuth, requiedAuth)
        })
      })
      return Boolean(result)
    }
  },
  searchUser: (keyword) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `http://${config.ums_web.host}:${config.ums_web.port}/search`,
        data: {
          kw: keyword
        }
      }).then((res) => {
        resolve(res.data)
      }).catch((e) => {
        reject(e)
      })
    })
  },
  updateUserAuthById: (userId, auth) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `http://${config.ums_web.host}:${config.ums_web.port}/auth/update`,
        data: {
          userId: userId,
          auth: auth
        }
      }).then((res) => {
        resolve(res.data)
      }).catch((e) => {
        reject(e)
      })
    })
  }
}

export default authService
