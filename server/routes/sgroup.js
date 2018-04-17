const sgroupController = require('../controllers/sgroupController')

module.exports = (app) => {
  app.get('/sgroups', (req, res) => {
    sgroupController.getAllGroups(req, res)
  })
}
