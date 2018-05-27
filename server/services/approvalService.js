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
          ...step,
          approver: '',
          status: 'waiting'
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
  },
  getAllApproval: () => {
    return new Promise((resolve, reject) => {
      approvalModel.find().then((result) => {
        resolve(result)
      }).catch((e) => {
        reject(e)
      })
    })
  },
  updateApproval: (approval) => {
    return new Promise((resolve, reject) => {
      approvalModel.findById(approval._id).then((oldApproval) => {
        let objectId = oldApproval._id
        _.assign(oldApproval, approval, {_id: objectId})
        oldApproval.save().then(() => {
          ApprovalService.getAllApproval().then((allApproval) => {
            resolve(allApproval)
          })
        }).catch((e) => {
          reject(e)
        })
      })
    })
  }
}

module.exports = ApprovalService
