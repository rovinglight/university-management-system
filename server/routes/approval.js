const approvalController = require('../controllers/approvalController')
const userController = require('../controllers/userController')

module.exports = (app) => {
  app.post('/approval/new', userController.loginCheck, approvalController.createApproval)
}
