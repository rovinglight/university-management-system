const authService = require('../services/authService')
const userService = require('../services/userService')
const _ = require('lodash')

const authController = {
  searchUser: (req, res) => {
    let keyword = req.body.kw
    userService.searchBystudentIdOrUsername(keyword).then((result) => {
      res.status(200).send(result)
    }).catch((e) => {
      res.status(400).send(e)
    })
  },
  updateAuth: (req, res) => {
    let userId = req.body.userId
    let auth = req.body.auth
    authService.updateAuth(userId, auth).then((result) => {
      res.status(200).send(result)
    }).catch((e) => {
      res.status(400).send(e)
    })
  }
}

module.exports = authController
