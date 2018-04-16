const axios = require('axios')
const UserModel = require('../model/userModel')
const mongoose = require('mongoose')

module.exports = {
  searchByNamePwd : (userName, pwd) => {
    return new Promise((resolve, reject) => {
      UserModel.findOne({
        name: userName,
        pwd: pwd
      }).then((user) => {
        if (!user || user.length === 0) {
          return reject('User not found')
        }
        resolve(user)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  searchBySessionKey : (sessionKey) => {
    return new Promise((resolve, reject) => {
      UserModel.findOne({
        sessionKey: sessionKey
      }).then((user) => {
        if (!user || user.length === 0) {
          return reject('User not found')
        }
        user.lastLogin = new Date()
        user.save().then((user) => {
          resolve(user)
        })
      }).catch((err) => {
        reject(err)
      })
    })
  },
  refreshSessionKey : (user) => {
    return new Promise((resolve, reject) => {
      user.lastLogin = new Date()
      user.sessionKey = new mongoose.Types.ObjectId
      user.save().then((updated) => {
        resolve(updated)
      })
    })
  }
}
