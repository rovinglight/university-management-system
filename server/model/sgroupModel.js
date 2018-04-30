const DB = require('../db/connect')
const mongoose = require('mongoose')

const sgroupSchema = new mongoose.Schema({
  'name': String,
  'desc': String,
  'foundTime': Date,
  'acceptionStatus': Boolean,
  'status': String,
  'members': [{
    studentId: String,
    name: String,
    status: String,
    role: String,
    joinTime: Date,
    audit: Array
  }]
})

const SgroupModel = DB.model('sgroup', sgroupSchema)

module.exports = SgroupModel
