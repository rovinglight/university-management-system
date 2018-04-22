const userController = require('../controllers/userController')

module.exports = (app) => {
  app.post('/login', userController.login)
  app.post('/loginSession', userController.loginWithSessionKey)
}
