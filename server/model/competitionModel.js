const DB = require('../db/connect')
const mongoose = require('mongoose')

//记录一级、二级学科竞赛简介等信息的collection
const competitionSchema = new mongoose.Schema({
  name: String,
  organizers: String,
  content: String,
  grade: String,
  officialSite: String
})

const CompetitionModel = DB.model('competition', competitionSchema)

module.exports = CompetitionModel
