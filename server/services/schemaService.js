const axios = require('axios')
const approvalSchemaModel = require('../model/approvalSchemaModel')
const mongoose = require('mongoose')
const _ = require('lodash')

const SchemaService = {
  getAllApprovalSchema: () => {
    return new Promise((resolve, reject) => {
      approvalSchemaModel.find().then((result) => {
        resolve(result)
      }).catch((e) => {
        reject(e)
      })
    })
  }
}

module.exports = SchemaService
