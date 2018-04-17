const DB = require('../db/connect')
const mongoose = require('mongoose')

const sgroupSchema = new mongoose.Schema({
  'name': String,
  'desc': String,
  'members': Array
})

const SgroupModel = DB.model('sgroup', sgroupSchema)

module.exports = SgroupModel
