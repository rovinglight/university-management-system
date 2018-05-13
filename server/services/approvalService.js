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
        reutrn ({
          approver: '',
          status: 'waiting',
          role: step.role
        })
      })
      newApproval = new approvalModel(newApproval)
      newApproval.save().then((result) => {
        resolve(result)
      }).catch((e) => {
        reject(e)
      })
    })
  }
}

module.exports = ApprovalService
