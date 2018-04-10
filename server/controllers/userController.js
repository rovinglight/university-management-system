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
    let result = await userService.searchByUserName(userName)
    if (result.results.length !== 0) {
      return res.status(401).send('User name duplicated')
    }
    userService.insertUser(userName, pwd).then((result) => {
      res.status(200).send(result)
    }).catch((err) => {
      res.status(401).send('register fail')
    })
  },
  login: async (req, res) => {
    let userName = req.body.user
    let pwd = req.body.pwd
    if (!userName || !pwd) {
      res.status(401).send('User name or password cant be empty')
    }
    let result = await userService.searchByUserName(userName).catch((err) => {
      console.log(err)
      res.status(401).send('Login fail')
    })
    res.status(200).send(result)
  },
  updateExam: async (req, res) => {
    let userId = req.headers['x-userid']
    console.log('req.body')
    console.log(JSON.stringify(req.body))
    userService.update(userId, req.body).then((result) => {
      res.status(200).send('Updated')
    }).catch((err) => {
      res.status(400).send('update fail')
    })
  }
}
