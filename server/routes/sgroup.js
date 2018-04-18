const sgroupController = require('../controllers/sgroupController')

module.exports = (app) => {
  app.get('/sgroups', (req, res) => {
    sgroupController.getAllGroups(req, res)
  })
  app.post('/sgroups/apply', (req, res) => {
    sgroupController.applyForSgroup(req, res)
  })
}
