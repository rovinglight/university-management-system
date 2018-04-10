const userController = require('../controllers/userController')

module.exports = (app) => {
  app.post('/register', (req, res) => {
    userController.register(req, res)
  })
  app.post('/login', (req, res) => {
    userController.login(req, res)
  })
  app.post('/updateExam', (req, res) => {
    userController.updateExam(req, res)
  })
}
