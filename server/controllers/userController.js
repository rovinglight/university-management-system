const axios = require('axios')
const userService = require('../services/userService')

module.exports = {
  register: async (req, res) => {
    console.log(req.body)
    let userName = req.body.user
    let pwd = req.body.pwd
    if (!userName || !pwd) {
      res.status(401).send('User name or password cant be empty')
    }
    let result = await userService.searchByNamePwd(userName)
    if (result.results.length !== 0) {
      return res.status(401).send('User name duplicated')
    }
    userService.insertUser(userName, pwd).then((result) => {
      res.status(200).send(result)
    }).catch((err) => {
      res.status(401).send('register fail')
    })
  },
  login: (req, res) => {
    let userName = req.body.user
    let pwd = req.body.pwd
    if (!userName || !pwd) {
      res.status(401).send('User name or password cant be empty')
    }
    userService.searchByNamePwd(userName, pwd).then((result) => {
      res.status(200).send(result)
    }).catch((err) => {
      res.status(401).send('Login fail')
    })
  }
}
