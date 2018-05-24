const axios = require('axios')
const approvalModel = require('../model/approvalModel')
const mongoose = require('mongoose')
const _ = require('lodash')

const ApprovalService = {
  createApproval: (userId, approvalSchema) => {
    return new Promise((resolve, reject) => {
      let newApproval = {
        sponsorId: userId,
        schemaId: approvalSchema._id,
        status: 'notSubmit'
      }
      newApproval.approvalProcess = approvalSchema.approvalStack.map((step, index) => {
        return ({
          approver: '',
          status: 'waiting',
          role: step.role
        })
      })
      newApproval = new approvalModel(newApproval)
      newApproval.save().then((result) => {
        let approvalId = result._id
        approvalModel.find().then((result) => {
          resolve({
            approvals: result,
            approvalId: approvalId
          })
        })
      }).catch((e) => {
        reject(e)
      })
    })
  }
}

module.exports = ApprovalService
