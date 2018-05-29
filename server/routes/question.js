const questionController = require('../controllers/questionController')
const userController = require('../controllers/userController')

module.exports = (app) => {
  app.get('/question', questionController.getAll)
  app.post('/question/upsert', userController.loginCheck, questionController.upsert)
  app.post('/question/delete', userController.loginCheck, questionController.delete)
}
