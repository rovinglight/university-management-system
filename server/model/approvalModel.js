const DB = require('../db/connect')
const mongoose = require('mongoose')

const approvalSchema = new mongoose.Schema({
  sponsorId: String,
  status: String,
  schemaId: String,
  approvalProcess: Array
})

const ApprovalModel = DB.model('approval', approvalSchema)

module.exports = ApprovalModel
