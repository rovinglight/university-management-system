const axios = require('axios')
const UserModel = require('../model/userModel')
const mongoose = require('mongoose')

const UserService = {
  searchByPwd : (userName, pwd) => {
    return new Promise((resolve, reject) => {
      UserModel.findOne({
        user: userName,
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
  searchById : (userId) => {
    return new Promise((resolve, reject) => {
      UserModel.findById(userId).then((user) => {
        resolve(user)
      }).catch((e) => {
        reject(e)
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
  searchBystudentIdOrUsername : (keyword) => {
    return new Promise((resolve, reject) => {
      UserModel.find({
        $or: [{'user': keyword}, {'name': keyword}]
      }).select('-pwd -sessionKey').then((result) => {
        resolve(result)
      }).catch((e) => {
        reject(e)
      })
    })
  },
  refreshSessionKey : (user) => {
    return new Promise((resolve, reject) => {
      user.lastLogin = new Date()
      user.sessionKey = new mongoose.Types.ObjectId //自动生成唯一字符串
      user.save().then((updated) => {
        resolve(updated)
      })
    })
  }
}

module.exports = UserService
