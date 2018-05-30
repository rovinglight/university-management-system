const projectController = require('../controllers/projectController')
const userController = require('../controllers/userController')

module.exports = (app) => {
  app.get('/project', projectController.getAll)
  app.post('/project/upsert', userController.loginCheck, projectController.upsert)
  app.post('/project/delete', userController.loginCheck, projectController.delete)
}
