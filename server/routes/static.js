const schema = require('../schema/schema.json')

module.exports = (app) => {
  app.get('/static', (req, res) => {
    res.status(200).send(schema)
  })
}
