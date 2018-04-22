const sgroupController = require('../controllers/sgroupController')
const userController = require('../controllers/userController')

module.exports = (app) => {
  app.get('/sgroups', sgroupController.getAllGroups)
  app.post('/sgroups/:groupId/apply', userController.loginCheck, sgroupController.applyForSgroup)
}
