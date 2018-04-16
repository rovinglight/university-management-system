const userController = require('../controllers/userController')

module.exports = (app) => {
  app.post('/login', (req, res) => {
    userController.login(req, res)
  })
  app.post('/loginSession', (req, res) => {
    userController.loginWithSessionKey(req, res)
  })
}
