const _ = require('lodash')
const UserModel = require('../model/userModel')
const UserService = require('./userService')

const AuthService = {
  changeUserAuthOfGroup : (userId, groupId, newRole) => {
    return new Promise((resolve, reject) => {
      UserService.searchById(userId).then((user) => {
        let authToChange = _.find(user.auth, {groupId: groupId})
        authToChange.role = newRole
        user.save().then((user) => {
          resolve(user)
        }).catch((e) => {
          reject(e)
        })
      }).catch((e) => {
        reject(e)
      })
    })
  },
  removeUserAuthOfGroup : (userId, groupId) => {
    return new Promise((resolve, reject) => {
      UserService.searchById(userId).then((user) => {
        user.auth = _.filter(user.auth, (auth) => {
          if (auth.groupId === groupId) {
            return false
          }
          return true
        })
        user.save().then((user) => {
          resolve(user)
        }).catch((e) => {
          reject(e)
        })
      })
    })
  },
  addAuth : (userId, auth) => {
    return new Promise((resolve, reject) => {
      UserService.searchById(userId).then((user) => {
        user.auth.push(auth)
        user.save().then((user) => {
          resolve(user)
        })
      }).catch((e) => {
        console.log(e)
        reject(e)
      })
    })
  }
}

module.exports = AuthService
