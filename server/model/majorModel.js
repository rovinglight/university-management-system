const DB = require('../db/connect')
const mongoose = require('mongoose')

//记录校内所有专业的信息collection
const majorSchema = new mongoose.Schema({
  'name': String,
  'collegeId': String
})

const MajorModel = DB.model('major', majorSchema)

module.exports = MajorModel
