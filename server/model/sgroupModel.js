const DB = require('../db/connect')
const mongoose = require('mongoose')

//记录社团信息的collection
const sgroupSchema = new mongoose.Schema({
  'name': String,
  'desc': String,
  'foundTime': Date,
  'acceptionStatus': Boolean,
  'auditStatus': String,
  'status': String,
  'members': [{
    studentId: String,
    name: String,
    status: String,
    role: String,
    joinTime: Date,
    audit: [{
      startTime: Date,
      status: String,
      comment: String,
      rate: Number
    }]
  }],
  'department': Array,
  'QRcodeDir': String
})

const SgroupModel = DB.model('sgroup', sgroupSchema)

module.exports = SgroupModel
