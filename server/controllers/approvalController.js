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
      console.log(e)
      res.status(400).send(e)
    })
  },
  getAllApproval: (req, res) => {
    approvalService.getAllApproval().then((result) => {
      res.status(200).send(result)
    }).catch((e) => {
      console.log(e)
      res.status(400).send(e)
    })
  },
  updateApproval: (req, res) => {
    let approval = req.body.approval
    approvalService.updateApproval(approval).then((result) => {
      res.status(200).send(result)
    }).catch((e) => {
      console.log(e)
      res.status(400).send(e)
    })
  }
}
