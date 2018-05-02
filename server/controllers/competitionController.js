const competitionService = require('../services/competitionService')

const competitionController = {
  getAllCompetitions : (req, res) => {
    competitionService.getAllCompetitions().then((result) => {
      res.status(200).send(result)
    }).catch((e) => {
      console.log(e)
      res.status(400).send(e)
    })
  },
  upsertCompetition : (req, res) => {
    let competition = req.body.competition
    competitionService.upsertCompetition(competition).then((result) => {
      competitionService.getAllCompetitions().then((competitions) => {
        res.status(200).send(competitions)
      }).catch((e) => {
        console.log(e)
        res.status(400).send(e)
      })
    }).catch((e) => {
      console.log(e)
      res.status(400).send(e)
    })
  },
  removeCompetition : (req, res) => {
    let competitionId = req.body.competitionId
    competitionService.removeById(competitionId).then((result) => {
      competitionService.getAllCompetitions().then((competitions) => {
        res.status(200).send(competitions)
      }).catch((e) => {
        console.log(e)
        res.status(400).send(e)
      })
    }).catch((e) => {
      console.log(e)
      res.status(400).send(e)
    })
  }
}

module.exports = competitionController
