const DB = require('../db/connect')
const mongoose = require('mongoose')

const approvalSchemaSchema = new mongoose.Schema({
  name: String,
  approvalStack: Array
})

const ApprovalSchemaModel = DB.model('approvalSchema', approvalSchemaSchema)

module.exports = ApprovalSchemaModel
