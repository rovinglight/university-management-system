const axios = require('axios')
const SgroupModel = require('../model/sgroupModel')
const UserService = require('./UserService')
const mongoose = require('mongoose')
const _ = require('lodash')

module.exports = {
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
        UserService.addAuth(userId, {role: 'studentGroupApplicant', groupId: groupId})
        sgroup.save().then((result) => {
          resolve(result)
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
          UserService.addAuth(userId, {role:'studentGroupMember', groupId: groupId})
          memberInfo.status = 'active'
          memberInfo.role = 'member'
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
  }
}
