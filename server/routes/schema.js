const schemaController = require('../controllers/schemaController')

module.exports = (app) => {
  app.get('/static', schemaController.getAllSchemas)
  app.post('/static/approvalschema/update', schemaController.updateApprovalSchema)
}
