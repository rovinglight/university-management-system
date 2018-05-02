const competitionController = require('../controllers/competitionController')
const userController = require('../controllers/userController')

module.exports = (app) => {
  // app.get('/sgroups', sgroupController.getAllGroups)
  // app.post('/sgroups/acceptionStatus', userController.loginCheck, sgroupController.acceptionStatusChange)
  app.get('/competitions', competitionController.getAllCompetitions),
  app.post('/competitions/upsert', userController.loginCheck, competitionController.upsertCompetition)
  app.post('/competitions/remove', userController.loginCheck, competitionController.removeCompetition)
}
