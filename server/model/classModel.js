const DB = require('../db/connect')
const mongoose = require('mongoose')

//记录校内所有班级信息的collection
const classSchema = new mongoose.Schema({
  'name': String,
  'majorId': String,
  'period': Number
})

const ClassModel = DB.model('class', classSchema)

module.exports = ClassModel
