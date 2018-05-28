const DB = require('../db/connect')
const mongoose = require('mongoose')

//记录审批进度以及内容的collection
const approvalSchema = new mongoose.Schema({
  name: String,
  sponsorId: String,
  sponsorName: String,
  startDate: Date,
  status: String,
  schemaId: String,  //对应approvalSchemaModel即审核模板的id
  approvalProcess: [{
    'stepType': String,
    'status': String,
    'role': String,
    'operatorName': String,
    'operatorId': String,
    'performDate': Date,
    'comment': [{
      'commentDate': Date,
      'content': String,
      'commenter': String
    }],
    'requiredFiles': Array,
    'uploadedFile': Array
  }]
})

const ApprovalModel = DB.model('approval', approvalSchema)

module.exports = ApprovalModel
