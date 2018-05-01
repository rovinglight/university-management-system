const axios = require('axios')
const SgroupModel = require('../model/sgroupModel')
const UserService = require('./userService')
const AuthService = require('./authService')
const mongoose = require('mongoose')
const _ = require('lodash')

const SgroupService = {
  getAll : () => {
    return new Promise((resolve, reject) => {
      SgroupModel.find().then((sgroups) => {
        resolve(sgroups)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  applyForSgroup : (userId, groupId) => {
    return new Promise((resolve, reject) => {
      SgroupModel.findById(groupId).then(async (sgroup) => {
        if (_.find(sgroup.members, _.matchesProperty('studentId', userId))) {
          return reject ('already a member')
        }
        let student = await UserService.searchById(userId).catch((e) => {
          reject(e)
        })
        sgroup.members.push({
          studentId: student._id.toString(),
          name: student.name,
          status: 'waitForPermission',
          role: '',
          joinTime: '',
          audit: []
        })
        AuthService.addAuth(userId, {role: 'studentGroupApplicant', groupId: groupId})
        sgroup.save().then((result) => {
          resolve(result)
        }).catch((e) => {
          reject(e)
        })
      }).catch((e) => {
        reject(e)
      })
    })
  },
  acceptNewMember : (userIdList, groupId) => {
    return new Promise((resolve, reject) => {
      SgroupModel.findById(groupId).then((sgroup) => {
        _.every(userIdList, (userId) => {
          let memberInfo = _.find(sgroup.members, {studentId: userId})
          if (!memberInfo) {
            return true
          }
          if (memberInfo.status === 'active') {
            return true
          }
          AuthService.changeUserAuthOfGroup(userId, groupId, 'studentGroupMember')
          memberInfo.status = 'active'
          memberInfo.role = 'studentGroupMember'
          memberInfo.joinTime = new Date()
          return true
        })
        sgroup.save().then((group) => {
          resolve(group)
        })
      }).catch((e) => {
        reject(e)
      })
    })
  },
  deleteMembers : (userIdList, groupId) => {
    return new Promise((resolve, reject) => {
      SgroupModel.findById(groupId).then((sgroup) => {
        _.forEach(userIdList, (userId) => {
          AuthService.removeUserAuthOfGroup(userId, groupId).catch((e) => {
            reject(e)
          })
          let memberInfos = _.filter(sgroup.members, {'studentId': userId})
          memberInfos.forEach((memberInfo, i) => {
            memberInfo.remove()
          })
        })
        sgroup.save().then((sgroup) => {
          resolve(sgroup)
        }).catch((e) => {
          reject(e)
        })
      })
    })
  },
  rejectNewMembers : (userIdList, groupId) => {
    return new Promise((resolve, reject) => {
      SgroupService.deleteMembers(userIdList, groupId).then((sgroup) => {
        resolve(sgroup)
      }).catch((e) => {
        reject(e)
      })
    })
  },
  updateGroupInfo : (infoToUpdate, groupId) => {
    return new Promise((resolve, reject) => {
      SgroupModel.findById(groupId).then((sgroup) => {
        sgroup = _.assign(sgroup, infoToUpdate)
        sgroup.save().then((group) => {
          resolve(group)
        })
      }).catch((e) => {
        console.log(e)
        reject(e)
      })
    })
  },
  propsChange : (groupIdList, propsToChange) => {
    return new Promise((resolve, reject) => {
      SgroupModel.update({_id: {$in: groupIdList}}, propsToChange, { multi: true }).then((res) => {
        resolve(res)
      }).catch((e) => {
        console.log(e)
        reject(e)
      })
    })
  },
  auditStatusChange : (groupIdList, newStatus) => {
    return new Promise((resolve, reject) => {
      SgroupService.propsChange(groupIdList, {'auditStatus': newStatus}).then(() => {
        groupIdList.forEach((groupId) => {
          SgroupModel.findById(groupId).then((sgroup) => {
            sgroup.members.forEach((member) => {
              if (newStatus === 'processing') {
                member.audit.push({
                  startTime: new Date(),
                  status: 'waiting',
                  comment: '',
                  rate: 0
                })
              } else if (newStatus === 'finish') {
                let auditLength = member.audit.length
                if (auditLength === 0 || !_.includes(['signedIn', 'waiting'], member.audit[auditLength - 1].status)) {
                  return
                }
                const statusConverter = [{
                  prev: 'signedIn',
                  next: 'active'
                }, {
                  prev: 'waiting',
                  next: 'inactive'
                }]
                member.audit[auditLength - 1].status = _.find(statusConverter, {prev: member.audit[auditLength - 1].status}).next
              }
            })
            sgroup.save().then(() => {
              resolve()
            }).catch((e) => {
              console.log('error', e)
            })
          }).catch((e) => {
            reject(e)
          })
        })
      }).catch((e) => {
        console.log(e)
        reject(e)
      })
    })
  },
  performAudit : (groupId, studentId, auditInfo) => {
    return new Promise((resolve, reject) => {
      SgroupModel.findById(groupId).then((sgroup) => {
        let targetMember = _.find(sgroup.members, {'studentId': studentId})
        targetMember.audit.pop()
        targetMember.audit.push(auditInfo)
        sgroup.save().then((sgroup) => {
          resolve(sgroup)
        }).catch((e) => {
          reject(e)
        })
      }).catch((e) => {
        reject(e)
      })
    })
  }
}

module.exports = SgroupService
