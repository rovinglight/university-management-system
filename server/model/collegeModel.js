const DB = require('../db/connect')
const mongoose = require('mongoose')

//记录校内所有学院的collection
const collegeSchema = new mongoose.Schema({
  'name': String
})

const CollegeModel = DB.model('college', collegeSchema)

module.exports = CollegeModel
