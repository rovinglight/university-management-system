const axios = require('axios')
const approvalService = require('../services/approvalService')
const _ = require('lodash')

module.exports = {
  createApproval: (req, res) => {
    let userId = req.userInfo._id.toString()
    let approvalSchema = req.body.approvalSchema
    approvalService.createApproval(userId, approvalSchema).then((result) => {
      res.status(200).send(result)
    }).catch((e) => {
      res.status(400).send(e)
    })
  }
}
