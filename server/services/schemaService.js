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
  },
  updateApprovalSchema: (newSchema, updatedSchemaId) => {
    return new Promise(async (resolve, reject) => {
      let schemaToUpdate = _.filter(newSchema, schema => _.includes(updatedSchemaId, schema._id))
      for (let i = 0; i  < schemaToUpdate.length; i++) {
        approvalSchemaModel.update({_id: schemaToUpdate[i]._id}, schemaToUpdate[i]).catch((e) => {
          reject(e)
        })
      }
      resolve(newSchema)
    })
  }
}

module.exports = SchemaService
