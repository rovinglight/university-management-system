const axios = require('axios')
const sgroupService = require('../services/sgroupService')
const _ = require('lodash')

module.exports = {
  getAllGroups: (req, res) => {
    sgroupService.getAll().then((groups) => {
      res.status(200).send(groups)
    }).catch((e) => {
      res.status(404).send(e)
    })
  },
  applyForSgroup: (req, res) => {
    let userId = req.body.userId
    let groupId = req.body.groupId
    sgroupService.applyForSgroup(userId, groupId).then((result) => {
      res.status(200).send(result)
    }).catch((e) => {
      res.status(400).send(e)
    })
  }
}
