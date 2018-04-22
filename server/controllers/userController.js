const axios = require('axios')
const userService = require('../services/userService')
const _ = require('lodash')

module.exports = {
  attachUserInfo: (req, res, next) => {
    let sessionKey = req.headers.sessionkey
    if (!sessionKey) {
      return next()
    }
    userService.searchBySessionKey(sessionKey).then((user) => {
      req.userInfo = user
      next()
    }).catch((e) => {
      console.log(e)
      next()
    })
  },
  loginCheck: (req, res, next) => {
    if (!req.userInfo) {
      return res.status(401).send('Please login')
    }
    next()
  },
  loginWithSessionKey: (req, res) => {
    let sessionKey = req.body.sessionKey
    if (!sessionKey) {
      return res.status(401).send('empty session key')
    }
    userService.searchBySessionKey(sessionKey).then((user) => {
      user = user.toObject()
      return res.status(200).send(_.omit(user, ['pwd']))
    }).catch((e) => {
      console.log(e)
      return res.status(401).send('Login fail')
    })
  },
  login: (req, res) => {
    let userName = req.body.user
    let pwd = req.body.pwd
    if (!userName || !pwd) {
      return res.status(401).send('User name or password cant be empty')
    }
    userService.searchByPwd(userName, pwd).then((result) => {
      userService.refreshSessionKey(result).then((result) => {
        result = result.toObject()
        res.status(200).send(_.omit(result, ['pwd']))
      })
    }).catch((err) => {
      console.log(err)
      res.status(401).send('Login fail')
    })
  }
}
