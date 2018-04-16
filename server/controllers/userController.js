const axios = require('axios')
const userService = require('../services/userService')
const _ = require('lodash')

module.exports = {
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
    userService.searchByNamePwd(userName, pwd).then((result) => {
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
