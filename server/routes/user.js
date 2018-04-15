const userController = require('../controllers/userController')

module.exports = (app) => {
  app.post('/login', (req, res) => {
    userController.login(req, res)
  })
}
