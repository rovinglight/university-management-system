const sgroupController = require('../controllers/sgroupController')
const userController = require('../controllers/userController')

module.exports = (app) => {
  app.get('/sgroups', sgroupController.getAllGroups)
  app.post('/sgroups/acceptionStatus', userController.loginCheck, sgroupController.acceptionStatusChange)
  app.post('/sgroups/auditStatus', userController.loginCheck, sgroupController.auditStatusChange)
  app.get('/sgroups/:groupId/apply', userController.loginCheck, sgroupController.applyForSgroup)
  app.post('/sgroups/:groupId/accept', userController.loginCheck, sgroupController.acceptNewMember)
  app.post('/sgroups/:groupId/delete', userController.loginCheck, sgroupController.deleteMembers)
  app.post('/sgroups/:groupId/reject', userController.loginCheck, sgroupController.rejectNewMembers)
  app.post('/sgroups/:groupId/update', userController.loginCheck, sgroupController.updateGroupInfo)
  app.post('/sgroups/:groupId/performAudit', userController.loginCheck, sgroupController.performAudit)
}
