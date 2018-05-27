const DB = require('../db/connect')
const mongoose = require('mongoose')

//记录审核模板的collection
const approvalSchemaSchema = new mongoose.Schema({
  name: String,
  approvalStack: [{
    'stepType': String,
    'status': String,
    'role': String,
    'requiredFiles': Array
  }]
})

const ApprovalSchemaModel = DB.model('approvalSchema', approvalSchemaSchema)

module.exports = ApprovalSchemaModel
