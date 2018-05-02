const CompetitionModel = require('../model/competitionModel')
const mongoose = require('mongoose')

const competitionService = {
  getAllCompetitions: () => {
    return new Promise((resolve, reject) => {
      CompetitionModel.find().then((result) => {
        resolve(result)
      }).catch((e) => {
        reject(e)
      })
    })
  },
  upsertCompetition: (competition) => {
    return new Promise((resolve, reject) => {
      let id = competition._id || mongoose.Types.ObjectId()
      delete competition._id
      delete competition.__v
      CompetitionModel.update({_id: id}, competition, {upsert: true, setDefaultsOnInsert: true}).then((result) => {
        resolve(result)
      }).catch((e) => {
        reject(e)
      })
    })
  },
  removeById: (competitionId) => {
    return new Promise((resolve, reject) => {
      CompetitionModel.findByIdAndRemove(competitionId).then((result) => {
        resolve(result)
      }).catch((e) => {
        reject(e)
      })
    })
  }
}

module.exports = competitionService
