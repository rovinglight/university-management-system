const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

module.exports = (app) => {
  app.post('/login', userController.login)
  app.post('/loginSession', userController.loginWithSessionKey)
  app.post('/search', userController.loginCheck, authController.searchUser)
  app.post('/auth/update', userController.loginCheck, authController.updateAuth)
}
