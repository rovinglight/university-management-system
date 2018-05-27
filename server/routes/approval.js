const approvalController = require('../controllers/approvalController')
const userController = require('../controllers/userController')

module.exports = (app) => {
  app.post('/approval/new', userController.loginCheck, approvalController.createApproval)
  app.get('/approval/all', approvalController.getAllApproval)
  app.post('/approval/update', userController.loginCheck, approvalController.updateApproval)
}
