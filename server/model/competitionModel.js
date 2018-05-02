const DB = require('../db/connect')
const mongoose = require('mongoose')

const competitionSchema = new mongoose.Schema({
  name: String,
  organizers: String,
  content: String,
  grade: String,
  officialSite: String
})

const CompetitionModel = DB.model('competition', competitionSchema)

module.exports = CompetitionModel
