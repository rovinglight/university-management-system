const DB = require('../db/connect')
const mongoose = require('mongoose')

//记录审批进度以及内容的collection
const approvalSchema = new mongoose.Schema({
  sponsorId: String,
  status: String,
  schemaId: String,  //对应approvalSchemaModel即审核模板的id
  approvalProcess: [{
    'status': String,
    'role': String,
    'requiredFiles': Array,
    'uploadedFile': Array
  }]
})

const ApprovalModel = DB.model('approval', approvalSchema)

module.exports = ApprovalModel
