const DB = require('../db/connect')
const mongoose = require('mongoose')

//用以记录项目库中项目的collection
const projectSchema = new mongoose.Schema({
  'sponsorId': String,
  'sponsorName': String,
  'name': String,
  'status': String,
  'desc': String,
  'foundTime': Date,
  'members': [{
    'memberName': String,
    'memberId': String,
    'status': String
  }]
})

const projectModel = DB.model('project', projectSchema)

module.exports = projectModel
