const axios = require('axios')
const schemaService = require('../services/schemaService')
const staticSchema = require('../schema/staticSchema.json')
const _ = require('lodash')

module.exports = {
  getAllSchemas : async (req, res) => {
    let result = {}
    let approvalSchema = await schemaService.getAllApprovalSchema().catch((e) => {
      console.log(e)
      res.status(400).send(e)
    })
    _.assign(result, staticSchema, {approvalSchema: approvalSchema})
    res.status(200).send(result)
  }
}
